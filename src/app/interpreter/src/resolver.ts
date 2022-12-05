import * as ast from "./ast"
import { Token, TokenType } from "./scanner";
import { OutputHandlingService } from "src/app/services/output-handling.service";
import { Interpreter } from "./interpreter";

enum FunctionType {
    NONE,
    FUNCTION,
    INITIALIZER,
    METHOD
  }

enum ClassType {
    NONE,
    CLASS,
    SUBCLASS
}

export class Resolver implements ast.SyntaxVisitor<void, void> {

    private interpreter: Interpreter;
    private scopes: ScopeStack = new ScopeStack();
    private currentFunction = FunctionType.NONE;
    private currentClass = ClassType.NONE;

    constructor(interpreter: Interpreter) {
        this.interpreter = interpreter;
    }

    resolve(statements: ast.Stmt[]): void
    resolve(stmt: ast.Stmt | ast.Expr): void
    resolve(target: ast.Stmt[] | ast.Stmt | ast.Expr): void {
      if (target instanceof Array) target.forEach((stmt) => this.resolve(stmt));
      else target.accept(this);
    }

    resolveLocal(expr: ast.Expr, name: Token): void {
        for (let i = this.scopes.length - 1; i >= 0; i--) {
          if (name.lexeme in this.scopes[i]) {
            this.interpreter?.['resolve'](expr, this.scopes.length - 1 - i)
            return
          }
        }
      }
    
    resolveFunction(func: ast.FunctionStmt, type: FunctionType) {
        const enclosingFunction = this.currentFunction
        this.currentFunction = type;
        this.beginScope();
        func.params.forEach(param => {
            this.declare(param);
            this.define(param);
        });
        this.resolve(func.body);
        this.endScope();

        this.currentFunction = enclosingFunction;
    }

    private beginScope() {
        this.scopes.push({});
    }

    private endScope() {
        this.scopes.pop();
    }

    private declare(name: Token) {
        if (this.scopes.isEmpty()) return;

        const scope = this.scopes.peek();
        if (name.lexeme in scope) {
            OutputHandlingService.getInstance().errorOccured(`Already variable with this name in this scope ${name.line}`);
        }

        scope[name.lexeme] = false;
    }

    private define(name: Token) {
        if (this.scopes.isEmpty()) return;
        this.scopes.peek()[name.lexeme] = true;
    }

    visitBinaryExpr(expr: ast.BinaryExpr): void {
        this.resolve(expr.left);
        this.resolve(expr.right);
        return;
    }
    visitGroupingExpr(expr: ast.GroupingExpr): void {
        this.resolve(expr.expression);
        return;
    }
    visitLiteralExpr(expr: ast.LiteralExpr): void {
        return;
    }
    visitUnaryExpr(expr: ast.UnaryExpr): void {
        this.resolve(expr.right);
        return;
    }
    visitVariableExpr(expr: ast.VariableExpr): void {
        if (!this.scopes.isEmpty() && this.scopes.peek()[expr.name.lexeme] === false) {
            OutputHandlingService.getInstance().errorOccured(`Can't read local variable in its own initializer ${expr.name.line}`);
        }

        this.resolveLocal(expr, expr.name);
        return;
    }
    visitAssignExpr(expr: ast.AssignExpr): void {
        this.resolve(expr.value);
        this.resolveLocal(expr, expr.name);
        return;
    }
    visitLogicalExpr(expr: ast.LogicalExpr): void {
        this.resolve(expr.left);
        this.resolve(expr.right);
        return;
    }
    visitCallExpr(expr: ast.CallExpr): void {
        this.resolve(expr.callee);

        expr.args.forEach(arg => {
            this.resolve(arg);
        });
        return;
    }
    visitGetExpr(expr: ast.GetExpr): void {
        this.resolve(expr.object);
    }
    visitSetExpr(expr: ast.SetExpr): void {
        this.resolve(expr.value);
        this.resolve(expr.object);
    }
    visitThisExpr(expr: ast.ThisExpr): void {
        if (this.currentClass == ClassType.NONE) {
            OutputHandlingService.getInstance().errorOccured("Can't use 'this' outside of a class.")
            return;
        }
        this.resolveLocal(expr, expr.keyword);
        return;
    }
    visitSuperExpr(expr: ast.SuperExpr): void {
        if (this.currentClass == ClassType.NONE) {
            OutputHandlingService.getInstance().errorOccured("Can't use 'super' outside of a class.");
        } else if (this.currentClass != ClassType.SUBCLASS) {
            OutputHandlingService.getInstance().errorOccured("Can't use 'super' in a class with no superclass.");
        }
       this.resolveLocal(expr, expr.keyword);
       return;
    }
    visitExpressionStmt(stmt: ast.ExpressionStmt): void {
        this.resolve(stmt.expression);
        return;
    }
    visitPrintStmt(stmt: ast.PrintStmt): void {
        this.resolve(stmt.expression);
        return;
    }
    visitVarStmt(stmt: ast.VarStmt): void {
       this.declare(stmt.name);
       if (stmt.initializer != null) {
        this.resolve(stmt.initializer);
       }
       this.define(stmt.name);
       return;
    }
    visitBlockStmt(stmt: ast.BlockStmt): void {
        this.beginScope();
        this.resolve(stmt.statements);
        this.endScope();
        return;
    }
    visitIfStmt(stmt: ast.IfStmt): void {
        this.resolve(stmt.condition);
        this.resolve(stmt.thenBranch);
        if (stmt.elseBranch != null) {
            this.resolve(stmt.elseBranch);
        }
        return;
    }
    visitWhileStmt(stmt: ast.WhileStmt): void {
        this.resolve(stmt.condition);
        this.resolve(stmt.body);
        return;
    }
    visitFunctionStmt(stmt: ast.FunctionStmt): void {
        this.declare(stmt.name);
        this.define(stmt.name);

        this.resolveFunction(stmt, FunctionType.FUNCTION);
        return;
    }
    visitReturnStmt(stmt: ast.ReturnStmt): void {
        if (this.currentFunction == FunctionType.NONE) {
            OutputHandlingService.getInstance().errorOccured(`Can't return from top-level code.`);
        }
        if (stmt.value != null) {
            if (this.currentFunction == FunctionType.INITIALIZER) {
                OutputHandlingService.getInstance().errorOccured("Can't return a value from an initializer.")
            }
            this.resolve(stmt.value);
        }
        return;
    }
    visitClassStmt(stmt: ast.ClassStmt): void {
        const enclosingClass = this.currentClass;
        this.currentClass = ClassType.CLASS;
    
        this.declare(stmt.name);
        this.define(stmt.name);
    
        if (stmt.superclass !== null) {
          if (stmt.name.lexeme === stmt.superclass.name.lexeme) {
         
            OutputHandlingService.getInstance().errorOccured(`A class can't inherit from itself, ${stmt.superclass.name.line}`);

          } else {
            this.currentClass = ClassType.SUBCLASS;
            this.resolve(stmt.superclass);
    
            this.beginScope();
            this.scopes.peek()["super"] = true;
          }
        }
    
        this.beginScope();
        this.scopes.peek()["this"] = true;
        stmt.methods.forEach((method) => {
          const declaration =
            method.name.lexeme === "init"
              ? FunctionType.INITIALIZER
              : FunctionType.METHOD
          this.resolveFunction(method, declaration);
        })
        this.endScope();
    
        if (stmt.superclass !== null) this.endScope();
    
        this.currentClass = enclosingClass;
        return;
    }
}

type Scope = Record<string, boolean>;

class ScopeStack extends Array<Scope> {
    isEmpty() {
        return this.length < 1;
    }

    peek() {
        return this[this.length - 1];
    }
}
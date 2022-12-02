import * as ast from "./ast"

import { OutputHandlingService } from "src/app/services/error-handling.service";
import * as types from "./types"
import { Token, TokenType } from "./spanish-scanner";

export class SpanishInterpreter implements ast.SyntaxVisitor<any, void> {
    globals = new Environment();
    private environment = this.globals;
    private locals: Map<ast.Expr, number> = new Map();

    interpret(statements: ast.Stmt[]): any
    interpret(expr: ast.Expr): any
    interpret(target: ast.Stmt[] | ast.Expr) {
      if (target instanceof Array) {
        try {
          for (const stmt of target) {
            stmt && this.execute(stmt);
          }
        } catch{}
      } else {
        const value = this.evaluate(target);
        console.log(this.stringify(value));
        return this.stringify(value);
      }
    }

    private stringify(object: any) {
        if (object === null) return "nil";
    
        if (typeof object === "number") {
          let text = object.toString();
          if (text.endsWith(".0")) text = text.substring(0, text.length - 2);
          return text;
        }
    
        return object.toString();
      }

    private execute(stmt: ast.Stmt): void {
      stmt.accept(this);
    }

    executeBlock(statements: ast.Stmt[], environment: Environment): void {
      const previousEnvironment = this.environment;
      try {
        this.environment = environment;
  
        for (const stmt of statements) {
          stmt && this.execute(stmt);
        }
      } finally {
        this.environment = previousEnvironment;
      }
    }

    private evaluate(expr: ast.Expr): any {
        return expr.accept(this);
    }

    private isTruthy(object: any) {
        if(object == null) return false;
        if(typeof object === "boolean") return object;
        return true;
    }

    private isEqual(a: any, b: any): boolean {
        if (a == null && b == null) return true;
        if (a == null) return false;

        return a === b;
    }

    private checkNumberOperand(operator: Token, operand: any) {
        if (typeof operand === "number") return;
        else throw OutputHandlingService.getInstance().errorOccured(`Operand must be a number, ${operator} operator ➔ El operando debe ser un número, ${operator} operador`)
    }

    private checkNumberOperands(operator: Token, left: any, right: any) {
        if (typeof left === "number" && typeof right === "number") return;
        else throw OutputHandlingService.getInstance().errorOccured(`Operands must be numbers, ${operator} operator ➔ Los operandos deben ser números, ${operator} operador`)
    }

    private resolve(expr: ast.Expr, depth: number) {
      this.locals.set(expr, depth);
    }

    private lookupVariable(name: Token, expr: ast.Expr): any {
        const distance = this.locals.get(expr);
        if (distance !== undefined) return this.environment.getAt(distance, name);
        else return this.globals.get(name);
    }


    visitBinaryExpr(expr: ast.BinaryExpr) {
        const left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);
        
        switch (expr.operator.type) {
            case TokenType.MINUS:
                this.checkNumberOperands(expr.operator, left, right);
                return (left as number) - (right as number);
            case TokenType.SLASH:
                this.checkNumberOperands(expr.operator, left, right);
                return (left as number) / (right as number); 
            case TokenType.STAR:
                this.checkNumberOperands(expr.operator, left, right);
                return (left as number) * (right as number); 
            case TokenType.GREATER:
                this.checkNumberOperands(expr.operator, left, right);
                return (left as number) > (right as number); 
            case TokenType.GREATER_EQUAL:
                this.checkNumberOperands(expr.operator, left, right);
                return (left as number) >= (right as number); 
            case TokenType.LESS:
                this.checkNumberOperands(expr.operator, left, right);
                return (left as number) < (right as number); 
            case TokenType.LESS_EQUAL:
                this.checkNumberOperands(expr.operator, left, right);
                return (left as number) <= (right as number); 
            case TokenType.BANG_EQUAL:
                return !this.isEqual(left, right); 
            case TokenType.EQUAL_EQUAL:
                return this.isEqual(left, right); 
            case TokenType.PLUS:
                if (typeof left === "number" && typeof right === "number") {
                    return left + right;
                }
                if (typeof left === "string" && typeof right === "string") {
                    return left + right;
                }
              throw OutputHandlingService.getInstance().errorOccured(`${expr.operator} operands must be two numbers or two strings. ➔ ${expr.operator} operandos deben ser dos números o dos cadenas.`);
        }

        // Unreachable.
        return null;
    }
    visitGroupingExpr(expr: ast.GroupingExpr) {
        return this.evaluate(expr.expression);
    }
    visitLiteralExpr(expr: ast.LiteralExpr) {
        return expr.value;
    }
    visitUnaryExpr(expr: ast.UnaryExpr) {
        let right = this.evaluate(expr.right);

        switch (expr.operator.type) {
            case TokenType.MINUS:
                this.checkNumberOperand(expr.operator, right);
                return -(right as number);
            case TokenType.BANG:
                return !this.isTruthy(right);
        }

        /** Unreachable. */
        return null;
    }
    visitVariableExpr(expr: ast.VariableExpr) {
        return this.lookupVariable(expr.name, expr);
    }
    visitAssignExpr(expr: ast.AssignExpr) {
        const value = this.evaluate(expr.value);

        const distance = this.locals.get(expr);
        if (distance != undefined) {
            this.environment.assignAt(distance, expr.name, value);
        } else {
            this.globals.assign(expr.name, value);
        }
        return value;
    }
    visitLogicalExpr(expr: ast.LogicalExpr) {
        let left = this.evaluate(expr.left);

        if (expr.operator.type === TokenType.OR) {
            if (this.isTruthy(left)) return left;
        } else if(!this.isTruthy(left)) return left;

        return this.evaluate(expr.right);
    }
    visitCallExpr(expr: ast.CallExpr) {
        const callee = this.evaluate(expr.callee);
        const args: any[] = [];

        expr.args.forEach(arg => {
            args.push(this.evaluate(arg));
        });

        if(!(callee instanceof types.TypeCallable)) {
           throw OutputHandlingService.getInstance().errorOccured(`Can only call functions and classes, ${expr.paren} ➔ Sólo se pueden llamar funciones y clases, ${expr.paren}`);
        }

        if (args.length !== callee.arity()) {
            throw OutputHandlingService.getInstance().errorOccured(`Expected ${callee.arity()} arguments but got ${args.length}, ${expr.paren} ➔ Se esperaban ${callee.arity()} argumentos pero se introdujeron ${args.length}, ${expr.paren}`);
          }
      
          return callee.call(this, args);
    }
    visitGetExpr(expr: ast.GetExpr) {
      const object = this.evaluate(expr.object);
      if (object instanceof types.TypeInstance) return object.get(expr.name);
  
      throw OutputHandlingService.getInstance().errorOccured(`Only class instances have properties ${expr.name} ➔ Sólo las instancias de las clases tienen propiedades ${expr.name}`);
    }
    visitSetExpr(expr: ast.SetExpr) {
        let object = this.evaluate(expr.object);
        if (!(object instanceof types.TypeInstance)) {
          throw OutputHandlingService.getInstance().errorOccured("Only instances have fields ➔ Sólo las instancias tienen campos");
        }
        let value = this.evaluate(expr.value);
        object.set(expr.name, value);
        return value;
    }
    visitThisExpr(expr: ast.ThisExpr) {
        return this.lookupVariable(expr.keyword, expr);
    }
    visitSuperExpr(expr: ast.SuperExpr) {
       const distance = this.locals.get(expr);

       if (distance === undefined) {
        /** Unreachable. */
        throw OutputHandlingService.getInstance().errorOccured("Invalid 'super' usage ➔ Uso inválido de 'super'");
       }

       const superClass = this.environment.getAt(distance, expr.keyword);
       const object = this.environment.enclosing?.getThis();
       const method = superClass.findMethod(expr.method.lexeme);

       if (!(superClass instanceof types.TypeClass)) {
        // Unreachable
        throw OutputHandlingService.getInstance().errorOccured("Invalid 'super' usage ➔ Uso inválido de 'super'");
      }

      if (!(object instanceof types.TypeInstance)) {
        // Unreachable
        throw OutputHandlingService.getInstance().errorOccured("Invalid 'super' usage ➔ Uso inválido de 'super'");
      }

       if (method == null) {
        throw OutputHandlingService.getInstance().errorOccured(`Undefined property ${expr.method.lexeme}. ➔ Propiedad no definida ${expr.method.lexeme}.`)
       }

       return method.bind(object);

    }
    visitExpressionStmt(stmt: ast.ExpressionStmt): void {
        this.evaluate(stmt.expression);
    }
    visitPrintStmt(stmt: ast.PrintStmt): void {
        const value = this.evaluate(stmt.expression);
        OutputHandlingService.getInstance().print(this.stringify(value));
    }
    visitVarStmt(stmt: ast.VarStmt): void {
        let value = null;
        if(stmt.initializer !== null) value = this.evaluate(stmt.initializer);

        this.environment.define(stmt.name.lexeme, value);
    }
    visitBlockStmt(stmt: ast.BlockStmt): void {
        this.executeBlock(stmt.statements, new Environment(this.environment));
    }
    visitIfStmt(stmt: ast.IfStmt): void {
        if (this.isTruthy(this.evaluate(stmt.condition))) {
            this.execute(stmt.thenBranch);
          } else if (stmt.elseBranch !== null) {
            this.execute(stmt.elseBranch);
        }
    }
    visitWhileStmt(stmt: ast.WhileStmt): void {
       while (this.isTruthy(this.evaluate(stmt.condition))) {
        this.execute(stmt.body);
       }
       return;
    }
    visitFunctionStmt(stmt: ast.FunctionStmt): void {
        const func = new types.TypeFunction(stmt, this.environment, false);
        this.environment.define(stmt.name.lexeme, func);
    }
    visitReturnStmt(stmt: ast.ReturnStmt): void {
        let value = null;
        if (stmt.value !== null) value = this.evaluate(stmt.value);
    
        throw new types.TypeFunction.Return(value);
    }
    visitClassStmt(stmt: ast.ClassStmt): void {
      let superclass: any = null

      if (stmt.superclass != null) {
        superclass = this.evaluate(stmt.superclass);
        if(!(superclass instanceof types.TypeClass)) {
          throw OutputHandlingService.getInstance().errorOccured(`Superclass must be a class, ${stmt.superclass.name} ➔ La superclase debe ser una clase, ${stmt.superclass.name}`);
        }
      }

      this.environment.define(stmt.name.lexeme, null);

      let environment = this.environment;
      if (stmt.superclass != null) {
        environment = new Environment(environment);
        environment.define("super", superclass);
      }

      let methods: Record<string, types.TypeFunction> = {};
      stmt.methods.forEach((method) => {
        const func = new types.TypeFunction(method, this.environment, method.name.lexeme === "init" || method.name.lexeme === "inicio");
        methods[method.name.lexeme] = func;
      });
      
      let klass = new types.TypeClass(stmt.name.lexeme, superclass, methods);

      if (superclass !== null && environment.enclosing !== null) {
        environment = environment.enclosing;
      }

      this.environment.assign(stmt.name, klass);
      return;
    }
    
}

export class Environment {
    enclosing: Environment | null;
    private values: Record<string, any> = {};
  
    constructor(enclosing?: Environment) {
      if (enclosing) this.enclosing = enclosing;
      else this.enclosing = null;
    }
  
    ancestor(distance: number): Environment | null {
      if (distance === 0) return this
      else {
        let environment = this.enclosing || null;
        for (let i = 1; i < distance; i++) {
          environment = environment?.enclosing || null;
        }
        return environment;
      }
    }
  
    define(name: string, value: any): void {
      this.values[name] = value;
    }
  
    assign(name: Token, value: any): void {
      if (name.lexeme in this.values) {
        this.values[name.lexeme] = value;
        return;
      }
  
      if (this.enclosing !== null) {
        this.enclosing.assign(name, value);
        return;
      }
  
      throw OutputHandlingService.getInstance().errorOccured(`Undefined variable '${name.lexeme}', ${name} ➔ Variable no definida '${name.lexeme}', ${name}`);
    }
  
    assignAt(distance: number, name: Token, value: any): void {
      const environment = this.ancestor(distance);
      if (environment !== null) {
        environment.values[name.lexeme] = value;
        return;
      }
      // Unreachable (just in case)
      throw OutputHandlingService.getInstance().errorOccured(`Undefined variable '${name.lexeme}', ${name} ➔ Variable no definida '${name.lexeme}', ${name}`);
    }
  
    get(name: Token): any {
      if (name.lexeme in this.values) return this.values[name.lexeme];
      if (this.enclosing !== null) return this.enclosing.get(name);
  
      throw OutputHandlingService.getInstance().errorOccured(`Undefined variable '${name.lexeme}', ${name} ➔ Variable no definida '${name.lexeme}', ${name}`);
    }
  
    getAt(distance: number, name: Token): any {
      const environment = this.ancestor(distance);
      if (environment !== null) return environment.values[name.lexeme];
      // Unreachable
      throw OutputHandlingService.getInstance().errorOccured(`Undefined variable '${name.lexeme}', ${name} ➔ Variable no definida '${name.lexeme}', ${name}`);
    }
  
    getThis(): any {
      return this.values["this"];
    }
  }
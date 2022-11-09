import * as ast from "./ast"
import { Token, TokenType } from "./scanner";
import { ErrorHandlingService } from "src/app/services/error-handling.service";

export class Interpreter implements ast.SyntaxVisitor<any, void> {

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
        else throw ErrorHandlingService.getInstance().syntaxErrorOccured(`Operand must be a number, ${operator} operator`)
    }

    private checkNumberOperands(operator: Token, left: any, right: any) {
        if (typeof left === "number" && typeof right === "number") return;
        else throw ErrorHandlingService.getInstance().syntaxErrorOccured(`Operands must be numbers, ${operator} operator`)
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
                ErrorHandlingService.getInstance().syntaxErrorOccured(`${expr.operator} operands must be two numbers or two strings.`)
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
        throw new Error("Method not implemented.");
    }
    visitAssignExpr(expr: ast.AssignExpr) {
        throw new Error("Method not implemented.");
    }
    visitLogicalExpr(expr: ast.LogicalExpr) {
        throw new Error("Method not implemented.");
    }
    visitCallExpr(expr: ast.CallExpr) {
        throw new Error("Method not implemented.");
    }
    visitGetExpr(expr: ast.GetExpr) {
        throw new Error("Method not implemented.");
    }
    visitSetExpr(expr: ast.SetExpr) {
        throw new Error("Method not implemented.");
    }
    visitThisExpr(expr: ast.ThisExpr) {
        throw new Error("Method not implemented.");
    }
    visitSuperExpr(expr: ast.SuperExpr) {
        throw new Error("Method not implemented.");
    }
    visitExpressionStmt(stmt: ast.ExpressionStmt): void {
        throw new Error("Method not implemented.");
    }
    visitPrintStmt(stmt: ast.PrintStmt): void {
        throw new Error("Method not implemented.");
    }
    visitVarStmt(stmt: ast.VarStmt): void {
        throw new Error("Method not implemented.");
    }
    visitBlockStmt(stmt: ast.BlockStmt): void {
        throw new Error("Method not implemented.");
    }
    visitIfStmt(stmt: ast.IfStmt): void {
        throw new Error("Method not implemented.");
    }
    visitWhileStmt(stmt: ast.WhileStmt): void {
        throw new Error("Method not implemented.");
    }
    visitFunctionStmt(stmt: ast.FunctionStmt): void {
        throw new Error("Method not implemented.");
    }
    visitReturnStmt(stmt: ast.ReturnStmt): void {
        throw new Error("Method not implemented.");
    }
    visitClassStmt(stmt: ast.ClassStmt): void {
        throw new Error("Method not implemented.");
    }
    
}
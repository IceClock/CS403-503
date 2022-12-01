import { OutputHandlingService } from "src/app/services/error-handling.service";
import * as ast from "./ast"
import { Token, TokenType } from "./spanish-scanner";

export class SpanishParser {
    private tokens: Token[];
    private current = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    parse() {
        let statements: ast.Stmt[] = [];
        while (!this.isAtEnd()) {
            try {
              statements.push(this.declaration());
            } catch (error) {
              this.synchronize();
            }
          }
          return statements;
    }

    /**  In REPL, users can input zero or more statements (ending with ';') and
    maybe an expression. The interpreter executes all the statements. If there
    is an expression, the REPL evaluates and prints its value. */
    parseRepl(): [ast.Stmt[], ast.Expr | null] {
        let cursor = this.current;
        const statements: ast.Stmt[] = [];
        try {
            while (!this.isAtEnd()) {
                statements.push(this.declaration());
                cursor = this.current;
            }
            return [statements, null];
        } catch (error) {
            this.current = cursor;
            return [statements, this.expression()];
        }
    }

    private expression(): ast.Expr {
        return this.assignment();
        //return this.equality();
    }

    private assignment(): ast.Expr {
        const expr = this.logicalOr();
    
        if (this.match(TokenType.EQUAL)) {
          const equals = this.previous();
          const value = this.assignment();
    
          if (expr instanceof ast.VariableExpr) {
            const name = expr.name;
            return new ast.AssignExpr(name, value);
          } else if (expr instanceof ast.GetExpr) {
            return new ast.SetExpr(expr.object, expr.name, value);
          }

          this.error(equals, "Invalid assignment target ➔ Destino de asignación inválido");
        }
    
        return expr;
      }

      private logicalOr(): ast.Expr {
        let expr = this.logicalAnd();
    
        while (this.match(TokenType.OR)) {
          const operator = this.previous();
          const right = this.logicalAnd();
          expr = new ast.LogicalExpr(expr, operator, right)
        }
    
        return expr
      }

      private logicalAnd(): ast.Expr {
        let expr = this.equality();
    
        while (this.match(TokenType.AND)) {
          const operator = this.previous();
          const right = this.equality();
          expr = new ast.LogicalExpr(expr, operator, right);
        }
    
        return expr;
      }

    private equality(): ast.Expr {
        let expr: ast.Expr = this.comparision();

        while (this.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
            let operator: Token = this.previous();
            let right: ast.Expr = this.comparision();
            expr = new ast.BinaryExpr(expr, operator, right);
        }

        return expr;
    }

    private match(...types: TokenType[]): boolean {
        for (const type of types) {
            if (this.check(type)) {
                this.advance();
                return true;
            }
        }
        return false;
    }

    private check(type: TokenType): boolean {
        if (this.isAtEnd()) {
            return false;
        }
        return this.peek().type == type;
    }

    private advance(): Token {
        if (!this.isAtEnd()) this.current++;
        return this.previous();
    }

    private isAtEnd(): boolean {
        return this.peek().type == TokenType.EOF;
    }

    private peek() {
        return this.tokens[this.current];
    }

    private previous() {
        return this.tokens[this.current - 1];
    }

    private comparision(): ast.Expr {
        let expr: ast.Expr = this.term();

        while (
            this.match(TokenType.GREATER,
                TokenType.GREATER_EQUAL,
                TokenType.GREATER_EQUAL,
                TokenType.LESS,
                TokenType.LESS_EQUAL)
        ) {
            let operator = this.previous();
            let right = this.term();
            expr = new ast.BinaryExpr(expr, operator, right);
        }
        return expr;
    }

    private term(): ast.Expr {
        let expr: ast.Expr = this.factor();

        while (this.match(TokenType.MINUS, TokenType.PLUS)) {
            let operator = this.previous();
            let right = this.factor();
            expr = new ast.BinaryExpr(expr, operator, right);
        }

        return expr;
    }

    private factor(): ast.Expr {
        let expr = this.unary();

        while (this.match(TokenType.SLASH, TokenType.STAR)) {
            let operator = this.previous();
            let right = this.unary();
            expr = new ast.BinaryExpr(expr, operator, right);
        }

        return expr;
    }

    private unary(): ast.Expr {
        if (this.match(TokenType.BANG, TokenType.MINUS)) {
            let operator = this.previous();
            let right = this.unary();
            return new ast.UnaryExpr(operator, right);
        }

        return this.call();
    }

    private call(): ast.Expr {
        let expr = this.primary();

        while (this.match(TokenType.LEFT_PAREN, TokenType.DOT)) {
            const type = this.previous().type;
            if (type === TokenType.LEFT_PAREN) { expr = this.finishCall(expr); }
            else if (type === TokenType.DOT) {
                const name = this.consume(TokenType.IDENTIFIER, "Expect property name after '.' ➔ Se esperaba el nombre de la propiedad después del '.'");
                expr = new ast.GetExpr(expr, name);
            } else break;
        }

        return expr;
    }

    private finishCall(callee: ast.Expr): ast.CallExpr {
        const args: ast.Expr[] = [];

        if (!this.check(TokenType.RIGHT_PAREN)) {
            do {
                if (args.length >= 255) {
                   this.error(this.peek(), "Can't have more than 255 args ➔ No se puede tener más de 255 argumentos");
                }
                args.push(this.expression());
            } while (this.match(TokenType.COMMA))
        }

        const paren = this.consume(TokenType.RIGHT_PAREN, "Expect ')' after arguments ➔ Se esperaba ')' después de los argumentos");

        return new ast.CallExpr(callee, paren, args);
    }

    private primary(): ast.Expr {
        let expr: ast.Expr;
        if (this.match(TokenType.FALSE)) { return new ast.LiteralExpr(false); }
        if (this.match(TokenType.TRUE)) { return new ast.LiteralExpr(true); }
        if (this.match(TokenType.NIL)) { return new ast.LiteralExpr(null); }
        if (this.match(TokenType.NUMBER, TokenType.STRING)) { return new ast.LiteralExpr(this.previous().literal); }
        if (this.match(TokenType.THIS)) { return new ast.ThisExpr(this.previous()); }
        if (this.match(TokenType.IDENTIFIER)) { return new ast.VariableExpr(this.previous()); }
        if (this.match(TokenType.LEFT_PAREN)) {
            expr = this.expression();
            this.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression. ➔ Se esperaba ')' después de la expresión.");
            return new ast.GroupingExpr(expr);
        }
        if (this.match(TokenType.SUPER)) {
            const keyword = this.previous();
            this.consume(TokenType.DOT, "Expect '.' after 'super' ➔ Se esperaba '.' después de 'super'");
            const method = this.consume(TokenType.IDENTIFIER, "Expect superclass method name ➔ Se esperaba el nombre del método de la superclase");
            return new ast.SuperExpr(keyword, method);
        }

        throw this.error(this.peek(), "Expect expression ➔ Se esperaba expresión");
    }

    private declaration(): ast.Stmt {
        if (this.match(TokenType.CLASS)) return this.classDeclaration();
        if (this.match(TokenType.FUN)) return this.funDeclaration("function");
        if (this.match(TokenType.VAR)) return this.varDeclaration();

        return this.statement();
    }

    private classDeclaration(): ast.ClassStmt {
        const name = this.consume(TokenType.IDENTIFIER, "Expect class name ➔ Se esperaba el nombre de la clase");

        let superclass: ast.VariableExpr | null = null;
        if (this.match(TokenType.LESS)) {
            this.consume(TokenType.IDENTIFIER, "Expect superclass name ➔ Se esperaba el nombre de la superclase");
            superclass = new ast.VariableExpr(this.previous());
        }

        this.consume(TokenType.LEFT_BRACE, "Expect '{' before class body ➔ Se esperaba '{' antes del cuerpo de la clase");

        const methods: ast.FunctionStmt[] = [];
        while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
            methods.push(this.funDeclaration("method"));
        }

        this.consume(TokenType.RIGHT_BRACE, "Expect ')' after class body ➔ Se esperaba '}' después del cuerpo de la clase");

        return new ast.ClassStmt(name, superclass, methods);
    }

    private funDeclaration(kind: "function" | "method"): ast.FunctionStmt {
        const name = this.consume(TokenType.IDENTIFIER, `Expect ${kind} name ➔ Se esperaba el nombre de: ${kind}`);
        this.consume(TokenType.LEFT_PAREN, `Expect '(' after ${kind} name ➔ Se esperaba '(' después del nombre de: ${kind}`);

        const params: Token[] = [];
        if (!this.check(TokenType.RIGHT_PAREN)) {
            do {
                if (params.length >= 255)
                    this.error(this.peek(), "Can't have more than 255 parameters ➔ No se puede tener más de 255 parámetros");
                params.push(this.consume(TokenType.IDENTIFIER, "Expect parameter name ➔ Se esperaba el nombre del parámetro"));
            } while (this.match(TokenType.COMMA));
        }
        this.consume(TokenType.RIGHT_PAREN, "Expect ')' after parameters. ➔ Se esperaba ')' después de los parámetros");

        this.consume(TokenType.LEFT_BRACE, `Expect '{' before ${kind} body ➔ Se esperaba '{' antes del cuerpo de: ${kind}`);
        const body = this.block();
        return new ast.FunctionStmt(name, params, body);
    }

    private block(): ast.Stmt[] {
        const statements: ast.Stmt[] = [];

        while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
            statements.push(this.declaration());
        }

        this.consume(TokenType.RIGHT_BRACE, "Expect '}' after block ➔ Se esperaba '}' después del bloque");
        return statements;
    }
    private varDeclaration(): ast.VarStmt {
        const name = this.consume(TokenType.IDENTIFIER, "Expect variable name ➔ Se esperaba el nombre de la variable");

        let initializer: ast.Expr | null = null;
        if (this.match(TokenType.EQUAL)) { initializer = this.expression(); }

        this.consume(TokenType.SEMICOLON, "Expect ';' after variable declaration ➔ Se esperaba ';' después de la declaración de la variable");
        return new ast.VarStmt(name, initializer);
    }

    private statement(): ast.Stmt {
        if (this.match(TokenType.PRINT)) return this.printStatement();
        if (this.match(TokenType.RETURN)) return this.returnStatement();
        if (this.match(TokenType.LEFT_BRACE)) return new ast.BlockStmt(this.block());
        if (this.match(TokenType.IF)) return this.ifStatement();
        if (this.match(TokenType.WHILE)) return this.whileStatement();
        if (this.match(TokenType.FOR)) return this.forStatement();

        return this.expressionStatement();
    }

    private printStatement(): ast.Stmt {
        const value = this.expression();
        this.consume(TokenType.SEMICOLON, "Expect ';' after value ➔ Se esperaba ';' después del valor");
        return new ast.PrintStmt(value);
    }

    private expressionStatement(): ast.Stmt {
        const expr = this.expression();
        this.consume(TokenType.SEMICOLON, "Expect ';' after expression ➔ Se esperaba ';' después de la expresión");
        return new ast.ExpressionStmt(expr);
    }

    private returnStatement(): ast.Stmt {
        const keyword = this.previous();
        let value = null;
        if (!this.check(TokenType.SEMICOLON)) { value = this.expression(); }

        this.consume(TokenType.SEMICOLON, "Expect ';' after return value ➔ Se esperaba ';' después de retornar un valor");
        return new ast.ReturnStmt(keyword, value);
    }

    private ifStatement(): ast.Stmt {
        this.consume(TokenType.LEFT_PAREN, "Expect '(' after 'if' or 'si' ➔ Se esperaba '(' después de 'if' o 'si'");
        const condition = this.expression();
        this.consume(TokenType.RIGHT_PAREN, "Expect ')' after 'if' or 'si' condition ➔ Se esperaba ')' de una condición 'if' o 'si'");

        const thenBranch = this.statement();
        let elseBranch = null;
        if (this.match(TokenType.ELSE)) { elseBranch = this.statement(); }

        return new ast.IfStmt(condition, thenBranch, elseBranch);
    }

    private whileStatement(): ast.Stmt {
        this.consume(TokenType.LEFT_PAREN, "Expect '(' after 'while' or 'mientras' ➔ Se esperaba '(' después de 'while' o 'mientras'");
        const condition = this.expression();
        this.consume(TokenType.RIGHT_PAREN, "Expect ')' after 'if' or 'si' condition ➔ Se esperaba ')' de una condición 'if' o 'si'");
        const body = this.statement();

        return new ast.WhileStmt(condition, body);
    }

    private forStatement(): ast.Stmt {
        this.consume(TokenType.LEFT_PAREN, "Expect '(' after 'for' or 'para' ➔ Se esperaba '(' después de 'for' o 'para'");

        let initializer;
        if (this.match(TokenType.SEMICOLON)) {
            initializer = null;
        } else if (this.match(TokenType.VAR)) {
            initializer = this.varDeclaration();
        } else {
            initializer = this.expressionStatement();
        }

        let condition = null;
        if (!this.check(TokenType.SEMICOLON)) { condition = this.expression(); }
            this.consume(TokenType.SEMICOLON, "Expect ';' after loop condition ➔ Se esperaba ';' después de la condición del bucle");
      

        let increment = null
        if (!this.check(TokenType.RIGHT_PAREN)){ increment = this.expression(); }
        this.consume(TokenType.RIGHT_PAREN, "Expect ')' after for clauses ➔ Se esperaba ')' después de las cláusulas del bucle")

        let body = this.statement()

        /** Desugaring. */
        if (increment !== null) {
            body = new ast.BlockStmt([body, new ast.ExpressionStmt(increment)])
        }
        if (condition === null) { condition = new ast.LiteralExpr(true); }
        body = new ast.WhileStmt(condition, body)
        if (initializer !== null) {
            body = new ast.BlockStmt([initializer, body]);
        }

        return body;
    }

    private consume(type: TokenType, messege: string): Token {

        if (this.check(type)) return this.advance();

        throw this.error(this.peek(), messege);
    }

    error(token: Token, messege: string) {
        if (token.type == TokenType.EOF) {
            new SyntaxError(`${messege} ${token.line} at end`);
            OutputHandlingService.getInstance().errorOccured(`${messege} ${token.line} at end. ➔ ${messege} ${token.line} al final.`);
        } else {
            new SyntaxError(`${token.line} at ${token.lexeme} ${messege}`);
            OutputHandlingService.getInstance().errorOccured(`Line: ${token.line} at Lexeme: ${token.lexeme}, notes: ${messege} ➔ Línea: ${token.line} en Lexema: ${token.lexeme}, notas: ${messege}`);
        }
    }

    private synchronize() {
        this.advance();

        while (!this.isAtEnd()) {
            if (this.previous().type == TokenType.SEMICOLON) return;

            switch (this.peek().type) {
                case TokenType.CLASS:
                case TokenType.FUN:
                case TokenType.VAR:
                case TokenType.FOR:
                case TokenType.IF:
                case TokenType.WHILE:
                case TokenType.PRINT:
                case TokenType.RETURN:
                    break;
            }

            this.advance();
        }
    }



}
import { ErrorHandlingService } from "src/app/services/error-handling.service";
import * as ast from "./ast"
import { Token, TokenType } from "./scanner";

export class Parser {
    private tokens: Token[];
    private current = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    parse() {
        let statements: ast.Stmt[] = [];
        while (!this.isAtEnd()) {
            try {
                return this.expression();
            } catch (error) {
                return null;
            }
        }
        return
    }

    private expression(): ast.Expr {
        return this.equality();
    }

    private equality(): ast.Expr {
        let expr: ast.Expr = this.comparision();

        while (this.match(TokenType.BANG_EQUAL, TokenType.BANG)) {
            let operator: Token = this.previous();
            let right: ast.Expr = this.comparision();
            expr = new ast.BinaryExpr(expr, operator, right);
        }

        return expr;
    }

    private match(...types: TokenType[]): boolean {
        for(const type of types) {
            if (this.check(type)) {
                this.advance();
            }
        }
        return false;
    }

    private check(type: TokenType): boolean {
        if(this.isAtEnd()) {
            return false;
        }
        debugger
        return this.peek().type == type;
    }

    private advance(): Token {
        if (!this.isAtEnd()) this.current++;
        return this.previous();
    } 

    private isAtEnd(): boolean{
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

        while(
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

        while(this.match(TokenType.MINUS, TokenType.PLUS)) {
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
            debugger
            let operator = this.previous();
            let right = this.unary();
            return new ast.UnaryExpr(operator, right);
        }

        return this.primary();
    }

    private primary(): ast.Expr {
        let expr: ast.Expr;
        if (this.match(TokenType.FALSE)) return new ast.LiteralExpr(false);
        if (this.match(TokenType.TRUE)) {debugger; return new ast.LiteralExpr(true);}
        if (this.match(TokenType.NIL)) return new ast.LiteralExpr(null);
        if (this.match(TokenType.STRING)) return new ast.LiteralExpr(this.previous().literal);
        if (this.match(TokenType.LEFT_PAREN)) {
            expr = this.expression();
            this.comsume(TokenType.RIGHT_PAREN, "Expect ')' after expression.");
            return new ast.GroupingExpr(expr);
        }

        throw this.error(this.peek(), "Expect expression");
    }

    private comsume(type: TokenType, messege: string): Token {

        if(this.check(type)) return this.advance();

           throw this.error(this.peek(), messege);
    }

    error(token: Token, messege: string) {

        if (token.type == TokenType.EOF) {
            new SyntaxError(`${messege} ${token.line} at end`);
            ErrorHandlingService.getInstance().syntaxErrorOccured(`${messege} ${token.line} at end`);
        } else {
            new SyntaxError(`${token.line} at ${token.lexeme} ${messege}`);
            ErrorHandlingService.getInstance().syntaxErrorOccured(`${token.line} at ${token.lexeme} ${messege}`);
        }
    } 

    private synchronize() {
        this.advance();

        while (!this.isAtEnd()) {
            if(this.previous().type == TokenType.SEMICOLON) return;

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
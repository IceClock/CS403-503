
enum TokenType {
    // Single-character tokens. 0-10
    LEFT_PAREN, RIGHT_PAREN, LEFT_BRACE, RIGHT_BRACE,
    COMMA, DOT, MINUS, PLUS, SEMICOLON, SLASH, STAR,
  
    // One or two character tokens. 11-18
    BANG, BANG_EQUAL,
    EQUAL, EQUAL_EQUAL,
    GREATER, GREATER_EQUAL,
    LESS, LESS_EQUAL,
  
    // Literals. 19-21
    IDENTIFIER, STRING, NUMBER,
  
    // Keywords. 22-37
    AND, CLASS, ELSE, FALSE, FUN, FOR, IF, NIL, OR,
    PRINT, RETURN, SUPER, THIS, TRUE, VAR, WHILE,
  
    // 38
    EOF
  }

  class Token {
    readonly type: TokenType;
    readonly lexeme: string;
    readonly literal: null;
    readonly line: number;

    constructor(type: TokenType, lexeme: string, literal: null, line: number) {
        this.type = type;
        this.lexeme = lexeme;
        this.literal = literal;
        this.line = line;
    }

    public toString() {
        return this.type + " " + this.lexeme + " " + this.literal;
    }
  }

  class Scanner {
    private readonly source: string;
    private readonly tokens: Token[] = [];
    private start = 0;
    private current = 0;
    private line = 1;
    private get isAtEnd() {
        return this.current >= this.source.length;
    }

    constructor(source: string) {
        this.source = source;
    }

    scanTokens():Token[] {
        while (!this.isAtEnd) {
            this.start = this.current;
            this.scanTokens();
        }

        this.tokens.push(new Token(TokenType.EOF, "", null, this.line));
        return this.tokens;
    }

    private scanToken() {
        const c = this.advance();

        switch (c) {
            case '(':          
                break;
            case ')':          
                break;
            case '{':          
                break;
            case '}':          
                break;
            case ',':          
                break;
            case '.':          
                break;
            case '-':          
                break;
            case '+':          
                break;
            case ';':          
                break;
            case '*':          
                break;
            default:
                SyntaxError(`Unexpected character at line ${this.line}`)
        }
    }

    advance(): string {
        return this.source.charAt(this.current++);
    }

    private addToken(type: TokenType, literal?: null) {
        if (literal == undefined) 
            literal = null;
       const text: string = this.source.substring(this.start, this.current);
       this.tokens.push(new Token (type, text, literal, this.line))
    }

  }




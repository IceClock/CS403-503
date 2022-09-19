
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
    readonly literal: any;
    readonly line: number;

    constructor(type: TokenType, lexeme: string, literal: any, line: number) {
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
    private static readonly keywords: Record<string, TokenType>  =  {
        and: TokenType.AND,
        class: TokenType.CLASS,
        else: TokenType.ELSE,
        false: TokenType.FALSE,
        for: TokenType.FOR,
        fun: TokenType.FUN,
        if: TokenType.IF,
        nil: TokenType.NIL,
        or: TokenType.OR,
        print: TokenType.PRINT,
        return: TokenType.RETURN,
        super: TokenType.SUPER,
        this: TokenType.THIS,
        true: TokenType.TRUE,
        var: TokenType.VAR,
        while: TokenType.WHILE,
      };

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
                this.addToken(TokenType.LEFT_PAREN);         
                break;
            case ')': 
                this.addToken(TokenType.RIGHT_PAREN);                  
                break;
            case '{':    
                this.addToken(TokenType.LEFT_BRACE);       
                break;
            case '}': 
                this.addToken(TokenType.RIGHT_BRACE);          
                break;
            case ',': 
                this.addToken(TokenType.COMMA);          
                break;
            case '.':   
                this.addToken(TokenType.DOT);        
                break;
            case '-':  
                this.addToken(TokenType.MINUS);         
                break;
            case '+':  
                this.addToken(TokenType.PLUS);         
                break;
            case ';': 
                this.addToken(TokenType.SEMICOLON);          
                break;
            case '*':  
                this.addToken(TokenType.STAR);         
                break;
            case '!':
                this.addToken(this.match('=')? TokenType.BANG_EQUAL : TokenType.BANG)          
                break;
            case '=':
                this.addToken(this.match('=')? TokenType.EQUAL_EQUAL : TokenType.EQUAL)          
                break;
            case '<':
                this.addToken(this.match('=')? TokenType.LESS_EQUAL : TokenType.LESS)          
                break;
            case '>':
                this.addToken(this.match('=')? TokenType.GREATER_EQUAL : TokenType.GREATER)          
                break;
            case '/':
                if (this.match('/')) {
                    while (this.peek() != '\n' && this.isAtEnd) {
                        this.advance(); 
                      }
                } else {
                    this.addToken(TokenType.SLASH)
                }
                break;
            // Ignore white space.
            case ' ':
            case '\r':
            case '\t':
                break;
            case '\n':
                this.line++;
                break;
            case '"': 
            this.string();
                break;
            case 'o':
                if (this.match('r')) {
                    this.addToken(TokenType.OR);
                }
                break;
            default:
                if (this.isDigit(c)) {
                    this.number();
                } else if (this.isAlpha(c)) {
                    this.identifier();
                } 
                else {
                    SyntaxError(`${this.line}: Unexpected character.`)
                }
                break;
        }
    }

    advance(): string {
        return this.source.charAt(this.current++);
    }

    private addToken(type: TokenType, literal?: any) {
        if (literal == undefined) 
            literal = null;
       const text: string = this.source.substring(this.start, this.current);
       this.tokens.push(new Token (type, text, literal, this.line))
    }

    private match(expected: string): boolean {
        if (this.isAtEnd) return false;
        if (this.source.charAt(this.current) != expected) return false;

        this.current++;
        return true;
    }

    private peek(): string {
        if (this.isAtEnd) return '\0';

        return this.source.charAt(this.current);
    }
    
     string() {
        while (this.peek() != '"' && !this.isAtEnd) {
            if (this.peek() == '\n') this.line++;
            this.advance();
        }
        if (this.isAtEnd) {
            SyntaxError(`${this.line}: Unterminated string.`);
            return;
        }
        //The closing
        this.advance();

        //Trim the surrounding quotes.
        let value: string = this.source.substring(this.start + 1, this.current -1);
        this.addToken(TokenType.STRING, value);
    }

    private isDigit(c: string): boolean {
        return c >= '0' && c <= '9';
    }

    private number() {
        while (this.isDigit(this.peek())) {
            this.advance();
        }

        if (this.peek() == '.' && this.isDigit(this.peekNext())) {
            this.advance();
        }

        while (this.isDigit(this.peek())) {
            this.advance();
        }
        
        this.addToken(TokenType.NUMBER, parseFloat(this.source.substring(this.start, this.current)));
    }

    private peekNext(): string {
        if (this.current + 1 >= this.source.length) return '\0';
        return this.source.charAt(this.current + 1);
    }

    private identifier() {
        while (this.isAlphaNumeric(this.peek())) {
            this.advance();
        }

        let text: string = this.source.substring(this.start, this.current);
        let type = Scanner.keywords[text];
        if (type == null) {
            type = TokenType.IDENTIFIER;
            return;
        }
        this.addToken(type);
    }

    private isAlpha(c: string): boolean {
        return  (c >= 'a' && c <= 'z') ||
                (c >= 'A' && c <= 'Z') ||
                (c == '_');
    }

    private isAlphaNumeric(c: string): boolean {
        return this.isAlpha(c) || this.isDigit(c);
    }

    
  }




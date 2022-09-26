
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
const TOKEN_STRING: Record<number, string> = {
    // Single-character tokens. 0-10
    0: 'Left paren', 1: 'Right paren', 2: 'Left brace', 3: 'Right brace',
    4: 'Comma', 5: 'Dot', 6: 'Minus', 7: 'Plus', 8: 'Semicolon', 9: 'Slash', 10: 'Star',
  
    // One or two character tokens. 11-18
    11: 'Bang', 12: 'Bang equal',
    13: 'Equal', 14: 'Equal equal',
    15: 'Greater', 16: 'Grater equal',
    17: 'Less', 18: 'Less equal',
  
    // Literals. 19-21
    19: 'Identifier', 20: 'String', 21: 'Number',
  
    // Keywords. 22-37
    22: 'And', 23: 'Class', 24: 'Else', 25: 'False', 26: 'Fun', 27: 'For', 28: 'If', 29: 'Nil', 30: 'Or',
    31: 'Print', 32: 'Return', 33: 'Super', 34: 'This', 35: 'True', 36: 'Var', 37: 'While',
  
    // 38
    38: 'Eof'
  }

  export class Token {
    readonly type: TokenType;
    readonly typeString: string;
    readonly lexeme: string;
    readonly literal: any;
    readonly line: number;

    constructor(type: TokenType, typeString:string, lexeme: string, literal: any, line: number) {
        this.type = type;
        this.typeString = typeString;
        this.lexeme = lexeme;
        this.literal = literal;
        this.line = line;
    }

    public toString() {
        return this.typeString + " : " + this.type + " " + this.lexeme + " " + this.literal;
    }
  }

  export class Scanner {
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
            this.scanToken();
        }

        this.tokens.push(new Token(TokenType.EOF, TOKEN_STRING[TokenType.EOF] , "", null, this.line));
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
                    while (this.peek() != '\n' && !this.isAtEnd) {
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
       
       this.tokens.push(new Token (type, TOKEN_STRING[type] ,text, literal, this.line))
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
        return c.charCodeAt(0) >= '0'.charCodeAt(0) && c.charCodeAt(0) <= '9'.charCodeAt(0);
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
        let litralValue = parseFloat(this.source.substring(this.start, this.current));
        this.addToken(TokenType.NUMBER, litralValue);
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
        }
        this.addToken(type);
    }

    private isAlpha(c: string): boolean {
        return  (c.charCodeAt(0) >='a'.charCodeAt(0) && c.charCodeAt(0) <= 'z'.charCodeAt(0)) ||
                (c.charCodeAt(0) >= 'A'.charCodeAt(0) && c.charCodeAt(0) <= 'Z'.charCodeAt(0)) ||
                (c.charCodeAt(0) == '_'.charCodeAt(0));
    }

    private isAlphaNumeric(c: string): boolean {
        return this.isAlpha(c) || this.isDigit(c);
    }

    
  }




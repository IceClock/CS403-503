import { Token } from "./scanner"
import * as ast from "./ast"
import { Interpreter, Environment } from "./interpreter"
import { OutputHandlingService } from "src/app/services/error-handling.service"

export abstract class LoxCallable {
  abstract arity(): number;
  abstract call(interpreter: Interpreter, args: any[]): any;
  abstract toString(): string;
}

export class LoxClockFunction extends LoxCallable {
  arity(): number {
    return 0;
  }

  call(): any {
    return Date.now().valueOf() / 1000.0;
  }

  toString(): string {
    return "native function clock";
  }
}

export class LoxFunction extends LoxCallable {
  static Return = class Return {
    value: any;

    constructor(value: any) {
      this.value = value;
    }
  }

  private declaration: ast.FunctionStmt;
  private closure: Environment;
  private isInitializer: boolean;

  constructor(
    declaration: ast.FunctionStmt,
    closure: Environment,
    isInitializer: boolean
  ) {
    super();
    this.closure = closure;
    this.declaration = declaration;
    this.isInitializer = isInitializer;
  }

  arity(): number {
    return this.declaration.params.length;
  }

  call(interpreter: Interpreter, args: any[]): any {
    const environment = new Environment(this.closure);
    for (const [i, param] of this.declaration.params.entries()) {
      environment.define(param.lexeme, args[i]);
    }

    try {
      interpreter?.['executeBlock'](this.declaration.body, environment)
    } catch (e) {
      if (e instanceof LoxFunction.Return) {
        if (this.isInitializer) return this.closure.getThis();
        else return e.value
      } else throw e // Propagate if a real error occurs
    }

    if (this.isInitializer) return this.closure.getThis();
    return null;
  }

  toString(): string {
    return `<fun ${this.declaration.name.lexeme}>`;
  }

  bind(instance: LoxInstance): LoxFunction {
    const environment = new Environment(this.closure);
    environment.define("this", instance);
    return new LoxFunction(this.declaration, environment, this.isInitializer);
  }
}

export class LoxClass extends LoxCallable {
  name: string;
  superclass: LoxClass | null;
  methods: Record<string, LoxFunction>;

  constructor(
    name: string,
    superclass: LoxClass | null | any,
    methods: Record<string, LoxFunction>
  ) {
    super()
    this.name = name;
    this.superclass = superclass;
    this.methods = methods;
  }

  arity(): number {
    const initializer = this.findMethod("init");
    if (initializer === null) return 0;
    return initializer.arity();
  }

  call(interpreter: Interpreter, args: any[]): any {
    const instance = new LoxInstance(this);
    const initializer = this.findMethod("init");
    if (initializer !== null) initializer.bind(instance).call(interpreter, args);
    return instance;
  }

  toString(): string {
    return `<class ${this.name}>`;
  }

  findMethod(name: string): LoxFunction | null {
    if (name in this.methods) return this.methods[name];

    if (this.superclass !== null) {
      return this.superclass.findMethod(name);
    }

    return null;
  }
}
  
export class LoxInstance {
  private klass: LoxClass;
  private fields: Record<string, any> = {};

  constructor(klass: LoxClass) {
    this.klass = klass;
  }

  get(name: Token): any {
    if (name.lexeme in this.fields) return this.fields[name.lexeme];

    const method = this.klass.findMethod(name.lexeme);
    if (method !== null) return method.bind(this);

    OutputHandlingService.getInstance().syntaxErrorOccured(`Undefined property ${name.lexeme}, name`);
  }

  set(name: Token, value: any): void {
    this.fields[name.lexeme] = value;
  }

  toString(): string {
    return `${this.klass.name} instance`;
  }
}



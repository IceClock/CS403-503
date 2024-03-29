import { Token } from "./spanish-scanner"
import * as ast from "./ast"
import { SpanishInterpreter, Environment } from "./interpreter"
import { OutputHandlingService } from "src/app/services/output-handling.service"

export abstract class TypeCallable {
  abstract arity(): number;
  abstract call(interpreter: SpanishInterpreter, args: any[]): any;
  abstract toString(): string;
}

export class TypeClockFunction extends TypeCallable {
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

export class TypeFunction extends TypeCallable {
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

  call(interpreter: SpanishInterpreter, args: any[]): any {
    const environment = new Environment(this.closure);
    for (const [i, param] of this.declaration.params.entries()) {
      environment.define(param.lexeme, args[i]);
    }

    try {
      interpreter.executeBlock(this.declaration.body, environment)
    } catch (e) {
      if (e instanceof TypeFunction.Return) {
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

  bind(instance: TypeInstance): TypeFunction {
    const environment = new Environment(this.closure);
    environment.define("this", instance);
    environment.define("este", instance);
    return new TypeFunction(this.declaration, environment, this.isInitializer);
  }
}

export class TypeClass extends TypeCallable {
  name: string;
  superclass: TypeClass | null;
  methods: Record<string, TypeFunction>;

  constructor(
    name: string,
    superclass: TypeClass | null | any,
    methods: Record<string, TypeFunction>
  ) {
    super()
    this.name = name;
    this.superclass = superclass;
    this.methods = methods;
  }

  arity(): number {
    const initializer = this.findMethod("init");
    const spanishInitializer = this.findMethod("inicio");
    if (initializer !== null) {
      return initializer.arity();
    } else if(spanishInitializer !== null) {
      return spanishInitializer.arity();
    }
    return 0;
  }

  call(interpreter: SpanishInterpreter, args: any[]): any {
    const instance = new TypeInstance(this);
    const initializer = this.findMethod("init");
    const spanishInitializer = this.findMethod("inicio");
    if (initializer !== null) {
      initializer.bind(instance).call(interpreter, args);
    } else if(spanishInitializer !== null) {
      spanishInitializer.bind(instance).call(interpreter, args);
    }
    return instance;
  }

  toString(): string {
    return `<class ${this.name}>`;
  }

  findMethod(name: string): TypeFunction | null {
    if (name in this.methods) return this.methods[name];

    if (this.superclass !== null) {
      return this.superclass.findMethod(name);
    }

    return null;
  }
}
  
export class TypeInstance {
  private klass: TypeClass;
  private fields: Record<string, any> = {};

  constructor(klass: TypeClass) {
    this.klass = klass;
  }

  get(name: Token): any {
    if (name.lexeme in this.fields) return this.fields[name.lexeme];

    const method = this.klass.findMethod(name.lexeme);
    if (method !== null) return method.bind(this);

    OutputHandlingService.getInstance().errorOccured(`Undefined property ${name.lexeme}, name ➔ Propiedad no definida ${name.lexeme}, nombre`);
  }

  set(name: Token, value: any): void {
    this.fields[name.lexeme] = value;
  }

  toString(): string {
    return `${this.klass.name} instance`;
  }
}



import { OutputHandlingService } from "src/app/services/output-handling.service";

const ZERO = typeof BigInt === 'undefined' ? 0 : BigInt(0);
const ONE = typeof BigInt === 'undefined' ? 1 : BigInt(1);
function isNumeric(x: any) {
    const t = typeof x;
    return t === 'number' || t === 'bigint';
}
function add(x: any, y: any) {
    if (typeof x === 'number') {
        if (typeof y === 'number') return x + y;
        else return x + Number(y);
    } else {
        if (typeof y === 'number') return Number(x) + y;
        else return x + y;
    }
}
function subtract(x: any, y: any) {
    if (typeof x === 'number') {
        if (typeof y === 'number') return x - y;
        else return x - Number(y);
    } else {
        if (typeof y === 'number') return Number(x) - y;
        else return x - y;
    }
}
function multiply(x: any, y: any) {
    if (typeof x === 'number') {
        if (typeof y === 'number') return x * y;
        else return x * Number(y);
    } else {
        if (typeof y === 'number') return Number(x) * y;
        else return x * y;
    }
}
function divide(x: any, y: any) {
    return Number(x) / Number(y);
}
function quotient(x: any, y: any) {
    if (typeof x === 'number' || typeof y === 'number') {
        const q = Math.trunc(Number(x) / Number(y));
        if (typeof BigInt === 'undefined') return q;
        else return BigInt(q);
    } else {
        return x / y;
    }
}
function remainder(x: any, y: any) {
    if (typeof x === 'number' || typeof y === 'number') return Number(x) % Number(y);
    else return x % y;
}
function compare(x: any, y: any) {
    if (typeof x === 'number') {
        if (typeof y === 'number') return Math.sign(x - y);
        else return Math.sign(x - Number(y));
    } else {
        if (typeof y === 'number') return Math.sign(Number(x) - y);
        else return x < y ? -1 : y < x ? 1 : 0;
    }
}
function tryToParse(token: any) {
    try {
        return BigInt(token);
    } catch (_ex) {
        const n = Number(token);
        if (isNaN(n)) return null;
        return n;
    }
}
function convertgetString(x: any) {
    const s = x + '';
    if (typeof BigInt !== 'undefined') {
        if (typeof x === 'number') {
            if (Number.isInteger(x) && !s.includes('e')) return s + '.0';
        }
    }
    return s;
}
function assert(x: any, message?: any): any {
    if (!x) throw OutputHandlingService.getInstance().errorOccured("Assertion Failure: " + (message || ""));
}
let readLine: any;
let exit: any;
class Cell {
    constructor(car: any, cdr: any) {
        this.car = car;
        this.cdr = cdr;
    }
    getString() {
        return "(" + this.car + " . " + this.cdr + ")";
    }
    get length() {
        return foldl(0, this, (i: any, _: any) => i + 1
        );
    }
    car;
    cdr;
}
function foldl(x: any, j: any, fn: any) {
    while (j !== null) {
        x = fn(x, j.car);
        j = j.cdr;
    }
    return x;
}
function mapcar(j: any, fn: any) {
    if (j === null) return null;
    const a = fn(j.car);
    let d = j.cdr;
    if (d instanceof Cell) d = mapcar(d, fn);
    if (Object.is(j.car, a) && Object.is(j.cdr, d)) return j;
    return new Cell(a, d);
}
class Sym {
    constructor(name: any) {
        this.name = name;
    }
    getString() {
        return this.name;
    }
    get isInterned() {
        return symTable[this.name] === this;
    }
    name;
}
class Keyword extends Sym {
    constructor(name: any) {
        super(name);
    }
}
const symTable: any = {};
function newSym(name: any, isKeyword = false) {
    let result = symTable[name];
    assert(result === undefined || !isKeyword, name);
    if (result === undefined) {
        result = isKeyword ? new Keyword(name) : new Sym(name);
        symTable[name] = result;
    }
    return result;
}
function newKeyword(name: any) {
    return newSym(name, true);
}
const backQuoteSym = newSym("`");
const commaAtSym = newSym(",@");
const commaSym = newSym(",");
const dotSym = newSym(".");
const leftParenSym = newSym("(");
const rightParenSym = newSym(")");
const singleQuoteSym = newSym("'");
const appendSym = newSym("append");
const consSym = newSym("cons");
const listSym = newSym("list");
const restSym = newSym("&rest");
const unquoteSym = newSym("unquote");
const unquoteSplicingSym = newSym("unquote-splicing");
const condSym = newKeyword("cond");
const lambdaSym = newKeyword("lambda");
const macroSym = newKeyword("macro");
const prognSym = newKeyword("progn");
const quasiquoteSym = newKeyword("quasiquote");
const quoteSym = newKeyword("quote");
const setSym = newKeyword("set");
function cdrCell(x: any): any {
    const k = x.cdr;
    if (k instanceof Cell) return k;
    else if (k === null) return null;
    else throw OutputHandlingService.getInstance().errorOccured(new EvalException("proper list expected", x).getString());
}
class Func {
    constructor(carity: any) {
        this.carity = carity;
    }
    get arity() {
        return this.carity < 0 ? -this.carity : this.carity;
    }
    get hasRest() {
        return this.carity < 0;
    }
    get fixedArgs() {
        return this.carity < 0 ? -this.carity - 1 : this.carity;
    }
    makeFrame(arg: any) {
        const frame = new Array(this.arity);
        const n = this.fixedArgs;
        let i = 0;
        for (; i < n && arg !== null; i++) {
            frame[i] = arg.car;
            arg = cdrCell(arg);
        }
        if (i !== n || arg !== null && !this.hasRest) throw OutputHandlingService.getInstance().errorOccured(new EvalException("arity not matched", this).getString());
        if (this.hasRest) frame[n] = arg;
        return frame;
    }
    evalFrame(frame: any, interp: any, env: any) {
        const n = this.fixedArgs;
        for (let i = 0; i < n; i++)frame[i] = interp.eval(frame[i], env);
        if (this.hasRest && frame[n] instanceof Cell) {
            let z: any = null;
            let y: any = null;
            for (let j = frame[n]; j !== null; j = cdrCell(j)) {
                const e = interp.eval(j.car, env);
                const x = new Cell(e, null);
                if (z === null) {
                    z = x;
                } else {
                    assert(y !== null);
                    y.cdr = x;
                }
                y = x;
            }
            frame[n] = z;
        }
    }
    carity;
}
class DefinedFunc extends Func {
    constructor(carity: any, body: any) {
        super(carity);
        this.body = body;
    }
    body;
}
class Macro extends DefinedFunc {
    constructor(carity: any, body: any) {
        super(carity, body);
    }
    getString() {
        return `#<macro:${this.carity}:${str(this.body)}>`;
    }
    expandWith(interp: any, arg: any) {
        const frame = this.makeFrame(arg);
        const env = new Cell(frame, null);
        let x = null;
        for (let j = this.body; j !== null; j = cdrCell(j))x = interp.eval(j.car, env);
        return x;
    }
    static make(carity: any, body: any, env: any) {
        assert(env === null);
        return new Macro(carity, body);
    }
}
class Lambda extends DefinedFunc {
    constructor(carity: any, body: any) {
        super(carity, body);
    }
    getString() {
        return `#<lambda:${this.carity}:${str(this.body)}>`;
    }
    static make(carity: any, body: any, env: any) {
        assert(env === null);
        return new Lambda(carity, body);
    }
}
class Closure extends DefinedFunc {
    constructor(carity: any, body: any, env: any) {
        super(carity, body);
        this.env = env;
    }
    static makeFrom(x: any, env: any) {
        return new Closure(x.carity, x.body, env);
    }
     getString() {
        return `#<closure:${this.carity}:${str(this.env)}:${str(this.body)}>`;
    }
    makeEnv(interp: any, arg: any, interpEnv: any) {
        const frame = this.makeFrame(arg);
        this.evalFrame(frame, interp, interpEnv);
        return new Cell(frame, this.env);
    }
    static make(carity: any, body: any, env: any) {
        return new Closure(carity, body, env);
    }
    env;
}
class BuiltInFunc extends Func {
    constructor(name: any, carity: any, body: any) {
        super(carity);
        this.name = name;
        this.body = body;
    }
    getString() {
        return "#<" + this.name + ":" + this.carity + ">";
    }
    evalWith(interp: any, arg: any, interpEnv: any) {
        const frame = this.makeFrame(arg);
        this.evalFrame(frame, interp, interpEnv);
        try {
            return this.body(frame);
        } catch (ex) {
            if (ex instanceof EvalException) throw ex;
            else throw OutputHandlingService.getInstance().errorOccured(new EvalException(ex + " -- " + this.name, frame).getString());
        }
    }
    name;
    body;
}
class Arg {
    constructor(level: any, offset: any, symbol: any) {
        this.level = level;
        this.offset = offset;
        this.symbol = symbol;
    }
    getString() {
        return "#" + this.level + ":" + this.offset + ":" + this.symbol;
    }
    setValue(x: any, env: any) {
        for (let i = 0; i < this.level; i++)env = env.cdr;
        env.car[this.offset] = x;
    }
    getValue(env: any) {
        for (let i = 0; i < this.level; i++)env = env.cdr;
        return env.car[this.offset];
    }
    level;
    offset;
    symbol;
}
class EvalException extends Error {
    trace: any = [];
    constructor(msg: any, x: any, quoteString = true) {
        super(msg + ": " + str(x, quoteString));
    }
   getString() {
        let s = "EvalException: " + this.message;
        for (const line of this.trace) s += "\n\t" + line;
        return s;
    }
}
class NotVariableException extends EvalException {
    constructor(x: any) {
        super("variable expected", x);
    }
}
class FormatException extends Error {
    constructor(msg: any) {
        super(msg);
    }
}
const EndOfFile = {
    getString: () => "EOF"
};
export class Interp {
    globals = new Map();
    constructor() {
        this.def("car", 1, (a: any) => a[0] === null ? null : a[0].car
        );
        this.def("cdr", 1, (a: any) => a[0] === null ? null : a[0].cdr
        );
        this.def("cons", 2, (a: any) => new Cell(a[0], a[1])
        );
        this.def("atom", 1, (a: any) => a[0] instanceof Cell ? null : true
        );
        this.def("eq", 2, (a: any) => Object.is(a[0], a[1]) ? true : null
        );
        this.def("list", -1, (a: any) => a[0]
        );
        this.def("rplaca", 2, (a: any) => {
            a[0].car = a[1];
            return a[1];
        });
        this.def("rplacd", 2, (a: any) => {
            a[0].cdr = a[1];
            return a[1];
        });
        this.def("length", 1, (a: any) => a[0] === null ? 0 : quotient(a[0].length, 1)
        );
        this.def("symbol?", 1, (a: any) => typeof a[0] === "string" ? true : null
        );
        this.def("number?", 1, (a: any) => isNumeric(a[0]) ? true : null
        );
        this.def("eql", 2, (a: any) => {
            const x = a[0];
            const y = a[1];
            return x === y ? true : isNumeric(x) && isNumeric(y) && compare(x, y) === 0 ? true : null;
        });
        this.def("<", 2, (a: any) => compare(a[0], a[1]) < 0 ? true : null
        );
        this.def("%", 2, (a: any) => remainder(a[0], a[1])
        );
        this.def("mod", 2, (a: any) => {
            const x = a[0];
            const y = a[1];
            const q = remainder(x, y);
            return compare(multiply(x, y), ZERO) < 0 ? add(q, y) : q;
        });
        this.def("+", -1, (a: any) => foldl(ZERO, a[0], (i: any, j: any) => add(i, j)
        )
        );
        this.def("*", -1, (a: any) => foldl(ONE, a[0], (i: any, j: any) => multiply(i, j)
        )
        );
        this.def("-", -2, (a: any) => {
            const x = a[0];
            const y = a[1];
            return y == null ? -x : foldl(x, y, (i: any, j: any) => subtract(i, j)
            );
        });
        this.def("/", -3, (a: any) => foldl(divide(a[0], a[1]), a[2], (i: any, j: any) => divide(i, j)
        )
        );
        this.def("truncate", -2, (a: any) => {
            const x = a[0];
            const y = a[1];
            if (y === null) {
                return quotient(x, ONE);
            } else if (y.cdr === null) {
                return quotient(x, y.car);
            } else {
                throw OutputHandlingService.getInstance().errorOccured("one or two arguments expected");
            }
        });
        this.def("prin1", 1, (a: any) => {
            OutputHandlingService.getInstance().print(str(a[0], true));
            return a[0];
        });
        this.def("princ", 1, (a: any) => {
            OutputHandlingService.getInstance().print(str(a[0], false));
            return a[0];
        });
        this.def("terpri", 0, (_a: any) => {
            OutputHandlingService.getInstance().print("\n");
            return true;
        });
        const gensymCounter = newSym("*gensym-counter*");
        this.globals.set(gensymCounter, ONE);
        this.def("gensym", 0, (_a: any) => {
            const i = this.globals.get(gensymCounter);
            this.globals.set(gensymCounter, add(i, ONE));
            return new Sym("G" + i);
        });
        this.def("make-symbol", 1, (a: any) => new Sym(a[0])
        );
        this.def("intern", 1, (a: any) => newSym(a[0])
        );
        this.def("symbol-name", 1, (a: any) => a[0].name
        );
        this.def("apply", 2, (a: any) => this.eval(new Cell(a[0], mapcar(a[1], qqQuote)), null)
        );
        this.def("exit", 1, (a: any) => exit(Number(a[0]))
        );
        this.def("dump", 0, (_a: any) => {
            let s = null;
            for (const x of this.globals.keys()) s = new Cell(x, s);
            return s;
        });
        this.globals.set(newSym("*version*"), new Cell(2.1, new Cell("TypeScript", new Cell("Nukata Lisp", null))));
    }
    def(name: any, carity: any, body: any) {
        const sym = newSym(name);
        this.globals.set(sym, new BuiltInFunc(name, carity, body));
    }
    eval(x: any, env: any): any {
        try {
            for (; ;) {
                if (x instanceof Arg) {
                    assert(env !== null);
                    return x.getValue(env);
                } else if (x instanceof Sym) {
                    const value = this.globals.get(x);
                    if (value === undefined) throw OutputHandlingService.getInstance().errorOccured(new EvalException("void variable", x).getString());
                    return value;
                } else if (x instanceof Cell) {
                    let fn = x.car;
                    const arg = cdrCell(x);
                    if (fn instanceof Keyword) {
                        switch (fn) {
                            case quoteSym:
                                if (arg !== null && arg.cdr === null) return arg.car;
                                throw OutputHandlingService.getInstance().errorOccured(new EvalException("bad quote", x).getString());
                            case prognSym:
                                x = this.evalProgN(arg, env);
                                break;
                            case condSym:
                                x = this.evalCond(arg, env);
                                break;
                            case setSym:
                                return this.evalset(arg, env);
                            case lambdaSym:
                                return this.compile(arg, env, Closure.make);
                            case macroSym:
                                if (env !== null) throw OutputHandlingService.getInstance().errorOccured(new EvalException("nested macro", x).getString());
                                return this.compile(arg, null, Macro.make);
                            case quasiquoteSym:
                                if (arg !== null && arg.cdr === null) {
                                    x = qqExpand(arg.car);
                                    break;
                                }
                                throw OutputHandlingService.getInstance().errorOccured(new EvalException("bad quasiquote", x).getString());
                            default:
                                throw OutputHandlingService.getInstance().errorOccured(new EvalException("bad keyword", fn).getString());
                        }
                    } else {
                        if (fn instanceof Sym) {
                            fn = this.globals.get(fn);
                            if (fn === undefined) throw OutputHandlingService.getInstance().errorOccured(new EvalException("undefined", x.car).getString());
                        } else {
                            fn = this.eval(fn, env);
                        }
                        if (fn instanceof Closure) {
                            env = fn.makeEnv(this, arg, env);
                            x = this.evalProgN(fn.body, env);
                        } else if (fn instanceof Macro) {
                            x = fn.expandWith(this, arg);
                        } else if (fn instanceof BuiltInFunc) {
                            return fn.evalWith(this, arg, env);
                        } else {
                            throw OutputHandlingService.getInstance().errorOccured(new EvalException("not applicable", fn).getString());
                        }
                    }
                } else if (x instanceof Lambda) {
                    return Closure.makeFrom(x, env);
                } else {
                    return x;
                }
            }
        } catch (ex: any) {
            if (ex instanceof EvalException) {
                if (ex.trace.length < 10) ex.trace.push(str(x));
            }
            throw OutputHandlingService.getInstance().errorOccured(ex?.getString());
        }
    }
    evalProgN(j: any, env: any) {
        if (j === null) return null;
        for (; ;) {
            const x = j.car;
            j = cdrCell(j);
            if (j === null) return x;
            this.eval(x, env);
        }
    }
    evalCond(j: any, env: any) {
        for (; j !== null; j = cdrCell(j)) {
            const clause = j.car;
            if (clause instanceof Cell) {
                const result = this.eval(clause.car, env);
                if (result !== null) {
                    const body = cdrCell(clause);
                    if (body === null) return qqQuote(result);
                    else return this.evalProgN(body, env);
                }
            } else if (clause !== null) {
                throw OutputHandlingService.getInstance().errorOccured(new EvalException("cond test expected", clause).getString()); 
            }
        }
        return null;
    }
    evalset(j: any, env: any) {
        let result = null;
        for (; j !== null; j = cdrCell(j)) {
            const lval = j.car;
            j = cdrCell(j);
            if (j === null) throw OutputHandlingService.getInstance().errorOccured(new EvalException("right value expected", lval).getString());
            result = this.eval(j.car, env);
            if (lval instanceof Arg) {
                assert(env !== null);
                lval.setValue(result, env);
            } else if (lval instanceof Sym && !(lval instanceof Keyword)) {
                this.globals.set(lval, result);
            } else {
                throw OutputHandlingService.getInstance().errorOccured(new NotVariableException(lval).getString());
            }
        }
        return result;
    }
    compile(arg: any, env: any, make: any): any {
        if (arg === null) throw OutputHandlingService.getInstance().errorOccured(new EvalException("arglist and body expected", arg).getString());
        const table = new Map();
        const [hasRest, arity] = makeArgTable(arg.car, table);
        let body = cdrCell(arg);
        body = scanForArgs(body, table);
        body = this.expandMacros(body, 20);
        body = this.compileInners(body);
        return make(hasRest ? -arity : arity, body, env);
    }
    expandMacros(j: any, count: any): any {
        if (count > 0 && j instanceof Cell) {
            let k = j.car;
            switch (k) {
                case quoteSym:
                case lambdaSym:
                case macroSym:
                    return j;
                case quasiquoteSym:
                    {
                        const d = cdrCell(j);
                        if (d !== null && d.cdr === null) {
                            const z = qqExpand(d.car);
                            return this.expandMacros(z, count);
                        }
                        throw OutputHandlingService.getInstance().errorOccured(new EvalException("bad quasiquote", j).getString());
                    }
                default:
                    if (k instanceof Sym) k = this.globals.get(k);
                    if (k instanceof Macro) {
                        const d = cdrCell(j);
                        const z = k.expandWith(this, d);
                        return this.expandMacros(z, count - 1);
                    }
                    return mapcar(j, (x: any) => this.expandMacros(x, count)
                    );
            }
        } else {
            return j;
        }
    }
    compileInners(j: any) {
        if (j instanceof Cell) {
            const k = j.car;
            switch (k) {
                case quoteSym:
                    return j;
                case lambdaSym:
                    {
                        const d = cdrCell(j);
                        return this.compile(d, null, Lambda.make);
                    }
                case macroSym:
                    throw OutputHandlingService.getInstance().errorOccured(new EvalException("nested macro", j).getString());
                default:
                    return mapcar(j, (x: any) => this.compileInners(x)
                    );
            }
        } else {
            return j;
        }
    }
}
function makeArgTable(arg: any, table: any) {
    if (arg === null) {
        return [
            false,
            0
        ];
    } else if (arg instanceof Cell) {
        let ag = arg;
        let offset = 0;
        let hasRest = false;
        for (; ag !== null; ag = cdrCell(ag)) {
            let j = ag.car;
            if (hasRest) throw OutputHandlingService.getInstance().errorOccured(new EvalException("2nd rest", j).getString());
            if (j === restSym) {
                ag = cdrCell(ag);
                if (ag === null) throw OutputHandlingService.getInstance().errorOccured(new NotVariableException(ag).getString());
                j = ag.car;
                if (j === restSym) throw OutputHandlingService.getInstance().errorOccured(new NotVariableException(j).getString());
                hasRest = true;
            }
            let sym;
            if (j instanceof Sym) sym = j;
            else if (j instanceof Arg) sym = j.symbol;
            else throw OutputHandlingService.getInstance().errorOccured(new NotVariableException(j).getString());
            if (table.has(sym)) throw OutputHandlingService.getInstance().errorOccured(new EvalException("duplicated argument name", j).getString());
            table.set(sym, new Arg(0, offset, sym));
            offset++;
        }
        return [
            hasRest,
            offset
        ];
    } else {
        throw OutputHandlingService.getInstance().errorOccured(new EvalException("arglist expected", arg).getString());
    }
}
function scanForArgs(j: any, table: any): any {
    if (j instanceof Sym) {
        const k = table.get(j);
        return k === undefined ? j : k;
    } else if (j instanceof Arg) {
        const k = table.get(j.symbol);
        return k === undefined ? new Arg(j.level + 1, j.offset, j.symbol) : k;
    } else if (j instanceof Cell) {
        if (j.car === quoteSym) {
            return j;
        } else if (j.car === quasiquoteSym) {
            return new Cell(quasiquoteSym, scanForQQ(j.cdr, table, 0));
        } else {
            return mapcar(j, (x: any) => scanForArgs(x, table)
            );
        }
    } else {
        return j;
    }
}
function scanForQQ(j: any, table: any, level: any): any {
    if (j instanceof Cell) {
        const k = j.car;
        if (k === quasiquoteSym) {
            return new Cell(k, scanForQQ(j.cdr, table, level + 1));
        } else if (k === unquoteSym || k === unquoteSplicingSym) {
            const d = level === 0 ? scanForArgs(j.cdr, table) : scanForQQ(j.cdr, table, level - 1);
            if (Object.is(d, j.cdr)) return j;
            return new Cell(k, d);
        } else {
            return mapcar(j, (x: any) => scanForQQ(x, table, level)
            );
        }
    } else {
        return j;
    }
}
function qqExpand(x: any) {
    return qqExpand0(x, 0);
}
function qqExpand0(x: any, level: any): any {
    if (x instanceof Cell) {
        if (x.car === unquoteSym) {
            if (level === 0) return x.cdr.car;
        }
        const t = qqExpand1(x, level);
        if (t.car instanceof Cell && t.cdr === null) {
            const k = t.car;
            if (k.car == listSym || k.car === consSym) return k;
        }
        return new Cell(appendSym, t);
    } else {
        return qqQuote(x);
    }
}
function qqQuote(x: any) {
    if (x instanceof Sym || x instanceof Cell) return new Cell(quoteSym, new Cell(x, null));
    return x;
}
function qqExpand1(x: any, level: any): any {
    if (x instanceof Cell) {
        if (x.car === unquoteSym) {
            if (level === 0) return x.cdr;
            level--;
        } else if (x.car === quasiquoteSym) {
            level++;
        }
        const h = qqExpand2(x.car, level);
        const t = qqExpand1(x.cdr, level);
        if (t.car === null && t.cdr === null) {
            return new Cell(h, null);
        } else if (h instanceof Cell) {
            if (h.car === listSym) {
                const tcar = t.car;
                if (tcar instanceof Cell) {
                    if (tcar.car === listSym) {
                        const hh = qqConcat(h, tcar.cdr);
                        return new Cell(hh, t.cdr);
                    }
                }
                if (h.cdr instanceof Cell) {
                    const hh = qqConsCons(h.cdr, tcar);
                    return new Cell(hh, t.cdr);
                }
            }
        }
        return new Cell(h, t);
    } else {
        return new Cell(qqQuote(x), null);
    }
}
function qqConcat(x: any, y: any): any {
    if (x === null) return y;
    return new Cell(x.car, qqConcat(x.cdr, y));
}
function qqConsCons(x: any, y: any): any {
    if (x === null) return y;
    return new Cell(consSym, new Cell(x.car, new Cell(qqConsCons(x.cdr, y), null)));
}
function qqExpand2(y: any, level: any) {
    if (y instanceof Cell) {
        switch (y.car) {
            case unquoteSym:
                if (level === 0) return new Cell(listSym, y.cdr);
                level--;
                break;
            case unquoteSplicingSym:
                if (level === 0) return y.cdr.car;
                level--;
                break;
            case quasiquoteSym:
                level++;
                break;
        }
    }
    return new Cell(listSym, new Cell(qqExpand0(y, level), null));
}
class Reader {
    token: any;
    tokens: any = [];
    lineNo = 1;
    push(text: any) {
        const tokenPat = /\s+|;.*$|("(\\.?|.)*?"|,@?|[^()'`~"; \t]+|.)/g;
        for (const line of text.split("\n")) {
            for (; ;) {
                const result = tokenPat.exec(line);
                if (result === null) break;
                const s = result[1];
                if (s !== undefined) this.tokens.push(s);
            }
            this.tokens.push("\n");
        }
    }
    copyFrom(other: any) {
        this.tokens = other.tokens.slice();
        this.lineNo = other.lineNo;
    }
    clear() {
        this.tokens.length = 0;
    }
    isEmpty() {
        return this.tokens.every((t: any) => t === "\n"
        );
    }
    read() {
        try {
            this.readToken();
            return this.parseExpression();
        } catch (ex) {
            if (ex === EndOfFile) throw OutputHandlingService.getInstance().errorOccured(EndOfFile?.getString());
            else if (ex instanceof FormatException) throw OutputHandlingService.getInstance().errorOccured(new EvalException("syntax error", ex.message + " at " + this.lineNo, false).getString());
            else throw ex;
        }
    }
    parseExpression(): any {
        switch (this.token) {
            case leftParenSym:
                this.readToken();
                return this.parseListBody();
            case singleQuoteSym:
                this.readToken();
                return new Cell(quoteSym, new Cell(this.parseExpression(), null));
            case backQuoteSym:
                this.readToken();
                return new Cell(quasiquoteSym, new Cell(this.parseExpression(), null));
            case commaSym:
                this.readToken();
                return new Cell(unquoteSym, new Cell(this.parseExpression(), null));
            case commaAtSym:
                this.readToken();
                return new Cell(unquoteSplicingSym, new Cell(this.parseExpression(), null));
            case dotSym:
            case rightParenSym:
                throw OutputHandlingService.getInstance().errorOccured(new FormatException('unexpected "' + this.token + '"')?.message);
            default:
                return this.token;
        }
    }
    parseListBody(): any {
        if (this.token === rightParenSym) {
            return null;
        } else {
            const e1 = this.parseExpression();
            this.readToken();
            let e2;
            if (this.token == dotSym) {
                this.readToken();
                e2 = this.parseExpression();
                this.readToken();
                if (this.token !== rightParenSym) throw OutputHandlingService.getInstance().errorOccured(new FormatException('")" expected: ' + this.token)?.message);
            } else {
                e2 = this.parseListBody();
            }
            return new Cell(e1, e2);
        }
    }
    readToken() {
        for (; ;) {
            const t = this.tokens.shift();
            if (t === undefined) {
                throw OutputHandlingService.getInstance().errorOccured(EndOfFile.getString());
            } else if (t === "\n") {
                this.lineNo += 1;
            } else if (t === "+" || t === "-") {
                this.token = newSym(t);
                return;
            } else {
                if (t[0] === '"') {
                    let s = t;
                    const n = s.length - 1;
                    if (n < 1 || s[n] !== '"') throw OutputHandlingService.getInstance().errorOccured(new FormatException("bad string: " + s)?.message);
                    s = s.substring(1, n);
                    s = s.replace(/\\./g, (m: any) => {
                        const val = Reader.escapes[m];
                        return val === undefined ? m : val;
                    });
                    this.token = s;
                    return;
                }
                const n = tryToParse(t);
                if (n !== null) this.token = n;
                else if (t === "nil") this.token = null;
                else if (t === "t") this.token = true;
                else this.token = newSym(t);
                return;
            }
        }
    }
    static escapes: any = {
        "\\\\": "\\",
        '\\"': '"',
        "\\n": "\n",
        "\\r": "\r",
        "\\f": "\f",
        "\\b": "\b",
        "\\t": "\t",
        "\\v": "\v"
    };
}
const quotes = {
    [quoteSym.name]: "'",
    [quasiquoteSym.name]: "`",
    [unquoteSym.name]: ",",
    [unquoteSplicingSym.name]: ",@"
};
function str(x: any, quoteString = true, count?: any, printed?: any): any {
    if (x === null) {
        return "nil";
    } else if (x === true) {
        return "t";
    } else if (x instanceof Cell) {
        if (x.car instanceof Sym) {
            const q = quotes[x.car.name];
            if (q !== undefined && x.cdr instanceof Cell) {
                if (x.cdr.cdr == null) return q + str(x.cdr.car, true, count, printed);
            }
        }
        return "(" + strListBody(x, count, printed) + ")";
    } else if (typeof x === "string") {
        if (!quoteString) return x;
        const bf = [
            '"'
        ];
        for (const ch of x) {
            switch (ch) {
                case "\b":
                    bf.push("\\b");
                    break;
                case "\t":
                    bf.push("\\t");
                    break;
                case "\n":
                    bf.push("\\n");
                    break;
                case "\v":
                    bf.push("\\v");
                    break;
                case "\f":
                    bf.push("\\f");
                    break;
                case "\r":
                    bf.push("\\r");
                    break;
                case "\"":
                    bf.push("\\\"");
                    break;
                case "\\":
                    bf.push("\\\\");
                    break;
                default:
                    bf.push(ch);
                    break;
            }
        }
        bf.push('"');
        return bf.join("");
    } else if (x instanceof Array) {
        const s = x.map((e) => str(e, true, count, printed)
        ).join(", ");
        return "[" + s + "]";
    } else if (x instanceof Sym) {
        return x.isInterned ? x.name : "#:" + x;
    } else if (isNumeric(x)) {
        return convertgetString(x);
    } else {
        return x + "";
    }
}
function strListBody(x: any, count: any, printed: any) {
    if (printed === undefined) printed = [];
    if (count === undefined) count = 4;
    const s = [];
    let y;
    for (y = x; y instanceof Cell; y = y.cdr) {
        if (printed.indexOf(y) < 0) {
            printed.push(y);
            count = 4;
        } else {
            count--;
            if (count < 0) {
                s.push("...");
                return s.join(" ");
            }
        }
        s.push(str(y.car, true, count, printed));
    }
    if (y !== null) {
        s.push(".");
        s.push(str(y, true, count, printed));
    }
    for (y = x; y instanceof Cell; y = y.cdr) {
        const i = printed.indexOf(y);
        if (i >= 0) printed.splice(i, 1);
    }
    return s.join(" ");
}
export const prelude = `
(set defmacro
      (macro (name args &rest body)
             \`(progn (set ,name (macro ,args ,@body))
                     ',name)))

(defmacro define (name args &rest body)
  \`(progn (set ,name (lambda ,args ,@body))
          ',name))

(define caar (x) (car (car x)))
(define cadr (x) (car (cdr x)))
(define cdar (x) (cdr (car x)))
(define cddr (x) (cdr (cdr x)))
(define caaar (x) (car (car (car x))))
(define caadr (x) (car (car (cdr x))))
(define cadar (x) (car (cdr (car x))))
(define caddr (x) (car (cdr (cdr x))))
(define cdaar (x) (cdr (car (car x))))
(define cdadr (x) (cdr (car (cdr x))))
(define cddar (x) (cdr (cdr (car x))))
(define cdddr (x) (cdr (cdr (cdr x))))
(define not (x) (eq x nil))
(define consp (x) (not (atom x)))
(define print (x) (prin1 x) (terpri) x)
(define identity (x) x)

(set
 = eql
 rem %
 null not
 setcar rplaca
 setcdr rplacd)

(define > (x y) (< y x))
(define >= (x y) (not (< x y)))
(define <= (x y) (not (< y x)))
(define /= (x y) (not (= x y)))

(define nil? (x)
  (cond ((nil (x)) T)
        (t nil)
        ))



(define equal (x y)
  (cond ((atom x) (eql x y))
        ((atom y) nil)
        ((equal (car x) (car y)) (equal (cdr x) (cdr y)))))

(defmacro if (test then &rest else)
  \`(cond (,test ,then)
         ,@(cond (else \`((t ,@else))))))




(defmacro and (x &rest y)
  (if (null y)
      x
    \`(cond (,x (and ,@y)))))

(define mapcar (f x)
  (and x (cons (f (car x)) (mapcar f (cdr x)))))

(defmacro or (x &rest y)
  (if (null y)
      x
    \`(cond (,x)
           ((or ,@y)))))

(define list? (x)
  (or (null x) (consp x)))    ; NB (list? (lambda (x) (+ x 1))) => nil




`;
export function run(interp: any, text: any) {
    const tokens = new Reader();
    tokens.push(text);
    let result = undefined;
    while (!tokens.isEmpty()) {
        const exp = tokens.read();
        result = interp.eval(exp, null);
    }
    return result;
}
export const TESTS = {
  "assignment" : [
    {
    testLabel: 'Associativity',
    testValue: 
    `
    var a = "a";
    var b = "b";
    var c = "c";
    
    // Assignment is right-associative.
    a = b = c;
    print a; // expect: c
    print b; // expect: c
    print c; // expect: c
    `
  },
    {
      testLabel: 'Global',
      testValue:
      `
      var a = "before";
      print a; // expect: before

      a = "after";
      print a; // expect: after

      print a = "arg"; // expect: arg
      print a; // expect: arg
      `
    },
    {
      testLabel: 'Grouping',
      testValue: 
      `
      var a = "a";
      (a) = "value"; // Error at '=': Invalid assignment target.
      `
    },
    {
      testLabel: 'Infix operator',
      testValue: 
      `
      var a = "a";
      var b = "b";
      a + b = "value"; // Error at '=': Invalid assignment target.
      `
    },
    {
      testLabel: 'Local',
      testValue: `
      {
        var a = "before";
        print a; // expect: before
      
        a = "after";
        print a; // expect: after
      
        print a = "arg"; // expect: arg
        print a; // expect: arg
      }
      `
    },
    {
      testLabel: 'Prefix operator',
      testValue: 
      `
      var a = "a";
      !a = "value"; // Error at '=': Invalid assignment target.
      `
    },
    {
      testLabel: 'Syntax',
      testValue: 
      `
      // Assignment on RHS of variable.
      var a = "before";
      var c = a = "var";
      print a; // expect: var
      print c; // expect: var
      `
    },
    {
      testLabel: 'To this',
      testValue: 
      `
      class Foo {
        Foo() {
          this = "value"; // Error at '=': Invalid assignment target.
        }
      }
      
      Foo();
      `, 
    },
    {
      testLabel: 'Undefined',
      testValue: 
      `
      unknown = "what"; // expect runtime error: Undefined variable 'unknown'.
      ` 
    }
  ],
  "block" : [
    
    {
      testLabel: 'Empty',
      testValue: 
      `
      {} // By itself.
      
      // In a statement.
      if (true) {}
      if (false) {} else {}
      
      print "ok"; // expect: ok
      `
    },
    {
      testLabel: 'Scope',
      testValue:
       `
      var a = "outer";
      
      {
        var a = "inner";
        print a; // expect: inner
      }
      
      print a; // expect: outer
      `
    },
  ],
  "bool" : [
    
    {
      testLabel: 'Equality',
      testValue: 
      `
      print true == true;    // expect: true
      print true == false;   // expect: false
      print false == true;   // expect: false
      print false == false;  // expect: true
      
      // Not equal to other types.
      print true == 1;        // expect: false
      print false == 0;       // expect: false
      print true == "true";   // expect: false
      print false == "false"; // expect: false
      print false == "";      // expect: false
      
      print true != true;    // expect: false
      print true != false;   // expect: true
      print false != true;   // expect: true
      print false != false;  // expect: false
      
      // Not equal to other types.
      print true != 1;        // expect: true
      print false != 0;       // expect: true
      print true != "true";   // expect: true
      print false != "false"; // expect: true
      print false != "";      // expect: true
      `
    },
    {
      testLabel: 'Not',
      testValue: 
      `
      print !true;    // expect: false
      print !false;   // expect: true
      print !!true;   // expect: true
      `
    }
  ],
  "call" : [
    {
      testLabel: 'Bool',
      testValue: 
      `
      true(); // expect runtime error: Can only call functions and classes.
      `
    },
    {
      testLabel: 'Nil',
      testValue: 
      `
      nil(); // expect runtime error: Can only call functions and classes.
      `
    },
    {
      testLabel: 'Num',
      testValue:
       `
      123(); // expect runtime error: Can only call functions and classes.
      `
    },
    {
      testLabel: 'Object',
      testValue: 
      `
      class Foo {}
      
      var foo = Foo();
      foo(); // expect runtime error: Can only call functions and classes.
      `
    },
    {
      testLabel: 'String',
      testValue: 
      `
      "str"(); // expect runtime error: Can only call functions and classes.
      `
    },
  ],
  "class" : [
    {
      testLabel: 'Empty',
      testValue: 
      `
      class Foo {}

      print Foo; // expect: Foo
      `
    },
    {
      testLabel: 'Inherit self',
      testValue: 
      `
      class Foo < Foo {} // Error at 'Foo': A class can't inherit from itself.
      `
    },
    {
      testLabel: 'Inherited method',
      testValue: 
      `
      class Foo {
        inFoo() {
          print "in foo";
        }
      }
      
      class Bar < Foo {
        inBar() {
          print "in bar";
        }
      }
      
      class Baz < Bar {
        inBaz() {
          print "in baz";
        }
      }
      
      var baz = Baz();
      baz.inFoo(); // expect: in foo
      baz.inBar(); // expect: in bar
      baz.inBaz(); // expect: in baz
      `
    },
    {
      testLabel: 'Local inherit other',
      testValue: 
      `
      class A {}

      fun f() {
        class B < A {}
        return B;
      }
      
      print f(); // expect: B
      `
    },
    {
      testLabel: 'local inherit self',
      testValue: 
      `
      {
        class Foo < Foo {} // Error at 'Foo': A class can't inherit from itself.
      }
      `
    },
    {
      testLabel: 'Local refrence self',
      testValue: 
      `
      {
        class Foo {
          returnSelf() {
            return Foo;
          }
        }
      
        print Foo().returnSelf(); // expect: Foo
      }
      `
    },
    {
      testLabel: 'Reference self',
      testValue: 
      `
      class Foo {
        returnSelf() {
          return Foo;
        }
      }
      
      print Foo().returnSelf(); // expect: Foo
      `
    },
  ],
  "closure" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "comments" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "constructors" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "field" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "for" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "function" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "if" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "inheritance" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "logical_operator" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "method" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "misc" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "nil" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "number" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "operator" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "print" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "regression" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "return" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "string" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "super" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "this" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "variable" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ],
  "while" : [
    {
      testLabel: '',
      testValue: 
      `

      `
    },
  ]
}
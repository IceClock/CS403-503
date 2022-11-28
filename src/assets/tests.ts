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
      testLabel: 'Assign to closure',
      testValue: 
      `
      var f;
      var g;
      
      {
        var local = "local";
        fun f_() {
          print local;
          local = "after f";
          print local;
        }
        f = f_;
      
        fun g_() {
          print local;
          local = "after g";
          print local;
        }
        g = g_;
      }
      
      f();
      // expect: local
      // expect: after f
      
      g();
      // expect: after f
      // expect: after g
      `
    },
    {
      testLabel: 'Assign to shadowed later',
      testValue: 
      `
      var a = "global";

      {
        fun assign() {
          a = "assigned";
        }
      
        var a = "inner";
        assign();
        print a; // expect: inner
      }
      
      print a; // expect: assigned
      `
    },
    {
      testLabel: 'Close over fucntion parameter',
      testValue: 
      `
      var f;

      fun foo(param) {
        fun f_() {
          print param;
        }
        f = f_;
      }
      foo("param");
      
      f(); // expect: param
      `
    },
    {
      testLabel: 'Close over later variable',
      testValue: 
      `

      // This is a regression test. There was a bug where if an upvalue for an
      // earlier local (here "a") was captured *after* a later one ("b"), then it
      // would crash because it walked to the end of the upvalue list (correct), but
      // then didn't handle not finding the variable.
      
      fun f() {
        var a = "a";
        var b = "b";
        fun g() {
          print b; // expect: b
          print a; // expect: a
        }
        g();
      }
      f();
      `
    },
    {
      testLabel: 'Close over method parameter',
      testValue: 
      `
      var f;

      class Foo {
        method(param) {
          fun f_() {
            print param;
          }
          f = f_;
        }
      }
      
      Foo().method("param");
      f(); // expect: param
      `
    },
    {
      testLabel: 'Closed closure in function',
      testValue: 
      `
      var f;

      {
        var local = "local";
        fun f_() {
          print local;
        }
        f = f_;
      }
      
      f(); // expect: local
      `
    },
    {
      testLabel: 'Nested closure',
      testValue: 
      `
      var f;

      fun f1() {
        var a = "a";
        fun f2() {
          var b = "b";
          fun f3() {
            var c = "c";
            fun f4() {
              print a;
              print b;
              print c;
            }
            f = f4;
          }
          f3();
        }
        f2();
      }
      f1();
      
      f();
      // expect: a
      // expect: b
      // expect: c
      `
    },
    {
      testLabel: 'Open closure in function',
      testValue: 
      `
      {
        var local = "local";
        fun f() {
          print local; // expect: local
        }
        f();
      }
      `
    },
    {
      testLabel: 'Open closure multiple times',
      testValue: 
      `
      var f;

      {
        var a = "a";
        fun f_() {
          print a;
          print a;
        }
        f = f_;
      }
      
      f();
      // expect: a
      // expect: a
      `
    },
    {
      testLabel: 'Reuse closure slot',
      testValue: 
      `
      {
        var f;
      
        {
          var a = "a";
          fun f_() { print a; }
          f = f_;
        }
      
        {
          // Since a is out of scope, the local slot will be reused by b. Make sure
          // that f still closes over a.
          var b = "b";
          f(); // expect: a
        }
      }
      `
    },
    {
      testLabel: 'Shadow closure with local',
      testValue: 
      `
      {
        var foo = "closure";
        fun f() {
          {
            print foo; // expect: closure
            var foo = "shadow";
            print foo; // expect: shadow
          }
          print foo; // expect: closure
        }
        f();
      }
      `
    },
    {
      testLabel: 'Unused closure',
      testValue: 
      `
      // This is a regression test. There was a bug where the VM would try to close
      // an upvalue even if the upvalue was never created because the codepath for
      // the closure was not executed.
      
      {
        var a = "a";
        if (false) {
          fun foo() { a; }
        }
      }
      
      // If we get here, we didn't segfault when a went out of scope.
      print "ok"; // expect: ok
      `
    },
    {
      testLabel: 'Unused later closure',
      testValue: 
      `
      // This is a regression test. When closing upvalues for discarded locals, it
      // wouldn't make sure it discarded the upvalue for the correct stack slot.
      //
      // Here we create two locals that can be closed over, but only the first one
      // actually is. When "b" goes out of scope, we need to make sure we don't
      // prematurely close "a".
      var closure;
      
      {
        var a = "a";
      
        {
          var b = "b";
          fun returnA() {
            return a;
          }
      
          closure = returnA;
      
          if (false) {
            fun returnB() {
              return b;
            }
          }
        }
      
        print closure(); // expect: a
      }
      `
    }
  ],
  "comments" : [
    {
      testLabel: 'Line at EOF',
      testValue: 
      `
      print "ok"; // expect: ok
      // comment
      `
    },
    {
      testLabel: 'Only line comment',
      testValue: 
      `
      // comment
      `
    },
    {
      testLabel: 'Only line comment and line',
      testValue: 
      `
      // comment
      `
    },
    {
      testLabel: 'Unicode',
      testValue: 
      `
      // Unicode characters are allowed in comments.
      //
      // Latin 1 Supplement: £§¶ÜÞ
      // Latin Extended-A: ĐĦŋœ
      // Latin Extended-B: ƂƢƩǁ
      // Other stuff: ឃᢆ᯽₪ℜ↩⊗┺░
      // Emoji: ☃☺♣
      
      print "ok"; // expect: ok
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
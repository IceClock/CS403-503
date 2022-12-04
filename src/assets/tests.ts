/**
 * Test cases source
 *    https://github.com/iechevarria/pylox/tree/master/test
 */
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
      testLabel: 'Arguments',
      testValue: 
      `
      class Foo {
        init(a, b) {
          print "init"; // expect: init
          this.a = a;
          this.b = b;
        }
      }
      
      var foo = Foo(1, 2);
      print foo.a; // expect: 1
      print foo.b; // expect: 2
      `
    },
    {
      testLabel: 'Call init early return',
      testValue: 
      `
      class Foo {
        init() {
          print "init";
          return;
          print "nope";
        }
      }
      
      var foo = Foo(); // expect: init
      print foo.init(); // expect: init
      // expect: Foo instance
      `
    },
    {
      testLabel: 'Call init explicitly',
      testValue: 
      `
      class Foo {
        init(arg) {
          print "Foo.init(" + arg + ")";
          this.field = "init";
        }
      }
      
      var foo = Foo("one"); // expect: Foo.init(one)
      foo.field = "field";
      
      var foo2 = foo.init("two"); // expect: Foo.init(two)
      print foo2; // expect: Foo instance
      
      // Make sure init() doesn't create a fresh instance.
      print foo.field; // expect: init
      `
    },
    {
      testLabel: 'Default',
      testValue: 
      `
      class Foo {}

      var foo = Foo();
      print foo; // expect: Foo instance
      `
    },
    {
      testLabel: 'Default arguments',
      testValue: 
      `
      class Foo {
        init() {
          print "init";
          return;
          print "nope";
        }
      }
      
      var foo = Foo(); // expect: init
      print foo; // expect: Foo instance
      `
    },
    {
      testLabel: 'Early return',
      testValue: 
      `
      class Foo {
        init() {
          print "init";
          return;
          print "nope";
        }
      }
      
      var foo = Foo(); // expect: init
      print foo; // expect: Foo instance
      `
    },
    {
      testLabel: 'Extra arguments',
      testValue: 
      `
      class Foo {
        init(a, b) {
          this.a = a;
          this.b = b;
        }
      }
      
      var foo = Foo(1, 2, 3, 4); // expect runtime error: Expected 2 arguments but got 4.
      `
    },
    {
      testLabel: 'Init not method',
      testValue: 
      `
      class Foo {
        init(arg) {
          print "Foo.init(" + arg + ")";
          this.field = "init";
        }
      }
      
      fun init() {
        print "not initializer";
      }
      
      init(); // expect: not initializer
      `
    },
    {
      testLabel: 'Missing arguments',
      testValue: 
      `
      class Foo {
        init(a, b) {}
      }
      
      var foo = Foo(1); // expect runtime error: Expected 2 arguments but got 1.
      `
    },
    {
      testLabel: 'Return in nested function',
      testValue: 
      `
      class Foo {
        init() {
          fun init() {
            return "bar";
          }
          print init(); // expect: bar
        }
      }
      
      print Foo(); // expect: Foo instance
      `
    },
    {
      testLabel: 'Return value',
      testValue: 
      `
      class Foo {
        init() {
          return "result"; // Error at 'return': Can't return a value from an initializer.
        }
      }
      `
    },
  ],
  "field" : [
    {
      testLabel: 'Call function field',
      testValue: 
      `
      class Foo {}

      fun bar(a, b) {
        print "bar";
        print a;
        print b;
      }
      
      var foo = Foo();
      foo.bar = bar;
      
      foo.bar(1, 2);
      // expect: bar
      // expect: 1
      // expect: 2
      `
    },
    {
      testLabel: 'Call non-function field',
      testValue: 
      `
      class Foo {}

      var foo = Foo();
      foo.bar = "not fn";
      
      foo.bar(); // expect runtime error: Can only call functions and classes.
      `
    },
    {
      testLabel: 'Get and set method',
      testValue: 
      `
      // Bound methods have identity equality.
      class Foo {
        method(a) {
          print "method";
          print a;
        }
        other(a) {
          print "other";
          print a;
        }
      }
      
      var foo = Foo();
      var method = foo.method;
      
      // Setting a property shadows the instance method.
      foo.method = foo.other;
      foo.method(1);
      // expect: other
      // expect: 1
      
      // The old method handle still points to the original method.
      method(2);
      // expect: method
      // expect: 2
      `
    },
    {
      testLabel: 'Get on bool',
      testValue: 
      `
      true.foo; // expect runtime error: Only instances have properties.
      `
    },
    {
      testLabel: 'Get on class',
      testValue: 
      `
      class Foo {}
      Foo.bar; // expect runtime error: Only instances have properties.
      `
    },
    {
      testLabel: 'Get on function',
      testValue: 
      `
      fun foo() {}

      foo.bar; // expect runtime error: Only instances have properties.
      `
    },
    {
      testLabel: 'Get on nil',
      testValue: 
      `
      nil.foo; // expect runtime error: Only instances have properties.
      `
    },
    {
      testLabel: 'Get on num',
      testValue: 
      `
      123.foo; // expect runtime error: Only instances have properties.
      `
    },
    {
      testLabel: 'Get on string',
      testValue: 
      `
      "str".foo; // expect runtime error: Only instances have properties.
      `
    },
    {
      testLabel: 'Many',
      testValue: 
      `
      class Foo {}

      var foo = Foo();
      fun setFields() {
        foo.bilberry = "bilberry";
        foo.lime = "lime";
        foo.elderberry = "elderberry";
        foo.raspberry = "raspberry";
        foo.gooseberry = "gooseberry";
        foo.longan = "longan";
        foo.mandarine = "mandarine";
        foo.kiwifruit = "kiwifruit";
        foo.orange = "orange";
        foo.pomegranate = "pomegranate";
        foo.tomato = "tomato";
        foo.banana = "banana";
        foo.juniper = "juniper";
        foo.damson = "damson";
        foo.blackcurrant = "blackcurrant";
        foo.peach = "peach";
        foo.grape = "grape";
        foo.mango = "mango";
        foo.redcurrant = "redcurrant";
        foo.watermelon = "watermelon";
        foo.plumcot = "plumcot";
        foo.papaya = "papaya";
        foo.cloudberry = "cloudberry";
        foo.rambutan = "rambutan";
        foo.salak = "salak";
        foo.physalis = "physalis";
        foo.huckleberry = "huckleberry";
        foo.coconut = "coconut";
        foo.date = "date";
        foo.tamarind = "tamarind";
        foo.lychee = "lychee";
        foo.raisin = "raisin";
        foo.apple = "apple";
        foo.avocado = "avocado";
        foo.nectarine = "nectarine";
        foo.pomelo = "pomelo";
        foo.melon = "melon";
        foo.currant = "currant";
        foo.plum = "plum";
        foo.persimmon = "persimmon";
        foo.olive = "olive";
        foo.cranberry = "cranberry";
        foo.boysenberry = "boysenberry";
        foo.blackberry = "blackberry";
        foo.passionfruit = "passionfruit";
        foo.mulberry = "mulberry";
        foo.marionberry = "marionberry";
        foo.plantain = "plantain";
        foo.lemon = "lemon";
        foo.yuzu = "yuzu";
        foo.loquat = "loquat";
        foo.kumquat = "kumquat";
        foo.salmonberry = "salmonberry";
        foo.tangerine = "tangerine";
        foo.durian = "durian";
        foo.pear = "pear";
        foo.cantaloupe = "cantaloupe";
        foo.quince = "quince";
        foo.guava = "guava";
        foo.strawberry = "strawberry";
        foo.nance = "nance";
        foo.apricot = "apricot";
        foo.jambul = "jambul";
        foo.grapefruit = "grapefruit";
        foo.clementine = "clementine";
        foo.jujube = "jujube";
        foo.cherry = "cherry";
        foo.feijoa = "feijoa";
        foo.jackfruit = "jackfruit";
        foo.fig = "fig";
        foo.cherimoya = "cherimoya";
        foo.pineapple = "pineapple";
        foo.blueberry = "blueberry";
        foo.jabuticaba = "jabuticaba";
        foo.miracle = "miracle";
        foo.dragonfruit = "dragonfruit";
        foo.satsuma = "satsuma";
        foo.tamarillo = "tamarillo";
        foo.honeydew = "honeydew";
      }
      
      setFields();
      
      fun printFields() {
        print foo.apple; // expect: apple
        print foo.apricot; // expect: apricot
        print foo.avocado; // expect: avocado
        print foo.banana; // expect: banana
        print foo.bilberry; // expect: bilberry
        print foo.blackberry; // expect: blackberry
        print foo.blackcurrant; // expect: blackcurrant
        print foo.blueberry; // expect: blueberry
        print foo.boysenberry; // expect: boysenberry
        print foo.cantaloupe; // expect: cantaloupe
        print foo.cherimoya; // expect: cherimoya
        print foo.cherry; // expect: cherry
        print foo.clementine; // expect: clementine
        print foo.cloudberry; // expect: cloudberry
        print foo.coconut; // expect: coconut
        print foo.cranberry; // expect: cranberry
        print foo.currant; // expect: currant
        print foo.damson; // expect: damson
        print foo.date; // expect: date
        print foo.dragonfruit; // expect: dragonfruit
        print foo.durian; // expect: durian
        print foo.elderberry; // expect: elderberry
        print foo.feijoa; // expect: feijoa
        print foo.fig; // expect: fig
        print foo.gooseberry; // expect: gooseberry
        print foo.grape; // expect: grape
        print foo.grapefruit; // expect: grapefruit
        print foo.guava; // expect: guava
        print foo.honeydew; // expect: honeydew
        print foo.huckleberry; // expect: huckleberry
        print foo.jabuticaba; // expect: jabuticaba
        print foo.jackfruit; // expect: jackfruit
        print foo.jambul; // expect: jambul
        print foo.jujube; // expect: jujube
        print foo.juniper; // expect: juniper
        print foo.kiwifruit; // expect: kiwifruit
        print foo.kumquat; // expect: kumquat
        print foo.lemon; // expect: lemon
        print foo.lime; // expect: lime
        print foo.longan; // expect: longan
        print foo.loquat; // expect: loquat
        print foo.lychee; // expect: lychee
        print foo.mandarine; // expect: mandarine
        print foo.mango; // expect: mango
        print foo.marionberry; // expect: marionberry
        print foo.melon; // expect: melon
        print foo.miracle; // expect: miracle
        print foo.mulberry; // expect: mulberry
        print foo.nance; // expect: nance
        print foo.nectarine; // expect: nectarine
        print foo.olive; // expect: olive
        print foo.orange; // expect: orange
        print foo.papaya; // expect: papaya
        print foo.passionfruit; // expect: passionfruit
        print foo.peach; // expect: peach
        print foo.pear; // expect: pear
        print foo.persimmon; // expect: persimmon
        print foo.physalis; // expect: physalis
        print foo.pineapple; // expect: pineapple
        print foo.plantain; // expect: plantain
        print foo.plum; // expect: plum
        print foo.plumcot; // expect: plumcot
        print foo.pomegranate; // expect: pomegranate
        print foo.pomelo; // expect: pomelo
        print foo.quince; // expect: quince
        print foo.raisin; // expect: raisin
        print foo.rambutan; // expect: rambutan
        print foo.raspberry; // expect: raspberry
        print foo.redcurrant; // expect: redcurrant
        print foo.salak; // expect: salak
        print foo.salmonberry; // expect: salmonberry
        print foo.satsuma; // expect: satsuma
        print foo.strawberry; // expect: strawberry
        print foo.tamarillo; // expect: tamarillo
        print foo.tamarind; // expect: tamarind
        print foo.tangerine; // expect: tangerine
        print foo.tomato; // expect: tomato
        print foo.watermelon; // expect: watermelon
        print foo.yuzu; // expect: yuzu
      }
      
      printFields();
      `
    },
    {
      testLabel: 'Method',
      testValue: 
      `
      class Foo {
        bar(arg) {
          print arg;
        }
      }
      
      var bar = Foo().bar;
      print "got method"; // expect: got method
      bar("arg");          // expect: arg
      `
    },
    {
      testLabel: 'Method binds this',
      testValue: 
      `
      class Foo {
        sayName(a) {
          print this.name;
          print a;
        }
      }
      
      var foo1 = Foo();
      foo1.name = "foo1";
      
      var foo2 = Foo();
      foo2.name = "foo2";
      
      // Store the method reference on another object.
      foo2.fn = foo1.sayName;
      // Still retains original receiver.
      foo2.fn(1);
      // expect: foo1
      // expect: 1
      `
    },
    {
      testLabel: 'On instance',
      testValue: 
      `
      class Foo {}

      var foo = Foo();
      
      print foo.bar = "bar value"; // expect: bar value
      print foo.baz = "baz value"; // expect: baz value
      
      print foo.bar; // expect: bar value
      print foo.baz; // expect: baz value
      `
    },
    {
      testLabel: 'Set evaluation order',
      testValue: 
      `
      undefined1.bar // expect runtime error: Undefined variable 'undefined1'.
      = undefined2;
      `
    },
    {
      testLabel: 'Set on bool',
      testValue: 
      `
      true.foo = "value"; // expect runtime error: Only instances have fields.
      `
    },
    {
      testLabel: 'Set on class',
      testValue: 
      `
      class Foo {}
      Foo.bar = "value"; // expect runtime error: Only instances have fields.
      `
    },
    {
      testLabel: 'Set on function',
      testValue: 
      `
      fun foo() {}

      foo.bar = "value"; // expect runtime error: Only instances have fields.
      `
    },
    {
      testLabel: 'Set on nil',
      testValue: 
      `
      nil.foo = "value"; // expect runtime error: Only instances have fields.
      `
    },
    {
      testLabel: 'Set on num',
      testValue: 
      `
      123.foo = "value"; // expect runtime error: Only instances have fields.
      `
    },
    {
      testLabel: 'Set on string',
      testValue: 
      `
      "str".foo = "value"; // expect runtime error: Only instances have fields.
      `
    },
    {
      testLabel: 'Undefined',
      testValue: 
      `
      class Foo {}
      var foo = Foo();
      
      foo.bar; // expect runtime error: Undefined property 'bar'.
      `
    },
  ],
  "for" : [
    {
      testLabel: 'Class in body',
      testValue: 
      `
      // [line 2] Error at 'class': Expect expression.
      for (;;) class Foo {}
      `
    },
    {
      testLabel: 'Closure in body',
      testValue: 
      `
      var f1;
      var f2;
      var f3;
      
      for (var i = 1; i < 4; i = i + 1) {
        var j = i;
        fun f() {
          print i;
          print j;
        }
      
        if (j == 1) f1 = f;
        else if (j == 2) f2 = f;
        else f3 = f;
      }
      
      f1(); // expect: 4
            // expect: 1
      f2(); // expect: 4
            // expect: 2
      f3(); // expect: 4
            // expect: 3
      `
    },
    {
      testLabel: 'Function in body',
      testValue: 
      `
      // [line 2] Error at 'fun': Expect expression.
      for (;;) fun foo() {}
      `
    },
    {
      testLabel: 'Return closure',
      testValue: 
      `
      fun f() {
        for (;;) {
          var i = "i";
          fun g() { print i; }
          return g;
        }
      }
      
      var h = f();
      h(); // expect: i
      `
    },
    {
      testLabel: 'Return inside',
      testValue: 
      `
      fun f() {
        for (;;) {
          var i = "i";
          return i;
        }
      }
      
      print f();
      // expect: i
      `
    },
    {
      testLabel: 'Scope',
      testValue: 
      `
      {
        var i = "before";
      
        // New variable is in inner scope.
        for (var i = 0; i < 1; i = i + 1) {
          print i; // expect: 0
      
          // Loop body is in second inner scope.
          var i = -1;
          print i; // expect: -1
        }
      }
      
      {
        // New variable shadows outer variable.
        for (var i = 0; i > 0; i = i + 1) {}
      
        // Goes out of scope after loop.
        var i = "after";
        print i; // expect: after
      
        // Can reuse an existing variable.
        for (i = 0; i < 1; i = i + 1) {
          print i; // expect: 0
        }
      }
      `
    },
    {
      testLabel: 'Statement condition',
      testValue: 
      `
      // [line 3] Error at '{': Expect expression.
      // [line 3] Error at ')': Expect ';' after expression.
      for (var a = 1; {}; a = a + 1) {}
      `
    },
    {
      testLabel: 'Statement increment',
      testValue: 
      `
      // [line 2] Error at '{': Expect expression.
      for (var a = 1; a < 2; {}) {}
      `
    },
    {
      testLabel: 'Statement initalizer',
      testValue: 
      `
      // [line 3] Error at '{': Expect expression.
      // [line 3] Error at ')': Expect ';' after expression.
      for ({}; a < 2; a = a + 1) {}
      `
    },
    {
      testLabel: 'Syntax',
      testValue: 
      `
      // Single-expression body.
      for (var c = 0; c < 3;) print c = c + 1;
      // expect: 1
      // expect: 2
      // expect: 3
      
      // Block body.
      for (var a = 0; a < 3; a = a + 1) {
        print a;
      }
      // expect: 0
      // expect: 1
      // expect: 2
      
      // No clauses.
      fun foo() {
        for (;;) return "done";
      }
      print foo(); // expect: done
      
      // No variable.
      var i = 0;
      for (; i < 2; i = i + 1) print i;
      // expect: 0
      // expect: 1
      
      // No condition.
      fun bar() {
        for (var i = 0;; i = i + 1) {
          print i;
          if (i >= 2) return;
        }
      }
      bar();
      // expect: 0
      // expect: 1
      // expect: 2
      
      // No increment.
      for (var i = 0; i < 2;) {
        print i;
        i = i + 1;
      }
      // expect: 0
      // expect: 1
      
      // Statement bodies.
      for (; false;) if (true) 1; else 2;
      for (; false;) while (true) 1;
      for (; false;) for (;;) 1;
      `
    },
    {
      testLabel: 'Var in body',
      testValue: 
      `
      // [line 2] Error at 'var': Expect expression.
      for (;;) var foo;
      `
    },
  ],
  "function" : [
    {
      testLabel: 'Body must be block',
      testValue: 
      `
      // [line 2] Error at '123': Expect '{' before function body.
      fun f() 123;
      `
    },
    {
      testLabel: 'Empty body',
      testValue: 
      `
      fun f() {}
      print f(); // expect: nil
      `
    },
    {
      testLabel: 'Extra arguments',
      testValue: 
      `
      fun f(a, b) {
        print a;
        print b;
      }
      
      f(1, 2, 3, 4); // expect runtime error: Expected 2 arguments but got 4.
      `
    },
    {
      testLabel: 'Local mutual recursion',
      testValue: 
      `
      {
        fun isEven(n) {
          if (n == 0) return true;
          return isOdd(n - 1); // expect runtime error: Undefined variable 'isOdd'.
        }
      
        fun isOdd(n) {
          if (n == 0) return false;
          return isEven(n - 1);
        }
      
        isEven(4);
      }
      `
    },
    {
      testLabel: 'Local recursion',
      testValue: 
      `
      {
        fun fib(n) {
          if (n < 2) return n;
          return fib(n - 1) + fib(n - 2);
        }
      
        print fib(8); // expect: 21
      }
      `
    },
    {
      testLabel: 'Missing arguments',
      testValue: 
      `
      fun f(a, b) {}

      f(1); // expect runtime error: Expected 2 arguments but got 1.
      `
    },
    {
      testLabel: 'Missing comma in parameters',
      testValue: 
      `
      // [line 2] Error at 'c': Expect ')' after parameters.
      fun foo(a, b c, d, e, f) {}
      `
    },
    {
      testLabel: 'Mutual recursion',
      testValue: 
      `
      fun isEven(n) {
        if (n == 0) return true;
        return isOdd(n - 1);
      }
      
      fun isOdd(n) {
        if (n == 0) return false;
        return isEven(n - 1);
      }
      
      print isEven(4); // expect: true
      print isOdd(3); // expect: true
      `
    },
    {
      testLabel: 'Nested call with arguments',
      testValue: 
      `
      fun returnArg(arg) {
        return arg;
      }
      
      fun returnFunCallWithArg(func, arg) {
        return returnArg(func)(arg);
      }
      
      fun printArg(arg) {
        print arg;
      }
      
      returnFunCallWithArg(printArg, "hello world"); // expect: hello world
      `
    },
    {
      testLabel: 'Parameters',
      testValue: 
      `
      fun f0() { return 0; }
      print f0(); // expect: 0
      
      fun f1(a) { return a; }
      print f1(1); // expect: 1
      
      fun f2(a, b) { return a + b; }
      print f2(1, 2); // expect: 3
      
      fun f3(a, b, c) { return a + b + c; }
      print f3(1, 2, 3); // expect: 6
      
      fun f4(a, b, c, d) { return a + b + c + d; }
      print f4(1, 2, 3, 4); // expect: 10
      
      fun f5(a, b, c, d, e) { return a + b + c + d + e; }
      print f5(1, 2, 3, 4, 5); // expect: 15
      
      fun f6(a, b, c, d, e, f) { return a + b + c + d + e + f; }
      print f6(1, 2, 3, 4, 5, 6); // expect: 21
      
      fun f7(a, b, c, d, e, f, g) { return a + b + c + d + e + f + g; }
      print f7(1, 2, 3, 4, 5, 6, 7); // expect: 28
      
      fun f8(a, b, c, d, e, f, g, h) { return a + b + c + d + e + f + g + h; }
      print f8(1, 2, 3, 4, 5, 6, 7, 8); // expect: 36
      `
    },
    {
      testLabel: 'Print',
      testValue: 
      `
      fun foo() {}
      print foo; // expect: <fn foo>
      `
    },
    {
      testLabel: 'Recursion',
      testValue: 
      `
      fun fib(n) {
        if (n < 2) return n;
        return fib(n - 1) + fib(n - 2);
      }
      
      print fib(8); // expect: 21
      `
    },
    {
      testLabel: 'Too many arguments',
      testValue: 
      `
      fun foo() {}
      {
        var a = 1;
        foo(
           a, // 1
           a, // 2
           a, // 3
           a, // 4
           a, // 5
           a, // 6
           a, // 7
           a, // 8
           a, // 9
           a, // 10
           a, // 11
           a, // 12
           a, // 13
           a, // 14
           a, // 15
           a, // 16
           a, // 17
           a, // 18
           a, // 19
           a, // 20
           a, // 21
           a, // 22
           a, // 23
           a, // 24
           a, // 25
           a, // 26
           a, // 27
           a, // 28
           a, // 29
           a, // 30
           a, // 31
           a, // 32
           a, // 33
           a, // 34
           a, // 35
           a, // 36
           a, // 37
           a, // 38
           a, // 39
           a, // 40
           a, // 41
           a, // 42
           a, // 43
           a, // 44
           a, // 45
           a, // 46
           a, // 47
           a, // 48
           a, // 49
           a, // 50
           a, // 51
           a, // 52
           a, // 53
           a, // 54
           a, // 55
           a, // 56
           a, // 57
           a, // 58
           a, // 59
           a, // 60
           a, // 61
           a, // 62
           a, // 63
           a, // 64
           a, // 65
           a, // 66
           a, // 67
           a, // 68
           a, // 69
           a, // 70
           a, // 71
           a, // 72
           a, // 73
           a, // 74
           a, // 75
           a, // 76
           a, // 77
           a, // 78
           a, // 79
           a, // 80
           a, // 81
           a, // 82
           a, // 83
           a, // 84
           a, // 85
           a, // 86
           a, // 87
           a, // 88
           a, // 89
           a, // 90
           a, // 91
           a, // 92
           a, // 93
           a, // 94
           a, // 95
           a, // 96
           a, // 97
           a, // 98
           a, // 99
           a, // 100
           a, // 101
           a, // 102
           a, // 103
           a, // 104
           a, // 105
           a, // 106
           a, // 107
           a, // 108
           a, // 109
           a, // 110
           a, // 111
           a, // 112
           a, // 113
           a, // 114
           a, // 115
           a, // 116
           a, // 117
           a, // 118
           a, // 119
           a, // 120
           a, // 121
           a, // 122
           a, // 123
           a, // 124
           a, // 125
           a, // 126
           a, // 127
           a, // 128
           a, // 129
           a, // 130
           a, // 131
           a, // 132
           a, // 133
           a, // 134
           a, // 135
           a, // 136
           a, // 137
           a, // 138
           a, // 139
           a, // 140
           a, // 141
           a, // 142
           a, // 143
           a, // 144
           a, // 145
           a, // 146
           a, // 147
           a, // 148
           a, // 149
           a, // 150
           a, // 151
           a, // 152
           a, // 153
           a, // 154
           a, // 155
           a, // 156
           a, // 157
           a, // 158
           a, // 159
           a, // 160
           a, // 161
           a, // 162
           a, // 163
           a, // 164
           a, // 165
           a, // 166
           a, // 167
           a, // 168
           a, // 169
           a, // 170
           a, // 171
           a, // 172
           a, // 173
           a, // 174
           a, // 175
           a, // 176
           a, // 177
           a, // 178
           a, // 179
           a, // 180
           a, // 181
           a, // 182
           a, // 183
           a, // 184
           a, // 185
           a, // 186
           a, // 187
           a, // 188
           a, // 189
           a, // 190
           a, // 191
           a, // 192
           a, // 193
           a, // 194
           a, // 195
           a, // 196
           a, // 197
           a, // 198
           a, // 199
           a, // 200
           a, // 201
           a, // 202
           a, // 203
           a, // 204
           a, // 205
           a, // 206
           a, // 207
           a, // 208
           a, // 209
           a, // 210
           a, // 211
           a, // 212
           a, // 213
           a, // 214
           a, // 215
           a, // 216
           a, // 217
           a, // 218
           a, // 219
           a, // 220
           a, // 221
           a, // 222
           a, // 223
           a, // 224
           a, // 225
           a, // 226
           a, // 227
           a, // 228
           a, // 229
           a, // 230
           a, // 231
           a, // 232
           a, // 233
           a, // 234
           a, // 235
           a, // 236
           a, // 237
           a, // 238
           a, // 239
           a, // 240
           a, // 241
           a, // 242
           a, // 243
           a, // 244
           a, // 245
           a, // 246
           a, // 247
           a, // 248
           a, // 249
           a, // 250
           a, // 251
           a, // 252
           a, // 253
           a, // 254
           a, // 255
           a); // Error at 'a': Can't have more than 255 arguments.
      }
      `
    },
    {
      testLabel: 'Too many parameters',
      testValue: 
      `
      // 256 parameters.
      fun f(
          a1,
          a2,
          a3,
          a4,
          a5,
          a6,
          a7,
          a8,
          a9,
          a10,
          a11,
          a12,
          a13,
          a14,
          a15,
          a16,
          a17,
          a18,
          a19,
          a20,
          a21,
          a22,
          a23,
          a24,
          a25,
          a26,
          a27,
          a28,
          a29,
          a30,
          a31,
          a32,
          a33,
          a34,
          a35,
          a36,
          a37,
          a38,
          a39,
          a40,
          a41,
          a42,
          a43,
          a44,
          a45,
          a46,
          a47,
          a48,
          a49,
          a50,
          a51,
          a52,
          a53,
          a54,
          a55,
          a56,
          a57,
          a58,
          a59,
          a60,
          a61,
          a62,
          a63,
          a64,
          a65,
          a66,
          a67,
          a68,
          a69,
          a70,
          a71,
          a72,
          a73,
          a74,
          a75,
          a76,
          a77,
          a78,
          a79,
          a80,
          a81,
          a82,
          a83,
          a84,
          a85,
          a86,
          a87,
          a88,
          a89,
          a90,
          a91,
          a92,
          a93,
          a94,
          a95,
          a96,
          a97,
          a98,
          a99,
          a100,
          a101,
          a102,
          a103,
          a104,
          a105,
          a106,
          a107,
          a108,
          a109,
          a110,
          a111,
          a112,
          a113,
          a114,
          a115,
          a116,
          a117,
          a118,
          a119,
          a120,
          a121,
          a122,
          a123,
          a124,
          a125,
          a126,
          a127,
          a128,
          a129,
          a130,
          a131,
          a132,
          a133,
          a134,
          a135,
          a136,
          a137,
          a138,
          a139,
          a140,
          a141,
          a142,
          a143,
          a144,
          a145,
          a146,
          a147,
          a148,
          a149,
          a150,
          a151,
          a152,
          a153,
          a154,
          a155,
          a156,
          a157,
          a158,
          a159,
          a160,
          a161,
          a162,
          a163,
          a164,
          a165,
          a166,
          a167,
          a168,
          a169,
          a170,
          a171,
          a172,
          a173,
          a174,
          a175,
          a176,
          a177,
          a178,
          a179,
          a180,
          a181,
          a182,
          a183,
          a184,
          a185,
          a186,
          a187,
          a188,
          a189,
          a190,
          a191,
          a192,
          a193,
          a194,
          a195,
          a196,
          a197,
          a198,
          a199,
          a200,
          a201,
          a202,
          a203,
          a204,
          a205,
          a206,
          a207,
          a208,
          a209,
          a210,
          a211,
          a212,
          a213,
          a214,
          a215,
          a216,
          a217,
          a218,
          a219,
          a220,
          a221,
          a222,
          a223,
          a224,
          a225,
          a226,
          a227,
          a228,
          a229,
          a230,
          a231,
          a232,
          a233,
          a234,
          a235,
          a236,
          a237,
          a238,
          a239,
          a240,
          a241,
          a242,
          a243,
          a244,
          a245,
          a246,
          a247,
          a248,
          a249,
          a250,
          a251,
          a252,
          a253,
          a254,
          a255, a) {} // Error at 'a': Can't have more than 255 parameters.
      `
    },
  ],
  "if" : [
    {
      testLabel: 'Class in else',
      testValue: 
      `
      // [line 2] Error at 'class': Expect expression.
      if (true) "ok"; else class Foo {}
      `
    },
    {
      testLabel: 'Class in then',
      testValue: 
      `
      // [line 2] Error at 'class': Expect expression.
      if (true) class Foo {}
      `
    },
    {
      testLabel: 'Dangling else',
      testValue: 
      `
      // A dangling else binds to the right-most if.
      if (true) if (false) print "bad"; else print "good"; // expect: good
      if (false) if (true) print "bad"; else print "bad";
      `
    },
    {
      testLabel: 'Else',
      testValue: 
      `
      // Evaluate the 'else' expression if the condition is false.
      if (true) print "good"; else print "bad"; // expect: good
      if (false) print "bad"; else print "good"; // expect: good
      
      // Allow block body.
      if (false) nil; else { print "block"; } // expect: block
      `
    },
    {
      testLabel: 'Function in else',
      testValue: 
      `
      // [line 2] Error at 'fun': Expect expression.
      if (true) "ok"; else fun foo() {}
      `
    },
    {
      testLabel: 'Function in then',
      testValue: 
      `
      // [line 2] Error at 'fun': Expect expression.
      if (true) fun foo() {}
      `
    },
    {
      testLabel: 'If',
      testValue: 
      `
      // Evaluate the 'then' expression if the condition is true.
      if (true) print "good"; // expect: good
      if (false) print "bad";
      
      // Allow block body.
      if (true) { print "block"; } // expect: block
      
      // Assignment in if condition.
      var a = false;
      if (a = true) print a; // expect: true
      `
    },
    {
      testLabel: 'Truth',
      testValue: 
      `
      // False and nil are false.
      if (false) print "bad"; else print "false"; // expect: false
      if (nil) print "bad"; else print "nil"; // expect: nil
      
      // Everything else is true.
      if (true) print true; // expect: true
      if (0) print 0; // expect: 0
      if ("") print "empty"; // expect: empty
      `
    },
    {
      testLabel: 'Var in else',
      testValue: 
      `
      // [line 2] Error at 'var': Expect expression.
      if (true) "ok"; else var foo;
      `
    },
    {
      testLabel: 'Var in then',
      testValue: 
      `
      // [line 2] Error at 'var': Expect expression.
      if (true) var foo;
      `
    },
  ],
  "inheritance" : [
    {
      testLabel: 'Constructor',
      testValue: 
      `
      class A {
        init(param) {
          this.field = param;
        }
      
        test() {
          print this.field;
        }
      }
      
      class B < A {}
      
      var b = B("value");
      b.test(); // expect: value
      `
    },
    {
      testLabel: 'Inherit from function',
      testValue: 
      `
      fun foo() {}

      class Subclass < foo {} // expect runtime error: Superclass must be a class.
      `
    },
    {
      testLabel: 'Inherit from nil',
      testValue: 
      `
      var Nil = nil;
      class Foo < Nil {} // expect runtime error: Superclass must be a class.
      `
    },
    {
      testLabel: 'Inherit from number',
      testValue: 
      `
      var Number = 123;
      class Foo < Number {} // expect runtime error: Superclass must be a class.
      `
    },
    {
      testLabel: 'Inherit methods',
      testValue: 
      `
      class Foo {
        methodOnFoo() { print "foo"; }
        override() { print "foo"; }
      }
      
      class Bar < Foo {
        methodOnBar() { print "bar"; }
        override() { print "bar"; }
      }
      
      var bar = Bar();
      bar.methodOnFoo(); // expect: foo
      bar.methodOnBar(); // expect: bar
      bar.override(); // expect: bar
      `
    },
    {
      testLabel: 'Parenthesized superclass',
      testValue: 
      `
      class Foo {}

      // [line 4] Error at '(': Expect superclass name.
      class Bar < (Foo) {}
      `
    },
    {
      testLabel: 'Set fields from base class',
      testValue: 
      `
      class Foo {
        foo(a, b) {
          this.field1 = a;
          this.field2 = b;
        }
      
        fooPrint() {
          print this.field1;
          print this.field2;
        }
      }
      
      class Bar < Foo {
        bar(a, b) {
          this.field1 = a;
          this.field2 = b;
        }
      
        barPrint() {
          print this.field1;
          print this.field2;
        }
      }
      
      var bar = Bar();
      bar.foo("foo 1", "foo 2");
      bar.fooPrint();
      // expect: foo 1
      // expect: foo 2
      
      bar.bar("bar 1", "bar 2");
      bar.barPrint();
      // expect: bar 1
      // expect: bar 2
      
      bar.fooPrint();
      // expect: bar 1
      // expect: bar 2
      `
    },
  ],
  "logical_operator" : [
    {
      testLabel: 'And',
      testValue: 
      `
      // Note: These tests implicitly depend on ints being truthy.

      // Return the first non-true argument.
      print false and 1; // expect: false
      print true and 1; // expect: 1
      print 1 and 2 and false; // expect: false
      
      // Return the last argument if all are true.
      print 1 and true; // expect: true
      print 1 and 2 and 3; // expect: 3
      
      // Short-circuit at the first false argument.
      var a = "before";
      var b = "before";
      (a = true) and
          (b = false) and
          (a = "bad");
      print a; // expect: true
      print b; // expect: false
      `
    },
    {
      testLabel: 'And truth',
      testValue: 
      `
      // False and nil are false.
      print false and "bad"; // expect: false
      print nil and "bad"; // expect: nil
      
      // Everything else is true.
      print true and "ok"; // expect: ok
      print 0 and "ok"; // expect: ok
      print "" and "ok"; // expect: ok
      `
    },
    {
      testLabel: 'Or',
      testValue: 
      `
      // Note: These tests implicitly depend on ints being truthy.

      // Return the first true argument.
      print 1 or true; // expect: 1
      print false or 1; // expect: 1
      print false or false or true; // expect: true
      
      // Return the last argument if all are false.
      print false or false; // expect: false
      print false or false or false; // expect: false
      
      // Short-circuit at the first true argument.
      var a = "before";
      var b = "before";
      (a = false) or
          (b = true) or
          (a = "bad");
      print a; // expect: false
      print b; // expect: true
      `
    },
    {
      testLabel: 'Or truth',
      testValue: 
      `
      // False and nil are false.
      print false or "ok"; // expect: ok
      print nil or "ok"; // expect: ok
      
      // Everything else is true.
      print true or "ok"; // expect: true
      print 0 or "ok"; // expect: 0
      print "s" or "ok"; // expect: s
      `
    },
  ],
  "method" : [
    {
      testLabel: 'Arity',
      testValue: 
      `
      class Foo {
        method0() { return "no args"; }
        method1(a) { return a; }
        method2(a, b) { return a + b; }
        method3(a, b, c) { return a + b + c; }
        method4(a, b, c, d) { return a + b + c + d; }
        method5(a, b, c, d, e) { return a + b + c + d + e; }
        method6(a, b, c, d, e, f) { return a + b + c + d + e + f; }
        method7(a, b, c, d, e, f, g) { return a + b + c + d + e + f + g; }
        method8(a, b, c, d, e, f, g, h) { return a + b + c + d + e + f + g + h; }
      }
      
      var foo = Foo();
      print foo.method0(); // expect: no args
      print foo.method1(1); // expect: 1
      print foo.method2(1, 2); // expect: 3
      print foo.method3(1, 2, 3); // expect: 6
      print foo.method4(1, 2, 3, 4); // expect: 10
      print foo.method5(1, 2, 3, 4, 5); // expect: 15
      print foo.method6(1, 2, 3, 4, 5, 6); // expect: 21
      print foo.method7(1, 2, 3, 4, 5, 6, 7); // expect: 28
      print foo.method8(1, 2, 3, 4, 5, 6, 7, 8); // expect: 36
      `
    },
    {
      testLabel: 'Empty block',
      testValue: 
      `
      class Foo {
        bar() {}
      }
      
      print Foo().bar(); // expect: nil
      `
    },
    {
      testLabel: 'Extra argument',
      testValue: 
      `
      class Foo {
        method(a, b) {
          print a;
          print b;
        }
      }
      
      Foo().method(1, 2, 3, 4); // expect runtime error: Expected 2 arguments but got 4.
      `
    },
    {
      testLabel: 'Missing argument',
      testValue: 
      `
      class Foo {
        method(a, b) {}
      }
      
      Foo().method(1); // expect runtime error: Expected 2 arguments but got 1.
      `
    },
    {
      testLabel: 'Not found',
      testValue: 
      `
      class Foo {}

      Foo().unknown(); // expect runtime error: Undefined property 'unknown'.
      `
    },
    {
      testLabel: 'Print bound method',
      testValue: 
      `
      class Foo {
        method() { }
      }
      var foo = Foo();
      print foo.method; // expect: <fn method>
      `
    },
    {
      testLabel: 'Refer to name',
      testValue: 
      `
      class Foo {
        method() {
          print method; // expect runtime error: Undefined variable 'method'.
        }
      }
      
      Foo().method();
      `
    },
    {
      testLabel: 'Too many arguments',
      testValue: 
      `
      {
        var a = 1;
        true.method(
           a, // 1
           a, // 2
           a, // 3
           a, // 4
           a, // 5
           a, // 6
           a, // 7
           a, // 8
           a, // 9
           a, // 10
           a, // 11
           a, // 12
           a, // 13
           a, // 14
           a, // 15
           a, // 16
           a, // 17
           a, // 18
           a, // 19
           a, // 20
           a, // 21
           a, // 22
           a, // 23
           a, // 24
           a, // 25
           a, // 26
           a, // 27
           a, // 28
           a, // 29
           a, // 30
           a, // 31
           a, // 32
           a, // 33
           a, // 34
           a, // 35
           a, // 36
           a, // 37
           a, // 38
           a, // 39
           a, // 40
           a, // 41
           a, // 42
           a, // 43
           a, // 44
           a, // 45
           a, // 46
           a, // 47
           a, // 48
           a, // 49
           a, // 50
           a, // 51
           a, // 52
           a, // 53
           a, // 54
           a, // 55
           a, // 56
           a, // 57
           a, // 58
           a, // 59
           a, // 60
           a, // 61
           a, // 62
           a, // 63
           a, // 64
           a, // 65
           a, // 66
           a, // 67
           a, // 68
           a, // 69
           a, // 70
           a, // 71
           a, // 72
           a, // 73
           a, // 74
           a, // 75
           a, // 76
           a, // 77
           a, // 78
           a, // 79
           a, // 80
           a, // 81
           a, // 82
           a, // 83
           a, // 84
           a, // 85
           a, // 86
           a, // 87
           a, // 88
           a, // 89
           a, // 90
           a, // 91
           a, // 92
           a, // 93
           a, // 94
           a, // 95
           a, // 96
           a, // 97
           a, // 98
           a, // 99
           a, // 100
           a, // 101
           a, // 102
           a, // 103
           a, // 104
           a, // 105
           a, // 106
           a, // 107
           a, // 108
           a, // 109
           a, // 110
           a, // 111
           a, // 112
           a, // 113
           a, // 114
           a, // 115
           a, // 116
           a, // 117
           a, // 118
           a, // 119
           a, // 120
           a, // 121
           a, // 122
           a, // 123
           a, // 124
           a, // 125
           a, // 126
           a, // 127
           a, // 128
           a, // 129
           a, // 130
           a, // 131
           a, // 132
           a, // 133
           a, // 134
           a, // 135
           a, // 136
           a, // 137
           a, // 138
           a, // 139
           a, // 140
           a, // 141
           a, // 142
           a, // 143
           a, // 144
           a, // 145
           a, // 146
           a, // 147
           a, // 148
           a, // 149
           a, // 150
           a, // 151
           a, // 152
           a, // 153
           a, // 154
           a, // 155
           a, // 156
           a, // 157
           a, // 158
           a, // 159
           a, // 160
           a, // 161
           a, // 162
           a, // 163
           a, // 164
           a, // 165
           a, // 166
           a, // 167
           a, // 168
           a, // 169
           a, // 170
           a, // 171
           a, // 172
           a, // 173
           a, // 174
           a, // 175
           a, // 176
           a, // 177
           a, // 178
           a, // 179
           a, // 180
           a, // 181
           a, // 182
           a, // 183
           a, // 184
           a, // 185
           a, // 186
           a, // 187
           a, // 188
           a, // 189
           a, // 190
           a, // 191
           a, // 192
           a, // 193
           a, // 194
           a, // 195
           a, // 196
           a, // 197
           a, // 198
           a, // 199
           a, // 200
           a, // 201
           a, // 202
           a, // 203
           a, // 204
           a, // 205
           a, // 206
           a, // 207
           a, // 208
           a, // 209
           a, // 210
           a, // 211
           a, // 212
           a, // 213
           a, // 214
           a, // 215
           a, // 216
           a, // 217
           a, // 218
           a, // 219
           a, // 220
           a, // 221
           a, // 222
           a, // 223
           a, // 224
           a, // 225
           a, // 226
           a, // 227
           a, // 228
           a, // 229
           a, // 230
           a, // 231
           a, // 232
           a, // 233
           a, // 234
           a, // 235
           a, // 236
           a, // 237
           a, // 238
           a, // 239
           a, // 240
           a, // 241
           a, // 242
           a, // 243
           a, // 244
           a, // 245
           a, // 246
           a, // 247
           a, // 248
           a, // 249
           a, // 250
           a, // 251
           a, // 252
           a, // 253
           a, // 254
           a, // 255
           a); // Error at 'a': Can't have more than 255 arguments.
      }
      `
    },
    {
      testLabel: 'Too many parameters',
      testValue: 
      `
      class Foo {
        // 256 parameters.
        method(
          a1,
          a2,
          a3,
          a4,
          a5,
          a6,
          a7,
          a8,
          a9,
          a10,
          a11,
          a12,
          a13,
          a14,
          a15,
          a16,
          a17,
          a18,
          a19,
          a20,
          a21,
          a22,
          a23,
          a24,
          a25,
          a26,
          a27,
          a28,
          a29,
          a30,
          a31,
          a32,
          a33,
          a34,
          a35,
          a36,
          a37,
          a38,
          a39,
          a40,
          a41,
          a42,
          a43,
          a44,
          a45,
          a46,
          a47,
          a48,
          a49,
          a50,
          a51,
          a52,
          a53,
          a54,
          a55,
          a56,
          a57,
          a58,
          a59,
          a60,
          a61,
          a62,
          a63,
          a64,
          a65,
          a66,
          a67,
          a68,
          a69,
          a70,
          a71,
          a72,
          a73,
          a74,
          a75,
          a76,
          a77,
          a78,
          a79,
          a80,
          a81,
          a82,
          a83,
          a84,
          a85,
          a86,
          a87,
          a88,
          a89,
          a90,
          a91,
          a92,
          a93,
          a94,
          a95,
          a96,
          a97,
          a98,
          a99,
          a100,
          a101,
          a102,
          a103,
          a104,
          a105,
          a106,
          a107,
          a108,
          a109,
          a110,
          a111,
          a112,
          a113,
          a114,
          a115,
          a116,
          a117,
          a118,
          a119,
          a120,
          a121,
          a122,
          a123,
          a124,
          a125,
          a126,
          a127,
          a128,
          a129,
          a130,
          a131,
          a132,
          a133,
          a134,
          a135,
          a136,
          a137,
          a138,
          a139,
          a140,
          a141,
          a142,
          a143,
          a144,
          a145,
          a146,
          a147,
          a148,
          a149,
          a150,
          a151,
          a152,
          a153,
          a154,
          a155,
          a156,
          a157,
          a158,
          a159,
          a160,
          a161,
          a162,
          a163,
          a164,
          a165,
          a166,
          a167,
          a168,
          a169,
          a170,
          a171,
          a172,
          a173,
          a174,
          a175,
          a176,
          a177,
          a178,
          a179,
          a180,
          a181,
          a182,
          a183,
          a184,
          a185,
          a186,
          a187,
          a188,
          a189,
          a190,
          a191,
          a192,
          a193,
          a194,
          a195,
          a196,
          a197,
          a198,
          a199,
          a200,
          a201,
          a202,
          a203,
          a204,
          a205,
          a206,
          a207,
          a208,
          a209,
          a210,
          a211,
          a212,
          a213,
          a214,
          a215,
          a216,
          a217,
          a218,
          a219,
          a220,
          a221,
          a222,
          a223,
          a224,
          a225,
          a226,
          a227,
          a228,
          a229,
          a230,
          a231,
          a232,
          a233,
          a234,
          a235,
          a236,
          a237,
          a238,
          a239,
          a240,
          a241,
          a242,
          a243,
          a244,
          a245,
          a246,
          a247,
          a248,
          a249,
          a250,
          a251,
          a252,
          a253,
          a254,
          a255, a) {} // Error at 'a': Can't have more than 255 parameters.
      }
      `
    },
  ],
  "misc" : [
    {
      testLabel: 'Precedence',
      testValue: 
      `
      // * has higher precedence than +.
      print 2 + 3 * 4; // expect: 14
      
      // * has higher precedence than -.
      print 20 - 3 * 4; // expect: 8
      
      // / has higher precedence than +.
      print 2 + 6 / 3; // expect: 4
      
      // / has higher precedence than -.
      print 2 - 6 / 3; // expect: 0
      
      // < has higher precedence than ==.
      print false == 2 < 1; // expect: true
      
      // > has higher precedence than ==.
      print false == 1 > 2; // expect: true
      
      // <= has higher precedence than ==.
      print false == 2 <= 1; // expect: true
      
      // >= has higher precedence than ==.
      print false == 1 >= 2; // expect: true
      
      // 1 - 1 is not space-sensitive.
      print 1 - 1; // expect: 0
      print 1 -1;  // expect: 0
      print 1- 1;  // expect: 0
      print 1-1;   // expect: 0
      
      // Using () for grouping.
      print (2 * (6 - (2 + 2))); // expect: 4
      `
    },
    {
      testLabel: 'Unexpected character',
      testValue: 
      `
      // [line 3] Error: Unexpected character: |
      // [line 3] Error at 'b': Expect ')' after arguments.
      foo(a | b);
      `
    },
  ],
  "nil" : [
    {
      testLabel: 'Litral',
      testValue: 
      `
      print nil; // expect: nil
      `
    },
  ],
  "number" : [
    {
      testLabel: 'Decimal point at EOF',
      testValue: 
      `
      // [line 2] Error at end: Expect property name after '.'.
      123.
      `
    },
    {
      testLabel: 'Leading dot',
      testValue: 
      `
      // [line 2] Error at '.': Expect expression.
      .123;
      `
    },
    {
      testLabel: 'Litrals',
      testValue: 
      `
      print 123;     // expect: 123
      print 987654;  // expect: 987654
      print 0;       // expect: 0
      print -0;      // expect: 0
      
      print 123.456; // expect: 123.456
      print -0.001;  // expect: -0.001
      `
    },
    {
      testLabel: 'Trailing dot',
      testValue: 
      `
      // [line 2] Error at ';': Expect property name after '.'.
      123.;
      `
    }
  ],
  "operator" : [
    {
      testLabel: 'Add',
      testValue: 
      `
      print 123 + 456; // expect: 579
      print "str" + "ing"; // expect: string
      `
    },
    {
      testLabel: 'Add bool',
      testValue: 
      `
      true + nil; // expect runtime error: Operands must be two numbers or two strings.
      `
    },
    {
      testLabel: 'Add bool num',
      testValue: 
      `
      true + 123; // expect runtime error: Operands must be two numbers or two strings.
      `
    },
    {
      testLabel: 'Add bool string',
      testValue: 
      `
      true + "s"; // expect runtime error: Operands must be two numbers or two strings.
      `
    },
    {
      testLabel: 'Add nil nil',
      testValue: 
      `
      nil + nil; // expect runtime error: Operands must be two numbers or two strings.
      `
    },
    {
      testLabel: 'Add num nil',
      testValue: 
      `
      1 + nil; // expect runtime error: Operands must be two numbers or two strings.
      `
    },
    {
      testLabel: 'Add string nil',
      testValue: 
      `
      "s" + nil; // expect runtime error: Operands must be two numbers or two strings.
      `
    },
    {
      testLabel: 'Comparision',
      testValue: 
      `
      print 1 < 2;    // expect: true
      print 2 < 2;    // expect: false
      print 2 < 1;    // expect: false
      
      print 1 <= 2;    // expect: true
      print 2 <= 2;    // expect: true
      print 2 <= 1;    // expect: false
      
      print 1 > 2;    // expect: false
      print 2 > 2;    // expect: false
      print 2 > 1;    // expect: true
      
      print 1 >= 2;    // expect: false
      print 2 >= 2;    // expect: true
      print 2 >= 1;    // expect: true
      
      // Zero and negative zero compare the same.
      print 0 < -0; // expect: false
      print -0 < 0; // expect: false
      print 0 > -0; // expect: false
      print -0 > 0; // expect: false
      print 0 <= -0; // expect: true
      print -0 <= 0; // expect: true
      print 0 >= -0; // expect: true
      print -0 >= 0; // expect: true
      `
    },
    {
      testLabel: 'Divide',
      testValue: 
      `
      print 8 / 2;         // expect: 4
      print 12.34 / 12.34;  // expect: 1
      `
    },
    {
      testLabel: 'Divide non-num num',
      testValue: 
      `
      "1" / 1; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Divide num non-num',
      testValue: 
      `
      1 / "1"; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Equals',
      testValue: 
      `
      print nil == nil; // expect: true

      print true == true; // expect: true
      print true == false; // expect: false
      
      print 1 == 1; // expect: true
      print 1 == 2; // expect: false
      
      print "str" == "str"; // expect: true
      print "str" == "ing"; // expect: false
      
      print nil == false; // expect: false
      print false == 0; // expect: false
      print 0 == "0"; // expect: false
      `
    },
    {
      testLabel: 'Equals class',
      testValue: 
      `
      // Bound methods have identity equality.
      class Foo {}
      class Bar {}
      
      print Foo == Foo; // expect: true
      print Foo == Bar; // expect: false
      print Bar == Foo; // expect: false
      print Bar == Bar; // expect: true
      
      print Foo == "Foo"; // expect: false
      print Foo == nil;   // expect: false
      print Foo == 123;   // expect: false
      print Foo == true;  // expect: false
      `
    },
    {
      testLabel: 'Equals method',
      testValue: 
      `
      // Bound methods have identity equality.
      class Foo {
        method() {}
      }
      
      var foo = Foo();
      var fooMethod = foo.method;
      
      // Same bound method.
      print fooMethod == fooMethod; // expect: true
      
      // Different closurizations.
      print foo.method == foo.method; // expect: false
      `
    },
    {
      testLabel: 'Greater non-num num',
      testValue: 
      `
      "1" > 1; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Greater num non-num',
      testValue: 
      `
      1 > "1"; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Greater or equal non-num num',
      testValue: 
      `
      "1" >= 1; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Greater or equal num non-num',
      testValue: 
      `
      1 >= "1"; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Less non-num num',
      testValue: 
      `
      "1" < 1; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Less num non-num',
      testValue: 
      `
      1 < "1"; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Less or equal non-num num',
      testValue: 
      `
      "1" <= 1; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Less or equal num non-num',
      testValue: 
      `
      1 <= "1"; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Multiply',
      testValue: 
      `
      print 5 * 3; // expect: 15
      print 12.34 * 0.3; // expect: 3.702
      `
    },
    {
      testLabel: 'Multiply non-num num',
      testValue: 
      `
      "1" * 1; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Multiply num non-num',
      testValue: 
      `
      1 * "1"; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Negate',
      testValue: 
      `
      print -(3); // expect: -3
      print --(3); // expect: 3
      print ---(3); // expect: -3
      `
    },
    {
      testLabel: 'Negate non-num',
      testValue: 
      `
      -"s"; // expect runtime error: Operand must be a number.
      `
    },
    {
      testLabel: 'Not',
      testValue: 
      `
      print !true;     // expect: false
      print !false;    // expect: true
      print !!true;    // expect: true
      
      print !123;      // expect: false
      print !0;        // expect: false
      
      print !nil;     // expect: true
      
      print !"";       // expect: false
      
      fun foo() {}
      print !foo;      // expect: false
      `
    },
    {
      testLabel: 'Not class',
      testValue: 
      `
      class Bar {}
      print !Bar;      // expect: false
      print !Bar();    // expect: false
      `
    },
    {
      testLabel: 'Not equals',
      testValue: 
      `
      print nil != nil; // expect: false

      print true != true; // expect: false
      print true != false; // expect: true
      
      print 1 != 1; // expect: false
      print 1 != 2; // expect: true
      
      print "str" != "str"; // expect: false
      print "str" != "ing"; // expect: true
      
      print nil != false; // expect: true
      print false != 0; // expect: true
      print 0 != "0"; // expect: true
      `
    },
    {
      testLabel: 'Subtract',
      testValue: 
      `
      print 4 - 3; // expect: 1
      print 1.2 - 1.2; // expect: 0
      `
    },
    {
      testLabel: 'Subtract non-num num',
      testValue: 
      `
      "1" - 1; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Subtract num non-num',
      testValue: 
      `
      1 - "1"; // expect runtime error: Operands must be numbers.
      `
    },
  ],
  "print" : [
    {
      testLabel: 'Missing argument',
      testValue: 
      `
      // [line 2] Error at ';': Expect expression.
      print;
      `
    },
  ],
  "regression" : [
    {
      testLabel: '394',
      testValue: 
      `
      {
        class A {}
        class B < A {}
        print B; // expect: B
      }
      `
    },
    {
      testLabel: '40',
      testValue: 
      `
      fun caller(g) {
        g();
        // g should be a function, not nil.
        print g == nil; // expect: false
      }
      
      fun callCaller() {
        var capturedVar = "before";
        var a = "a";
      
        fun f() {
          // Commenting the next line out prevents the bug!
          capturedVar = "after";
      
          // Returning anything also fixes it, even nil:
          //return nil;
        }
      
        caller(f);
      }
      
      callCaller();
      `
    },
  ],
  "return" : [
    {
      testLabel: 'After else',
      testValue: 
      `
      fun f() {
        if (false) "no"; else return "ok";
      }
      
      print f(); // expect: ok
      `
    },
    {
      testLabel: 'After if',
      testValue: 
      `
      fun f() {
        if (true) return "ok";
      }
      
      print f(); // expect: ok
      `
    },
    {
      testLabel: 'After while',
      testValue: 
      `
      fun f() {
        while (true) return "ok";
      }
      
      print f(); // expect: ok
      `
    },
    {
      testLabel: 'At top level',
      testValue: 
      `
      return "wat"; // Error at 'return': Can't return from top-level code.
      `
    },
    {
      testLabel: 'In function',
      testValue: 
      `
      fun f() {
        return "ok";
        print "bad";
      }
      
      print f(); // expect: ok
      `
    },
    {
      testLabel: 'In method',
      testValue: 
      `
      class Foo {
        method() {
          return "ok";
          print "bad";
        }
      }
      
      print Foo().method(); // expect: ok
      `
    },
    {
      testLabel: 'Return nil if no value',
      testValue: 
      `
      fun f() {
        return;
        print "bad";
      }
      
      print f(); // expect: nil
      `
    },
  ],
  "string" : [
    {
      testLabel: 'Error after multiline',
      testValue: 
      `
      // Tests that we correctly track the line info across multiline strings.
      var a = "1
      2
      3
      ";
      
      err; // // expect runtime error: Undefined variable 'err'.
      `
    },
    {
      testLabel: 'Litrals',
      testValue: 
      `
      print "(" + "" + ")";   // expect: ()
      print "a string"; // expect: a string
      
      // Non-ASCII.
      print "A~¶Þॐஃ"; // expect: A~¶Þॐஃ
      `
    },
    {
      testLabel: 'Multiline',
      testValue: 
      `
      var a = "1
      2
      3";
      print a;
      // expect: 1
      // expect: 2
      // expect: 3
      `
    },
    {
      testLabel: 'Unterminated',
      testValue: 
      `
      // [line 2] Error: Unterminated string.
      "this string has no close quote
      `
    },
  ],
  "super" : [
    {
      testLabel: 'Bound method',
      testValue: 
      `
      class A {
        method(arg) {
          print "A.method(" + arg + ")";
        }
      }
      
      class B < A {
        getClosure() {
          return super.method;
        }
      
        method(arg) {
          print "B.method(" + arg + ")";
        }
      }
      
      
      var closure = B().getClosure();
      closure("arg"); // expect: A.method(arg)
      `
    },
    {
      testLabel: 'Call other method',
      testValue: 
      `
      class Base {
        foo() {
          print "Base.foo()";
        }
      }
      
      class Derived < Base {
        bar() {
          print "Derived.bar()";
          super.foo();
        }
      }
      
      Derived().bar();
      // expect: Derived.bar()
      // expect: Base.foo()
      `
    },
    {
      testLabel: 'Call same method',
      testValue: 
      `
      class Base {
        foo() {
          print "Base.foo()";
        }
      }
      
      class Derived < Base {
        foo() {
          print "Derived.foo()";
          super.foo();
        }
      }
      
      Derived().foo();
      // expect: Derived.foo()
      // expect: Base.foo()
      `
    },
    {
      testLabel: 'Constructor',
      testValue: 
      `
      class Base {
        init(a, b) {
          print "Base.init(" + a + ", " + b + ")";
        }
      }
      
      class Derived < Base {
        init() {
          print "Derived.init()";
          super.init("a", "b");
        }
      }
      
      Derived();
      // expect: Derived.init()
      // expect: Base.init(a, b)
      `
    },
    {
      testLabel: 'Extra arguments',
      testValue: 
      `
      class Base {
        foo(a, b) {
          print "Base.foo(" + a + ", " + b + ")";
        }
      }
      
      class Derived < Base {
        foo() {
          super.foo("a", "b", "c", "d"); // expect runtime error: Expected 2 arguments but got 4.
        }
      }
      
      Derived().foo();
      `
    },
    {
      testLabel: 'Indirectly inherited',
      testValue: 
      `
      class A {
        foo() {
          print "A.foo()";
        }
      }
      
      class B < A {}
      
      class C < B {
        foo() {
          print "C.foo()";
          super.foo();
        }
      }
      
      C().foo();
      // expect: C.foo()
      // expect: A.foo()
      `
    },
    {
      testLabel: 'Missing arguments',
      testValue: 
      `
      class Base {
        foo(a, b) {
          print "Base.foo(" + a + ", " + b + ")";
        }
      }
      
      class Derived < Base {
        foo() {
          super.foo(1); // expect runtime error: Expected 2 arguments but got 1.
        }
      }
      
      Derived().foo();
      `
    },
    {
      testLabel: 'No superclass bind',
      testValue: 
      `
      class Base {
        foo() {
          super.doesNotExist; // Error at 'super': Can't use 'super' in a class with no superclass.
        }
      }
      
      Base().foo();
      `
    },
    {
      testLabel: 'No superclass call',
      testValue: 
      `
      class Base {
        foo() {
          super.doesNotExist(1); // Error at 'super': Can't use 'super' in a class with no superclass.
        }
      }
      
      Base().foo();
      `
    },
    {
      testLabel: 'Parenthesized',
      testValue: 
      `
      class Base {}

      class Derived < Base {
        foo() {
          super.doesNotExist(1); // expect runtime error: Undefined property 'doesNotExist'.
        }
      }
      
      Derived().foo();
      `
    },
    {
      testLabel: 'Reassign superclass',
      testValue: 
      `
      class Base {
        method() {
          print "Base.method()";
        }
      }
      
      class Derived < Base {
        method() {
          super.method();
        }
      }
      
      class OtherBase {
        method() {
          print "OtherBase.method()";
        }
      }
      
      var derived = Derived();
      derived.method(); // expect: Base.method()
      Base = OtherBase;
      derived.method(); // expect: Base.method()
      `
    },
    {
      testLabel: 'Super at top level',
      testValue: 
      `
      super.foo("bar"); // Error at 'super': Can't use 'super' outside of a class.
      super.foo; // Error at 'super': Can't use 'super' outside of a class.
      `
    },
    {
      testLabel: 'Super in inherited method',
      testValue: 
      `
      class A {
        say() {
          print "A";
        }
      }
      
      class B < A {
        test() {
          super.say();
        }
      
        say() {
          print "B";
        }
      }
      
      class C < B {
        say() {
          print "C";
        }
      }
      
      C().test(); // expect: A
      `
    },
    {
      testLabel: 'Super in top level function',
      testValue: 
      `
      super.bar(); // Error at 'super': Can't use 'super' outside of a class.
      fun foo() {
      }
      `
    },
    {
      testLabel: 'Super without dot',
      testValue: 
      `
      class A {}

      class B < A {
        method() {
          // [line 6] Error at ';': Expect '.' after 'super'.
          super;
        }
      }
      `
    },
    {
      testLabel: 'Super without name',
      testValue: 
      `
      class A {}

      class B < A {
        method() {
          super.; // Error at ';': Expect superclass method name.
        }
      }
      `
    },
    {
      testLabel: 'This is superclass method',
      testValue: 
      `
      class Base {
        init(a) {
          this.a = a;
        }
      }
      
      class Derived < Base {
        init(a, b) {
          super.init(a);
          this.b = b;
        }
      }
      
      var derived = Derived("a", "b");
      print derived.a; // expect: a
      print derived.b; // expect: b
      `
    },
  ],
  "this" : [
    {
      testLabel: 'Closure',
      testValue: 
      `
      class Foo {
        getClosure() {
          fun closure() {
            return this.toString();
          }
          return closure;
        }
      
        toString() { return "Foo"; }
      }
      
      var closure = Foo().getClosure();
      print closure(); // expect: Foo
      `
    },
    {
      testLabel: 'Nested',
      testValue: 
      `
      class Outer {
        method() {
          print this; // expect: Outer instance
      
          fun f() {
            print this; // expect: Outer instance
      
            class Inner {
              method() {
                print this; // expect: Inner instance
              }
            }
      
            Inner().method();
          }
          f();
        }
      }
      
      Outer().method();
      `
    },
    {
      testLabel: 'Nested Closure',
      testValue: 
      `
      class Foo {
        getClosure() {
          fun f() {
            fun g() {
              fun h() {
                return this.toString();
              }
              return h;
            }
            return g;
          }
          return f;
        }
      
        toString() { return "Foo"; }
      }
      
      var closure = Foo().getClosure();
      print closure()()(); // expect: Foo      `
    },
    {
      testLabel: 'This at top level',
      testValue: 
      `
      this; // Error at 'this': Can't use 'this' outside of a class.
      `
    },
    {
      testLabel: 'This in method',
      testValue: 
      `
      class Foo {
        bar() { return this; }
        baz() { return "baz"; }
      }
      
      print Foo().bar().baz(); // expect: baz
      `
    },
    {
      testLabel: 'This in top level function',
      testValue: 
      `
      fun foo() {
        this; // Error at 'this': Can't use 'this' outside of a class.
      }
      `
    }
  ],
  "variable" : [
    {
      testLabel: 'Collide with parameter',
      testValue: 
      `
      fun foo(a) {
        var a; // Error at 'a': Already variable with this name in this scope.
      }
      `
    },
    {
      testLabel: 'Duplicate local',
      testValue: 
      `
      {
        var a = "value";
        var a = "other"; // Error at 'a': Already variable with this name in this scope.
      }
      `
    },
    {
      testLabel: 'Duplicate parameter',
      testValue: 
      `
      fun foo(arg,
        arg) { // Error at 'arg': Already variable with this name in this scope.
                "body";
              }
      `
    },
    {
      testLabel: 'Early bound',
      testValue: 
      `
      var a = "outer";
      {
        fun foo() {
          print a;
        }
      
        foo(); // expect: outer
        var a = "inner";
        foo(); // expect: outer
      }
      `
    },
    {
      testLabel: 'In middle of block',
      testValue: 
      `
      {
        var a = "a";
        print a; // expect: a
        var b = a + " b";
        print b; // expect: a b
        var c = a + " c";
        print c; // expect: a c
        var d = b + " d";
        print d; // expect: a b d
      }
      `
    },
    {
      testLabel: 'In nested block',
      testValue: 
      `
      {
        var a = "outer";
        {
          print a; // expect: outer
        }
      }
      `
    },
    {
      testLabel: 'Local from method',
      testValue: 
      `
      var foo = "variable";

      class Foo {
        method() {
          print foo;
        }
      }
      
      Foo().method(); // expect: variable
      `
    },
    {
      testLabel: 'Redeclare global',
      testValue: 
      `
      var a = "1";
      var a;
      print a; // expect: nil
      `
    },
    {
      testLabel: 'Redefine global',
      testValue: 
      `
      var a = "1";
      var a = "2";
      print a; // expect: 2
      `
    },
    {
      testLabel: 'Scope reuse in different blocks',
      testValue: 
      `
      {
        var a = "first";
        print a; // expect: first
      }
      
      {
        var a = "second";
        print a; // expect: second
      }
      `
    },
    {
      testLabel: 'Shadow and local',
      testValue: 
      `
      {
        var a = "outer";
        {
          print a; // expect: outer
          var a = "inner";
          print a; // expect: inner
        }
      }
      `
    },
    {
      testLabel: 'Shadow global',
      testValue: 
      `
      var a = "global";
      {
        var a = "shadow";
        print a; // expect: shadow
      }
      print a; // expect: global
      `
    },
    {
      testLabel: 'Shadow local',
      testValue: 
      `
      {
        var a = "local";
        {
          var a = "shadow";
          print a; // expect: shadow
        }
        print a; // expect: local
      }
      `
    },
    {
      testLabel: 'Undefined global',
      testValue: 
      `
      print notDefined;  // expect runtime error: Undefined variable 'notDefined'.
      `
    },
    {
      testLabel: 'Undefined local',
      testValue: 
      `
      {
        print notDefined;  // expect runtime error: Undefined variable 'notDefined'.
      }
      `
    },
    {
      testLabel: 'Uninitialized',
      testValue: 
      `
      var a;
      print a; // expect: nil
      `
    },
    {
      testLabel: 'Unreached undefined',
      testValue: 
      `
      if (false) {
        print notDefined;
      }
      
      print "ok"; // expect: ok
      `
    },
    {
      testLabel: 'Use false as var',
      testValue: 
      `
      // [line 2] Error at 'false': Expect variable name.
      var false = "value";
      `
    },
    {
      testLabel: 'Use global in initializer',
      testValue: 
      `
      var a = "value";
      var a = a;
      print a; // expect: value
      `
    },
    {
      testLabel: 'Use local in initializer',
      testValue: 
      `
      var a = "outer";
      {
        var a = a; // Error at 'a': Can't read local variable in its own declaration.
      }
      `
    },
    {
      testLabel: 'Use nil as var',
      testValue: 
      `
      // [line 2] Error at 'nil': Expect variable name.
      var nil = "value";
      `
    },
    {
      testLabel: 'Use this as var',
      testValue: 
      `
      // [line 2] Error at 'this': Expect variable name.
      var this = "value";
      `
    }
  ],
  "while" : [
    {
      testLabel: 'Class in body',
      testValue: 
      `
      // [line 2] Error at 'class': Expect expression.
      while (true) class Foo {}
      `
    },
    {
      testLabel: 'Closure in body',
      testValue: 
      `
      var f1;
      var f2;
      var f3;
      
      var i = 1;
      while (i < 4) {
        var j = i;
        fun f() { print j; }
      
        if (j == 1) f1 = f;
        else if (j == 2) f2 = f;
        else f3 = f;
      
        i = i + 1;
      }
      
      f1(); // expect: 1
      f2(); // expect: 2
      f3(); // expect: 3
      `
    },
    {
      testLabel: 'Function in body',
      testValue: 
      `
      // [line 2] Error at 'fun': Expect expression.
      while (true) fun foo() {}
      `
    },
    {
      testLabel: 'Return closure',
      testValue: 
      `
      fun f() {
        while (true) {
          var i = "i";
          fun g() { print i; }
          return g;
        }
      }
      
      var h = f();
      h(); // expect: i
      `
    },
    {
      testLabel: 'Return inside',
      testValue: 
      `
      fun f() {
        while (true) {
          var i = "i";
          return i;
        }
      }
      
      print f();
      // expect: i
      `
    },
    {
      testLabel: 'Syntax',
      testValue: 
      `
      // Single-expression body.
      var c = 0;
      while (c < 3) print c = c + 1;
      // expect: 1
      // expect: 2
      // expect: 3
      
      // Block body.
      var a = 0;
      while (a < 3) {
        print a;
        a = a + 1;
      }
      // expect: 0
      // expect: 1
      // expect: 2
      
      // Statement bodies.
      while (false) if (true) 1; else 2;
      while (false) while (true) 1;
      while (false) for (;;) 1;
      `
    },
    {
      testLabel: 'Var in body',
      testValue: 
      `
      // [line 2] Error at 'var': Expect expression.
      while (true) var foo;
      `
    }
  ],
  "Spanish" : [
    {
      testLabel: 'Assignment: Associativity',
      testValue: 
      `
      variable a = "a";
      variable b = "b";
      variable c = "c";
      
      // Assignment is right-associative.
      a = b = c;
      imprima a; // expect: c
      imprima b; // expect: c
      imprima c; // expect: c
      `
    },
    {
      testLabel: 'Assignment: Global',
      testValue:
      `
      variable a = "antes";
      imprima a; // expect: antes

      a = "después";
      imprima a; // expect: después

      imprima a = "arg"; // expect: arg
      imprima a; // expect: arg
      `
    },
    {
      testLabel: 'Assignment: Grouping',
      testValue: 
      `
      variable a = "a";
      (a) = "valor"; // Error at '=': Invalid assignment target.
      `
    },
    {
      testLabel: 'Assignment: Infix operator',
      testValue: 
      `
      variable a = "a";
      variable b = "b";
      a + b = "valor"; // Error at '=': Invalid assignment target.
      `
    },
    {
      testLabel: 'Assignment: Local',
      testValue: `
      {
        variable a = "antes";
        imprima a; // expect: before
      
        a = "después";
        imprima a; // expect: after
      
        imprima a = "arg"; // expect: arg
        imprima a; // expect: arg
      }
      `
    },
    {
      testLabel: 'Assignment: Prefix operator',
      testValue: 
      `
      var a = "a";
      !a = "value"; // Error at '=': Invalid assignment target.
      `
    },
    {
      testLabel: 'Assignment: Syntax',
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
      testLabel: 'Assignment: To this',
      testValue: 
      `
      clase Foo {
        Foo() {
          este = "valor"; // Error at '=': Invalid assignment target.
        }
      }
      
      Foo();
      `, 
    },
    {
      testLabel: 'Assignment: Undefined',
      testValue: 
      `
      desconocido = "qué!!!"; // expect runtime error: Undefined variable 'desconocido'.
      ` 
    },
    {
      testLabel: 'Block: Empty',
      testValue: 
      `
      {} // By itself.
      
      // In a statement.
      si (verdadero) {}
      si (falso) {} sino {}
      
      imprima "ok"; // expect: ok
      `
    },
    {
      testLabel: 'Block: Scope',
      testValue:
       `
      variable a = "afuera";
      
      {
        variable a = "adentro";
        imprima a;                // expect: adentro
      }
      
      imprima a;                  // expect: afuera
      `
    },
    {
      testLabel: 'Bool: Equality',
      testValue: 
      `
      imprima verdadero == verdadero;    // expect: true
      imprima verdadero == falso;        // expect: false
      imprima falso == verdadero;        // expect: false
      imprima falso == falso;            // expect: true
      
      // Not equal to other types.
      imprima verdadero == 1;            // expect: false
      imprima falso == 0;                // expect: false
      imprima verdadero == "verdadero";  // expect: false
      imprima falso == "falso";          // expect: false
      imprima falso == "";               // expect: false
      
      imprima verdadero != verdadero;    // expect: false
      imprima verdadero != falso;        // expect: true
      imprima falso != verdadero;        // expect: true
      imprima falso != falso;            // expect: false
      
      // Not equal to other types.
      imprima verdadero != 1;            // expect: true
      imprima falso != 0;                // expect: true
      imprima verdadero != "verdadero";  // expect: true
      imprima falso != "falso";          // expect: true
      imprima falso != "";               // expect: true
      `
    },
    {
      testLabel: 'Bool: Not',
      testValue: 
      `
      imprima !verdadero;    // expect: false
      imprima !falso;        // expect: true
      imprima !!verdadero;   // expect: true
      `
    },
    {
      testLabel: 'Bool: Bool',
      testValue: 
      `
      verdadero(); // expect runtime error: Can only call functions and classes.
      `
    },
    {
      testLabel: 'Call: Nil',
      testValue: 
      `
      nulo(); // expect runtime error: Can only call functions and classes.
      `
    },
    {
      testLabel: 'Call: Num',
      testValue:
       `
      123(); // expect runtime error: Can only call functions and classes.
      `
    },
    {
      testLabel: 'Call: Object',
      testValue: 
      `
      clase Foo {}
      
      variable foo = Foo();
      foo(); // expect runtime error: Can only call functions and classes.
      `
    },
    {
      testLabel: 'Call: String',
      testValue: 
      `
      "str"(); // expect runtime error: Can only call functions and classes.
      `
    },
    {
      testLabel: 'Call: Correct call',
      testValue: 
      `
      funcion Foo() {
        imprima "Hola";
      }

      Foo(); // expect: Hola
      `
    },
    {
      testLabel: 'Class: Empty',
      testValue: 
      `
      clase Foo {}

      imprima Foo; // expect: Foo
      `
    },
    {
      testLabel: 'Class: Inherit self',
      testValue: 
      `
      clase Foo < Foo {} // Error at 'Foo': A class can't inherit from itself.
      `
    },
    {
      testLabel: 'Class: Inherited method',
      testValue: 
      `
      clase Foo {
        enFoo() {
          imprima "en foo";
        }
      }
      
      clase Bar < Foo {
        enBar() {
          imprima "en bar";
        }
      }
      
      clase Baz < Bar {
        enBaz() {
          imprima "en baz";
        }
      }
      
      variable baz = Baz();
      baz.enFoo(); // expect: en foo
      baz.enBar(); // expect: en bar
      baz.enBaz(); // expect: en baz
      `
    },
    {
      testLabel: 'Class: Local inherit other',
      testValue: 
      `
      clase A {}

      fun f() {
        clase B < A {}
        retorne B;
      }
      
      imprima f(); // expect: B
      `
    },
    {
      testLabel: 'Class: Local inherit self',
      testValue: 
      `
      {
        clase Foo < Foo {} // Error at 'Foo': A class can't inherit from itself.
      }
      `
    },
    {
      testLabel: 'Class: Local refrence self',
      testValue: 
      `
      {
        clase Foo {
          retorneMisma() {
            retorne Foo;
          }
        }
      
        imprima Foo().retorneMisma(); // expect: Foo
      }
      `
    },
    {
      testLabel: 'Class: Reference self',
      testValue: 
      `
      clase Foo {
        retorneMisma() {
          retorne Foo;
        }
      }
      
      imprima Foo().retorneMisma(); // expect: Foo
      `
    },
    {
      testLabel: 'Closure: Assign to closure',
      testValue: 
      `
      variable f;
      variable g;
      
      {
        variable local = "local";
        funcion f_() {
          imprima local;
          local = "después f";
          imprima local;
        }
        f = f_;
      
        funcion g_() {
          imprima local;
          local = "después g";
          imprima local;
        }
        g = g_;
      }
      
      f();
      // expect: local
      // expect: después f
      
      g();
      // expect: after f
      // expect: after g
      `
    },
    {
      testLabel: 'Closure: Assign to shadowed later',
      testValue: 
      `
      variable a = "global";

      {
        funcion asignar() {
          a = "asignada";
        }
      
        variable a = "adentro";
        asignar();
        imprima a; // expect: adentro
      }
      
      imprima a; // expect: asignada
      `
    },
    {
      testLabel: 'Closure: Close over fucntion parameter',
      testValue: 
      `
      variable f;

      funcion foo(parametro) {
        funcion f_() {
          imprima parametro;
        }
        f = f_;
      }
      foo("parámetro");
      
      f(); // expect: parámetro
      `
    },
    {
      testLabel: 'Closure: Close over later variable',
      testValue: 
      `

      // This is a regression test. There was a bug where if an upvalue for an
      // earlier local (here "a") was captured *after* a later one ("b"), then it
      // would crash because it walked to the end of the upvalue list (correct), but
      // then didn't handle not finding the variable.
      
      funcion f() {
        variable a = "a";
        variable b = "b";
        funcion g() {
          imprima b; // expect: b
          imprima a; // expect: a
        }
        g();
      }
      f();
      `
    },
    {
      testLabel: 'Closure: Close over method parameter',
      testValue: 
      `
      variable f;

      clase Foo {
        metodo(parametro) {
          funcion f_() {
            imprima parametro;
          }
          f = f_;
        }
      }
      
      Foo().metodo("parámetro");
      f(); // expect: parámetro
      `
    },
    {
      testLabel: 'Closure: Closed closure in function',
      testValue: 
      `
      variable f;

      {
        variable local = "local";
        funcion f_() {
          imprima local;
        }
        f = f_;
      }
      
      f(); // expect: local
      `
    },
    {
      testLabel: 'Closure: Nested closure',
      testValue: 
      `
      variable f;

      funcion f1() {
        variable a = "a";
        funcion f2() {
          variable b = "b";
          funcion f3() {
            variable c = "c";
            funcion f4() {
              imprima a;
              imprima b;
              imprima c;
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
      testLabel: 'Closure: Open closure in function',
      testValue: 
      `
      {
        variable local = "local";
        funcion f() {
          imprima local; // expect: local
        }
        f();
      }
      `
    },
    {
      testLabel: 'Closure: Open closure multiple times',
      testValue: 
      `
      variable f;

      {
        variable a = "a";
        funcion f_() {
          imprima a;
          imprima a;
        }
        f = f_;
      }
      
      f();
      // expect: a
      // expect: a
      `
    },
    {
      testLabel: 'Closure: Reuse closure slot',
      testValue: 
      `
      {
        variable f;
      
        {
          variable a = "a";
          funcion f_() { imprima a; }
          f = f_;
        }
      
        {
          // Since a is out of scope, the local slot will be reused by b. Make sure
          // that f still closes over a.
          variable b = "b";
          f(); // expect: a
        }
      }
      `
    },
    {
      testLabel: 'Closure: Shadow closure with local',
      testValue: 
      `
      {
        variable foo = "cierre";
        funcion f() {
          {
            imprima foo; // expect: cierre
            variable foo = "sombra";
            imprima foo; // expect: sombra
          }
          imprima foo; // expect: cierre
        }
        f();
      }
      `
    },
    {
      testLabel: 'Closure: Unused closure',
      testValue: 
      `
      // This is a regression test. There was a bug where the VM would try to close
      // an upvalue even if the upvalue was never created because the codepath for
      // the closure was not executed.
      
      {
        variable a = "a";
        if (falso) {
          funcion foo() { a; }
        }
      }
      
      // If we get here, we didn't segfault when a went out of scope.
      imprima "ok"; // expect: ok
      `
    },
    {
      testLabel: 'Closure: Unused later closure',
      testValue: 
      `
      // This is a regression test. When closing upvalues for discarded locals, it
      // wouldn't make sure it discarded the upvalue for the correct stack slot.
      //
      // Here we create two locals that can be closed over, but only the first one
      // actually is. When "b" goes out of scope, we need to make sure we don't
      // prematurely close "a".
      
      variable cierre;
      
      {
        variable a = "a";
      
        {
          variable b = "b";
          funcion retorneA() {
            retorne a;
          }
      
          cierre = retorneA;
      
          si (false) {
            funcion retorneB() {
              retorne b;
            }
          }
        }
      
        imprima cierre(); // expect: a
      }
      `
    },
    {
      testLabel: 'Comments: Line at EOF',
      testValue: 
      `
      imprima "ok"; // expect: ok
      // comentario
      `
    },
    {
      testLabel: 'Comments: Only line comment',
      testValue: 
      `
      // comentario
      `
    },
    {
      testLabel: 'Comments: Only line comment and line',
      testValue: 
      `
      // comentario
      `
    },
    {
      testLabel: 'Comments: Unicode',
      testValue: 
      `
      // Unicode characters are allowed in comments.
      //
      // Latin 1 Supplement: £§¶ÜÞ
      // Latin Extended-A: ĐĦŋœ
      // Latin Extended-B: ƂƢƩǁ
      // Other stuff: ឃᢆ᯽₪ℜ↩⊗┺░
      // Emoji: ☃☺♣
      
      imprima "ok"; // expect: ok
      `
    },
    {
      testLabel: 'Constructors: Arguments',
      testValue: 
      `
      clase Foo {
        inicio(a, b) {
          imprima "inicio"; // expect: inicio
          este.a = a;
          este.b = b;
        }
      }
      
      variable foo = Foo(1, 2);
      imprima foo.a; // expect: 1
      imprima foo.b; // expect: 2
      `
    },
    {
      testLabel: 'Constructors: Call inicio early return',
      testValue: 
      `
      clase Foo {
        inicio() {
          imprima "inicio";
          retorne;
          imprima "nope";
        }
      }
      
      variable foo = Foo(); // expect: inicio
      imprima foo.inicio(); // expect: inicio
      // expect: Foo instance
      `
    },
    {
      testLabel: 'Constructors: Call inicio explicitly',
      testValue: 
      `
      clase Foo {
        inicio(arg) {
          imprima "Foo.inicio(" + arg + ")";
          este.campo = "inicio";
        }
      }
      
      variable foo = Foo("uno"); // expect: Foo.inicio(uno)
      foo.campo = "campo";
      
      variable foo2 = foo.inicio("dos"); // expect: Foo.inicio(dos)
      imprima foo2; // expect: Foo instance
      
      // Make sure inicio() doesn't create a fresh instance.
      imprima foo.campo; // expect: inicio
      `
    },
    {
      testLabel: 'Constructors: Default',
      testValue: 
      `
      clase Foo {}

      variable foo = Foo();
      imprima foo; // expect: Foo instance
      `
    },
    {
      testLabel: 'Constructors: Default arguments',
      testValue: 
      `
      clase Foo {
        inicio() {
          imprima "inicio";
          retorne;
          imprima "nope";
        }
      }
      
      variable foo = Foo(); // expect: inicio
      imprima foo; // expect: Foo instance
      `
    },
    {
      testLabel: 'Constructors: Early return',
      testValue: 
      `
      clase Foo {
        inicio() {
          imprima "inicio";
          retorne;
          imprima "no";
        }
      }
      
      variable foo = Foo(); // expect: inicio
      imprima foo; // expect: Foo instance
      `
    },
    {
      testLabel: 'Constructors: Extra arguments',
      testValue: 
      `
      clase Foo {
        inicio(a, b) {
          este.a = a;
          este.b = b;
        }
      }
      
      variable foo = Foo(1, 2, 3, 4); // expect runtime error: Expected 2 arguments but got 4.
      `
    },
    {
      testLabel: 'Constructors: inicio not method',
      testValue: 
      `
      clase Foo {
        inicio(arg) {
          imprima "Foo.inicio(" + arg + ")";
          este.field = "inicio";
        }
      }
      
      fun inicio() {
        imprima "no inicializador";
      }
      
      inicio(); // expect: no inicializador
      `
    },
    {
      testLabel: 'Constructors: Missing arguments',
      testValue: 
      `
      clase Foo {
        inicio(a, b) {}
      }
      
      variable foo = Foo(1); // expect runtime error: Expected 2 arguments but got 1.
      `
    },
    {
      testLabel: 'Constructors: Return in nested function',
      testValue: 
      `
      clase Foo {
        inicio() {
          fun inicio() {
            return "bar";
          }
          imprima inicio(); // expect: bar
        }
      }
      
      imprima Foo(); // expect: Foo instance
      `
    },
    {
      testLabel: 'Constructors: Return value',
      testValue: 
      `
      clase Foo {
        inicio() {
          retorne "resultado"; // Error at 'retorne': Can't return a value from an initializer.
        }
      }
      `
    },
    {
      testLabel: 'Field: Call function field',
      testValue: 
      `
      clase Foo {}

      funcion bar(a, b) {
        imprima "bar";
        imprima a;
        imprima b;
      }
      
      variable foo = Foo();
      foo.bar = bar;
      
      foo.bar(1, 2);
      // expect: bar
      // expect: 1
      // expect: 2
      `
    },
    {
      testLabel: 'Field: Call non-function field',
      testValue: 
      `
      clase Foo {}

      variable foo = Foo();
      foo.bar = "no es una función";
      
      foo.bar(); // expect runtime error: Can only call functions and classes.
      `
    },
    {
      testLabel: 'Field: Get and set method',
      testValue: 
      `
      // Bound methods have identity equality.
      clase Foo {
        metodo(a) {
          imprima "metodo";
          imprima a;
        }
        otro(a) {
          imprima "otro";
          imprima a;
        }
      }
      
      variable foo = Foo();
      variable metodo = foo.metodo;
      
      // Setting a property shadows the instance method.
      foo.metodo = foo.otro;
      foo.metodo(1);
      // expect: otro
      // expect: 1
      
      // The old method handle still points to the original method.
      metodo(2);
      // expect: metodo
      // expect: 2
      `
    },
    {
      testLabel: 'Field: Get on bool',
      testValue: 
      `
      true.foo; // expect runtime error: Only instances have properties.
      `
    },
    {
      testLabel: 'Field: Get on class',
      testValue: 
      `
      clase Foo {}
      Foo.bar; // expect runtime error: Only instances have properties.
      `
    },
    {
      testLabel: 'Field: Get on function',
      testValue: 
      `
      funcion foo() {}

      foo.bar; // expect runtime error: Only instances have properties.
      `
    },
    {
      testLabel: 'Field: Get on nil',
      testValue: 
      `
      nulo.foo; // expect runtime error: Only instances have properties.
      `
    },
    {
      testLabel: 'Field: Get on num',
      testValue: 
      `
      123.foo; // expect runtime error: Only instances have properties.
      `
    },
    {
      testLabel: 'Field: Get on string',
      testValue: 
      `
      "cadena".foo; // expect runtime error: Only instances have properties.
      `
    },
    {
      testLabel: 'Field: Many',
      testValue: 
      `
      clase Foo {}

      variable foo = Foo();
      funcion crearCampos() {
        foo.aceituna = "aceituna";
        foo.albaricoque = "albaricoque";
        foo.arandano = "arándano";
        foo.boysenberry = "boysenberry";
        foo.buzon = "buzón";
        foo.cantalupo = "cantalupo";
        foo.caqui = "caqui";
        foo.cereza = "cereza";
        foo.cherimoya = "cherimoya";
        foo.ciruela = "ciruela";
        foo.cirueladamascena = "ciruela damascena";
        foo.clementina = "clementina";
        foo.coco = "coco";
        foo.dragondefruta = "dragon de fruta";
        foo.durazno = "durazno";
        foo.duriano = "duriano";
        foo.enebro = "enebro";
        foo.fecha = "fecha";
        foo.feijoa = "feijoa";
        foo.fisalis = "fisalis";
        foo.frambuesa = "frambuesa";
        foo.fresa = "fresa";
        foo.gotasdemiel = "gotas de miel";
        foo.granada = "granada";
        foo.grosella = "grosella";
        foo.grosellanegra = "grosella negra";
        foo.guayaba = "guayaba";
        foo.higo = "higo";
        foo.jabuticaba = "jabuticaba";
        foo.jackfruit = "jackfruit";
        foo.jambul = "jambul";
        foo.kiwifruit = "kiwifruit";
        foo.lima = "lima";
        foo.limon = "limón";
        foo.longan = "longan";
        foo.lychee = "lychee";
        foo.mandarina = "mandarina";
        foo.mandarino = "mandarino";
        foo.mango = "mango";
        foo.manzana = "manzana";
        foo.maracuya = "maracuyá";
        foo.marionero = "marionero";
        foo.melon = "melón";
        foo.membrillo = "membrillo";
        foo.milagro = "milagro";
        foo.mora = "mora";
        foo.naranja = "naranja";
        foo.naranjachina = "naranja china";
        foo.nectarina = "nectarina";
        foo.nispero = "níspero";
        foo.nubes = "nubes";
        foo.palta = "palta";
        foo.papaya = "papaya";
        foo.pasa = "pasa";
        foo.pastilla = "pastilla";
        foo.pera = "pera";
        foo.pina = "piña";
        foo.platano = "plátano";
        foo.plumcot = "plumcot";
        foo.pomelo = "pomelo";
        foo.rambutan = "rambután";
        foo.salak = "salak";
        foo.salmon = "salmón";
        foo.sandia = "sandía";
        foo.satsuma = "satsuma";
        foo.tamarillo = "tamarillo";
        foo.tamarindo = "tamarindo";
        foo.tomate = "tomate";
        foo.toronja = "toronja";
        foo.uva = "uva";
        foo.yuzu = "yuzu";
      }
      
      crearCampos();
      
      funcion imprimaFields() {
        imprima foo.aceituna;     // expect: aceituna
        imprima foo.albaricoque;     // expect: albaricoque
        imprima foo.arandano;     // expect: arandano
        imprima foo.boysenberry;     // expect: boysenberry
        imprima foo.buzon;     // expect: buzon
        imprima foo.cantalupo;     // expect: cantalupo
        imprima foo.caqui;     // expect: caqui
        imprima foo.cereza;     // expect: cereza
        imprima foo.cherimoya;     // expect: cherimoya
        imprima foo.ciruela;     // expect: ciruela
        imprima foo.cirueladamascena;     // expect: cirueladamascena
        imprima foo.clementina;     // expect: clementina
        imprima foo.coco;     // expect: coco
        imprima foo.dragondefruta;     // expect: dragondefruta
        imprima foo.durazno;     // expect: durazno
        imprima foo.duriano;     // expect: duriano
        imprima foo.enebro;     // expect: enebro
        imprima foo.fecha;     // expect: fecha
        imprima foo.feijoa;     // expect: feijoa
        imprima foo.fisalis;     // expect: fisalis
        imprima foo.frambuesa;     // expect: frambuesa
        imprima foo.fresa;     // expect: fresa
        imprima foo.gotasdemiel;     // expect: gotasdemiel
        imprima foo.granada;     // expect: granada
        imprima foo.grosella;     // expect: grosella
        imprima foo.grosellanegra;     // expect: grosellanegra
        imprima foo.guayaba;     // expect: guayaba
        imprima foo.higo;     // expect: higo
        imprima foo.jabuticaba;     // expect: jabuticaba
        imprima foo.jackfruit;     // expect: jackfruit
        imprima foo.jambul;     // expect: jambul
        imprima foo.kiwifruit;     // expect: kiwifruit
        imprima foo.lima;     // expect: lima
        imprima foo.limon;     // expect: limon
        imprima foo.longan;     // expect: longan
        imprima foo.lychee;     // expect: lychee
        imprima foo.mandarina;     // expect: mandarina
        imprima foo.mandarino;     // expect: mandarino
        imprima foo.mango;     // expect: mango
        imprima foo.manzana;     // expect: manzana
        imprima foo.maracuya;     // expect: maracuya
        imprima foo.marionero;     // expect: marionero
        imprima foo.melon;     // expect: melon
        imprima foo.membrillo;     // expect: membrillo
        imprima foo.milagro;     // expect: milagro
        imprima foo.mora;     // expect: mora
        imprima foo.naranja;     // expect: naranja
        imprima foo.naranjachina;     // expect: naranjachina
        imprima foo.nectarina;     // expect: nectarina
        imprima foo.nispero;     // expect: nispero
        imprima foo.nubes;     // expect: nubes
        imprima foo.palta;     // expect: palta
        imprima foo.papaya;     // expect: papaya
        imprima foo.pasa;     // expect: pasa
        imprima foo.pastilla;     // expect: pastilla
        imprima foo.pera;     // expect: pera
        imprima foo.pina;     // expect: pina
        imprima foo.platano;     // expect: platano
        imprima foo.plumcot;     // expect: plumcot
        imprima foo.pomelo;     // expect: pomelo
        imprima foo.rambutan;     // expect: rambutan
        imprima foo.salak;     // expect: salak
        imprima foo.salmon;     // expect: salmon
        imprima foo.sandia;     // expect: sandia
        imprima foo.satsuma;     // expect: satsuma
        imprima foo.tamarillo;     // expect: tamarillo
        imprima foo.tamarindo;     // expect: tamarindo
        imprima foo.tomate;     // expect: tomate
        imprima foo.toronja;     // expect: toronja
        imprima foo.uva;     // expect: uva
        imprima foo.yuzu;     // expect: yuzu
      }
      
      imprimaFields();
      `
    },
    {
      testLabel: 'Field: Method',
      testValue: 
      `
      clase Foo {
        bar(arg) {
          imprima arg;
        }
      }
      
      variable bar = Foo().bar;
      imprima "método conseguido"; // expect: método conseguido
      bar("arg");          // expect: arg
      `
    },
    {
      testLabel: 'Field: Method binds this',
      testValue: 
      `
      clase Foo {
        sayNombre(a) {
          imprima este.nombre;
          imprima a;
        }
      }
      
      variable foo1 = Foo();
      foo1.nombre = "foo1";
      
      variable foo2 = Foo();
      foo2.nombre = "foo2";
      
      // Store the method reference on another object.
      foo2.fn = foo1.sayNombre;
      // Still retains original receiver.
      foo2.fn(1);
      // expect: foo1
      // expect: 1
      `
    },
    {
      testLabel: 'Field: On instance',
      testValue: 
      `
      clase Foo {}

      variable foo = Foo();
      
      imprima foo.bar = "bar value"; // expect: bar value
      imprima foo.baz = "baz value"; // expect: baz value
      
      imprima foo.bar; // expect: bar value
      imprima foo.baz; // expect: baz value
      `
    },
    {
      testLabel: 'Field: Set evaluation order',
      testValue: 
      `
      undefined1.bar // expect runtime error: Undefined variable 'undefined1'.
      = undefined2;
      `
    },
    {
      testLabel: 'Field: Set on bool',
      testValue: 
      `
      true.foo = “valor”; // expect runtime error: Only instances have fields.
      `
    },
    {
      testLabel: 'Field: Set on class',
      testValue: 
      `
      clase Foo {}
      Foo.bar = “valor”; // expect runtime error: Only instances have fields.
      `
    },
    {
      testLabel: 'Field: Set on function',
      testValue: 
      `
      funcion foo() {}

      foo.bar = “valor”; // expect runtime error: Only instances have fields.
      `
    },
    {
      testLabel: 'Field: Set on nil',
      testValue: 
      `
      nil.foo = “valor”; // expect runtime error: Only instances have fields.
      `
    },
    {
      testLabel: 'Field: Set on num',
      testValue: 
      `
      123.foo = “valor”; // expect runtime error: Only instances have fields.
      `
    },
    {
      testLabel: 'Field: Set on string',
      testValue: 
      `
      "str".foo = “valor”; // expect runtime error: Only instances have fields.
      `
    },
    {
      testLabel: 'Field: Undefined',
      testValue: 
      `
      clase Foo {}
      variable foo = Foo();
      
      foo.bar; // expect runtime error: Undefined property 'bar'.
      `
    },
    {
      testLabel: 'For: Class in body',
      testValue: 
      `
      // [line 2] Error at 'class': Expect expression.
      para (;;) class Foo {}
      `
    },
    {
      testLabel: 'For: Closure in body',
      testValue: 
      `
      variable f1;
      variable f2;
      variable f3;
      
      para (variable i = 1; i < 4; i = i + 1) {
        variable j = i;
        funcion f() {
          imprima i;
          imprima j;
        }
      
        si (j == 1) f1 = f;
        sino si (j == 2) f2 = f;
        sino f3 = f;
      }
      
      f1(); // expect: 4
            // expect: 1
      f2(); // expect: 4
            // expect: 2
      f3(); // expect: 4
            // expect: 3
      `
    },
    {
      testLabel: 'For: Function in body',
      testValue: 
      `
      // [line 2] Error at 'funcion': Expect expression.
      para (;;) funcion foo() {}
      `
    },
    {
      testLabel: 'For: Return closure',
      testValue: 
      `
      funcion f() {
        para (;;) {
          variable i = "i";
          funcion g() { imprima i; }
          return g;
        }
      }
      
      variable h = f();
      h(); // expect: i
      `
    },
    {
      testLabel: 'For: Return inside',
      testValue: 
      `
      funcion f() {
        para (;;) {
          variable i = "i";
          retorne i;
        }
      }
      
      imprima f();
      // expect: i
      `
    },
    {
      testLabel: 'For: Scope',
      testValue: 
      `
      {
        variable i = "before";
      
        // New variable is in inner scope.
        para (variable i = 0; i < 1; i = i + 1) {
          imprima i; // expect: 0
      
          // Loop body is in second inner scope.
          variable i = -1;
          imprima i; // expect: -1
        }
      }
      
      {
        // New variable shadows outer variable.
        para (variable i = 0; i > 0; i = i + 1) {}
      
        // Goes out of scope after loop.
        variable i = "después";
        imprima i; // expect: después
      
        // Can reuse an existing variable.
        para (i = 0; i < 1; i = i + 1) {
          imprima i; // expect: 0
        }
      }
      `
    },
    {
      testLabel: 'For: Statement condition',
      testValue: 
      `
      // [line 3] Error at '{': Expect expression.
      // [line 3] Error at ')': Expect ';' after expression.
      para (variable a = 1; {}; a = a + 1) {}
      `
    },
    {
      testLabel: 'For: Statement increment',
      testValue: 
      `
      // [line 2] Error at '{': Expect expression.
      para (variable a = 1; a < 2; {}) {}
      `
    },
    {
      testLabel: 'For: Statement initalizer',
      testValue: 
      `
      // [line 3] Error at '{': Expect expression.
      // [line 3] Error at ')': Expect ';' after expression.
      para ({}; a < 2; a = a + 1) {}
      `
    },
    {
      testLabel: 'For: Syntax',
      testValue: 
      `
      // Single-expression body.
      para (variable c = 0; c < 3;) imprima c = c + 1;
      // expect: 1
      // expect: 2
      // expect: 3
      
      // Block body.
      para (variable a = 0; a < 3; a = a + 1) {
        imprima a;
      }
      // expect: 0
      // expect: 1
      // expect: 2
      
      // No clauses.
      funcion foo() {
        para (;;) return "hecho";
      }
      imprima foo(); // expect: hecho
      
      // No variable.
      variable i = 0;
      para (; i < 2; i = i + 1) imprima i;
      // expect: 0
      // expect: 1
      
      // No condition.
      funcion bar() {
        para (variable i = 0;; i = i + 1) {
          imprima i;
          si (i >= 2) retorne;
        }
      }
      bar();
      // expect: 0
      // expect: 1
      // expect: 2
      
      // No increment.
      para (variable i = 0; i < 2;) {
        imprima i;
        i = i + 1;
      }
      // expect: 0
      // expect: 1
      
      // Statement bodies.
      para (; falso;) si (verdadero) 1; sino 2;
      para (; falso;) mientras (verdadero) 1;
      para (; falso;) para (;;) 1;
      `
    },
    {
      testLabel: 'For: Variable in body',
      testValue: 
      `
      // [line 2] Error at 'var': Expect expression.
      para (;;) variable foo;
      `
    },
    {
      testLabel: 'Function: Body must be block',
      testValue: 
      `
      // [line 2] Error at '123': Expect '{' before function body.
      funcion f() 123;
      `
    },
    {
      testLabel: 'Function: Empty body',
      testValue: 
      `
      funcion f() {}
      imprima f(); // expect: nil
      `
    },
    {
      testLabel: 'Function: Extra arguments',
      testValue: 
      `
      funcion f(a, b) {
        imprima a;
        imprima b;
      }
      
      f(1, 2, 3, 4); // expect runtime error: Expected 2 arguments but got 4.
      `
    },
    {
      testLabel: 'Function: Local mutual recursion',
      testValue: 
      `
      {
        funcion isEven(n) {
          si (n == 0) retorne verdadero;
          retorne isOdd(n - 1); // expect runtime error: Undefined variable 'isOdd'.
        }
      
        funcion isOdd(n) {
          si (n == 0) retorne falso;
          retorne isEven(n - 1);
        }
      
        isEven(4);
      }
      `
    },
    {
      testLabel: 'Function: Local recursion',
      testValue: 
      `
      {
        funcion fib(n) {
          si (n < 2) retorne n;
          retorne fib(n - 1) + fib(n - 2);
        }
      
        imprima fib(8); // expect: 21
      }
      `
    },
    {
      testLabel: 'Function: Missing arguments',
      testValue: 
      `
      funcion f(a, b) {}

      f(1); // expect runtime error: Expected 2 arguments but got 1.
      `
    },
    {
      testLabel: 'Function: Missing comma in parameters',
      testValue: 
      `
      // [line 2] Error at 'c': Expect ')' after parameters.
      funcion foo(a, b c, d, e, f) {}
      `
    },
    {
      testLabel: 'Function: Mutual recursion',
      testValue: 
      `
      funcion isEven(n) {
        si (n == 0) retorne verdadero;
        retorne isOdd(n - 1);
      }
      
      funcion isOdd(n) {
        si (n == 0) retorne falso;
        retorne isEven(n - 1);
      }
      
      imprima isEven(4); // expect: true
      imprima isOdd(3); // expect: true
      `
    },
    {
      testLabel: 'Function: Nested call with arguments',
      testValue: 
      `
      funcion returnArg(arg) {
        retorne arg;
      }
      
      funcion returnFunCallWithArg(func, arg) {
        retorne returnArg(func)(arg);
      }
      
      funcion printArg(arg) {
        imprima arg;
      }
      
      returnFunCallWithArg(printArg, "hola mundo"); // expect: hola mundo
      `
    },
    {
      testLabel: 'Function: Parameters',
      testValue: 
      `
      funcion f0() { retorne 0; }
      imprima f0(); // expect: 0
      
      funcion f1(a) { retorne a; }
      imprima f1(1); // expect: 1
      
      funcion f2(a, b) { retorne a + b; }
      imprima f2(1, 2); // expect: 3
      
      funcion f3(a, b, c) { retorne a + b + c; }
      imprima f3(1, 2, 3); // expect: 6
      
      funcion f4(a, b, c, d) { retorne a + b + c + d; }
      imprima f4(1, 2, 3, 4); // expect: 10
      
      funcion f5(a, b, c, d, e) { retorne a + b + c + d + e; }
      imprima f5(1, 2, 3, 4, 5); // expect: 15
      
      funcion f6(a, b, c, d, e, f) { retorne a + b + c + d + e + f; }
      imprima f6(1, 2, 3, 4, 5, 6); // expect: 21
      
      funcion f7(a, b, c, d, e, f, g) { retorne a + b + c + d + e + f + g; }
      imprima f7(1, 2, 3, 4, 5, 6, 7); // expect: 28
      
      funcion f8(a, b, c, d, e, f, g, h) { retorne a + b + c + d + e + f + g + h; }
      imprima f8(1, 2, 3, 4, 5, 6, 7, 8); // expect: 36
      `
    },
    {
      testLabel: 'Function: Print',
      testValue: 
      `
      funcion foo() {}
      imprima foo; // expect: <fn foo>
      `
    },
    {
      testLabel: 'Function: Recursion',
      testValue: 
      `
      funcion fib(n) {
        si (n < 2) retorne n;
        retorne fib(n - 1) + fib(n - 2);
      }
      
      imprima fib(8); // expect: 21
      `
    },
    {
      testLabel: 'Function: Too many arguments',
      testValue: 
      `
      funcion foo() {}
      {
        var a = 1;
        foo(
           a, // 1
           a, // 2
           a, // 3
           a, // 4
           a, // 5
           a, // 6
           a, // 7
           a, // 8
           a, // 9
           a, // 10
           a, // 11
           a, // 12
           a, // 13
           a, // 14
           a, // 15
           a, // 16
           a, // 17
           a, // 18
           a, // 19
           a, // 20
           a, // 21
           a, // 22
           a, // 23
           a, // 24
           a, // 25
           a, // 26
           a, // 27
           a, // 28
           a, // 29
           a, // 30
           a, // 31
           a, // 32
           a, // 33
           a, // 34
           a, // 35
           a, // 36
           a, // 37
           a, // 38
           a, // 39
           a, // 40
           a, // 41
           a, // 42
           a, // 43
           a, // 44
           a, // 45
           a, // 46
           a, // 47
           a, // 48
           a, // 49
           a, // 50
           a, // 51
           a, // 52
           a, // 53
           a, // 54
           a, // 55
           a, // 56
           a, // 57
           a, // 58
           a, // 59
           a, // 60
           a, // 61
           a, // 62
           a, // 63
           a, // 64
           a, // 65
           a, // 66
           a, // 67
           a, // 68
           a, // 69
           a, // 70
           a, // 71
           a, // 72
           a, // 73
           a, // 74
           a, // 75
           a, // 76
           a, // 77
           a, // 78
           a, // 79
           a, // 80
           a, // 81
           a, // 82
           a, // 83
           a, // 84
           a, // 85
           a, // 86
           a, // 87
           a, // 88
           a, // 89
           a, // 90
           a, // 91
           a, // 92
           a, // 93
           a, // 94
           a, // 95
           a, // 96
           a, // 97
           a, // 98
           a, // 99
           a, // 100
           a, // 101
           a, // 102
           a, // 103
           a, // 104
           a, // 105
           a, // 106
           a, // 107
           a, // 108
           a, // 109
           a, // 110
           a, // 111
           a, // 112
           a, // 113
           a, // 114
           a, // 115
           a, // 116
           a, // 117
           a, // 118
           a, // 119
           a, // 120
           a, // 121
           a, // 122
           a, // 123
           a, // 124
           a, // 125
           a, // 126
           a, // 127
           a, // 128
           a, // 129
           a, // 130
           a, // 131
           a, // 132
           a, // 133
           a, // 134
           a, // 135
           a, // 136
           a, // 137
           a, // 138
           a, // 139
           a, // 140
           a, // 141
           a, // 142
           a, // 143
           a, // 144
           a, // 145
           a, // 146
           a, // 147
           a, // 148
           a, // 149
           a, // 150
           a, // 151
           a, // 152
           a, // 153
           a, // 154
           a, // 155
           a, // 156
           a, // 157
           a, // 158
           a, // 159
           a, // 160
           a, // 161
           a, // 162
           a, // 163
           a, // 164
           a, // 165
           a, // 166
           a, // 167
           a, // 168
           a, // 169
           a, // 170
           a, // 171
           a, // 172
           a, // 173
           a, // 174
           a, // 175
           a, // 176
           a, // 177
           a, // 178
           a, // 179
           a, // 180
           a, // 181
           a, // 182
           a, // 183
           a, // 184
           a, // 185
           a, // 186
           a, // 187
           a, // 188
           a, // 189
           a, // 190
           a, // 191
           a, // 192
           a, // 193
           a, // 194
           a, // 195
           a, // 196
           a, // 197
           a, // 198
           a, // 199
           a, // 200
           a, // 201
           a, // 202
           a, // 203
           a, // 204
           a, // 205
           a, // 206
           a, // 207
           a, // 208
           a, // 209
           a, // 210
           a, // 211
           a, // 212
           a, // 213
           a, // 214
           a, // 215
           a, // 216
           a, // 217
           a, // 218
           a, // 219
           a, // 220
           a, // 221
           a, // 222
           a, // 223
           a, // 224
           a, // 225
           a, // 226
           a, // 227
           a, // 228
           a, // 229
           a, // 230
           a, // 231
           a, // 232
           a, // 233
           a, // 234
           a, // 235
           a, // 236
           a, // 237
           a, // 238
           a, // 239
           a, // 240
           a, // 241
           a, // 242
           a, // 243
           a, // 244
           a, // 245
           a, // 246
           a, // 247
           a, // 248
           a, // 249
           a, // 250
           a, // 251
           a, // 252
           a, // 253
           a, // 254
           a, // 255
           a); // Error at 'a': Can't have more than 255 arguments.
      }
      `
    },
    {
      testLabel: 'Function: Too many parameters',
      testValue: 
      `
      // 256 parameters.
      funcion f(
          a1,
          a2,
          a3,
          a4,
          a5,
          a6,
          a7,
          a8,
          a9,
          a10,
          a11,
          a12,
          a13,
          a14,
          a15,
          a16,
          a17,
          a18,
          a19,
          a20,
          a21,
          a22,
          a23,
          a24,
          a25,
          a26,
          a27,
          a28,
          a29,
          a30,
          a31,
          a32,
          a33,
          a34,
          a35,
          a36,
          a37,
          a38,
          a39,
          a40,
          a41,
          a42,
          a43,
          a44,
          a45,
          a46,
          a47,
          a48,
          a49,
          a50,
          a51,
          a52,
          a53,
          a54,
          a55,
          a56,
          a57,
          a58,
          a59,
          a60,
          a61,
          a62,
          a63,
          a64,
          a65,
          a66,
          a67,
          a68,
          a69,
          a70,
          a71,
          a72,
          a73,
          a74,
          a75,
          a76,
          a77,
          a78,
          a79,
          a80,
          a81,
          a82,
          a83,
          a84,
          a85,
          a86,
          a87,
          a88,
          a89,
          a90,
          a91,
          a92,
          a93,
          a94,
          a95,
          a96,
          a97,
          a98,
          a99,
          a100,
          a101,
          a102,
          a103,
          a104,
          a105,
          a106,
          a107,
          a108,
          a109,
          a110,
          a111,
          a112,
          a113,
          a114,
          a115,
          a116,
          a117,
          a118,
          a119,
          a120,
          a121,
          a122,
          a123,
          a124,
          a125,
          a126,
          a127,
          a128,
          a129,
          a130,
          a131,
          a132,
          a133,
          a134,
          a135,
          a136,
          a137,
          a138,
          a139,
          a140,
          a141,
          a142,
          a143,
          a144,
          a145,
          a146,
          a147,
          a148,
          a149,
          a150,
          a151,
          a152,
          a153,
          a154,
          a155,
          a156,
          a157,
          a158,
          a159,
          a160,
          a161,
          a162,
          a163,
          a164,
          a165,
          a166,
          a167,
          a168,
          a169,
          a170,
          a171,
          a172,
          a173,
          a174,
          a175,
          a176,
          a177,
          a178,
          a179,
          a180,
          a181,
          a182,
          a183,
          a184,
          a185,
          a186,
          a187,
          a188,
          a189,
          a190,
          a191,
          a192,
          a193,
          a194,
          a195,
          a196,
          a197,
          a198,
          a199,
          a200,
          a201,
          a202,
          a203,
          a204,
          a205,
          a206,
          a207,
          a208,
          a209,
          a210,
          a211,
          a212,
          a213,
          a214,
          a215,
          a216,
          a217,
          a218,
          a219,
          a220,
          a221,
          a222,
          a223,
          a224,
          a225,
          a226,
          a227,
          a228,
          a229,
          a230,
          a231,
          a232,
          a233,
          a234,
          a235,
          a236,
          a237,
          a238,
          a239,
          a240,
          a241,
          a242,
          a243,
          a244,
          a245,
          a246,
          a247,
          a248,
          a249,
          a250,
          a251,
          a252,
          a253,
          a254,
          a255, a) {} // Error at 'a': Can't have more than 255 parameters.
      `
    },
    {
      testLabel: 'If: Class in else',
      testValue: 
      `
      // [line 2] Error at 'class': Expect expression.
      si (verdadero) "ok"; sino class Foo {}
      `
    },
    {
      testLabel: 'If: Class in then',
      testValue: 
      `
      // [line 2] Error at 'class': Expect expression.
      si (verdadero) class Foo {}
      `
    },
    {
      testLabel: 'If: Dangling else',
      testValue: 
      `
      // A dangling else binds to the right-most if.
      si (verdadero) si (falso) imprima "bad"; sino imprima "good"; // expect: good
      si (falso) si (verdadero) imprima "bad"; sino imprima "bad";
      `
    },
    {
      testLabel: 'If: Else',
      testValue: 
      `
      // Evaluate the 'else' expression if the condition is false.
      si (verdadero) imprima "good"; sino imprima "bad"; // expect: good
      si (falso) imprima "bad"; sino imprima "good"; // expect: good
      
      // Allow block body.
      si (falso) nulo; sino { imprima "block"; } // expect: block
      `
    },
    {
      testLabel: 'If: Function in else',
      testValue: 
      `
      // [line 2] Error at 'fun': Expect expression.
      si (verdadero) "ok"; sino funcion foo() {}
      `
    },
    {
      testLabel: 'If: Function in then',
      testValue: 
      `
      // [line 2] Error at 'fun': Expect expression.
      si (verdadero) funcion foo() {}
      `
    },
    {
      testLabel: 'If: If',
      testValue: 
      `
      // Evaluate the 'then' expression if the condition is true.
      si (verdadero) imprima "good"; // expect: good
      si (falso) imprima "bad";
      
      // Allow block body.
      si (verdadero) { imprima "block"; } // expect: block
      
      // Assignment in if condition.
      variable a = false;
      si (a = verdadero) imprima a; // expect: true
      `
    },
    {
      testLabel: 'If: Truth',
      testValue: 
      `
      // False and nil are false.
      si (falso) imprima "bad"; sino imprima "false"; // expect: false
      si (nulo) imprima "bad"; sino imprima "nulo"; // expect: nulo
      
      // Everything else is true.
      si (verdadero) imprima verdadero; // expect: true
      si (0) imprima 0; // expect: 0
      si ("") imprima "empty"; // expect: empty
      `
    },
    {
      testLabel: 'If: Variable in else',
      testValue: 
      `
      // [line 2] Error at 'var': Expect expression.
      si (verdadero) "ok"; sino variable foo;
      `
    },
    {
      testLabel: 'If: Variable in then',
      testValue: 
      `
      // [line 2] Error at 'var': Expect expression.
      si (verdadero) variable foo;
      `
    },
    {
      testLabel: 'Inheritance: Constructor',
      testValue: 
      `
      clase A {
        inicio(param) {
          este.field = param;
        }
      
        test() {
          imprima este.field;
        }
      }
      
      clase B < A {}
      
      variable b = B("value");
      b.test(); // expect: value
      `
    },
    {
      testLabel: 'Inheritance: Inherit from function',
      testValue: 
      `
      fun foo() {}

      clase Subclase < foo {} // expect runtime error: Superclass must be a class.
      `
    },
    {
      testLabel: 'Inheritance: Inherit from nil',
      testValue: 
      `
      variable Nulo = nulo;
      clase Foo < Nulo {} // expect runtime error: Superclass must be a class.
      `
    },
    {
      testLabel: 'Inheritance: Inherit from number',
      testValue: 
      `
      variable Number = 123;
      clase Foo < Number {} // expect runtime error: Superclass must be a class.
      `
    },
    {
      testLabel: 'Inheritance: Inherit methods',
      testValue: 
      `
      clase Foo {
        methodOnFoo() { imprima "foo"; }
        sobreescriba() { imprima "foo"; }
      }
      
      clase Bar < Foo {
        methodOnBar() { imprima "bar"; }
        sobreescriba() { imprima "bar"; }
      }
      
      variable bar = Bar();
      bar.methodOnFoo(); // expect: foo
      bar.methodOnBar(); // expect: bar
      bar.sobreescriba(); // expect: bar
      `
    },
    {
      testLabel: 'Inheritance: Parenthesized superclass',
      testValue: 
      `
      clase Foo {}

      // [line 4] Error at '(': Expect superclass name.
      clase Bar < (Foo) {}
      `
    },
    {
      testLabel: 'Inheritance: Set fields from base class',
      testValue: 
      `
      clase Foo {
        foo(a, b) {
          este.field1 = a;
          este.field2 = b;
        }
      
        fooImprima() {
          imprima este.field1;
          imprima este.field2;
        }
      }
      
      clase Bar < Foo {
        bar(a, b) {
          este.field1 = a;
          este.field2 = b;
        }
      
        barImprima() {
          imprima este.field1;
          imprima este.field2;
        }
      }
      
      variable bar = Bar();
      bar.foo("foo 1", "foo 2");
      bar.fooImprima();
      // expect: foo 1
      // expect: foo 2
      
      bar.bar("bar 1", "bar 2");
      bar.barImprima();
      // expect: bar 1
      // expect: bar 2
      
      bar.fooImprima();
      // expect: bar 1
      // expect: bar 2
      `
    },
    {
      testLabel: 'Logical Operator: And',
      testValue: 
      `
      // Note: These tests implicitly depend on ints being truthy.

      // Return the first non-true argument.
      imprima falso y 1; // expect: false
      imprima verdadero y 1; // expect: 1
      imprima 1 y 2 y falso; // expect: false
      
      // Return the last argument if all are true.
      imprima 1 y verdadero; // expect: true
      imprima 1 y 2 y 3; // expect: 3
      
      // Short-circuit at the first false argument.
      variable a = "before";
      variable b = "before";
      (a = verdadero) and
          (b = falso) and
          (a = "bad");
      imprima a; // expect: true
      imprima b; // expect: false
      `
    },
    {
      testLabel: 'Logical Operator: And truth',
      testValue: 
      `
      // False and nil are false.
      imprima falso y "bad"; // expect: false
      imprima nulo y "bad"; // expect: nil
      
      // Everything else is true.
      imprima verdadero y "ok"; // expect: ok
      imprima 0 y "ok"; // expect: ok
      imprima "" y "ok"; // expect: ok
      `
    },
    {
      testLabel: 'Logical Operator: Or',
      testValue: 
      `
      // Note: These tests implicitly depend on ints being truthy.

      // Return the first true argument.
      imprima 1 o verdadero; // expect: 1
      imprima falso o 1; // expect: 1
      imprima falso o falso o verdadero; // expect: true
      
      // Return the last argument if all are false.
      imprima falso o falso; // expect: false
      imprima falso o falso o falso; // expect: false
      
      // Short-circuit at the first true argument.
      variable a = "before";
      variable b = "before";
      (a = falso) or
          (b = verdadero) or
          (a = "bad");
      imprima a; // expect: false
      imprima b; // expect: true
      `
    },
    {
      testLabel: 'Logical Operator: Or truth',
      testValue: 
      `
      // False and nil are false.
      imprima falso o "ok"; // expect: ok
      imprima nulo o "ok"; // expect: ok
      
      // Everything else is true.
      imprima verdadero o "ok"; // expect: true
      imprima 0 o "ok"; // expect: 0
      imprima "s" o "ok"; // expect: s
      `
    },
    {
      testLabel: 'Method: Arity',
      testValue: 
      `
      clase Foo {
        metodo0() { retorne "no args"; }
        metodo1(a) { retorne a; }
        metodo2(a, b) { retorne a + b; }
        metodo3(a, b, c) { retorne a + b + c; }
        metodo4(a, b, c, d) { retorne a + b + c + d; }
        metodo5(a, b, c, d, e) { retorne a + b + c + d + e; }
        metodo6(a, b, c, d, e, f) { retorne a + b + c + d + e + f; }
        metodo7(a, b, c, d, e, f, g) { retorne a + b + c + d + e + f + g; }
        metodo8(a, b, c, d, e, f, g, h) { retorne a + b + c + d + e + f + g + h; }
      }
      
      variable foo = Foo();
      imprima foo.metodo0(); // expect: no args
      imprima foo.metodo1(1); // expect: 1
      imprima foo.metodo2(1, 2); // expect: 3
      imprima foo.metodo3(1, 2, 3); // expect: 6
      imprima foo.metodo4(1, 2, 3, 4); // expect: 10
      imprima foo.metodo5(1, 2, 3, 4, 5); // expect: 15
      imprima foo.metodo6(1, 2, 3, 4, 5, 6); // expect: 21
      imprima foo.metodo7(1, 2, 3, 4, 5, 6, 7); // expect: 28
      imprima foo.metodo8(1, 2, 3, 4, 5, 6, 7, 8); // expect: 36
      `
    },
    {
      testLabel: 'Method: Empty block',
      testValue: 
      `
      clase Foo {
        bar() {}
      }
      
      imprima Foo().bar(); // expect: nil
      `
    },
    {
      testLabel: 'Method: Extra argument',
      testValue: 
      `
      clase Foo {
        metodo(a, b) {
          imprima a;
          imprima b;
        }
      }
      
      Foo().metodo(1, 2, 3, 4); // expect runtime error: Expected 2 arguments but got 4.
      `
    },
    {
      testLabel: 'Method: Missing argument',
      testValue: 
      `
      clase Foo {
        metodo(a, b) {}
      }
      
      Foo().metodo(1); // expect runtime error: Expected 2 arguments but got 1.
      `
    },
    {
      testLabel: 'Method: Not found',
      testValue: 
      `
      clase Foo {}

      Foo().unknown(); // expect runtime error: Undefined property 'unknown'.
      `
    },
    {
      testLabel: 'Method: Print bound method',
      testValue: 
      `
      clase Foo {
        metodo() { }
      }
      variable foo = Foo();
      imprima foo.metodo; // expect: <fn method>
      `
    },
    {
      testLabel: 'Method: Refer to name',
      testValue: 
      `
      clase Foo {
        metodo() {
          imprima metodo; // expect runtime error: Undefined variable 'metodo'.
        }
      }
      
      Foo().metodo();
      `
    },
    {
      testLabel: 'Method: Too many arguments',
      testValue: 
      `
      {
        variable a = 1;
        true.metodo(
           a, // 1
           a, // 2
           a, // 3
           a, // 4
           a, // 5
           a, // 6
           a, // 7
           a, // 8
           a, // 9
           a, // 10
           a, // 11
           a, // 12
           a, // 13
           a, // 14
           a, // 15
           a, // 16
           a, // 17
           a, // 18
           a, // 19
           a, // 20
           a, // 21
           a, // 22
           a, // 23
           a, // 24
           a, // 25
           a, // 26
           a, // 27
           a, // 28
           a, // 29
           a, // 30
           a, // 31
           a, // 32
           a, // 33
           a, // 34
           a, // 35
           a, // 36
           a, // 37
           a, // 38
           a, // 39
           a, // 40
           a, // 41
           a, // 42
           a, // 43
           a, // 44
           a, // 45
           a, // 46
           a, // 47
           a, // 48
           a, // 49
           a, // 50
           a, // 51
           a, // 52
           a, // 53
           a, // 54
           a, // 55
           a, // 56
           a, // 57
           a, // 58
           a, // 59
           a, // 60
           a, // 61
           a, // 62
           a, // 63
           a, // 64
           a, // 65
           a, // 66
           a, // 67
           a, // 68
           a, // 69
           a, // 70
           a, // 71
           a, // 72
           a, // 73
           a, // 74
           a, // 75
           a, // 76
           a, // 77
           a, // 78
           a, // 79
           a, // 80
           a, // 81
           a, // 82
           a, // 83
           a, // 84
           a, // 85
           a, // 86
           a, // 87
           a, // 88
           a, // 89
           a, // 90
           a, // 91
           a, // 92
           a, // 93
           a, // 94
           a, // 95
           a, // 96
           a, // 97
           a, // 98
           a, // 99
           a, // 100
           a, // 101
           a, // 102
           a, // 103
           a, // 104
           a, // 105
           a, // 106
           a, // 107
           a, // 108
           a, // 109
           a, // 110
           a, // 111
           a, // 112
           a, // 113
           a, // 114
           a, // 115
           a, // 116
           a, // 117
           a, // 118
           a, // 119
           a, // 120
           a, // 121
           a, // 122
           a, // 123
           a, // 124
           a, // 125
           a, // 126
           a, // 127
           a, // 128
           a, // 129
           a, // 130
           a, // 131
           a, // 132
           a, // 133
           a, // 134
           a, // 135
           a, // 136
           a, // 137
           a, // 138
           a, // 139
           a, // 140
           a, // 141
           a, // 142
           a, // 143
           a, // 144
           a, // 145
           a, // 146
           a, // 147
           a, // 148
           a, // 149
           a, // 150
           a, // 151
           a, // 152
           a, // 153
           a, // 154
           a, // 155
           a, // 156
           a, // 157
           a, // 158
           a, // 159
           a, // 160
           a, // 161
           a, // 162
           a, // 163
           a, // 164
           a, // 165
           a, // 166
           a, // 167
           a, // 168
           a, // 169
           a, // 170
           a, // 171
           a, // 172
           a, // 173
           a, // 174
           a, // 175
           a, // 176
           a, // 177
           a, // 178
           a, // 179
           a, // 180
           a, // 181
           a, // 182
           a, // 183
           a, // 184
           a, // 185
           a, // 186
           a, // 187
           a, // 188
           a, // 189
           a, // 190
           a, // 191
           a, // 192
           a, // 193
           a, // 194
           a, // 195
           a, // 196
           a, // 197
           a, // 198
           a, // 199
           a, // 200
           a, // 201
           a, // 202
           a, // 203
           a, // 204
           a, // 205
           a, // 206
           a, // 207
           a, // 208
           a, // 209
           a, // 210
           a, // 211
           a, // 212
           a, // 213
           a, // 214
           a, // 215
           a, // 216
           a, // 217
           a, // 218
           a, // 219
           a, // 220
           a, // 221
           a, // 222
           a, // 223
           a, // 224
           a, // 225
           a, // 226
           a, // 227
           a, // 228
           a, // 229
           a, // 230
           a, // 231
           a, // 232
           a, // 233
           a, // 234
           a, // 235
           a, // 236
           a, // 237
           a, // 238
           a, // 239
           a, // 240
           a, // 241
           a, // 242
           a, // 243
           a, // 244
           a, // 245
           a, // 246
           a, // 247
           a, // 248
           a, // 249
           a, // 250
           a, // 251
           a, // 252
           a, // 253
           a, // 254
           a, // 255
           a); // Error at 'a': Can't have more than 255 arguments.
      }
      `
    },
    {
      testLabel: 'Method: Too many parameters',
      testValue: 
      `
      clase Foo {
        // 256 parameters.
        metodo(
          a1,
          a2,
          a3,
          a4,
          a5,
          a6,
          a7,
          a8,
          a9,
          a10,
          a11,
          a12,
          a13,
          a14,
          a15,
          a16,
          a17,
          a18,
          a19,
          a20,
          a21,
          a22,
          a23,
          a24,
          a25,
          a26,
          a27,
          a28,
          a29,
          a30,
          a31,
          a32,
          a33,
          a34,
          a35,
          a36,
          a37,
          a38,
          a39,
          a40,
          a41,
          a42,
          a43,
          a44,
          a45,
          a46,
          a47,
          a48,
          a49,
          a50,
          a51,
          a52,
          a53,
          a54,
          a55,
          a56,
          a57,
          a58,
          a59,
          a60,
          a61,
          a62,
          a63,
          a64,
          a65,
          a66,
          a67,
          a68,
          a69,
          a70,
          a71,
          a72,
          a73,
          a74,
          a75,
          a76,
          a77,
          a78,
          a79,
          a80,
          a81,
          a82,
          a83,
          a84,
          a85,
          a86,
          a87,
          a88,
          a89,
          a90,
          a91,
          a92,
          a93,
          a94,
          a95,
          a96,
          a97,
          a98,
          a99,
          a100,
          a101,
          a102,
          a103,
          a104,
          a105,
          a106,
          a107,
          a108,
          a109,
          a110,
          a111,
          a112,
          a113,
          a114,
          a115,
          a116,
          a117,
          a118,
          a119,
          a120,
          a121,
          a122,
          a123,
          a124,
          a125,
          a126,
          a127,
          a128,
          a129,
          a130,
          a131,
          a132,
          a133,
          a134,
          a135,
          a136,
          a137,
          a138,
          a139,
          a140,
          a141,
          a142,
          a143,
          a144,
          a145,
          a146,
          a147,
          a148,
          a149,
          a150,
          a151,
          a152,
          a153,
          a154,
          a155,
          a156,
          a157,
          a158,
          a159,
          a160,
          a161,
          a162,
          a163,
          a164,
          a165,
          a166,
          a167,
          a168,
          a169,
          a170,
          a171,
          a172,
          a173,
          a174,
          a175,
          a176,
          a177,
          a178,
          a179,
          a180,
          a181,
          a182,
          a183,
          a184,
          a185,
          a186,
          a187,
          a188,
          a189,
          a190,
          a191,
          a192,
          a193,
          a194,
          a195,
          a196,
          a197,
          a198,
          a199,
          a200,
          a201,
          a202,
          a203,
          a204,
          a205,
          a206,
          a207,
          a208,
          a209,
          a210,
          a211,
          a212,
          a213,
          a214,
          a215,
          a216,
          a217,
          a218,
          a219,
          a220,
          a221,
          a222,
          a223,
          a224,
          a225,
          a226,
          a227,
          a228,
          a229,
          a230,
          a231,
          a232,
          a233,
          a234,
          a235,
          a236,
          a237,
          a238,
          a239,
          a240,
          a241,
          a242,
          a243,
          a244,
          a245,
          a246,
          a247,
          a248,
          a249,
          a250,
          a251,
          a252,
          a253,
          a254,
          a255, a) {} // Error at 'a': Can't have more than 255 parameters.
      }
      `
    },
    {
      testLabel: 'Misc: Precedence',
      testValue: 
      `
      // * has higher precedence than +.
      imprima 2 + 3 * 4; // expect: 14
      
      // * has higher precedence than -.
      imprima 20 - 3 * 4; // expect: 8
      
      // / has higher precedence than +.
      imprima 2 + 6 / 3; // expect: 4
      
      // / has higher precedence than -.
      imprima 2 - 6 / 3; // expect: 0
      
      // < has higher precedence than ==.
      imprima falso == 2 < 1; // expect: true
      
      // > has higher precedence than ==.
      imprima falso == 1 > 2; // expect: true
      
      // <= has higher precedence than ==.
      imprima falso == 2 <= 1; // expect: true
      
      // >= has higher precedence than ==.
      imprima falso == 1 >= 2; // expect: true
      
      // 1 - 1 is not space-sensitive.
      imprima 1 - 1; // expect: 0
      imprima 1 -1;  // expect: 0
      imprima 1- 1;  // expect: 0
      imprima 1-1;   // expect: 0
      
      // Using () for grouping.
      imprima (2 * (6 - (2 + 2))); // expect: 4
      `
    },
    {
      testLabel: 'Misc: Unexpected character',
      testValue: 
      `
      // [line 3] Error: Unexpected character: |
      // [line 3] Error at 'b': Expect ')' after arguments.
      foo(a | b);
      `
    },
    {
      testLabel: 'Nil Litral',
      testValue: 
      `
      imprima nulo; // expect: nil
      `
    },
    {
      testLabel: 'Numbers: Decimal point at EOF',
      testValue: 
      `
      // [line 2] Error at end: Expect property name after '.'.
      123.
      `
    },
    {
      testLabel: 'Numbers: Leading dot',
      testValue: 
      `
      // [line 2] Error at '.': Expect expression.
      .123;
      `
    },
    {
      testLabel: 'Numbers: Litrals',
      testValue: 
      `
      imprima 123;     // expect: 123
      imprima 987654;  // expect: 987654
      imprima 0;       // expect: 0
      imprima -0;      // expect: 0
      
      imprima 123.456; // expect: 123.456
      imprima -0.001;  // expect: -0.001
      `
    },
    {
      testLabel: 'Numbers: Trailing dot',
      testValue: 
      `
      // [line 2] Error at ';': Expect property name after '.'.
      123.;
      `
    },
    {
      testLabel: 'Operator: Add',
      testValue: 
      `
      imprima 123 + 456; // expect: 579
      imprima "str" + "ing"; // expect: string
      `
    },
    {
      testLabel: 'Operator: Add bool',
      testValue: 
      `
      verdadero + nil; // expect runtime error: Operands must be two numbers or two strings.
      `
    },
    {
      testLabel: 'Operator: Add bool num',
      testValue: 
      `
      verdadero + 123; // expect runtime error: Operands must be two numbers or two strings.
      `
    },
    {
      testLabel: 'Operator: Add bool string',
      testValue: 
      `
      verdadero + "s"; // expect runtime error: Operands must be two numbers or two strings.
      `
    },
    {
      testLabel: 'Operator: Add nil nil',
      testValue: 
      `
      nil + nil; // expect runtime error: Operands must be two numbers or two strings.
      `
    },
    {
      testLabel: 'Operator: Add num nil',
      testValue: 
      `
      1 + nil; // expect runtime error: Operands must be two numbers or two strings.
      `
    },
    {
      testLabel: 'Operator: Add string nil',
      testValue: 
      `
      "s" + nil; // expect runtime error: Operands must be two numbers or two strings.
      `
    },
    {
      testLabel: 'Operator: Comparision',
      testValue: 
      `
      imprima 1 < 2;    // expect: true
      imprima 2 < 2;    // expect: false
      imprima 2 < 1;    // expect: false
      
      imprima 1 <= 2;    // expect: true
      imprima 2 <= 2;    // expect: true
      imprima 2 <= 1;    // expect: false
      
      imprima 1 > 2;    // expect: false
      imprima 2 > 2;    // expect: false
      imprima 2 > 1;    // expect: true
      
      imprima 1 >= 2;    // expect: false
      imprima 2 >= 2;    // expect: true
      imprima 2 >= 1;    // expect: true
      
      // Zero and negative zero compare the same.
      imprima 0 < -0; // expect: false
      imprima -0 < 0; // expect: false
      imprima 0 > -0; // expect: false
      imprima -0 > 0; // expect: false
      imprima 0 <= -0; // expect: true
      imprima -0 <= 0; // expect: true
      imprima 0 >= -0; // expect: true
      imprima -0 >= 0; // expect: true
      `
    },
    {
      testLabel: 'Operator: Divide',
      testValue: 
      `
      imprima 8 / 2;         // expect: 4
      imprima 12.34 / 12.34;  // expect: 1
      `
    },
    {
      testLabel: 'Operator: Divide non-num num',
      testValue: 
      `
      "1" / 1; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Operator: Divide num non-num',
      testValue: 
      `
      1 / "1"; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Operator: Equals',
      testValue: 
      `
      imprima nil == nil; // expect: true
  
      imprima verdadero == verdadero; // expect: true
      imprima verdadero == falso; // expect: false
      
      imprima 1 == 1; // expect: true
      imprima 1 == 2; // expect: false
      
      imprima "str" == "str"; // expect: true
      imprima "str" == "ing"; // expect: false
      
      imprima nil == falso; // expect: false
      imprima falso == 0; // expect: false
      imprima 0 == "0"; // expect: false
      `
    },
    {
      testLabel: 'Operator: Equals class',
      testValue: 
      `
      // Bound methods have identity equality.
      clase Foo {}
      clase Bar {}
      
      imprima Foo == Foo; // expect: true
      imprima Foo == Bar; // expect: false
      imprima Bar == Foo; // expect: false
      imprima Bar == Bar; // expect: true
      
      imprima Foo == "Foo"; // expect: false
      imprima Foo == nil;   // expect: false
      imprima Foo == 123;   // expect: false
      imprima Foo == verdadero;  // expect: false
      `
    },
    {
      testLabel: 'Operator: Equals method',
      testValue: 
      `
      // Bound methods have identity equality.
      clase Foo {
        metodo() {}
      }
      
      variable foo = Foo();
      variable fooMethod = foo.metodo;
      
      // Same bound method.
      imprima fooMethod == fooMethod; // expect: true
      
      // Different closurizations.
      imprima foo.metodo == foo.metodo; // expect: false
      `
    },
    {
      testLabel: 'Operator: Greater non-num num',
      testValue: 
      `
      "1" > 1; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Operator: Greater num non-num',
      testValue: 
      `
      1 > "1"; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Operator: Greater or equal non-num num',
      testValue: 
      `
      "1" >= 1; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Operator: Greater or equal num non-num',
      testValue: 
      `
      1 >= "1"; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Operator: Less non-num num',
      testValue: 
      `
      "1" < 1; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Operator: Less num non-num',
      testValue: 
      `
      1 < "1"; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Operator: Less or equal non-num num',
      testValue: 
      `
      "1" <= 1; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Operator: Less or equal num non-num',
      testValue: 
      `
      1 <= "1"; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Operator: Multiply',
      testValue: 
      `
      imprima 5 * 3; // expect: 15
      imprima 12.34 * 0.3; // expect: 3.702
      `
    },
    {
      testLabel: 'Operator: Multiply non-num num',
      testValue: 
      `
      "1" * 1; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Operator: Multiply num non-num',
      testValue: 
      `
      1 * "1"; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Operator: Negate',
      testValue: 
      `
      imprima -(3); // expect: -3
      imprima --(3); // expect: 3
      imprima ---(3); // expect: -3
      `
    },
    {
      testLabel: 'Operator: Negate non-num',
      testValue: 
      `
      -"s"; // expect runtime error: Operand must be a number.
      `
    },
    {
      testLabel: 'Operator: Not',
      testValue: 
      `
      imprima !verdadero;     // expect: false
      imprima !falso;    // expect: true
      imprima !!verdadero;    // expect: true
      
      imprima !123;      // expect: false
      imprima !0;        // expect: false
      
      imprima !nulo;     // expect: true
      
      imprima !"";       // expect: false
      
      fun foo() {}
      imprima !foo;      // expect: false
      `
    },
    {
      testLabel: 'Operator: Not class',
      testValue: 
      `
      clase Bar {}
      imprima !Bar;      // expect: false
      imprima !Bar();    // expect: false
      `
    },
    {
      testLabel: 'Operator: Not equals',
      testValue: 
      `
      imprima nulo != nulo; // expect: false
  
      imprima verdadero != verdadero; // expect: false
      imprima verdadero != falso; // expect: true
      
      imprima 1 != 1; // expect: false
      imprima 1 != 2; // expect: true
      
      imprima "str" != "str"; // expect: false
      imprima "str" != "ing"; // expect: true
      
      imprima nulo != falso; // expect: true
      imprima falso != 0; // expect: true
      imprima 0 != "0"; // expect: true
      `
    },
    {
      testLabel: 'Operator: Subtract',
      testValue: 
      `
      imprima 4 - 3; // expect: 1
      imprima 1.2 - 1.2; // expect: 0
      `
    },
    {
      testLabel: 'Operator: Subtract non-num num',
      testValue: 
      `
      "1" - 1; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Operator: Subtract num non-num',
      testValue: 
      `
      1 - "1"; // expect runtime error: Operands must be numbers.
      `
    },
    {
      testLabel: 'Print: Missing argument',
      testValue: 
      `
      // [line 2] Error at ';': Expect expression.
      imprima;
      `
    },
    {
      testLabel: 'Regression: 394',
      testValue: 
      `
      {
        clase A {}
        clase B < A {}
        imprima B; // expect: B
      }
      `
    },
    {
      testLabel: 'Regression: 40',
      testValue: 
      `
      funcion caller(g) {
        g();
        // g should be a function, not nil.
        imprima g == nulo; // expect: false
      }
      
      funcion callCaller() {
        variable capturedVar = "antes";
        variable a = "a";
      
        funcion f() {
          // Commenting the next line out prevents the bug!
          capturedVar = "despues";
      
          // Returning anything also fixes it, even nil:
          //return nil;
        }
      
        caller(f);
      }
      
      callCaller();
      `
    },
    {
      testLabel: 'Return: After else',
      testValue: 
      `
      funcion f() {
        si (falso) "no"; else retorne "ok";
      }
      
      imprima f(); // expect: ok
      `
    },
    {
      testLabel: 'Return: After if',
      testValue: 
      `
      funcion f() {
        si (true) retorne "ok";
      }
      
      imprima f(); // expect: ok
      `
    },
    {
      testLabel: 'Return: After while',
      testValue: 
      `
      funcion f() {
        mientras (true) retorne "ok";
      }
      
      imprima f(); // expect: ok
      `
    },
    {
      testLabel: 'Return: At top level',
      testValue: 
      `
      retorne "wat"; // Error at 'return': Can't return from top-level code.
      `
    },
    {
      testLabel: 'Return: In function',
      testValue: 
      `
      funcion f() {
        retorne "ok";
        imprima "bad";
      }
      
      imprima f(); // expect: ok
      `
    },
    {
      testLabel: 'Return: In method',
      testValue: 
      `
      clase Foo {
        method() {
          retorne "ok";
          imprima "bad";
        }
      }
      
      imprima Foo().method(); // expect: ok
      `
    },
    {
      testLabel: 'Return: Return nil if no value',
      testValue: 
      `
      funcion f() {
          retorne;
        imprima "bad";
      }
      
      imprima f(); // expect: nil
      `
    },
    {
      testLabel: 'String: Error after multiline',
      testValue: 
      `
      // Tests that we correctly track the line info across multiline strings.
      variable a = "1
      2
      3
      ";
      
      err; // // expect runtime error: Undefined variable 'err'.
      `
    },
    {
      testLabel: 'String: Litrals',
      testValue: 
      `
      imprima "(" + "" + ")";   // expect: ()
      imprima "a string"; // expect: a string
      
      // Non-ASCII.
      imprima "A~¶Þॐஃ"; // expect: A~¶Þॐஃ
      `
    },
    {
      testLabel: 'String: Multiline',
      testValue: 
      `
      variable a = "1
      2
      3";
      imprima a;
      // expect: 1
      // expect: 2
      // expect: 3
      `
    },
    {
      testLabel: 'String: Unterminated',
      testValue: 
      `
      // [line 2] Error: Unterminated string.
      "this string has no close quote
      `
    },
    {
      testLabel: 'super: Bound metodo',
      testValue: 
      `
      clase A {
        metodo(arg) {
          imprima "A.metodo(" + arg + ")";
        }
      }
      
      clase B < A {
        getClosure() {
          retorne super.metodo;
        }
      
        metodo(arg) {
          imprima "B.metodo(" + arg + ")";
        }
      }
      
      
      variable closure = B().getClosure();
      closure("arg"); // expect: A.method(arg)
      `
    },
    {
      testLabel: 'super: Call other method',
      testValue: 
      `
      clase Base {
        foo() {
          imprima "Base.foo()";
        }
      }
      
      clase Derived < Base {
        bar() {
          imprima "Derived.bar()";
          super.foo();
        }
      }
      
      Derived().bar();
      // expect: Derived.bar()
      // expect: Base.foo()
      `
    },
    {
      testLabel: 'super: Call same method',
      testValue: 
      `
      clase Base {
        foo() {
          imprima "Base.foo()";
        }
      }
      
      clase Derived < Base {
        foo() {
          imprima "Derived.foo()";
          super.foo();
        }
      }
      
      Derived().foo();
      // expect: Derived.foo()
      // expect: Base.foo()
      `
    },
    {
      testLabel: 'super: Constructor',
      testValue: 
      `
      clase Base {
        inicio(a, b) {
          imprima "Base.inicio(" + a + ", " + b + ")";
        }
      }
      
      clase Derived < Base {
        inicio() {
          imprima "Derived.inicio()";
          super.inicio("a", "b");
        }
      }
      
      Derived();
      // expect: Derived.init()
      // expect: Base.init(a, b)
      `
    },
    {
      testLabel: 'super: Extra arguments',
      testValue: 
      `
      clase Base {
        foo(a, b) {
          imprima "Base.foo(" + a + ", " + b + ")";
        }
      }
      
      clase Derived < Base {
        foo() {
          super.foo("a", "b", "c", "d"); // expect runtime error: Expected 2 arguments but got 4.
        }
      }
      
      Derived().foo();
      `
    },
    {
      testLabel: 'super: Indirectly inherited',
      testValue: 
      `
      clase A {
        foo() {
          imprima "A.foo()";
        }
      }
      
      clase B < A {}
      
      clase C < B {
        foo() {
          imprima "C.foo()";
          super.foo();
        }
      }
      
      C().foo();
      // expect: C.foo()
      // expect: A.foo()
      `
    },
    {
      testLabel: 'super: Missing arguments',
      testValue: 
      `
      clase Base {
        foo(a, b) {
          imprima "Base.foo(" + a + ", " + b + ")";
        }
      }
      
      clase Derived < Base {
        foo() {
          super.foo(1); // expect runtime error: Expected 2 arguments but got 1.
        }
      }
      
      Derived().foo();
      `
    },
    {
      testLabel: 'super: No superclass bind',
      testValue: 
      `
      clase Base {
        foo() {
          super.doesNotExist; // Error at 'super': Can't use 'super' in a class with no superclass.
        }
      }
      
      Base().foo();
      `
    },
    {
      testLabel: 'super: No superclass call',
      testValue: 
      `
      clase Base {
        foo() {
          super.doesNotExist(1); // Error at 'super': Can't use 'super' in a class with no superclass.
        }
      }
      
      Base().foo();
      `
    },
    {
      testLabel: 'super: Parenthesized',
      testValue: 
      `
      clase Base {}
  
      clase Derived < Base {
        foo() {
          super.doesNotExist(1); // expect runtime error: Undefined property 'doesNotExist'.
        }
      }
      
      Derived().foo();
      `
    },
    {
      testLabel: 'super: Reassign superclass',
      testValue: 
      `
      clase Base {
        metodo() {
          imprima "Base.metodo()";
        }
      }
      
      clase Derived < Base {
        metodo() {
          super.metodo();
        }
      }
      
      clase OtherBase {
        metodo() {
          imprima "OtherBase.metodo()";
        }
      }
      
      variable derived = Derived();
      derived.metodo(); // expect: Base.method()
      Base = OtherBase;
      derived.metodo(); // expect: Base.method()
      `
    },
    {
      testLabel: 'super: Super at top level',
      testValue: 
      `
      super.foo("bar"); // Error at 'super': Can't use 'super' outside of a class.
      super.foo; // Error at 'super': Can't use 'super' outside of a class.
      `
    },
    {
      testLabel: 'super: Super in inherited method',
      testValue: 
      `
      clase A {
        say() {
          imprima "A";
        }
      }
      
      clase B < A {
        test() {
          super.say();
        }
      
        say() {
          imprima "B";
        }
      }
      
      clase C < B {
        say() {
          imprima "C";
        }
      }
      
      C().test(); // expect: A
      `
    },
    {
      testLabel: 'super: Super in top level function',
      testValue: 
      `
      super.bar(); // Error at 'super': Can't use 'super' outside of a class.
      funcion foo() {
      }
      `
    },
    {
      testLabel: 'super: Super without dot',
      testValue: 
      `
      clase A {}
  
      clase B < A {
        metodo() {
          // [line 6] Error at ';': Expect '.' after 'super'.
          super;
        }
      }
      `
    },
    {
      testLabel: 'super: Super without name',
      testValue: 
      `
      clase A {}
  
      clase B < A {
        metodo() {
          super.; // Error at ';': Expect superclass method name.
        }
      }
      `
    },
    {
      testLabel: 'super: This is superclass method',
      testValue: 
      `
      clase Base {
        inicio(a) {
          este.a = a;
        }
      }
      
      clase Derived < Base {
        inicio(a, b) {
          super.inicio(a);
          este.b = b;
        }
      }
      
      variable derived = Derived("a", "b");
      imprima derived.a; // expect: a
      imprima derived.b; // expect: b
      `
    },
    {
      testLabel: 'This: Closure',
      testValue: 
      `
      clase Foo {
        getClosure() {
          funcion closure() {
            retorne este.toString();
          }
          retorne closure;
        }
      
        toString() { retorne "Foo"; }
      }
      
      variable closure = Foo().getClosure();
      imprima closure(); // expect: Foo
      `
    },
    {
      testLabel: 'This: Nested',
      testValue: 
      `
      clase Outer {
        metodo() {
          imprima este; // expect: Outer instance
      
          funcion f() {
            imprima este; // expect: Outer instance
      
            clase Inner {
              metodo() {
                imprima este; // expect: Inner instance
              }
            }
      
            Inner().metodo();
          }
          f();
        }
      }
      
      Outer().metodo();
      `
    },
    {
      testLabel: 'This: Nested Closure',
      testValue: 
      `
      clase Foo {
        getClosure() {
          funcion f() {
            funcion g() {
              funcion h() {
                retorne este.toString();
              }
              retorne h;
            }
            retorne g;
          }
          retorne f;
        }
      
        toString() { retorne "Foo"; }
      }
      variable closure = Foo().getClosure();
      imprima closure()()(); // expect: Foo
      `
    },
    {
      testLabel: 'This: This at top level',
      testValue: 
      `
      este; // Error at 'this': Can't use 'this' outside of a class.
      `
    },
    {
      testLabel: 'This: This in method',
      testValue: 
      `
      clase Foo {
        bar() { retorne este; }
        baz() { retorne "baz"; }
      }
      
      imprima Foo().bar().baz(); // expect: baz
      `
    },
    {
      testLabel: 'This: This in top level function',
      testValue: 
      `
      funcion foo() {
        este; // Error at 'this': Can't use 'this' outside of a class.
      }
      `
    },
    {
      testLabel: 'Variable: Collide with parameter',
      testValue: 
      `
      funcion foo(a) {
        variable a; // Error at 'a': Already variable with this name in this scope.
      }
      `
    },
    {
      testLabel: 'Variable: Duplicate local',
      testValue: 
      `
      {
        variable a = "value";
        variable a = "other"; // Error at 'a': Already variable with this name in this scope.
      }
      `
    },
    {
      testLabel: 'Variable: Duplicate parameter',
      testValue: 
      `
      funcion foo(arg,
        arg) { // Error at 'arg': Already variable with this name in this scope.
                "body";
              }
      `
    },
    {
      testLabel: 'Variable: Early bound',
      testValue: 
      `
      variable a = "outer";
      {
        funcion foo() {
          imprima a;
        }
      
        foo(); // expect: outer
        variable a = "inner";
        foo(); // expect: outer
      }
      `
    },
    {
      testLabel: 'Variable: In middle of block',
      testValue: 
      `
      {
        variable a = "a";
        imprima a; // expect: a
        variable b = a + " b";
        imprima b; // expect: a b
        variable c = a + " c";
        imprima c; // expect: a c
        variable d = b + " d";
        imprima d; // expect: a b d
      }
      `
    },
    {
      testLabel: 'Variable: In nested block',
      testValue: 
      `
      {
        variable a = "outer";
        {
          imprima a; // expect: outer
        }
      }
      `
    },
    {
      testLabel: 'Variable: Local from method',
      testValue: 
      `
      variable foo = "variable";
  
      class Foo {
        method() {
          imprima foo;
        }
      }
      
      Foo().method(); // expect: variable
      `
    },
    {
      testLabel: 'Variable: Redeclare global',
      testValue: 
      `
      variable a = "1";
      variable a;
      imprima a; // expect: nil
      `
    },
    {
      testLabel: 'Variable: Redefine global',
      testValue: 
      `
      variable a = "1";
      variable a = "2";
      imprima a; // expect: 2
      `
    },
    {
      testLabel: 'Variable: Scope reuse in dsiferent blocks',
      testValue: 
      `
      {
        variable a = "first";
        imprima a; // expect: first
      }
      
      {
        variable a = "second";
        imprima a; // expect: second
      }
      `
    },
    {
      testLabel: 'Variable: Shadow and local',
      testValue: 
      `
      {
        variable a = "outer";
        {
          imprima a; // expect: outer
          variable a = "inner";
          imprima a; // expect: inner
        }
      }
      `
    },
    {
      testLabel: 'Variable: Shadow global',
      testValue: 
      `
      variable a = "global";
      {
        variable a = "shadow";
        imprima a; // expect: shadow
      }
      imprima a; // expect: global
      `
    },
    {
      testLabel: 'Variable: Shadow local',
      testValue: 
      `
      {
        variable a = "local";
        {
          variable a = "shadow";
          imprima a; // expect: shadow
        }
        imprima a; // expect: local
      }
      `
    },
    {
      testLabel: 'Variable: Undefined global',
      testValue: 
      `
      imprima notDefined;  // expect runtime error: Undefined variable 'notDefined'.
      `
    },
    {
      testLabel: 'Variable: Undefined local',
      testValue: 
      `
      {
        imprima notDefined;  // expect runtime error: Undefined variable 'notDefined'.
      }
      `
    },
    {
      testLabel: 'Variable: Uninitialized',
      testValue: 
      `
      variable a;
      imprima a; // expect: nil
      `
    },
    {
      testLabel: 'Variable: Unreached undefined',
      testValue: 
      `
      si (falso) {
        imprima notDefined;
      }
      
      imprima "ok"; // expect: ok
      `
    },
    {
      testLabel: 'Variable: Use false as var',
      testValue: 
      `
      // [line 2] Error at 'false': Expect variable name.
      variable falso = "value";
      `
    },
    {
      testLabel: 'Variable: Use global in initializer',
      testValue: 
      `
      variable a = "value";
      variable a = a;
      imprima a; // expect: value
      `
    },
    {
      testLabel: 'Variable: Use local in initializer',
      testValue: 
      `
      variable a = "outer";
      {
        variable a = a; // Error at 'a': Can't read local variable in its own declaration.
      }
      `
    },
    {
      testLabel: 'Variable: Use nil as var',
      testValue: 
      `
      // [line 2] Error at 'nil': Expect variable name.
      variable nil = "value";
      `
    },
    {
      testLabel: 'Variable: Use this as var',
      testValue: 
      `
      // [line 2] Error at 'this' ('este'): Expect variable name.
      variable este = "value";
      `
    },
    {
      testLabel: 'While: Class in body',
      testValue: 
      `
      // [line 2] Error at 'class': Expect expression.
      mientras (verdadero) class Foo {}
      `
    },
    {
      testLabel: 'While: Closure in body',
      testValue: 
      `
      variable f1;
      variable f2;
      variable f3;
      
      variable i = 1;
      mientras (i < 4) {
        variable j = i;
        funcion f() { imprima j; }
      
        si (j == 1) f1 = f;
        sino si (j == 2) f2 = f;
        sino f3 = f;
      
        i = i + 1;
      }
      
      f1(); // expect: 1
      f2(); // expect: 2
      f3(); // expect: 3
      `
    },
    {
      testLabel: 'While: Function in body',
      testValue: 
      `
      // [line 2] Error at 'fun': Expect expression.
      mientras (verdadero) funcion foo() {}
      `
    },
    {
      testLabel: 'While: Return closure',
      testValue: 
      `
      funcion f() {
        mientras (verdadero) {
          variable i = "i";
          funcion g() { imprima i; }
          retorne g;
        }
      }
      
      variable h = f();
      h(); // expect: i
      `
    },
    {
      testLabel: 'While: Return inside',
      testValue: 
      `
      funcion f() {
        mientras (verdadero) {
          variable i = "i";
          retorne i;
        }
      }
      
      imprima f();
      // expect: i
      `
    },
    {
      testLabel: 'While: Syntax',
      testValue: 
      `
      // Single-expression body.
      variable c = 0;
      mientras (c < 3) imprima c = c + 1;
      // expect: 1
      // expect: 2
      // expect: 3
      
      // Block body.
      variable a = 0;
      mientras (a < 3) {
        imprima a;
        a = a + 1;
      }
      // expect: 0
      // expect: 1
      // expect: 2
      
      // Statement bodies.
      mientras (falso) si (verdadero) 1; sino 2;
      mientras (falso) mientras (verdadero) 1;
      mientras (falso) para (;;) 1;
      `
    },
    {
      testLabel: 'While: Var in body',
      testValue: 
      `
      // [line 2] Error at 'var': Expect expression.
      mientras (verdadero) variable foo;
      `
    },
    {
      testLabel: 'Spanish characters for identifiers and declarations',
      testValue: 
      `

      funcion Andrés() {
        variable á = 0;
        variable é = 1;
        variable í = 2;
        variable ó = 3;
        variable ú = 4;
        variable ñ = 4;
        variable ü = 6;
        imprima á + é + í + ó + ú + ñ + ü;
      }
    
      función Ramírez() {
        variable Á = 1;
        variable É = 2;
        variable Í = 3;
        variable Ó = 4;
        variable Ú = 5;
        variable Ñ = 6;
        variable Ü = 7;
        imprima Á + É + Í + Ó + Ú + Ñ + Ü;
      }
    
      Andrés();  //Expect: 20;
    
      Ramírez();  //Expect: 28;
      `
    },
  ]
}
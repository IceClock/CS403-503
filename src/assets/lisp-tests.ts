export const LISP_TESTS = [
    {
      testLabel: 'Basic calculations',
      testValue:
        `
      (print (+ 2 3)) ;; expect 5
      (print (- 10 3)) ;; expect 7
      (print (* 2 3)) ;; expect 6
      (print (/ 15 3)) ;; expect 5
      `
    },
    {
      testLabel: 'More calculations',
      testValue:
        `
        (print (+ 2 (* 3 2))) ;; expect 8
        (print (- 10 (/ 9 3))) ;; expect 7.0
        (print (* 2 (* 3 (+ 5 3)))) ;; expect 48
        (print (/ 15 (- 8 3))) ;; expect 3.0
  
        `
    },
    {
      testLabel: 'cons',
      testValue:
        `
        (print (cons "a" "b")) ;; expect ("a" . "b")
        (print (cons 2 3)) ;; expect (2 . 3)

        (print (cons "a" (cons "c" "b"))) ;; expect ("a" "c" . "b")

        `
    },
    {
      testLabel: 'Car and cdr',
      testValue:
        `
        (print (car (cons "a" "b"))) ;; expect "a" 
        (print (cdr (cons "a" "b"))) ;; expect "b" 


        (print (car (cons "a" (cons "c" "b")))) ;; expect "a"
        (print (cdr (cons "a" (cons "c" "b")))) ;; expect ("c" . "b")

        (print (car (cdr (cons "a" (cons "c" "b"))))) ;; expect "c" 
        (print (cdr (cdr (cons "a" (cons "c" "b"))))) ;; expect "b"

  
        `
    },
    {
      testLabel: 'cadr and cddr',
      testValue:
        `
        (print (cadr (cons "a" (cons "c" "b")))) ;; expect "c"
        (print (cddr (cons "a" (cons "c" "b")))) ;; expect "b"

        `
    },
    {
      testLabel: 'List2 function',
      testValue:
        `
        (define list2 (a b)
            (cons a (cons b () ))
        )
        (print (list2 1 2)) ;; expect (1 2)

  
        `
    },
    {
      testLabel: 'set',
      testValue:
        ` 
        (set a 10)
        (print a) ;; expect 10

        `
    },
    {
      testLabel: 'If statement',
      testValue:
        `
                    
        (set a 10)
        (if (eql a 10) (print a)) ;; expect 10

  
        `
    },
    {
      testLabel: 'If else statement',
      testValue:
        `
        (set a 15)
        (if (eql a 10) (print a) (print "Not equal")) ;; expect "Not equal"
        `
    },
    {
      testLabel: 'Cond',
      testValue:
        `
          (set a 11)
          (cond 
          ((eql a 10) (print "a Equal 10"))
          ((eql a 11) (print "a Equal 11"))) ;; expect "a Equal 11"

          (set a 10)
          (cond 
          ((eql a 10) (print "a Equal 10"))
          ((eql a 11) (print "a Equal 11"))) ;; expect "a Equal 10"

    
          `
    },
    {
      testLabel: 'Double',
      testValue: 
      `
      (define double (x) (* x 2))

      (print (double 3))
      `
      },
      {
      testLabel: 'Tripe and negate',
      testValue: 
      `
      ;;
      ;; Triple the value of a number
      ;;
      
      (define triple (X)
        "Compute three times X."  ; Inline comments can
        (* 3 X))                  ; be placed here.
      
      ;;
      ;; Negate the sign of a number
      ;;
      
      (define negate (X)
        "Negate the value of X."  ; This is a documentation string.
        (- X)) 
      
      (print (triple 2))
      (print (negate 3))  
      `
      },
      {
      testLabel: 'Factorial',
      testValue: 
      `
      (define factorial (N)
      "Compute the factorial of N."
      (if (= N 1)
          1
        (* N (factorial (- N 1)))))

        (print (factorial 4))
      `
      },
      {
      testLabel: 'Multiple Recursions (Fib)',
      testValue: 
      `
      (define fib (n)
      (if (<= n 1)
            n
          (+ (fib (- n 1))
            (fib (- n 2)))))

      (print (fib 5))   ; => 5
      (print (fib 10))  ; => 55
      `
      },
      {
      testLabel: 'number? and Symbol?',
      testValue: 
      `
      (set a 1)
      (set b "a")

      (if (number? a) (print "a is a number") (print "a is not a number")) ;; expect "a is a number"
      (if (symbol? b) (print "b is a symbol") (print "b is not a symbol")) ;; expect "b is a symbol"
      `
      },
      {
      testLabel: 'list?',
      testValue: 
      `
      
      (set a 15)
      (if (list? a) (print "a is a list") (print "a is not a list")) ;; expect "a is not a list"


      (if (list? \`(1 2)) (print "It is a list") (print "It is not a list")) ;; expect "It is a list"

      (if (list? \`("a" "b")) (print "It is a list") (print "It is not a list")) ;; expect "It is a list"
      `
      }
      
  
]
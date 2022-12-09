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
      testLabel: 'Setq',
      testValue:
        ` 
        (setq a 10)
        (print a) ;; expect 10

        `
    },
    {
      testLabel: 'If statement',
      testValue:
        `
                    
        (setq a 10)
        (if (eql a 10) (print a)) ;; expect 10

  
        `
    },
    {
      testLabel: 'If else statement',
      testValue:
        `
        (if (eql a 10) (print a) (print "Not equal")) ;; expect "Not equal"
        `
    },
    {
      testLabel: 'Cond',
      testValue:
        `
          (setq a 11)
          (cond 
          ((eql a 10) (print "a Equal 10"))
          ((eql a 11) (print "a Equal 11"))) ;; expect "a Equal 11"

          (setq a 10)
          (cond 
          ((eql a 10) (print "a Equal 10"))
          ((eql a 11) (print "a Equal 11"))) ;; expect "a Equal 10"

    
          `
    },
    {
      testLabel: 'Test Label',
      testValue:
        `
                    
                          `
    },
  
]
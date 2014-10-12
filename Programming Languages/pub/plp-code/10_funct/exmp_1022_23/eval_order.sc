;;; Examples 10.22, 10.23, and 10.24

(define double (lambda (x) (+ x x)))

(double (* 3 4))                                ; 24

(define switch (lambda (x a b c)
    (cond ((< x 0) a)
          ((= x 0) b)
          ((> x 0) c))))

(switch -1 (+ 1 2) (+ 2 3) (+ 3 4))             ; 3

(define f
  (lambda ()
    (let ((done #f)
          (memo '())
          (code (lambda () (* 3 4))))
      (if done memo
        (begin
         (set! memo (code))
         memo)))))

(double (f))                                    ; 24

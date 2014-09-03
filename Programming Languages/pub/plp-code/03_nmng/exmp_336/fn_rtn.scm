;; Example 3.36

(define plus_x (lambda (x)
   (lambda (y) (+ x y))))

(let ((f (plus_x 2)))
   (f 3))               ; returns 5

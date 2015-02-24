; Scheme sum program

(define (sum seq)
  (define (sum1 seq res)
    (if (null? seq)
	res
	(sum1 (cdr seq) (+ res (car seq)))))
  (sum1 seq 0))

(display (sum '(5 6 1 8 3 7)))
(display "\n")
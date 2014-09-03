; scheme --load closure2.scm < /dev/null

(define fff 'nil)

(define (g ff)
  (set! fff ff))

(define (closure)
  (let ((i 1))				;early/deep
    (define (f)
      (display i)
      (display "\n"))
    (g f)))

(closure)
(let ((i 2))				;late/shallow
  (fff))
(fff)

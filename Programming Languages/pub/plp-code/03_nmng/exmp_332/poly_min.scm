;; Example 3.32
;; Note that min is predefined in R5RS Scheme;
;; hence we use a different name.

(define min2 (lambda (a b) (if (< a b) a b)))

(min2 123 456)
(min2 3.14159 2.71828)

;; (min2 "abc" "def")        => run-time error

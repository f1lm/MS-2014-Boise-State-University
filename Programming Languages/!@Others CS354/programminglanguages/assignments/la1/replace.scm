;; Reuben Tanner
;; 113104237
;; usage (replace source target replacement)
;; source is the element you are attempting to search and replace through
;; target is the pattern you are looking for
;; replacement is what you are to replace target with in source
;; this function returns the element passed into with any necessary replacements made
;; if no matching targets are found, the same element will be returned
;; this function works for lists and atoms
(define replace 
	(lambda (source target replacement) 
		(cond 
			((equal? source target) replacement)
			((and (not (list? source)) (not (eqv? source target))) source)
			((null? source) '())
			((equal? target (car source)) (cons replacement (replace (cdr source) target replacement)))
			((not (list? (car source))) (cons (car source) (replace (cdr source) target replacement)))
			(else (cons (replace (car source) target replacement) (replace (cdr source) target replacement)))
		)
	)
)

;;tests
(replace 'x 'x 'y)
(replace 'x 'x '(a b c))
(replace '(a b c) '(a b c) 'x)
(replace 1111 2222 2222)
(replace 'string 'string 'there-are-no-strings)
(replace 1 1 2)
(replace 1111 1111 2222)
(replace '(a (b c) (d (b c (b c) (d (b c (b c)(d (b c))))))) '(b c) '(x y))
(replace '(a (b c) (d (b c (b c) (d (b c (b c)(d (b c))))))) '(b c) 'x)
(replace '(a (b c) (d (b c (b c) (d (b c (b c)(d (b c))))))) 'b 'x)
(replace '(a (b c) (d (b c))) '(b c) '(x y))
(replace '(a (b c) d (b c)) '(b c) '(x y))
(replace '(a (b c) d (b c)) '(x y) '(b c))	
(replace '(a b '(a b '(a b c) c)) '(a b c) 'x)
(replace '(a b '(a b '(a b c) c)) 'a 'x)
(replace '(a b '(a b '(a b c) c)) 'c 'x)
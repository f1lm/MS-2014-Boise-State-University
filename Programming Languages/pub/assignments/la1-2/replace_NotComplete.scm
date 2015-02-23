; Scheme Program to Replace 
(define (replace source search-for search-with)
	(cond
		((null? source) '())
		((list? (car source)) (cons (replace (car source) search-for search-with) (replace(source) search-for search-with))
		((eq? (car source) search-for) (cons search-with (replace(cdr source) search-for search-with)))
		(else(cons(car source) (replace(cdr source) search-for search-with)))))

		
(define (copy-list list)
    (if (null? list)'()
        (cons (car list)
            (copy-list (cdr list)))))
			
			
(display(replace '(2 1 4) 1 2))
(display(replace '(a (b c) (d (b c)))'(b c)'(x y)))
(display(replace '(a (b c) d)'(b c)'(x y)))
(display(replace '(a b c)'(a b)'(x y)))
(display(replace '(a b c)'(b c)'(x y)))
		
		

     
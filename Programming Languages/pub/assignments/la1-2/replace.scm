;program to replace string with new one in a source string 
(define (replace (lambda(source search-for replace-with)
  	(cond 
    		((null? source) 'source)            ;if source is null return source null
     		((equ? (car source) search-for) 	;found the element we're replacing in source first part
			(cons(new replace (cdr source) search-for replace-with)))  ;run replace on rest of the source and cons new element onto its
		(else
			(cons (car source) (replace (cdr source) search-for replace-with))) ;run replace on rest of the source and cons the car onto it
		)
	)
)

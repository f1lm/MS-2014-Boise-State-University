;; Scheme code from Section 7.7.1 (Examples 7.69 through 7.79)

(let
    ((t '(#\R (#\X ()()) (#\Y (#\Z ()()) (#\W ()())))))
    (car (cadr (caddr t))))

(let
    ((n '(#\N)))
    (display (cdr n))
    (newline)
    (set-cdr! n n)          ;; circular reference
    (display (cadddr n)))   ;; can dereference as often as we like!

(define (replace source target replacement)
	(cond
                ((string=? source "") "\n")
                ((> (string-length target) (string-length source)) (display source) "\n")
		((string=? (substring source 0 (string-length target)) target) (display replacement) (replace (substring source (string-length target) (string-length source)) target replacement))
		(else (display (substring source 0 1)) (replace (substring source 1 (string-length source)) target replacement))
	)
)

(display (replace "1" "1" "2"))

(display (replace "(1 2)" "1" "2"))

(display (replace "(1   2   4   2)" "1" "2"))

(display (replace "(aaaaaa)" "a" "z"))

(display (replace "(aa)" "aa" "zz"))

(display (replace "This is interesting!" "This is interesting!" "Nah."))

(display (replace "A very short string." "A very short string." "A very loooooooooooooooong string."))

(display (replace "A very short string." "A very loooooooooooooooong string." "A very loooooooooooooooong string."))


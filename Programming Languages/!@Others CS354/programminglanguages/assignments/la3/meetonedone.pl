:- include('data.pl').

meetone(Person, slot(time(W,X),time(Y,Z))) :-
	free(Person,slot(time(A,B),time(C,D))),
	J is W+(X/100), K is Y+(Z/100),
	L is A+(B/100), M is C+(D/100),
	L=<J,
	M>=K.

main :- meetone(Person,slot(time(8,30),time(8,45))),write(Person),nl,halt.

:- initialization(main).

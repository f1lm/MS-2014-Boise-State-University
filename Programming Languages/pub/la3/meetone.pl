#!/bin/gprolog --consult-file

:- include('data.pl').

% Your code goes here.

main :- findall(Person, meetone(Person,slot(time(8,30),time(8,45))), People),
	write(People), nl, halt.

:- initialization(main).

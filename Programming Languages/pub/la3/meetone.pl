#!/bin/gprolog --consult-file

:- include('data.pl').

begintime(time(Hourquery, Minutequery), time(Hourdata, Minutedata)) :- Hourquery==Hourdata, Minutequery >= Minutedata.
begintime(time(Hourquery, _), time(Hourdata, _)) :- Hourquery>Hourdata.

endtime(time(Hourquery, Minutequery), time(Hourdata, Minutedata)) :- Hourquery==Hourdata, Minutequery =< Minutedata.
endtime(time(Hourquery, _), time(Hourdata, _)) :- Hourquery<Hourdata.

meetone(Person, slot(FromTime, ToTime)) :- free(Person, slot(TimeStart, TimeEnd)), begintime(FromTime, TimeStart), endtime(ToTime, TimeEnd).

main :- findall(P1, meetone(P1,slot(time(8,30),time(8,45))), People),write(People), nl, 
	findall(P2, meetone(P2,slot(time(5,30),time(6,45))), User),write(User), nl, 
	halt.

:- initialization(main).

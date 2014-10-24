#!/bin/gprolog --consult-file

:- include('data.pl').
:- include('uniq.pl').	

overlapHour(TS1, TS2, TS) :- TS2 lte TS1, TS = TS1,
	TS1 lte TS2, TS = TS2.
	
overlapMinute(TE1, TE2, TE) :- TE2 lte TE1, TE = TE1,
	TE1 lte TE2, TE = TE2.

% find common timeslots based on Max Hour and Min Minutes
commontimeslot(time(TS1, TE1),time(TS2, TE2),S) :-	
	overlapHour(TS1, TS2, TS),
	overlapMinute(TE1, TE2, TE),
	TS lte TE.

% For Recursively find common timeslots
findcommonslot(S, [FirstP|OtherP], CS) :-
    free(FirstP, SF),
    commontimeslot(S, SF, CT),
    findcommonslot(CT, OtherP, CS).
	
% For No People case
findcommonslot(SE, [], slot(time(0,0), time(23,59))).

meet(slot) :- people(People), findcommonslot(Slot, People)
people([ann,bob,carla]).

% people([]). 

main :- findall(Slot, meet(Slot), Slots),
        uniq(Slots, Uniq),
        write(Uniq), nl, halt.

:- initialization(main).

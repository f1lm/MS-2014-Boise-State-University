#!/bin/gprolog --consult-file

:- include('data.pl').
:- include('uniq.pl').
	
findMax(time(Hour1,Minute1),time(Hour2,Minute2), time(Hour, Minute)) :-
	Hour1 == Hour2, Minute1 =< Minute2, Hour==Hour2, Minute==Minute2.
findMax(time(THour1,TMinute1),time(THour2,TMinute2), time(THour, TMinute)) :-
	THour1 < THour2, THour==THour2, TMinute==TMinute2.

findMin(time(Hour1,Minute1),time(Hour2,Minute2), time(Hour, Minute)) :-
	Hour1 == Hour2, Minute1 =< Minute2, Hour==Hour1, Minute==Minute1.
findMin(time(THour1,TMinute1),time(THour2,TMinute2), time(THour, TMinute)) :-
	THour1 < THour2, THour==THour1, TMinute==TMinute1.
	
% make Max as common start time
overlapStart(TS1, TS2, TS) :- findMax(TS2, TS1, TS).

% make Min as common end time	
overlapEnd(TE1, TE2, TE) :- findMin(TE1, TE2, TE).
	
% validate there is no zero lenth meeting 
checkStartlessThanEnd(time(StartHour,StartMinute),time(EndHour,EndMinute)) :-
	StartHour==EndHour, StartMinute<EndMinute.
checkStartlessThanEnd(time(StartHour,_),time(EndHour,_)) :- StartHour<EndHour.

% find common timeslots based on Max Hour and Min Minutes					
commontimeslot(slot(TS1, TE1),slot(TS2, TE2),slot(TS, TE)) :-	
	overlapStart(TS1, TS2, TS),
	overlapEnd(TE1, TE2, TE),
	checkStartlessThanEnd(TS, TE).

% For Recursively find common timeslots
getcommonslot(S, [FirstP|OtherP], CommonSlot) :-
    free(FirstP, SlotFirstP),
    commontimeslot(S, SlotFirstP, CommonTime),
    getcommonslot(CommonTime, OtherP, CommonSlot).
	
% For No People case
getcommonslot(_, [], slot(time(0,0), time(23,59))).

meet(Slot) :- people(People), getcommonslot(Slot, People).

people([ann,bob,carla]).

% overlapping meeting time test cases
% people([ann,matt]).
% people([ann,ujjawal]).
% people([ann,kristi]).
% people([ann,elle]).

% no people test cases
% people([]). 

main :- findall(Slot, meet(Slot), Slots),
        uniq(Slots, Uniq),
        write(Uniq), nl, halt.

:- initialization(main).

#!/bin/gprolog --consult-file

:- include('data.pl').
:- include('uniq.pl').

% Your code goes here.

%------------Check if 1st time var goes before 2nd time var.
firstgoesfirst(time(Hour1,Minute1),time(Hour2,Minute2)) :-
	Hour1==Hour2, Minute1=<Minute2.
firstgoesfirst(time(Hour1,_),time(Hour2,_)) :-
	Hour1<Hour2.

%%%%%%% if tail starts first or equal, take Head start-time.
findstart(TailStartTime,HeadStartTime,CommonStartTime) :-
	firstgoesfirst(TailStartTime,HeadStartTime),
	CommonStartTime=HeadStartTime.
%%%%%%% else, take Tail start-time.
findstart(TailStartTime,HeadStartTime,CommonStartTime) :-
	\+(firstgoesfirst(TailStartTime,HeadStartTime)),
	CommonStartTime=TailStartTime.

%%%%%%% if tail ends first or equal, take tail end-time.
findend(TailEndTime,HeadEndTime,CommonEndTime) :-
	firstgoesfirst(TailEndTime,HeadEndTime),
	CommonEndTime=TailEndTime.
%%%%%%% else, take head end-time.
findend(TailEndTime,HeadEndTime,CommonEndTime) :-
	\+(firstgoesfirst(TailEndTime,HeadEndTime)),
	CommonEndTime=HeadEndTime.	

%%%%%%% start-time must be before end-time.
validmeeting(time(StartHour,StartMinute),time(EndHour,EndMinute)) :-
	StartHour==EndHour, StartMinute<EndMinute.
validmeeting(time(StartHour,_),time(EndHour,_)) :- StartHour<EndHour.

%-------------- find start-time, find end-time, and validate.
findtime(slot(TimeTailStart,TimeTailEnd),
		 slot(TimeHeadStart,TimeHeadEnd),
		 slot(TimeCommonStart,TimeCommonEnd)) :-
		 			findstart(TimeTailStart,TimeHeadStart,TimeCommonStart),
		 			findend(TimeTailEnd,TimeHeadEnd,TimeCommonEnd),
		 			validmeeting(TimeCommonStart,TimeCommonEnd).

findcommon(Slottail,H,Slotcommon) :- 
	free(H,Slothead),
	findtime(Slottail,Slothead,Slotcommon).

%------------always available.
alwaysavailableslot(slot(time(0,0),time(23,59))).
%--------deal with the list.
findmeet(S, []) :- alwaysavailableslot(S).
findmeet(Slotcommon, [H|T]) :- 
	findmeet(Slottail,T), 
	findcommon(Slottail,H,Slotcommon).

meet(Slot) :- people(People), findmeet(Slot, People).

people([ann,bob,carla]).

main :- findall(Slot, meet(Slot), Slots),
        uniq(Slots, Uniq),
        write(Uniq), nl, halt.

:- initialization(main).
:- include('data.pl').

people([ann,bob,carla]).

comparetime(slot(time(BeginHour1, BeginMinute1), time(EndHour1, EndMinute1)),
	    slot(time(BeginHour2, BeginMinute2), time(EndHour2, EndMinute2)),
	    NewSlot):-
  BeginHour1*60 + BeginMinute1 =< EndHour2*60 + EndMinute2,
  EndHour1*60 + EndMinute1 >= BeginHour2*60 + BeginMinute2,
  BeginHour is max(BeginHour1, BeginHour2),
  BeginMinute is min(BeginMinute1, BeginMinute2),
  EndHour is min(EndHour1, EndHour2),
  EndMinute is max(EndMinute1, EndMinute2),
  NewSlot = slot(time(BeginHour,BeginMinute),time(EndHour,EndMinute)).
  

compareStuff(NewSlot, [], NewSlot).

compareStuff(Slot, [NextPerson|Others], NewSlot):-
  free(NextPerson, Slot2),
  nl, write(Slot), write(' VS '), write(Slot2), nl,
  comparetime(Slot, Slot2, Slot3),
  write('New Slot: '), write(Slot3), nl,
  compareStuff(Slot3, Others, NewSlot).
   
meet(Slot):-
  people([FirstP|Others]),
  free(FirstP,Slot),
  compareStuff(Slot, Others, NewSlot).

main :- 
  (setof(Slot,meet(Slot),Slots); halt),
  nl, write('SLOTS FOUND: '),
  write(Slots),
  nl,
  halt.

:- initialization(main).

:- include('data.pl').

% Your code goes here.

people([ann,bob,carla]).

main :- (setof(Slot,meet(Slot),Slots); halt),
        write(Slots),
        nl,
        halt.

:- initialization(main).

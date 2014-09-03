(* Example 3.13 (Figure 3.6) *)

MODULE stacktest;
FROM InOut IMPORT WriteLn, WriteInt;

CONST stack_size = 100;
TYPE element = INTEGER;

MODULE stack;
IMPORT element, stack_size;
EXPORT push, pop;
TYPE
    stack_index = [1..stack_size];
VAR
    s   : ARRAY stack_index OF element;
    top : stack_index;      (* first unused slot *)

PROCEDURE error; BEGIN END error;

PROCEDURE push(elem : element);
BEGIN
    IF top = stack_size THEN
        error;
    ELSE
        s[top] := elem;
        top := top + 1;
    END;
END push;

PROCEDURE pop() : element;  (* A Modula-2 function is just a *)
BEGIN                       (* procedure with a return type. *)
    IF top = 1 THEN
        error;
    ELSE
        top := top - 1;
        RETURN s[top];
    END;
END pop;

BEGIN
    top := 1;
END stack;

BEGIN (* stacktest *)
    push(3);
    push(4);
    push(5);
    WriteInt(pop(), 10);    (* 2nd parameter is field width *)
    WriteInt(pop(), 10);
    WriteInt(pop(), 10);
    WriteLn;
END stacktest.

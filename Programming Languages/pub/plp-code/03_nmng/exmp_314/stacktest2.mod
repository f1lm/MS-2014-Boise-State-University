(* Example 3.14 (Figure 3.7) *)

MODULE stacktest2;
FROM InOut IMPORT WriteLn, WriteInt;

CONST stack_size = 100;
TYPE element = INTEGER;

MODULE stack_manager;
IMPORT element, stack_size;
EXPORT stack, init_stack, push, pop;
TYPE
    stack_index = [1..stack_size];
    stack = RECORD
        s : ARRAY stack_index OF element;
        top : stack_index;          (* first unused slot *)
    END;

PROCEDURE init_stack(VAR stk : stack);
BEGIN
    stk.top := 1;
END init_stack;

PROCEDURE error; BEGIN END error;

PROCEDURE push(VAR stk : stack; elem : element);
BEGIN
    IF stk.top = stack_size THEN
        error;
    ELSE
        stk.s[stk.top] := elem;
        stk.top := stk.top + 1;
    END;
END push;

PROCEDURE pop(VAR stk : stack) : element;
BEGIN
    IF stk.top = 1 THEN
        error;
    ELSE
        stk.top := stk.top - 1;
        RETURN stk.s[stk.top];
    END;
END pop;

END stack_manager;

VAR A, B : stack;

BEGIN (* stacktest *)
    init_stack(A);
    init_stack(B);

    push(A, 3);
    push(A, 4);
    push(A, 5);
    WriteInt(pop(A), 10);   (* 2nd parameter is field width *)
    WriteInt(pop(A), 10);
    WriteInt(pop(A), 10);
    WriteLn;

    push(B, 6);
    push(B, 7);
    push(B, 8);
    WriteInt(pop(B), 10);   (* 2nd parameter is field width *)
    WriteInt(pop(B), 10);
    WriteInt(pop(B), 10);
    WriteLn;
END stacktest2.

(* Examples 7.17 - 7.19 *)

MODULE alias_types;
FROM STextIO IMPORT WriteLn;
FROM SWholeIO IMPORT WriteCard;
FROM SRealIO IMPORT WriteReal;

TYPE stack_element = INTEGER; (* or whatever type the user prefers *) 
MODULE stack; 
IMPORT stack_element; 
EXPORT push, pop; 
CONST stack_size = 100;
VAR content : ARRAY [1..stack_size] OF stack_element;
    tos : INTEGER;

PROCEDURE push(elem : stack_element); 
BEGIN
    (* there should be a check for overflow here *)
    content[tos] := elem;
    tos := tos + 1;
END push;

PROCEDURE pop() : stack_element; 
BEGIN
    (* there should be a check for underflow here *)
    tos := tos - 1;
    RETURN content[tos];
END pop;

BEGIN  (* stack *)
    tos := 1;
END stack;

TYPE celsius_temp = REAL; 
fahrenheit_temp = REAL; 
VAR c : celsius_temp; 
    f : fahrenheit_temp; 

BEGIN (* alias_types *)
    c := 100.0;
    f := c;                 (* this should probably be an error *)
    WriteReal(f, 10);       (* 2nd parameter is width *)

    push(3);
    WriteCard(pop(), 10);   (* 2nd parameter is width *)
    WriteLn;
END alias_types.

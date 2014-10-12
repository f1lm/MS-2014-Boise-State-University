(* Example 7.68 *)

program sets (input, output);
type
    weekday = (sun, mon, tue, wed, thu, fri, sat);
var
    A, B, C : set of char;
    D, E : set of weekday;

begin
    A := B + C;   (* union; A := {x | x is in B or x is in C} *)
    A := B * C;   (* intersection; A := {x | x is in B and x is in C} *)
    A := B - C    (* difference; A := {x | x is in B and x is not in C} *)
end.

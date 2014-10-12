(* Example 7.36 *)

program records (input, output);

const AN = 6.022e23; (* Avogadro's number *) 

type
    two_chars = packed array [1..2] of char;
        (* Packed arrays will be explained in Example 7.43.
           Packed arrays of char are compatible with quoted strings. *)

    element = record
        name : two_chars;
        atomic_number : integer;
        atomic_weight : real;
        metallic : Boolean
    end;

var
    copper : element; 
    my_element : element;
    atoms : real;
    mass : real;

begin
    copper.name := 'Cu'; 
    atoms := mass / copper.atomic_weight * AN; 
    my_element := copper;
end.

(* Examples 7.41, 7.43, 7.44, and 7.46 *)

program records (input, output);

type
    T = record
        j : integer;
    end;
    S = record
        i : integer;
        n : T;
    end;

    two_chars = packed array [1..2] of char;
        (* Packed arrays of char are compatible with quoted strings. *)

    element = packed record
        (* behaves just like an unpacked record,
            but potentially smaller and slower *)
        name : two_chars;
        atomic_number : integer;
        atomic_weight : real;
        metallic : Boolean
    end;

    mineral = record
        chemical_composition : record
            elements : array [1..50] of element;
        end;
    end;

var
    s1, s2 : S;

    copper, my_element : element;
    ruby : mineral; 

begin
    s1.n.j := 0;
    s2 := s1;
    s2.n.j := 7;
    writeln(S1.n.j);        (* prints 0 *)

    my_element := copper;

    ruby.chemical_composition.elements[1].name := 'Al';
    ruby.chemical_composition.elements[1].atomic_number := 13;
    ruby.chemical_composition.elements[1].atomic_weight := 26.98154;
    ruby.chemical_composition.elements[1].metallic := true;
end.

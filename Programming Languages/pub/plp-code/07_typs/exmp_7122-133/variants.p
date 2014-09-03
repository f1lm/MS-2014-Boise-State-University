(* Pascal code for Section CD 7.3.4 (Examples 7.122 through 7.133) *)

program variants (input, output);

type
    two_chars = packed array [1..2] of char;
    long_string = packed array [1..200] of char;
    string_ptr = ^long_string;
    element = record
        name : two_chars;
        atomic_number : integer;
        atomic_weight : real;
        metallic : Boolean;
        case naturally_occurring : Boolean of
          true : (
            source : string_ptr;
                (* textual description of principal commercial source *)
            prevalence : real;
                (* fraction, by weight, of Earth's crust *)
          );
          false : (
            lifetime : real;
                (* half-life in seconds of the most stable known isotope *)
          )
    end;

    tag = (is_int, is_real, is_bool);

var
    copper : element;
    s : string_ptr;

    uirb : record
        case which : tag of
            is_int : (i : integer);
            is_real : (r : real);
            is_bool : (b : Boolean)
    end;

begin
    copper.name := 'Cu';
    new(s);
    s^ := "elemental form and smelting from ore";
    copper.naturally_occurring := true;
    copper.source := s;

    uirb.r := 3.0; 
    (* no intervening assignment to i *) 
    writeln(uirb.i); (* ouch! *)
end.

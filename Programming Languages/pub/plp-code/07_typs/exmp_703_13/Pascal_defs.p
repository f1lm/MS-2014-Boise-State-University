(* Pascal code from Section 7.1 (Examples 7.3 through 7.13) *)

program Pascal_defs (input, output);

type
    symbol_table_index = 1..100;
var
    dummy : symbol_table_index;
    bar : integer;

function insert_in_symbol_table (key : integer) : symbol_table_index;
begin
    insert_in_symbol_table := 3;        (* placeholder *)
end;

procedure true_enums;
    type
        weekday = (sun, mon, tue, wed, thu, fri, sat);
        test_score = 0..100;
        workday = mon..fri;
        water_temperature = 273..373; (* degrees Kelvin *)
    var
        daily_attendance : array [weekday] of integer;
        today : weekday;
    begin
        for today := mon to fri do
            write(ord(today), " ");
        writeln
    end;  (* true_enums *)

procedure consts;
    const
        sun = 0; mon = 1; tue = 2; wed = 3; thu = 4; fri = 5; sat = 6;
    var today : integer;
    begin
        for today := mon to fri do
            write(today, " ");
        writeln
        (* ord(today) would generate a compiler error message *)
    end;  (* consts *)

begin
    (* Have to do something with function return value.
       The following would generate a compiler error message.

    insert_in_symbol_table(bar);

       Have to do the following instead. *)

    bar := 2;
    dummy := insert_in_symbol_table(bar);

    true_enums;
    consts;

    writeln(chr(65));  (* A *)
end.

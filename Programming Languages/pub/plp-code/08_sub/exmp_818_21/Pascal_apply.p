(* Example 8.18 *)

program Pascal_apply(input, output);

    procedure apply_to_A(function f(n : integer) : integer;
                        A : array [low..high : integer] of integer);
    var i : integer;
    begin
        for i := low to high do A[i] := f(A[i]);
    end;
    
var B : array [5..10] of integer;

function print(i : integer) : integer;
begin
    writeln(i);
    print := i;
end;

begin
    B[5] := 5;
    B[6] := 6;
    B[7] := 7;
    B[8] := 8;
    B[9] := 9;
    B[10] := 10;

    apply_to_A(print, B);
end.

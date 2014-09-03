(* Example 7.53 *)

program conformant (input, output);

type vector = array [1..10] of real;

var
    V1, V2 : vector;
    i : integer;

function DotProduct (A, B : array [lower..upper : integer] of real) : real;
var i : integer;
    rtn : real;
begin
    rtn := 0;
    for i := lower to upper do rtn := rtn + A[i] * B[i];
    DotProduct := rtn
end;   

begin
    for i := 1 to 10 do begin
        V1[i] := i;
        V2[i] := 11-i
    end;
    writeln(DotProduct(V1, V2):6:1)
end.

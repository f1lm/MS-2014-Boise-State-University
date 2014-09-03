(* Pascal code from Section 7.4.1 (Examples 7.48 through 7.51) *)

program arrays (input, output);

type
    vector = array [1..10] of real;

var
    upper : array ['a'..'z'] of char;

    mat1 : array [1..10, 1..10] of real;
    mat2 : array [1..10] of vector;

    c : char;
    i, j : integer;
    v : vector;

begin
    for c := 'a' to 'z' do
        upper[c] := chr(ord(c) + (ord('A') - ord('a')));
    writeln(upper['k']);

    for i := 1 to 10 do
        for j := 1 to 10 do begin
            mat1[i, j] := (i-1)*10 + (j-1);
            mat2[i, j] := (i-1)*10 + (j-1);
        end;
    writeln(mat1[3][4]:5:1, mat2[3, 4]:5:1);
        (* note interchangability of notation *)

    v := mat2[3];
end.

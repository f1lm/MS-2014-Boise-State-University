-- Example 7.55 (Figure 7.7)

procedure dynarray is

type real is new long_float;

procedure foo(size : integer) is 
M : array (1..size, 1..size) of real; 
begin 
    for i in 1..size loop
        for j in 1..size loop
            M(i, j) := real(i*j);
        end loop;
    end loop;
end foo;

begin -- dynarray
    foo(100);
end dynarray;

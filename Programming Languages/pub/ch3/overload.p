{ fpc -ooverload overload.p }

program Overload;
function f(x:integer): integer;
begin
   if x=0 then
      f:=1
   else
      f:=f(x-1)+1
end;
begin
   writeln(f(5));
   writeln(3.14)
end.

{ fpc -orange range.p && ./range}

program Range;
type
   arange=1..10;
   brange=5..20;
var
   a:arange;
   b:brange;
begin
   a:=1;
   b:=a;
   writeln(b)
end.

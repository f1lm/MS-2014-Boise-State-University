Set @min = 0;
set @max = 0;

select @min:=MIN(R.number), @max:=MAX(R.number) from (
select L.DLocation, count(*) as 'number'
from Employee E inner join Department D on
E.Dno = D.Dnumber
inner join Dept_Locations L on
D.Dnumber = L.Dnumber
group by L.DLocation) R;

select * from (
select L.DLocation, count(*) as 'number'
from Employee E inner join Department D on
E.Dno = D.Dnumber
inner join Dept_Locations L on
D.Dnumber = L.Dnumber
group by L.DLocation) R
where R.number in (@min, @max);

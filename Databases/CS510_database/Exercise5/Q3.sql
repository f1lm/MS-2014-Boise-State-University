select L.Dlocation, SUM(IF(E.sex='M',1,0)) as 'males', SUM(IF(E.sex='F',1,0)) as 'females' from employee E 
inner join Department D on
E.Dno = D.Dnumber
inner join Dept_Locations L on
D.Dnumber = L.Dnumber
group by L.DLocation order by count(*) desc;
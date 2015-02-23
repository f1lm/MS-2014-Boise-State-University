select L.Dlocation, 
ROUND(SUM(IF(E.sex='M',E.Salary,0))/SUM(IF(E.sex='M',1,0)),0) as 'Avg salary for males', 
ROUND(SUM(IF(E.sex='F',E.Salary,0))/SUM(IF(E.sex='F',1,0)),0) as 'Avg salary for females' 
from employee E 
inner join Department D on
E.Dno = D.Dnumber
inner join Dept_Locations L on
D.Dnumber = L.Dnumber
group by L.DLocation order by count(*) desc;
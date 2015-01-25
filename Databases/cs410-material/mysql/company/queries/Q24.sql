select	dno, count(*), avg(salary)
from	employee
group by dno;
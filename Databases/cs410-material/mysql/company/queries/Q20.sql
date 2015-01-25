select 	sum(salary), max(salary), min(salary), avg(salary)
from	(employee join department on dno = dnumber)
where	dname = 'Research';
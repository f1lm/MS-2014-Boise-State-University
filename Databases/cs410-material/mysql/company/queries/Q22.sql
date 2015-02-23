select	count(*)
from	employee, department
where	dno = dnumber and dname = 'Research';

select  count(*)
from 	employee, department
where	dno = dnumber
group by dname
having 	dname = 'Research';

/* the column appeared in the having clause must one of the grouping */
/* attributes or the aggregate functions*/
select  count(*)
from 	employee, department
where	dno = dnumber
group by dnumber
having 	dname = 'Research';
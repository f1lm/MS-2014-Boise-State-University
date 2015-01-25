select	fname, lname, address
from	employee, department
where	dname='Research' and dnumber=dno;

/* two tables without a join condition */
select	fname, lname, address
from	employee, department
where	dname='Research';
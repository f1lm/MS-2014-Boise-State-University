select	fname, lname, address
from	(employee join department on dno=dnumber)
where	dname='Research';
select	fname, lname, address
from	employee natural join department
where 	dname='Research';
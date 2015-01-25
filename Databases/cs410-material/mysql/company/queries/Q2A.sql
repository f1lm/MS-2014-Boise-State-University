select 	pnumber, dnum, lname, address, bdate
from	((project join department on dnum = dnumber) join employee on mgrssn = ssn)
where	plocation = 'Stafford';


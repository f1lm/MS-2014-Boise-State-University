select	pnumber, pname, count(*)
from	project, works_on, employee
where	pnumber = pnum and ssn = essn and dno = 5
group by pnumber, pname;
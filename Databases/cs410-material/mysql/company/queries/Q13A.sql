select	fname, lname, 1.1*salary increased_sal
from	employee, works_on, project
where	ssn=essn and pno=pnumber and pname='ProductX';

select	dname, lname, fname, pname
from 	department, employee, works_on, project
where	dnumber=dno and ssn=essn and pno=pnumber
order by dname desc, lname, fname;
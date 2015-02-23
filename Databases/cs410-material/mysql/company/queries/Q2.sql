select	pnumber, dnum, lname, address, bdate
from	project, department, employee
where 	dnum=dnumber and mgrssn=ssn and plocation='Stafford';
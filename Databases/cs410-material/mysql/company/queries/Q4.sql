(select distinct	pnumber
 from			employee, department, project
 where			dnum=dnumber and ssn=mgrssn and lname='Smith')
union
(select distinct	pno
 from			employee, works_on
 where			ssn=essn and lname='Smith');
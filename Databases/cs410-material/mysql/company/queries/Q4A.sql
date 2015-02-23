select	distinct pnumber
from	project
where	pnumber in (select pnumber
		    from   project, department, employee
                    where  dnum=dnumber and mgrssn=ssn and
                           lname='Smith')
  	or
	pnumber in (select pnum
                    from   works_on, employee
                    where  essn=ssn and lname='Smith');	
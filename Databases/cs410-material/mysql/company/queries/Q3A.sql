select	fname, lname
from	employee
where	not exists 
	(	(select pnumber
	 	 from   project
                 where  dnum=5)
 	minus
		(select pno
		 from   works_on
		 where  ssn=essn));
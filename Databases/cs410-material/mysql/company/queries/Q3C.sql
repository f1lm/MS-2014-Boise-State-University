select	lname, fname
from	employee
where	not exists
	(select *
         from	project
	 where 	dnum=5
		and
		not exists (select *
			    from   works_on 
                            where  essn=ssn and pno=pnumber));
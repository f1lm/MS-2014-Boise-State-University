select	lname, fname
from	employee
where	not exists
	(select *
         from	works_on b
	 where 	(b.pno in (select pnumber
                            from   project
                            where  dnum=5))
		and
		not exists (select *
			    from   works_on c
                            where  c.essn=ssn and c.pno=b.pno));
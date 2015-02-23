select	lname, fname
from	employee
where	(select	count(*)
	from	dependent
	where	ssn = essn) >= 2;

select	lname, fname
from	employee
where 	exists (select	count(*)
		from	dependent
		where	ssn = essn
		group by essn
		having	count(*) >= 2);
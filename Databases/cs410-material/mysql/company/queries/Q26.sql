select 	pnumber, pname, count(*)
from	project, works_on
where	pnumber = pno
group by pnumber, pname
having 	count(*) > 2;
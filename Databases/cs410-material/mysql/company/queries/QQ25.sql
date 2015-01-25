select	pnumber, pname, count(*)
from	project, works_on
where	pnumber = pno
group by pnumber, pname;

select	pnumber, pname, count(*)
from	project, works_on
where	pnumber = pno
group by pnumber;


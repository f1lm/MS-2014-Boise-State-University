select	e.fname, e.lname
from	employee e
where	exists (select *
                from   dependent
                where  e.fname=dependent_name and e.sex=sex and e.ssn=essn);
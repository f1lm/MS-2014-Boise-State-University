select	fname, lname
from 	employee
where	not exists (select *
                    from   dependent
                    where  ssn=essn);
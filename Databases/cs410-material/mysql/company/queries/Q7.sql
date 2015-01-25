select 	fname, lname
from	employee
where	exists (select *
                from   dependent
                where  ssn=essn)
        and
        exists (select *
                from   department
                where  ssn=mgrssn);
                    
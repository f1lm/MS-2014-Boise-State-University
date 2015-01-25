select	e.fname, e.lname
from	employee e
where 	e.ssn in (select essn
                  from   dependent
                  where  e.fname=dependent_name and e.sex=sex);

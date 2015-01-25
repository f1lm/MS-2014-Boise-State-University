select	lname, fname
from	employee
where	salary > some (select salary
                      from   employee
                      where  dno=5);
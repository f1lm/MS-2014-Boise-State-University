select e.lname, (select s.lname
                 from employee s
                 where e.superssn=s.ssn)
from employee e;
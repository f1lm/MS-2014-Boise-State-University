select	fname, lname
from 	employee
where	((select pno
          from   works_on
          where ssn=essn)
         contains
         (select pnumber
          from   project
          where  dnum=5));
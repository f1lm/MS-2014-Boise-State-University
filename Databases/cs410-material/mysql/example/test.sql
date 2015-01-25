select dname
from department d
where (select dlocation
         from   dept_locations
         where  d.dnumber = dnumber)
      contains
      (select plocation
        from  project
        where dnum = 5);

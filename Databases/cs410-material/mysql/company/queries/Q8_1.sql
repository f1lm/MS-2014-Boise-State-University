/* Renaming with the keyword as */
select	e.fname, e.lname, s.fname, s.lname
from	employee as e, employee as s
where	e.superssn=s.ssn;
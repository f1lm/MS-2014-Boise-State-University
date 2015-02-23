select	e.fname, e.lname, s.fname, s.lname
from	employee e, employee s
where	e.superssn=s.ssn;

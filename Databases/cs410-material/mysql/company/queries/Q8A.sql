select	e.lname employee_name, s.lname supervisor_name
from	employee e, employee s
where	e.superssn=s.ssn;
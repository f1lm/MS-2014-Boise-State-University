select	e.fname, e.lname
from  	employee e, dependent d
where	e.ssn=d.essn and e.sex=d.sex and e.fname=d.dependent_name;
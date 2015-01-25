(select	mgrssn
 from	department)
minus
(select	essn
 from	department, dependent
 where	mgrssn=essn);
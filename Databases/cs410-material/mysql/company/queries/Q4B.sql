(select mgrssn from department)
minus
(select essn from dependent);
-- 8.  Retrieve the name of each student who claims a minor in a college, which is different from the student’s major college.
select distinct FNAME, LNAME from student S
left outer join minor Min on Min.SSN = S.SSN
left outer join major Maj on Maj.SSN = S.SSN
left outer join dept D on D.DeptCode = Min.DeptCode
left outer join dept D1 on D1.DeptCode = Maj.DeptCode
where D.College <> D1.College;
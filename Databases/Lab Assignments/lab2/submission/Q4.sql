-- 4.  Retrieve the names of students who only took courses from his/her major department.
select FName, LName from student where SSN not in(
select S.SSN from student S
inner join grade_report G on G.SSN = S.SSN
inner join course C on C.CourseNo = G.CourseNo
inner join dept D on D.DeptCode = C.DeptCode
and D.DeptCode not in (select distinct DeptCode from major Maj where Maj.SSN = S.SSN));
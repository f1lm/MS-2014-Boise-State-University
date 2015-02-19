-- 9.  Retrieve the name of each student who has claimed minor(s), but has 
-- not yet received any grade from any of his/her minor departments. 
select distinct FNAME, LNAME from student S
inner join minor Min on Min.SSN = S.SSN
where S.SSN not in(
select distinct S1.SSN from student S1
inner join minor M on M.SSN = S1.SSN
inner join course C on C.DeptCode = M.DeptCode
where (S1.SSN, C.CourseNo) in (select G.SSN, G.CourseNo from grade_report G where G.SSN = S1.SSN));
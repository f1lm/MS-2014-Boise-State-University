Select FName, LName from Student
where SSN NOT IN (
select Distinct S.SSN from 
Course C,
STUDENT S,
GRADE_REPORT G
where
S.SSN = G.SSN and
C.CourseNo = G.CourseNo and
C.DeptCode='CS');
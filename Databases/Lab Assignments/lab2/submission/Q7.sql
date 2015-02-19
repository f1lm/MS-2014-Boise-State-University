-- 7.  For each student who took courses from his/her minor department, retrieve the student’s name, 
-- the course name, and the grade the student received.
select FNAME, LNAME, CNAME, LGrade from student S 
inner join minor M  on M.SSN = S.SSN
inner join course C on C.DeptCode = M.DeptCode
inner join grade_report G on G.SSN = S.SSN and G.CourseNo = C.CourseNo;
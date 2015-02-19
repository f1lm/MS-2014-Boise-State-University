select FNAME, LNAME, CNAME, LGrade from student S 
inner join minor M  on M.SSN = S.SSN
inner join course C on C.DeptCode = M.DeptCode
inner join grade_report G on G.SSN = S.SSN and G.CourseNo = C.CourseNo;
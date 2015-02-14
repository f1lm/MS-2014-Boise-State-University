select fname, lname, course.CName, grade_report.LGRADE from student
left outer join MINOR on
Student.SSN= Minor.SSN
left outer join GRADE_REPORT on
Student.SSN = GRADE_REPORT.SSN 
inner join COURSE ON
COURSE.CourseNo = GRADE_REPORT.CourseNo
and 
COURSE.DeptCode = Minor.DeptCode;
select college, count(section.SectionNo) from dept
left outer join
course on
course.DeptCode=dept.DeptCode
left outer join
section on
course.CourseNo = section.CourseNo
group by College;
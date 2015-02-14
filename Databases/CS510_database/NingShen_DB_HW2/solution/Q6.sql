select Dname from (
select dept.DName, count(distinct course.courseNo) as 'num' from dept
left outer join COURSE on
COURSE.DeptCode = dept.DeptCode
left outer join section on
section.CourseNo = course.CourseNo
where
section.Year=2001 and
section.semester='S'
group by dept.dname ) as R
where R.num>=2;

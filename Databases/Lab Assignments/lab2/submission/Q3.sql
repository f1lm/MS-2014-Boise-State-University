-- 3.  For each college, count the number of sections offered by that college.
select D.College, COUNT(S.SectionNo) from dept D 
left outer join course C on D.DeptCode = C.DeptCode
left outer join section S on S.CourseNo = C.CourseNo
group by D.College;
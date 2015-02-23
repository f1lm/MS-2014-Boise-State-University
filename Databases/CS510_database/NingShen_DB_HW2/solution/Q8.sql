select distinct FName, lname from STUDENT S
left outer join Major M on
M.SSN = S.SSN
left outer join Minor Mi on
Mi.SSN = S.SSN
left outer join DEPT D on
D.DeptCode=M.DeptCode
left outer join DEPT D1 on
D1.DeptCode = Mi.DeptCode
where
D1.college <> D.College

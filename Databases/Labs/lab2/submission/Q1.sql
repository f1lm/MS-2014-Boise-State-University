select FName, LName from STUDENT s INNER JOIN MAJOR m ON s.SSN = m.SSN And m.DeptCode =
(select DeptCode from DEPT Where DName='Computer Science');
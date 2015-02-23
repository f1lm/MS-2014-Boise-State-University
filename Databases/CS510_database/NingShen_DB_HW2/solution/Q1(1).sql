select FName, LName from STUDENT S, MAJOR M where
S.SSN=M.SSN and  M.DeptCode='CS' order by FName, LName;

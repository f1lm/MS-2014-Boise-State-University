CREATE TABLE `DEPARTMENT_IN_B` (
  `Dname` varchar(15) NOT NULL,
  `Dnumber` int(11) NOT NULL,
  `Mgr_ssn` char(9) NOT NULL,
  `Mgr_start_date` date DEFAULT NULL,
  PRIMARY KEY (`Dnumber`),
  UNIQUE KEY `Dname` (`Dname`),
  KEY `Mgr_ssn` (`Mgr_ssn`),
  CONSTRAINT `department_ibfk_1_b` FOREIGN KEY (`Mgr_ssn`) REFERENCES `EMPLOYEE` (`Ssn`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `company`.`DEPARTMENT_IN_B`
(`Dname`,
`Dnumber`,
`Mgr_ssn`,
`Mgr_start_date`)
VALUES
('PARCEL',
'1',
'123456789',
NOW());

INSERT INTO `company`.`DEPARTMENT_IN_B`
(`Dname`,
`Dnumber`,
`Mgr_ssn`,
`Mgr_start_date`)
VALUES
('BILLING',
'2',
'123456789',
NOW());


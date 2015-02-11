use `company`;

SET FOREIGN_KEY_CHECKS = 0;

LOAD DATA LOCAL INFILE 'E:/MS-2014-Boise-State-University/Databases/Labs/lab1/files/employee.unl' 
INTO TABLE employee
FIELDS TERMINATED BY '|' ;

LOAD DATA LOCAL INFILE 'E:/MS-2014-Boise-State-University/Databases/Labs/lab1/files/department.unl' 
INTO TABLE department
FIELDS TERMINATED BY ' ';

LOAD DATA LOCAL INFILE 'E:/MS-2014-Boise-State-University/Databases/Labs/lab1/files/dept_locations.unl' 
INTO TABLE dept_locations
FIELDS TERMINATED BY ' ';

LOAD DATA LOCAL INFILE 'E:/MS-2014-Boise-State-University/Databases/Labs/lab1/files/project.unl' 
INTO TABLE project
FIELDS TERMINATED BY ' ';


LOAD DATA LOCAL INFILE 'E:/MS-2014-Boise-State-University/Databases/Labs/lab1/files/dependent.unl' 
INTO TABLE dependent
FIELDS TERMINATED BY ' ';


LOAD DATA LOCAL INFILE 'E:/MS-2014-Boise-State-University/Databases/Labs/lab1/files/works_on.unl' 
INTO TABLE works_on
FIELDS TERMINATED BY ' ';

SET FOREIGN_KEY_CHECKS = 1;
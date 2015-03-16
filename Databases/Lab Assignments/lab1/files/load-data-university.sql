use `university`;

SET FOREIGN_KEY_CHECKS = 0;

LOAD DATA LOCAL INFILE 'D:/MS-2014-Boise-State-University/Databases/Lab Assignments/lab1/files/course.unl' 
INTO TABLE COURSE
FIELDS TERMINATED BY '|' ;

LOAD DATA LOCAL INFILE 'D:/MS-2014-Boise-State-University/Databases/Lab Assignments/lab1/files/dept.unl' 
INTO TABLE DEPT
FIELDS TERMINATED BY '|';

LOAD DATA LOCAL INFILE 'D:/MS-2014-Boise-State-University/Databases/Lab Assignments/lab1/files/grade_report.unl' 
INTO TABLE GRADE_REPORT
FIELDS TERMINATED BY ' ';

LOAD DATA LOCAL INFILE 'D:/MS-2014-Boise-State-University/Databases/Lab Assignments/lab1/files/major.unl' 
INTO TABLE MAJOR
FIELDS TERMINATED BY ' ';


LOAD DATA LOCAL INFILE 'D:/MS-2014-Boise-State-University/Databases/Lab Assignments/lab1/files/minor.unl' 
INTO TABLE MINOR
FIELDS TERMINATED BY ' ';


LOAD DATA LOCAL INFILE 'D:/MS-2014-Boise-State-University/Databases/Lab Assignments/lab1/files/section.unl' 
INTO TABLE SECTION
FIELDS TERMINATED BY ' ';

LOAD DATA LOCAL INFILE 'D:/MS-2014-Boise-State-University/Databases/Lab Assignments/lab1/files/student.unl' 
INTO TABLE STUDENT
FIELDS TERMINATED BY '|';

SET FOREIGN_KEY_CHECKS = 1;
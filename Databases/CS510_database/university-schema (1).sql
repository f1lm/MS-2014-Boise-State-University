CREATE DATABASE  IF NOT EXISTS `university` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `university`;
-- MySQL dump 10.13  Distrib 5.6.13, for osx10.6 (i386)
--
-- Host: 127.0.0.1    Database: university
-- ------------------------------------------------------
-- Server version	5.6.11-ndb-7.3.2-cluster-gpl

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `COURSE`
--

DROP TABLE IF EXISTS `COURSE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `COURSE` (
  `CName` varchar(20) NOT NULL,
  `CourseNo` varchar(10) NOT NULL,
  `Hours` int(11) DEFAULT NULL,
  `DeptCode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`CourseNo`),
  KEY `COURSEFK_DEPTCODE` (`DeptCode`),
  CONSTRAINT `COURSEFK_DEPTCODE` FOREIGN KEY (`DeptCode`) REFERENCES `DEPT` (`DeptCode`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COURSE`
--

LOCK TABLES `COURSE` WRITE;
/*!40000 ALTER TABLE `COURSE` DISABLE KEYS */;
INSERT INTO `COURSE` VALUES ('Cost Accounting','acct351',3,'ACCT'),('Intro to CE','ce120',3,'CE'),('Structure I','ce352',3,'CE'),('Organic Chemistry','chem320',4,'CHEM'),('Physical Chemistry','chem322',4,'CHEM'),('Intro to CIS','cis220',4,'CIS'),('Intro to CS I','cs125',4,'CS'),('Intro to CS II','cs225',4,'CS'),('Databse Theory','cs410',4,'CS'),('K-12 Education','educ200',4,'EDUC'),('Circuit Design','ee225',4,'EE'),('Digital Systems','ee230',4,'EE'),('Calculas I','math170',5,'MATH'),('Calculas II','math175',4,'MATH'),('ME Design','me280',3,'ME');
/*!40000 ALTER TABLE `COURSE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DEPT`
--

DROP TABLE IF EXISTS `DEPT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DEPT` (
  `DName` varchar(30) NOT NULL,
  `DeptCode` varchar(10) NOT NULL,
  `College` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`DeptCode`),
  UNIQUE KEY `DEPTSK` (`DName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DEPT`
--

LOCK TABLES `DEPT` WRITE;
/*!40000 ALTER TABLE `DEPT` DISABLE KEYS */;
INSERT INTO `DEPT` VALUES ('Accounting','ACCT','Business'),('Civil Engineering','CE','Engineering'),('Chemistry','CHEM','Science'),('Computer Information Systems','CIS','Business'),('Computer Science','CS','Engineering'),('Education','EDUC','Education'),('Electrical Engineering','EE','Engineering'),('Mathematics','MATH','Science'),('Mechanical Engineering','ME','Engineering');
/*!40000 ALTER TABLE `DEPT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GRADE_REPORT`
--

DROP TABLE IF EXISTS `GRADE_REPORT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GRADE_REPORT` (
  `SSN` char(9) NOT NULL,
  `SectionNo` int(11) NOT NULL,
  `Semester` char(1) NOT NULL,
  `Year` char(4) NOT NULL,
  `CourseNo` varchar(10) NOT NULL,
  `LGRADE` char(1) DEFAULT NULL,
  PRIMARY KEY (`SSN`,`SectionNo`,`Semester`,`Year`,`CourseNo`),
  KEY `GRADEREPORTFK_COURSENO` (`CourseNo`),
  KEY `GRADEREPORTFK_SSYC` (`SectionNo`,`Semester`,`Year`,`CourseNo`),
  CONSTRAINT `GRADEREPORTFK_SSN` FOREIGN KEY (`SSN`) REFERENCES `STUDENT` (`SSN`) ON DELETE CASCADE,
  CONSTRAINT `GRADEREPORTFK_COURSENO` FOREIGN KEY (`CourseNo`) REFERENCES `COURSE` (`CourseNo`) ON DELETE CASCADE,
  CONSTRAINT `GRADEREPORTFK_SSYC` FOREIGN KEY (`SectionNo`, `Semester`, `Year`, `CourseNo`) REFERENCES `SECTION` (`SectionNo`, `Semester`, `Year`, `CourseNo`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GRADE_REPORT`
--

LOCK TABLES `GRADE_REPORT` WRITE;
/*!40000 ALTER TABLE `GRADE_REPORT` DISABLE KEYS */;
INSERT INTO `GRADE_REPORT` VALUES ('111222333',1,'F','2001','cs125','C'),('111222333',2,'F','2001','math175','A'),('121212121',1,'F','2000','chem320','A'),('123456789',1,'F','2001','ee225','A'),('123456789',1,'S','2001','cs225','C'),('123456789',2,'F','2000','cs125','B'),('333222111',2,'F','2000','cs125','D'),('343434343',1,'S','2001','cs225','B'),('343434343',1,'S','2002','cs410','A'),('343434343',2,'F','2000','cs125','A'),('444555666',1,'F','2000','cs125','A'),('444555666',1,'S','2002','ee230','B'),('565656565',1,'F','2001','ee225','A'),('565656565',1,'S','2002','ee230','A'),('666555444',1,'F','2000','ee225','B'),('666555444',1,'S','2002','ee230','B'),('777888999',1,'S','2001','cs225','A'),('777888999',1,'S','2002','me280','A'),('777888999',2,'S','2002','math170','D'),('999888777',1,'S','2002','cs410','A');
/*!40000 ALTER TABLE `GRADE_REPORT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MAJOR`
--

DROP TABLE IF EXISTS `MAJOR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MAJOR` (
  `DeptCode` varchar(10) NOT NULL,
  `SSN` char(9) NOT NULL,
  PRIMARY KEY (`DeptCode`,`SSN`),
  KEY `MAJORFK_SSN` (`SSN`),
  CONSTRAINT `MAJORFK_DEPTCODE` FOREIGN KEY (`DeptCode`) REFERENCES `DEPT` (`DeptCode`) ON DELETE CASCADE,
  CONSTRAINT `MAJORFK_SSN` FOREIGN KEY (`SSN`) REFERENCES `STUDENT` (`SSN`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MAJOR`
--

LOCK TABLES `MAJOR` WRITE;
/*!40000 ALTER TABLE `MAJOR` DISABLE KEYS */;
INSERT INTO `MAJOR` VALUES ('MATH','111222333'),('ACCT','121212121'),('CHEM','121212121'),('CS','123456789'),('EE','123456789'),('CE','333222111'),('CS','333222111'),('CS','343434343'),('CS','444555666'),('EE','565656565'),('EE','666555444'),('CS','777888999'),('ME','777888999'),('CIS','999888777');
/*!40000 ALTER TABLE `MAJOR` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MINOR`
--

DROP TABLE IF EXISTS `MINOR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MINOR` (
  `DeptCode` varchar(10) NOT NULL,
  `SSN` char(9) NOT NULL,
  PRIMARY KEY (`DeptCode`,`SSN`),
  KEY `MINORFK_SSN` (`SSN`),
  CONSTRAINT `MINORFK_DEPTCODE` FOREIGN KEY (`DeptCode`) REFERENCES `DEPT` (`DeptCode`) ON DELETE CASCADE,
  CONSTRAINT `MINORFK_SSN` FOREIGN KEY (`SSN`) REFERENCES `STUDENT` (`SSN`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MINOR`
--

LOCK TABLES `MINOR` WRITE;
/*!40000 ALTER TABLE `MINOR` DISABLE KEYS */;
INSERT INTO `MINOR` VALUES ('CS','111222333'),('CS','121212121'),('EE','121212121'),('CE','123456789'),('ACCT','333222111'),('EE','343434343'),('EDUC','444555666'),('EE','444555666'),('CS','565656565'),('ACCT','666555444'),('CHEM','666555444'),('MATH','777888999'),('CS','999888777');
/*!40000 ALTER TABLE `MINOR` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SECTION`
--

DROP TABLE IF EXISTS `SECTION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SECTION` (
  `SectionNo` int(11) NOT NULL,
  `Semester` char(1) NOT NULL,
  `Year` char(4) NOT NULL,
  `CourseNo` varchar(10) NOT NULL,
  PRIMARY KEY (`SectionNo`,`Semester`,`Year`,`CourseNo`),
  KEY `SECTIONFK_COURSENO` (`CourseNo`),
  CONSTRAINT `SECTIONFK_COURSENO` FOREIGN KEY (`CourseNo`) REFERENCES `COURSE` (`CourseNo`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SECTION`
--

LOCK TABLES `SECTION` WRITE;
/*!40000 ALTER TABLE `SECTION` DISABLE KEYS */;
INSERT INTO `SECTION` VALUES (1,'S','2001','acct351'),(1,'S','2002','acct351'),(1,'S','2001','ce120'),(1,'S','2002','ce120'),(1,'F','2000','ce352'),(1,'F','2001','ce352'),(1,'F','2000','chem320'),(1,'F','2001','chem320'),(1,'S','2001','chem322'),(1,'S','2002','chem322'),(1,'F','2000','cis220'),(1,'S','2002','cis220'),(1,'F','2000','cs125'),(1,'F','2001','cs125'),(2,'F','2000','cs125'),(2,'F','2001','cs125'),(1,'S','2001','cs225'),(1,'S','2002','cs225'),(2,'S','2001','cs225'),(2,'S','2002','cs225'),(1,'S','2001','cs410'),(1,'S','2002','cs410'),(1,'F','2000','ee225'),(1,'F','2001','ee225'),(1,'S','2001','ee230'),(1,'S','2002','ee230'),(1,'S','2001','math170'),(1,'S','2002','math170'),(2,'S','2001','math170'),(2,'S','2002','math170'),(1,'F','2000','math175'),(1,'F','2001','math175'),(2,'F','2000','math175'),(2,'F','2001','math175'),(3,'F','2000','math175'),(1,'S','2001','me280'),(1,'S','2002','me280');
/*!40000 ALTER TABLE `SECTION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STUDENT`
--

DROP TABLE IF EXISTS `STUDENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `STUDENT` (
  `FName` varchar(10) NOT NULL,
  `LName` varchar(10) NOT NULL,
  `SSN` char(9) NOT NULL,
  `StudentNumber` varchar(10) NOT NULL,
  `Sex` char(1) DEFAULT NULL,
  `BirthDate` date DEFAULT NULL,
  `Class` int(11) DEFAULT NULL,
  `Degree` varchar(10) DEFAULT NULL,
  `Addr` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`SSN`),
  UNIQUE KEY `STUDENTSK` (`StudentNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STUDENT`
--

LOCK TABLES `STUDENT` WRITE;
/*!40000 ALTER TABLE `STUDENT` DISABLE KEYS */;
INSERT INTO `STUDENT` VALUES ('Joe','Ford','111222333','111000002','M','1981-04-07',1,'BA','209 Blue, Boise, ID'),('Brad','Bird','121212121','111000008','M','1980-02-01',3,'BA','719 Turquois, Boise, ID'),('John','Smith','123456789','111000001','M','1980-10-03',2,'BS','123 Orange, Boise, ID'),('Karen','Geer','333222111','111000007','F','1982-01-19',1,'BS','567 Red, Boise, ID'),('Jason','Freeman','343434343','111000009','M','1979-08-22',4,'BS','703 Gold, Boise, ID'),('Susan','Johnson','444555666','111000003','F','1977-06-22',5,'MS','314 Green, Boise, ID'),('Josephine','Freeman','565656565','111000010','F','1980-12-07',3,'BS','107 Gold, Boise, ID'),('Betty','Gates','666555444','111000006','F','1978-11-18',4,'BS','378 Pink, Boise ID'),('Alex','Mace','777888999','111000004','M','1979-11-04',3,'BS','709 Yellow, Boise, ID'),('Richard','McDonald','999888777','111000005','M','1976-12-12',5,'MBA','922 White, Boise, Id');
/*!40000 ALTER TABLE `STUDENT` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-02-28  1:49:18

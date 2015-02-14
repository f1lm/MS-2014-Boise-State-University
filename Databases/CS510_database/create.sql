CREATE DATABASE  IF NOT EXISTS `company` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `company`;
-- MySQL dump 10.13  Distrib 5.6.13, for osx10.6 (i386)
--
-- Host: 127.0.0.1    Database: company
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
-- Table structure for table `DEPARTMENT`
--

DROP TABLE IF EXISTS `DEPARTMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DEPARTMENT` (
  `Dname` varchar(15) NOT NULL,
  `Dnumber` int(11) NOT NULL,
  `Mgr_ssn` char(9) NOT NULL,
  `Mgr_start_date` date DEFAULT NULL,
  PRIMARY KEY (`Dnumber`),
  UNIQUE KEY `Dname` (`Dname`),
  KEY `Mgr_ssn` (`Mgr_ssn`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`Mgr_ssn`) REFERENCES `EMPLOYEE` (`ssn`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DEPARTMENT`
--

LOCK TABLES `DEPARTMENT` WRITE;
/*!40000 ALTER TABLE `DEPARTMENT` DISABLE KEYS */;
INSERT INTO `DEPARTMENT` VALUES ('Corporate',1,'100600830','2014-02-10'),('Finance',2,'101154450','2014-02-10'),('HR',3,'153165053','2014-02-10'),('Sales',4,'101571684','2014-02-10'),('Research',5,'102038555','2014-02-10'),('Engineers',6,'102167101','2014-02-10');
/*!40000 ALTER TABLE `DEPARTMENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DEPENDENT`
--

DROP TABLE IF EXISTS `DEPENDENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DEPENDENT` (
  `Essn` char(9) NOT NULL,
  `Dependent_name` varchar(15) NOT NULL,
  `Sex` char(1) DEFAULT NULL,
  `BDate` date DEFAULT NULL,
  `Relationship` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`Essn`,`Dependent_name`),
  CONSTRAINT `dependent_ibfk_1` FOREIGN KEY (`Essn`) REFERENCES `EMPLOYEE` (`ssn`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DEPENDENT`
--

LOCK TABLES `DEPENDENT` WRITE;
/*!40000 ALTER TABLE `DEPENDENT` DISABLE KEYS */;
INSERT INTO `DEPENDENT` VALUES ('100600830','Jonathan','M','1968-08-03','Brother'),('101154450','Kimberly','F','1950-06-06','Sister'),('101365448','Alexis','F','1991-03-29','Spouse'),('101571684','Sierra','F','1987-05-16','Spouse'),('102038555','Bailey','F','1990-03-17','Aunt'),('102167101','Adam','M','1981-10-31','Spouse'),('102290381','Adrian','M','1985-05-12','Uncle'),('102547670','Mariah','F','1985-12-16','Mother '),('102702547','Jaden','M','1999-11-16','Spouse'),('103800073','Mason','M','1970-09-08','Child'),('105162180','Audrey','F','1970-09-28','Mother '),('106019727','Lucas','M','1997-06-13','Child'),('106156373','Avery','F','1957-11-01','Sister'),('106175264','Ian','M','1987-03-26','Spouse'),('107513713','Andrew','M','1969-06-04','Spouse'),('107537026','Tyler','M','1976-03-08','Spouse'),('108321321','Richard','M','1974-03-18','Uncle'),('108640974','Dominic','M','1958-09-04','Child'),('108766985','Amanda','F','1993-12-20','Mother '),('108960926','Christian','M','1960-04-28','Spouse'),('109539925','Destiny','F','1989-01-24','Spouse'),('109566079','Jeremiah','M','1997-11-20','Spouse'),('111255833','Andrea','F','1986-08-10','Spouse'),('113436998','Brandon','M','1982-01-26','Spouse'),('116038141','Alex','M','1998-10-09','Spouse'),('127987528','Vanessa','F','1984-07-24','Mother '),('137219193','Leah','F','1974-01-21','Sister'),('143013004','Faith','F','1958-10-01','Spouse'),('145905469','Alexa','F','1984-05-17','Sister'),('146897580','Matthew','M','1992-10-08','Brother'),('148096066','Isaiah','M','1967-11-17','Child'),('149447554','Angel','M','1967-01-27','Child'),('152750827','Isaiah','M','1951-04-21','Brother'),('153165053','Benjamin','M','1971-09-23','Spouse'),('157834749','Patrick','M','1965-01-03','Spouse'),('164035602','Logan','M','1973-07-05','Child'),('165893029','Hunter','M','1963-03-06','Spouse'),('166323333','Mason','M','1950-12-27','Brother'),('173532139','Sarah','F','1954-10-10','Spouse'),('182046691','Brooklyn','F','1972-01-31','Mother '),('185087986','Anthony','M','1971-01-09','Spouse'),('185164166','Caroline','F','1999-07-16','Spouse'),('194193160','Christopher','M','1960-04-04','Spouse'),('198954255','Hailey','F','1985-08-14','Spouse'),('202482094','Taylor','F','1988-11-04','Spouse'),('204592130','Katelyn','F','1971-05-01','Aunt'),('206325998','Chase','M','2002-06-11','Brother'),('213217793','Antonio','M','1949-06-02','Brother'),('217539041','Cody','M','1994-08-04','Child'),('221186335','Allison','F','1948-03-13','Spouse'),('221768372','Riley','F','1995-07-27','Spouse'),('224199639','Lily','F','1978-09-21','Aunt'),('228641820','Mary','F','1977-11-28','Spouse'),('230023176','Lauren','F','1976-10-05','Mother '),('233577339','Adrian','M','1951-11-23','Child'),('234539919','Evan','M','1988-09-22','Spouse'),('237387731','Luis','M','1947-02-13','Brother'),('240885881','Sophia','F','1999-07-12','Sister'),('243283441','Aiden','M','2002-08-03','Brother'),('243410846','Sydney','F','1969-05-11','Mother '),('243599720','Mackenzie','F','1951-08-22','Sister'),('247811059','Alexandra','F','2001-04-30','Sister'),('248039987','Brayden','M','1960-10-06','Uncle'),('249849795','Jenna','F','1968-02-05','Spouse'),('251020925','Jason','M','1995-03-03','Spouse'),('256049755','Hunter','M','1974-06-21','Spouse'),('260841567','Jackson','M','1959-10-16','Spouse'),('272293575','Jacqueline','F','1957-02-06','Sister'),('272419273','Victoria','F','1980-11-19','Sister'),('278764478','Kayla','F','1982-08-01','Sister'),('280388304','Wyatt','M','1956-06-08','Child'),('280990409','Nathaniel','M','1999-03-03','Spouse'),('281917658','Caleb','M','1955-11-21','Brother'),('283027380','Angelina','F','1973-05-11','Aunt'),('283380197','Danielle','F','1959-11-25','Mother '),('296837757','Lucas','M','1966-02-06','Child'),('300335716','Nathaniel','M','1949-03-11','Spouse'),('301906633','Gavin','M','1975-05-01','Child'),('303287455','Jason','M','1986-05-05','Child'),('306561062','Rebecca','F','1952-05-11','Spouse'),('309246610','Makayla','F','1962-05-21','Spouse'),('315466028','Aaron','M','1950-06-14','Spouse'),('315921553','Luis','M','1955-09-22','Child'),('320090430','Kyle','M','1966-03-09','Uncle'),('321105199','Jose','M','1977-11-27','Spouse'),('321633007','Cole','M','1984-06-25','Uncle'),('321814559','Alejandro','M','1999-02-15','Child'),('323290432','Jocelyn','F','1968-12-09','Sister'),('337689542','Jackson','M','1952-01-03','Brother'),('339801685','Sebastian','M','1947-01-09','Uncle'),('340612826','Brian','M','1992-02-06','Spouse'),('342318690','Morgan','F','1978-07-16','Sister'),('349675990','Connor','M','1959-01-15','Spouse'),('358334587','Kevin','M','1947-01-21','Child'),('360329806','Gabriel','M','1947-12-21','Spouse'),('370619268','Timothy','M','1984-09-11','Spouse'),('377648552','John','M','1951-08-08','Child'),('379337964','Carlos','M','1982-06-08','Child'),('383024175','Kaitlyn','F','1990-05-02','Sister'),('385891261','Sean','M','1966-06-26','Brother'),('395671951','Nathan','M','1963-01-30','Child'),('398435354','Elizabeth','F','1970-08-31','Sister'),('401544506','Charles','M','1962-10-25','Spouse'),('402139305','Paige','F','1952-03-19','Aunt'),('403334235','Isaac','M','1954-08-06','Child'),('405545318','Elijah','M','1981-06-29','Spouse'),('406024015','Abigail','F','1981-11-16','Spouse'),('409222565','Kaylee','F','1967-02-01','Mother '),('410842623','Bryan','M','1985-05-07','Brother'),('414907281','Devin','M','1976-02-12','Child'),('416809538','Emily','M','1995-03-15','Spouse'),('417906597','Ian','M','1963-05-02','Child'),('424815458','Joshua','M','1987-05-07','Child'),('430536017','Savannah','F','1949-02-17','Mother '),('436193123','Kyle','M','1964-03-01','Child'),('452654266','Grace','F','1959-09-20','Aunt'),('460341675','Mia','F','1998-03-12','Spouse'),('464745931','Evelyn','F','1992-01-28','Spouse'),('467880015','Miguel','M','1966-05-10','Spouse'),('470991649','Blake','M','1964-07-27','Spouse'),('472278615','Ella','F','1972-09-28','Aunt'),('473608343','Connor','M','1962-02-27','Spouse'),('475174199','Owen','M','1959-12-10','Spouse'),('476395975','Alexander','M','1975-01-18','Brother'),('479169879','Ariana','F','1954-05-07','Aunt'),('479583491','Natalie','F','1992-11-27','Spouse'),('487821862','Chloe','F','1982-04-27','Mother '),('489580918','Madison','F','1958-10-16','Spouse'),('490431211','Samuel','M','1949-01-24','Spouse'),('498558351','Tristan','M','2001-12-29','Spouse'),('504823810','Jesus','M','1960-02-05','Spouse'),('510589984','Hayden','M','1971-08-06','Spouse'),('516667749','Amber','F','1969-11-18','Mother '),('524651343','Samantha','F','1992-11-04','Aunt'),('529583206','Jack','M','1982-05-13','Spouse'),('547254546','Hannah','F','1980-10-24','Aunt'),('549328325','Luke','M','1983-08-18','Uncle'),('550933025','Maria','F','1974-03-10','Mother '),('551402409','Lillian','F','2002-04-13','Mother '),('555297090','Landon','M','1976-11-13','Spouse'),('558423921','Robert','M','1951-06-05','Spouse'),('579181690','Michelle','F','1977-11-30','Spouse'),('580371717','Anna','F','1994-04-13','Aunt'),('582959263','Marissa','F','1948-11-04','Aunt'),('587466177','Jesus','M','1949-07-14','Brother'),('590033522','Brianna','F','1968-12-14','Spouse'),('590752990','Seth','M','1986-07-16','Brother'),('591701279','Adam','M','1950-04-20','Uncle'),('598708052','Jesse','M','1966-06-25','Brother'),('612695553','Jada','F','1970-04-15','Spouse'),('616854190','Gavin','M','1964-10-19','Spouse'),('623846578','Aaliyah','F','1953-05-16','Aunt'),('629448052','Juan','M','1958-04-01','Child'),('631265448','Olivia','F','1982-07-30','Sister'),('639211095','Diego','M','1949-01-24','Child'),('640467763','Isabel','F','2001-09-27','Sister'),('642866267','Jordan','M','1971-04-19','Child'),('645013108','Carter','M','1958-04-08','Spouse'),('645408636','Thomas','M','1960-12-23','Child'),('648088877','James','M','1956-02-06','Child'),('650520535','Ashley','F','1985-12-07','Mother '),('652599185','Zachary','M','1951-06-09','Child'),('655245985','Jayden','M','1974-05-13','Spouse'),('655568196','Stephanie','F','1986-07-04','Sister'),('678325950','Ryan','M','1997-03-14','Spouse'),('686577571','Jasmine','F','1966-03-05','Aunt'),('693079090','Emma','F','1974-07-29','Mother '),('698574814','Haley','F','1982-04-11','Spouse'),('699281889','Ethan','M','1966-08-05','Child'),('702991608','Autumn','F','1972-09-17','Spouse'),('712118749','Eric','M','1950-01-03','Child'),('715836096','Jordan','F','1951-11-12','Mother '),('734783088','Zoe','F','1975-09-08','Mother '),('737587797','Noah','M','1989-06-04','Brother'),('738455694','Maya','F','1975-12-03','Aunt'),('738520455','Daniel','M','1956-10-26','Child'),('744459069','Megan','F','1973-08-24','Aunt'),('746003950','Isaac','M','1977-09-01','Child'),('748341678','Sofia','F','1966-04-22','Spouse'),('766251694','David','M','1990-06-19','Child'),('767711085','Gabrielle','F','1997-03-05','Spouse'),('768253114','Luke','M','1984-05-20','Spouse'),('777863516','Madeline','F','1964-06-18','Spouse'),('778006055','Aaron','M','1969-03-14','Brother'),('784157044','Carson','M','1960-01-04','Child'),('787365949','Cameron','M','1962-07-23','Brother'),('787421163','Jack','M','1953-06-07','Child'),('788327896','Xavier','M','1955-06-27','Spouse'),('790655350','Eric','M','1956-05-31','Child'),('791385336','Jessica','F','1997-08-02','Spouse'),('791537427','Julia','F','2002-12-09','Spouse'),('798593330','Nicholas','M','1964-07-09','Child'),('807562098','Erin','F','1983-02-06','Spouse'),('812199213','Bryan','M','1977-02-01','Child'),('812985793','Alex','M','2001-10-18','Spouse'),('813103156','Jacob','M','1985-07-22','Spouse'),('813141680','Sara','F','1965-12-11','Aunt'),('819474523','Dylan','M','1957-09-19','Child'),('823136509','Jayden','M','1963-12-10','Brother'),('832244955','Addison','F','1953-04-12','Sister'),('835430078','Aiden','M','1999-02-14','Spouse'),('843717750','Juan','M','1970-12-08','Spouse'),('847967465','Arianna','F','1963-08-15','Spouse'),('849032522','William','M','1980-12-16','Spouse'),('854155949','Charles','M','1967-12-01','Child'),('860381565','Brian','M','1981-11-02','Spouse'),('860832766','Aidan','M','1955-05-25','Child'),('863725941','Melanie','F','1995-12-07','Sister'),('866873014','Alyssa','F','1955-02-07','Mother '),('870152970','Nevaeh','F','1983-04-01','Spouse'),('878869247','Rachel','F','1965-05-14','Mother '),('884807449','Steven','M','1960-12-23','Child'),('885344983','Katherine','F','1951-10-13','Spouse'),('890073921','Gabriella','F','1986-12-25','Spouse'),('896012044','Sean','M','1949-06-21','Brother'),('896187673','Ava','F','1948-10-29','Aunt'),('905438394','Nicole','F','1968-03-24','Aunt'),('916514637','Trinity','F','1963-02-09','Aunt'),('918292513','Kylie','F','1975-07-26','Sister'),('921987501','Michael','M','1982-08-24','Child'),('926438277','Justin','M','1999-09-04','Brother'),('936316509','Austin','M','1976-04-25','Child'),('940698189','Carlos','M','1989-11-24','Spouse'),('946313360','Angel','M','1966-04-16','Child'),('946687014','Claire','F','1969-04-11','Spouse'),('953183502','Julian','M','1955-08-15','Spouse'),('954504541','Isabella','F','1980-04-10','Spouse'),('961532374','Evan','M','1955-02-01','Spouse'),('976093589','Brooke','F','1997-12-17','Spouse'),('978357193','Aidan','M','1968-07-22','Spouse'),('993447467','Joseph','M','1977-02-02','Brother'),('995894500','Jennifer','F','1980-08-24','Spouse');
/*!40000 ALTER TABLE `DEPENDENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DEPT_LOCATIONS`
--

DROP TABLE IF EXISTS `DEPT_LOCATIONS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DEPT_LOCATIONS` (
  `Dnumber` int(11) NOT NULL,
  `Dlocation` varchar(15) NOT NULL,
  PRIMARY KEY (`Dnumber`,`Dlocation`),
  CONSTRAINT `dept_locations_ibfk_1` FOREIGN KEY (`Dnumber`) REFERENCES `DEPARTMENT` (`Dnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DEPT_LOCATIONS`
--

LOCK TABLES `DEPT_LOCATIONS` WRITE;
/*!40000 ALTER TABLE `DEPT_LOCATIONS` DISABLE KEYS */;
INSERT INTO `DEPT_LOCATIONS` VALUES (1,'San Francisco'),(2,'San Francisco'),(3,'London'),(4,'Boise'),(5,'Seattle'),(6,'Seattle');
/*!40000 ALTER TABLE `DEPT_LOCATIONS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EMPLOYEE`
--

DROP TABLE IF EXISTS `EMPLOYEE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EMPLOYEE` (
  `FNAME` varchar(15) NOT NULL,
  `Minit` char(1) DEFAULT NULL,
  `LName` varchar(15) NOT NULL,
  `Ssn` char(9) NOT NULL,
  `Address` varchar(30) DEFAULT NULL,
  `Sex` char(1) DEFAULT NULL,
  `Salary` decimal(10,2) DEFAULT NULL,
  `Super_ssn` char(9) DEFAULT NULL,
  `Dno` int(11) NOT NULL,
  PRIMARY KEY (`Ssn`),
  KEY `Super_ssn` (`Super_ssn`),
  KEY `Dno` (`Dno`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`Super_ssn`) REFERENCES `EMPLOYEE` (`Ssn`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`Dno`) REFERENCES `DEPARTMENT` (`Dnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EMPLOYEE`
--

LOCK TABLES `EMPLOYEE` WRITE;
/*!40000 ALTER TABLE `EMPLOYEE` DISABLE KEYS */;
INSERT INTO `EMPLOYEE` VALUES ('Avery','','James','100600830','San Francisco','F',783329.49,'101154450',2),('Taylor','','Moore','101154450','Seattle','F',677856.49,'101571684',4),('Owen','','Cox','101365448','Boise','M',537379.06,'101154450',2),('Amanda','','Edwards','101571684','Seattle','F',676401.51,'101571684',1),('Stephanie','','Torres','102038555','Seattle','F',6342.19,'100600830',1),('Christian','','L—pez','102167101','Seattle','M',549978.82,'101154450',2),('Logan','','Walker','102290381','San Francisco','M',388543.68,'102167101',6),('Jack','','Hill','102391698','London','M',951393.64,'100600830',1),('Katelyn','','Stewart','102547670','Boise','F',628540.62,'101571684',4),('Jayden','','Stewart','102702547','London','M',145349.47,'102038555',5),('William','','Wilson','103800073','San Francisco','M',757835.87,'100600830',1),('Ella','','Adams','105162180','London','F',796612.34,'102038555',5),('Noah','','Harris','106019727','London','M',807482.61,'101154450',2),('Haley','','Hill','106156373','London','F',789999.47,'101154450',2),('Gabriel','','Young','106175264','San Francisco','M',214290.56,'101571684',4),('Gavin','','Collins','107012483','Seattle','M',423974.41,'101154450',2),('Isaiah','','Campbell','107018299','London','M',124977.82,'101154450',2),('Rebecca','','Bell','107513713','Seattle','F',335300.16,'153165053',3),('Sofia','','Brooks','107537026','San Francisco','F',338770.31,'101571684',4),('Mason','','Turner','108321321','Seattle','M',148263.92,'102038555',5),('Cameron','','Adams','108464216','Boise','M',746428.49,'101154450',2),('Gavin','','Collins','108640974','Boise','M',555893.46,'102167101',6),('Grace','','Thomas','108766985','San Francisco','F',818623.27,'101154450',2),('Autumn','','Cruz','108960926','San Francisco','F',874244.30,'102038555',5),('Jaden','','Russell','109539925','San Francisco','M',254780.99,'102038555',5),('Jack','','Hill','109566079','San Francisco','M',258351.12,'101571684',4),('Sarah','','Anderson','111255833','San Francisco','F',350278.06,'153165053',3),('Evelyn','','Reyes','113436998','San Francisco','F',363358.78,'102167101',6),('Nathan','','Robinson','116038141','San Francisco','M',849578.72,'153165053',3),('John','A','Smith','123456789','Boise ID','M',1234567.10,'100600830',1),('Megan','','Wright','127987528','Seattle','F',74333.48,'102167101',6),('Katherine','','Scott','137219193','Seattle','F',466476.49,'102038555',5),('Alyssa','','Taylor','143013004','San Francisco','F',962244.11,'101571684',4),('Jessica','','L—pez','145905469','Newyork','F',98729.91,'101154450',2),('Kylie','','Reed','146897580','San Francisco','F',639767.80,'102038555',5),('Matthew','','Brown','148096066','Seattle','M',326744.27,'102167101',6),('Joshua','','Williams','149447554','London','M',255853.38,'101154450',2),('Eric','','Morgan','152025988','San Francisco','M',761469.64,'101154450',2),('Matthew','','Brown','152750827','Boise','M',357512.57,'102038555',5),('Jada','','Foster','153165053','Seattle','F',886648.43,'102038555',5),('Luis','','Nguyen','157834749','San Francisco','M',803547.59,'101571684',4),('Bailey','','Ross','164035602','Newyork','F',174373.73,'153165053',3),('Jacob','','Smith','165893029','Boise','M',701982.36,'101571684',4),('William','','Wilson','166323333','San Francisco','M',748821.32,'102038555',5),('Aiden','','Rivera','172043022','Boise','M',904954.42,'100600830',1),('Julian','','D’az','173532139','London','M',707678.31,'100600830',1),('Trinity','','Rivera','182046691','San Francisco','F',223413.15,'100600830',1),('Riley','','Cox','185087986','Newyork','F',568585.35,'100600830',1),('Jennifer','','Green','185164166','Boise','F',466409.27,'102038555',5),('Gabriella','','Bailey','194193160','San Francisco','F',903861.78,'153165053',3),('Blake','','Foster','198954255','Newyork','M',223474.32,'100600830',1),('Steven','','Brooks','202482094','San Francisco','M',671455.57,'100600830',1),('Sophia','','Hern‡ndez','204592130','San Francisco','F',751781.08,'102038555',5),('Cameron','','Adams','206325998','London','M',235773.13,'100600830',1),('Kyle','','Edwards','213217793','Newyork','M',288997.27,'101571684',4),('Timothy','','Gray','216752398','San Francisco','M',553045.69,'102038555',5),('Evan','','Roberts','217539041','San Francisco','M',224513.71,'101154450',2),('Emma','','Williams','221186335','Boise','F',772940.43,'100600830',1),('Rachel','','S‡nchez','221768372','Seattle','F',528754.79,'101154450',2),('Alan',NULL,'Smith','223456789','Boise ID','M',42567.10,'102167101',6),('Elizabeth','','Wilson','224199639','San Francisco','F',144768.09,'153165053',3),('Natalie','','Lee','228641820','London','F',571318.88,'101154450',2),('Timothy','','Gray','230023176','San Francisco','M',873972.00,'101154450',2),('Charles','','Murphy','230376238','London','M',299983.91,'101154450',2),('Logan','','Walker','233577339','San Francisco','M',519169.65,'102167101',6),('Andrew','','Miller','234539919','San Francisco','M',12481.39,'101571684',4),('John','','Jackson','237387731','Boise','M',644197.24,'153165053',3),('Diego','','Watson','240885881','San Francisco','M',372420.13,'101154450',2),('Brandon','','White','243283441','Seattle','M',699562.30,'153165053',3),('Carter','','Ross','243410846','Boise','M',697582.06,'102167101',6),('Abigail','','Miller','243599720','Boise','F',876530.85,'153165053',3),('Adrian','','Bell','246477770','San Francisco','M',407014.08,'102038555',5),('Emily','','Smith','247811059','Seattle','M',820634.90,'100600830',1),('Juan','','Morris','248039987','London','M',846401.14,'153165053',3),('Carlos','','G—mez','249785243','San Francisco','M',303905.51,'101571684',4),('Chloe','','Gonz‡lez','249849795','Boise','F',684888.96,'101571684',4),('Ethan','','Garc’a','251020925','San Francisco','M',994930.20,'153165053',3),('Jacob','','Smith','256049755','Seattle','M',639999.48,'101154450',2),('Christopher','','Jones','260841567','London','M',735327.47,'100600830',1),('Mary','','Rogers','272293575','San Francisco','F',920881.81,'102038555',5),('Hayden','','Long','272419273','Boise','M',714464.48,'153165053',3),('Robert','','King','278591375','Seattle','M',878044.95,'102167101',6),('Sebastian','','Reyes','278764478','San Francisco','M',174880.51,'101571684',4),('Connor','','Parker','280388304','Seattle','M',242760.17,'153165053',3),('Benjamin','','Lewis','280990409','San Francisco','M',506730.43,'102038555',5),('Melanie','','Jenkins','281917658','San Francisco','F',173289.89,'153165053',3),('Kaitlyn','','King','283027380','Seattle','F',755311.66,'101154450',2),('Lily','','Turner','283380197','San Francisco','F',648394.73,'101154450',2),('Noah','','Harris','296837757','San Francisco','M',928597.16,'101154450',2),('Benjamin','','Lewis','300335716','London','M',161754.82,'102038555',5),('David','','Taylor','301906633','San Francisco','M',243935.61,'101571684',4),('Ethan','','Garc’a','303287455','Boise','M',455575.80,'102038555',5),('Sydney','','Walker','306561062','San Francisco','F',861054.51,'100600830',1),('Jason','','Phillips','308977335','San Francisco','M',165628.37,'101154450',2),('Ashley','','Garc’a','309246610','San Francisco','F',575295.44,'101571684',4),('Anthony','','Mart’nez','315466028','San Francisco','M',115396.16,'153165053',3),('John','','Jackson','315921553','Seattle','M',983193.79,'102038555',5),('Alexander','','Thomas','320090430','Seattle','M',902629.70,'153165053',3),('Arianna','','Powell','321105199','Boise','F',332839.52,'101571684',4),('Robert','','King','321633007','Boise','M',892604.61,'101154450',2),('Charles','','Murphy','321814559','San Francisco','M',761655.67,'100600830',1),('Brooke','','Carter','323290432','San Francisco','F',904138.62,'101571684',4),('Will',NULL,'Smith','323456789','Boise ID','M',42547.10,'101154450',2),('Elijah','','Scott','326849645','Seattle','M',266511.62,'101154450',2),('Aidan','','Flores','329466563','Seattle','M',588812.34,'153165053',3),('Christopher','','Jones','337689542','Boise','M',164158.19,'101571684',4),('Angel','','Ram’rez','339801685','San Francisco','M',231685.51,'101571684',4),('Dylan','','Lee','340612826','Boise','M',365111.50,'153165053',3),('Dominic','','Powell','342318690','San Francisco','M',33235.59,'100600830',1),('Nicholas','','Anderson','349675990','San Francisco','M',275556.05,'101154450',2),('Aaliyah','','Ortiz','358334587','San Francisco','F',296790.41,'153165053',3),('Sierra','','Sullivan','360329806','London','F',58699.10,'102167101',6),('Hunter','','Nelson','370619268','San Francisco','M',690555.96,'153165053',3),('Maya','','Gray','377648552','San Francisco','F',96989.66,'101571684',4),('Justin','','PŽrez','379337964','San Francisco','M',575182.67,'153165053',3),('Evan','','Roberts','379665922','San Francisco','M',24928.26,'101571684',4),('Patrick','','GutiŽrrez','383024175','San Francisco','M',614474.57,'101154450',2),('Samuel','','Clark','385891261','San Francisco','M',122402.48,'101154450',2),('Danielle','','Sanders','395671951','Boise','F',197103.74,'101154450',2),('Jesus','','Ward','398435354','London','M',527992.56,'102167101',6),('Jonathan','','Thompson','401544506','Newyork','M',315534.22,'153165053',3),('Victoria','','Clark','402139305','San Francisco','F',237549.65,'101571684',4),('Joseph','','Rodr’guez','403334235','London','M',644833.39,'101571684',4),('Nevaeh','','Perry','405545318','San Francisco','F',367104.84,'153165053',3),('Adrian','','Bell','406024015','Seattle','M',58510.17,'102167101',6),('Samantha','','Rodr’guez','409222565','San Francisco','F',766305.57,'102038555',5),('Jose','','Hall','410842623','San Francisco','M',951884.26,'153165053',3),('Bryan','','Kelly','411459232','Seattle','M',401174.25,'102038555',5),('Jackson','','Mitchell','414907281','San Francisco','M',842949.99,'102167101',6),('Jesus','','Ward','416643890','Seattle','M',954506.43,'101571684',4),('Eric','','Morgan','416809538','San Francisco','M',580730.05,'101154450',2),('Gabriel','','Young','417906597','Seattle','M',200438.78,'101571684',4),('Jordan','','Baker','421645865','Seattle','M',988172.39,'153165053',3),('Megan',NULL,'McDonald','423456789','Boise ID','F',142547.10,'101154450',2),('Paige','','Cooper','424815458','San Francisco','F',770025.39,'101154450',2),('Jesse','','Barnes','430536017','Seattle','M',128335.73,'101154450',2),('Aaron','','Torres','434116790','San Francisco','M',934749.27,'102038555',5),('Alexander','','Thomas','436193123','San Francisco','M',828260.81,'101571684',4),('Sean','','Cooper','444590853','San Francisco','M',202273.23,'102038555',5),('Landon','','Wood','452654266','San Francisco','M',298999.06,'153165053',3),('Richard','','Sanders','460341675','London','M',103129.74,'102167101',6),('Allison','','Ram’rez','464745931','San Francisco','F',916198.23,'101154450',2),('Aidan','','Flores','467880015','Boise','M',248365.34,'101571684',4),('Isaac','','Evans','470991649','Seattle','M',552458.95,'102167101',6),('Tristan','','Fisher','472278615','Seattle','M',340237.45,'102167101',6),('Nicholas','','Anderson','473608343','San Francisco','M',530850.10,'102167101',6),('Kevin','','S‡nchez','475174199','Seattle','M',875183.57,'101571684',4),('Leah','','Wood','476395975','London','F',436872.46,'101571684',4),('Mackenzie','','Roberts','479169879','San Francisco','F',114428.48,'153165053',3),('Devin','','Hughes','479583491','Seattle','M',377960.90,'101154450',2),('Cody','','Price','487821862','Seattle','M',32636.10,'101154450',2),('Lucas','','Peterson','489580918','San Francisco','M',985434.35,'102038555',5),('Claire','','Long','490431211','Seattle','F',815744.29,'101154450',2),('Brian','','Rogers','498558351','San Francisco','M',475578.55,'101154450',2),('Austin','','Allen','504823810','San Francisco','M',59537.41,'153165053',3),('Jason','','Phillips','510589984','San Francisco','M',618896.48,'102038555',5),('Kevin','','S‡nchez','512233580','San Francisco','M',911310.77,'101154450',2),('Hunter','','Nelson','514327696','Newyork','M',554769.48,'101154450',2),('Nicole','','Mitchell','516667749','San Francisco','F',146334.37,'101571684',4),('Landon','','Wood','519282621','London','M',237467.76,'101154450',2),('Mary',NULL,'White','523456789','Boise ID','F',142547.10,'101154450',2),('Ian','','Howard','524651343','Newyork','M',141795.89,'101154450',2),('Michael','','Johnson','529583206','Seattle','M',72291.03,'153165053',3),('Nathaniel','','Reed','547254546','Seattle','M',370400.28,'100600830',1),('Daniel','','Davis','549328325','San Francisco','M',754608.28,'102038555',5),('Hannah','','Brown','550933025','Newyork','F',561805.16,'153165053',3),('Anna','','Harris','551402409','London','F',323172.78,'102038555',5),('Elijah','','Scott','555297090','Newyork','M',481672.94,'102167101',6),('Erin','','GutiŽrrez','558423921','San Francisco','F',869245.53,'100600830',1),('Connor','','Parker','559716962','San Francisco','M',74469.77,'153165053',3),('Destiny','','Allen','579181690','San Francisco','F',252665.41,'101154450',2),('Seth','','Myers','580371717','Seattle','M',554547.60,'100600830',1),('Alexa','','Cook','582959263','San Francisco','F',715224.18,'101571684',4),('Austin','','Allen','587466177','Seattle','M',331897.94,'102038555',5),('Chase','','Bennett','590033522','San Francisco','M',156459.35,'101571684',4),('Luke','','Carter','590752990','San Francisco','M',938249.14,'101154450',2),('Christian','','L—pez','591701279','Boise','M',978063.52,'101571684',4),('Adam','','Cook','598708052','San Francisco','M',856345.90,'153165053',3),('Kyle','','Edwards','606767140','Seattle','M',653449.17,'102038555',5),('Kaylee','','Evans','612695553','San Francisco','F',559581.64,'101571684',4),('David','','Taylor','616854190','San Francisco','M',770742.63,'102038555',5),('Steve',NULL,'White','623456789','Boise ID','M',142547.10,'101154450',2),('Kimberly','','Flores','623846578','Newyork','F',493060.48,'101571684',4),('James','','Martin','629448052','Seattle','M',605000.26,'102038555',5),('Alex','','Bailey','631265448','Seattle','M',741372.95,'102038555',5),('Thomas','','Green','639211095','London','M',619742.88,'101571684',4),('Andrea','','Parker','640467763','Seattle','F',331737.88,'153165053',3),('Marissa','','Barnes','642866267','San Francisco','F',892764.37,'101571684',4),('Aaron','','Torres','645013108','Seattle','M',534630.56,'101154450',2),('Brooklyn','','Butler','645408636','San Francisco','F',484881.25,'102038555',5),('Audrey','','Bennett','648088877','San Francisco','F',60454.47,'153165053',3),('Bryan','','Kelly','650520535','Boise','M',753061.42,'101571684',4),('Ariana','','Price','652599185','Seattle','F',549173.12,'102038555',5),('Lucas','','Peterson','653815620','San Francisco','M',240318.69,'101154450',2),('Alex','','Bailey','654614611','San Francisco','M',424580.59,'153165053',3),('Ryan','','Hern‡ndez','655245985','Seattle','M',957691.39,'153165053',3),('Alexis','','Mart’nez','655568196','San Francisco','F',624981.70,'101154450',2),('Caroline','','Watson','678325950','San Francisco','F',909885.66,'153165053',3),('Luis','','Nguyen','681968180','Newyork','M',144879.09,'153165053',3),('Wyatt','','Morales','686577571','London','M',578276.20,'101571684',4),('Sean','','Cooper','693079090','San Francisco','M',682867.15,'102167101',6),('Madison','','Johnson','698574814','Seattle','F',528226.34,'101571684',4),('Sara','','Kelly','699281889','Seattle','F',949071.24,'101154450',2),('Maria','','Campbell','702991608','San Francisco','F',188332.13,'101154450',2),('Zachary','','Gonz‡lez','712118749','Newyork','M',121825.65,'101154450',2),('Jasmine','','PŽrez','715836096','San Francisco','F',66634.40,'101571684',4),('Steven','','Brooks','716904543','London','M',864510.85,'101154450',2),('Ian','','Howard','718356822','Seattle','M',570519.74,'153165053',3),('Adam','','Cook','722108157','London','M',396364.70,'102167101',6),('Mary',NULL,'Black','723456789','Boise ID','F',142547.10,'101154450',2),('Ava','','Thompson','734783088','Seattle','F',287344.66,'153165053',3),('Jocelyn','','Myers','737587797','Seattle','F',853085.33,'101571684',4),('Alexandra','','Nelson','738455694','Boise','F',645502.97,'102167101',6),('Jordan','','G—mez','738520455','Seattle','F',822445.03,'153165053',3),('Luke','','Carter','742563623','San Francisco','M',592737.96,'102167101',6),('Brayden','','Jenkins','744459069','San Francisco','M',531725.15,'102038555',5),('Joseph','','Rodr’guez','746003950','San Francisco','M',718016.00,'102038555',5),('Angel','','Ram’rez','747363679','Boise','M',906337.72,'153165053',3),('Savannah','','Baker','748341678','Newyork','F',624002.06,'101571684',4),('Chase','','Bennett','753521368','San Francisco','M',340214.20,'100600830',1),('Thomas','','Green','759129944','Seattle','M',89862.44,'101154450',2),('Angelina','','Richardson','766251694','Boise','F',364794.38,'153165053',3),('Lauren','','Jackson','767711085','Seattle','F',847284.04,'101154450',2),('Daniel','','Davis','768253114','London','M',263815.61,'153165053',3),('Juan','','Morris','768648915','Boise','M',517466.30,'102038555',5),('Brianna','','Martin','777863516','Seattle','F',462781.99,'153165053',3),('Anthony','','Mart’nez','778006055','San Francisco','M',67977.45,'102038555',5),('Julian','','D’az','781557659','Boise','M',873066.26,'101154450',2),('Aiden','','Rivera','784157044','San Francisco','M',102030.26,'102167101',6),('Jacqueline','','Fisher','787365949','San Francisco','F',72510.27,'101154450',2),('Michael','','Johnson','787421163','Newyork','M',490027.58,'102038555',5),('Isaiah','','Campbell','788327896','San Francisco','M',493817.30,'101154450',2),('Zachary','','Gonz‡lez','790655350','San Francisco','M',899192.18,'101571684',4),('Xavier','','Cruz','791385336','Seattle','M',289463.88,'101571684',4),('Antonio','','Sullivan','791537427','San Francisco','M',903352.03,'101571684',4),('Vanessa','','D’az','798593330','London','F',818974.13,'102038555',5),('Jayden','','Stewart','803382196','Seattle','M',672407.76,'101571684',4),('Mason','','Turner','804468290','San Francisco','M',299496.96,'101571684',4),('Gabrielle','','Nguyen','807562098','Boise','F',581717.10,'101154450',2),('Jose','','Hall','812199213','San Francisco','M',158187.15,'101571684',4),('Owen','','Cox','812861121','Seattle','M',803425.85,'101154450',2),('Nathan','','Robinson','812985793','San Francisco','M',304802.52,'102038555',5),('Jenna','','Morgan','813103156','San Francisco','F',396667.31,'101571684',4),('Morgan','','Hall','813141680','San Francisco','F',28405.99,'101571684',4),('Amber','','Hughes','819474523','San Francisco','F',299855.82,'101571684',4),('Diego','','Watson','820825233','Boise','M',468073.29,'102038555',5),('Ryan','','Hern‡ndez','823136509','San Francisco','M',552701.16,'101154450',2),('Julia','','Young','832244955','San Francisco','F',414013.35,'153165053',3),('Brandon','','White','835430078','London','M',96976.62,'153165053',3),('James','','Martin','843717750','San Francisco','M',357829.84,'102038555',5),('Faith','','Collins','847967465','Seattle','F',314418.10,'101571684',4),('Michelle','','Ward','849032522','Boise','F',227334.35,'101571684',4),('Jonathan','','Thompson','854155949','Seattle','M',216872.76,'153165053',3),('Dylan','','Lee','860381565','London','M',617487.07,'101154450',2),('Tyler','','Moore','860832766','Seattle','M',199498.31,'101571684',4),('Madeline','','Morris','863725941','London','F',985786.31,'153165053',3),('Cole','','Richardson','866873014','San Francisco','M',500022.14,'101571684',4),('Zoe','','Murphy','870152970','London','F',221764.32,'101571684',4),('Miguel','','Ortiz','878869247','San Francisco','M',313671.36,'101154450',2),('Isaac','','Evans','879607164','San Francisco','M',799999.59,'101154450',2),('Jordan','','Baker','884807449','Boise','M',361665.72,'153165053',3),('Alejandro','','Perry','885344983','San Francisco','M',480970.24,'102038555',5),('Mia','','Robinson','890073921','San Francisco','F',428923.76,'153165053',3),('Samuel','','Clark','896012044','Boise','M',667864.27,'153165053',3),('Jeremiah','','James','896187673','San Francisco','M',925675.09,'153165053',3),('Olivia','','Jones','905438394','London','F',584880.58,'101571684',4),('Kayla','','White','916514637','Boise','F',651148.10,'102038555',5),('Hailey','','Lewis','918292513','San Francisco','F',190080.12,'101154450',2),('Lillian','','Peterson','921987501','San Francisco','F',977408.23,'102167101',6),('Isabel','','Morales','926438277','London','F',777351.69,'153165053',3),('Mariah','','Russell','936316509','San Francisco','F',493170.39,'102167101',6),('Justin','','PŽrez','940698189','San Francisco','M',443834.30,'101154450',2),('Joshua','','Williams','946313360','Seattle','M',570503.41,'153165053',3),('Makayla','','Phillips','946687014','San Francisco','F',484651.04,'102167101',6),('Caleb','','Wright','948514166','San Francisco','M',330370.69,'153165053',3),('Nathaniel','','Reed','949008496','San Francisco','M',992589.67,'102038555',5),('Caleb','','Wright','953183502','Seattle','M',893946.59,'101571684',4),('Carlos','','G—mez','954504541','Seattle','M',999300.19,'153165053',3),('Cole','','Richardson','957367964','Newyork','M',414803.21,'153165053',3),('Andrew','','Miller','961532374','Newyork','M',636735.29,'101154450',2),('Brian','','Rogers','973590829','San Francisco','M',669892.79,'102167101',6),('Jackson','','Mitchell','973620541','San Francisco','M',200189.94,'100600830',1),('Isabella','','Davis','976093589','London','F',711641.93,'153165053',3),('Tyler','','Moore','978357193','San Francisco','M',864372.97,'102038555',5),('Addison','','Howard','993447467','Seattle','F',66588.57,'101571684',4),('Carson','','Butler','995894500','San Francisco','M',763596.00,'153165053',3);
/*!40000 ALTER TABLE `EMPLOYEE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PROJECT`
--

DROP TABLE IF EXISTS `PROJECT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROJECT` (
  `Pname` varchar(50) NOT NULL,
  `Pnumber` int(11) NOT NULL,
  `Plocation` varchar(15) DEFAULT NULL,
  `Dnum` int(11) NOT NULL,
  PRIMARY KEY (`Pnumber`),
  UNIQUE KEY `Pname` (`Pname`),
  KEY `Dnum` (`Dnum`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`Dnum`) REFERENCES `DEPARTMENT` (`Dnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PROJECT`
--

LOCK TABLES `PROJECT` WRITE;
/*!40000 ALTER TABLE `PROJECT` DISABLE KEYS */;
INSERT INTO `PROJECT` VALUES ('Strong Puppet',1,'Boise',6),('Bleeding Logbook',2,'London',4),('Temporary Cobra',3,'San Francisco',4),('Hideous Navy Crayon',4,'San Francisco',5),('Ninth Emerald',5,'San Francisco',2),('Magenta Shiny Alarm',6,'San Francisco',6),('Butter Red',7,'San Francisco',2),('Hideous Arm',8,'San Francisco',2),('Parachute Shiny',9,'San Francisco',1),('Rusty Eyelid',10,'San Francisco',2),('New Tombstone',11,'Seattle',3),('Tidy Uranium',12,'Seattle',4),('Teal Pluto',13,'Seattle',1),('Barbaric Crystal',14,'Seattle',3),('Black Summer',15,'Boise',3),('Wrench Timely',16,'Newyork',6),('Eastern Cloud',17,'London',3),('Rapid Alpha',18,'Boise',5),('Surreal Timely Tombstone',19,'London',1),('Forgotten Toothbrush',20,'San Francisco',6),('Hideous Sound',21,'San Francisco',6),('Black Proton',22,'San Francisco',4),('Subtle Sleepy Postal',23,'San Francisco',2),('Hot Backpack',24,'San Francisco',5),('Gruesome Wild Morning',25,'San Francisco',3),('Doorstop Itchy',26,'San Francisco',2),('Bulldozer Remote',27,'San Francisco',2),('Freaky Mustard',28,'Seattle',2),('Scorpion Supersonic',29,'Seattle',4),('Burst Dancing',30,'Seattle',5),('Sleepy Serpent',31,'Seattle',5),('Restless Metaphor',32,'Boise',3),('Vital Crossbow',33,'Newyork',5),('Aberrant Shower',34,'London',4),('Blue Grim Torpedo',35,'Boise',4),('Brave Northernmost Steel',36,'London',4),('Lucky Steamy Dog',37,'San Francisco',2),('Rubber Intensive',38,'Boise',2),('Third Crayon',39,'London',4),('Pointless Hideous Butter',40,'San Francisco',3),('Moose Mysterious',41,'San Francisco',5),('Arm Reborn',42,'San Francisco',3),('Lion Empty',43,'San Francisco',4),('Lucky Mountain',44,'San Francisco',3),('Solid Omega',45,'San Francisco',3),('Vegetable Scarlet',46,'San Francisco',2),('Restless Bitter Cloud',47,'San Francisco',4),('Tasty Panther',48,'Seattle',1),('Heavy Fist',49,'Seattle',2),('Beacon Plastic',50,'Seattle',5),('Grim Crystal',51,'Seattle',3),('Ninth Torpedo',52,'Boise',5),('Supersonic Vulture',53,'Newyork',3),('Eastern Doorstop',54,'London',3),('Swallow Mysterious',55,'Boise',5),('Pure Drill',56,'London',3),('Aberrant Permanent Smoke',57,'San Francisco',3),('Rich Wooden Moose',58,'San Francisco',4),('Teal Epsilon',59,'San Francisco',5),('Skilled Sledgehammer',60,'San Francisco',2),('Straw Moose',61,'San Francisco',6),('Ghastly Weather',62,'San Francisco',3),('Mysterious Galaxy',63,'San Francisco',1),('Disappointed Shiny Xylophone',64,'San Francisco',5),('Outstanding Dog',65,'Seattle',1),('Stormy Furious Street',66,'Seattle',3),('Breeze Meaningful',67,'Seattle',2),('Aberrant Bulldozer',68,'Seattle',4),('Pink Rebel Albatross',69,'Boise',2),('Hungry Freaky Finger',70,'Newyork',1),('Ivory Notorious',71,'London',5),('Boiling Sleepy Sledgehammer',72,'Boise',5),('Northernmost Leather',73,'London',3),('Olive Helium',74,'San Francisco',6),('Lost Sound',75,'Boise',5),('Running Flannel',76,'London',5),('Intense Obscure',77,'San Francisco',3),('Pure Ostrich',78,'San Francisco',4),('Northernmost Mars',79,'San Francisco',5),('Harsh Gravel',80,'San Francisco',2),('Stony Crayon',81,'San Francisco',4),('Cheerful Comic',82,'San Francisco',3),('Gold Drill',83,'San Francisco',2),('Icy Puppet',84,'San Francisco',3),('White Sleepy Wrench',85,'Seattle',5),('Reborn Doorstop',86,'Seattle',2),('Timely Zeus',87,'Seattle',5),('Icy Frostbite',88,'Seattle',5),('Old Yard',89,'Boise',2),('Solid Finger',90,'Newyork',2),('Scorpion Early',91,'London',3),('Limousine Official',92,'Boise',2),('Quality Peasant',93,'London',5),('Gruesome Planet',94,'San Francisco',2),('Appropriate Tea',95,'San Francisco',2),('Strong Donut',96,'San Francisco',5),('Wild Spider',97,'San Francisco',3),('Harsh Cosmic',98,'San Francisco',6),('Liquid Lonesome Peasant',99,'San Francisco',3),('Straw Fox',100,'San Francisco',5),('New Ray',101,'San Francisco',4),('Stony Summer',102,'Seattle',1),('Eastern Storm',103,'Seattle',3),('Waffle Teal',104,'Seattle',5),('Digital Oyster',105,'Seattle',3),('Brutal Viper',106,'Boise',3),('Steep Dancing Flag',107,'Newyork',4),('Timely Crystal',108,'London',3),('Serious Frostbite',109,'Boise',4),('Itchy Screwdriver',110,'London',6),('Harsh Morning',111,'San Francisco',3),('Ninth Electron',112,'London',2),('Yellow Firecracker',113,'Boise',5),('New Kangaroo',114,'London',4),('Lucky Plutonium',115,'San Francisco',1),('Indigo Scissors',116,'San Francisco',2);
/*!40000 ALTER TABLE `PROJECT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WORKS_ON`
--

DROP TABLE IF EXISTS `WORKS_ON`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WORKS_ON` (
  `Essn` char(9) NOT NULL,
  `Pno` int(11) NOT NULL,
  `Hours` decimal(3,1) NOT NULL,
  PRIMARY KEY (`Essn`,`Pno`),
  KEY `Pno` (`Pno`),
  CONSTRAINT `works_on_ibfk_1` FOREIGN KEY (`Essn`) REFERENCES `EMPLOYEE` (`Ssn`),
  CONSTRAINT `works_on_ibfk_2` FOREIGN KEY (`Pno`) REFERENCES `PROJECT` (`Pnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WORKS_ON`
--

LOCK TABLES `WORKS_ON` WRITE;
/*!40000 ALTER TABLE `WORKS_ON` DISABLE KEYS */;
INSERT INTO `WORKS_ON` VALUES ('100600830',35,20.0),('100600830',37,10.0),('100600830',68,20.0),('101154450',23,20.0),('101365448',11,20.0),('101365448',28,20.0),('101365448',60,4.0),('101571684',7,15.0),('102038555',10,3.0),('102038555',37,20.0),('102038555',49,15.0),('102167101',12,20.0),('102167101',58,20.0),('102167101',74,10.0),('102290381',8,0.0),('102391698',67,20.0),('102391698',70,15.0),('102391698',76,20.0),('102547670',6,1.0),('102702547',30,20.0),('103800073',6,17.0),('103800073',65,3.0),('103800073',77,4.0),('105162180',32,12.0),('106019727',30,9.0),('106019727',45,20.0),('106019727',78,20.0),('106156373',14,6.0),('106156373',23,4.0),('106156373',70,20.0),('106175264',69,13.0),('107012483',11,12.0),('107012483',17,20.0),('107012483',49,20.0),('107018299',7,4.0),('107018299',12,20.0),('107018299',80,6.0),('107513713',64,20.0),('107537026',66,11.0),('108321321',17,9.0),('108464216',12,20.0),('108464216',57,7.0),('108464216',77,16.0),('108640974',58,20.0),('108766985',72,20.0),('108960926',31,14.0),('109539925',34,8.0),('109566079',64,10.0),('111255833',47,5.0),('113436998',70,20.0),('116038141',68,20.0),('123456789',50,20.0),('123456789',52,5.0),('123456789',68,4.0),('127987528',7,20.0),('137219193',49,20.0),('143013004',58,20.0),('145905469',44,18.0),('146897580',64,18.0),('148096066',63,20.0),('149447554',28,20.0),('152025988',53,20.0),('152750827',49,20.0),('153165053',29,14.0),('157834749',54,20.0),('164035602',69,20.0),('165893029',25,7.0),('166323333',36,15.0),('172043022',23,20.0),('172043022',52,20.0),('172043022',75,17.0),('173532139',7,14.0),('173532139',42,20.0),('173532139',72,20.0),('182046691',11,20.0),('182046691',27,20.0),('182046691',35,14.0),('185087986',25,20.0),('185087986',40,17.0),('185087986',77,7.0),('185164166',25,20.0),('194193160',55,20.0),('198954255',37,6.0),('198954255',74,7.0),('198954255',75,20.0),('202482094',9,20.0),('202482094',26,7.0),('202482094',78,19.0),('204592130',68,20.0),('206325998',15,20.0),('206325998',48,10.0),('206325998',71,20.0),('213217793',65,20.0),('216752398',23,20.0),('217539041',35,7.0),('221186335',1,11.0),('221186335',25,20.0),('221186335',67,6.0),('221768372',35,20.0),('223456789',22,20.0),('224199639',36,20.0),('228641820',26,20.0),('230023176',27,12.0),('230376238',27,20.0),('233577339',10,12.0),('234539919',53,20.0),('237387731',20,5.0),('240885881',32,14.0),('243283441',65,20.0),('243410846',79,5.0),('243599720',10,20.0),('246477770',69,3.0),('247811059',13,17.0),('247811059',14,8.0),('247811059',56,20.0),('248039987',7,20.0),('249785243',26,9.0),('249849795',9,20.0),('251020925',40,20.0),('256049755',37,14.0),('260841567',26,6.0),('260841567',33,20.0),('260841567',39,11.0),('272293575',59,20.0),('272419273',67,9.0),('278591375',45,20.0),('278764478',13,6.0),('280388304',36,20.0),('280990409',14,20.0),('281917658',71,20.0),('283027380',20,13.0),('283380197',53,20.0),('296837757',30,20.0),('300335716',59,14.0),('301906633',12,16.0),('303287455',28,20.0),('306561062',38,20.0),('306561062',53,20.0),('306561062',62,6.0),('308977335',10,12.0),('309246610',26,20.0),('315466028',59,11.0),('315921553',79,20.0),('320090430',7,20.0),('321105199',62,9.0),('321633007',1,10.0),('321814559',30,19.0),('321814559',31,11.0),('321814559',58,20.0),('323290432',58,1.0),('323456789',8,20.0),('326849645',63,20.0),('329466563',6,17.0),('337689542',77,20.0),('339801685',61,20.0),('340612826',52,5.0),('342318690',3,20.0),('342318690',6,20.0),('342318690',63,20.0),('349675990',4,20.0),('358334587',53,20.0),('360329806',58,8.0),('370619268',65,7.0),('377648552',62,1.0),('379337964',33,20.0),('379665922',64,20.0),('383024175',73,4.0),('385891261',62,20.0),('395671951',48,10.0),('398435354',60,9.0),('401544506',47,11.0),('402139305',22,20.0),('403334235',2,19.0),('405545318',39,20.0),('406024015',59,4.0),('409222565',52,20.0),('410842623',4,6.0),('411459232',28,20.0),('414907281',20,20.0),('416643890',7,5.0),('416809538',31,11.0),('417906597',27,16.0),('421645865',46,18.0),('423456789',2,18.0),('424815458',79,20.0),('430536017',37,12.0),('434116790',74,10.0),('436193123',59,20.0),('444590853',31,10.0),('452654266',27,19.0),('460341675',10,20.0),('464745931',1,9.0),('467880015',3,9.0),('470991649',14,20.0),('472278615',23,6.0),('473608343',67,20.0),('475174199',76,6.0),('476395975',66,20.0),('479169879',17,20.0),('479583491',78,12.0),('487821862',38,20.0),('489580918',77,6.0),('490431211',22,20.0),('498558351',67,20.0),('504823810',74,20.0),('510589984',64,20.0),('512233580',35,10.0),('514327696',65,18.0),('516667749',1,20.0),('519282621',46,20.0),('523456789',52,10.0),('524651343',18,19.0),('529583206',61,14.0),('547254546',34,20.0),('547254546',35,19.0),('547254546',77,20.0),('549328325',39,20.0),('550933025',19,11.0),('551402409',11,20.0),('555297090',24,11.0),('558423921',7,20.0),('558423921',48,12.0),('558423921',69,0.0),('559716962',40,20.0),('579181690',35,20.0),('580371717',37,12.0),('580371717',50,13.0),('580371717',55,20.0),('582959263',67,12.0),('587466177',16,19.0),('590033522',65,11.0),('590752990',22,20.0),('591701279',63,10.0),('598708052',40,3.0),('606767140',46,20.0),('612695553',65,14.0),('616854190',4,20.0),('623456789',30,20.0),('623846578',16,0.0),('629448052',59,20.0),('631265448',44,20.0),('639211095',34,5.0),('640467763',71,8.0),('642866267',21,0.0),('645013108',45,1.0),('645408636',73,20.0),('648088877',24,20.0),('650520535',18,5.0),('652599185',27,11.0),('653815620',30,20.0),('654614611',58,20.0),('655245985',12,5.0),('655568196',9,1.0),('678325950',15,20.0),('681968180',18,20.0),('686577571',74,11.0),('693079090',23,20.0),('698574814',40,20.0),('699281889',59,20.0),('702991608',7,20.0),('712118749',4,20.0),('715836096',22,5.0),('716904543',4,20.0),('718356822',45,20.0),('722108157',54,11.0),('723456789',44,20.0),('734783088',63,19.0),('737587797',60,17.0),('738455694',18,17.0),('738520455',66,20.0),('742563623',17,20.0),('744459069',21,20.0),('746003950',1,17.0),('747363679',46,19.0),('748341678',58,19.0),('753521368',35,20.0),('753521368',44,20.0),('753521368',75,20.0),('759129944',79,17.0),('766251694',37,0.0),('767711085',74,20.0),('768253114',52,11.0),('768648915',73,17.0),('777863516',24,20.0),('778006055',18,20.0),('781557659',48,20.0),('784157044',74,20.0),('787365949',10,20.0),('787421163',10,20.0),('788327896',79,13.0),('790655350',78,20.0),('791385336',3,17.0),('791537427',66,20.0),('798593330',22,7.0),('803382196',36,12.0),('804468290',6,20.0),('807562098',46,20.0),('812199213',23,20.0),('812861121',76,20.0),('812985793',3,20.0),('813103156',76,20.0),('813141680',32,19.0),('819474523',79,20.0),('820825233',25,20.0),('823136509',74,20.0),('832244955',57,17.0),('835430078',66,20.0),('843717750',44,12.0),('847967465',20,15.0),('849032522',74,20.0),('854155949',22,20.0),('860381565',79,20.0),('860832766',20,19.0),('863725941',59,6.0),('866873014',30,20.0),('870152970',64,10.0),('878869247',37,12.0),('879607164',79,4.0),('884807449',39,2.0),('885344983',60,20.0),('890073921',61,20.0),('896012044',12,20.0),('896187673',78,20.0),('905438394',64,13.0),('916514637',23,20.0),('918292513',43,17.0),('921987501',48,17.0),('926438277',11,11.0),('936316509',9,19.0),('940698189',26,20.0),('946313360',65,14.0),('946687014',63,20.0),('948514166',9,20.0),('949008496',52,6.0),('953183502',5,19.0),('954504541',78,20.0),('957367964',38,20.0),('961532374',24,6.0),('973590829',79,20.0),('973620541',8,19.0),('973620541',54,20.0),('973620541',73,20.0),('976093589',24,12.0),('978357193',63,20.0),('993447467',74,16.0),('995894500',38,20.0);
/*!40000 ALTER TABLE `WORKS_ON` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `dept_info`
--

DROP TABLE IF EXISTS `dept_info`;
/*!50001 DROP VIEW IF EXISTS `dept_info`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `dept_info` (
  `DEPT_NAME` tinyint NOT NULL,
  `NO_OF_EMPS` tinyint NOT NULL,
  `TOTAL_SAL` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `employees_managed`
--

DROP TABLE IF EXISTS `employees_managed`;
/*!50001 DROP VIEW IF EXISTS `employees_managed`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `employees_managed` (
  `ManagerFName` tinyint NOT NULL,
  `ManagerLname` tinyint NOT NULL,
  `count(*)` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `management`
--

DROP TABLE IF EXISTS `management`;
/*!50001 DROP VIEW IF EXISTS `management`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `management` (
  `ManagerFName` tinyint NOT NULL,
  `ManagerLname` tinyint NOT NULL,
  `EmployeeFname` tinyint NOT NULL,
  `EmployeeLName` tinyint NOT NULL,
  `Department` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `works_on1`
--

DROP TABLE IF EXISTS `works_on1`;
/*!50001 DROP VIEW IF EXISTS `works_on1`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `works_on1` (
  `FNAME` tinyint NOT NULL,
  `LNAME` tinyint NOT NULL,
  `PNAME` tinyint NOT NULL,
  `HOURS` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `dept_info`
--

/*!50001 DROP TABLE IF EXISTS `dept_info`*/;
/*!50001 DROP VIEW IF EXISTS `dept_info`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `dept_info` AS select `department`.`Dname` AS `DEPT_NAME`,count(0) AS `NO_OF_EMPS`,sum(`employee`.`Salary`) AS `TOTAL_SAL` from (`department` join `employee`) where (`department`.`Dnumber` = `employee`.`Dno`) group by `department`.`Dname` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `employees_managed`
--

/*!50001 DROP TABLE IF EXISTS `employees_managed`*/;
/*!50001 DROP VIEW IF EXISTS `employees_managed`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `employees_managed` AS select `management`.`ManagerFName` AS `ManagerFName`,`management`.`ManagerLname` AS `ManagerLname`,count(0) AS `count(*)` from `management` group by `management`.`ManagerFName`,`management`.`ManagerLname` order by `management`.`ManagerFName`,`management`.`ManagerLname` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `management`
--

/*!50001 DROP TABLE IF EXISTS `management`*/;
/*!50001 DROP VIEW IF EXISTS `management`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `management` AS select `E1`.`FNAME` AS `ManagerFName`,`E1`.`LName` AS `ManagerLname`,`E2`.`FNAME` AS `EmployeeFname`,`E2`.`LName` AS `EmployeeLName`,`E2`.`Dno` AS `Department` from (`employee` `E1` join `employee` `E2`) where (`E1`.`Ssn` = `E2`.`Super_ssn`) order by `ManagerFName`,`ManagerLname` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `works_on1`
--

/*!50001 DROP TABLE IF EXISTS `works_on1`*/;
/*!50001 DROP VIEW IF EXISTS `works_on1`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `works_on1` AS select `employee`.`FNAME` AS `FNAME`,`employee`.`LName` AS `LNAME`,`project`.`Pname` AS `PNAME`,`works_on`.`Hours` AS `HOURS` from ((`employee` join `project`) join `works_on`) where ((`employee`.`Ssn` = `works_on`.`Essn`) and (`works_on`.`Pno` = `project`.`Pnumber`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-03-12 19:26:52

/*
SQLyog Enterprise - MySQL GUI v6.13
MySQL - 5.6.17 : Database - db_socialnetwork
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

create database if not exists `db_socialnetwork`;

USE `db_socialnetwork`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `comments` */

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` varchar(128) NOT NULL,
  `msg_id_fk` int(10) NOT NULL,
  `uid_fk` int(10) NOT NULL,
  `ip` varchar(45) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `uid_fk` (`msg_id_fk`,`uid_fk`),
  KEY `FK_comments_users` (`uid_fk`),
  CONSTRAINT `FK_comments_messages` FOREIGN KEY (`msg_id_fk`) REFERENCES `messages` (`msg_id`),
  CONSTRAINT `FK_comments_users` FOREIGN KEY (`uid_fk`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `comments` */

/*Table structure for table `errors` */

DROP TABLE IF EXISTS `errors`;

CREATE TABLE `errors` (
  `errorId` int(11) NOT NULL AUTO_INCREMENT,
  `errorCode` int(3) NOT NULL,
  `serviceName` varchar(100) NOT NULL,
  `occured` datetime NOT NULL,
  PRIMARY KEY (`errorId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `errors` */

/*Table structure for table `followers` */

DROP TABLE IF EXISTS `followers`;

CREATE TABLE `followers` (
  `follower_id` int(11) NOT NULL AUTO_INCREMENT,
  `uid_fk` int(10) NOT NULL,
  `following_uid` int(10) NOT NULL,
  `status` enum('0','1','2') DEFAULT '0',
  PRIMARY KEY (`follower_id`),
  KEY `uid_fk` (`uid_fk`),
  KEY `FK_followers_users` (`following_uid`),
  CONSTRAINT `FK_followers_fusers` FOREIGN KEY (`following_uid`) REFERENCES `users` (`uid`),
  CONSTRAINT `FK_followers_users` FOREIGN KEY (`uid_fk`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `followers` */

insert  into `followers`(`follower_id`,`uid_fk`,`following_uid`,`status`) values (2,2,2,'2'),(3,3,3,'2'),(4,4,4,'2'),(5,4,2,'1'),(6,2,3,'1'),(7,2,3,'1'),(8,2,3,'1'),(9,5,5,'2'),(10,5,2,'1'),(11,2,5,'1');

/*Table structure for table `friends` */

DROP TABLE IF EXISTS `friends`;

CREATE TABLE `friends` (
  `friend_id` int(11) NOT NULL AUTO_INCREMENT,
  `uid_fk` int(10) NOT NULL,
  `friendto_uid` int(10) NOT NULL,
  `status` enum('0','1','2') DEFAULT '0',
  PRIMARY KEY (`friend_id`),
  KEY `uid_fk` (`uid_fk`),
  KEY `FK_follow_fusers` (`friendto_uid`),
  CONSTRAINT `FK_follow_fusers` FOREIGN KEY (`friendto_uid`) REFERENCES `users` (`uid`),
  CONSTRAINT `FK_follow_users` FOREIGN KEY (`uid_fk`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `friends` */

insert  into `friends`(`friend_id`,`uid_fk`,`friendto_uid`,`status`) values (2,2,2,'2'),(3,3,3,'2'),(4,4,4,'2'),(5,4,2,'1'),(6,3,2,'1'),(7,3,4,'1'),(8,5,5,'2'),(9,5,2,'0'),(10,5,4,'1'),(11,5,3,'1');

/*Table structure for table `likes` */

DROP TABLE IF EXISTS `likes`;

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL AUTO_INCREMENT,
  `msg_id_fk` int(10) NOT NULL,
  `uid_fk` int(10) NOT NULL,
  PRIMARY KEY (`like_id`),
  KEY `msg_id_fk` (`msg_id_fk`,`uid_fk`),
  KEY `FK_likes_users` (`uid_fk`),
  CONSTRAINT `FK_likes_messages` FOREIGN KEY (`msg_id_fk`) REFERENCES `messages` (`msg_id`),
  CONSTRAINT `FK_likes_users` FOREIGN KEY (`uid_fk`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `likes` */

/*Table structure for table `messages` */

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `msg_id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(200) DEFAULT NULL,
  `uid_fk` int(10) NOT NULL,
  `ip` varchar(45) DEFAULT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`msg_id`),
  KEY `uid_fk` (`uid_fk`),
  CONSTRAINT `FK_messages_users` FOREIGN KEY (`uid_fk`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `messages` */

insert  into `messages`(`msg_id`,`message`,`uid_fk`,`ip`,`created`) values (4,'testss',2,'132.178.129.41',1412722242),(6,'fdasfdsafdas',2,'132.178.129.41',1412729658),(7,'fsdafdsaf',2,'132.178.129.41',1412785174);

/*Table structure for table `queues` */

DROP TABLE IF EXISTS `queues`;

CREATE TABLE `queues` (
  `qId` int(11) NOT NULL AUTO_INCREMENT,
  `serviceName` varchar(100) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `totalTime` double NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '0',
  PRIMARY KEY (`qId`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=latin1;

/*Data for the table `queues` */

insert  into `queues`(`qId`,`serviceName`,`startTime`,`endTime`,`totalTime`,`status`) values (16,'GetAllPendingIncomingRequests','2014-10-27 18:42:31','2014-10-27 18:42:31',4,'0'),(17,'GetAllPendingOutgoingRequests','2014-10-27 18:42:32','2014-10-27 18:42:32',9,'0'),(18,'GetAllFriends','2014-10-27 18:42:33','2014-10-27 18:42:33',8,'1'),(19,'GetUserID','2014-10-27 18:42:36','2014-10-27 18:42:36',2,'1'),(20,'PostMessage','2014-10-27 18:42:42','2014-10-27 18:42:42',12,'1'),(21,'PostMessage','2014-10-27 18:42:45','2014-10-27 18:42:45',8,'1'),(22,'PostMessage','2014-10-27 18:42:50','2014-10-27 18:42:50',8,'1'),(23,'DeleteMessage','2014-10-27 18:42:53','2014-10-27 18:42:53',8,'1'),(24,'Login','2014-10-27 18:43:15','2014-10-27 18:43:15',7,'1'),(25,'GetMessageDetails','2014-10-27 18:43:16','2014-10-27 18:43:16',12,'1'),(26,'DeleteMessage','2014-10-27 18:43:23','2014-10-27 18:43:23',7,'1'),(27,'GetMessageDetails','2014-10-27 18:43:23','2014-10-27 18:43:23',6,'1'),(28,'GetAllUsers','2014-10-27 18:43:26','2014-10-27 18:43:26',12,'1'),(29,'GetAllUsers','2014-10-27 18:43:27','2014-10-27 18:43:27',7,'1'),(30,'SendFriendRequest','2014-10-27 18:43:29','2014-10-27 18:43:29',7,'1'),(31,'GetAllUsers','2014-10-27 18:43:29','2014-10-27 18:43:29',7,'1'),(32,'GetAllFollowers','2014-10-27 18:43:31','2014-10-27 18:43:31',8,'1'),(33,'GetMessageDetails','2014-10-27 18:43:34','2014-10-27 18:43:34',7,'1'),(34,'GetAllPendingIncomingRequests','2014-10-27 18:43:35','2014-10-27 18:43:35',8,'1'),(35,'GetAllPendingOutgoingRequests','2014-10-27 18:43:35','2014-10-27 18:43:35',8,'1'),(36,'GetAllFollowers','2014-10-27 18:43:37','2014-10-27 18:43:37',8,'1'),(37,'GetAllFriends','2014-10-27 18:43:38','2014-10-27 18:43:38',7,'1'),(38,'GetAllUsers','2014-10-27 18:43:39','2014-10-27 18:43:39',8,'1'),(39,'SendFriendRequest','2014-10-27 18:43:41','2014-10-27 18:43:41',7,'1'),(40,'GetAllUsers','2014-10-27 18:43:41','2014-10-27 18:43:41',6,'1'),(41,'PostMessage','2014-10-27 18:43:45','2014-10-27 18:43:45',14,'1'),(42,'GetMessageDetails','2014-10-27 18:43:45','2014-10-27 18:43:45',6,'1'),(43,'PostMessage','2014-10-27 18:43:48','2014-10-27 18:43:48',8,'1'),(44,'GetMessageDetails','2014-10-27 18:43:48','2014-10-27 18:43:48',7,'1'),(45,'GetMessageDetails','2014-10-27 18:43:50','2014-10-27 18:43:50',8,'1'),(46,'RetweetThisMessage','2014-10-27 18:43:52','2014-10-27 18:43:52',6,'1'),(47,'GetMessageDetails','2014-10-27 18:43:52','2014-10-27 18:43:52',8,'1'),(48,'DeleteMessage','2014-10-27 18:43:53','2014-10-27 18:43:53',7,'1'),(49,'GetMessageDetails','2014-10-27 18:43:53','2014-10-27 18:43:53',7,'1'),(50,'Login','2014-10-27 20:51:44','2014-10-27 20:51:44',12,'1'),(51,'GetMessageDetails','2014-10-27 20:51:45','2014-10-27 20:51:45',108,'1'),(52,'Register','2014-10-27 21:04:43','2014-10-27 21:04:43',28,'1'),(53,'GetMessageDetails','2014-10-27 21:04:44','2014-10-27 21:04:44',12,'1'),(54,'GetMessageDetails','2014-10-27 21:04:46','2014-10-27 21:04:46',4,'1'),(55,'GetAllUsers','2014-10-27 21:04:49','2014-10-27 21:04:49',7,'1'),(56,'SendFriendRequest','2014-10-27 21:04:50','2014-10-27 21:04:50',8,'1'),(57,'GetAllUsers','2014-10-27 21:04:50','2014-10-27 21:04:50',7,'1'),(58,'GetAllUsers','2014-10-27 21:04:51','2014-10-27 21:04:51',2,'1'),(59,'GetAllFollowers','2014-10-27 21:04:53','2014-10-27 21:04:53',3,'1'),(60,'GetAllPendingIncomingRequests','2014-10-27 21:04:54','2014-10-27 21:04:54',10,'1'),(61,'GetAllPendingOutgoingRequests','2014-10-27 21:04:55','2014-10-27 21:04:55',9,'1'),(62,'GetUserID','2014-10-27 21:04:56','2014-10-27 21:04:56',2,'1'),(63,'GetMessageDetails','2014-10-27 21:04:58','2014-10-27 21:04:58',7,'1'),(64,'LogOut','2014-10-27 21:05:02','2014-10-27 21:05:02',3,'1'),(65,'Login','2014-10-27 21:05:06','2014-10-27 21:05:06',3,'1'),(66,'GetMessageDetails','2014-10-27 21:05:06','2014-10-27 21:05:06',7,'1'),(67,'GetAllUsers','2014-10-27 21:05:07','2014-10-27 21:05:07',7,'1'),(68,'SendFriendRequest','2014-10-27 21:05:10','2014-10-27 21:05:10',7,'1'),(69,'GetAllUsers','2014-10-27 21:05:10','2014-10-27 21:05:10',7,'1'),(70,'GetAllUsers','2014-10-27 21:05:12','2014-10-27 21:05:12',9,'1'),(71,'LogOut','2014-10-27 21:05:13','2014-10-27 21:05:13',7,'1'),(72,'Login','2014-10-27 21:05:22','2014-10-27 21:05:22',1,'1'),(73,'GetMessageDetails','2014-10-27 21:05:22','2014-10-27 21:05:22',7,'1'),(74,'GetAllFriends','2014-10-27 21:05:24','2014-10-27 21:05:24',7,'1'),(75,'GetAllFollowers','2014-10-27 21:05:25','2014-10-27 21:05:25',7,'1'),(76,'GetAllPendingIncomingRequests','2014-10-27 21:05:26','2014-10-27 21:05:26',8,'1'),(77,'GetAllPendingOutgoingRequests','2014-10-27 21:05:27','2014-10-27 21:05:27',3,'1'),(78,'GetAllPendingIncomingRequests','2014-10-27 21:05:29','2014-10-27 21:05:29',4,'1'),(79,'GetAllFriends','2014-10-27 21:05:31','2014-10-27 21:05:31',7,'1'),(80,'GetAllUsers','2014-10-27 21:05:33','2014-10-27 21:05:33',7,'1'),(81,'SendFriendRequest','2014-10-27 21:05:35','2014-10-27 21:05:35',17,'1'),(82,'GetAllUsers','2014-10-27 21:05:35','2014-10-27 21:05:35',8,'1'),(83,'SendFriendRequest','2014-10-27 21:05:38','2014-10-27 21:05:38',7,'1'),(84,'GetAllUsers','2014-10-27 21:05:38','2014-10-27 21:05:38',6,'1'),(85,'LogOut','2014-10-27 21:05:39','2014-10-27 21:05:39',2,'1'),(86,'Login','2014-10-27 21:05:45','2014-10-27 21:05:45',7,'1'),(87,'GetMessageDetails','2014-10-27 21:05:45','2014-10-27 21:05:45',7,'1'),(88,'GetAllPendingIncomingRequests','2014-10-27 21:05:47','2014-10-27 21:05:47',16,'1'),(89,'GetAllPendingIncomingRequests','2014-10-27 21:05:48','2014-10-27 21:05:48',8,'1'),(90,'GetAllPendingIncomingRequests','2014-10-27 21:05:49','2014-10-27 21:05:49',12,'1'),(91,'LogOut','2014-10-27 21:05:51','2014-10-27 21:05:51',12,'1'),(92,'Login','2014-10-27 21:05:55','2014-10-27 21:05:55',1,'1'),(93,'GetMessageDetails','2014-10-27 21:05:55','2014-10-27 21:05:55',2,'1'),(94,'GetAllFriends','2014-10-27 21:05:56','2014-10-27 21:05:56',2,'1'),(95,'GetAllPendingIncomingRequests','2014-10-27 21:06:04','2014-10-27 21:06:04',2,'1'),(96,'GetAllPendingOutgoingRequests','2014-10-27 21:06:05','2014-10-27 21:06:05',6,'1'),(97,'GetAllPendingOutgoingRequests','2014-10-27 21:06:07','2014-10-27 21:06:07',2,'1'),(98,'GetUserID','2014-10-27 21:06:08','2014-10-27 21:06:08',2,'1'),(99,'GetMessageDetails','2014-10-27 21:06:10','2014-10-27 21:06:10',2,'1'),(100,'GetAllUsers','2014-10-27 21:06:11','2014-10-27 21:06:11',11,'1'),(101,'SendFriendRequest','2014-10-27 21:06:13','2014-10-27 21:06:13',2,'1'),(102,'GetAllUsers','2014-10-27 21:06:13','2014-10-27 21:06:13',2,'1'),(103,'LogOut','2014-10-27 21:06:15','2014-10-27 21:06:15',2,'1'),(104,'Login','2014-10-27 21:06:20','2014-10-27 21:06:20',2,'1'),(105,'GetMessageDetails','2014-10-27 21:06:20','2014-10-27 21:06:20',0,'1'),(106,'GetAllPendingIncomingRequests','2014-10-27 21:06:22','2014-10-27 21:06:22',2,'1'),(107,'GetAllPendingIncomingRequests','2014-10-27 21:06:23','2014-10-27 21:06:23',11,'1'),(108,'GetMessageDetails','2014-10-27 21:06:25','2014-10-27 21:06:25',2,'1'),(109,'GetAllFriends','2014-10-27 21:06:27','2014-10-27 21:06:27',6,'1'),(110,'GetMessageDetails','2014-10-27 21:06:31','2014-10-27 21:06:31',2,'1');

/*Table structure for table `retweets` */

DROP TABLE IF EXISTS `retweets`;

CREATE TABLE `retweets` (
  `retweet_id` int(11) NOT NULL AUTO_INCREMENT,
  `msg_id_fk` int(11) NOT NULL,
  `uid_fk` int(11) NOT NULL,
  `created` int(10) DEFAULT NULL,
  PRIMARY KEY (`retweet_id`),
  KEY `FK_retweets_messages` (`msg_id_fk`),
  KEY `FK_retweets_uesrs` (`uid_fk`),
  CONSTRAINT `FK_retweets_uesrs` FOREIGN KEY (`uid_fk`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `retweets` */

insert  into `retweets`(`retweet_id`,`msg_id_fk`,`uid_fk`,`created`) values (3,2,2,1384005903),(4,3,2,1384018250),(5,3,2,1412623355),(6,8,2,1412791891);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `friends_count` int(11) DEFAULT NULL,
  `followers_count` int(11) DEFAULT NULL,
  `profile_img` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`uid`,`firstname`,`lastname`,`username`,`password`,`email`,`friends_count`,`followers_count`,`profile_img`) values (2,'aaaaaa','aaaaaa','aaaaaa','aaaaaa','aa@aa.aaa',0,0,NULL),(3,'mmmmmm','mmmmmm','mmmmmm','mmmmmm','mm@mm.mmm',0,0,NULL),(4,'bbbbbb','bbbbbb','bbbbbb','bbbbbb','bb@bb.bbb',0,0,NULL),(5,'nnnnnnn','nnnnnn','nnnnnn','nnnnnn','nnn@nn.bbb',0,0,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

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

/*Table structure for table `errors` */

DROP TABLE IF EXISTS `errors`;

CREATE TABLE `errors` (
  `errorId` int(11) NOT NULL AUTO_INCREMENT,
  `errorCode` int(3) NOT NULL,
  `serviceName` varchar(100) NOT NULL,
  `occured` datetime NOT NULL,
  PRIMARY KEY (`errorId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

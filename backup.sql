-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nodejs_sql
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `gender` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` double NOT NULL,
  `role` varchar(45) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `register`
--

LOCK TABLES `register` WRITE;
/*!40000 ALTER TABLE `register` DISABLE KEYS */;
INSERT INTO `register` VALUES (1,'nguyen','man','m','nguyentrongminhman95@gmail.com','$2a$10$eladKaBuJbgQDGKCfG3/7ugJ9rESvr2lpzOPo60Sx94NOwXYf1NKK',908096448,'admin'),(2,'nguyen','man','m','nguyentrongminman15@gmail.com','$2a$10$AQqH6saExqB3u70wraglveqna1hhwjqt4EVBrtcAWmFLPjaoWA5nu',908096448,'user'),(3,'dsads','dasdsa','dasdsa','1221','$2a$10$FljG3Qst71VFRNoJsivzDOo6Xk22bGP9z1NX/r0s..CNkiU6nPkTK',1222312,'user'),(4,'dasdsadas','dsdsaads','121','asasdsa','$2a$10$plJD82jBbxeNeuG0nzSh2OSB9aKU5tP0we6lZUIR9ziNyKx6JHZh2',123213,'user'),(5,'tesst','mgien','sda','dsadasasd','$2a$10$xKEl8eYNv.opmo8RqUKjq.XAuZ7sj/g4q3c1M5BQ62ztSA7yVjEUW',213321231,'user'),(6,'asdadsa','adsdas','dasasd','asddas','$2a$10$7eJJ/Dq21LwEATnP94MBAeEV4CNdOiK9MrUKD6MY7fYF.aOMKuqti',111,'user'),(9,'saddsa','dassda','dasdas','adsdsa','$2a$10$bHww168q39VqvJNcg2d7aO0oxcgR6WAa7GF6GZyjsVDi0a2yfhV/m',1221123,'user'),(10,'Man','Nguyen','sdasd','nguyentrongminhman915@gmail.com','$2a$10$fM8U5pDJ3D/ofedWF0bws.QOL8UIAwJatiI3PDg4EKAZ7WRRuua.y',908096448,'user'),(11,'Man','Nguyen','asddas','nguyentrongminhman911115@gmail.com','$2a$10$.90x/3B14h2WxFlTDXbUWutY7o5aYqhlsFqbn0Sw5U5UL8Zm0oh/W',908096448,'user'),(12,'Man','Nguyen','m','quangthanhliet@gmail.com','$2a$10$ktYIBxbV49LAxXNG9ZrwUeJusL8AdQLCP6CAnvfwrnDAK1C1CgaYu',908096448,'user'),(13,'Man','adsdsasad','m','nguyentrongminhman951@gmail.com','$2a$10$OBejxkAN3pERde.kWU0bYOWmHp7cY/WvMyA.8BbTfZsEc2K5j6yR.',908096448,'user');
/*!40000 ALTER TABLE `register` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-06 20:06:52

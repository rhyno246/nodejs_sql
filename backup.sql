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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `categoryUserId_idx` (`userId`),
  CONSTRAINT `categoryUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (10,'Bóng Đá','bong-da',228,'2023-03-04 23:19:40'),(11,'Nhận Định','nhan-dinh',228,'2023-03-04 23:19:54'),(12,'Hậu Trường','hau-truong',228,'2023-03-04 23:20:40'),(13,'Chuyển Nhượng','chuyen-nhuong',228,'2023-03-04 23:21:49'),(14,'Bóng Rổ','bong-ro',228,'2023-03-04 23:22:00'),(15,'Tin  Game','tin-game',228,'2023-03-05 00:56:39');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `createAt` datetime DEFAULT NULL,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userId_idx` (`userId`),
  KEY `postId_idx` (`postId`),
  CONSTRAINT `commentUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `userId` int NOT NULL,
  `status` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (14,'dsadsaasd','http://localhost:8000/g_4.jpg','dasdasasd','<p>sadasdasdsdsa</p>',228,'show','chuyen-nhuong','2023-03-07 21:35:16'),(16,'ádsdadsdsdas','http://localhost:8000/Liverpool-lai-danh-roi-diem-so-1.jpg','dassadsad','',228,'show','bong-ro','2023-03-06 21:57:32'),(17,'tesst','http://localhost:8000/Djokovic-Alcaraz-kinh-dich-1.jpg','tesst','',228,'show','tin-game','2023-03-07 21:35:33'),(25,'dfgfdgdfggfd','http://localhost:8000/so-sanh-Messi-va-James-Ward-Prowse-sut-phat-1.jpg','','<p>gfdfgdfgdfdg</p>',228,'show','bong-da','2023-03-05 00:54:56'),(26,'new tesst','http://localhost:8000/so-sanh-Messi-va-James-Ward-Prowse-sut-phat-1.jpg','asddsadsasd','<p>dsadasadsdasadsdasasd</p>\r\n<p>saioufhgioausghoisdafhoiasfdh</p>\r\n<p>lksnafdlkds&nbsp;</p>\r\n<p><img src=\"http://localhost:8000/mceu_40373724011677947651183.jpg\"></p>',228,'show','bong-ro','2023-03-05 00:30:06'),(27,'dasasddsa','http://localhost:8000/Liverpool-lai-danh-roi-diem-so-1.jpg','Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','<p>sdasadsdasaasddsa</p>',228,'show','chuyen-nhuong','2023-03-05 00:23:27'),(28,'ngu','http://localhost:8000/g_6.jpg','ngu','<p>sdadsadasdasasdds</p>',228,'show','hau-truong','2023-03-07 21:35:22'),(29,'sdadsddas','http://localhost:8000/g_9.jpg','Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','<p>dasadsadsadsds</p>',228,'hide','nhan-dinh','2023-03-08 22:28:39'),(34,'test','http://localhost:8000/Saka-va-Martinelli-1.jpg','dasasddsadsasda','<p>asddsadsadsadas</p>\r\n<p><img src=\"http://localhost:8000/mceu_10807288511678291365284.jpg\"></p>',228,'show','bong-da','2023-03-08 23:02:47'),(35,'sokhdsohfdos','http://localhost:8000/Nadal-suy-sup-tinh-than-1.jpg','dsadsadasadsadsasdadsads','<p>dsadsadsaads</p>\r\n<p><img src=\"http://localhost:8000/mceu_55864109911678291978761.jpg\"></p>',228,'show','bong-ro','2023-03-08 23:13:12');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stories`
--

DROP TABLE IF EXISTS `stories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stories`
--

LOCK TABLES `stories` WRITE;
/*!40000 ALTER TABLE `stories` DISABLE KEYS */;
INSERT INTO `stories` VALUES (14,'http://localhost:8000/Djokovic-Alcaraz-kinh-dich-1.jpg',228,'2023-03-03 20:56:52'),(15,'http://localhost:8000/Liverpool-lai-danh-roi-diem-so-1.jpg',228,'2023-03-03 20:56:55'),(16,'http://localhost:8000/so-sanh-Messi-va-James-Ward-Prowse-sut-phat-1.jpg',228,'2023-03-03 20:56:59'),(17,'http://localhost:8000/Chelsea-lot-xac-4.jpg',228,'2023-03-08 21:06:40'),(18,'http://localhost:8000/kane-va-osimhen-2.jpg',228,'2023-03-08 21:06:46'),(19,'http://localhost:8000/Kim-Schiele-fan-nu-Dortmund-Reus-1.jpg',228,'2023-03-08 21:06:54'),(20,'http://localhost:8000/Nadal-suy-sup-tinh-than-1.jpg',228,'2023-03-08 21:07:01'),(21,'http://localhost:8000/vong-26-ngoai-hang-anh-2-2.jpg',228,'2023-03-08 21:07:09');
/*!40000 ALTER TABLE `stories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stories_image`
--

DROP TABLE IF EXISTS `stories_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stories_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `storiesId` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `storiesId_idx` (`storiesId`),
  CONSTRAINT `storiesId` FOREIGN KEY (`storiesId`) REFERENCES `stories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stories_image`
--

LOCK TABLES `stories_image` WRITE;
/*!40000 ALTER TABLE `stories_image` DISABLE KEYS */;
INSERT INTO `stories_image` VALUES (26,'test_1','http://localhost:8000/Liverpool-lai-danh-roi-diem-so-1.jpg',16,'2023-03-03 20:57:08'),(27,'test_2','http://localhost:8000/so-sanh-Messi-va-James-Ward-Prowse-sut-phat-1.jpg',16,'2023-03-03 20:57:16');
/*!40000 ALTER TABLE `stories_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `gender` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `showpass` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` double NOT NULL,
  `coverPic` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `profilePic` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` varchar(45) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'user',
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=242 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (228,'liet','quang 1','m','quangthanhliet@gmail.com','$2a$10$0NUHRc8fUutryGUES/lCEuwz.wvifmMxLkbrqkGdP8yNbwZjcfhha','admin',908096448,'http://localhost:8000/Mangekyou_Sharingan_Itachi.svg.png','http://localhost:8000/mceu_18946827821676301135832.jpg','admin','2023-01-01 17:56:58'),(238,'man','nguyen','m','nguyentrongminhman95@gmail.com','$2a$10$.ezf3Dbj.6JVyzSqEG2lReCOiNmMlP9D92sS39TGeUlPw7LwoO1qG','admin',908096448,NULL,NULL,'admin','2023-01-02 17:56:58'),(239,'test 1','nguyen','m','test@gmail.com','$2a$10$DeMcpNl2M6POf9YL2kc30ecJ5NJOYKviVGjq0fYhxQtuswVfh7BNS','admin',908096448,NULL,NULL,'content','2023-01-04 17:58:57'),(240,'saddsa','adssad','dsasda','2121','$2a$10$u/ElwcYO65ztTPwfRrXWG.IEWjS2ieK7KD2jA3mvryEdRWin.j/py','dsdsasda',212321,NULL,NULL,'content','2023-03-04 22:34:14'),(241,'dsadsdas','dsasdaads','sadsda','2e321','$2a$10$FgiBemS.o3vl7N2oSjeOOOLYQS95RotCLQCpFW9EFPyu1PxYWcQdS','sdads',232323,NULL,NULL,'user','2023-03-04 22:34:23');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-08 23:40:23

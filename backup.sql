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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (7,'Bóng e','bong-e',228,'2023-02-23 19:48:33'),(8,'Bóng Rổ','bong-ro',228,'2023-02-22 21:57:43');
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
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `commentId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `likesUserId_idx` (`userId`),
  KEY `likesCommentId_idx` (`commentId`),
  CONSTRAINT `likesCommentId` FOREIGN KEY (`commentId`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likesUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (13,'uchiha itachi 11111','http://localhost:8000/hinh1.png','description 1','<p>đasadsaadsdsa oiksdhjfoidhfoihfdsoi oidsgfjhoi0dhfoihdfgohjgfdsoihfgd</p>\r\n<p><img src=\"http://localhost:8000/mceu_18946827821676301135832.jpg\" width=\"1280\" height=\"720\"></p>',228,'show','tennis','2023-02-17 21:33:17'),(14,'dsadsaasd','http://localhost:8000/hinh1.png','dasdasasd','<p>sadasdasdsdsa</p>',228,'show','bong-ro','2023-02-17 21:24:22'),(15,'dsadsadas','http://localhost:8000/Mangekyou_Sharingan_Itachi.svg.png','dasdasdas','<p>dsadasdsada</p>',228,'show','tennis','2023-02-17 21:25:57'),(16,'ádsdadsdsdas','http://localhost:8000/hinh2.png','dassadsad','',228,'show','bong-ro','2023-02-23 19:53:38'),(17,'tesst','http://localhost:8000/Mangekyou_Sharingan_Itachi.svg.png','tesst','',228,'show','bong-ro','2023-02-21 21:50:34'),(22,'dsadsadas','http://localhost:8000/mceu_18946827821676301135832.jpg','','<p>hfghghgfghhgf</p>',228,'show','','2023-02-26 17:13:39'),(24,'sdsdadsa',NULL,'','',228,'show','','2023-02-25 17:01:29');
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
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `storiesUserId_idx` (`userId`),
  CONSTRAINT `storiesUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stories`
--

LOCK TABLES `stories` WRITE;
/*!40000 ALTER TABLE `stories` DISABLE KEYS */;
INSERT INTO `stories` VALUES (7,'http://localhost:8000/hinh1.png',228,'2023-02-25 18:36:40'),(10,'http://localhost:8000/Liverpool-lai-danh-roi-diem-so-1.jpg',228,'2023-02-26 15:38:33');
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
  CONSTRAINT `storiesId` FOREIGN KEY (`storiesId`) REFERENCES `stories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stories_image`
--

LOCK TABLES `stories_image` WRITE;
/*!40000 ALTER TABLE `stories_image` DISABLE KEYS */;
INSERT INTO `stories_image` VALUES (6,'osikdfhnoikdsfhiofdshoisdfh','http://localhost:8000/mceu_18946827821676301135832.jpg',7,'2023-02-26 16:58:01'),(7,'saddsdasdas','http://localhost:8000/hinh1.png',7,'2023-02-26 15:10:37'),(8,'title 12222','http://localhost:8000/Djokovic-Alcaraz-kinh-dich-1.jpg',10,'2023-02-26 17:04:35'),(9,'title 2','http://localhost:8000/Liverpool-lai-danh-roi-diem-so-1.jpg',10,'2023-02-26 15:39:41'),(10,'title 3','http://localhost:8000/so-sanh-Messi-va-James-Ward-Prowse-sut-phat-1.jpg',10,'2023-02-26 15:39:50');
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=237 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (228,'liet','quang 1','m','quangthanhliet@gmail.com','$2a$10$0NUHRc8fUutryGUES/lCEuwz.wvifmMxLkbrqkGdP8yNbwZjcfhha','admin',908096448,'http://localhost:8000/Mangekyou_Sharingan_Itachi.svg.png','http://localhost:8000/mceu_18946827821676301135832.jpg','admin'),(229,'fđs','sdffds','fsdfsd','fdssd','$2a$10$FLrEW7Y2GATGnHFmzx8DGOGxvs.Qb45aZK1tAoNYEEBUBJ5cC28mi','fdsdsf',23223,NULL,NULL,'user'),(230,'man','nguyen','m','nguyentrongminhman95@gmail.com','$2a$10$lW/cGGMJH7TGmEyvlk0iEes4V8cABPpDRSo/7Ruixyut3et4S8Kpa','admin',908096448,'http://localhost:8000/Mangekyou_Sharingan_Itachi.svg.png','http://localhost:8000/vfvfff.jpeg','admin'),(231,'nguyen','jaden','m','jaden@gmail.com','$2a$10$oqX5LBUop9ZVOyNnKSasF.ZVbyA0dfvbmtwZb9y8e1FSBvU/m5lpC','admin',9080964548,NULL,NULL,'content'),(232,'man','nguyen','nam','manman@gmail.com','$2a$10$r270ZICMvrkRP/HwGGaaW.ZMNGVjP29lmaBik6iRMWkvTttggg8Z6','admin',123456789,'http://localhost:8000/Mangekyou_Sharingan_Itachi.svg.png',NULL,'user'),(233,'tesst','ijusadoikj','qloksad','tesst@gmail.com','$2a$10$tP36V0vgWWXTjRRln0dnpOMWbh6sBS0kSlHKs1tg4Awu3mqgYBm2e','admin',123321,'https://cafebiz.cafebizcdn.vn/2019/1/2/photo-1-15464020829431420592113.png',NULL,'user'),(234,'sdadsadas','saddsaasd','m','saddsaas@gmail.com','$2a$10$lVfx6V/4C./dx7d5cbDAHej/XDutW/Bwm15SpGmT5KR3kLLeLfbNC','asdasdasd',4355435543,NULL,NULL,'content'),(235,'dfgfgfd','gfdfdgdgf','','man@gmail.com','$2a$10$yGL9IZNHn3JFqEPZX8wV1udV0FxDAI7V1Voyd9BVBQTiARNihU2I.','minhman',999999,NULL,NULL,'content'),(236,'asdadsasd','sadsadasd','','sadsdadsa','$2a$10$52MwwubH3.R8v/t.mAkzee6djG7fFbcyb2qRezz5EwIYt/yrMrzZK','dsasdadas',232321,NULL,NULL,'content');
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

-- Dump completed on 2023-02-26 22:18:58

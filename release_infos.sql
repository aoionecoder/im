/*
 Navicat Premium Data Transfer

 Source Server         : private
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : 47.102.222.254:3306
 Source Schema         : im

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 27/07/2019 17:28:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for release_infos
-- ----------------------------
DROP TABLE IF EXISTS `release_infos`;
CREATE TABLE `release_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `author` varchar(30) NOT NULL,
  `author_id` int(11) NOT NULL,
  `pic_url` text,
  `game_name` varchar(30) DEFAULT NULL,
  `game_region` varchar(30) DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `voice_url` text,
  `good_at` varchar(255) DEFAULT NULL,
  `release_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;

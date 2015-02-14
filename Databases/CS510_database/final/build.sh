#!/bin/sh

javac -d ./ -classpath .:./lib/log4j-1.2.17.jar:./lib/mysql-connector-java-5.1.27-bin.jar src/*.java

#!/bin/sh

if [ $# -eq 0 ]; then
    echo "Usage: ./run.sh Final <prog-args>"
    exit 1
fi

java -cp .:./lib/log4j-1.2.17.jar:./lib/mysql-connector-java-5.1.27-bin.jar "$@"


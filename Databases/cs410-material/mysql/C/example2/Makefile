
CFG=mysql_config
CC = gcc
CFLAGS = -Wall -g -gstabs+ `$(CFG) --cflags`
LIBS = `$(CFG) --libs`

all: client2

client2: client2.o common.o common.h 
	$(CC) $(CFLAGS) -o client2  client2.o common.o $(LIBS)

clean:
	rm -f client2 *.o

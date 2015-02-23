
CFG=mysql_config
CC = gcc
CFLAGS = -Wall -g -gstabs+ `$(CFG) --cflags`
LIBS = `$(CFG) --libs`

all: client3

client3: client3.o common.o common.h 
	$(CC) $(CFLAGS) -o client3  client3.o common.o $(LIBS)

clean:
	rm -f client3 *.o

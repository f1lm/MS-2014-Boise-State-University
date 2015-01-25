
CFG=mysql_config
CC = gcc
CFLAGS = -Wall -g -gstabs+ `$(CFG) --cflags`
LIBS = `$(CFG) --libs`

all: client1

client1.o: client1.c client1.h
	$(CC) -c $(CFLAGS) client1.c

client1: client1.o 
	$(CC) $(CFLAGS) -o client1 client1.o $(LIBS)

clean:
	rm -f client1 *.o

INCLUDE=.
CC=gcc
CFLAGS=-Wall -g -I$(INCLUDE)
OBJECTS=Element.o Stack.o StackTester.o

all: StackTest

StackTest: $(OBJECTS) 
	$(CC) $(CFLAGS) -o $@ $(OBJECTS)  $(LFLAGS)

clean:
	rm -f StackTest *.o
	
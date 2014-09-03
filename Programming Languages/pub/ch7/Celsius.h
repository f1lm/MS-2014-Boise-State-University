#ifndef CELSIUS_H
#define CELSIUS_H

class Celsius;

#include "Fahrenheit.h"

#include <iostream>
using namespace std;

class Fahrenheit;

class Celsius {
public:
  Celsius(int c);
  operator Fahrenheit();
  friend ostream& operator<<(ostream &os, const Celsius& o);
private: int c;
};

#endif

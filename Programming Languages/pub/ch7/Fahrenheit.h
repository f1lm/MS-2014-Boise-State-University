#ifndef FAHRENHEIT_H
#define FAHRENHEIT_H

class Fahrenheit;

#include "Celsius.h"

#include <iostream>
using namespace std;

class Fahrenheit {
public:
  Fahrenheit(int f);
  operator Celsius();
  friend ostream& operator<<(ostream &os, const Fahrenheit& o);
private: int f;
};

#endif

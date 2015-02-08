//1st Example - primitive: pass by value
function myfunction(x)
{
      // x is equal to 4
      x = 5;
      // x is now equal to 5
}
var x = 4;
alert(x); // x is equal to 4
myfunction(x); 
alert(x); // x is still equal to 4

//2nd Example - object: pass by reference
function myobject()
{
	this.value = 5;
}
var o = new myobject();
alert(o.value); // o.value = 5
function objectchanger(fnc)
{
	fnc.value = 6;
}
objectchanger(o);
alert(o.value); // o.value is now equal to 6

//3rd Example - function: pass by value not reference
function myobject()
{
	this.value = 5;
}
myobject.prototype.add = function()
{
	this.value++;
}
var o = new myobject();
alert(o.value); // o.value = 5
o.add();
alert(o.value); // o.value = 6
function objectchanger(fnc)
{
	fnc(); // runs the function being passed in
}
objectchanger(o.add);
alert(o.value); // sorry, still just 6

//4th Example - this: pertains to the object you are within
function myobject(x) {
	this.value = x;
}
var o1 = myobject(1);
var o2 = myobject(2);
alert(o1.value);	//o.value = 1
alert(o2.value);	//o.value = 2

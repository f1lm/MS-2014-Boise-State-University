
Object subclass: Customer [
	|name|

	Customer class [
		new: n[
			^super new init: n
		]
	]

	init: n[
		name:=n	
	]

	toString [
		^name
	]
]


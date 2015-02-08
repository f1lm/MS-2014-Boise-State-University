
Object subclass: Account [
	|number customer balance|

	balance [
		^balance
	]
	
	deposit: a[
		balance:= balance + a
	]

	withdraw: a[
		balance:= balance - a
	]

	toString [
		|s|
		s:=number,':',(customer toString),':',(balance printString).
		^s
	]
]


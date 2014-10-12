"Smalltalk banking application"
"Account Object"

Object subclass: Account [
    |number customer balance|
	 
	accrue: rate [ 
		^self subclassResponsibility
	]
	
	
	balance [
		<category: 'return balance'>
		^balance
	]
	
	deposit: amount[
		<category: 'deposit money'>
		balance := balance + amount
	]
	
	withdraw: amount[ 
		<category: 'withdraw money'>
		balance := balance - amount
	]
	
	toString [
		<category: 'printing customer detail'>
		^number, ':', (customer toString), ':', (balance asString)
	]
]
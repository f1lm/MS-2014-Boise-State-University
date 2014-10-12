"Smalltalk banking application"
"Bank Object"

Object subclass: Bank [
	|accounts|
	
	Bank class [
        new [
            ^super new init
        ]
    ]
	
	init [
		<category: 'initialization of accounts'>
        accounts := Set new
    ]
	
	add: account[
		<category: 'add customer account'>
        accounts add: account		
    ]
	
	accrue: rate [
		accounts do: [ :x | x accrue: rate]
    ]
	
	toString [
		<category: 'string formatting'>
		|r|
		r := ''.
		accounts do: [ :x | r:= (r, (x toString), (Character nl asString))].
		^r  	
	]
]

|Bank| bank := Bank new.
|Customer| c := Customer name: 'Ann'.
(bank add: (CheckingAccount number: '01001' customer: c balance: 100.00)).
(bank add: (SavingsAccount number: '01002' customer: c balance: 200.00)).
bank accrue: 0.02.
(bank toString) printNl
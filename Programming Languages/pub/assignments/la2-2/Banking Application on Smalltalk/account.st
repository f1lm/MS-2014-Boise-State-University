"Smalltalk banking application"
"Account Object"

Object subclass: Account [
    instanceVariableNames: 'number customer balance '
    classVariableNames: ' '
    poolDictionaries: ' '
	category: 'Account' !
	 
	accrue: rate
	 
	Account class [
        new [			
			^super new
        ]
    ]
	
	balance[
		^balance
	]
	
	deposit[ : amount
		balance := balance + amount.
	]
	
	withdraw[ : amount
		balance := balance - amount.
	]
	
	toString[
        ^number + ':' + customer + ':' + balance.
    ]
	 
	 
]
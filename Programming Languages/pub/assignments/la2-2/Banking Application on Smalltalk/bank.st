"Smalltalk banking application"
"Bank Object"

Object subclass: Bank [
	instanceVariableNames: 'accounts '
    classVariableNames: ' '
    poolDictionaries: ' '
	category: 'Bank' !
	
	Bank class [
        new [
            ^super new init
        ]
    ]
	
	init [
         <category: 'initialization'>
         accounts := Set new Account
         ^super init
    ]
	
	add[ : account
        super accounts add: account		
    ]
	
	accrue[ : rate
		self accounts do: [ :Account |
			Account accrue: rate].
    ]
	
	toString[
		|r|
		r := ""
		self accounts do: [ :Account |
			r := r + account + '\n'].
		^r
    ]
]

bank := Bank new.
c := Customer name: 'Ann'
bank add: CheckingAccount number: '01001' weight: c balance: 100.00
bank add: SavingsAccount number: '01002' weight: c balance: 200.00
bank accrue : 0.02
bank printNl
"Smalltalk banking application"
"SavingsAccount Object"

Account subclass: SavingsAccount [
	|interest|
	
	SavingsAccount class [
		number: num customer: cust balance: bal [
        	^super new number: num customer: cust balance: bal
        ]
    ]	
	
	init [
		<category: 'initialization'>
        interest:=0
    ]
	
	number: n customer: c balance: b[
		"initialization of interest."
		self init.
		
		"Set the number, customer and balance values of a Account."
		number := n.
		customer := c.
		balance := b
	]

    accrue: rate[ 
		balance := balance + (balance * rate).		
		interest := interest + (balance * rate)
	]
]
"Smalltalk banking application"
"CheckingAccount Object"

Account subclass: CheckingAccount [
	
	CheckingAccount class [
        number: num customer: cust balance: bal [
        	^super new number: num customer: cust balance: bal
        ]
    ]

	number: n customer: c balance: b [	
		"Set the number, customer and balance values of a Account."		
		number := n.
		customer := c.
		balance := b
	]

    accrue: rate[ 
	
	]
]
"Smalltalk banking application"
"CheckingAccount Object"

Account subclass: CheckingAccount [
	instanceVariableNames: 'number weight balance '
	classVariableNames: ' '
	poolDictionaries: ' '
	category: 'CheckingAccount' !
	
	CheckingAccount class [
        new [			
			^super new
        ]
    ]

	!CheckingAccount class methodsFor: 'instance creation' !
	number: n customer: c balance: b
	
		"Set the number, customer and balance values of a Account."
		
		number := n.
		customer := c.
		balance := b
	! !

    accrue[ : rate
	
	]
]
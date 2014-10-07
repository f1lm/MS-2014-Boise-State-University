"Smalltalk banking application"
"SavingsAccount Object"

Account subclass: SavingsAccount [
	|interest|
	instanceVariableNames: 'number weight balance '
	classVariableNames: ' '
	poolDictionaries: ' '
	category: 'SavingsAccount' !
	
	SavingsAccount class [
        new [
            ^super new init
        ]
    ]	
	
	init [
        interest:=0
    ]

	!SavingsAccount class methodsFor: 'instance creation' !
	number: n customer: c balance: b

		"Set the number, customer and balance values of a Account."

		number := n.
		customer := c.
		balance := b
	! !

    accrue[ : rate
		balance := balance + balance * rate.
		interest := interest + balance * rate.
	]
]
"Smalltalk banking application"
"Customer Object"

Object subclass: Customer [	
    instanceVariableNames: 'name '
    classVariableNames: ' '
    poolDictionaries: ' '
	category: 'Customer' !
	
    Customer class [
        new [
			name
			^super new
        ]
    ]
	
	toString[
        ^name
    ]
]
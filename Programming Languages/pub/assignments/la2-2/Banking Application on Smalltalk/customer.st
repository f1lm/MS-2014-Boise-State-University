"Smalltalk banking application"
"Customer Object"

Object subclass: Customer [	
    |name|   
	
	Customer class [
        name: n[
        	^super new name: n
        ]        
    ]
	
	name: n [	
		<category: 'set customer name'>
		name := n
	]
	
	toString [
		<category: 'printing customer name'>
    	^name
    ]
]
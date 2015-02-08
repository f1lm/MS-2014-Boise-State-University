
Account subclass: CheckingAccount [
	
	CheckingAccount class [
		new: n customer: c balance: b [
			^super new init: n customer: c balance: b
		]
	]

	init: n customer: c balance: b [
		number:=n.
		customer:=c.
		balance:=b
	]

	accrue: r []

]


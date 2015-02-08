
Account subclass: SavingsAccount [
	|interest|
	SavingsAccount class [
		new: n customer: c balance: b [
			^super new init: n customer: c balance: b
		]
	]

	init: n customer: c balance: b[
		number:=n.
		customer:=c.
		balance:=b.
		interest:=0
	]
	
	accrue: r [
		balance:= balance + (balance * r).
		interest:= interest + (interest * r)
	]
]


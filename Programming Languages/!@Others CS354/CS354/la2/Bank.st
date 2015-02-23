
Object subclass: Bank [
	|accounts|

	Bank class [
		new [
			^super new init
		]
	]

	init [
		accounts:= Set new
	]

	add: a [
		accounts add: a
	]

	accrue: r [
		accounts do:[:account|
			(account accrue: r)
		]
	]

	toString [
		|s|
		s:=''.
		accounts do:[:account|
			s:=s, (account toString),(Character nl asString)
		].
		^s
	]
]

"This is the main method if you will, used for testing."

|bank| bank:=Bank new.
|custName| custName:='Chad'.
|c| c:=Customer new: custName.
|checkAcctNum| checkAcctNum:='12345'.
|saveAcctNum| saveAcctNum:='54321'.
|b| b:=100.
|checkAcct| checkAcct:=CheckingAccount new: checkAcctNum customer: c balance: b.
|saveAcct| saveAcct:=SavingsAccount new: saveAcctNum customer: c balance: b.
(bank add: checkAcct).
(bank add: saveAcct).
(bank toString) printNl
(bank accrue: 0.02).
(bank toString) printNl


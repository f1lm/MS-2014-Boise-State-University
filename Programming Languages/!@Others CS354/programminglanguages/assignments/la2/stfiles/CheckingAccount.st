Account subclass: CheckingAccount [

    CheckingAccount class [
        new [
            ^super new init
        ]
    ]

    init [
        balance:=0.0.
        customer:=0.0.
        number:=0.0
    ]

    withBalance: newbalance [
        balance:= newbalance
    ]

    withNumber: newNumber [
        number:= newNumber
    ]

    withCustomer: newCustomer [
        customer:= newCustomer
    ]

    accrue: rate [
        
    ]

]

|account| (((account:=CheckingAccount new withBalance:10) withCustomer:(Customer new withName: 'reuben')) withNumber:10)
account asString

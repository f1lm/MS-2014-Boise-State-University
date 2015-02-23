Account subclass: SavingsAccount [
    |interest|

    SavingsAccount class [
        new [
            ^super new init
        ]
    ]

    init [
        interest:=0.0.
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
        balance:= balance + (balance*rate).
        interest:= interest + (interest*rate)
    ]
]

|account| (((account:=SavingsAccount new withBalance:10) withCustomer:(Customer new withName: 'reuben')) withNumber:10)
account asString
account accrue:20.0
account balance

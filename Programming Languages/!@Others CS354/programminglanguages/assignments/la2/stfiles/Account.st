Object subclass: Account [
    |number|
    |customer|
    |balance|

    balance [
        ^balance
    ]

    deposit: amount [
        balance := balance + amount
    ]

    withdraw: amount [
        balance := balance - amount
    ]

    asString [
       ^number asString,':',customer asString,':',balance asString
    ]

    accrue: rate [
        ^self subclassResponsibility
    ]

]

"|account| account:=Account new."
"account balance"
"account toString"
"account deposit: 10"
"account balance"
"account withdraw: 10"
"account balance"
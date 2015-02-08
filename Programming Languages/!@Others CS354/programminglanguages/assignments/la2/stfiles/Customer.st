Object subclass: Customer [
    |name|

    Customer class [
        new [
            ^super new init
        ]
    ]

    init [
        name:=''
    ]

    withName: newName [
        name:= newName
    ]

    asString [
       ^name asString
    ]
]

|customer| customer:= Customer new withName: 'reuben'
customer asString

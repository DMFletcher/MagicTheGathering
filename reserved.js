var mtgjson = require ('mtgjson');

var reservedSets = ["LEB" , "ARN" , "ATQ" , "LEG" , "DRK" , "FEM"  ];
mtgjson(function(err,data){
    if (err) throw err;
    for (i = 0 ; i < data.ARB.cards.length ; i++){
        if (data.ARB.cards[i].reserved = true){
            console.log(data.ARB.cards[i].name);
            console.log(data.ARB.cards[i].reserved);
        }
    }

});
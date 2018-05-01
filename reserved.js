
//var http = require('http');
var mtgjson = require('mtgjson');
var fs = require('fs');
//list of sets with reserved list cards
var reservedSets = ["2ED", "ARN", "ATQ", "LEG", "DRK", "FEM", "ICE", "HML", "ALL",
    "MIR", "VIS", "WTH", "TMP", "STH", "EXO", "USG", "ULG", "UDS"];


var weirdSets = ["CHR", "POR", "UGL", "P02", "ATH", "PTK", "S99", "BRB", "BTD",
    "DKM"];
var otherWeirdSets = ["Renaissance", "Salvat"];
//var fso = new ActiveXObject("Scripting.FileSystemObject");
//var a = fso.CreateTextFile("./testfile.txt", true);
//a.WriteLine("This is a test.");
//a.Close();

var cardProps = [
    "name",
    "artist",
    "cmc",
    "multiverseid",
    "id",
    "manaCost",
    "rarity",
    "type",
    "variations",
    "power",
    "toughness",
    "flavor",
    "releaseDate",
    "reserved"
]
mtgjson(function (err, data) {

    if (err) {
        console.log(err);
        //throw err;
    }
    else {
        //console.log(reservedSets.length);
        //console.log(data);
        for(var prop in data){
            console.log(prop);

        // }
        // for (j = 0; j < reservedSets.length; j++) {

            var cardSet = data[prop];

            var fileName = "./sets/" + prop + '.csv';

            //create a writing stream to our text file
            var logger = fs.createWriteStream(fileName, { flags: 'w', autoClose: true });
            for (k = 0; k < cardProps.length; k++) {
                if (k == 0)
                    logger.write("\"" + cardProps[k] + "\"");
                else
                    logger.write("| \"" + cardProps[k] + "\"");
            }
            logger.write("\r\n");

            //            console.log(logg.cards.length);
            for (i = 0; i < cardSet.cards.length; i++) {
                //console.log(logg.cards[i].rarity);
                //console.log(logg.cards[i].reserved);
                //  if (cardSet.cards[i].rarity.toUpperCase() == "RARE" && cardSet.cards[i].reserved) {
                for (k = 0; k < cardProps.length; k++) {
                    var output;
                    if (typeof cardSet.cards[i][cardProps[k]] === 'string')
                    output = cardSet.cards[i][cardProps[k]].replace("\"","\\\"");
                    
                    else output = cardSet.cards[i][cardProps[k]];
                    
                    if (k == 0)
                        logger.write("\"" + output + "\"");
                    else
                        logger.write("| \"" + output + "\"");
                }
                logger.write("\r\n");
                //  }
            }
            logger.end();
        }
    }
});

    //        
    //      console.log(logg);

    //       console.log(l);


    //var F = new Function(logg)
    //return(F);


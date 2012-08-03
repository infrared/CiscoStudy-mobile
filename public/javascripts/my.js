
myNext   = $( "#myNext ");
myGiveUp = $( "#myGiveUp" );
myGuess  = $( "#myGuess" );

function randomIP() {
    var myIP = [ Math.floor((Math.random()*255)+1), Math.floor((Math.random()*255)+1), Math.floor((Math.random()*255)+1), Math.floor((Math.random()*255)+1) ];
    return myIP;
    
}
    
function randomMask() {
    var mask = Math.floor((Math.random()*23)+8);
    var string = "";
    for(i=0;i<mask;i++) {
        string += "1";
    }
    var zeros = 32 - mask;
    
    for(i=0;i<zeros;i++) {
        string += "0";    
    }
    
    var one   = string.substring(0,8);
    var two   = string.substring(8,16);
    var three = string.substring(16,24);
    var four  = string.substring(24,32);
    
   
    function bin2dec(n) {
        var binaryNumber = parseInt(n,2);
        var decimalNumber = binaryNumber.toString(10);
        return decimalNumber;

    }
   
    var netmask = [ bin2dec(one), bin2dec(two), bin2dec(three), bin2dec(four)];
    
    var myHash = { cidr: mask, dot: netmask };

    return myHash;
}
function networkAddress(ip,netmask) {
    var network = [ (ip[0] & netmask[0]), (ip[1] & netmask[1]), (ip[2] & netmask[2]), (ip[3] & netmask[3]) ];
    return network.join('.');
}

function startQuiz() {
    var ip = randomIP();
    var mask = randomMask();
    var answer = networkAddress(ip,mask.dot);
    var question1 = "Given the IP address and subnet mask:";
    var question2 = "Network address is?";

    $( "#question1").text(question1);
    $( "label[for='myGuess']" ).text(question2);
    
    $( "#quiz" ).fadeOut(function() { $(this).text( ip.join('.') + "/" + mask.cidr ).fadeIn();});
    $( "#myGuess" ).fadeIn();
    $( "#myGuess" ).val("");
    $( "#myGuess" ).attr("disabled",false);
    $( "#myNext" ).hide();
    $( "#myGiveUp" ).show();
    $( "#myAnswer" ).hide();
    $( "#myAnswer" ).text(answer);
    //return result;
}
function giveUp() {
    var answer = $( "#myAnswer" ).text();
    $( "label[for='myGuess']" ).text(":(  " + answer);
    $( "#myGuess ").hide();
    $( "#myGiveUp" ).hide();
    $( "#myNext" ).show();
            
}
function checkAnswer() {
    var myGuess  = document.getElementById('myGuess').value;//$( "#answer" ).value;
    var myAnswer = $( "#myAnswer").text();

    if(myGuess.length > 0) {
        
    
        var distance = levenshtein(myGuess, myAnswer);
   
        var myArray = [ "AWESOME!", "getting close!", "think you got what it takes?" ];
   
        if (distance < 3) {
            var response = myArray[distance];
            $( "label[for='myGuess']" ).text(response);
            
            if(distance < 1) {
                //answer is correct

                $( "#myGuess" ).css("background-color: #41A317");
                $( "#myGuess" ).attr("disabled",true);
                $( "#myNext" ).fadeIn();
                $( "#myGiveUp" ).hide();
                
            }
        }
        else {
            $( "label[for='myGuess']" ).text("good luck!");
            
        }
    }
}



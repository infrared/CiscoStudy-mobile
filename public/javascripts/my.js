function randomIP() {
    var myIP = Math.floor((Math.random()*255)+1) + "." + Math.floor((Math.random()*255)+1) + "." + Math.floor((Math.random()*255)+1) + "." + Math.floor((Math.random()*255)+1);
    answer = myIP;
    return myIP;
    
}
    
function randomMask() {
    var mask = Math.floor((Math.random()*23)+8);
    answer += "/" + mask;
    return mask;
}

function startQuiz() {
    var ip = randomIP();
    var mask = randomMask();
    var answer = ip + "/" + mask;
    var question1 = "Given the IP address and subnet mask:";
    var question2 = "Network address is?";

    $( "#question1").text(question1);
    $( "label[for='myGuess']" ).text(question2);
    $( "#quiz").text( ip + "/" + mask );
    $( "#myNext" ).hide();
    $( "#myGuess" ).show();
    $( "#myGiveUp" ).show();
    $( "#myAnswer" ).hide();
    $( "#myAnswer" ).text(answer);
    //return result;
}
function giveUp() {
    var answer = $( "#myAnswer" ).text();
    $( "label[for='myGuess']" ).text(":(");
    $( "#myGuess ").replaceWith(answer);
    $( "#myGiveUp" ).replaceWith( $( "#myNext") );
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
                $( "#myGuess" ).replaceWith(myAnswer);
                $( "#myGiveUp" ).replaceWith( $( "#myNext") );
                $( "#myNext" ).show();
                
            }
        }
        else {
            $( "label[for='myGuess']" ).text("good luck!");
            
        }
    }
}



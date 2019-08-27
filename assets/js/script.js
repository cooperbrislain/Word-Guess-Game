var wordsArray = [
    'hypernormalization',
    'snowcrash',
    'cryptonomicon',
    'alllowercase',
    'laputinmachine',
    'panopticon',
    'polybius',
    'god',
    'jesus',
    'password',
    'nimda',
    '123456'
];

var theWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
var triedLetters = [];
var tries = 10;

function terminal_log(message) {
    var node = document.createElement('li');
    node.innerHTML = message;
    document.querySelector('.terminal').appendChild(node);
}
console.log(theWord);

for (var i=0; i<theWord.length; i++) {
    var node = document.createElement("li");
    node.innerHTML = '&nbsp;';
    document.querySelector('.letters').appendChild(node);
}

terminal_log('Type a character to attempt to crack');
terminal_log(`You have ${tries} failed attempts remaining`);

document.addEventListener('keydown', (e) => {
    console.log(e.key);
    switch (e.key) {
        case '?':
            terminal_log(`Characters tried: ${triedLetters.join()}`);
            break;
        default:
            rx = new RegExp(/^[a-z]$/);
            if(e.key.match(rx)) {
                if (triedLetters.indexOf(e.key) == -1) {
                    triedLetters.push(e.key);
                    terminal_log(`Trying character: '${e.key}'`);
                    var found_count = 0;
                    for (i=0; i<theWord.length;i++) {
                        var letterNode = document.querySelector('.letters').childNodes[i+1];
                        letterNode.innerHTML = '*';
                        if (theWord[i] == e.key) {
                            found_count++;
                            letterNode.innerHTML = theWord[i].toUpperCase();
                        }
                    } 
                    if (found_count) {
                        terminal_log(`hash for ${e.key} found ${found_count} time${found_count>1?'s':''}`);
                    } else {
                        terminal_log('Pattern not found.');
                        tries--;
                        if (tries == 0) {
                            terminal_log('YOU FAIL');
                        } else {
                            terminal_log(`You have ${tries} failed attempt${tries>1?'s':''} remaining.`);
                        }
                    }
                } else {
                    terminal_log('Character already cracked');
                }
            } else {
                terminal_log('Not a valid character');
            }
    }
    
});

document.querySelector('.asterisk').addEventListener('mouseenter', e => {
    var theToolTip = document.querySelector('.tooltip');
    console.log(e.clientX, e.clientY);
    theToolTip.style.left = e.clientX+'px';
    theToolTip.style.top = e.clientY+'px';
    theToolTip.style.display = 'block';
});

document.querySelector('.asterisk').addEventListener('mouseleave', e => {
    document.querySelector('.tooltip').style.display = 'none';
});
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
    'wormwood',
    'password',
    'nimda',
    'deliverator',
    'pizza',
    'mockingbird',
    'valis',
    'pravda',
    'torchwood',
    'oligarchy',
    'cambridge',
    'blackwater',
    'nakamoto'
];


var triedLetters = [];
var tries = 10;

var difficulties = [
    {
        'label' : 'Skript Kiddie',
        'attempts' : 10,
        'min_length' : 0
    },
    {
        'label' : 'Hacker',
        'attempts' : 8,
        'min_length' : 6
    },
    {
        'label' : '1337',
        'attempts' : 5,
        'min_length' : 8
    }
]

function terminal_log(message) {
    var node = document.createElement('li');
    var terminal = document.querySelector('.terminal');
    node.innerHTML = message;
    terminal.appendChild(node);
    terminal.scrollTop = terminal.scrollHeight;
}

var WordGame = {
    theWord: '',
    tries: 10,
    triedLetters: [],
    start: function() {
        // initialize
        var letterContainer = document.querySelector('.letters');
        var child = letterContainer.lastElementChild;  
        while (child) { 
            letterContainer.removeChild(child); 
            child = letterContainer.lastElementChild; 
        } 
        this.tries = 10;
        // begin
        this.theWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
        terminal_log('Type a character to attempt to crack');
        terminal_log(`You have ${this.tries} failed attempts remaining`);
        
        for (var i=0; i<this.theWord.length; i++) {
            var node = document.createElement("li");
            node.innerHTML = '&nbsp;';
            letterContainer.appendChild(node);
        }
    },
    lose: function() {

    },
    win: function() {

    },
    check_letter: function(letter) {
        var letterContainer = document.querySelector('.letters');
        if (this.triedLetters.indexOf(letter) == -1) {
            this.triedLetters.push(letter);
            terminal_log(`Trying character: '${letter}'`);
            var found_count = 0;
            for (i=0; i<this.theWord.length;i++) {
                var letterNode = letterContainer.childNodes[i+1];
                if (!letterNode.classList.contains('cracked')) {
                    letterNode.innerHTML = '*';
                    setTimeout(function(letterNode) {
                        if(!letterNode.classList.contains('cracked')) {
                            letterNode.innerHTML = '&nbsp;';
                        }
                    },250,letterNode);
                }
                if (this.theWord[i] == letter) {
                    found_count++;
                    letterNode.innerHTML = this.theWord[i].toUpperCase();
                    letterNode.classList.add('cracked');
                }
            } 
            if (found_count) {
                terminal_log(`hash for ${letter} found ${found_count} time${found_count>1?'s':''}`);
                if (!document.querySelector('.letters li:not(.cracked)')) {
                    terminal_log(`YOU HACKED THE GIBSON!`);
                }
            } else {
                terminal_log('Pattern not found.');
                this.tries--;
                if (this.tries == 0) {
                    terminal_log('YOU FAIL');
                } else {
                    terminal_log(`You have ${this.tries} failed attempt${this.tries>1?'s':''} remaining.`);
                }
            }
        } else {
            terminal_log('Character already cracked');
        }
    }
};

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'Enter':
            break;  
        case 'Shift':
            break;
        case '?':
            terminal_log(`Characters tried: ${triedLetters.join()}`);
            break;
        default:
            rx = new RegExp(/^[a-z]$/);
            if(e.key.match(rx)) {
                WordGame.check_letter(e.key);
            } else {
                terminal_log('Not a valid character');
            }
    } 
});

var tooltipTimeout; 

document.querySelector('.asterisk').addEventListener('mouseenter', e => {
    if (tooltipTimeout) clearTimeout(tooltipTimeout);
    var theToolTip = document.querySelector('.tooltip');
    console.log(e.clientX, e.clientY);
    theToolTip.style.left = e.clientX+'px';
    theToolTip.style.top = e.clientY+'px';
    theToolTip.style.display = 'block';
});

document.querySelector('.asterisk').addEventListener('mouseleave', e => {
    tooltipTimeout = setTimeout(function() {
        document.querySelector('.tooltip').style.display = 'none';
    }, 500);
});

WordGame.start();
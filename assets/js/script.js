var wordsArray = [
    'hypernormalization',
    'snowcrash',
    'cryptonomicon',
    'stochastic',
    'gaslighting'
];

var theWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
var triedLetters = [];
var tries = 10;

console.log(theWord);

for (var i=0; i<theWord.length; i++) {
    var node = document.createElement("li");
    node.innerHTML = theWord[i].toUpperCase();
    document.querySelector('.letters').appendChild(node);
}

document.querySelector('.tries_display').innerHTML = `You have ${tries} guesses.`;

document.addEventListener('keydown', (e) => {
    console.log(e.key);
    rx = new RegExp(/^[a-z]$/);
    if(e.key.match(rx)) {
        console.log('alpha');
        if (triedLetters.indexOf(e.key) == -1) {
            triedLetters.push(e.key);
            var tries_remaining = tries-triedLetters.length;
            document.querySelector('.tries_display').innerHTML = (tries_remaining? `You have ${tries_remaining} guesses remaining.` : 'You have failed.');
            var node = document.createElement('li');
            node.innerHTML = e.key.toUpperCase();
            document.querySelector('.tried_letters').appendChild(node);
            var node = document.createElement("li");
            for (i=0; i<theWord.length;i++) {
                if (theWord[i] == e.key) {
                    document.querySelector('.letters').childNodes[i+1].classList.add('revealed');
                }
            }  
        } else {
            console.log('not alpha');
        }
    }
});
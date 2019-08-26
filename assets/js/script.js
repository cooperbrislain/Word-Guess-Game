var wordsArray = [
    'hypernormalization',
    'snowcrash',
    'cryptonomicon',
    'stochastic',
    'gaslighting'
];

var theWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
var triedLetters = [];

console.log(theWord);

for (var i=0; i<theWord.length; i++) {
    var node = document.createElement("li");
    node.innerHTML = theWord[i];
    document.querySelector('.letters').appendChild(node);
}

document.addEventListener('keydown', (e) => {
    console.log(e.key);
    rx = new RegExp(/[a-z]/);
    if(e.key.match(rx)) {
        console.log('alpha');
        if (triedLetters.indexOf(e.key) == -1) {
            triedLetters.push(e.key);
            var node = document.createElement('li');
            node.innerHTML = e.key;
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






const template1 = 'The ${adjective} brown ${noun} ${adverb} ' +
                '${verb} the ${adjective} yellow ' +
                '${noun}, who ${adverb} ${verb} his ' +
                '${noun} and looks around.';

  const template2 = "The ${noun} ${verb} the ${noun}'s ${noun}.";

function madlibs(template) {
   let nouns = ["fox", "dox", 'head', 'leg', 'tail','cat']
   let verbs =  ['jumps', 'lifts', 'bites', 'licks', 'pats']
   let adjectives = ['quick', 'lazy', 'sleepy', 'noisy', 'hungry']
   let adverbs = ['easily', 'lazily', 'noisily', 'excitedly']
  return template.replace(/\$\{(\w+)}/g, (match, key) => {
    if(key === "noun") return  randomWord(nouns)
    else if(key === "verb") return  randomWord(verbs)
    else if (key === "adjective") return  randomWord(adjectives)
    else if (key === "adverb") return  randomWord(adverbs)

})
                  
}
function randomWord(words){
    return words[Math.floor(Math.random() * words.length)]
}




console.log(madlibs(template1));
// The "sleepy" brown "cat" "noisily"
// "licks" the "sleepy" yellow
// "dog", who "lazily" "licks" his
// "tail" and looks around.

madlibs(template1);
// The "hungry" brown "cat" "lazily"
// "licks" the "noisy" yellow
// "dog", who "lazily" "licks" his
// "leg" and looks around.

madlibs(template2);      // The "fox" "bites" the "dog"'s "tail".

madlibs(template2);      // The "cat" "pats" the "cat"'s "head".
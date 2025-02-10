function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let fact = 1;
    for (let i = 2; i <= n; i++) {
        fact *= i;
    }
    return fact;
}

function calculateRank() {
    let word = document.getElementById("wordInput").value.toUpperCase();
    if (!word) {
        document.getElementById("result").innerText = "Please enter a word.";
        return;
    }
    
    let len = word.length;
    let rank = 1;
    let mul = factorial(len);
    let charCount = {};
    
    for (let ch of word) {
        charCount[ch] = (charCount[ch] || 0) + 1;
    }
    
    function getFactorialDivisor() {
        let divisor = 1;
        for (let key in charCount) {
            divisor *= factorial(charCount[key]);
        }
        return divisor;
    }
    
    for (let i = 0; i < len; i++) {
        mul /= (len - i);
        let divisor = getFactorialDivisor();
        let countSmaller = 0;
        
        for (let key in charCount) {
            if (key < word[i]) countSmaller += charCount[key];
        }
        
        rank += (countSmaller * mul) / divisor;
        
        charCount[word[i]]--;
        if (charCount[word[i]] === 0) delete charCount[word[i]];
    }
    
    document.getElementById("result").innerText = "Rank of the word: " + rank;
}
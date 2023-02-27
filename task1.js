export function ucFirst(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function cleanString(str) {
    str = str.replace(/\s{2,}/g, ' ');
    str = str.replace(/\s*([\.,:;!])\s*/g, '$1 ');
    str = str.replace(/\.(\s*)$/, '.');
    return str;
}

export function countWords(str) {
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').split(/\s+/).length;
}

export function countUniqueWords(str) {
    const words = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase().split(/\s+/);
    const counts = {};

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (counts[word]) {
            counts[word]++;
        } else {
            counts[word] = 1;
        }
    }

    const uniqueWords = [];
    for (const word in counts) {
        uniqueWords.push({ word: word, count: counts[word] });
    }
    uniqueWords.sort((a, b) => b.count - a.count);
    return uniqueWords;
}
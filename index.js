const fs = require('fs');

class StringFormatter extends String {
    constructor(value) {
        super(value);
    }

    removeSpecialCharacters() {
        return new StringFormatter(this.replace(/[.,?!;()]/g, ''));
    }

    removeAccents() {
        return new StringFormatter(this.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    }
}

const countUniqueWordsFromText = (text) => {
    const array = text.split(/\s+/);
    
    let counter = 0;
    const uniqueWords = {};

    array.forEach(word => {
        if (!uniqueWords[word]) {
            uniqueWords[word] = 1;
            counter++;
        }
    })

    return counter;
}

fs.readFile('arquivo.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log('Erro ao ler arquivo!');
        throw err;
    };

    let text = new StringFormatter(data);
    text = text
        .removeAccents()
        .removeSpecialCharacters()
        .toLowerCase();
    
    const uniqueWordsLength = countUniqueWordsFromText(text);
    console.log(`Palavras únicas: ${uniqueWordsLength}`);
});
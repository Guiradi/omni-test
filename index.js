const fs = require('fs');

/**
 * Classe StringFormatter que herda a classe String e a modifica
 *  - Seus métodos retornaram outra instância da própria classe por não ser possível modificar diretamente as propriedades da classe String
 */
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

/**
 * Método que recebe um texto e retorna a quantidade de palavras únicas dele
 * @param {string} text 
 * @returns {number} wordCounter
 */
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

/**
 * Função core do programa que realiza o procedimento de leitura do arquivo.txt e contagem de palavras únicas dele formatado.
 */
const main = () => {
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
}

main();
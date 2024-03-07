class IntegerSet {
  // Construtor da classe IntegerSet, recebe o valor máximo do conjunto
  constructor(maxValue) {
    this.maxValue = maxValue;
    this.set = new Array(maxValue + 1).fill(false); // Cria um array para representar o conjunto, inicializado com false para todos os elementos
  }

  // Método para inserir um elemento no conjunto
  insert(element) {
    // Verifica se o elemento está dentro do intervalo permitido
    if (element >= 0 && element <= this.maxValue) {
      this.set[element] = true;
    }
  }

  // Método para remover um elemento do conjunto
  remove(element) {
    if (element >= 0 && element <= this.maxValue) {
      this.set[element] = false;
    }
  }

  // Método para calcular a união entre dois conjuntos
  union(otherSet) {
    const unionSet = new IntegerSet(this.maxValue); // Cria um novo conjunto para armazenar a união
    for (let i = 0; i <= this.maxValue; i++) {
      // Define cada elemento do conjunto de união como presente se estiver presente em pelo menos um dos conjuntos originais
      unionSet.set[i] = this.set[i] || otherSet.set[i];
    }
    return unionSet; // Retorna o conjunto de união
  }

  // Método para calcular a interseção entre dois conjuntos
  intersection(otherSet) {
    const intersectionSet = new IntegerSet(this.maxValue);
    for (let i = 0; i <= this.maxValue; i++) {
      // Define cada elemento do conjunto de interseção como presente se estiver presente em ambos os conjuntos originais
      intersectionSet.set[i] = this.set[i] && otherSet.set[i];
    }
    return intersectionSet;
  }

  // Método para calcular a diferença entre dois conjuntos
  difference(otherSet) {
    const differenceSet = new IntegerSet(this.maxValue);
    for (let i = 0; i <= this.maxValue; i++) {
      // Define cada elemento do conjunto de diferença como presente se estiver presente no conjunto original e ausente no outro conjunto
      differenceSet.set[i] = this.set[i] && !otherSet.set[i];
    }
    return differenceSet;
  }

  // Método para representar o conjunto como uma string
  toString() {
    let elements = [];
    for (let i = 0; i <= this.maxValue; i++) {
      if (this.set[i]) {
        elements.push(i); // Adiciona os elementos presentes no conjunto ao array
      }
    }
    return `{${elements.join(", ")}}`; // Retorna a representação do conjunto como uma string
  }
}

// Teste da classe IntegerSet
const set1 = new IntegerSet(10);
set1.insert(2);
set1.insert(4);
set1.insert(6);

const set2 = new IntegerSet(10);
set2.insert(4);
set2.insert(6);
set2.insert(8);

//Exibindo Resultados
console.log("Conjunto 1:", set1.toString());
console.log("Conjunto 2:", set2.toString());

console.log("União:", set1.union(set2).toString());
console.log("Interseção:", set1.intersection(set2).toString());
console.log("Diferença de set1 - set2:", set1.difference(set2).toString());

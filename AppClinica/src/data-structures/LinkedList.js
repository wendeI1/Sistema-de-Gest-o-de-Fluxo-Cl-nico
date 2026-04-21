class Node {
  constructor(data) {
    this.data = data; // { id, name, age }
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Inserção no final
  append(data) {
    // TODO: Implementar inserção no final da lista
  }

  // Conversão para array (para renderizar no React)
  toArray() {
    // TODO: Implementar conversão da lista encadeada para array
    return [];
  }

  // Busca sequencial (O(n))
  searchById(id) {
    // TODO: Implementar busca sequencial
    return null; 
  }

  // Limpa a lista
  clear() {
    // TODO: Implementar limpeza da lista
    this.head = null;
    this.size = 0;
  }

  // Reconstrói a lista a partir de um array (útil para recarregar do estado no react)
  fromArray(arr) {
    // TODO: Implementar reconstrução a partir de array
    this.clear();
  }
}

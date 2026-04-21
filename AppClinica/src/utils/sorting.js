// utilidades de medição de tempo e ordenação
export function measureTime(fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    return { result, time: (end - start).toFixed(4) }; // ms
}

// O(n^2)
export function bubbleSort(arr, key = 'id') {
    // TODO: Implementar Bubble Sort
    return [...arr];
}

// O(n log n)
export function quickSort(arr, key = 'id') {
    // TODO: Implementar Quick Sort
    return [...arr];
}

def bubble_sort(arr, key=None):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            val1 = arr[j][key] if key else arr[j]
            val2 = arr[j+1][key] if key else arr[j+1]
            if val1 > val2:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

# Outros métodos de ordenação como quick_sort, merge_sort, etc., serão implementados aqui.

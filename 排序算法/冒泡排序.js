function bubbleSort(arr) {
  for (var i = 0, length = arr.length; i < length; i++) {
    for (var j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}

console.log(bubbleSort([5, 9, 8, 7, 4, 6]))

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var middleIndex = Math.floor(arr.length / 2);
  var middleValue = arr.splice(middleIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < middleValue) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([middleValue], quickSort(right));
}

console.log(quickSort([55, 7, 8, 99, 4, 5, 44]))

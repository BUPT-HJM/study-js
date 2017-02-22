// 针对有序数组


// 循环方式
function binarySearch(arr, findVal) {
  var low = 0;
  var high = arr.length - 1;
  var mid;
  while (low < high) {
    mid = Math.floor((low + high) / 2);
    if (arr[mid] == findVal) {
      return mid;
    }
    if (arr[mid] > findVal) { //中间的值都比找的值大
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1; //没找到
}

console.log(binarySearch([1, 2, 3, 4, 5], 3))
console.log(binarySearch([1, 2, 3, 4, 5], 6))


//递归方式
function binarySearch2(arr, findVal, left, right) {
  left = left || 0;
  right = right || arr.length - 1;
  if (left >= right) {
    return;
  }
  var mid = Math.floor((left + right) / 2);
  var midVal = arr[mid];
  if (midVal > findVal) {
    binarySearch2(arr, findVal, left, mid - 1);
  } else if (midVal < findVal) {
    binarySearch2(arr, findVal, mid + 1, right);
  } else {
    return mid;
  }
  return -1;
}

console.log(binarySearch2([1, 2, 3, 4, 5], 3))
console.log(binarySearch2([1, 2, 3, 4, 5], 6))

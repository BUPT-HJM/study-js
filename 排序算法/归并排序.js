// 简单的两个有序数组合并成一个有序数组
function mergeTwoSortArr(arr1, arr2) {
  var i = 0,
    j = 0,
    length1 = arr1.length,
    length2 = arr2.length,
    newArr = [];
  while (i < length1 && j < length2) {
    if (arr1[i] < arr2[j]) {
      newArr.push(arr1[i]);
      i++;
    } else {
      newArr.push(arr2[j]);
      j++;
    }
  }
  if (i == length1) {
    newArr = newArr.concat(arr2.slice(j));
  } else {
    newArr = newArr.concat(arr1.slice(i));
  }
  return newArr;
}

var arr1 = [5, 7, 10, 19, 68, 99];
var arr2 = [4, 6, 88, 100, 300];
console.log(mergeTwoSortArr(arr1, arr2));


// 归并排序
// 思想便是将数组递归分割成一个元素的数组，一个元素的数组之间再合并成有序数组，最后成为有序数组

function mergeSort(arr) {
  var newArr = arr.slice();
  var temp = [];
  divideMergeSort(newArr, 0, arr.length - 1, temp);
  return newArr;
}

function divideMergeSort(arr, first, last, temp) {
  if (first >= last) {
    return;
  }
  var mid = Math.floor((first + last) / 2);
  divideMergeSort(arr, first, mid, temp); // 左边有序
  divideMergeSort(arr, mid + 1, last, temp); // 右边有序
  mergeSortArr(arr, first, mid, last, temp); //合并两个有序数组
}

//将有二个有序数列a[first...mid]和a[mid...last]合并。
function mergeSortArr(arr, first, mid, last, temp) {
  var k = 0;
  var i = first;
  var j = mid + 1;
  console.log("arr1:", arr.slice(first, mid + 1));
  console.log("arr2:", arr.slice(mid + 1, last + 1));

  while (i <= mid && j <= last) {
    if (arr[i] < arr[j]) {
      temp[k++] = arr[i++];
    } else {
      temp[k++] = arr[j++];
    }
  }
  while (i <= mid) {
    temp[k++] = arr[i++];
  }

  while (j <= last) {
    temp[k++] = arr[j++];
  }

  for (i = 0; i < k; i++) {
    arr[first + i] = temp[i];
  }
  console.log("temp:", temp);
  console.log("arr:", arr);
}

console.log(mergeSort([100, 55, 1, 6, 9, 8, 1000]));

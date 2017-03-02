function kSum(arr, start, end, target, k, sol, allSol) {
  if (k <= 0) {
    return;
  }
  if (k == 1) {
    for (var i = start; i <= end - k + 1; i++) {
      if (arr[i] === target) {
        sol.push(target);
        allSol.push(sol.slice());
        sol.pop();
        return;
      }
    }
  }
  if (k == 2) {
    twoSum(arr, start, end, target, sol, allSol);
  }

  for (var i = start; i <= end - k + 1; i++) {
    if (i > start && arr[i] == arr[i - 1]) {
      continue;
    }
    sol.push(arr[i]);
    kSum(arr, i + 1, end, target - arr[i], k - 1, sol, allSol);
    sol.pop();
  }
}

function twoSum(arr, start, end, target, sol, allSol) {
  while (start < end) {
    var sum = arr[start] + arr[end];
    if (sum == target) {
      sol.push(arr[start])
      sol.push(arr[end])
      allSol.push(sol.slice());
      sol.pop();
      sol.pop();
      start++;
      end--;
      while (arr[start] == arr[start - 1]) {
        start++;
      }
      while (arr[end] == arr[end + 1]) {
        end--;
      }
    } else if (sum < target) {
      start++;
    } else {
      end--;
    }
  }
}

function fourSum(arr, target) {
  var allSol = [];
  var sol = [];
  arr.sort(function(a, b) {
    return a - b;
  })
  kSum(arr, 0, arr.length - 1, target, 4, sol, allSol);
  return allSol;
}


console.log(fourSum([1, 2, 3, 9, 6, 7, 8, 10, 15, 1, 2, 3, 4, 0], 10))

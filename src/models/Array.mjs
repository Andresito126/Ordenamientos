export const bubbleSort = (array) => {
    let aux = 0;
    let timeInit = Date.now();
  
    for (let i = 0; i < 5 - 1; i++) {
      for (let j = 0; j < 5 - 1 - i; j++) {
        if (array[j].review_count > array[j + 1].review_count) {
          aux = array[j].review_count;
          array[j].review_count = array[j + 1].review_count;
          array[j + 1].review_count = aux;
        }
      }
    }

    let timeEnd = Date.now();
    let executionTime = ((timeEnd-timeInit)/1000);
    let object = {
      executionTime: executionTime,
      arr: array
    };

    console.log(object)

    return object;
  };
  
  export const mergeSort = (arr) => {
    if (arr.length < 2) return arr;
  
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid, arr.length);
  
    return merge(mergeSort(left), mergeSort(right));
  };
  
  const merge = (left, right) => {
    let result = [];
  
    while (left.length && right.length) {
      if (left[0].review_count <= right[0].review_count) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
  
    while (left.length) result.push(left.shift());
  
    while (right.length) result.push(right.shift());
  
    return result;
  };
  
  export const radixSort = (array) => {
    const getMaxDigits = (arr) => {
      let max = 0;
      for (let i = 0; i < arr.length; i++) {
        const digitCount =
          Math.floor(Math.log10(Math.abs(arr[i].review_count))) + 1;
        max = Math.max(max, digitCount);
      }
      return max;
    };
  
    const getDigit = (num, place) => {
      return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
    };
  
    const maxDigits = getMaxDigits(array);
  
    for (let i = 0; i < maxDigits; i++) {
      const digitBuckets = Array.from({ length: 10 }, () => []);
  
      for (let j = 0; j < array.length; j++) {
        const digit = getDigit(array[j].review_count, i);
        digitBuckets[digit].push(array[j]);
      }
  
      array = [].concat(...digitBuckets);
    }
  
    return array;
  };
  
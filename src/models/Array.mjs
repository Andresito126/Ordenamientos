//Variables para medir el tiempo de un proceso
let timeInit = 0,timeEnd = 0,executionTime = 0;

const initializeVariables = () => {
  timeInit = 0;
  timeEnd = 0;
  executionTime = 0;
};

export const bubbleSort = (array) => {
  let aux = 0;
  timeInit = Date.now();

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j].review_count > array[j + 1].review_count) {
        aux = array[j];
        array[j] = array[j + 1];
        array[j + 1] = aux;
      }
    }
  }

  timeEnd = Date.now();
  executionTime = (timeEnd - timeInit) / 1000;

  const objectBubbleSort = {
    executionTimeProcessB: executionTime,
    arrB: array,
  };

  return objectBubbleSort;
};

export const mergeSortArray = (array) => {
  initializeVariables();
  timeInit = Date.now(); 

  const mergeSort = (array) => {
      let n = array.length;
      if (n < 2) return array;

      const mid = Math.floor(n / 2);
      const left = array.slice(0, mid);
      const right = array.slice(mid);

      return merge(mergeSort(left), mergeSort(right));
  };

  const merge = (left, right) => {
      const result = [];
      let leftIndex = 0;
      let rightIndex = 0;

      while (leftIndex < left.length && rightIndex < right.length) {
          if (left[leftIndex].review_count <= right[rightIndex].review_count) {
              result.push(left[leftIndex]);
              leftIndex++;
          } else {
              result.push(right[rightIndex]);
              rightIndex++;
          }
      }

      while (leftIndex < left.length) {
          result.push(left[leftIndex]);
          leftIndex++;
      }

      while (rightIndex < right.length) {
          result.push(right[rightIndex]);
          rightIndex++;
      }

      return result;
  };

  const sortedArray = mergeSort(array);
  timeEnd = Date.now(); 
  executionTime = (timeEnd-timeInit) / 1000; 

  const objectMergeSort = {
    executionTimeProcessM : executionTime,
    arrM : sortedArray
  }

  return objectMergeSort; 
};


export const radixSort = (array) => {
  initializeVariables();
  timeInit = Date.now();

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

  timeEnd = Date.now();
  executionTime = ((timeEnd - timeInit) / 1000);

  const objectRadixSort = {
    executionTimeProcessR : executionTime,
    arrR : array
  }

  return objectRadixSort;
};


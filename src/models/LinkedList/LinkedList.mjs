import Node from "./Node.mjs";

export default class LinkedList {
  #count;
  #head;

  constructor() {
    this.#count = 0;
    this.#head = null;
  }

  push(objBussines) {
    const node = new Node(objBussines);
    let current;
    if (this.#head == null) {
      this.#head = node;
    } else {
      current = this.#head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.#count++;
  }

  getHead() {
    return this.#head;
  }

  getElementAt(index) {
    if (index >= 0 && index < this.#count) {
      let node = this.#head;
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.#count;
  }

  // Bubble Sort
  bubbleSort() {
    let timeInit = Date.now();
    let swapped;
    do {
      swapped = false;
      let current = this.#head;
      while (current && current.getNext()) {
        if (
          current.getData().review_count >
          current.getNext().getData().review_count
        ) {
          [
            current.getData().review_count,
            current.getNext().getData().review_count,
          ] = [
            current.getNext().getData().review_count,
            current.getData().review_count,
          ];
          swapped = true;
        }
        current = current.getNext();
      }
    } while (swapped);
    let timeEnd = Date.now();
    let executionTime = (timeEnd - timeInit) / 1000;
    return executionTime;
  }

  mergeSort() {
    let timeInit = Date.now();
    let sortedHead = this.mergeSortWithLL(this.#head);
    let timeEnd = Date.now();
    let executionTime = (timeEnd - timeInit) / 1000;
    console.log(executionTime);

    let sortedList = new LinkedList();
    sortedList.#head = sortedHead;
    sortedList.#count = this.#count;

    return {
      executionTimeLinkedListM: executionTime,
      sortedList: sortedList,
    };
  }

  mergeSortWithLL(head) {
    if (head === null || head.next === null) {
      return head;
    }

    let middle = this.llMiddle(head);
    let middleNext = middle.next;
    middle.next = null;

    let left = this.mergeSortWithLL(head);
    let right = this.mergeSortWithLL(middleNext);

    return this.sortedMerge(left, right);
  }

  sortedMerge(a, b) {
    console.log('Merging:', a ? a.data.review_count : 'null', b ? b.data.review_count : 'null');
    let result = null;

    if (a === null) {
      return b;
    }

    if (b === null) {
      return a;
    }

    if (a.data.review_count <= b.data.review_count) {
      result = a;
      result.next = this.sortedMerge(a.next, b);
    } else {
      result = b;
      result.next = this.sortedMerge(a, b.next);
    }
    return result;
  }

  llMiddle(head) {
    if (head === null) {
      return head;
    }

    let slow = head;
    let fast = head;

    while (fast.next !== null && fast.next.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
    }

    return slow;
  }

  // Convert the linked list to an array
  toArray() {
    const result = [];
    let current = this.#head;
    while (current !== null) {
      result.push(current.getData().review_count); // Solo el atributo `review_count`
      current = current.getNext();
    }
    return result;
  }

  // Convert an array to a linked list
  fromArray(arr) {
    this.#head = null;
    this.#count = 0;
    for (const item of arr) {
      this.push({ review_count: item });
    }
  }

  radixSort() {
    let timeInit = Date.now(); 

    // Convert the linked list to an array
    const arr = this.toArray();

    // Radix Sort implementation
    const getMax = (arr) => Math.max(...arr);

    const countSort = (arr, exp) => {
        const length = arr.length;
        let output = Array(length); 
        let count = Array(10).fill(0);

        for (let i = 0; i < length; i++) {
            const digit = Math.floor(arr[i] / exp) % 10;
            count[digit]++;
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // Construir el array de salida
        for (let i = length - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }

        return output;
    };

    const radixSortArray = (arr) => {
        const maxNumber = getMax(arr);
        let sortedArr = [...arr];

        for (let exp = 1; Math.floor(maxNumber / exp) > 0; exp *= 10) {
            sortedArr = countSort(sortedArr, exp);
        }

        return sortedArr;
    };

    // Perform Radix Sort on the array
    const sortedArray = radixSortArray(arr);

    // Convert the sorted array back to a linked list
    const sortedList = new LinkedList();
    sortedList.fromArray(sortedArray);

    let timeEnd = Date.now();
    let executionTime = (timeEnd - timeInit) / 1000; 

    return {
        executionTimeLinkedListR: executionTime,
        lkR: sortedList
    };
}

}

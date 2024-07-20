import Node from "./Node.mjs"

export default class LinkedList {
    #count
    #head

    constructor(){
        this.#count = 0
        this.#head = undefined
    }

    push(objBussines) {
        const node = new Node(objBussines)
        let current
        if (this.#head == null) {
            this.#head = node
        } else {
            current = this.#head
            while (current.next != null)
                current = current.next
            current.next = node
        }
        this.#count++
    }

    getHead(){
        return this.#head
    }

    getElementAt(index) {
        if (index>=0 && index<this.#count) {
            let node = this.#head
            for (let i=0;i<index && node != null; i++)
                node = node.next
            return node
        }
        return undefined
    }

    isEmpty(){
        return this.size() === 0
    }

    size(){
        return this.#count
    }

    // Bubble Sort
  bubbleSort() {
    const startTime = performance.now();
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
    const endTime = performance.now();
    const executionTime = (endTime - startTime) / 1000;
    return executionTime;
  }

  // Merge Sort
  mergeSort() {
    this.#head = this.mergeSortRec(this.#head);
  }

  mergeSortRec(head) {
    if (!head || !head.getNext()) return head;

    const middle = this.getMiddle(head);
    const nextOfMiddle = middle.getNext();
    middle.setNext(null);

    const left = this.mergeSortRec(head);
    const right = this.mergeSortRec(nextOfMiddle);

    return this.sortedMerge(left, right);
  }

  getMiddle(node) {
    if (!node) return node;

    let slow = node;
    let fast = node;

    while (fast.getNext() !== null && fast.getNext().getNext() !== null) {
      slow = slow.getNext();
      fast = fast.getNext().getNext();
    }
    return slow;
  }

  sortedMerge(left, right) {
    if (!left) return right;
    if (!right) return left;

    let result = null;

    if (left.getData().review_count <= right.getData().review_count) {
      result = left;
      result.setNext(this.sortedMerge(left.getNext(), right));
    } else {
      result = right;
      result.setNext(this.sortedMerge(left, right.getNext()));
    }

    return result;
  }

  // Radix Sort
  radixSort() {
    const getMaxDigits = (node) => {
      let max = 0;
      while (node) {
        const digitCount =
          Math.floor(Math.log10(Math.abs(node.getData().review_count))) + 1;
        max = Math.max(max, digitCount);
        node = node.getNext();
      }
      return max;
    };

    const getDigit = (num, place) => {
      return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
    };

    const maxDigits = getMaxDigits(this.#head);

    for (let i = 0; i < maxDigits; i++) {
      const digitBuckets = Array.from({ length: 10 }, () => new LinkedList());

      let current = this.#head;
      while (current) {
        const digit = getDigit(current.getData().review_count, i);
        digitBuckets[digit].push(current.getData());
        current = current.getNext();
      }

      this.#head = null;
      this.#count = 0;

      for (let j = 0; j < digitBuckets.length; j++) {
        let bucketNode = digitBuckets[j].#head;
        while (bucketNode) {
          this.push(bucketNode.getData());
          bucketNode = bucketNode.getNext();
        }
      }
    }
  }

}
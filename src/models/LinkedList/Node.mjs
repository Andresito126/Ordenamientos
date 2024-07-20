export default class Node {
  data;
  next;

  constructor(data) {
    this.data = data;
    this.next = null;
  }

  getNext() {
    return this.next;
  }

  getData() {
    return this.data;
  }

  setNext(nextNode) {
    this.next = nextNode;
  }
}

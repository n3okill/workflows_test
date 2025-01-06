export class EmptyQueueException extends Error {
  constructor() {
    super("Queue is empty");
  }
}

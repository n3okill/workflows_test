export class EmptyStackException extends Error {
  constructor() {
    super("Stack is empty");
  }
}

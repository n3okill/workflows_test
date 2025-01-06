export class EmptyListException extends Error {
  constructor() {
    super("List is empty.");
  }
}

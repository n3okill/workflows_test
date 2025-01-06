export class CollectionChangedException extends Error {
  constructor(message?: string) {
    super(message ?? "Collection changed while iterating.");
  }
}

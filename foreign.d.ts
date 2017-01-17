declare module 'html-entities/lib/html5-entities' {
  export interface Entities {
    decode(content: string): string;
    encode(content: string): string;
  }
  export var prototype: Entities;
}

declare interface WritableStream {
  write(chunk: string): void;
}

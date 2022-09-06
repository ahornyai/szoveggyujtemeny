import grade9 from '../output/irodalom_9_szoveggyujtemeny_nat2020.json';

// Should've been an API call, but I'm too lazy to set up a server. 
const lookupTable = new Map<string, any>();
lookupTable.set('grade_9', grade9);

export class BookFactory {
  private static books = new Map<string, Book>();

  public static getBook(bookName: string): Book {
    if (!this.books.has(bookName)) {
      this.books.set(bookName, new Book(bookName));
    }

    return this.books.get(bookName) as Book;
  }

}

export class Book {
  private fileName: string;
  private sections: Section[];

  constructor(fileName: string) {
    this.fileName = fileName;
    this.sections = [];

    this.parseFile();
  }

  private parseFile() {
    const file = lookupTable.get(this.fileName);

    for (let section of file) {
      for (let text of section) {
        const paragraphs = [];

        for (let paragraph of text.paragraphs) {
          paragraphs.push(paragraph);
        }

        this.sections.push(new Section(text.author, text.title, paragraphs));
      }
    }
  }

  public get getSections() {
    return this.sections;
  }

}

export class Section {
  private author: string;
  private title: string;
  private paragraphs: string[];

  constructor(author: string, title: string, paragraphs: string[]) {
    this.author = author;
    this.title = title;
    this.paragraphs = paragraphs;
  }

  public getAuthor(): string {
    return this.author;
  }

  public getTitle(): string {
    return this.title;
  }

  public getParagraphs(): string[] {
    return this.paragraphs;
  }

  public getRandomParagraph(count: number): string[] {
    const paragraphs = [];
    const randomNumbers = [] as number[];

    for (let i = 0; i < count; i++) {
      let randomNumber = Math.floor(Math.random() * this.paragraphs.length);

      while (randomNumbers.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * this.paragraphs.length);
      }

      paragraphs.push(this.paragraphs[randomNumber]);
      randomNumbers.push(randomNumber);
    }

    return paragraphs;
  }

}
import fs from 'fs';

export class Book {
  private fileName: string;
  private sections: Section[];

  constructor(fileName: string) {
    this.fileName = fileName;
    this.sections = [];

    this.parseFile();
  }

  private parseFile() {
    

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
}
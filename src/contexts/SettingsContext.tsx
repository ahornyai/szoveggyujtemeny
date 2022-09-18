import { createContext } from "react";
import { Book, BookFactory, Section } from "../nkp/book";

export class Settings {
  private selectedBook: string | undefined = undefined; // string = fileName
  private selectedSections: Map<string, number[]> = new Map<string, number[]>(); // number = index of the section in the book

  constructor() {
    this.loadSettings();
  }

  public loadSettings() {
    const settings = localStorage.getItem("settings");

    if (settings) {
      const settingsObj = JSON.parse(settings);

      this.selectedBook = settingsObj.selectedBook;
      this.selectedSections = new Map<string, number[]>(settingsObj.selectedSections);
    }
  }

  public saveSettings() {
    localStorage.setItem("settings", JSON.stringify({
      selectedBook: this.selectedBook,
      selectedSections: Array.from(this.selectedSections)
    }));
  }

  public getSelectedBook() {
    if (this.selectedBook === undefined) {
      return undefined;
    }

    return BookFactory.getBook(this.selectedBook);
  }

  public getSelectedSections(book: Book | undefined = this.getSelectedBook()): Section[] {
    if (book === undefined) {
      return [];
    }

    let sections = this.selectedSections.get(book.getFileName());

    if (sections === undefined) {
      return [];
    }

    return sections.map((index) => book.getSections()[index]);
  }

  public setSelectedBook(fileName: string) {
    this.selectedBook = fileName;
    this.saveSettings();
  }

  public setSelectedSection(book: Book | undefined, index: number, selected: boolean) {
    if (book === undefined) {
      return false;
    }

    let sections = this.selectedSections.get(book.getFileName());

    if (sections === undefined) {
      sections = [];
    }

    if (selected) {
      sections.push(index);
    } else {
      sections.splice(sections.indexOf(index), 1);
    }

    this.selectedSections.set(book.getFileName(), sections);
    this.saveSettings();
  }

  public isSelectedSection(book: Book | undefined, index: number) {
    if (book === undefined) {
      return false;
    }

    let sections = this.selectedSections.get(book.getFileName());

    if (sections === undefined) {
      return false;
    }

    return sections.includes(index);
  }

}

export const SettingsContext = createContext(new Settings());
#! /usr/bin/env node

import axios from 'axios';

class NKP {
  BASE = "https://www.nkp.hu/api";
  BOOK_STRUCTURE = "/get_book_structure?book_uri_segment=";
  LESSON_CONTENT = "/get_book_lesson_content?id=";
  
  async getLessons(book_uri_segment) {
    return (await axios.get(this.BASE + this.BOOK_STRUCTURE + book_uri_segment)).data.lessons;
  }

  async getLessonContent(id) {
    return (await axios.get(this.BASE + this.LESSON_CONTENT + id)).data.renderedSections;
  }

}

const config = {
  "book_uris": [ //todo: more
    "irodalom_9_szoveggyujtemeny_nat2020",
  ]
}

const nkp = new NKP();

config.book_uris.forEach(async (source) => {
  console.log("[+] Downloading: " + source);

  const lessons = await nkp.getLessons(source);
  const contents = await Promise.all(lessons.map(async (lesson) => await nkp.getLessonContent(lesson.lesson_id), []));

  console.log(contents);
});
#! /usr/bin/env node

import axios from 'axios';
import { load } from 'cheerio';
import fs from 'fs';

class NKP {
  BASE = "https://www.nkp.hu/api";
  BOOK_STRUCTURE = "/get_book_structure?book_uri_segment=";
  LESSON_CONTENT = "/get_book_lesson_content?id=";
  
  async getLessons(book_uri_segment) {
    return (await axios.get(this.BASE + this.BOOK_STRUCTURE + book_uri_segment)).data.lessons;
  }

  async getLessonContent(id) {
    const renderedSections = (await axios.get(this.BASE + this.LESSON_CONTENT + id)).data.renderedSections;

    return renderedSections.map(section => section.html);
  }

}

const config = {
  "book_uris": [ //todo: more
    "irodalom_9_szoveggyujtemeny_nat2020",
  ]
}

const nkp = new NKP();

config.book_uris.forEach(async (source) => {
  let contents;

  if (!fs.existsSync("cache/" + source + ".json")) {
    console.log("[+] Downloading: " + source);

    const lessons = await nkp.getLessons(source);
    contents = await Promise.all(lessons.map(async (lesson) => await nkp.getLessonContent(lesson.lesson_id), []));

    fs.writeFileSync("cache/" + source + ".json", JSON.stringify(contents, null, 2));
  }else {
    console.log("[+] Using cache: " + source);
    contents = JSON.parse(fs.readFileSync("cache/" + source + ".json", "utf8"));
  }

  console.log("[+] Scraping " + source);
  console.log("[+] " + contents.length + " lessons found");

  const output = [];

  await contents.forEach(async (lesson, lessonIndex) => {
    console.log("[+] Scraping lesson " + lessonIndex);
    const lessonOutput = [];

    await lesson.forEach((section, sectionIndex) => {
      console.log("[+] Scraping section " + sectionIndex);
      const sectionOutput = {};
      
      const $ = load(section);

      //first h2 is the author, second h2 is the title (usually)
      const author = $("h2")[0];
      const title = $("h2")[1];

      sectionOutput.author = author !== undefined ? $(author).text() : "";
      sectionOutput.title = title !== undefined ? $(title).text() : "";
      sectionOutput.paragraphs = [];

      $("p").each((i, p) => {
        sectionOutput.paragraphs.push($(p).text());
      });

      lessonOutput.push(sectionOutput);
      console.log("[+] Scraped section " + sectionIndex);
    });

    output.push(lessonOutput);
  });

  fs.writeFileSync("output/" + source + ".json", JSON.stringify(output, null, 2));
  console.log("[+] Scraped " + source);
});

console.log("[+] Done");
console.warn("[!] Please note that the output is not perfect, and you might need to manually fix some things");
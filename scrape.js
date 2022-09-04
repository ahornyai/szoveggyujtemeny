#! /usr/bin/env node

const config = {
  "sources": [ //todo: more
    "https://www.nkp.hu/tankonyv/irodalom_9_szoveggyujtemeny_nat2020/",
  ]
}

config.sources.forEach((source) => {
  console.log("[+] Scraping: " + source);
});

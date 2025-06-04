const Parser = require('rss-parser');
const parser = new Parser();

const feeds = [
  'https://www.lequipe.fr/rss/actu_rss_Football.xml',
  'http://feeds.bbci.co.uk/sport/football/rss.xml',
  'https://www.eurosport.fr/rss.xml'
];

(async () => {
  for (const url of feeds) {
    const feed = await parser.parseURL(url);
    console.log(`--- Articles de ${feed.title} ---`);
    feed.items.forEach(item => {
      console.log(item.title + ' : ' + item.link);
    });
  }
})();
// @auto-fold here
function guid() {
  function s4(count = 1) {
    let segment = ""
    while (count--) {
      segment += `${
        Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1)}`;
    }
    return segment
  }
  return `${s4(2)}-${s4()}-${s4()}-${s4()}-${s4(3)}`;
}

let library = {}
library.json = {
  replacer: function (match, pIndent, pKey, pVal, pEnd) {
    var key = '<span class=json-key>';
    var val = '<span class=json-value>';
    var str = '<span class=json-string>';
    var r = pIndent || '';
    if (pKey)
      r = r + '&quot;' + key + pKey.replace(/[": ]/g, '') + '</span>&quot;: ';
    if (pVal)
      r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
    return r + (pEnd || '');
  },
  prettyPrint: function (obj) {
    var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
    return JSON.stringify(obj, null, 3)
      .replace(/&/g, '&amp;')
      .replace(/\\"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(jsonLine, library.json.replacer);
  }
};


let application = new Vue({
  el: '#application',
  // @auto-fold here
  data: {
    "guid": guid(),
    "action": "",
    "@context": "http://audouin.jc.free.fr",
    "@type": "Article",
    "headline": "",
    "alternativeHeadline": "",
    "image": "https://picsum.photos/750/300",
    "author": "Jean-Claude Audouin",
    "award": "Commentaire",
    "editor": "Jean-Claude Audouin",
    "genre": "article",
    "keywords": "",
    "publisher": "Jean-Claude Audouin",
    "url": "http://audouin.jc.free.fr",
    "datePublished": new Date(),
    "dateCreated": new Date(),
    "dateModified": new Date(),
    "description": "",
    "rawArticle": "",
    "articleBody": "",
    "wordcount": 0
  },
  // @auto-fold here
  computed: {
    prettyJson() {
      return library
        .json
        .prettyPrint(this.$data)
    }
  },
  // @auto-fold here
  watch: {
    rawArticle() {
      this.rawArticle = this.rawArticle.replace(/"/g, '\'')

      this.wordcount = this.rawArticle.split(/\s+/g)
        .length

      this.articleBody = this.htmlize()
    }
  },
  // @auto-fold here
  methods: {
    htmlize() {
      // liste des flags à transformer
      let flag = {
        section: /\n{2}\n*/,
        paragraph: /\n{1}\n*/,
        highlight: '#'
      }
      // remplacement
      let decorator = {
        highlight: " font-weight-bold"
      }

      // liste des sections contenues dans le corps de l'article
      let sections

      // transforme une section en une liste de <p></p>
      function toParagraphs(section) {
        let paragraphs = section
          .split(flag.paragraph)
          .map(line => {
            let paragraph
            let highlight = ''
            if (line.startsWith(flag.highlight)) {
              line = line.splice(1, line.length - 1)
              highlight = decorator.highlight
            }
            paragraph = `<p class='card-text${highlight}'>${line}</p>`
            return paragraph
          })
          .join('')
        return `<div class='card'><div class='card-body'>${paragraphs}</div></div>`
      }

      sections = this
        .rawArticle.split(flag.section)

      return sections
        .map(toParagraphs)
        .join('')
    }
  }
})
console.log("inf: création de l'instance")
let application = new Vue({
  el: "#application",
  data: {
    view: {
      title: "Jean-Claude Audouin",
      heading: "Guitariste",
      subHeading: "Compositeur, Chef de choeur",
      home: "Accueil",
      readMore: "Lire plus ...",
      search: "Recherche",
      searchPlaceholder: "Recherche ...",
      menu: "Menu",
      copyright: "Copyright © Jean-Claude Audouin 2018"
    },
    values: {
      selected: "main",
      articles: [],
      search: ""
    }
  },
  created() {
    console.log("inf: le composant est créé")
    let query = {
      url: "http://localhost:3000/api/articles"
    }
    $.ajax(query)
      .done((data) => {
        console.log("inf: récupération des articles")
        console.log(data)

        this.values.articles = data.map((item) => {
          let sandbox = document.createElement("div");
          sandbox.innerHTML = item.articleBody;
          item.articleBodySanitized = (
            sandbox.textContent ||
            sandbox.innerText ||
            ""
          )
          return item
        })
      })
  },
  computed: {
    articleFilter() {
      return this.values.articles.filter(item => {
        return item.articleBody.match(this.values.search)
      })
    }
  },
  methods: {}
})

console.log(application)
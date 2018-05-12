console.log("inf: création de l'instance")
let application = new Vue({
  el: "#application",
  data: {
    view: {
      title: "Titre de la page",
      heading: "En-tête de la page",
      subHeading: "Sous-titre de la page",
      home: "Accueil",
      readMore: "Lire plus ...",
      search: "Recherche",
      searchPlaceholder: "Recherche ..."
    },
    values: {
      selected: "main",
      articles: []
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

        this.values.articles = data
      })
  },
  computed: {},
  methods: {}
})

console.log(application)
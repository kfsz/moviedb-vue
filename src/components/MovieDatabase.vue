<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="movie in movies"
        :key="movie.title"
        :class="{
          'ma-0': $vuetify.breakpoint.smAndDown,
          'ma-5': $vuetify.breakpoint.mdAndUp
        }"
      >
        <v-card shaped class="mx-auto" width="300px">
          <v-img
            :src="getImgUrl(movie.poster_path)"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
            height="450px"
            width="300px"
          >
            <v-card-title v-text="movie.title"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-btn icon @click.stop="getDetails(movie.id)">
              <v-icon>mdi-information</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <span class="mr-2">Popularity: {{ movie.popularity }}</span>
            <span class="mr-2">Votes: {{ movie.vote_count }}</span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="70%" overlay-opacity="0.6">
      <v-card>
        <v-img
          :src="getImgUrl(details.backdrop_path, true)"
          opacity="0.8"
          class="white--text align-end"
        >
          <v-card-title class="headline background">
            {{ details.title }}
          </v-card-title>

          <v-card-text class="background">
            <span class="mr-2"> {{ details.overview }} </span>
            <div class="mt-4">
              <span class="subtitle-1"> {{ genres }} </span>
            </div>
            <div class="mt-1">
              Rating: {{ details.vote_average }} from
              {{ details.vote_count }} votes
            </div>
            <div class="mt-1">
              Countries of Origin: {{ production_countries }}
            </div>
          </v-card-text>

          <v-card-actions class="background">
            <span class="shrink ml-4 mb-4">
              <a :href="getIMDBUrl(details.imdb_id)" title="IMDB page">
                <v-img
                  alt="IMDB Logo"
                  contain
                  :src="require('./../../public/imdb-logo.png')"
                  transition="scale-transition"
                  width="60"
                />
              </a>
            </span>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-img>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "MovieDatabase",
  props: ["movies"],
  methods: {
    getImgUrl(path, big = false) {
      if (big) return process.env.VUE_APP_API_BIG_IMAGE_URL + path;
      else return process.env.VUE_APP_API_IMAGE_URL + path;
    },
    getIMDBUrl(id) {
      return process.env.VUE_APP_API_IMDB_URL + id;
    },
    getDetails(id) {
      const axios = require("axios");
      let Config = {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
          language: "en-US"
        }
      };
      axios
        .get(`${process.env.VUE_APP_API_URL}movie/` + id + `?`, Config)
        .then(response => {
          this.details = response.data;

          var genresList = [];
          this.details.genres.forEach(genre => genresList.push(genre.name));
          this.genres = genresList.join(", ");

          var countryList = [];
          this.details.production_countries.forEach(production_countries =>
            countryList.push(production_countries.name)
          );
          this.production_countries = countryList.join(", ");

          this.dialog = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  data: () => ({
    details: [],
    genres: "",
    production_countries: "",
    dialog: false
  })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.background {
  background-color: rgba(1, 15, 50, 0.79);
  opacity: 0.95;
}

// fix word wrapping on card titles
.v-card__text,
.v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>

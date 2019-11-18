import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        // https://vuetifyjs.com/en/styles/colors
        primary: colors.blue.darken4,
        secondary: colors.blue.lighten4,
        accent: colors.indigo.base,
      },
    },
  },
})
import Vue from 'vue';
import VueResource from 'vue-resource';

import App from './App.vue';
import 'leaflet/dist/leaflet.css';

Vue.use(VueResource);
Vue.http.options.root = 'https://androscrusade.firebaseio.com/';

new Vue({
    render: h => h(App),
    components: {
      App
    }
  }).$mount('#app');
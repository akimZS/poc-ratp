<template>
  <div class="map-container">
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <!-- You can add more layers here -->
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

const hereApiKey = import.meta.env.VITE_HERE_TOKEN;

export default {
  name: 'MapComponent',
  components: {
    LMap,
    LTileLayer
  },
  data() {
    return {
      center: [48.856667, 2.352222],
      zoom: 13,
      url: `https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day.transit/{z}/{x}/{y}/512/png8?apiKey=${hereApiKey}&ppi=320`,
      attribution: '&copy; HERE 2024'
    };
  }
};

</script>

<style>
.map-container {
  position: absolute;
  height: 100%;
  width: 100%;
}

.leaflet-container {
  position: relative;
}
</style>

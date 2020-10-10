
<template>
	<div id="app" class="map-container">
		<img id="myimage" src="../images/ArdosSectorMap.jpg" alt="Sector Map" usemap="#InfoLayer" class="map"/>
		<svg class="overlay" width="100%" @click="displayZone=null">
      <polygon shape="poly" class='overlay-zone' :class="zoneColour('orbitalStation')" 
        @click.stop="handleClick('orbitalStation')"
						:points="coords.orbitalStation" href="#OrbitalStation" alt="Some Text" />
      <polygon shape="poly" class="overlay-zone" :class="zoneColour('commsRelay')" 
        @click.stop="handleClick('commsRelay')"
						:points="coords.commsRelay" href="#CommsRelay" alt="More Text" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('ancientRuins')" 
        @click.stop="handleClick('ancientRuins')"
						:points="coords.ancientRuins" href="#AncientRuins" alt="Ancient Ruins" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('hiveCity')" 
        @click.stop="handleClick('hiveCity')"
						:points="coords.hiveCity" href="#Pelius" alt="Hive City of Pelius" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('commandComplex')" 
        @click.stop="handleClick('commandComplex')"
						:points="coords.commandComplex"	href="#CommandComplex" alt="Command Complex" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('wasteland')" 
        @click.stop="handleClick('wasteland')"
						:points="coords.wasteland" href="#Wastelands" alt="Wastelands of Pelius" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('shippingYards')" 
        @click.stop="handleClick('shippingYards')"
						:points="coords.shippingYards" href="#ShippingYards" alt="Siora Polat Shipping Yards" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('solarPlant')" 
        @click.stop="handleClick('solarPlant')"
						:points="coords.solarPlant" href="#SolarPlant" alt="Siora Power Plant" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('aghoru')" 
        @click.stop="handleClick('aghoru')"
						:points="coords.aghoru" href="#Aghoru" alt="Aghoru Archipelago" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('peridos')" 
        @click.stop="handleClick('peridos')"
						:points="coords.peridos" href="#Peridos" alt="Peridos Gap" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('sancour')" 
        @click.stop="handleClick('sancour')"
						:points="coords.sancour" href="#Sancour" alt="Sancour Industrial Zone" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('gasFields')" 
        @click.stop="handleClick('gasFields')"
						:points="coords.gasFields" href="#GasFields" alt="Lavatina Gas Fields" > <span>12</span></polygon>
		</svg>
    <div v-if="displayZone" class="zone_info_box">
      <div class="padding">
        <div class="title"><span class="bold"> NAME: </span><span> {{displayZone.name}} </span></div>
        <hr/>
        <div class="description"><span> {{displayZone.description}} </span></div>
        <div class="terrain"> <span class="bold"> BATTLEFIELD TERRAIN: </span><span> {{displayZone.terrain}} </span> </div>
        <div class="effects"> <span class="bold"> BATTLEFIELD EFFECTS: </span><span> {{displayZone.effects}} </span> </div>
        <div class="control"> <span class="bold"> CONTROL BENEFIT: </span><span> {{displayZone.control}} </span> </div>
        <div v-if="displayZone.planetControl" class="planetary-control"> <span class="bold"> PLANETARY CONTROL BENEFIT: </span><span> {{displayZone.planetControl}} </span> </div>
      </div>
    </div>
    <div style="display: none"> 
      <input type="checkbox" id="editMode_checkbox" v-model="editMode">
      <label for="editMode_checkbox">Edit Mode</label>
    </div> 
	</div>
</template>

<script>
  import coords from './appCoords';
  import sectorData from './sectorData.js';
  import { LMap, LTileLayer, LMarker, LPolygon } from 'vue2-leaflet';
	/* eslint-disable vue/no-unused-components */
  export default {
    name: 'ArgosMap',
    components: { 
      LMap, LTileLayer, LMarker, LPolygon
    },
    data() {
      return {
        sectorData: {...sectorData},
        coords: {...coords},
        control: {
          "orbitalStation": 0,
          "commsRelay": 0,
          "ancientRuins": 0,
          "hiveCity": 0,
          "commandComplex": 0,
          "wasteland": 0,
          "shippingYards": 0,
          "solarPlant": 0,
          "aghoru": 0,
          "peridos": 0,
          "sancour": 0,
          "gasFields": 0
        },
        colours: {
          0: "red",
          1: "blue",
          2: "yellow",
          3: "green",
        },
        editMode: null,
        displayZone: null
      };
    },
    methods: {
      handleClick(zone) {
        this.editMode ? this.rotateControl(zone) : this.showInfo(zone);
      },
      rotateControl(zone) {
        this.control[zone] <= 2 ? this.control[zone] = this.control[zone] + 1 : this.control[zone] = 0; 
      },
      showInfo(zone) {
        this.displayZone = sectorData[zone];
      },
      zoneColour(zone) {
        return this.colours[this.control[zone]]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .map-container {
    height: 1934px;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 1934px;

    .overlay-zone {
      opacity: 0.5;
      fill:lime;
      stroke:black;
      stroke-width:4;

      &:hover {
        opacity: 0.8;
      }

      &.red {
        fill: #ff0000;
      }

      &.blue {
        fill: #0000ff;
      }

      &.yellow {
        fill: #fcf403;
      }

      &.green {
        fill: #008000;
      }
    }
  }
  
  .zone_info_box {
    position: absolute;
    top: 50px;
    left: 50px;
    height: auto;
    width: 750px;
    background-color: white;
    opacity: 0.8;
    border-radius: 30px;
    z-index: 1;
    font-family: "Lucida Console", Courier, monospace;
    font-size: x-large;

    .padding {
      margin: 20px;
    }

    .bold {
      font-weight: bold;
    }

    .title {
      font-size: xx-large;
      text-align: center;
    }

    .description {
      padding: 15px 0;
      font-style: italic;
    }

    .terrain {
      padding: 15px 0;
    }

    .effects {
      padding: 15px 0;
    }

    .control {
      padding: 15px 0;
    }

    .planetary-control {
      padding: 15px 0;
    }
  }

</style>
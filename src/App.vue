
<template>
	<div id="app" class="map-container">
		<img id="myimage" src="../images/ArdosSectorMap.jpg" alt="Sector Map" usemap="#InfoLayer" class="map"/>
    <div class="legend">
      <div class="title">Legend</div>
      <ul class="list">
        <li><span class="legend-box red"></span> Shaun</li>
        <li><span class="legend-box blue"></span> Mattie</li>
        <li><span class="legend-box yellow"></span> Ravar</li>
        <li><span class="legend-box green"></span> Robert</li>
      </ul>
    </div>
		<svg class="overlay" width="100%" @click="displayZone=null">
      <polygon shape="poly" class='overlay-zone' :class="zoneColour('orbitalStation')" @click.stop="handleClick('orbitalStation')"
						:points="coords.orbitalStation" href="#OrbitalStation" alt="Some Text" />
      <polygon shape="poly" class="overlay-zone" :class="zoneColour('commsRelay')" @click.stop="handleClick('commsRelay')"
						:points="coords.commsRelay" href="#CommsRelay" alt="More Text" />
      <text class="noselect" x="1160" y="750" text-anchor="middle" fill="white" font-size="30">Pelius</text>
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('ancientRuins')" @click.stop="handleClick('ancientRuins')"
						:points="coords.ancientRuins" href="#AncientRuins" alt="Ancient Ruins" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('hiveCity')" @click.stop="handleClick('hiveCity')"
						:points="coords.hiveCity" href="#Pelius" alt="Hive City of Pelius" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('commandComplex')" @click.stop="handleClick('commandComplex')"
						:points="coords.commandComplex"	href="#CommandComplex" alt="Command Complex" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('wasteland')" @click.stop="handleClick('wasteland')"
						:points="coords.wasteland" href="#Wastelands" alt="Wastelands of Pelius" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('shippingYards')" @click.stop="handleClick('shippingYards')"
						:points="coords.shippingYards" href="#ShippingYards" alt="Siora Polat Shipping Yards" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('solarPlant')" @click.stop="handleClick('solarPlant')"
						:points="coords.solarPlant" href="#SolarPlant" alt="Siora Power Plant" />
      <text class="noselect" x="690" y="1090" text-anchor="middle" fill="white" font-size="30">Traigo</text>
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('aghoru')" @click.stop="handleClick('aghoru')"
						:points="coords.aghoru" href="#Aghoru" alt="Aghoru Archipelago" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('peridos')" @click.stop="handleClick('peridos')"
						:points="coords.peridos" href="#Peridos" alt="Peridos Gap" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('sancour')"  @click.stop="handleClick('sancour')"
						:points="coords.sancour" href="#Sancour" alt="Sancour Industrial Zone" />
			<polygon shape="poly" class="overlay-zone" :class="zoneColour('gasFields')" @click.stop="handleClick('gasFields')" 
            :points="coords.gasFields"  href="#GasFields" alt="Lavatina Gas Fields" />
      <div style="position:absolute;left:1000px; top:1000px;" class="zone_text">1</div>
      <text class="overlay-zone-text noselect" x="157" y="1705" text-anchor="middle" fill="whitesmoke" font-size="20">1</text>
      <text class="overlay-zone-text noselect" x="580" y="1445" text-anchor="middle" fill="whitesmoke" font-size="20">3</text>
      <text class="overlay-zone-text noselect" x="510" y="1445" text-anchor="middle" fill="whitesmoke" font-size="20">2</text>
      <text class="overlay-zone-text noselect" x="593" y="1215" text-anchor="middle" fill="whitesmoke" font-size="20">4</text>
      <text class="overlay-zone-text noselect" x="630" y="1390" text-anchor="middle" fill="whitesmoke" font-size="20">5</text>
      <text class="overlay-zone-text noselect" x="780" y="1410" text-anchor="middle" fill="whitesmoke" font-size="20">6</text>
      <text class="overlay-zone-text noselect" x="718" y="1321" text-anchor="middle" fill="whitesmoke" font-size="20">7</text>
      <text class="overlay-zone-text noselect" x="1080" y="920" text-anchor="middle" fill="whitesmoke" font-size="20">8</text>
      <text class="overlay-zone-text noselect" x="1145" y="840" text-anchor="middle" fill="whitesmoke" font-size="20">9</text>
      <text class="overlay-zone-text noselect" x="1237" y="850" text-anchor="middle" fill="whitesmoke" font-size="20">10</text>
      <text class="overlay-zone-text noselect" x="1237" y="990" text-anchor="middle" fill="whitesmoke" font-size="20">11</text>
      <text class="overlay-zone-text noselect" x="1400" y="595" text-anchor="middle" fill="whitesmoke" font-size="20">12</text>
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
          "orbitalStation": 1,
          "commsRelay": 2,
          "ancientRuins": 1,
          "hiveCity": 0,
          "commandComplex": 3,
          "wasteland": 0,
          "shippingYards": 0,
          "solarPlant": 0,
          "aghoru": 0,
          "peridos": 0,
          "sancour": 0,
          "gasFields": 0
        },
        colours: {
          0: "transparent",
          1: "red",
          2: "blue",
          3: "yellow",
          4: "green",
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
        this.control[zone] <= 3 ? this.control[zone] = this.control[zone] + 1 : this.control[zone] = 0; 
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
    width: 100%;
    font-family: "Lucida Console", Courier, monospace;

    .overlay-zone-text {
      fill: orangered;
      stroke: orangered;
      stroke-width: 0.5px;
      text-anchor: middle;
      font-size: 25px;
    }
    .overlay-zone {
      opacity: 0.3;
      fill: transparent;
      stroke:black;
      stroke-width:4;
      cursor: pointer;

      &:hover {
        opacity: 0.6;
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
    font-size: x-large;
    font-family: "Lucida Console", Courier, monospace;


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
  .legend {
    position: absolute;
    top: 50px;
    left: 1100px;
    background-color: white;
    border-radius: 15px;
    opacity: 0.8;
    font-family: "Lucida Console", Courier, monospace;
    font-size: x-large;

    .title {
      margin: 10px 0;
      font-weight: bold;
      text-align: center;
    }

    .list {
      margin: 10px 30px 20px 0px;
      list-style: none;
    }
    
    li {
      margin: 5px 0;
    }

    .legend-box {
      border: 1px solid #ccc; 
      float: left; 
      width: 12px; 
      height: 12px;  
      margin: 0 10px;

      &.red {
        background-color: #ff0000;
      }

      &.blue {
        background-color: #0000ff;
      }

      &.yellow {
        background-color: #fcf403;
      }

      &.green {
        background-color: #008000;
      }
    }
  }
  .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
  }
</style>
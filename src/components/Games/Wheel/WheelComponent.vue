<template>
  <section class="vue-winwheel">
  <div class="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
    <div v-if="formattedPlayers.length > 0">
      <div class="mobile-container">
        <div class="wheel-wrapper">
          <div class="canvas-wrapper">
            <canvas id="canvas" width="310" height="310">
              <p style="{color: white}" align="center">Sorry, your browser doesn't support canvas. Please try Google Chrome.</p>
            </canvas>
          </div>
          <div class="button-wrapper">
            <a class="btn btn-play" href="#" @click.prevent="startSpin()" v-if="!loadingPrize && !wheelSpinning">SPIN!</a>
          </div>
        </div>
      </div>
      <div class="custom-modal modal-mask" id="modalSpinwheel" v-if="winningPlayer">
        <div slot="body">
          <a href="" @click.prevent="hidePrize()" class="modal-dismiss">
            <i class="icon_close"></i>
          </a>
          <h2>
            Yay ! {{prizeName}} is the speaker.
          </h2>
        </div>
      </div>
    </div>
      <div class="px-8 pt-6 pb-8 mb-4" v-else>
        Aucun joueur de sélectionné
      </div>
    </div>
  </section>

</template>


<script>
import * as Winwheel from '../../../javascript/Winwheel'
import { mapState } from 'vuex'

const defaultColors = [
  {
    textFillStyle: '#fff',
    fillStyle: '#000',
  },
  {
    textFillStyle: '#fff',
    fillStyle: '#c4376f',
  },
  {
    textFillStyle: '#000',
    fillStyle: '#fff',
  },
]



export default {
  name: 'WheelComponent',
  data () {
    return {
      loadingPrize: false,
      theWheel: null,
      winningPlayer: false,
      wheelSpinning: false,
      WinWheelOptions: {
        textFontSize: 14,
        outterRadius: 410,
        innerRadius: 25,
        lineWidth: 8,
        animation: {
          type: 'spinOngoing',
          duration: 0.5
        }
      }
    }
  },
  methods: {
    showPrize () {
      this.winningPlayer = true
    },
    hidePrize () {
      this.winningPlayer = false
    },
    startSpin () {
      if (this.wheelSpinning === false) {
        this.theWheel.startAnimation()
        this.wheelSpinning = true
        this.theWheel = new Winwheel.Winwheel({
          ...this.WinWheelOptions,
          numSegments: this.formattedPlayers.length,
          segments: this.formattedPlayers,
          animation: {
            type: 'spinToStop',
            duration: 2,
            spins: 10,
            callbackFinished: this.onFinishSpin
          }
        })
        // example input prize number get from Backend
        // Important thing is to set the stopAngle of the animation before stating the spin.

        var prizeNumber = Math.floor(Math.random() * this.formattedPlayers.length) // or just get from Backend
        var stopAt = 360 / this.formattedPlayers.length * prizeNumber - 360 / this.formattedPlayers.length / 2 // center pin
        // var stopAt = 360 / this.segments.length * prizeNumber - Math.floor(Math.random() * 60) //random location
        this.theWheel.animation.stopAngle = stopAt
        this.theWheel.animation.callbackSound = () => {
          this.playSound();
        };
        this.theWheel.startAnimation()
        this.wheelSpinning = false
      }
    },
    formatColors(index) {
      let desiredIndex = 0;
      for (let i = 3; i >= 1; i--) {
        if (index % i === 0) {
          desiredIndex = i - 1;
          break
        }
      }
      return defaultColors[desiredIndex];
    },
    resetWheel () {
      this.theWheel = new Winwheel.Winwheel({
        ...this.WinWheelOptions,
        numSegments: this.formattedPlayers.length,
        segments: this.formattedPlayers,
        animation: {
          type: 'spinToStop',
          duration: 2,
          spins: 10,
        }
      })

      if (this.wheelSpinning) {
        this.theWheel.stopAnimation(false) // Stop the animation, false as param so does not call callback function.
      }

      this.theWheel.rotationAngle = 0 // Re-set the wheel angle to 0 degrees.
      this.theWheel.draw() // Call draw to render changes to the wheel.
      this.wheelSpinning = false // Reset to false to power buttons and spin can be clicked again.
    },
    initSpin () {
      this.loadingPrize = true
      this.resetWheel()
      this.loadingPrize = false
    },
    onFinishSpin (indicatedSegment) {
      this.prizeName = indicatedSegment.text
      this.showPrize()
    },
    playSound() {
      return;
    }
  },
  computed: {
    ...mapState(['players']),
    formattedPlayers() {
      if (this.players.length === 0) return [];

      return this.players
        .filter(player => player.displayed)
        .map((player, i) => {
          return {
            ...this.formatColors(i),
            text: player.name,
            uniqId: player.uniqId,
            displayed: player.displayed,
          }
      });
    },
  },
  watch: {
    formattedPlayers() {
      this.resetWheel();
    }
  },
  mounted () {
    this.resetWheel()
  },
}

</script>

<style scoped>
.vue-winwheel {
  position: fixed;
	text-align: center;
	background-image: none;
	background-size: cover;
	background-position: center bottom;
	background-repeat: no-repeat;
}
.vue-winwheel h1 {
	color: #b32656;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	font-size: 36px;
	line-height: 90px;
	letter-spacing: 4px;
	margin: 0;
}
.vue-winwheel h2 {
	margin: 0;
}
.vue-winwheel #modalSpinwheel.custom-modal .content-wrapper .content {
	width: calc(100vw - 30px);
	padding-top: 52px;
}
.vue-winwheel #modalSpinwheel.custom-modal .content-wrapper .content h2 {
	text-transform: uppercase;
	color: #b32656;
	margin-bottom: 16px;
	margin-top: 0;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	font-size: 18px;
	letter-spacing: 1.1px;
	margin: 0;
}
.vue-winwheel #modalSpinwheel.custom-modal .content-wrapper .content p {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	font-size: 14px;
	color: black;
	text-align: center;
	line-height: 25px;
}
.vue-winwheel #modalSpinwheel.custom-modal .content-wrapper .content p strong {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.vue-winwheel #modalSpinwheel.custom-modal .content-wrapper .content .modal-dismiss {
	top: 12px;
	right: 12px;
}
.vue-winwheel #modalSpinwheel.custom-modal .content-wrapper .content .modal-dismiss i.icon_close {
	font-size: 30px;
	color: #da2a52;
}
.vue-winwheel canvas#canvas {
	position: relative;
}
.vue-winwheel .canvas-wrapper {
	position: relative;
}
.vue-winwheel .canvas-wrapper:after {
	content: '';
	display: block;
	width: 42px;
	background: #000;
	height: 42px;
	position: absolute;
	left: calc(50% - 26px);
	margin: auto;
	border-radius: 100%;
	top: calc(50% - 26px);
	border: 5px solid white;
	box-sizing: content-box;
}
.vue-winwheel .canvas-wrapper:before {
	content: '';
	display: block;
	width: 310px;
	background: #0f0f0f;
	height: 310px;
	position: absolute;
	left: 0;
	right: 0;
	margin: 0 auto;
	border-radius: 100%;
	top: 0;
}
.vue-winwheel .wheel-wrapper {
	position: relative;
}
.vue-winwheel .wheel-wrapper:before {
	content: '';
	width: 62px;
	height: 47px;
	position: absolute;
	top: -10px;
	left: calc(50% - 31px);
	right: 0;
	display: block;
	z-index: 99999;
	background-image: url('../../../assets/flat-black-marker.png');
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
}
.vue-winwheel .wheel-wrapper .button-wrapper {
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 231px;
	height: 118px;
}
.vue-winwheel .wheel-wrapper .btn.btn-play {
	padding: 0 58px !important;
	background: #c4376f;
	height: 40px;
	line-height: 40px;
	color: white;
	font-weight: bold;
	text-decoration: none;
	border-radius: 2px;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	letter-spacing: 2px;
}
</style>

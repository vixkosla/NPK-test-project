import './style.css'
import { functionalWindow } from './modal.js'
import { controlWindow } from './controls.js'
import { machine } from './machine.js'

document.querySelector('#app').innerHTML = `
  <div>
    <div class="menu-container" id="menu-container">
    </div>
    <div class="canvas-container">
    </div>
    <div class="controls-container">
    </div>
  </div>
`

document.querySelector('.menu-container').innerHTML = functionalWindow();
document.querySelector('.controls-container').innerHTML = controlWindow();
document.addEventListener('DOMContentLoaded', () => {
  machine()
})

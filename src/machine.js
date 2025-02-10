import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { positionGeometry } from 'three/tsl';

import Ola from 'ola'

let scene, camera, renderer
let cube, model
let loader
let ModalWindowisActive

export function machine() {

    init();
    environment();
    loadHandlers();
    // addCube();
    loadMachine()
    console.log('THREE.JS canvas imported to div')
}

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 300);
    camera.position.set(2, 2, 3.5);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor('0x000000', 0);

    document.querySelector('.canvas-container').appendChild(renderer.domElement)

    renderer.setAnimationLoop(render)

    loader = new GLTFLoader();
}

function render() {
    renderer.render(scene, camera);
    if (cube) cube.rotation.y += 0.01;
}

function environment() {
    const lights = [
        [0.5, 0, 1],
        [-0.5, 0, -1],
        [1, 1, -1],
        [-1, 1, 1],
        [0.25, 0.7, 0.45]
    ]

    lights.forEach((pos) => {
        const pointLight = new THREE.PointLight({ color: 'white', intensity: 3 })
        pointLight.position.set(...pos);
        scene.add(pointLight);

    })


    const ambientLight = new THREE.AmbientLight('white', 0.15);
    // pointLight.lookAt(0, 0, 0);
    // scene.add(ambientLight);
}

function loadMachine() {
    loader.load('./models/armatura.glb', function (glb) {
        model = glb.scene;

        model.position.set(0, -0.5, 0)
        model.rotation.set(0, Math.PI / 4, 0);
        scene.add(model);
    })
}

function resetModel() {
    document.addEventListener('keydown', (event) => {
        if (event.code === 'KeyR') {
            model.position.set(0, -0.5, 0)
            model.rotation.set(0, Math.PI / 4, 0);
            model.scale.set(1, 1, 1);
        };
    })
}

function changeColorHandler() {
    const button = document.querySelector('.button');

    button.addEventListener('click', (event) => {
        const material = model.children[0].children[0].material
        const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());
        material.color.set(randomColor)
    })
}

function openModalHandler() {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2()
    const container = document.querySelector('.menu-container');
    console.log(container)

    document.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObject(model);

        if (intersects.length > 0) {
            ModalWindowisActive *= -1;
            container.classList.toggle('is_open')
        }
    })
}

function positionModelHandler() {
    let isDragging = false;
    let pointer = Ola({ x: 0, y: 0 }, 5);

    document.addEventListener("contextmenu", (event) => {
        event.preventDefault(); // Полностью отключаем стандартное контекстное меню
    });

    document.addEventListener("mousedown", (event) => {
        if (event.button == 2) {
            // event.preventDefault()
            isDragging = true;
        }
    });

    document.addEventListener('mousemove', (event) => {
        if (!isDragging) return;
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        console.log("Правая кнопка нажата");

        model.position.x += (pointer.x / window.innerWidth * 2 - 1) * 0.01;
        model.position.y += (- pointer.y / window.innerHeight * 2 + 1) * 0.01;

    })

    document.addEventListener('mouseup', (event) => {
        if (event.button == 2) {
            isDragging = false;
        }
    })
}

function rotateModelHander() {
    let isDragging = false;
    let previousMouseY = 0;
    let previousMouseX = 0;
    let pointer = Ola({ x: 0, y: 0 }, 10);

    document.addEventListener('mousedown', (event) => {
        if (event.button == 0) isDragging = true;
        console.log(isDragging)
    })

    document.addEventListener('mousemove', (event) => {
        if (!isDragging) return;

        // приводим в порядок значения 
        pointer.x = event.clientX;
        pointer.y = event.clientY;

        // меняем положение модели взависимоости от относительного положения мыши
        model.rotation.y += (pointer.x / window.innerWidth * 2 - 1) * 0.01;
        model.rotation.z += (-pointer.y / window.innerHeight * 2 + 1) * 0.01;
    })

    document.addEventListener('mouseup', (event) => {
        if (event.button == 0) isDragging = false;
        console.log(isDragging)
    })
}

function scaleModelHandler() {
    let wheel = Ola({ d: 0 }, 10);
    // let wheel = 0;

    document.addEventListener('wheel', (event) => {
        let scaleFactor, scale
        wheel.d = event.deltaY
        scale = model.scale.x

        if (scale > 3.54) {
            scaleFactor = wheel.d < 0 ? 0.99 : 1
        } else if (scale < 0.5) {
            scaleFactor = wheel.d > 0 ? 1.01 : 1
        } else {
            scaleFactor = wheel.d > 0 ? 1.01 : 0.99;
        }

        model.scale.x *= scaleFactor;
        model.scale.y *= scaleFactor;
        model.scale.z *= scaleFactor;
    })
}

function loadHandlers() {
    scaleModelHandler();
    rotateModelHander();
    positionModelHandler();

    openModalHandler();
    changeColorHandler();

    resetModel();
}

function addCube() {
    cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1), new THREE.MeshBasicMaterial({ color: "red" }));
    cube.position.set(0, 0, 0);
    cube.rotation.set(Math.PI / 4, 0, 0);
    scene.add(cube);
}
// class Cube extends THREE.Object3D {
//   constructor (size) {
//     super();
//     this.colors = [0xB7E8D8, 0xE86344, 0xE8AB9C];

//     this.geom = new THREE.BoxGeometry(size, size, size);

//     this.mat = new THREE.MeshBasicMaterial({
//       vertexColors: THREE.FaceColors,
//       wireframe: false
//     });

//     this.colorRadomizer = random(0.7, 1.1);

//     for (let i = 0; i < this.geom.faces.length; i++) {
//       this.geom.faces[i].color.setHex(this.colors[~~(i / 4)]);

//       this.geom.faces[i].color.r *= this.colorRadomizer;
//       this.geom.faces[i].color.g *= this.colorRadomizer;
//       this.geom.faces[i].color.b *= this.colorRadomizer;
//     }

//     this.mesh = new THREE.Mesh(this.geom, this.mat);
//     this.add(this.mesh);
//   }

//   update () {
//     // this.mesh.geometry.colorsNeedUpdate = true;
//   }
// }

// class Webgl {
//   constructor (width, height) {
//     this.scene = new THREE.Scene();
//     this.aspectRatio = width / height;
//     this.rotationMode = true;
//     this.wireframeMode = false;
//     this.distance = 100;
//     this.camera = new THREE.OrthographicCamera(-this.distance * this.aspectRatio, this.distance * this.aspectRatio, this.distance, -this.distance, 1, 1000);
//     this.camera.position.set(0, 0, 150)
//     this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     this.renderer.setSize(width, height);

//     this.animationIntroDone = false;

//     this.cubesGroup = new THREE.Object3D();

//     this.cubes = [];
//     this.cubeSize = 10;
//     this.cubeOffset = 10;

//     this.drawCubes()

//     this.setLights();

//     this.animation();
//   }

//   drawCubes () {
//     for (let i = -2; i <= 2; i++) {
//       for (let j = -2; j <= 2; j++) {
//         for (let k = -2; k <= 2; k++) {
//           const cube = new Cube(this.cubeSize);
//           cube.position.x = i * this.cubeSize;
//           cube.position.y = k * this.cubeSize;
//           cube.position.z = j * this.cubeSize;
//           this.cubes.push(cube);
//           this.cubesGroup.add(cube);
//         }
//       }
//     }

//     this.scene.add(this.cubesGroup);
//   }

//   setLights () {
//     this.ambientLight = new THREE.AmbientLight(0x9b59b6);
//     this.scene.add(this.ambientLight);
//   }

//   resize (width, height) {
//     this.aspectRatio = width / height;
//     this.camera = new THREE.OrthographicCamera(-this.distance * this.aspectRatio, this.distance * this.aspectRatio, this.distance, -this.distance, 1, 1000);
//     this.camera.position.set(0, 0, 150);

//     this.camera.updateProjectionMatrix();

//     this.renderer.setSize(width, height);
//   };

//   animation () {
//     const initRotationDuration = 0.7;
//     const halfLength = Math.floor(this.cubes.length / 2);
//     const staggerOffset = 0.03;
//     const loopDelay = 1;

//     const groupTl = new TimelineMax();

//     groupTl
//       .to(this.cubesGroup.rotation, initRotationDuration, { x: 2 * Math.PI + 0.6, y: 2 * Math.PI - 0.8, ease: Cubic.easeOut });

//     // Fist half
//     for (let i = 0; i < this.cubes.length / 2 - 1; i++) {
//       const newX = (this.cubes[i].position.x + this.cubeOffset) * 2.5;
//       const newY = (this.cubes[i].position.y + this.cubeOffset) * 2.5;
//       const newZ = (this.cubes[i].position.z + this.cubeOffset) * 2.5;
//       const delay = initRotationDuration + staggerOffset * i;

//       let tl = new TimelineMax({ delay: delay, repeat: -1, repeatDelay: loopDelay, yoyo: true });

//       if (i === this.cubes.length / 2 - 2) {
//         tl = new TimelineMax({
//           delay: delay,
//           repeat: -1,
//           repeatDelay: loopDelay,
//           yoyo: true,
//           onRepeat: () => {
//             console.log('reset');
//             groupTl.seek(0);
//           }
//         });
//       }

//       tl
//         .to(this.cubes[i].position, 0.5, { x: newX, y: newY, z: newZ, ease: Back.easeOut })
//         .to(this.cubes[i].rotation, 0.5, { x: Math.PI, y: -Math.PI, ease: Cubic.easeOut })
//         .to(this.cubes[i].scale, 0.5, { x: 0.5, y: 0.5, z: 0.5, ease: Cubic.easeOut }, '-=0.4');
//     }

//     // Second half
//     for (let i = halfLength; i < this.cubes.length; i++) {
//       const newX = (this.cubes[i].position.x + this.cubeOffset) * 2.5;
//       const newY = (this.cubes[i].position.y + this.cubeOffset) * 2.5;
//       const newZ = (this.cubes[i].position.z + this.cubeOffset) * 2.5;
//       const delay = initRotationDuration + staggerOffset * (this.cubes.length - i);

//       const tl = new TimelineMax({ delay: delay, repeat: -1, repeatDelay: loopDelay, yoyo: true });

//       tl
//         .to(this.cubes[i].position, 0.5, { x: newX, y: newY, z: newZ, ease: Back.easeOut })
//         .to(this.cubes[i].rotation, 0.5, { x: Math.PI, y: -Math.PI, ease: Cubic.easeOut })
//         .to(this.cubes[i].scale, 0.5, { x: 0.5, y: 0.5, z: 0.5, ease: Cubic.easeOut }, '-=0.4');
//     }
//   }

//   render () {
//     if (this.rotationMode) {
//       this.scene.rotation.z += 0.01;
//     }

//     this.renderer.autoClear = false;
//     this.renderer.clear();
//     this.renderer.render(this.scene, this.camera);

//     for (let i = 0; i < this.cubes.length; i++) {
//       this.cubes[i].update();
//     }
//   }
// }

// // Main js
// let webgl;
// let audio;
// let gui;
// let stats;

// webgl = new Webgl(window.innerWidth, window.innerHeight);

// document.body.appendChild(webgl.renderer.domElement);

// // GUI settings
// gui = new dat.GUI();

// gui.add(webgl, 'wireframeMode').onChange((toggle) => {
//   for (let i = 0; i < webgl.cubes.length; i++) {
//     webgl.cubes[i].mat.wireframe = toggle;
//     console.log(webgl.cubes[i]);
//   }
// }).name('wireframe');

// gui.add(webgl, 'rotationMode').onChange(() => {
//   webgl.scene.rotation.z = 0;
// }).name('rotation');

// // Stats js
// stats = new Stats();
// stats.setMode(0);

// stats.domElement.style.position = 'absolute';
// stats.domElement.style.left = '0px';
// stats.domElement.style.top = '0px';

// document.body.appendChild(stats.domElement);

// window.onresize = resizeHandler;

// animate();

// function resizeHandler () {
//   webgl.resize(window.innerWidth, window.innerHeight);
// }

// function animate () {
//   stats.begin();
//   requestAnimationFrame(animate);
//   webgl.render();
//   stats.end();
// }

// function random (min, max) {
//   return Math.random() * (max - min + 1) + min;
// }

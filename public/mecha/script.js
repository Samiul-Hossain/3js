import * as THREE from "../build/three.module.js";

import { OrbitControls } from "./jsm/controls/OrbitControls.js";
import { GLTFLoader } from "./jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "./jsm/loaders/RGBELoader.js";
import { RoughnessMipmapper } from "./jsm/utils/RoughnessMipmapper.js";

let camera, scene, renderer;

init();
render();

function init() {
    // const container = document.createElement("div");
    // document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 40);

    scene = new THREE.Scene();
    const light = new THREE.AmbientLight(0xffffff, 3); // soft white light
    scene.background = new THREE.Color(0xf1f5f3);

    scene.add(light);

    //trial
    const loader = new GLTFLoader();

    let cube = loader.load(
        "mecha/models/gltf/DamagedHelmet/glTF/CYBER2.gltf",
        function (gltf) {
            scene.add(gltf.scene);
            render();
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
    //trial

    // new RGBELoader()
    //     .setPath("mecha/textures/equirectangular/")
    //     .load("royal_esplanade_1k.hdr", function (texture) {
    //         texture.mapping = THREE.EquirectangularReflectionMapping;

    //         scene.background = texture;
    //         scene.environment = texture;

    //         render();

    //         // model

    //         // use of RoughnessMipmapper is optional
    //         const roughnessMipmapper = new RoughnessMipmapper(renderer);

    //         const loader = new GLTFLoader().setPath(
    //             "mecha/models/gltf/DamagedHelmet/glTF/"
    //         );
    //         loader.load("DamagedHelmet.gltf", function (gltf) {
    //             gltf.scene.traverse(function (child) {
    //                 if (child.isMesh) {
    //                     roughnessMipmapper.generateMipmaps(child.material);
    //                 }
    //             });

    //             scene.add(gltf.scene);

    //             roughnessMipmapper.dispose();

    //             render();
    //         });
    //     });

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(window.innerWidth / 1.2, window.innerHeight / 1.2);

    console.log(window.innerWidth + " " + window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    let contenedor = document.getElementById("container");
    contenedor.appendChild(renderer.domElement);

    //container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set(0, 0, -0.2);
    controls.update();

    // window.addEventListener("resize", onWindowResize);
    // const boundingBox = new THREE.Box3();
    // // boundingBox.setFromObject(cube);

    // const center = new THREE.Vector3();
    // boundingBox.getCenter(center);

    // camera.position.y = center.y;
    // camera.position.x = center.x;
    // camera.position.z = 2500;
    // camera.updateProjectionMatrix();

    // const size = new THREE.Vector3();
    // boundingBox.getSize(size);

    // const fov = camera.fov * (Math.PI / 180);
    // const maxDim = Math.max(size.x, size.y, size.z);
    // let cameraZ = Math.abs((maxDim / 4) * Math.tan(fov * 2));

    // camera.position.z = cameraZ;
    // camera.updateProjectionMatrix();

    // camera.lookAt(center);
}

function onWindowResize() {
    camera.aspect = contenedor.innerWidth / contenedor.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(contenedor.innerWidth, contenedor.innerHeight);

    render();
}

//

function render() {
    renderer.render(scene, camera);
}

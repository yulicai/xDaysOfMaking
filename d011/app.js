/* self learning three js */
/* basic mesh and vertices control */
/* Yuli Cai 17 Feb 10 */

var container;
var camera, scene, controls, renderer;
var PI = 3.1215926;

var geometry, mesh, skyblue;
var organs = [];
var organ_num = 10;


//bundle shape conbination operation, object constructor
function Organ() {
    this.color = new THREE.Color("skyblue");
    // The main bauble is an Dodecahedron
    this.bauble = new THREE.Mesh(
        addNoise(new THREE.DodecahedronGeometry(2, 1), 1.7),
        new THREE.MeshStandardMaterial({
            color: this.color.getHex(),
            shading: THREE.FlatShading,
            metalness: 0,
            roughness: 1,
            emissive: 0x2194ce
        })
    );
    this.bauble.castShadow = true;
    this.bauble.receiveShadow = true;
    this.bauble.rotateZ(Math.random() * Math.PI * 2);
    this.bauble.rotateY(Math.random() * Math.PI * 2);
};


init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 6, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    //orbit controls need another library
    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', render);
    scene = new THREE.Scene();

    /* a plane */
    var plane_geometry = new THREE.PlaneGeometry(20, 20);
    var plane_material = new THREE.ShadowMaterial({
        color: 0xeeeeee
    });
    plane_material.opacity = 0.2;
    var plane = new THREE.Mesh(plane_geometry, plane_material);
    plane.rotateY(-Math.PI / 4);
    plane.rotateX(-Math.PI / 3);
    plane.position.y = -1.5;
    plane.receiveShadow = true;
    scene.add(plane);


    //  var color = new THREE.Color("rgb(200,15,200)");
    skyblue = new THREE.Color("skyblue");
    geometry = new THREE.DodecahedronGeometry(2, 1);
    var material = new THREE.MeshStandardMaterial({
        color: skyblue.getHex(),
        shading: THREE.FlatShading,
        metalness: 0,
        roughness: 1,
        emissive: 0x2194ce
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 1;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    for (var i = 0; i < organ_num; i++) {
        var organ = new Organ();
        organ.bauble.position.set(getRandomArbitrary(-10, 10), getRandomArbitrary(-10, 10), getRandomArbitrary(-10, 6));
        organs.push(organ.bauble);

    }
    //add organs in organs[] to the main scene
    for (var i = 0; i < organs.length; i++) {
        scene.add(organs[i]);
    }

    //lighting//
    var lightRight = new THREE.PointLight(0xFFFFCC);
    lightRight.position.set(20, 14, 30);
    lightRight.castShadow = true;
    lightRight.shadow.mapSize.width = 10;
    lightRight.shadow.mapSize.height = 10;
    var lightLeft = new THREE.PointLight(0xFFCCCC);
    lightLeft.position.set(-20, 20, 10);
    var ambientLight = new THREE.AmbientLight(0x2194ce, 0.2);
    scene.add(lightRight);
    scene.add(lightLeft);
    scene.add(ambientLight);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //this is important for shadowing
    //by default it is black
    renderer.setClearColor(0xffcccc);
    container.appendChild(renderer.domElement);

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

}


function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    var time = Date.now() * 0.001;
    //move the position of vertices
    // for (var i = 0; i < mesh.geometry.vertices.length; i++) {
    //     mesh.geometry.vertices[i].x += (Math.random() * 2 - 1) * (Math.random() * 2 - 1) * Math.sin(time * PI) * 0.05;
    //     mesh.geometry.vertices[i].y += (Math.random() * 2 - 1) * (Math.random() * 2 - 1) * Math.cos(time * PI) * 0.05;
    //     mesh.geometry.vertices[i].z += (Math.random() * 2 - 1) * (Math.random() * 2 - 1) * Math.cos(time * PI) * 0.02;
    // }

    addNoise(mesh.geometry,
        (Math.random() * 2 - 1) * Math.sin(time * PI) * 0.02,
        (Math.random() * 2 - 1) * Math.cos(time * PI) * 0.02,
        (Math.random() * 2 - 1) * Math.cos(time * PI) * 0.02
    );
    for (var i = 0; i < organ_num; i++) {
        addNoise(organs[i].geometry,
            (Math.random() * 2 - 1) * Math.sin(time * PI) * 0.05,
            (Math.random() * 2 - 1) * Math.cos(time * PI) * 0.05,
            (Math.random() * 2 - 1) * Math.cos(time * PI) * 0.05
        );
        organs[i].geometry.verticesNeedUpdate = true;
    };
    mesh.geometry.verticesNeedUpdate = true;
    //if using bufferGeometry, use the following pattern instead
    //geometry.attributes.position.needsUpdate = true;


    renderer.render(scene, camera);
}


////// functions //////

function addNoise(geometry, noiseX, noiseY, noiseZ) {
    var noiseX = noiseX || 2;
    var noiseY = noiseY || noiseX;
    var noiseZ = noiseZ || noiseY;
    for (var i = 0; i < geometry.vertices.length; i++) {
        var v = geometry.vertices[i];
        v.x += -noiseX / 2 + Math.random() * noiseX;
        v.y += -noiseY / 2 + Math.random() * noiseY;
        v.z += -noiseZ / 2 + Math.random() * noiseZ;
    }
    return geometry;
}


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function onWindowResize(event) {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

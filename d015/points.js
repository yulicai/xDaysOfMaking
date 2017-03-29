var container;
var renderer, scene, camera, stats;
var particles, uniforms;
var PARTICLE_SIZE = 20;
var raycaster, intersects;
var mouse, INTERSECTED;
init();
animate();

function init() {
    container = document.getElementById('container');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 350;
    //three layers of boxes
    var geometry1 = new THREE.BoxGeometry(200, 200, 200, 16, 16, 16);
    var geometry2 = new THREE.BoxGeometry(150, 150, 150, 12, 12, 12);
    var geometry3 = new THREE.BoxGeometry(100, 100, 100, 8, 8, 8);
    //use concat function in javaScript to combine all the arrays together
    var vertices = geometry1.vertices.concat(geometry2.vertices.concat(geometry3.vertices));
   // console.log("vertices length: " + vertices.length);
    var positions = new Float32Array(vertices.length * 3);
    var colors = new Float32Array(vertices.length * 3);
    var sizes = new Float32Array(vertices.length);
    var vertex;
    var color = new THREE.Color();
    for (var i = 0, l = vertices.length; i < l; i++) {
        vertex = vertices[i];
        vertex.toArray(positions, i * 3);
        color.setHSL(0.01 + 0.1 * (i / l), 1.0, 0.5);
        color.toArray(colors, i * 3);
        sizes[i] = PARTICLE_SIZE * 0.5;
    }
    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));
    //
    var material = new THREE.ShaderMaterial({
        uniforms: {
            color: {
                value: new THREE.Color(0xffffff)
            },
            texture: {
                value: new THREE.TextureLoader().load("textures/disc.png")
            }
        },
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
        alphaTest: 0.9
    });
    //
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    //
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xffffff, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    //
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    //
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);

}

function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();

}
var counter = 0;

function render() {
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;
    var geometry = particles.geometry;
    var attributes = geometry.attributes;

    var gap = 100;
    for (var i = 0; i < attributes.size.array.length; i++) {
        if (i >= counter * gap && i <= (counter + 1) * gap) {
            attributes.size.array[i] = PARTICLE_SIZE * 2.1;
            attributes.size.needsUpdate = true;
        }else{
          attributes.size.array[i] = PARTICLE_SIZE * 0.5;
          attributes.size.needsUpdate = true;
        }

    }

    if (counter > 10) counter = 0;
    counter++;

    renderer.render(scene, camera);
}

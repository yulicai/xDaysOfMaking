var container;
var camera, scene, renderer;
var uniforms;

init();
animate();

function init() {
    var gui = new dat.GUI();
    container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 3;

    // camera = new THREE.Camera();
    // camera.position.z = 1;
    scene = new THREE.Scene();

    var geometry = new THREE.PlaneBufferGeometry(2, 2);

    uniforms = {
        u_time: {
            type: "f",
            value: 1.0
        },
        u_resolution: {
            type: "v2",
            value: new THREE.Vector2()
        },
        u_mouse: {
            type: "v2",
            value: new THREE.Vector2()
        },
        u_base_r: {
            type: "f",
            value: 0.24
        },
        u_base_g: {
            type: "f",
            value: 0.68
        },
        u_base_b: {
            type: "f",
            value: 0.82
        },
        u_time_1: {
            type: "f",
            value: 0.29
        },
        u_time_2: {
            type: "f",
            value: 0.45
        },
        u_density_1: {
            type: "f",
            value: 5.8
        },
        u_density_2: {
            type: "f",
            value: 0.3
        },
        u_circle_size: {
            type: "f",
            value: 3.0
        },
        u_diffuse_r: {
            type: "f",
            value: 0.5
        },
        u_diffuse_g: {
            type: "f",
            value: 0.1
        },
        u_diffuse_b: {
            type: "f",
            value: 0.1
        },
        u_tex0: {
            type: "t",
            value: new THREE.TextureLoader().load("textures/t4.png")
        }

    };

    /* GUI control*/
    var baseColor = gui.addFolder("Base Color");
    baseColor.add(uniforms.u_base_r, 'value', 0.0, 1.0).name('r');
    baseColor.add(uniforms.u_base_g, 'value', 0.0, 1.0).name('g');
    baseColor.add(uniforms.u_base_b, 'value', 0.0, 1.0).name('b');
    var time = gui.addFolder("Time");
    time.add(uniforms.u_time_1, 'value', 0.0, 1.0).name('time1');
    time.add(uniforms.u_time_2, 'value', 0.0, 1.0).name('time2');
    var density = gui.addFolder("Shape Density");
    density.add(uniforms.u_density_1, 'value', 0.1, 10.0).name('density1');
    density.add(uniforms.u_density_2, 'value', 0.1, 10.0).name('density2');
    var diffuse = gui.addFolder("Diffuse Light");
    diffuse.add(uniforms.u_diffuse_r,'value',0.0,1.0).name('light r');
    diffuse.add(uniforms.u_diffuse_g,'value',0.0,1.0).name('light g');
    diffuse.add(uniforms.u_diffuse_b,'value',0.0,1.0).name('light b');
    diffuse.add(uniforms.u_circle_size, 'value', 0.5, 10.0).name('Size');

    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

    document.onmousemove = function(e) {
        uniforms.u_mouse.value.x = e.pageX
        uniforms.u_mouse.value.y = e.pageY
    }
}

function onWindowResize(event) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    uniforms.u_time.value += 0.05;
    renderer.render(scene, camera);
}
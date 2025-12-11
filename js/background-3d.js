const lightModeColor = 0x3182CE;
const darkModeColor = 0xFD7014;

const canvas = document.querySelector('#bg-canvas');
let scene, camera, renderer, particlesMesh;
let mouseX = 0;
let mouseY = 0;

function init3D() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 3;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const body = document.body;
    const initialColor = body.classList.contains('dark-mode') ? darkModeColor : lightModeColor;

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.015,
        color: initialColor,
        transparent: true,
        opacity: 0.8,
    });

    particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    document.addEventListener('mousemove', animateParticles);
    window.addEventListener('resize', onWindowResize);
    
    animate();
}

function animateParticles(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function updateParticleColor(colorHex) {
    if(particlesMesh) {
        particlesMesh.material.color.setHex(colorHex);
    }
}

function animate() {
    requestAnimationFrame(animate);

    const targetX = mouseX * 0.0001;
    const targetY = mouseY * 0.0001;

    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.001;

    particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
    particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

    renderer.render(scene, camera);
}

init3D();
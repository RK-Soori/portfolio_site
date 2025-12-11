function copyToClipboard(text, tooltipId) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        const tooltip = document.getElementById(tooltipId);
        tooltip.classList.add('show');
        setTimeout(() => { tooltip.classList.remove('show'); }, 2000);
    } catch (err) { console.error('Failed to copy: ', err); }
    document.body.removeChild(textarea);
}

const form = document.getElementById('contactForm');
form.addEventListener('submit', function(e) {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const nameErr = document.getElementById('nameError');
    const emailErr = document.getElementById('emailError');
    const msgErr = document.getElementById('messageError');
    nameErr.style.display = 'none'; emailErr.style.display = 'none'; msgErr.style.display = 'none';
    if (name.value.trim() === "") { nameErr.style.display = 'block'; isValid = false; }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) { emailErr.style.display = 'block'; isValid = false; }
    if (message.value.trim() === "") { msgErr.style.display = 'block'; isValid = false; }
    if (!isValid) { e.preventDefault(); }
});

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");
function toggleMenu() {
    hamburger.classList.toggle("active"); navMenu.classList.toggle("active");
}
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active"); navMenu.classList.remove("active");
    });
});

const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn.querySelector('i');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode'); icon.classList.remove('fa-moon'); icon.classList.add('fa-sun');
}

function toggleTheme() {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); localStorage.setItem('theme', 'dark');
        updateParticleColor(darkModeColor);
    } else {
        icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); localStorage.setItem('theme', 'light');
        updateParticleColor(lightModeColor);
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('active'); }
    });
});
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
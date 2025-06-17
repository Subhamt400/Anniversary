// Animation on Scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.hero-content, .detail-item, .gallery-item, .message-content');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Countdown Timer
function initCountdown() {
    const eventDate = new Date('July 9, 2025 19:00:00').getTime();
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-timer').innerHTML = '<h3>The celebration has begun!</h3>';
        }
    }

    updateTimer();
    return setInterval(updateTimer, 1000);
}

// Confetti Animation
function createConfetti() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const particles = [];
    const colors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFD700', '#FFA07A', '#FFC0CB'];
    const petalShapes = ['rose', 'cherry', 'lotus'];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 12 + 8;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speed = Math.random() * 3 + 2;
            this.angle = Math.random() * Math.PI * 2;
            this.rotation = Math.random() * 0.2 - 0.1;
            this.shape = petalShapes[Math.floor(Math.random() * petalShapes.length)];
            this.spin = Math.random() * 0.2 - 0.1;
            this.spinSpeed = Math.random() * 0.02 + 0.01;
            this.wobble = Math.random() * 0.1;
            this.wobbleSpeed = Math.random() * 0.02 + 0.01;
            this.wobbleOffset = Math.random() * Math.PI * 2;
            this.opacity = 1;
        }

        update() {
            this.y += this.speed;
            this.x += Math.sin(this.angle) * 2;
            this.angle += this.rotation;
            this.spin += this.spinSpeed;
            this.wobbleOffset += this.wobbleSpeed;
            
            // Add gentle swaying motion
            this.x += Math.sin(this.wobbleOffset) * this.wobble;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.spin);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;

            const s = this.size;
            
            switch(this.shape) {
                case 'rose':
                    // Rose petal shape
                    ctx.beginPath();
                    ctx.moveTo(0, -s/2);
                    ctx.bezierCurveTo(s/2, -s/2, s/2, s/2, 0, s/2);
                    ctx.bezierCurveTo(-s/2, s/2, -s/2, -s/2, 0, -s/2);
                    ctx.fill();
                    break;
                    
                case 'cherry':
                    // Cherry blossom petal shape
                    ctx.beginPath();
                    ctx.moveTo(0, -s/2);
                    ctx.bezierCurveTo(s/3, -s/3, s/3, s/3, 0, s/2);
                    ctx.bezierCurveTo(-s/3, s/3, -s/3, -s/3, 0, -s/2);
                    ctx.fill();
                    break;
                    
                case 'lotus':
                    // Lotus petal shape
                    ctx.beginPath();
                    ctx.moveTo(0, -s/2);
                    ctx.bezierCurveTo(s/2, -s/4, s/2, s/4, 0, s/2);
                    ctx.bezierCurveTo(-s/2, s/4, -s/2, -s/4, 0, -s/2);
                    ctx.fill();
                    break;
            }
            
            ctx.restore();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (particles.length < 100) {
            particles.push(new Particle());
        }

        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();

            if (particle.y > canvas.height) {
                particles.splice(index, 1);
            }
        });

        if (particles.length > 0) {
            requestAnimationFrame(animate);
        } else {
            canvas.remove();
        }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
}

// WhatsApp Redirect
function initWhatsAppRedirect() {
    const rsvpButton = document.getElementById('rsvpButton');
    if (!rsvpButton) return;

    rsvpButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create WhatsApp URL
        const phoneNumber = '918820238775';
        const message = encodeURIComponent("We are coming!");
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const whatsappUrl = isMobile 
            ? `whatsapp://send?phone=${phoneNumber}&text=${message}`
            : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
        
        // Redirect immediately without confetti
        window.open(whatsappUrl, '_blank');
    });
}

// Image Reveal with Curtain
function initImageReveal() {
    const imageReveal = document.querySelector('.image-reveal');
    const curtain = document.querySelector('.curtain');
    
    if (!imageReveal || !curtain) return;

    imageReveal.addEventListener('click', function() {
        if (!curtain.classList.contains('revealed')) {
            curtain.classList.add('revealed');
            createConfetti();
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    const countdownInterval = initCountdown();
    initWhatsAppRedirect();
    initImageReveal();

    const music = document.getElementById('backgroundMusic');
    
    // Try to play music when user interacts with the page
    document.addEventListener('click', function initAudio() {
        music.play().catch(error => {
            console.log('Autoplay prevented:', error);
        });
        document.removeEventListener('click', initAudio);
    }, { once: true });
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add loading animation to hero section
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 500);
}); 

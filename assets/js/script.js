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
    const colors = ['#FF69B4', '#FFB6C1', '#FF1493', '#FFFFFF'];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 5 + 5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speed = Math.random() * 3 + 2;
            this.angle = Math.random() * Math.PI * 2;
            this.rotation = Math.random() * 0.2 - 0.1;
        }

        update() {
            this.y += this.speed;
            this.x += Math.sin(this.angle) * 2;
            this.angle += this.rotation;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
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
        
        // Trigger confetti and redirect
        createConfetti();
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 500);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    const countdownInterval = initCountdown();
    initWhatsAppRedirect();
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

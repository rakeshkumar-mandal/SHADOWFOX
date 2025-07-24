// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Animate skill bars when visible
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const loading = submitBtn.querySelector('.loading');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    btnText.style.display = 'none';
    loading.style.display = 'inline-block';
    submitBtn.disabled = true;

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Reset form and button
    contactForm.reset();
    btnText.style.display = 'inline';
    loading.style.display = 'none';
    submitBtn.disabled = false;

    // Show success message
    alert('Thank you for your message! I\'ll get back to you soon.');
});

// Form validation
const inputs = contactForm.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearErrors);
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styles
    field.style.borderColor = '';
    
    if (!value) {
        field.style.borderColor = '#e74c3c';
        return false;
    }
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.style.borderColor = '#e74c3c';
            return false;
        }
    }
    
    field.style.borderColor = '#27ae60';
    return true;
}

function clearErrors(e) {
    const field = e.target;
    if (field.value.trim()) {
        field.style.borderColor = '';
    }
}

// Resume download handler
document.getElementById('downloadBtn').addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a simple text resume content
    const resumeContent = `
ALEX JOHNSON
Web Developer / UI-UX Designer
Email: alex.johnson@email.com
Phone: +1 (555) 123-4567
Location: San Francisco, CA

EXPERIENCE:
Senior Frontend Developer - TechCorp Inc. (2022 - Present)
Full Stack Developer - StartupXYZ (2020 - 2022)
Junior Web Developer - WebSolutions Ltd. (2018 - 2020)

EDUCATION:
Bachelor of Science in Computer Science - Stanford University (2014 - 2018)

SKILLS:
HTML5, CSS3, JavaScript, React, Node.js, MongoDB, Git, Figma

CERTIFICATIONS:
AWS Certified Developer, React Developer Certification, Google UX Design Certificate
    `;
    
    // Create and download file
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Alex_Johnson_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        if (body.getAttribute('data-theme') === 'dark') {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
        }
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        if (body.getAttribute('data-theme') === 'dark') {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    }
});

// Typing effect for hero subtitle
const subtitle = document.querySelector('.hero-text .subtitle');
const text = subtitle.textContent;
subtitle.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (scrolled < hero.offsetHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add active class to current navigation item
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});
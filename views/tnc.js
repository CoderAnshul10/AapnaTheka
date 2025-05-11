// Toggle sections
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    const title = section.querySelector('.section-title');
    title.addEventListener('click', () => {
        section.classList.toggle('active');
    });
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.sidebar-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get the target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Scroll to the target section
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // Open the target section if it's closed
        if (!targetSection.classList.contains('active')) {
            targetSection.classList.add('active');
        }
        
        // Close mobile sidebar if open
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    });
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Print functionality
const printBtn = document.getElementById('printBtn');
printBtn.addEventListener('click', () => {
    window.print();
});

// Accept terms button
const acceptBtn = document.getElementById('acceptBtn');
acceptBtn.addEventListener('click', () => {
    alert('You have accepted the Terms and Conditions.');
    // Here you can add code to store the acceptance in localStorage or cookies
    localStorage.setItem('termsAccepted', 'true');
    localStorage.setItem('termsAcceptedDate', new Date().toISOString());
});

// Mobile sidebar toggle
const mobileToggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');
mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Highlight current section on scroll
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = '#' + section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
});

// Check if user has already accepted terms
document.addEventListener('DOMContentLoaded', () => {
    const termsAccepted = localStorage.getItem('termsAccepted');
    if (termsAccepted === 'true') {
        const acceptedDate = new Date(localStorage.getItem('termsAcceptedDate'));
        console.log(`Terms were accepted on: ${acceptedDate.toLocaleString()}`);
        // You can show a notification or change the accept button text
        acceptBtn.textContent = 'Terms Already Accepted';
        acceptBtn.disabled = true;
    }
});
// DOM Elements
const header = document.querySelector('header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const authModal = document.getElementById('auth-modal');
const modalClose = document.getElementById('modal-close');
const modalTabs = document.querySelectorAll('.modal-tab');
const modalContents = document.querySelectorAll('.modal-content');

// Header Scroll Effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
  mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
  });
});

// Dark Mode Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  if (document.body.classList.contains('dark-mode')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeIcon.classList.remove('fa-moon');
  themeIcon.classList.add('fa-sun');
}

// Modal Functions
function openModal() {
  authModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  authModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal with close button
modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside
authModal.addEventListener('click', (e) => {
  if (e.target === authModal) {
    closeModal();
  }
});

// Tab switching in modal
function setActiveTab(tabId) {
  modalTabs.forEach(tab => {
    if (tab.dataset.tab === tabId) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  
  modalContents.forEach(content => {
    if (content.id === `${tabId}-content`) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
}

modalTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    setActiveTab(tab.dataset.tab);
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - header.offsetHeight,
        behavior: 'smooth'
      });
    }
  });
});

// Animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.product-card, .section-title, .contact-container > div');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.style.animation = 'fadeIn 1s ease forwards';
    }
  });
}

document.getElementById('logout-btn').addEventListener('click', () => {
  window.location.href = '/api/logout';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// async function fetchUsername() {
//   try {
//       const response = await fetch('/api/get-username');
//       const data = await response.json();

//       if (response.ok) {
//           document.getElementById('greeting').textContent = `Hi, ${data.username}`;
//       } else {
//           console.error("Error fetching username:", data.error);
//       }
//   } catch (error) {
//       console.error("Failed to fetch username:", error);
//   }
// }

// fetchUsername();

// document.getElementById('contactForm').addEventListener('submit', async function (event) {
//   event.preventDefault(); // Prevent default form submission

//   const formData = {
//       firstName: document.getElementById('firstName').value,
//       lastName: document.getElementById('lastName').value,
//       email: document.getElementById('email').value,
//       message: document.getElementById('message').value
//   };

//   try {
//       const response = await fetch('/api/contact', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(formData)
//       });

//       const result = await response.json();
//       if (response.ok) {
//           alert(result.success); // Show success message
//           document.getElementById('contactForm').reset(); // Clear form
//       } else {
//           alert(result.error); // Show error message
//       }
//   } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Something went wrong! Please try again.");
//   }
// });

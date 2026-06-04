// --- Interactive Portfolio Scripts for M1kunya ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Navigation System
    const navPills = document.querySelectorAll('.nav-pill[data-target]');
    const contentTabs = document.querySelectorAll('.content-tab');
    
    function switchTab(targetId) {
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Remove active class from all pills & tabs
        navPills.forEach(pill => {
            if (pill.getAttribute('data-target') === targetId) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });
        
        contentTabs.forEach(tab => {
            if (tab.id === targetId) {
                tab.classList.add('active');
                
                // Trigger metric animations inside the activated tab
                animateTabMetrics(tab);
            } else {
                tab.classList.remove('active');
            }
        });
    }

    navPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const target = pill.getAttribute('data-target');
            switchTab(target);
        });
    });

    // 2. Clickable project preview cards linking to their respective tabs
    const projectCards = document.querySelectorAll('.project-preview-card[data-project-link]');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetProj = card.getAttribute('data-project-link');
            switchTab(targetProj);
        });
    });

    // 3. Metric Count-Up Animation
    function animateTabMetrics(tabElement) {
        const metricValues = tabElement.querySelectorAll('.metric-val[data-target], .num[data-target]');
        metricValues.forEach(metric => {
            const targetValStr = metric.getAttribute('data-target');
            const target = parseInt(targetValStr, 10);
            
            if (!isNaN(target)) {
                let current = 0;
                // Speed depends on size of number
                const duration = 1000; // 1 second
                const steps = 30;
                const stepTime = duration / steps;
                const increment = target / steps;
                
                // Clear any existing interval to prevent overlapping runs
                if (metric.intervalId) {
                    clearInterval(metric.intervalId);
                }
                
                metric.textContent = '0';
                
                metric.intervalId = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        metric.textContent = target;
                        clearInterval(metric.intervalId);
                    } else {
                        metric.textContent = Math.floor(current);
                    }
                }, stepTime);
            }
        });
    }

    // Run metrics for initial home tab on load
    const activeTab = document.querySelector('.content-tab.active');
    if (activeTab) {
        setTimeout(() => animateTabMetrics(activeTab), 300);
    }

    // 4. Ripple Click Effect for Navigation & Cards
    document.addEventListener('click', (e) => {
        const targetButton = e.target.closest('.nav-pill, .footer-link-pill, .project-preview-card, .adv-card');
        if (targetButton) {
            createRipple(e, targetButton);
        }
    });

    function createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        // Coordinates relative to the element
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');
        
        // Ensure relative positioning
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.position === 'static') {
            element.style.position = 'relative';
        }
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 500);
    }
});

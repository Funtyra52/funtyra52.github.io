// --- Birthday Mode on December 12th for M1kunya ---

(function() {
    const today = new Date();
    const month = today.getMonth() + 1; // 1-12
    const day = today.getDate(); // 1-31
    
    // Check if it is December 12th
    if (month === 12 && day === 12) {
        document.body.classList.add('birthday-mode');
        
        // Create celebration banner
        const banner = document.createElement('div');
        banner.className = 'birthday-banner';
        banner.innerHTML = `
            <div class="birthday-content">
                <span class="birthday-emoji">🎉</span>
                <span class="birthday-text">С ДНЁМ РОЖДЕНИЯ, M1KUNYA! 🎂🎈</span>
                <span class="birthday-emoji">🎊</span>
            </div>
        `;
        document.body.insertBefore(banner, document.body.firstChild);
        
        // Stars in headers
        const headerTitle = document.querySelector('.brand-text h1');
        if (headerTitle && !headerTitle.innerHTML.includes('⭐')) {
            headerTitle.innerHTML = '⭐ ' + headerTitle.innerHTML + ' ⭐';
        }
        
        // Confetti generator function
        function createConfetti() {
            
            const colors = ['#a78bfa', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
            const confettiCount = 35;
            
            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                // Random size
                const size = Math.random() * 8 + 6;
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                
                // Random movement
                confetti.style.animationDelay = Math.random() * 4 + 's';
                confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
                document.body.appendChild(confetti);
                
                // Cleanup confetti elements
                setTimeout(() => {
                    confetti.remove();
                }, 7000);
            }
        }
        
        // Fire confetti cycles
        createConfetti();
        setInterval(createConfetti, 4000);
    }
})();

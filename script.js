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

    // ==========================================
    // INTERACTIVE DEMOS IMPLEMENTATION
    // ==========================================

    // 1. M1kunTweaker Demo
    const tweakerSideItems = document.querySelectorAll('.tweaker-side-item');
    const tweakerPanelTabs = document.querySelectorAll('.tweaker-panel-tab');

    tweakerSideItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');
            
            tweakerSideItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            tweakerPanelTabs.forEach(tab => {
                if (tab.id === `demo-tab-${targetTab}`) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
        });
    });

    const btnClearDns = document.getElementById('btn-clear-dns');
    if (btnClearDns) {
        btnClearDns.addEventListener('click', () => {
            const originalText = btnClearDns.textContent;
            btnClearDns.disabled = true;
            btnClearDns.textContent = 'Очистка...';
            setTimeout(() => {
                btnClearDns.textContent = 'Успешно очищено!';
                setTimeout(() => {
                    btnClearDns.disabled = false;
                    btnClearDns.textContent = originalText;
                }, 1500);
            }, 1000);
        });
    }

    const btnDisableTelemetry = document.getElementById('btn-disable-telemetry');
    if (btnDisableTelemetry) {
        btnDisableTelemetry.addEventListener('click', () => {
            if (btnDisableTelemetry.classList.contains('btn-danger-style')) {
                btnDisableTelemetry.textContent = 'Включить';
                btnDisableTelemetry.classList.remove('btn-danger-style');
                btnDisableTelemetry.classList.add('btn-secondary-style');
            } else {
                btnDisableTelemetry.textContent = 'Отключить';
                btnDisableTelemetry.classList.remove('btn-secondary-style');
                btnDisableTelemetry.classList.add('btn-danger-style');
            }
        });
    }

    const btnToggleUpdates = document.getElementById('btn-toggle-updates');
    if (btnToggleUpdates) {
        btnToggleUpdates.addEventListener('click', () => {
            if (btnToggleUpdates.textContent === 'Приостановить') {
                btnToggleUpdates.textContent = 'Возобновить';
            } else {
                btnToggleUpdates.textContent = 'Приостановить';
            }
        });
    }

    // 2. Note Editor Demo
    const noteFiles = document.querySelectorAll('.note-file');
    const noteInput = document.getElementById('note-demo-input');
    const notePreview = document.getElementById('note-demo-preview');

    function renderMarkdown(text) {
        // Escape HTML tags to prevent XSS in demo
        const cleanText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        // Использование библиотеки marked для полной поддержки синтаксиса Markdown
        return marked.parse(cleanText);
    }

    if (noteInput && notePreview) {
        noteInput.addEventListener('input', (e) => {
            notePreview.innerHTML = renderMarkdown(e.target.value);
        });

        noteFiles.forEach(file => {
            file.addEventListener('click', () => {
                noteFiles.forEach(f => f.classList.remove('active'));
                file.classList.add('active');

                // Get unescaped content from data-content
                let content = file.getAttribute('data-content');
                // Replace escaped newlines
                content = content.replace(/\\n/g, '\n');

                noteInput.value = content;
                notePreview.innerHTML = renderMarkdown(content);
            });
        });
    }

    // 3. Read Flasher Demo
    const btnFlash = document.getElementById('read-btn-flash');
    const progressArea = document.querySelector('.flash-progress-area');
    const progressFill = document.getElementById('read-flash-progress');
    const progressStatus = document.getElementById('read-flash-status');

    if (btnFlash && progressArea && progressFill && progressStatus) {
        btnFlash.addEventListener('click', () => {
            btnFlash.disabled = true;
            progressArea.style.display = 'flex';
            progressFill.style.width = '0%';
            
            let progress = 0;
            const statuses = [
                { limit: 15, text: 'Подготовка к записи...' },
                { limit: 40, text: 'Форматирование USB накопителя...' },
                { limit: 80, text: 'Копирование файлов ISO...' },
                { limit: 95, text: 'Проверка целостности данных...' },
                { limit: 100, text: 'Завершение записи...' }
            ];

            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 5) + 2;
                if (progress >= 100) {
                    progress = 100;
                    progressFill.style.width = '100%';
                    progressStatus.textContent = 'Готово! Загрузочный диск успешно создан 🎉';
                    btnFlash.disabled = false;
                    btnFlash.textContent = 'Записать еще раз';
                    clearInterval(interval);
                } else {
                    progressFill.style.width = `${progress}%`;
                    
                    // Find status text
                    const currentStatus = statuses.find(s => progress <= s.limit);
                    if (currentStatus) {
                        progressStatus.textContent = `${currentStatus.text} (${progress}%)`;
                    }
                }
            }, 150);
        });
    }

});

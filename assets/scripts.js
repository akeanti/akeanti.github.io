feather.replace();

document.addEventListener('DOMContentLoaded', () => {
    createStarField();
    createNebulas();
    createShootingStars();
    setupParallax();
    setupBadgeInteractions();
    createParticleSystem();
    setupThemeToggle();
    setupMobileNav();
    setupNavbarTooltips();
    setupMobileNav();
});

function setupNavbarTooltips() {
    const navbarItems = document.querySelectorAll('.navbar__item');

    navbarItems.forEach(item => {
        const link = item.querySelector('.navbar__link');
        const content = link.getAttribute('data-content');

        link.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.15)';
            item.style.transition = 'transform 0.3s ease';

            const tooltip = document.createElement('div');
            tooltip.className = 'navbar-tooltip';
            tooltip.textContent = content;
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'var(--tooltip-bg)';
            tooltip.style.color = 'var(--text)';
            tooltip.style.padding = '0.5rem 1rem';
            tooltip.style.borderRadius = 'var(--borderRadius)';
            tooltip.style.fontSize = '0.8rem';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.zIndex = '200';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            tooltip.style.backdropFilter = 'blur(4px)';
            document.body.appendChild(tooltip);

            const rect = item.getBoundingClientRect();
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            tooltip.style.top = `${rect.bottom + 8 + window.scrollY}px`;
        });

        link.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
            const tooltips = document.querySelectorAll('.navbar-tooltip');
            tooltips.forEach(tooltip => {
                tooltip.remove();
            });
        });
    });
}

function setupMobileNav() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenu = document.querySelector('.mobile-navbar__menu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');

            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
}

function createStarField() {
    const starField = document.querySelector('.star-field');
    const numberOfStars = 500;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        const size = Math.random() * 2.5 + 0.5;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.opacity = Math.random() * 0.7;
        star.style.animationDelay = `${Math.random() * 8}s`;

        const colors = ['#ffffff', '#e6e6ff', '#f0f8ff', '#d3d3d3', '#f8f8ff'];
        star.style.background = colors[Math.floor(Math.random() * colors.length)];

        starField.appendChild(star);
    }
}

function createNebulas() {
    const spaceBackground = document.querySelector('.space-background');
    const nebulaColors = ['purple', 'blue', 'green', 'red', 'pink', 'cyan'];

    for (let i = 0; i < 8; i++) {
        const nebula = document.createElement('div');
        nebula.className = `nebula ${nebulaColors[i % nebulaColors.length]}`;
        nebula.style.left = `${Math.random() * 100}%`;
        nebula.style.top = `${Math.random() * 100}%`;

        const size = Math.random() * 300 + 100;
        nebula.style.width = `${size}px`;
        nebula.style.height = `${size}px`;

        nebula.style.opacity = Math.random() * 0.3 + 0.1;
        nebula.style.animationDuration = `${Math.random() * 60 + 30}s`;
        nebula.style.animationDelay = `${Math.random() * 20}s`;

        spaceBackground.appendChild(nebula);
    }
}

function createShootingStars() {
    const spaceBackground = document.querySelector('.space-background');

    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';

        const startFromRight = Math.random() > 0.5;
        if (startFromRight) {
            shootingStar.style.left = '100%';
            shootingStar.style.top = `${Math.random() * 100}%`;
        } else {
            shootingStar.style.left = `${Math.random() * 100}%`;
            shootingStar.style.top = '0%';
        }

        const destX = (Math.random() * 100 - 50);
        const destY = (Math.random() * 100);

        const angle = Math.atan2(destY, destX) * 180 / Math.PI;

        shootingStar.style.setProperty('--destX', `${destX}vw`);
        shootingStar.style.setProperty('--destY', `${destY}vh`);
        shootingStar.style.setProperty('--angle', `${angle}deg`);

        const duration = Math.random() * 3 + 2;
        shootingStar.style.animationDuration = `${duration}s`;

        spaceBackground.appendChild(shootingStar);

        setTimeout(() => {
            shootingStar.remove();
        }, duration * 1000);

        const nextTime = Math.random() * 3000 + 2000;
        setTimeout(createShootingStar, nextTime);
    }

    for (let i = 0; i < 3; i++) {
        setTimeout(createShootingStar, i * 1000);
    }
}

function setupParallax() {
    const elements = document.querySelectorAll('.nebula, .spiral-arm, .accretion-disk, .planet');

    window.addEventListener('mousemove', (e) => {
        const xPos = e.clientX / window.innerWidth;
        const yPos = e.clientY / window.innerHeight;

        elements.forEach((el, index) => {
            const depth = index % 3 + 1;
            const factorX = index % 2 === 0 ? 1 : -1;
            const factorY = index % 3 === 0 ? 1 : -1;
            const speed = 5 * depth;

            el.style.transform = `translate(${xPos * speed * factorX}px, ${yPos * speed * factorY}px)`;
        });
    });
}

function setupBadgeInteractions() {
    const badges = document.querySelectorAll('.badge');

    badges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'translateY(-4px)';
            badge.style.transition = 'transform 0.3s ease';

            const badgeType = badge.getAttribute('data-badge');
            let content = '';

            switch(badgeType) {
                case 'projects':
                    content = 'Successfully launched 15+ open-source projects on GitHub. These projects cover a wide range of technologies including web development, machine learning, and system administration tools.';
                    break;
                case 'github':
                    content = 'I have started learning LLM, and data manipulation, gonna update you soon :).';
                    break;
                case 'community':
                    content = 'I have been making these for the past 5 years, using discord.js and discord.py, I own many bots: .';
                    break;
                case 'tech':
                    content = 'Althought I barely like front end, but I\'m a full stack dev since 2022.';
                    break;
                case 'ethical':
                    content = 'I started building Arduino projects since I was 13, and soon discovered ESP and Rasberry Pi, now I can say I know alot about these and teachs it for students as well.';
                    break;
                case 'bugbounty':
                    content = 'Specialist in bug bounty hunting with multiple successful finds. I have earned top-tier rewards from major companies for identifying and reporting critical security vulnerabilities.';
                    break;
            }

            const tooltip = document.createElement('div');
            tooltip.className = 'badge-tooltip';
            tooltip.textContent = content;
            document.body.appendChild(tooltip);

            const rect = badge.getBoundingClientRect();
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            tooltip.style.top = `${rect.bottom + 8 + window.scrollY}px`;
        });

        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'translateY(0)';
            const tooltips = document.querySelectorAll('.badge-tooltip');
            tooltips.forEach(tooltip => {
                tooltip.remove();
            });
        });

        badge.addEventListener('click', () => {
            const badgeType = badge.getAttribute('data-badge');
            let modalContent = '';

            switch(badgeType) {
                case 'projects':
                    modalContent = `
                                <h3>Projects Launched</h3>
                                <p>I've successfully launched 15+ open-source projects on GitHub, covering various technologies and domains.</p>
                                <p>Projects include web applications, security tools, and IoT solutions that solve real-world problems.</p>
                            `;
                    break;
                case 'github':
                    modalContent = `
                                <h3>LLM Starter</h3>
                                <p>I have started learning LLM, and data manipulation, gonna update you soon :).</p>
                            `;
                    break;
                case 'community':
                    modalContent = `
                                <h3>Discord Bot Dev</h3>
                                <p>I have been making these for the past 5 years, using discord.js and discord.py, I own many bots: .</p>
                                <p>Link Cleaner, several mod mails for private servers and more...</p>
                            `;
                    break;
                case 'tech':
                    modalContent = `
                                <h3>Full Stack Dev</h3>
                                <p>Althought I barely like front end, but I'm a full stack dev since 2022.</p>
                            `;
                    break;
                case 'ethical':
                    modalContent = `
                                <h3>IoT Lover</h3>
                                <p>I started building Arduino projects since I was 13, and soon discovered ESP and Rasberry Pi, now I can say I know alot about these and teachs it for students as well.</p>
                            `;
                    break;
                case 'bugbounty':
                    modalContent = `
                                <h3>Bug Bounty Hunter</h3>
                                <p>Specialist in bug bounty hunting with multiple successful finds and top-tier rewards from major companies.</p>
                            `;
                    break;
            }

            const modal = document.createElement('div');
            modal.className = 'badge-modal';
            modal.innerHTML = `
                        <div class="modal-content">
                            ${modalContent}
                            <button class="close-modal">Close</button>
                        </div>
                    `;
            document.body.appendChild(modal);

            const closeModal = () => {
                modal.remove();
            };

            modal.querySelector('.close-modal').addEventListener('click', closeModal);

            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        });
    });
}

function createParticleSystem() {
    const particleSystem = document.querySelector('.particle-system');

    for (let i = 0; i < 150; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.setProperty('--particleX', Math.random() * 80 - 40);
        particle.style.setProperty('--particleY', Math.random() * 80 - 40);
        particle.style.animationDuration = `${Math.random() * 8 + 4}s`;
        particle.style.animationDelay = `${Math.random() * 4}s`;

        particleSystem.appendChild(particle);
    }
}

function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    let isDarkMode = true;

    themeToggle.addEventListener('click', () => {
        if (isDarkMode) {
            document.documentElement.style.setProperty('--bg-color', '#f0f0f0');
            document.documentElement.style.setProperty('--text', '#333333');
            document.documentElement.style.setProperty('--text-secondary', '#666');
            document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.8)');
            document.documentElement.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.15)');
            document.documentElement.style.setProperty('--glow', 'rgba(64, 111, 243, 0.1)');
            document.documentElement.style.setProperty('--tooltip-bg', 'rgba(255, 255, 255, 0.95)');
            document.documentElement.style.setProperty('--transparent-bg', 'rgba(0, 0, 0, 0.04)');
            document.documentElement.style.setProperty('--shooting-star-color', 'rgba(64, 111, 243, 0.7)');

            // Update feather icon
            themeToggle.innerHTML = '';
            const sunIcon = document.createElement('i');
            sunIcon.setAttribute('data-feather', 'sun');
            themeToggle.appendChild(sunIcon);
            feather.replace();
        } else {
            document.documentElement.style.setProperty('--bg-color', '#0a0e17');
            document.documentElement.style.setProperty('--text', '#e0e0e0');
            document.documentElement.style.setProperty('--text-secondary', '#a0a0c0');
            document.documentElement.style.setProperty('--card-bg', 'rgba(17, 22, 38, 0.6)');
            document.documentElement.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.25)');
            document.documentElement.style.setProperty('--glow', 'rgba(64, 111, 243, 0.2)');
            document.documentElement.style.setProperty('--tooltip-bg', 'rgba(10, 14, 23, 0.95)');
            document.documentElement.style.setProperty('--transparent-bg', 'rgba(255, 255, 255, 0.04)');
            document.documentElement.style.setProperty('--shooting-star-color', 'rgba(255, 255, 255, 0.9)');

            // Update feather icon
            themeToggle.innerHTML = '';
            const moonIcon = document.createElement('i');
            moonIcon.setAttribute('data-feather', 'moon');
            themeToggle.appendChild(moonIcon);
            feather.replace();
        }
        isDarkMode = !isDarkMode;
    });
}
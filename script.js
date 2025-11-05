// Smooth scroll for internal links
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', id);
    }
});

// Header elevate on scroll
const header = document.querySelector('.site-header');
let lastY = 0;
const onScroll = () => {
    const y = window.scrollY || 0;
    header.style.boxShadow = y > 8 ? 'var(--shadow)' : 'none';
    header.style.borderBottomColor = y > 8 ? 'rgba(109, 240, 255, .18)' : 'rgba(109, 240, 255, .10)';
    lastY = y;
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal on view
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.feature, .shot, .panel').forEach((el) => {
    el.classList.add('will-reveal');
    observer.observe(el);
});

// Minimal animation styles injected for reveal (isolated to avoid CSS edits here)
const style = document.createElement('style');
style.textContent = `
  .will-reveal{opacity:.001; transform: translateY(8px); transition: opacity .5s ease, transform .5s ease;}
  .will-reveal.reveal{opacity:1; transform: translateY(0);}
`;
document.head.appendChild(style);

// Download button analytics hook (no external services by default)
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // Hook point to integrate analytics if desired
        console.log('[download] classic_shmup.zip');
    });
}


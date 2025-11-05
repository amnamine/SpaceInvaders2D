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

// Download button analytics hook
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        console.log('[download] spaceinvaders.rar');
        // Add analytics tracking here if needed
    });
}

// Image modal for gallery
const createModal = () => {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Close">×</button>
            <img src="" alt="" class="modal-image">
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
};

const modal = createModal();
const modalImg = modal.querySelector('.modal-image');
const modalClose = modal.querySelector('.modal-close');
const modalBackdrop = modal.querySelector('.modal-backdrop');

const openModal = (imgSrc, imgAlt) => {
    modalImg.src = imgSrc;
    modalImg.alt = imgAlt;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
};

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Gallery image click handlers
document.querySelectorAll('.shot img').forEach((img) => {
    img.addEventListener('click', () => {
        openModal(img.src, img.alt);
    });
});

// Modal styles
const modalStyle = document.createElement('style');
modalStyle.textContent = `
  .image-modal {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity .3s ease;
  }
  .image-modal.active {
    opacity: 1;
    pointer-events: all;
  }
  .modal-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(11, 15, 26, .95);
    backdrop-filter: blur(8px);
  }
  .modal-content {
    position: relative;
    z-index: 1;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-image {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0,0,0,.6);
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
  .modal-close {
    position: absolute;
    top: -50px;
    right: 0;
    background: rgba(109, 240, 255, .2);
    border: 2px solid rgba(109, 240, 255, .4);
    color: #e7ebff;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    font-size: 28px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background .2s ease, border-color .2s ease, transform .2s ease;
    font-family: system-ui, -apple-system, sans-serif;
  }
  .modal-close:hover {
    background: rgba(109, 240, 255, .3);
    border-color: rgba(109, 240, 255, .6);
    transform: scale(1.1);
  }
`;
document.head.appendChild(modalStyle);


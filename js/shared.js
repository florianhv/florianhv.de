'use strict';

(function() {
    const prefersHover = globalThis.matchMedia('(hover: hover)').matches;
    const reducedMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersHover && !reducedMotion) {
        document.addEventListener('mousemove', (e) => {
            document.body.style.setProperty('--cx', e.clientX + 'px');
            document.body.style.setProperty('--cy', e.clientY + 'px');
        });
    }

    const originalTitle = document.title;
    document.addEventListener('visibilitychange', () => {
        document.title = document.hidden ? 'Moin!' : originalTitle;
    });
})();

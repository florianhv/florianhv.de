'use strict';

(function() {
    const wrap = document.querySelector('.photo-wrap');
    const photo = document.querySelector('.photo');

    if (photo) {
        photo.addEventListener('error', () => {
            if (wrap) wrap.style.display = 'none';
            const header = photo.closest('header');
            if (header) header.style.gridTemplateColumns = '1fr';
        });
    }

    if (wrap && photo) {
        const prefersHover = globalThis.matchMedia('(hover: hover)').matches;
        const reducedMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersHover && !reducedMotion) {
            const MAX_TILT = 10;
            let cx = 0, cy = 0, tx = 0, ty = 0, active = false, raf;

            const lerp = (a, b, t) => a + (b - a) * t;

            const tick = () => {
                cx = lerp(cx, tx, 0.1);
                cy = lerp(cy, ty, 0.1);
                photo.style.transform =
                    'perspective(600px) rotateY(' + cx + 'deg) rotateX(' + cy + 'deg) scale3d(1.03, 1.03, 1.03)';
                if (active || Math.abs(cx - tx) > 0.02 || Math.abs(cy - ty) > 0.02) {
                    raf = requestAnimationFrame(tick);
                } else {
                    photo.style.transform = '';
                }
            };

            wrap.addEventListener('mouseenter', () => {
                active = true;
                cancelAnimationFrame(raf);
                raf = requestAnimationFrame(tick);
            });

            wrap.addEventListener('mousemove', (e) => {
                const r = wrap.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;
                tx = (px - 0.5) * MAX_TILT;
                ty = -(py - 0.5) * MAX_TILT;
            });

            wrap.addEventListener('mouseleave', () => {
                active = false;
                tx = 0;
                ty = 0;
                raf = requestAnimationFrame(tick);
            });
        }
    }

    const strings = {
        en: {
            meta: 'Software Developer from Bremen, at <a href="https://novadigital.group/" target="_blank" rel="noopener">Nova&nbsp;Digital&nbsp;Solutions</a>.',
            about: 'I design, build, and maintain production web platforms across the full stack. From architecture and API integrations to quality assurance and cloud infrastructure.',
            navLabel: 'Contact and profiles',
            description: 'Florian H\u00f6veler. Software developer in Bremen, Germany. Full-stack web platforms, API integrations, and cloud infrastructure.',
            impressumLink: 'Imprint',
            toggle: 'DE'
        },
        de: {
            meta: 'Softwareentwickler aus Bremen, bei <a href="https://novadigital.group/" target="_blank" rel="noopener">Nova&nbsp;Digital&nbsp;Solutions</a>.',
            about: 'Ich konzipiere, entwickle und pflege produktionsreife Webplattformen. Von der Architektur \u00fcber API-Integrationen und Qualit\u00e4tssicherung bis zur Cloud-Infrastruktur.',
            navLabel: 'Kontakt und Profile',
            description: 'Florian H\u00f6veler. Softwareentwickler in Bremen. Full-Stack-Webplattformen, API-Integrationen und Cloud-Infrastruktur.',
            impressumLink: 'Impressum',
            toggle: 'EN'
        }
    };

    const btn = document.querySelector('.lang-toggle');
    const nav = document.querySelector('nav');
    const descMeta = document.querySelector('meta[name="description"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');

    const applyLang = (lang) => {
        const s = strings[lang];
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach((el) => {
            el.innerHTML = s[el.dataset.i18n];
        });
        nav?.setAttribute('aria-label', s.navLabel);
        if (descMeta) descMeta.content = s.description;
        if (ogDesc) ogDesc.content = s.description;
        if (btn) btn.textContent = s.toggle;
        localStorage.setItem('lang', lang);
    };

    const setLang = (lang, animate) => {
        if (animate && document.startViewTransition) {
            document.startViewTransition(() => applyLang(lang));
        } else {
            applyLang(lang);
        }
    };

    const saved = localStorage.getItem('lang');
    const initial = saved || (navigator.language?.startsWith('de') ? 'de' : 'en');
    setLang(initial, false);

    btn?.addEventListener('click', () => {
        setLang(document.documentElement.lang === 'en' ? 'de' : 'en', true);
    });

    console.log(
        '%cflorianhv.de',
        'font-size:14px;font-weight:500;color:#0055d4',
        '\nBuilt by hand. No frameworks, no build step, no dependencies.'
    );
})();

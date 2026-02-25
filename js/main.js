(function() {
    var wrap = document.querySelector('.photo-wrap');
    var photo = document.querySelector('.photo');
    if (photo) {
        photo.addEventListener('error', function() {
            if (wrap) wrap.style.display = 'none';
            var header = photo.closest('header');
            if (header) header.style.gridTemplateColumns = '1fr';
        });
    }
    if (wrap && photo && window.matchMedia('(hover: hover)').matches
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        var max = 10, cx = 0, cy = 0, tx = 0, ty = 0, active = false, raf;
        function lerp(a, b, t) { return a + (b - a) * t; }
        function tick() {
            cx = lerp(cx, tx, 0.10);
            cy = lerp(cy, ty, 0.10);
            photo.style.transform =
                'perspective(600px) rotateY(' + cx + 'deg) rotateX(' + cy + 'deg) scale3d(1.03, 1.03, 1.03)';
            if (active || Math.abs(cx - tx) > 0.02 || Math.abs(cy - ty) > 0.02) {
                raf = requestAnimationFrame(tick);
            } else { photo.style.transform = ''; }
        }
        wrap.addEventListener('mouseenter', function() {
            active = true;
            cancelAnimationFrame(raf); raf = requestAnimationFrame(tick);
        });
        wrap.addEventListener('mousemove', function(e) {
            var r = wrap.getBoundingClientRect();
            var px = (e.clientX - r.left) / r.width;
            var py = (e.clientY - r.top) / r.height;
            tx = (px - 0.5) * max; ty = -(py - 0.5) * max;
        });
        wrap.addEventListener('mouseleave', function() {
            active = false;
            tx = 0; ty = 0; raf = requestAnimationFrame(tick);
        });
    }

    if (window.matchMedia('(hover: hover)').matches
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.addEventListener('mousemove', function(e) {
            document.body.style.setProperty('--cx', e.clientX + 'px');
            document.body.style.setProperty('--cy', e.clientY + 'px');
        });
    }

    var strings = {
        en: {
            meta: 'Software Developer from Bremen, at <a href="https://codable.gmbh" target="_blank" rel="noopener">codable</a>.',
            about: 'I design, build, and maintain production web platforms across the full stack. From architecture and API integrations to quality assurance and cloud infrastructure.',
            navLabel: 'Contact and profiles',
            description: 'Florian H\u00f6veler \u2014 Software developer in Bremen, Germany. Full-stack web platforms, API integrations, and cloud infrastructure.',
            impressumLink: 'Imprint',
            toggle: 'DE'
        },
        de: {
            meta: 'Softwareentwickler aus Bremen, bei <a href="https://codable.gmbh" target="_blank" rel="noopener">codable</a>.',
            about: 'Ich konzipiere, entwickle und pflege produktionsreife Webplattformen. Von der Architektur \u00fcber API-Integrationen und Qualit\u00e4tssicherung bis zur Cloud-Infrastruktur.',
            navLabel: 'Kontakt und Profile',
            description: 'Florian H\u00f6veler \u2014 Softwareentwickler in Bremen. Full-Stack-Webplattformen, API-Integrationen und Cloud-Infrastruktur.',
            impressumLink: 'Impressum',
            toggle: 'EN'
        }
    };

    var btn = document.querySelector('.lang-toggle');
    var nav = document.querySelector('nav');
    var desc = document.querySelector('meta[name="description"]');
    var ogDesc = document.querySelector('meta[property="og:description"]');

    function applyLang(lang) {
        var s = strings[lang];
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            el.innerHTML = s[el.getAttribute('data-i18n')];
        });
        if (nav) nav.setAttribute('aria-label', s.navLabel);
        if (desc) desc.content = s.description;
        if (ogDesc) ogDesc.content = s.description;
        if (btn) btn.textContent = s.toggle;
        try { localStorage.setItem('lang', lang); } catch(e) {}
    }

    function setLang(lang, animate) {
        if (animate && document.startViewTransition) {
            document.startViewTransition(function() { applyLang(lang); });
        } else {
            applyLang(lang);
        }
    }

    var saved = null;
    try { saved = localStorage.getItem('lang'); } catch(e) {}
    var initial = saved || (navigator.language && navigator.language.startsWith('de') ? 'de' : 'en');
    setLang(initial, false);

    if (btn) {
        btn.addEventListener('click', function() {
            setLang(document.documentElement.lang === 'en' ? 'de' : 'en', true);
        });
    }

    var originalTitle = document.title;
    document.addEventListener('visibilitychange', function() {
        document.title = document.hidden ? 'Moin!' : originalTitle;
    });

    console.log(
        '%cflorianhv.de',
        'font-size:14px;font-weight:500;color:#0055d4',
        '\nBuilt by hand. No frameworks, no build step, no dependencies.'
    );
})();

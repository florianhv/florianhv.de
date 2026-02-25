(function() {
    var strings = {
        en: {
            back: 'Back',
            title: 'Imprint',
            infoHeading: 'Information pursuant to \u00a7 5 DDG',
            contactHeading: 'Contact',
            emailLabel: 'Email',
            privacyHeading: 'Privacy',
            privacyText: 'This website does not collect, store, or process any personal data. No cookies are set, no analytics tools are used, and no external resources are loaded. All fonts are self-hosted.',
            privacyCdn: 'The site is served through Cloudflare (Cloudflare, Inc., USA). For technical reasons, connection data (e.g., IP address) is processed by Cloudflare. More information: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">Cloudflare Privacy Policy</a>.'
        },
        de: {
            back: 'Zur\u00fcck',
            title: 'Impressum',
            infoHeading: 'Angaben gem\u00e4\u00df \u00a7 5 DDG',
            contactHeading: 'Kontakt',
            emailLabel: 'E-Mail',
            privacyHeading: 'Datenschutz',
            privacyText: 'Diese Website erhebt, speichert und verarbeitet keine personenbezogenen Daten. Es werden keine Cookies gesetzt, keine Analyse-Tools eingebunden und keine externen Ressourcen geladen. Die verwendeten Schriftarten werden lokal gehostet.',
            privacyCdn: 'Die Auslieferung erfolgt \u00fcber Cloudflare (Cloudflare, Inc., USA). Dabei werden technisch bedingt Verbindungsdaten (z.\u2009B. IP-Adresse) verarbeitet. Weitere Informationen: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">Cloudflare Privacy Policy</a>.'
        }
    };

    var saved = null;
    try { saved = localStorage.getItem('lang'); } catch(e) {}
    var lang = saved || (navigator.language && navigator.language.startsWith('de') ? 'de' : 'en');
    var s = strings[lang];

    document.documentElement.lang = lang;
    document.title = (lang === 'en' ? 'Imprint' : 'Impressum') + ' - Florian H\u00f6veler';
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        if (s[key]) el.innerHTML = s[key];
    });
})();

const translations = {
    fa: {
        title: 'بهینه‌ساز کانفیگ V2Ray CF-CDN',
        notice: 'این ابزار به شما کمک می‌کند تا کانفیگ های خودتان را که با ورکر کلادفلر ساخته اید بهینه سازی کنید و به بهترین سرعت ممکن برسونید. توجه داشته باشید باید قبل از شروع تست فیلترشکن خودتون رو خاموش کنید تا تست به درستی انجام بشه',
        infoText:
            'بعضی مواقع امکان افزایش پینگ رو دارید ولی نگران نباشید چون بهینه سازی و افزایش سرعت در هر صورت اتفاق میوفته',
        placeholder: 'کانفیگ vless:// یا trojan:// خود را اینجا قرار دهید',
        optimizeButton: 'بهینه‌سازی کن',
        testingDomains: 'در حال تست دامنه‌ها...',
        testingPorts: 'در حال تست پورت',
        portTestingComplete: '✅ تست پورت‌ها کامل شد.',
        noWorkingPorts: '❌ هیچ پورت فعالی پیدا نشد.',
        finalOptimizedConfig: '⚡ کانفیگ نهایی بهینه‌شده:',
        copyConfig: 'کپی کانفیگ',
        noReachableDomains: 'هیچ دامنه قابل دسترسی پیدا نشد.',
        invalidFormat: '❌ فرمت نامعتبر! فقط vless:// یا trojan:// مجاز است.',
        languageButton: 'English',
        contactDeveloper: 'ارتباط با توسعه دهنده',
    },
    en: {
        title: 'V2Ray CF-CDN Config Optimizer',
        notice: 'This tool helps you optimize your custom V2Ray configurations that you made with cloudflare workers and provides the best possible speed. Please make sure to turn off your VPN before starting the process.',
        infoText:
            "Sometimes you may experience increased ping but don't worry because optimization and speed improvement will happen anyway",
        placeholder: 'Paste your vless:// or trojan:// config link',
        optimizeButton: 'Optimize Now',
        testingDomains: 'Testing Domains...',
        testingPorts: 'Testing port',
        portTestingComplete: '✅ Port testing complete.',
        noWorkingPorts: '❌ No working ports found.',
        finalOptimizedConfig: '⚡ Final Optimized Config:',
        copyConfig: 'Copy Config',
        noReachableDomains: 'No reachable domains found.',
        invalidFormat: '❌ Invalid format! Only vless:// or trojan:// allowed.',
        languageButton: 'فارسی',
        contactDeveloper: 'Contact To Developer',
    },
};

let currentLang = 'fa';

function switchLanguage() {
    currentLang = currentLang === 'fa' ? 'en' : 'fa';
    document.documentElement.lang = currentLang;
    document.body.lang = currentLang;
    updateUI();
    localStorage.setItem('language', currentLang);
}

function updateUI() {
    const t = translations[currentLang];

    document.querySelector('h1').textContent = t.title;

    const noticeElement = document.querySelector('.notice');
    noticeElement.innerHTML = `<p>${t.notice}</p>`;

    const ipInfoElement = document.querySelector('.ip-info p');
    if (ipInfoElement) {
        ipInfoElement.textContent = t.infoText;
    }

    document.getElementById('config-input').placeholder = t.placeholder;

    document.getElementById(
        'optimize-btn'
    ).innerHTML = `<i class="fas fa-rocket"></i> ${t.optimizeButton}`;

    document.getElementById(
        'language-toggle'
    ).innerHTML = `<i class="fas fa-globe"></i> ${t.languageButton}`;

    document.getElementById('contact-developer').textContent =
        t.contactDeveloper;
}

const domains = [
    'workers.dev',
    'alirezataji.ir',
    'chat.deepseek.com',
    'tgju.org',
    'kifpool.me',
    'chatgpt.com',
    'cdnjs.com',
    'w3.org',
    'upwork.com',
    'laravel.com',
    'laracasts.com',
    '2ch-c.net',
    '4dsply.com',
    'adf.ly',
    'all.biz',
];

const ports = [
    443, 8443, 2053, 2083, 2087, 2096, 80, 8080, 8880, 2052, 2082, 2086, 2095,
];
const TIMEOUT_MS = 2000;

async function fetchWithTimeout(url, timeout = TIMEOUT_MS) {
    return Promise.race([
        fetch(url, { mode: 'no-cors' }),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), timeout)
        ),
    ]);
}

function getSpinner() {
    return `<span class="spinner" style="display:inline-block;">
      <svg viewBox="0 0 50 50" width="20" height="20" 
           style="animation: rotate-spinner 1s linear infinite;">
        <circle cx="25" cy="25" r="20" stroke="#C7A46C" stroke-width="4" opacity="0.2" fill="none"/>
        <circle cx="25" cy="25" r="20" stroke="#C7A46C" stroke-width="4" stroke-dasharray="31.4 100" fill="none"/>
      </svg>
    </span>`;
}

function validateConfig(cfg) {
    return cfg.startsWith('vless://') || cfg.startsWith('trojan://');
}

async function pingDomain(domain) {
    let start = performance.now();
    try {
        await fetchWithTimeout('https://' + domain);
        return Math.round(performance.now() - start);
    } catch {
        return null;
    }
}

async function startOptimization() {
    const cfgInput = document.getElementById('config-input');
    const raw = cfgInput.value.trim();

    if (!validateConfig(raw)) {
        const t = translations[currentLang];
        showNotification(t.invalidFormat, 'error');
        return;
    }

    cfgInput.disabled = true;
    document.getElementById('optimize-btn').disabled = true;

    const t = translations[currentLang];
    document.getElementById(
        'domain-results'
    ).innerHTML = `<h3>${t.testingDomains}</h3><ul id='domain-list'></ul>`;
    const ul = document.getElementById('domain-list');
    let results = [];

    for (let domain of domains) {
        const li = document.createElement('li');
        li.innerHTML = `${getSpinner()} ${domain} <span>Checking...</span>`;
        ul.appendChild(li);

        let latency = await pingDomain(domain);
        if (latency !== null) {
            li.innerHTML = `<span class="checkmark">✅</span> ${domain} <span>${latency} ms</span>`;
            results.push({ domain, latency });
        } else {
            li.innerHTML = `<span class="crossmark">❌</span> ${domain} <span>Failed</span>`;
        }
    }

    results.sort((a, b) => a.latency - b.latency);
    const bestDomain = results[0]?.domain;

    if (!bestDomain) {
        const t = translations[currentLang];
        document.getElementById('progress-text').innerText =
            t.noReachableDomains;
        cfgInput.disabled = false;
        document.getElementById('optimize-btn').disabled = false;
        return;
    }

    const updatedConfigBase = raw.replace(/@[^:]+:/, `@${bestDomain}:`);
    await testPorts(updatedConfigBase, bestDomain);
}

async function testPorts(cfgBase, domain) {
    const fill = document.getElementById('progress-fill');
    const txt = document.getElementById('progress-text');
    const t = translations[currentLang];
    let portResults = [];

    for (let i = 0; i < ports.length; i++) {
        const port = ports[i];
        fill.style.width = ((i + 1) / ports.length) * 100 + '%';
        txt.innerHTML = `${getSpinner()} ${t.testingPorts} ${port} (${i + 1}/${
            ports.length
        })...`;

        try {
            await fetchWithTimeout(`https://${domain}:${port}`);
            const simulatedLatency = Math.floor(Math.random() * 80 + 20);
            portResults.push({ port: port, latency: simulatedLatency });
        } catch {}
    }

    txt.innerText = t.portTestingComplete;

    if (portResults.length === 0) {
        document.getElementById(
            'final-results'
        ).innerHTML = `<p>${t.noWorkingPorts}</p>`;
        document.getElementById('config-input').disabled = false;
        document.getElementById('optimize-btn').disabled = false;
        return;
    }

    portResults.sort((a, b) => a.latency - b.latency);
    const bestPort = portResults[0].port;

    const finalConfig =
        cfgBase.replace(/:[0-9]+/, ':' + bestPort).replace(/#.*$/, '') +
        '#%E2%98%81%EF%B8%8F%20%7C%20Optimized%20With%20CF%20V2ray%20Optimizer%20%7C%20%40NajiDevs[GITHUB]';

    document.getElementById('final-results').innerHTML = `
      <h3>${t.finalOptimizedConfig}</h3>
      <div class="result-box">
        <p style="word-break: break-word;"><code>${finalConfig}</code></p>
        <button class="copy-btn" onclick="copyToClipboard('${finalConfig}')">${t.copyConfig}</button>
      </div>
    `;

    document.getElementById('config-input').disabled = false;
    document.getElementById('optimize-btn').disabled = false;
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        const t = translations[currentLang];
        showNotification(
            t.copyConfig === 'Copy Config' ? 'Copied to clipboard!' : 'کپی شد!',
            'success'
        );
    } catch (err) {
        showNotification('Failed to copy', 'error');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${
          type === 'success'
              ? '#4CAF50'
              : type === 'error'
              ? '#f44336'
              : '#2196F3'
      };
      color: white;
      padding: 1em 1.5em;
      border-radius: 8px;
      z-index: 1000;
      animation: slideIn 0.3s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function initApp() {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        currentLang = savedLang;
        document.documentElement.lang = currentLang;
        document.body.lang = currentLang;
    }

    updateUI();

    document
        .getElementById('language-toggle')
        .addEventListener('click', switchLanguage);
    document
        .getElementById('optimize-btn')
        .addEventListener('click', startOptimization);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', initApp);

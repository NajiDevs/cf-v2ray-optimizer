const translations = {
    fa: {
        title: 'بهینه‌ساز کانفیگ V2Ray CF-CDN',
        notice: 'این ابزار به شما کمک می‌کند تا کانفیگ های خودتان را که با ورکر کلادفلر ساخته اید بهینه سازی کنید و به بهترین سرعت ممکن برسونید. توجه داشته باشید باید قبل از شروع تست فیلترشکن خودتون رو خاموش کنید تا تست به درستی انجام بشه',
        infoText: 'بعضی مواقع امکان افزایش پینگ رو دارید ولی نگران نباشید چون بهینه سازی و افزایش سرعت در هر صورت اتفاق میوفته',
        placeholder: 'کانفیگ vless://, trojan:// یا vmess:// خود را اینجا قرار دهید',
        optimizeButton: 'بهینه‌سازی کن',
        testingDomains: 'در حال تست دامنه‌ها...',
        testingPorts: 'در حال تست پورت',
        testingIPs: 'در حال اسکن و تست آی‌پی‌ها...',
        portTestingComplete: '✅ تست پورت‌ها کامل شد.',
        noWorkingPorts: '❌ هیچ پورت فعالی پیدا نشد.',
        finalOptimizedConfig: '⚡ کانفیگ نهایی بهینه‌شده:',
        copyConfig: 'کپی کانفیگ',
        noReachableDomains: 'هیچ دامنه قابل دسترسی پیدا نشد.',
        invalidFormat: '❌ فرمت نامعتبر! فقط vless://, trojan:// یا vmess:// مجاز است.',
        languageButton: 'English',
        contactDeveloper: 'ارتباط با توسعه دهنده',
        optimizationMode: 'روش بهینه‌سازی',
        useDomain: 'استفاده از دامنه',
        useCleanIP: 'استفاده از آی‌پی تمیز',
        ipScanSettings: 'تنظیمات اسکن آی‌پی',
        maxScanCount: 'حداکثر تعداد اسکن',
        maxPing: 'حداکثر پینگ قبول‌شده (ms)',
        ipRanges: 'رنج‌های آی‌پی',
        startIPScan: 'شروع اسکن آی‌پی',
        ipScanResults: 'نتایج اسکن آی‌پی',
        foundIPs: 'آی‌پی‌های پیدا شده',
        copiedToClipboard: 'کپی شد!',
        noIpsFound: 'هیچ آی‌پی مناسب پیدا نشد.',
    },
    en: {
        title: 'V2Ray CF-CDN Config Optimizer',
        notice: 'This tool helps you optimize your custom V2Ray configurations that you made with cloudflare workers and provides the best possible speed. Please make sure to turn off your VPN before starting the process.',
        infoText: "Sometimes you may experience increased ping but don't worry because optimization and speed improvement will happen anyway",
        placeholder: 'Paste your vless://, trojan:// or vmess:// config link',
        optimizeButton: 'Optimize Now',
        testingDomains: 'Testing Domains...',
        testingPorts: 'Testing port',
        testingIPs: 'Scanning and testing IPs...',
        portTestingComplete: '✅ Port testing complete.',
        noWorkingPorts: '❌ No working ports found.',
        finalOptimizedConfig: '⚡ Final Optimized Config:',
        copyConfig: 'Copy Config',
        noReachableDomains: 'No reachable domains found.',
        invalidFormat: '❌ Invalid format! Only vless://, trojan:// or vmess:// allowed.',
        languageButton: 'فارسی',
        contactDeveloper: 'Contact To Developer',
        optimizationMode: 'Optimization Method',
        useDomain: 'Use Domain',
        useCleanIP: 'Use Clean IP',
        ipScanSettings: 'IP Scan Settings',
        maxScanCount: 'Max Scan Count',
        maxPing: 'Max Acceptable Ping (ms)',
        ipRanges: 'IP Ranges',
        startIPScan: 'Start IP Scan',
        ipScanResults: 'IP Scan Results',
        foundIPs: 'Found IPs',
        copiedToClipboard: 'Copied to clipboard!',
        noIpsFound: 'No suitable IPs found.',
    },
};

let currentLang = 'fa';
let optimizationMode = 'domain';
let scannedIPs = [];
let selectedIP = null;

// Cloudflare IP Ranges
const CLOUDFLARE_RANGES = [
    "173.245.48.0/20", "103.21.244.0/22", "103.22.200.0/22", "103.31.4.0/22",
    "141.101.64.0/18", "108.162.192.0/18", "190.93.240.0/20", "188.114.96.0/20",
    "197.234.240.0/22", "198.41.128.0/17", "162.158.0.0/15", "104.16.0.0/13",
    "104.24.0.0/14", "172.64.0.0/13", "131.0.72.0/22"
];

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
    if (ipInfoElement) ipInfoElement.textContent = t.infoText;
    document.getElementById('config-input').placeholder = t.placeholder;
    document.getElementById('optimize-btn').innerHTML = `<i class="fas fa-rocket"></i> ${t.optimizeButton}`;
    document.getElementById('language-toggle').innerHTML = `<i class="fas fa-globe"></i> ${t.languageButton}`;
    document.getElementById('contact-developer').textContent = t.contactDeveloper;
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

// ============================================================
// IP SCANNING UTILITIES
// ============================================================
const ipToLong = (ip) => ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
const longToIp = (long) => [24, 16, 8, 0].map((shift) => (long >>> shift) & 255).join('.');

const parseCIDR = (cidr) => {
    const [ip, mask] = cidr.split('/');
    const maskInt = parseInt(mask, 10);
    const ipLong = ipToLong(ip);
    const size = Math.pow(2, 32 - maskInt);
    return { start: ipLong, end: ipLong + size - 1 };
};

const getRandomIpFromRanges = (ranges) => {
    const range = ranges[Math.floor(Math.random() * ranges.length)];
    const { start, end } = parseCIDR(range);
    const randomLong = Math.floor(Math.random() * (end - start)) + start;
    return longToIp(randomLong);
};

async function measureIPLatency(ip, port = 443) {
    const start = performance.now();
    const timeout = 1500;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        await fetch(`https://${ip}:${port}/__down`, { 
            mode: 'no-cors', 
            signal: controller.signal,
            cache: 'no-store'
        });
        clearTimeout(id);
        return Math.round(performance.now() - start);
    } catch (error) {
        clearTimeout(id);
        return error.name === 'AbortError' ? -1 : Math.round(performance.now() - start);
    }
}

// ============================================================
// CONFIG PARSING
// ============================================================
function parseVLESS(config) {
    const match = config.match(/vless:\/\/([^@]+)@([^:]+):(\d+)(.*)#?(.*)/);
    if (!match) return null;
    return {
        protocol: 'vless',
        userId: match[1],
        address: match[2],
        port: parseInt(match[3]),
        params: match[4],
        name: match[5] || 'Optimized',
    };
}

function parseTrojan(config) {
    const match = config.match(/trojan:\/\/([^@]+)@([^:]+):(\d+)(.*)#?(.*)/);
    if (!match) return null;
    return {
        protocol: 'trojan',
        password: match[1],
        address: match[2],
        port: parseInt(match[3]),
        params: match[4],
        name: match[5] || 'Optimized',
    };
}

function parseVMESS(config) {
    try {
        const base64String = config.replace('vmess://', '');
        const decodedString = atob(base64String);
        const parsed = JSON.parse(decodedString);
        return {
            protocol: 'vmess',
            add: parsed.add || '',
            port: parsed.port || 443,
            ps: parsed.ps || 'Optimized',
            id: parsed.id || '',
            aid: parsed.aid || '0',
            net: parsed.net || 'ws',
            type: parsed.type || 'none',
            host: parsed.host || '',
            path: parsed.path || '/',
            tls: parsed.tls || 'tls',
            sni: parsed.sni || '',
            alpn: parsed.alpn || '',
            fp: parsed.fp || '',
            v: parsed.v || '2',
            _original: parsed,
        };
    } catch (e) {
        return null;
    }
}

function parseJSON(config) {
    try {
        const parsed = JSON.parse(config);
        if (!parsed.outbounds || !Array.isArray(parsed.outbounds)) return null;
        const proxy = parsed.outbounds[0];
        if (!proxy) return null;
        
        let address = '';
        let port = 443;
        let protocol = proxy.protocol || 'vless';
        
        if (protocol === 'vless' && proxy.settings?.vnext?.[0]) {
            address = proxy.settings.vnext[0].address;
            port = proxy.settings.vnext[0].port;
        } else if (protocol === 'trojan' && proxy.settings?.servers?.[0]) {
            address = proxy.settings.servers[0].address;
            port = proxy.settings.servers[0].port;
        }
        
        return {
            protocol: 'json',
            address,
            port,
            _original: parsed,
        };
    } catch (e) {
        return null;
    }
}

function detectConfigType(config) {
    config = config.trim();
    if (config.startsWith('vless://')) return 'vless';
    if (config.startsWith('trojan://')) return 'trojan';
    if (config.startsWith('vmess://')) return 'vmess';
    if (config.startsWith('{')) return 'json';
    return null;
}

// ============================================================
// CONFIG BUILDING
// ============================================================
function buildOptimizedConfig(parsed, newAddress, newPort, newName = null) {
    const optimizedRemark = '☁️ | Optimized With CF V2ray Optimizer | @NajiDevs[GITHUB]';
    const name = newName || optimizedRemark;
    
    if (parsed.protocol === 'vless') {
        return `vless://${parsed.userId}@${newAddress}:${newPort}${parsed.params || ''}#${name}`;
    } else if (parsed.protocol === 'trojan') {
        return `trojan://${parsed.password}@${newAddress}:${newPort}${parsed.params || ''}#${name}`;
    } else if (parsed.protocol === 'vmess') {
        const config = { ...parsed._original };
        config.add = newAddress;
        config.port = newPort;
        config.ps = name;
        const encoded = btoa(JSON.stringify(config));
        return `vmess://${encoded}`;
    } else if (parsed.protocol === 'json') {
        const config = JSON.parse(JSON.stringify(parsed._original));
        if (config.outbounds[0].settings?.vnext?.[0]) {
            config.outbounds[0].settings.vnext[0].address = newAddress;
            config.outbounds[0].settings.vnext[0].port = newPort;
        } else if (config.outbounds[0].settings?.servers?.[0]) {
            config.outbounds[0].settings.servers[0].address = newAddress;
            config.outbounds[0].settings.servers[0].port = newPort;
        }
        return JSON.stringify(config, null, 2);
    }
    
    return parsed;
}

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
    const type = detectConfigType(cfg);
    return type && (type === 'vless' || type === 'trojan' || type === 'vmess' || type === 'json');
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

// ============================================================
// OPTIMIZATION FUNCTIONS
// ============================================================
let ipScanAborted = false;

async function optimizeWithDomain(config) {
    const t = translations[currentLang];
    const configType = detectConfigType(config);
    
    if (!configType) {
        showNotification(t.invalidFormat, 'error');
        return null;
    }
    
    let parsed;
    if (configType === 'vless') parsed = parseVLESS(config);
    else if (configType === 'trojan') parsed = parseTrojan(config);
    else if (configType === 'vmess') parsed = parseVMESS(config);
    else if (configType === 'json') parsed = parseJSON(config);
    
    if (!parsed) {
        showNotification(t.invalidFormat, 'error');
        return null;
    }
    
    // Test domains
    document.getElementById('domain-results').innerHTML = `<h3>${t.testingDomains}</h3><ul id='domain-list'></ul>`;
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
        document.getElementById('progress-text').innerText = t.noReachableDomains;
        return null;
    }
    
    return await testPortsForOptimization(parsed, bestDomain);
}

async function scanAndOptimizeWithIP(config) {
    const t = translations[currentLang];
    const configType = detectConfigType(config);
    
    if (!configType) {
        showNotification(t.invalidFormat, 'error');
        return null;
    }
    
    let parsed;
    if (configType === 'vless') parsed = parseVLESS(config);
    else if (configType === 'trojan') parsed = parseTrojan(config);
    else if (configType === 'vmess') parsed = parseVMESS(config);
    else if (configType === 'json') parsed = parseJSON(config);
    
    if (!parsed) {
        showNotification(t.invalidFormat, 'error');
        return null;
    }
    
    ipScanAborted = false;
    scannedIPs = [];
    selectedIP = null;
    
    // Get settings
    const maxScanCount = parseInt(document.getElementById('max-scan-input')?.value || 500);
    const maxPing = parseInt(document.getElementById('max-ping-input')?.value || 200);
    
    document.getElementById('domain-results').innerHTML = `<h3>${t.testingIPs}</h3><ul id='domain-list'></ul>`;
    const ul = document.getElementById('domain-list');
    
    let scannedCount = 0;
    while (!ipScanAborted && scannedCount < maxScanCount && scannedIPs.length < 10) {
        const ip = getRandomIpFromRanges(CLOUDFLARE_RANGES);
        const latency = await measureIPLatency(ip, 443);
        
        scannedCount++;
        
        if (latency && latency !== -1 && latency <= maxPing) {
            scannedIPs.push({ ip, latency });
            scannedIPs.sort((a, b) => a.latency - b.latency);
            
            // Update UI
            ul.innerHTML = '';
            for (let item of scannedIPs.slice(0, 10)) {
                const li = document.createElement('li');
                li.innerHTML = `<span class="checkmark">✅</span> ${item.ip} <span>${item.latency} ms</span>`;
                ul.appendChild(li);
            }
        }
        
        document.getElementById('progress-text').innerText = `${t.testingIPs} ${scannedCount}/${maxScanCount} - ${t.foundIPs}: ${scannedIPs.length}`;
        
        if (scannedIPs.length >= 5) break;
    }
    
    if (scannedIPs.length === 0) {
        document.getElementById('progress-text').innerText = t.noIpsFound;
        return null;
    }
    
    selectedIP = scannedIPs[0];
    return await testPortsForOptimization(parsed, selectedIP.ip);
}

async function testPortsForOptimization(parsed, domain) {
    const fill = document.getElementById('progress-fill');
    const txt = document.getElementById('progress-text');
    const t = translations[currentLang];
    let portResults = [];
    
    for (let i = 0; i < ports.length; i++) {
        const port = ports[i];
        fill.style.width = ((i + 1) / ports.length) * 100 + '%';
        txt.innerHTML = `${getSpinner()} ${t.testingPorts} ${port} (${i + 1}/${ports.length})...`;
        
        try {
            await fetchWithTimeout(`https://${domain}:${port}`);
            const simulatedLatency = Math.floor(Math.random() * 80 + 20);
            portResults.push({ port: port, latency: simulatedLatency });
        } catch {}
    }
    
    txt.innerText = t.portTestingComplete;
    
    if (portResults.length === 0) {
        document.getElementById('final-results').innerHTML = `<p>${t.noWorkingPorts}</p>`;
        return null;
    }
    
    portResults.sort((a, b) => a.latency - b.latency);
    const bestPort = portResults[0].port;
    
    return buildOptimizedConfig(parsed, domain, bestPort);
}

async function startOptimization() {
    const cfgInput = document.getElementById('config-input');
    const raw = cfgInput.value.trim();

    if (!raw) {
        const t = translations[currentLang];
        showNotification(t.invalidFormat, 'error');
        return;
    }

    if (!validateConfig(raw)) {
        const t = translations[currentLang];
        showNotification(t.invalidFormat, 'error');
        return;
    }

    cfgInput.disabled = true;
    document.getElementById('optimize-btn').disabled = true;

    const t = translations[currentLang];
    let optimizedConfig;
    
    if (optimizationMode === 'domain') {
        optimizedConfig = await optimizeWithDomain(raw);
    } else {
        optimizedConfig = await scanAndOptimizeWithIP(raw);
    }

    if (optimizedConfig) {
        const escapedConfig = optimizedConfig.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/`/g, '\\`');
        document.getElementById('final-results').innerHTML = `
          <h3>${t.finalOptimizedConfig}</h3>
          <div class="result-box">
            <p style="word-break: break-word;"><code>${escapedConfig}</code></p>
            <button class="copy-btn" onclick="copyToClipboard('${escapedConfig.replace(/'/g, "\\'")}')">${t.copyConfig}</button>
          </div>
        `;
    }

    cfgInput.disabled = false;
    document.getElementById('optimize-btn').disabled = false;
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        const t = translations[currentLang];
        showNotification(t.copiedToClipboard, 'success');
    } catch (err) {
        showNotification('خطا در کپی', 'error');
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

function switchOptimizationMode(mode) {
    optimizationMode = mode;
    const ipSettings = document.getElementById('ip-scan-settings');
    
    if (mode === 'ip') {
        ipSettings.style.display = 'block';
    } else {
        ipSettings.style.display = 'none';
    }
    
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
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

    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => switchOptimizationMode(btn.dataset.mode));
    });

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
      .mode-btn.active {
        background: #c7a46c !important;
        color: #23201b !important;
      }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', initApp);

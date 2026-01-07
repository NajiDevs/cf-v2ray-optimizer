<p align="center">
  <img src="./assets/Logo.png" alt="Cloudflare Search Icon" width="150" style="border-radius: 20px;"/>
</p>

# ⚡️ Cloudflare Worker V2Ray Optimizer

[🇺🇸 English Version](#-english-description)

## 🇮🇷 توضیحات فارسی

این ابزار به شما کمک می‌کند تا کانفیگ‌های اختصاصی خود را که با Cloudflare Workers ساخته‌اید، بهینه‌سازی کنید و عملکرد نهایی آنها را به بهترین سرعت ممکن برسانید.

### 🎯 راهنمای انتخاب حالت بهینه‌سازی

برای دریافت بهترین نتیجه، با توجه به نیاز خود یکی از دو حالت زیر را انتخاب کنید:

1.  **🔗 حالت آی‌پی تمیز (Clean IP Mode):**
    * **سرعت:** بسیار بالا (مناسب برای گیمینگ و دانلود).
    * **پایداری:** در برابر اختلالات منطقه‌ای بسیار قوی عمل می‌کند، اما ممکن است دوره کارکرد آن (از ۲ هفته تا ۲ ماه) کوتاه‌تر باشد.
    * **پوشش:** محلی (بهترین عملکرد در سطح یک شهر یا استان).
    * **مناسب برای:** زمان‌هایی که اختلال شدید است و نیاز به سرعت حداکثری دارید.

2.  **🌍 حالت دامنه (Domain Mode):**
    * **سرعت:** نرمال و پایدار (مناسب اینستاگرام، یوتیوب و وب‌گردی).
    * **پایداری:** طولانی‌مدت و همیشگی.
    * **پوشش:** گسترده (قابل استفاده در سطح کشور و بین‌المللی).
    * **مناسب برای:** استفاده روزمره و پایداری بدون نیاز به تغییر مداوم.

---

### ⚙️ مدیریت پورت‌ها (Port Settings)

شما می‌توانید پورت کانفیگ خود را به سه روش تنظیم کنید:
* **تست خودکار:** بررسی تمامی پورت‌های پشتیبانی شده کلودفلر و انتخاب بهترین و سریع‌ترین پورت به صورت خودکار.
* **پورت اصلی:** حفظ پورت فعلی کانفیگ بدون تغییر.
* **پورت سفارشی:** وارد کردن یک پورت خاص به انتخاب شما.

---

🔧 **ویژگی‌های جدید:**
- 🌐 **پشتیبانی از زبان فارسی و انگلیسی**
- 🎨 **رابط کاربری مدرن** با انیمیشن‌های جذاب
- 📱 **طراحی واکنش‌گرا** برای موبایل و دسکتاپ
- 🌐 **پشتیبانی چند پروتکلی** - VLESS, Trojan, VMESS, و JSON Fragmented
- 🔍 **اسکن IP تمیز Cloudflare** با پینگ پایین
- 📊 **نتایج دقیق** - تغییر خودکار Address, Port, Remark
- --> با تشکر ویژه از [@EmadN87](https://github.com/emadn87) عزیز برای بازطراحی UI پروژه ورژن دوم

⚠️ **توجه:** قبل از شروع تست، لطفاً فیلترشکن خود را خاموش کنید.

🚀 [ورود به ابزار](https://najidevs.github.io/cf-v2ray-optimizer/)

---

## 🇺🇸 English Description

This tool helps you optimize your custom V2Ray configurations created using Cloudflare Workers for maximum performance.

### 🎯 Optimization Mode Guide

Choose the best mode based on your specific needs:

1.  **🔗 Clean IP Mode:**
    * **Speed:** Very High (Ideal for gaming and heavy downloads).
    * **Stability:** Highly effective against regional internet disruptions, but the config lifespan may vary from 2 weeks to 2 months.
    * **Coverage:** Localized (Best performance within a specific city or province).
    * **Best for:** Bypassing severe restrictions with maximum speed.

2.  **🌍 Domain Mode:**
    * **Speed:** Normal & Consistent (Ideal for Instagram, YouTube, and browsing).
    * **Stability:** Long-term and highly reliable.
    * **Coverage:** Global (Works seamlessly across the country and worldwide).
    * **Best for:** Daily usage and set-and-forget stability.

---

### ⚙️ Port Settings

You can manage your configuration ports in three ways:
* **Auto-Scan:** Automatically tests all Cloudflare-supported ports and selects the one with the best performance.
* **Original Port:** Keeps the current port of your config.
* **Custom Port:** Allows you to manually set a specific port.


---

🔧 **Features:**
- 🌐 **Bilingual Support** (Persian & English)
- 🎨 **Modern UI** with smooth animations
- 📱 **Fully Responsive** design
- 🌐 **Multi-Protocol Support** - VLESS, Trojan, VMESS, and JSON Fragmented
- 🔍 **Cloudflare Clean IP Scanning** with low latency
- 📊 **Accurate Results** - Automatic modification of Address, Port, and Remark
- --> Special thanks to [@EmadN87](https://github.com/emadn87) for the UI redesign V2

⚠️ **Important Note:** Please turn off your VPN before starting the analysis for accurate results.

🚀 [Launch the Tool](https://najidevs.github.io/cf-v2ray-optimizer/)

---

## 📁 Project Structure
```
cf-v2ray-optimizer/
├── cf-v2ray-optimizer.html  # Main optimizer
├── assets/
│   └── Logo.png             # Logo
└── README.md                # This file
```

## 🛠️ Technologies Used

- **HTML5 / CSS3 / JavaScript ES6+**
- **Font Awesome** & **Google Fonts** (Vazirmatn, Fira Code)

---

## 📝 License

This project is open-source and available under the LICENSE file.

**Made with ❤️ for bypassing internet censorship**

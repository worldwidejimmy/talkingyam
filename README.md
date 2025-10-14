# Talking Yam 🗣️

Political Analysis with Jimmy and ChatGPT5

**Live Site:** https://talkingyam.com

---

## 🎯 Overview

A React + Vite application that renders markdown content for political analysis and commentary. Deployed on OVH Ubuntu server with PM2 process management and Apache reverse proxy.

## 🏗️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite 7.1.10** - Build tool & dev server
- **react-markdown** - Markdown rendering
- **highlight.js 11.9.0** - Syntax highlighting
- **remark-gfm** - GitHub Flavored Markdown support
- **rehype-highlight** - Code block highlighting
- **rehype-raw** - HTML support in markdown

### Server
- **Node.js** v20.x
- **PM2** - Process manager
- **serve** - Static file server
- **Apache 2.4.58** - Reverse proxy with SSL
- **Ubuntu 24.04.3 LTS**

---

## 📁 Project Structure

```
/home/ubuntu/apps/talkingyam.prod/
├── src/
│   ├── App.jsx           # Main React component
│   ├── App.css           # Styling with improved spacing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/
│   ├── content.md        # Markdown content (edit this!)
│   └── favicon.ico       # Site icon
├── dist/                 # Production build (gitignored)
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── DEPLOYMENT.md         # Deployment documentation
└── README.md             # This file
```

---

## 🚀 Deployment Info

### PM2 Process
- **Name:** `talkingyam-prod`
- **Port:** 5080
- **Command:** `serve dist -l 5080`
- **Auto-restart:** ✅ Enabled

### Apache Configuration
- **VirtualHost:** `/etc/apache2/sites-available/talkingyam.com-le-ssl.conf`
- **Proxy:** https://talkingyam.com → http://localhost:5080
- **SSL:** Let's Encrypt (auto-renewing, expires Jan 12, 2026)

### App Registry
- **Port block:** 5080-5089 (reserved for talkingyam)
- **Registry:** `/home/ubuntu/apps/app-registry.json`
- **Next available port:** 5090

---

## 🛠️ Development

### Prerequisites
```bash
node >= 20.x
npm >= 10.x
```

### Setup
```bash
cd /home/ubuntu/apps/talkingyam.prod
npm install
```

### Development Server
```bash
npm run dev
# Runs on http://localhost:5173
```

For remote access:
```bash
npm run dev -- --host 0.0.0.0 --port 5081
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 📝 Making Changes

### Update Content
1. Edit the markdown file:
   ```bash
   vim public/content.md
   ```

2. Rebuild:
   ```bash
   npm run build
   ```

3. Restart PM2:
   ```bash
   pm2 restart talkingyam-prod
   ```

### Update Styling
1. Edit CSS:
   ```bash
   vim src/App.css
   ```

2. Rebuild and restart:
   ```bash
   npm run build
   pm2 restart talkingyam-prod
   ```

### Update React Components
1. Edit source:
   ```bash
   vim src/App.jsx
   ```

2. Rebuild and restart:
   ```bash
   npm run build
   pm2 restart talkingyam-prod
   ```

---

## 🔧 Management Commands

### PM2 Commands
```bash
# Status
pm2 list
pm2 show talkingyam-prod

# Logs
pm2 logs talkingyam-prod
pm2 logs talkingyam-prod --lines 100
pm2 logs talkingyam-prod --err

# Control
pm2 restart talkingyam-prod
pm2 stop talkingyam-prod
pm2 start talkingyam-prod

# Monitor
pm2 monit

# Save configuration (after changes)
pm2 save
```

### Apache Commands
```bash
# Test configuration
sudo apache2ctl configtest

# Reload (graceful restart)
sudo systemctl reload apache2

# Full restart
sudo systemctl restart apache2

# View logs
sudo tail -f /var/log/apache2/talkingyam.com_access.log
sudo tail -f /var/log/apache2/talkingyam.com_error.log
```

---

## 📊 Features

### Markdown Support
- ✅ Headers (h1-h6)
- ✅ Bold, italic, strikethrough
- ✅ Links and images
- ✅ Ordered and unordered lists
- ✅ Tables
- ✅ Blockquotes
- ✅ Code blocks with syntax highlighting
- ✅ Inline code
- ✅ Horizontal rules
- ✅ Task lists (GitHub-style)
- ✅ Smart typography (quotes, dashes)

### UI Features
- ✅ Responsive design (mobile-friendly)
- ✅ Copy buttons on code blocks
- ✅ Improved line spacing for readability
- ✅ Syntax highlighting (190+ languages)
- ✅ Clean, modern styling

---

## 🚨 Troubleshooting

### Site not loading?
```bash
# Check PM2 status
pm2 list

# Check if port 5080 is listening
netstat -tlnp | grep 5080

# Check Apache
sudo systemctl status apache2
sudo apache2ctl configtest

# Check PM2 logs
pm2 logs talkingyam-prod --err
```

### Changes not showing?
```bash
# Clear browser cache, or:
# Rebuild and restart
cd /home/ubuntu/apps/talkingyam.prod
npm run build
pm2 restart talkingyam-prod
```

### Port conflict?
```bash
# Check what's using port 5080
sudo netstat -tlnp | grep 5080

# If needed, change port in app-registry.json
# Then restart with new port
pm2 delete talkingyam-prod
pm2 start "serve dist -l NEW_PORT" --name talkingyam-prod
```

---

## 📈 Performance

### Bundle Size (Gzipped)
- HTML: 471 bytes
- CSS: 1.71 KB
- JavaScript: 222.50 KB
- **Total:** ~228 KB

### Load Times
- First Contentful Paint: ~250ms
- Time to Interactive: ~300ms
- Lighthouse Score: 95+ (estimated)

### Resource Usage
- Memory: ~67 MB (PM2 process)
- CPU: <1% (idle)

---

## 🔒 Security

- ✅ SSL/TLS via Let's Encrypt
- ✅ HTTPS redirect enabled
- ✅ Process runs as `ubuntu` user (non-root)
- ✅ Apache reverse proxy (hides application port)
- ✅ Cloudflare DNS (can enable DDoS protection)
- ✅ No database or user input (static content)

---

## 📦 Deployment History

- **Oct 14, 2025:** Initial React + Vite deployment
  - Migrated from static HTML to React
  - Integrated with PM2 and app-registry system
  - Configured Apache reverse proxy
  - Improved typography and spacing

---

## 🔗 Related Files

- **Deployment Guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Apache SSL Config:** `/etc/apache2/sites-available/talkingyam.com-le-ssl.conf`
- **App Registry:** `/home/ubuntu/apps/app-registry.json`
- **Backup Location:** `/home/ubuntu/backups/talkingyam-migration-20251014/`

---

## 📄 License

Personal project - All rights reserved

---

## 🆘 Support

For questions or issues:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
2. Review PM2 logs: `pm2 logs talkingyam-prod`
3. Check Apache logs: `sudo tail -100 /var/log/apache2/talkingyam.com_error.log`

---

**Repository:** https://github.com/worldwidejimmy/talkingyam  
**Website:** https://talkingyam.com  
**Last Updated:** October 14, 2025

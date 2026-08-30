---
title: "Multi-User Server Hardening"
description: "Setup server multi-user untuk lab belajar: manajemen user, hardening SSH, dan firewall UFW."
category: linux
pubDate: 2026-08-22
featured: false
---

## Ringkasan

Lab ini membangun server multi-user sebagai fondasi belajar administrasi sistem
Linux: pembuatan user dengan permission terbatas, hardening akses remote, dan
segmentasi layanan.

## Checklist

- [x] Buat user & group dengan sudo terbatas
- [x] Hardening SSH (key-only, disable root login)
- [ ] Pasang fail2ban
- [ ] Audit log via journalctl

## Catatan Teknis

```bash
# contoh perintah penting selama lab
adduser reza --shell /bin/bash
ufw allow OpenSSH && ufw enable
```

## Referensi

- Arch Wiki — Users and groups
- DigitalOcean — Initial Server Setup

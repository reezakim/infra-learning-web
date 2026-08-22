(() => {
  "use strict";

  const CONTENT = {
    "learning-lab": {
      badge: "LEARNING LAB",
      title: "Learning Lab",
      description:
        "Ruang eksperimen dan dokumentasi praktis administrasi server, jaringan, dan otomatisasi infrastruktur sedang disiapkan. Modul-modul lab akan segera tersedia secara bertahap.",
      status: "Lab environment — provisioning",
      accent: "cyan",
      icon: "server",
      breadcrumb: [
        { label: "Home", href: "index.html" },
        { label: "Learning Lab", current: true },
      ],
    },
    linux: {
      badge: "LAB MODULE",
      title: "Linux Learning Lab",
      description:
        "Modul pembelajaran Linux — administrasi server, manajemen user, hardening, dan troubleshooting — masih dalam tahap pengembangan dan dokumentasi.",
      status: "Module build — in progress",
      accent: "blue",
      icon: "server",
      breadcrumb: [
        { label: "Home", href: "index.html" },
        { label: "Learning Lab", href: "coming-soon.html?from=learning-lab" },
        { label: "Linux", current: true },
      ],
    },
    projects: {
      badge: "PROJECTS",
      title: "Projects",
      description:
        "Koleksi project dan perkakas otomatisasi infrastruktur sedang dikembangkan. Setiap tool akan dirilis dengan dokumentasi dan repositori yang dapat digunakan langsung.",
      status: "Pipeline — active development",
      accent: "indigo",
      icon: "folder",
      breadcrumb: [
        { label: "Home", href: "index.html" },
        { label: "Projects", current: true },
      ],
    },
    healthcheck: {
      badge: "TOOL",
      title: "Healthcheck",
      description:
        "Perkakas monitoring dan validasi kesehatan server & layanan secara otomatis. Fitur health probe, alerting, dan laporan status sedang dalam pengembangan.",
      status: "v0.1 — building core engine",
      accent: "amber",
      icon: "shield",
      breadcrumb: [
        { label: "Home", href: "index.html" },
        { label: "Projects", href: "coming-soon.html?from=projects" },
        { label: "Healthcheck", current: true },
      ],
    },
  };

  const ACCENT_CLASSES = {
    cyan: "from-cyan-400 via-blue-500 to-indigo-600 shadow-cyan-500/30",
    blue: "from-cyan-400 via-blue-500 to-indigo-600 shadow-cyan-500/30",
    indigo: "from-indigo-400 via-purple-500 to-violet-600 shadow-indigo-500/30",
    amber: "from-amber-400 to-orange-500 shadow-amber-500/30",
  };

  const ICONS = {
    server: `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>`,
    folder: `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>`,
    shield: `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  };

  const DEFAULT_CONTENT = {
    badge: "COMING SOON",
    title: "Sedang Dikembangkan",
    description:
      "Konten yang Anda cari masih dalam tahap pengembangan dan akan segera tersedia di Infra Learning Lab.",
    status: "Status: In development",
    accent: "cyan",
    icon: "server",
    breadcrumb: [{ label: "Home", href: "index.html" }, { label: "Coming Soon", current: true }],
  };

  function getContentKey() {
    const params = new URLSearchParams(window.location.search);
    return params.get("from") || "";
  }

  function renderBreadcrumb(items) {
    const ol = document.querySelector("#breadcrumb ol");
    if (!ol) return;

    ol.innerHTML = items
      .map((item, index) => {
        const separator =
          index > 0 ? `<li class="text-slate-400" aria-hidden="true">/</li>` : "";

        if (item.current) {
          return `${separator}<li aria-current="page" class="glass-pill px-3.5 py-1.5 rounded-xl text-brand-600 font-bold">${item.label}</li>`;
        }

        return `${separator}<li><a href="${item.href}" class="glass-pill px-3.5 py-1.5 rounded-xl hover:bg-white transition-colors">${item.label}</a></li>`;
      })
      .join("");
  }

  function initPage() {
    const key = getContentKey();
    const data = CONTENT[key] || DEFAULT_CONTENT;

    document.title = `${data.title} — Coming Soon | InfraLab`;

    const badge = document.getElementById("page-badge");
    if (badge) {
      badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse-soft"></span> ${data.badge}`;
    }

    const iconEl = document.getElementById("page-icon");
    if (iconEl) {
      const accent = ACCENT_CLASSES[data.accent] || ACCENT_CLASSES.cyan;
      iconEl.className = `w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg bg-gradient-to-br ${accent}`;
      iconEl.innerHTML = ICONS[data.icon] || ICONS.server;
    }

    const titleEl = document.getElementById("page-title");
    if (titleEl) titleEl.textContent = data.title;

    const descEl = document.getElementById("page-description");
    if (descEl) descEl.textContent = data.description;

    const statusEl = document.getElementById("status-text");
    if (statusEl) statusEl.textContent = data.status;

    renderBreadcrumb(data.breadcrumb);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
  } else {
    initPage();
  }
})();

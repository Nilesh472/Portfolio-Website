const data = window.portfolioData;

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const setYear = () => {
  const footerNote = $(".footer-note");
  footerNote.textContent = `Built with data, design, and automation in mind. (c) ${new Date().getFullYear()} Nilesh Yadav.`;
};

const linkTarget = (href) => (href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : "");

const renderSocials = () => {
  const heroSocials = $("#hero-socials");
  const contactActions = $("#contact-actions");
  const footerLinks = $("#footer-links");
  const commandActions = $("#command-actions");
  const logoRibbon = $("#logo-ribbon");

  heroSocials.innerHTML = data.heroSocials
    .map(
      (item) => `
        <a class="social-chip glass" href="${item.href}" ${item.download ? "download" : ""} ${linkTarget(item.href)}>
          <i data-lucide="${item.icon}"></i>
          <span>${item.label}</span>
        </a>
      `
    )
    .join("");

  contactActions.innerHTML = data.heroSocials
    .map(
      (item) => `
        <a class="contact-action glass" href="${item.href}" ${item.download ? "download" : ""} ${linkTarget(item.href)}>
          <i data-lucide="${item.icon}"></i>
          <div>
            <strong>${item.label}</strong>
            <span>${item.label === "Email" ? data.site.email : item.label === "WhatsApp" ? "+91 90762 51905" : item.label === "LinkedIn" ? "Professional profile" : "Download resume"}</span>
          </div>
        </a>
      `
    )
    .join("");

  footerLinks.innerHTML = `
    <a href="#about">About</a>
    <a href="#services">Services</a>
    <a href="#projects">Projects</a>
    <a href="mailto:${data.site.email}">Email</a>
    <a href="${data.site.linkedinLink}" target="_blank" rel="noreferrer">LinkedIn</a>
  `;

  commandActions.innerHTML = data.commandActions
    .map(
      (item) => `
        <a class="command-link" href="${item.href}" ${linkTarget(item.href)}>
          <i data-lucide="${item.icon}"></i>
          <span>${item.label}</span>
        </a>
      `
    )
    .join("");

  logoRibbon.innerHTML = data.logoRibbon.map((item) => `<span>${item}</span>`).join("");
};

const renderAbout = () => {
  $("#about-story").textContent = data.about.story;
  $("#about-points").innerHTML = data.about.points
    .map((point) => `<div class="about-point glass"><i data-lucide="check-circle-2"></i><span>${point}</span></div>`)
    .join("");
  $("#client-reasons").innerHTML = data.about.clientReasons
    .map((reason) => `<div class="reason-item"><i data-lucide="sparkles"></i><span>${reason}</span></div>`)
    .join("");
};

const renderTimeline = () => {
  $("#experience-timeline").innerHTML = data.experience
    .map(
      (item) => `
        <article class="timeline-card glass spotlight-card" data-reveal data-tilt>
          <div class="timeline-icon"><i data-lucide="${item.icon}"></i></div>
          <div class="timeline-content">
            <div class="timeline-meta">
              <span>${item.period}</span>
              <strong>${item.company}</strong>
            </div>
            <h3>${item.role}</h3>
            <p>${item.summary}</p>
            <ul class="bullet-list">
              ${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
            </ul>
          </div>
        </article>
      `
    )
    .join("");
};

const renderSkills = () => {
  $("#skills-bento").innerHTML = data.skills
    .map(
      (skill) => `
        <article class="skill-card glass spotlight-card" data-reveal data-tilt>
          <div class="skill-card-header">
            <i data-lucide="${skill.icon}"></i>
            <div>
              <h3>${skill.category}</h3>
              <p>${skill.description}</p>
            </div>
          </div>
          <div class="tag-wrap">
            ${skill.items.map((item) => `<span>${item}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
};

const renderToolStrip = () => {
  $("#tool-strip").innerHTML = data.toolStrip
    .map(
      (item) => `
        <div class="tool-chip">
          <i data-lucide="${item.icon}"></i>
          <span>${item.label}</span>
        </div>
      `
    )
    .join("");
};

const renderRadar = () => {
  const shape = $("#radar-shape");
  const points = $("#radar-points");
  const legend = $("#radar-legend");
  const total = data.radar.length;
  const radius = 44;
  const coords = data.radar.map((item, index) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const distance = (item.value / 100) * radius;
    const x = 50 + Math.cos(angle) * distance;
    const y = 50 + Math.sin(angle) * distance;
    return { ...item, x, y };
  });

  shape.style.clipPath = `polygon(${coords.map((p) => `${p.x}% ${p.y}%`).join(",")})`;
  points.innerHTML = coords
    .map(
      (point) => `
        <div class="radar-point" style="left:${point.x}%; top:${point.y}%;">
          <span>${point.value}</span>
        </div>
      `
    )
    .join("");

  legend.innerHTML = coords
    .map(
      (item) => `
        <div class="legend-item">
          <span class="legend-dot"></span>
          <strong>${item.label}</strong>
          <small>${item.value}%</small>
        </div>
      `
    )
    .join("");
};

const renderServices = () => {
  $("#service-grid").innerHTML = data.services
    .map(
      (service) => `
        <article class="service-card glass spotlight-card" data-reveal data-tilt>
          <div class="service-icon"><i data-lucide="${service.icon}"></i></div>
          <h3>${service.title}</h3>
          <p><strong>Problem:</strong> ${service.problem}</p>
          <p><strong>Outcome:</strong> ${service.outcome}</p>
          <a href="#contact" class="service-link">Discuss this service <i data-lucide="arrow-up-right"></i></a>
        </article>
      `
    )
    .join("");
};

let activeFilter = "All";

const renderFeaturedProject = () => {
  const project = data.featuredProject;
  $("#featured-project").innerHTML = `
    <div class="featured-copy">
      <span class="featured-label">${project.category} Featured Project</span>
      <h3>${project.title}</h3>
      <div class="featured-flow">
        <div><small>Challenge</small><p>${project.challenge}</p></div>
        <div><small>Approach</small><p>${project.approach}</p></div>
        <div><small>Outcome</small><p>${project.outcome}</p></div>
      </div>
      <div class="tag-wrap">
        ${project.tools.map((tool) => `<span>${tool}</span>`).join("")}
      </div>
    </div>
    <div class="featured-visual">
      <div class="featured-panel">
        <span class="mono-label">Case structure</span>
        <div class="featured-stats">
          <div><strong>01</strong><span>Clear use case</span></div>
          <div><strong>02</strong><span>Applied ML thinking</span></div>
          <div><strong>03</strong><span>Product-style framing</span></div>
        </div>
      </div>
    </div>
  `;
};

const renderFilters = () => {
  $("#project-filters").innerHTML = data.filters
    .map(
      (filter) => `
        <button class="filter-chip ${filter === activeFilter ? "active" : ""}" type="button" data-filter="${filter}">
          ${filter}
        </button>
      `
    )
    .join("");
};

const renderProjects = () => {
  const items = activeFilter === "All"
    ? data.projects
    : data.projects.filter((project) => project.category === activeFilter);

  $("#project-grid").innerHTML = items
    .map(
      (project) => `
        <article class="project-card glass spotlight-card" data-reveal data-tilt>
          <div class="project-visual">
            <img class="project-visual-image" src="${project.image}" alt="${project.title} project preview" />
            <div class="project-visual-badge">${project.category}</div>
          </div>
          <div class="project-card-top">
            <span class="project-category">${project.category}</span>
            <i data-lucide="arrow-up-right"></i>
          </div>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <div class="tag-wrap">
            ${project.tools.map((tool) => `<span>${tool}</span>`).join("")}
          </div>
          <div class="project-outcome">${project.outcome}</div>
        </article>
      `
    )
    .join("");
};

const renderMetrics = () => {
  $("#metrics-grid").innerHTML = data.metrics
    .map(
      (metric) => `
        <article class="metric-card glass" data-reveal>
          <strong class="metric-value" data-counter="${metric.value}" data-suffix="${metric.suffix}">0${metric.suffix}</strong>
          <span>${metric.label}</span>
          <small>${metric.note}</small>
        </article>
      `
    )
    .join("");

  $("#impact-bars").innerHTML = data.impactBars
    .map(
      (item) => `
        <div class="bar-row">
          <div class="bar-copy">
            <span>${item.label}</span>
            <small>${item.value}%</small>
          </div>
          <div class="bar-track"><div class="bar-fill" style="--value:${item.value}%"></div></div>
        </div>
      `
    )
    .join("");
};

const renderHireMe = () => {
  $("#comparison-list").innerHTML = data.comparisons
    .map(
      (pair) => `
        <div class="comparison-card glass">
          <div><small>Before</small><strong>${pair.before}</strong></div>
          <i data-lucide="move-right"></i>
          <div><small>After</small><strong>${pair.after}</strong></div>
        </div>
      `
    )
    .join("");

  $("#hire-points").innerHTML = data.hirePoints
    .map((item) => `<div class="hire-point"><i data-lucide="check-check"></i><span>${item}</span></div>`)
    .join("");
};

const renderTestimonials = () => {
  $("#testimonial-grid").innerHTML = data.testimonials
    .map(
      (item) => `
        <article class="testimonial-card glass spotlight-card" data-reveal data-tilt>
          <div class="stars">*****</div>
          <p>"${item.quote}"</p>
          <strong>${item.name}</strong>
          <span>${item.role}</span>
        </article>
      `
    )
    .join("");
};

const renderFaq = () => {
  $("#faq-list").innerHTML = data.faq
    .map(
      (item, index) => `
        <details class="faq-item glass" ${index === 0 ? "open" : ""} data-reveal>
          <summary>
            <span>${item.question}</span>
            <i data-lucide="plus"></i>
          </summary>
          <p>${item.answer}</p>
        </details>
      `
    )
    .join("");
};

const renderExploring = () => {
  $("#exploring-tags").innerHTML = data.exploring.map((item) => `<span>${item}</span>`).join("");
};

const renderContact = () => {
  const serviceTags = $("#service-tags");
  const projectType = $('[name="projectType"]');
  const options = data.services.map((service) => service.title);

  serviceTags.innerHTML = options
    .map((item) => `<button class="tag-button" type="button" data-service-tag="${item}">${item}</button>`)
    .join("");

  projectType.innerHTML += options.map((item) => `<option value="${item}">${item}</option>`).join("");
};

const setActiveNav = () => {
  const sections = $$("main section[id]");
  const navLinks = $$("[data-nav-link]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((section) => observer.observe(section));
};

const setRevealAnimations = () => {
  const elements = $$("[data-reveal]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  elements.forEach((element) => observer.observe(element));
};

const setCounters = () => {
  const counters = $$(".metric-value");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        const target = Number(element.dataset.counter);
        const suffix = element.dataset.suffix || "";
        const start = performance.now();
        const duration = 1200;

        const animate = (time) => {
          const progress = Math.min((time - start) / duration, 1);
          element.textContent = `${Math.floor(target * progress)}${suffix}`;
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        observer.unobserve(element);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
};

const setRoleRotation = () => {
  const role = $("#rotating-role");
  let index = 0;
  setInterval(() => {
    index = (index + 1) % data.rotatingRoles.length;
    role.classList.add("fade-out");
    setTimeout(() => {
      role.textContent = data.rotatingRoles[index];
      role.classList.remove("fade-out");
    }, 180);
  }, 2400);
};

const setScrollProgress = () => {
  const progress = $("#scroll-progress");
  const update = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${height > 0 ? scrollTop / height : 0})`;
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
};

const setCursorGlow = () => {
  const glow = $("#cursor-glow");
  window.addEventListener("pointermove", (event) => {
    glow.style.transform = `translate(${event.clientX - 160}px, ${event.clientY - 160}px)`;
  });
};

const setSpotlightCards = () => {
  $$(".spotlight-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      card.style.setProperty("--spotlight-x", `${x}px`);
      card.style.setProperty("--spotlight-y", `${y}px`);
    });
  });
};

const setTiltCards = () => {
  $$("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      if (window.innerWidth < 900) return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      const rotateX = (0.5 - y) * 8;
      const rotateY = (x - 0.5) * 10;
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
};

const setMagneticButtons = () => {
  $$(".magnetic").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const bounds = button.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;
      button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
    });
    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  });
};

const setFilters = () => {
  $("#project-filters").addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    activeFilter = button.dataset.filter;
    renderFilters();
    renderProjects();
    refreshIcons();
    setRevealAnimations();
    setTiltCards();
    setSpotlightCards();
  });
};

const setServiceTagActions = () => {
  $("#service-tags").addEventListener("click", (event) => {
    const button = event.target.closest("[data-service-tag]");
    if (!button) return;
    $('[name="projectType"]').value = button.dataset.serviceTag;
    $("#form-feedback").textContent = `Selected project type: ${button.dataset.serviceTag}`;
  });
};

const setContactForm = () => {
  $("#contact-form").addEventListener("submit", () => {
    $("#form-feedback").textContent = "Sending your inquiry details...";
  });
};

const setMenu = () => {
  const menuButton = $("#menu-button");
  const nav = $(".main-nav");
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
};

const setThemeSystem = () => {
  const themes = ["theme-dark", "theme-electric", "theme-violet"];
  const themeButton = $("#theme-button");
  const saved = localStorage.getItem("ny-theme");
  let index = Math.max(themes.indexOf(saved), 0);
  document.body.dataset.theme = themes[index];

  const applyTheme = () => {
    document.body.dataset.theme = themes[index];
    localStorage.setItem("ny-theme", themes[index]);
  };

  themeButton.addEventListener("click", () => {
    index = (index + 1) % themes.length;
    applyTheme();
  });
};

const setCommandPalette = () => {
  const dialog = $("#command-palette");
  const openDialog = () => dialog.showModal();
  const closeDialog = () => dialog.close();

  $("#command-button").addEventListener("click", openDialog);
  dialog.addEventListener("click", (event) => {
    const shell = $(".command-shell", dialog);
    if (!shell.contains(event.target)) closeDialog();
  });

  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openDialog();
    }
    if (event.key === "Escape" && dialog.open) closeDialog();
  });
};

const setParticleField = () => {
  const canvas = $("#particle-canvas");
  const context = canvas.getContext("2d");
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  let particles = [];

  const resize = () => {
    canvas.width = window.innerWidth * Math.min(window.devicePixelRatio, 2);
    canvas.height = window.innerHeight * Math.min(window.devicePixelRatio, 2);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(Math.min(window.devicePixelRatio, 2), Math.min(window.devicePixelRatio, 2));
    particles = Array.from({ length: window.innerWidth < 900 ? 28 : 46 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18
    }));
  };

  const draw = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

      context.beginPath();
      context.fillStyle = "rgba(94, 231, 255, 0.45)";
      context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      context.fill();

      for (let j = index + 1; j < particles.length; j += 1) {
        const other = particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          context.beginPath();
          context.strokeStyle = `rgba(124, 92, 255, ${0.12 - distance / 1400})`;
          context.lineWidth = 1;
          context.moveTo(particle.x, particle.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }
    });

    if (!media.matches) requestAnimationFrame(draw);
  };

  resize();
  if (!media.matches) draw();
  window.addEventListener("resize", resize);
};

const refreshIcons = () => {
  if (window.lucide) window.lucide.createIcons();
};

const init = () => {
  renderSocials();
  renderAbout();
  renderTimeline();
  renderSkills();
  renderToolStrip();
  renderRadar();
  renderServices();
  renderFeaturedProject();
  renderFilters();
  renderProjects();
  renderMetrics();
  renderHireMe();
  renderTestimonials();
  renderFaq();
  renderExploring();
  renderContact();
  setYear();
  refreshIcons();
  setActiveNav();
  setRevealAnimations();
  setCounters();
  setRoleRotation();
  setScrollProgress();
  setCursorGlow();
  setSpotlightCards();
  setTiltCards();
  setMagneticButtons();
  setFilters();
  setServiceTagActions();
  setContactForm();
  setMenu();
  setThemeSystem();
  setCommandPalette();
  setParticleField();
};

document.addEventListener("DOMContentLoaded", init);

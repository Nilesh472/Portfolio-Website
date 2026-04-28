const data = window.portfolioData;

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const page = document.body.dataset.page;

const externalAttrs = (href, download) => {
  const downloadAttr = download ? "download" : "";
  const external = href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : "";
  return `${downloadAttr} ${external}`.trim();
};

const setYear = () => {
  const footerNote = $(".footer-note");
  if (footerNote) {
    footerNote.textContent = `Built with data, design, and automation in mind. (c) ${new Date().getFullYear()} Nilesh Yadav.`;
  }
};

const renderShell = () => {
  const headerSlot = $("[data-shell='header']");
  const footerSlot = $("[data-shell='footer']");

  if (headerSlot) {
    headerSlot.innerHTML = `
      <div class="container header-shell glass">
        <a class="brand" href="./index.html" aria-label="Nilesh Yadav home">
          <span class="brand-mark">${data.site.shortName}</span>
          <span class="brand-copy">
            <strong>${data.site.name}</strong>
            <small>AI, Analytics, Career</small>
          </span>
        </a>
        <nav class="main-nav" aria-label="Primary">
          ${data.nav
            .map(
              (item) =>
                `<a href="${item.href}" class="${item.slug === page ? "active" : ""}">${item.label}</a>`
            )
            .join("")}
        </nav>
        <div class="header-actions">
          <a class="ghost-button mini-button" href="./skills.html">
            <i data-lucide="sparkles"></i>
            <span>Tech Stack</span>
          </a>
          <a class="ghost-button mini-button" href="./projects.html">
            <span>Case Studies</span>
          </a>
          <a class="primary-button compact" href="./contact.html">Connect Us</a>
        </div>
        <button class="menu-button" id="menu-button" type="button" aria-expanded="false" aria-label="Open navigation">
          <span></span>
          <span></span>
        </button>
      </div>
    `;
  }

  if (footerSlot) {
    footerSlot.innerHTML = `
      <div class="container footer-shell">
        <div>
          <strong>${data.site.name}</strong>
          <p>Blending analytics, automation, and modern digital execution for career growth and client work.</p>
        </div>
        <div class="footer-links">
          ${data.nav.map((item) => `<a href="${item.href}">${item.label}</a>`).join("")}
        </div>
        <p class="footer-note"></p>
      </div>
    `;
  }
};

const renderSocialChips = () => {
  const containers = $$("[data-socials]");
  containers.forEach((container) => {
    container.innerHTML = data.socials
      .map(
        (item) => `
          <a class="social-chip glass" href="${item.href}" ${externalAttrs(item.href, item.download)}>
            <i data-lucide="${item.icon}"></i>
            <span>${item.label}</span>
          </a>
        `
      )
      .join("");
  });
};

const renderHero = () => {
  const role = $("#rotating-role");
  const badgeTrack = $("#hero-badges");
  const highlightGrid = $("#home-highlights");

  if (badgeTrack) {
    badgeTrack.innerHTML = data.heroBadges.map((item) => `<span>${item}</span>`).join("");
  }

  if (highlightGrid) {
    highlightGrid.innerHTML = data.highlightCards
      .map(
        (card) => `
          <article class="insight-card glass spotlight-card" data-reveal data-tilt>
            <i data-lucide="${card.icon}"></i>
            <h3>${card.title}</h3>
            <p>${card.copy}</p>
          </article>
        `
      )
      .join("");
  }

  if (role) {
    let index = 0;
    setInterval(() => {
      index = (index + 1) % data.heroRoles.length;
      role.classList.add("fade-out");
      setTimeout(() => {
        role.textContent = data.heroRoles[index];
        role.classList.remove("fade-out");
      }, 170);
    }, 2400);
  }
};

const renderAbout = () => {
  const story = $("#about-story");
  const mission = $("#about-mission");
  const points = $("#about-points");
  const reasons = $("#career-values");
  const journey = $("#journey-cards");

  if (story) story.textContent = data.about.story;
  if (mission) mission.textContent = data.about.mission;
  if (points) {
    points.innerHTML = data.about.points
      .map((point) => `<div class="about-point glass"><i data-lucide="check-circle-2"></i><span>${point}</span></div>`)
      .join("");
  }
  if (reasons) {
    reasons.innerHTML = data.about.reasons
      .map((reason) => `<div class="reason-item"><i data-lucide="sparkles"></i><span>${reason}</span></div>`)
      .join("");
  }
  if (journey) {
    journey.innerHTML = data.about.journeyCards
      .map(
        (card) => `
          <article class="journey-card glass spotlight-card" data-reveal data-tilt>
            <img src="${card.image}" alt="${card.title}" />
            <div>
              <h3>${card.title}</h3>
              <p>${card.copy}</p>
            </div>
          </article>
        `
      )
      .join("");
  }
};

const renderExperience = () => {
  const timeline = $("#timeline");
  const stats = $("#impact-stats");
  if (timeline) {
    timeline.innerHTML = data.experience
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
              <ul class="bullet-list">${item.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>
            </div>
          </article>
        `
      )
      .join("");
  }

  if (stats) {
    stats.innerHTML = data.stats
      .map(
        (item) => `
          <article class="metric-card glass" data-reveal>
            <strong class="metric-value" data-counter="${item.value}" data-suffix="${item.suffix}">0${item.suffix}</strong>
            <span>${item.label}</span>
            <small>${item.note}</small>
          </article>
        `
      )
      .join("");
  }
};

const renderSkills = () => {
  const skillsGrid = $("#skills-grid");
  const logoCloud = $("#logo-cloud");
  if (skillsGrid) {
    skillsGrid.innerHTML = data.skills
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
            <div class="tag-wrap">${skill.items.map((item) => `<span>${item}</span>`).join("")}</div>
          </article>
        `
      )
      .join("");
  }

  if (logoCloud) {
    logoCloud.innerHTML = data.stackLogos
      .map(
        (logo) => `
          <article class="logo-card glass" data-reveal>
            <img src="${logo.src}" alt="${logo.label} logo" />
            <span>${logo.label}</span>
          </article>
        `
      )
      .join("");
  }
};

const renderServices = () => {
  const serviceGrid = $("#service-grid");
  const processGrid = $("#process-grid");
  const comparisonGrid = $("#comparison-grid");
  if (serviceGrid) {
    serviceGrid.innerHTML = data.services
      .map(
        (service) => `
          <article class="service-card glass spotlight-card" data-reveal data-tilt>
            <div class="service-icon"><i data-lucide="${service.icon}"></i></div>
            <h3>${service.title}</h3>
            <p><strong>Problem:</strong> ${service.problem}</p>
            <p><strong>Outcome:</strong> ${service.outcome}</p>
            <a href="./contact.html" class="service-link">Connect on this service <i data-lucide="arrow-up-right"></i></a>
          </article>
        `
      )
      .join("");
  }
  if (processGrid) {
    processGrid.innerHTML = data.process
      .map(
        (item) => `
          <article class="process-card glass" data-reveal>
            <span class="process-step">${item.step}</span>
            <h3>${item.title}</h3>
            <p>${item.copy}</p>
          </article>
        `
      )
      .join("");
  }
  if (comparisonGrid) {
    comparisonGrid.innerHTML = data.comparisons
      .map(
        (pair) => `
          <div class="comparison-card glass" data-reveal>
            <div><small>Before</small><strong>${pair.before}</strong></div>
            <i data-lucide="move-right"></i>
            <div><small>After</small><strong>${pair.after}</strong></div>
          </div>
        `
      )
      .join("");
  }
};

let activeFilter = "All";

const renderProjects = () => {
  const featured = $("#featured-project");
  const filterRow = $("#project-filters");
  const projectGrid = $("#project-grid");
  const homeFeatured = $("#home-featured-project");
  const projectSet = activeFilter === "All"
    ? data.projects
    : data.projects.filter((project) => project.category === activeFilter);

  if (featured) {
    const project = data.featuredProject;
    featured.innerHTML = `
      <div class="featured-copy">
        <span class="featured-label">${project.category} Featured Project</span>
        <h3>${project.title}</h3>
        <div class="featured-flow">
          <div><small>Challenge</small><p>${project.challenge}</p></div>
          <div><small>Approach</small><p>${project.approach}</p></div>
          <div><small>Outcome</small><p>${project.outcome}</p></div>
        </div>
        <div class="tag-wrap">${project.tools.map((tool) => `<span>${tool}</span>`).join("")}</div>
      </div>
      <div class="featured-visual">
        <img src="./assets/visuals/ai-core.svg" alt="AI themed visual" />
      </div>
    `;
  }

  if (homeFeatured) {
    const project = data.projects[0];
    homeFeatured.innerHTML = `
      <article class="hero-case glass spotlight-card" data-reveal data-tilt>
        <img src="${project.image}" alt="${project.title}" />
        <div>
          <span class="proof-label">${project.category}</span>
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <a class="service-link" href="./projects.html">See full projects <i data-lucide="arrow-up-right"></i></a>
        </div>
      </article>
    `;
  }

  if (filterRow) {
    const filters = ["All", ...new Set(data.projects.map((item) => item.category))];
    filterRow.innerHTML = filters
      .map(
        (filter) => `
          <button class="filter-chip ${filter === activeFilter ? "active" : ""}" type="button" data-filter="${filter}">
            ${filter}
          </button>
        `
      )
      .join("");
  }

  if (projectGrid) {
    projectGrid.innerHTML = projectSet
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
            <div class="tag-wrap">${project.tools.map((tool) => `<span>${tool}</span>`).join("")}</div>
            <div class="project-outcome">${project.outcome}</div>
          </article>
        `
      )
      .join("");
  }
};

const renderTestimonials = () => {
  const grid = $("#testimonial-grid");
  if (grid) {
    grid.innerHTML = data.testimonials
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
  }
};

const renderFAQ = () => {
  const faq = $("#faq-list");
  if (faq) {
    faq.innerHTML = data.faq
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
  }
};

const renderContact = () => {
  const actionGrid = $("#contact-actions");
  const tags = $("#service-tags");
  const projectType = $('[name="projectType"]');
  if (actionGrid) {
    actionGrid.innerHTML = data.socials
      .filter((item) => item.label !== "Resume")
      .map(
        (item) => `
          <a class="contact-action glass" href="${item.href}" ${externalAttrs(item.href, item.download)}>
            <i data-lucide="${item.icon}"></i>
            <div>
              <strong>${item.label}</strong>
              <span>${item.label === "Email" ? data.site.email : item.label === "WhatsApp" ? "+91 90762 51905" : item.label === "GitHub" ? "Code and experiments" : "Professional profile"}</span>
            </div>
          </a>
        `
      )
      .join("");
  }

  if (tags && projectType) {
    const options = data.services.map((service) => service.title);
    tags.innerHTML = options.map((item) => `<button class="tag-button" type="button" data-service-tag="${item}">${item}</button>`).join("");
    projectType.innerHTML += options.map((item) => `<option value="${item}">${item}</option>`).join("");
  }

  const success = new URLSearchParams(window.location.search).get("success");
  const feedback = $("#form-feedback");
  if (feedback && success === "1") {
    feedback.textContent = "Thanks. Your message was submitted successfully.";
  }
};

const setFilters = () => {
  const filters = $("#project-filters");
  if (!filters) return;
  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    activeFilter = button.dataset.filter;
    renderProjects();
    refreshIcons();
    setRevealAnimations();
    setTiltCards();
    setSpotlightCards();
    setFilters();
  }, { once: true });
};

const setServiceTagActions = () => {
  const tags = $("#service-tags");
  if (!tags) return;
  tags.addEventListener("click", (event) => {
    const button = event.target.closest("[data-service-tag]");
    if (!button) return;
    const input = $('[name="projectType"]');
    if (input) input.value = button.dataset.serviceTag;
    const feedback = $("#form-feedback");
    if (feedback) feedback.textContent = `Selected project type: ${button.dataset.serviceTag}`;
  });
};

const setContactForm = () => {
  const form = $("#contact-form");
  if (!form) return;
  const next = form.querySelector('input[name="_next"]');
  if (next) next.value = `${window.location.origin}/contact.html?success=1`;
  form.addEventListener("submit", () => {
    const feedback = $("#form-feedback");
    if (feedback) feedback.textContent = "Sending your inquiry details...";
  });
};

const setMenu = () => {
  const menuButton = $("#menu-button");
  const nav = $(".main-nav");
  if (!menuButton || !nav) return;
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
    { threshold: 0.16 }
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
    { threshold: 0.5 }
  );
  counters.forEach((counter) => observer.observe(counter));
};

const setScrollProgress = () => {
  const progress = $("#scroll-progress");
  if (!progress) return;
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
  if (!glow) return;
  window.addEventListener("pointermove", (event) => {
    glow.style.transform = `translate(${event.clientX - 180}px, ${event.clientY - 180}px)`;
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
      const rotateX = (0.5 - y) * 7;
      const rotateY = (x - 0.5) * 9;
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
};

const setParticleField = () => {
  const canvas = $("#particle-canvas");
  if (!canvas) return;
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
    particles = Array.from({ length: window.innerWidth < 900 ? 30 : 54 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.7 + 0.4,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16
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
      context.fillStyle = "rgba(94, 231, 255, 0.42)";
      context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      context.fill();
      for (let j = index + 1; j < particles.length; j += 1) {
        const other = particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          context.beginPath();
          context.strokeStyle = `rgba(124, 92, 255, ${0.11 - distance / 1400})`;
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
  renderShell();
  renderSocialChips();
  renderHero();
  renderAbout();
  renderExperience();
  renderSkills();
  renderServices();
  renderProjects();
  renderTestimonials();
  renderFAQ();
  renderContact();
  setYear();
  refreshIcons();
  setRevealAnimations();
  setCounters();
  setScrollProgress();
  setCursorGlow();
  setSpotlightCards();
  setTiltCards();
  setParticleField();
  setFilters();
  setServiceTagActions();
  setContactForm();
  setMenu();
};

document.addEventListener("DOMContentLoaded", init);

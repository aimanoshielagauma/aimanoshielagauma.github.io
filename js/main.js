// Basic site interactivity: typewriter, nav toggle, particles, scroll reveals, form validation
document.addEventListener('DOMContentLoaded',()=>{
  // fill year
  document.getElementById('year').textContent = new Date().getFullYear();

  // CV data — manually populated for portfolio
  const cv = {
    name: 'Aimanoshi Elagauma',
    email: 'aimanoshi.elagauma@gmail.com',
    bio: 'I am a Data Analyst and Data Scientist with a passion for building intelligent systems at the intersection of AI, machine learning, and finance. I transform complex datasets into actionable insights and develop predictive models that drive strategic decisions. My expertise spans data engineering, statistical analysis, and deep learning, with a focus on delivering scalable, production-grade solutions.',
    years: 6,
    projectsCount: 8,
    toolsCount: 15,
    skills:{
      langs:['Python','SQL','R','VBA','Excel','Tableau','Power BI','Looker'],
      ml:['Pandas','NumPy','Scikit-learn','TensorFlow','Keras','PyTorch','XGBoost','Statistical Analysis'],
      finance:['Financial Modelling','Risk Analysis','Time-Series Forecasting','Portfolio Optimization','Algorithmic Trading']
    },
    experience:[
      {
        title:'Senior Data Scientist',
        company:'FinTech Innovations Ltd.',
        dates:'2021 — Present',
        bullets:[
          'Architected and deployed ML pipeline for real-time portfolio risk assessment, reducing compute time by 60%',
          'Led development of NLP-based sentiment analysis model for market prediction (86% accuracy)',
          'Mentored junior analysts on machine learning best practices and model evaluation'
        ]
      },
      {
        title:'Data Analyst',
        company:'Global Investment Partners',
        dates:'2019 — 2021',
        bullets:[
          'Designed interactive Power BI dashboards tracking KPIs across 15+ business units',
          'Automated monthly reporting processes, saving 40 hours per cycle',
          'Conducted exploratory analysis on transaction data (500M+ records) to identify fraud patterns'
        ]
      },
      {
        title:'Junior Data Analyst',
        company:'DataCore Analytics',
        dates:'2018 — 2019',
        bullets:[
          'Built SQL ETL pipelines to consolidate data from 8 disparate sources',
          'Performed statistical analysis on A/B tests, delivering insights for product optimization',
          'Developed reporting templates and documentation for analytics team'
        ]
      }
    ],
    projects:[
      {
        title:'AI-Driven Market Forecasting',
        desc:'Multi-feature LSTM model predicting 5-day stock price movements with 73% directional accuracy.',
        stack:['Python','TensorFlow','Statistical Analysis'],
        tag:'Machine Learning'
      },
      {
        title:'Portfolio Risk Dashboard',
        desc:'Real-time interactive dashboard monitoring Value-at-Risk (VaR) and Greeks across 500+ instruments.',
        stack:['Power BI','SQL','DAX'],
        tag:'Finance'
      },
      {
        title:'Fraud Detection Engine',
        desc:'Ensemble ML classifier (XGBoost + Neural Net) identifying suspicious transactions with 94% precision.',
        stack:['Python','Scikit-learn','XGBoost'],
        tag:'Machine Learning'
      },
      {
        title:'Customer Segmentation',
        desc:'Unsupervised clustering (K-means, DBSCAN) of 2M+ customers for targeted marketing campaigns.',
        stack:['Python','Pandas','Scikit-learn'],
        tag:'Data Science'
      },
      {
        title:'Algorithmic Trading Backtest',
        desc:'Optimization framework for quant strategies; 12% CAGR on out-of-sample test data.',
        stack:['Python','Pandas','NumPy'],
        tag:'Finance'
      },
      {
        title:'Sentiment Analysis NLP',
        desc:'Fine-tuned transformer model (DistilBERT) analyzing earnings call transcripts for market signals.',
        stack:['Python','PyTorch','Transformers'],
        tag:'Machine Learning'
      },
      {
        title:'ETL Data Pipeline',
        desc:'Scalable cloud-based pipeline (AWS Lambda + Airflow) ingesting multi-source market data daily.',
        stack:['SQL','Python','Airflow'],
        tag:'Data Engineering'
      },
      {
        title:'Tableau Visualization Suite',
        desc:'Executive-level dashboards synthesizing financial metrics, KPIs, and board-level insights.',
        stack:['Tableau','SQL','Excel'],
        tag:'Data Visualization'
      }
    ],
    education:[
      {degree:'MSc Data Science',institution:'University of Technology',year:'2018'},
      {degree:'BSc Statistics & Economics',institution:'Metropolitan State University',year:'2016'},
      {cert:'AWS Certified Cloud Practitioner',institution:'Amazon Web Services',year:'2022'},
      {cert:'TensorFlow Professional Developer Certificate',institution:'Google Cloud',year:'2021'}
    ]
  };

  // ============ Populate Portfolio ============
  document.getElementById('bio-text').textContent = cv.bio;
  document.getElementById('years').textContent = cv.years;
  document.getElementById('projects-count').textContent = cv.projectsCount;
  document.getElementById('tools-count').textContent = cv.toolsCount;

  function populateBadges(elementId, items) {
    const el = document.getElementById(elementId);
    items.forEach(item => {
      const badge = document.createElement('span');
      badge.className = 'badge reveal';
      badge.textContent = item;
      el.appendChild(badge);
    });
  }

  populateBadges('badges-langs', cv.skills.langs);
  populateBadges('badges-ml', cv.skills.ml);
  populateBadges('badges-fin', cv.skills.finance);

  // Experience timeline
  const timeline = document.getElementById('timeline');
  cv.experience.forEach((job, i) => {
    const side = i % 2 === 0 ? 'left' : 'right';
    const item = document.createElement('div');
    item.className = `timeline-item ${side} reveal`;
    item.innerHTML = `
      <div class="marker" style="top:${30 + i * 150}px"></div>
      <div class="card">
        <h3>${job.title} — ${job.company}</h3>
        <small>${job.dates}</small>
        <ul>
          ${job.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    `;
    timeline.appendChild(item);
  });

  // Projects
  const pg = document.getElementById('projects-grid');
  cv.projects.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project-card card reveal';
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div class="badges">
        ${p.stack.map(s => `<span class="badge">${s}</span>`).join('')}
      </div>
    `;
    pg.appendChild(card);
  });

  // Education
  const ed = document.getElementById('education-list');
  cv.education.forEach(e => {
    const div = document.createElement('div');
    div.className = 'card reveal';
    const label = e.cert ? '📜' : '🎓';
    div.innerHTML = `
      <h3>${e.degree}</h3>
      <p>${label} ${e.institution} — ${e.year}</p>
    `;
    ed.appendChild(div);
  });

  // ============ Typewriter Effect ============
  const words = ['Data Analyst', 'Data Scientist', 'AI Enthusiast', 'Finance + ML'];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const out = document.getElementById('typewriter');

  function typewriter() {
    const word = words[wordIdx];
    const target = word.slice(0, charIdx);
    out.textContent = target;

    if (!isDeleting && charIdx < word.length) {
      charIdx++;
      setTimeout(typewriter, 80);
    } else if (isDeleting && charIdx > 0) {
      charIdx--;
      setTimeout(typewriter, 60);
    } else if (!isDeleting && charIdx === word.length) {
      isDeleting = true;
      setTimeout(typewriter, 1200);
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      setTimeout(typewriter, 500);
    }
  }

  typewriter();

  // ============ Nav Toggle & Scroll Handling ============
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('.site-header');

  function closeMenu() {
    navLinks.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeMenu();
    } else {
      navLinks.classList.add('active');
      navToggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Close menu on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Scroll event: update nav styling & active link
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Toggle scrolled class for blurred nav background
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
    lastScrollTop = scrollTop;
  });

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('main section[id]');
    const links = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').slice(1);
      if (href === current) {
        link.classList.add('active');
      }
    });
  }

  // ============ IntersectionObserver for Reveal Animations ============
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // ============ Particle Background Animation ============
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationId;

    function resizeCanvas() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create particles with improved physics
    const particles = [];
    const particleCount = 70;
    const connectionDistance = 120;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.5 + 0.8
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Clamp to bounds
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        // Draw particle
        ctx.fillStyle = 'rgba(231, 84, 128, 0.9)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections (network effect)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.12;
            ctx.strokeStyle = `rgba(255, 182, 193, ${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(drawParticles);
    }

    requestAnimationFrame(drawParticles);
  }

  // ============ Contact Form Validation ============
  const form = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message) {
      formMsg.textContent = '⚠️ Please complete all fields.';
      formMsg.style.color = 'var(--deep-accent)';
      return;
    }

    if (!emailRegex.test(email)) {
      formMsg.textContent = '⚠️ Please enter a valid email address.';
      formMsg.style.color = 'var(--deep-accent)';
      return;
    }

    // Success state
    formMsg.textContent = '✓ Thanks for reaching out! Your message was received (no backend configured — demo only).';
    formMsg.style.color = 'var(--deep-accent)';
    form.reset();
    setTimeout(() => {
      formMsg.textContent = '';
    }, 5000);
  });

  // ============ Smooth Scroll Polyfill for older browsers ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#top') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Initialize
  updateActiveNavLink();
});

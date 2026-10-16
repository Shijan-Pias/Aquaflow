import React, { useEffect, useState, useRef } from 'react';
import { siteData } from './data/siteData';
import { SEO } from './components/SEO';
import ContactSection from './components/ContactSection';

const Counter = ({ end, suffix = "" }) => {
  return <h3>{typeof end === 'number' ? end.toLocaleString() : end}{suffix}</h3>;
};

const CURRENT_YEAR = new Date().getFullYear();

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const revealRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -20px 0px" });
    
    // Query all reveal elements and observe them
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observerRef.current.observe(el));
    
    revealRefs.current.forEach(ref => {
      if (ref) observerRef.current.observe(ref);
    });
    
    return () => observerRef.current?.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el) {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
      if (!revealRefs.current.includes(el)) {
        revealRefs.current.push(el);
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.bento-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO />

      {/* Accessible Skip to Content Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* HEADER (Sticky Bar with Scroll Transition) */}
      <header className={`header-bar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <a href="/" className="logo" aria-label="AquaFlow Home">
            {siteData.header.brandName}<span className="logo-dot">.</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="nav-links" aria-label="Primary navigation">
            {siteData.header.navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a href={siteData.header.phoneHref} className="header-phone-link" aria-label={`Call ${siteData.header.phoneNumber}`}>
              <svg className="phone-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>{siteData.header.phoneNumber}</span>
            </a>

            <a href={siteData.header.phoneHref} className="header-cta-btn">
              <span className="status-dot" aria-hidden="true"></span>
              <span>{siteData.header.ctaText}</span>
            </a>

            {/* Hamburger Button (Mobile) */}
            <button
              type="button"
              className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-drawer"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-drawer"
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="mobile-drawer"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="mobile-drawer-header">
            <a href="/" className="logo" onClick={closeMobileMenu}>
              {siteData.header.brandName}<span className="logo-dot">.</span>
            </a>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <nav className="mobile-nav-links" aria-label="Mobile navigation">
            {siteData.header.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mobile-drawer-footer">
            <a
              href={siteData.header.phoneHref}
              className="btn btn-primary mobile-drawer-cta"
              onClick={closeMobileMenu}
            >
              Call {siteData.header.phoneNumber}
            </a>
            <a
              href="#contact"
              className="btn btn-ghost mobile-drawer-ghost"
              onClick={closeMobileMenu}
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>

      <main id="main-content">
        {/* HERO (Photo-driven Local Service Brand) */}
        <section className="hero">
          {/* Full-bleed background photo */}
          <img
            src={siteData.hero.backgroundImage}
            alt={siteData.hero.altText}
            className="hero-bg-photo"
            width="1920"
            height="1080"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />

          {/* Light overlay for readability */}
          <div className="hero-overlay" aria-hidden="true"></div>

          {/* Centered Hero Content */}
          <div className="container hero-content-center">
            <h1 className="hero-headline">
              {siteData.hero.headline}
            </h1>

            <p className="hero-subtext">
              {siteData.hero.subtext}
            </p>

            <div className="hero-btn-row">
              <a href={siteData.hero.primaryButton.href} className="btn-hero-primary">
                {siteData.hero.primaryButton.text}
              </a>
              <a href={siteData.hero.secondaryButton.href} className="btn-hero-secondary">
                {siteData.hero.secondaryButton.text}
              </a>
            </div>

            <div className="hero-trust-row">
              <div className="hero-trust-stars" aria-label="5 star rating">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i} className="star">{star}</span>
                ))}
              </div>
              <span className="hero-trust-rating">{siteData.hero.trust.rating} {siteData.hero.trust.reviewsCount}</span>
              <span className="hero-trust-separator" aria-hidden="true">•</span>
              <span className="hero-trust-badge">{siteData.hero.trust.badgeText}</span>
            </div>
          </div>
        </section>

        {/* CERTIFIED BRAND PARTNERS (STATIONARY LUXURY TRUST BAR) */}
        <section className="brand-trust-section" aria-label="Certified Brand Partners">
          <div className="container">
            <div className="brand-trust-inner">
              <span className="brand-trust-label">Certified & Authorized Partner</span>
              <div className="brand-trust-grid">
                <div className="brand-trust-item">
                  <span className="brand-name">Carrier</span>
                  <span className="brand-tier">Authorized</span>
                </div>
                <div className="brand-trust-item">
                  <span className="brand-name">Trane</span>
                  <span className="brand-tier">Specialist</span>
                </div>
                <div className="brand-trust-item">
                  <span className="brand-name">Bosch</span>
                  <span className="brand-tier">Certified Pro</span>
                </div>
                <div className="brand-trust-item">
                  <span className="brand-name">Rheem</span>
                  <span className="brand-tier">Pro Partner</span>
                </div>
                <div className="brand-trust-item">
                  <span className="brand-name">Lennox</span>
                  <span className="brand-tier">Premier</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES (BENTO) */}
        <section id="services" className="section">
          <div className="container">
            <div className="section-header reveal" ref={addToRefs}>
              <span className="section-tag">Our Expertise</span>
              <h2 className="section-title">Comprehensive Home Services</h2>
              <p className="section-desc">We combine decades of experience with modern technology to deliver unmatched plumbing and HVAC solutions.</p>
            </div>
            
            <div className="bento-grid">
              <div className="bento-card bento-featured reveal delay-100" ref={addToRefs}>
                <div className="bento-content">
                  <div className="bento-icon" style={{background: 'rgba(255,255,255,0.1)', color: '#fff'}} aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <h3>24/7 Emergency Services</h3>
                  <p>Disasters don't wait for business hours. Our rapid-response teams are stationed across the city, guaranteeing arrival within 45 minutes for critical emergencies.</p>
                </div>
                <img
                  className="bento-featured-img"
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80"
                  alt="Emergency plumbing technician fixing industrial pipeline"
                  width="600"
                  height="400"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              {/* Plumbing Repairs */}
              <div className="bento-card bento-with-media reveal delay-200" ref={addToRefs}>
                <div className="bento-content">
                  <div className="bento-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  </div>
                  <h3>Plumbing Repairs</h3>
                  <p>From stubborn clogs and leaky pipes to full repiping and fixture installations.</p>
                </div>
                <div className="bento-card-media" aria-hidden="true">
                  <img
                    className="bento-card-img"
                    src="/services/plumbing_repairs.jpg"
                    alt="Plumbing repairs and pipe maintenance"
                    width="400"
                    height="300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              
              {/* AC & Cooling */}
              <div className="bento-card bento-with-media reveal delay-300" ref={addToRefs}>
                <div className="bento-content">
                  <div className="bento-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
                  </div>
                  <h3>AC & Cooling</h3>
                  <p>Keep the heat out with next-generation cooling systems and hyper-efficient tune-ups.</p>
                </div>
                <div className="bento-card-media" aria-hidden="true">
                  <img
                    className="bento-card-img"
                    src="/services/ac_cooling.jpg"
                    alt="AC & cooling maintenance with diagnostic gauges"
                    width="400"
                    height="300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Heating & Furnaces */}
              <div className="bento-card bento-with-media reveal delay-100" ref={addToRefs}>
                <div className="bento-content">
                  <div className="bento-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg>
                  </div>
                  <h3>Heating & Furnaces</h3>
                  <p>Stay warm all winter. Expert furnace diagnostics, repairs, and smart-home integrations.</p>
                </div>
                <div className="bento-card-media" aria-hidden="true">
                  <img
                    className="bento-card-img"
                    src="/services/heating_furnaces.jpg"
                    alt="Heating and furnace system maintenance"
                    width="400"
                    height="300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Water Heaters */}
              <div className="bento-card bento-with-media reveal delay-200" ref={addToRefs}>
                <div className="bento-content">
                  <div className="bento-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <h3>Water Heaters</h3>
                  <p>Never run out of hot water again. Tankless upgrades and rapid replacements.</p>
                </div>
                <div className="bento-card-media" aria-hidden="true">
                  <img
                    className="bento-card-img"
                    src="/services/water_heaters.jpg"
                    alt="Tankless water heater installation"
                    width="400"
                    height="300"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="section about-section">
          <div className="container">
            <div className="about-grid">
              {/* Left Column: Rounded portrait with subtle teal glow and floating glass card */}
              <div className="about-visual reveal" ref={addToRefs}>
                <div className="about-portrait-wrapper">
                  <div className="about-teal-glow" aria-hidden="true"></div>
                  <img
                    src={siteData.about.image}
                    alt={siteData.about.imageAlt}
                    className="about-portrait-img"
                    width="600"
                    height="750"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="about-badge-glass" aria-label="10 plus years experience">
                    <div className="about-badge-icon" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </div>
                    <div className="about-badge-text">
                      <strong>{siteData.about.floatingBadge}</strong>
                      <span>Master Certified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Story & Direct Contacts */}
              <div className="about-content reveal delay-100" ref={addToRefs}>
                <span className="section-tag">{siteData.about.label}</span>
                <h2 className="about-heading">{siteData.about.heading}</h2>
                <p className="about-story">{siteData.about.story}</p>

                {/* Stat Chips */}
                <div className="about-chips">
                  {siteData.about.statChips.map((chip) => (
                    <div key={chip.label} className="about-chip">
                      <span className="chip-value">{chip.label}</span>
                      <span className="chip-desc">{chip.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Contact CTA buttons & direct text */}
                <div className="about-contact-wrap">
                  <div className="about-buttons">
                    <a href={siteData.about.contact.emailHref} className="btn-about-email">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                      {siteData.about.contact.emailLabel}
                    </a>
                    <a href={siteData.about.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-about-whatsapp" aria-label="Chat with Shijan Pias on WhatsApp">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                      {siteData.about.contact.whatsappLabel}
                    </a>
                  </div>

                  <div className="about-contact-details">
                    <span className="contact-item">
                      <span className="contact-label">Email:</span>
                      <a href={siteData.about.contact.emailHref} className="contact-link">{siteData.about.contact.email}</a>
                    </span>
                    <span className="contact-dot" aria-hidden="true">•</span>
                    <span className="contact-item">
                      <span className="contact-label">Phone:</span>
                      <a href={siteData.about.contact.phoneHref} className="contact-link">{siteData.about.contact.phone}</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats" aria-label="Key Performance Statistics">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item reveal" ref={addToRefs}>
                <Counter end={15} suffix="+" />
                <p>Years Experience</p>
              </div>
              <div className="stat-item reveal delay-100" ref={addToRefs}>
                <Counter end={10000} suffix="+" />
                <p>Jobs Completed</p>
              </div>
              <div className="stat-item reveal delay-200" ref={addToRefs}>
                <Counter end={45} suffix="m" />
                <p>Avg Response Time</p>
              </div>
              <div className="stat-item reveal delay-300" ref={addToRefs}>
                <Counter end={100} suffix="%" />
                <p>Satisfaction Guarantee</p>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="section">
          <div className="container">
            <div className="section-header reveal" ref={addToRefs}>
              <span className="section-tag">Testimonials</span>
              <h2 className="section-title">Loved by the Community</h2>
            </div>
            
            <div className="reviews-grid">
              <div className="review-card reveal delay-100" ref={addToRefs}>
                <div className="review-stars" aria-label="5 stars rating">★★★★★</div>
                <p className="review-text">"My AC died in the middle of July. AquaFlow was at my house within 40 minutes and had a new unit installed the very next day. Incredibly professional team!"</p>
                <div className="review-author">
                  <div className="review-avatar">
                    <img
                      src="https://ui-avatars.com/api/?name=Sarah+J&background=random"
                      style={{borderRadius: '50%'}}
                      alt="Sarah Jenkins profile"
                      width="48"
                      height="48"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="review-info">
                    <h4>Sarah Jenkins</h4>
                    <span className="review-badge"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg> Verified Customer</span>
                  </div>
                </div>
              </div>
              
              <div className="review-card reveal delay-200" ref={addToRefs}>
                <div className="review-stars" aria-label="5 stars rating">★★★★★</div>
                <p className="review-text">"We had a major pipe burst at 2 AM. The dispatcher was calm and helpful, and the plumber fixed the leak before it caused serious water damage. Lifesavers."</p>
                <div className="review-author">
                  <div className="review-avatar">
                    <img
                      src="https://ui-avatars.com/api/?name=Michael+T&background=random"
                      style={{borderRadius: '50%'}}
                      alt="Michael Torres profile"
                      width="48"
                      height="48"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="review-info">
                    <h4>Michael Torres</h4>
                    <span className="review-badge"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg> Verified Customer</span>
                  </div>
                </div>
              </div>

              <div className="review-card reveal delay-300" ref={addToRefs}>
                <div className="review-stars" aria-label="5 stars rating">★★★★★</div>
                <p className="review-text">"Upfront pricing with zero hidden fees. They explained everything clearly before starting the work on our new furnace. Highly recommend AquaFlow."</p>
                <div className="review-author">
                  <div className="review-avatar">
                    <img
                      src="https://ui-avatars.com/api/?name=David+L&background=random"
                      style={{borderRadius: '50%'}}
                      alt="David Lee profile"
                      width="48"
                      height="48"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="review-info">
                    <h4>David Lee</h4>
                    <span className="review-badge"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg> Verified Customer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT & EMAILJS SYSTEM SECTION */}
        <ContactSection addToRefs={addToRefs} />

        {/* FINAL CTA */}
        <section className="final-cta reveal" ref={addToRefs}>
          <div className="container">
            <div className="cta-panel">
              <div className="cta-content">
                <h2>Ready to upgrade your home comfort?</h2>
                <div className="hero-actions" style={{justifyContent: 'center'}}>
                  <a href="#contact" className="btn btn-primary">
                    Book Service Online
                    <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                  <a href={siteData.header.phoneHref} className="btn btn-ghost" style={{color: '#fff', borderColor: 'rgba(255,255,255,0.2)'}}>
                    Call {siteData.header.phoneNumber}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 2026 MODERN PREMIUM FOOTER */}
      <footer className="footer-2026" role="contentinfo">
        <div className="footer-ambient-glow" aria-hidden="true" />
        
        <div className="container">
          {/* Top Dispatch & Quick Connect Banner */}
          <div className="footer-top-strip">
            <div className="footer-status-pill">
              <span className="footer-pulse-dot" aria-hidden="true"></span>
              <span className="footer-status-text">
                <strong>24/7 Emergency Dispatch Active</strong> — Guaranteed Arrival in &lt;45 Mins
              </span>
            </div>

            <div className="footer-top-actions">
              <a href={siteData.header.phoneHref} className="footer-action-call" aria-label={`Call ${siteData.header.phoneNumber}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>Call {siteData.header.phoneNumber}</span>
              </a>

              <a href={siteData.about.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="footer-action-whatsapp" aria-label="Chat on WhatsApp with Shijan Pias">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Main 4-Column Grid */}
          <div className="footer-main-grid">
            {/* Col 1: Brand, Mission & Credentials */}
            <div className="footer-col footer-col-brand">
              <a href="/" className="footer-logo" aria-label="AquaFlow Home">
                {siteData.header.brandName}<span className="logo-dot">.</span>
              </a>
              <p className="footer-brand-desc">
                Licensed and insured master plumbing & HVAC craftsmanship. Built with transparent diagnostics, upfront guaranteed quotes, and 24/7 rapid dispatch.
              </p>

              <div className="footer-trust-chips">
                <div className="footer-chip">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Licensed & Insured</span>
                </div>
                <div className="footer-chip">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  <span>4.9★ (2,000+ Reviews)</span>
                </div>
              </div>
            </div>

            {/* Col 2: Services */}
            <div className="footer-col">
              <h4 className="footer-col-title">Services</h4>
              <ul className="footer-nav-list">
                <li><a href="#services">Emergency Plumbing</a></li>
                <li><a href="#services">AC Repair & Cooling</a></li>
                <li><a href="#services">Heating & Furnaces</a></li>
                <li><a href="#services">Tankless Water Heaters</a></li>
                <li><a href="#services">Leak Diagnostics</a></li>
                <li><a href="#services">Pipe Replacements</a></li>
              </ul>
            </div>

            {/* Col 3: Company & Information */}
            <div className="footer-col">
              <h4 className="footer-col-title">Company</h4>
              <ul className="footer-nav-list">
                <li><a href="#about">About Shijan Pias</a></li>
                <li><a href="#reviews">Verified Reviews</a></li>
                <li><a href="#contact">Request Fast Quote</a></li>
                <li><a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">Sitemap XML</a></li>
                <li><a href="#about">Work Guarantee</a></li>
              </ul>
            </div>

            {/* Col 4: Direct Contact & Availability */}
            <div className="footer-col footer-col-contact">
              <h4 className="footer-col-title">Direct Contact</h4>
              <div className="footer-contact-items">
                <a href={siteData.header.phoneHref} className="footer-contact-link">
                  <span className="contact-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </span>
                  <div>
                    <span className="contact-small-label">24/7 Hotline</span>
                    <span className="contact-main-val">{siteData.header.phoneNumber}</span>
                  </div>
                </a>

                <a href={siteData.about.contact.emailHref} className="footer-contact-link">
                  <span className="contact-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </span>
                  <div>
                    <span className="contact-small-label">Direct Email</span>
                    <span className="contact-main-val">{siteData.about.contact.email}</span>
                  </div>
                </a>

                <div className="footer-dispatch-time">
                  <span className="dispatch-badge">Avg Arrival</span>
                  <span>Within 45 Minutes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Legal, Rights, & Back to Top */}
          <div className="footer-bottom-bar">
            <div className="footer-bottom-left">
              <p className="footer-copyright">
                &copy; {CURRENT_YEAR} {siteData.meta.businessName}. All rights reserved.
              </p>
              <p className="footer-portfolio-badge">
                Crafted for portfolio & service presentation.
              </p>
            </div>

            <div className="footer-bottom-right">
              <nav className="footer-legal-links" aria-label="Legal links">
                <a href="#about">Privacy</a>
                <span className="legal-sep" aria-hidden="true">•</span>
                <a href="#about">Terms</a>
                <span className="legal-sep" aria-hidden="true">•</span>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">Sitemap</a>
              </nav>

              <button
                type="button"
                onClick={scrollToTop}
                className="btn-back-to-top"
                aria-label="Back to top"
              >
                <span>Back to Top</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bar */}
      <div className="mobile-bottom-bar" role="navigation" aria-label="Mobile quick actions">
        <a href={siteData.header.phoneHref} className="btn btn-ghost mobile-bar-btn" aria-label="Call emergency hotline">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          Call Now
        </a>
        <a href="#contact" className="btn btn-primary mobile-bar-btn" aria-label="Get a quote or schedule service">
          Get Quote
        </a>
      </div>
    </>
  );
}

export default App;

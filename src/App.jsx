import React, { useEffect, useState, useRef } from 'react';
import { siteData } from './data/siteData';
import { ContactSection } from './components/ContactSection';

const Counter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    let startTime = null;
    let hasStarted = false;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing out cubic
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(easeOut * end));
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasStarted) {
        hasStarted = true;
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    
    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, [end, duration]);
  
  return <h3 ref={ref}>{count}{suffix}</h3>;
};

const CURRENT_YEAR = new Date().getFullYear();

function App() {
  const [scrolled, setScrolled] = useState(false);
  const revealRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    revealRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
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
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* HEADER (Sticky Navy Bar with Scroll Transition) */}
      <header className={`header-bar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <a href="/" className="logo">
            {siteData.header.brandName}<span className="logo-dot">.</span>
          </a>

          <nav className="nav-links">
            {siteData.header.navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a href={siteData.header.phoneHref} className="header-phone-link">
              <svg className="phone-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>{siteData.header.phoneNumber}</span>
            </a>

            <a href={siteData.header.phoneHref} className="header-cta-btn">
              <span className="status-dot"></span>
              <span>{siteData.header.ctaText}</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO (Photo-driven Local Service Brand) */}
        <section className="hero">
          {/* Full-bleed background photo */}
          <img
            src={siteData.hero.backgroundImage}
            alt={siteData.hero.altText}
            className="hero-bg-photo"
          />

          {/* Light overlay for readability: linear-gradient(to bottom, rgba(11,31,58,0.35), rgba(11,31,58,0.55)) */}
          <div className="hero-overlay"></div>

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

        {/* MARQUEE */}
        <section className="marquee-section">
          <div className="marquee-content">
            <span className="marquee-item">Carrier Authorized</span>
            <span className="marquee-item">Rheem Pro Partner</span>
            <span className="marquee-item">Lennox Premier</span>
            <span className="marquee-item">Bosch Certified</span>
            <span className="marquee-item">Trane Comfort Specialist</span>
            <span className="marquee-item">Carrier Authorized</span>
            <span className="marquee-item">Rheem Pro Partner</span>
            <span className="marquee-item">Lennox Premier</span>
            <span className="marquee-item">Bosch Certified</span>
            <span className="marquee-item">Trane Comfort Specialist</span>
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
                  <div className="bento-icon" style={{background: 'rgba(255,255,255,0.1)', color: '#fff'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <h3>24/7 Emergency Services</h3>
                  <p>Disasters don't wait for business hours. Our rapid-response teams are stationed across the city, guaranteeing arrival within 45 minutes for critical emergencies.</p>
                </div>
                <img className="bento-featured-img" src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80" alt="Emergency Plumbing" />
              </div>
              
              <div className="bento-card reveal delay-200" ref={addToRefs}>
                <div className="bento-content">
                  <div className="bento-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  </div>
                  <h3>Plumbing Repairs</h3>
                  <p>From stubborn clogs and leaky pipes to full repiping and fixture installations.</p>
                </div>
              </div>
              
              <div className="bento-card reveal delay-300" ref={addToRefs}>
                <div className="bento-content">
                  <div className="bento-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
                  </div>
                  <h3>AC & Cooling</h3>
                  <p>Keep the heat out with next-generation cooling systems and hyper-efficient tune-ups.</p>
                </div>
              </div>

              <div className="bento-card reveal delay-100" ref={addToRefs}>
                <div className="bento-content">
                  <div className="bento-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg>
                  </div>
                  <h3>Heating & Furnaces</h3>
                  <p>Stay warm all winter. Expert furnace diagnostics, repairs, and smart-home integrations.</p>
                </div>
              </div>

              <div className="bento-card reveal delay-200" ref={addToRefs}>
                <div className="bento-content">
                  <div className="bento-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <h3>Water Heaters</h3>
                  <p>Never run out of hot water again. Tankless upgrades and rapid replacements.</p>
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
                  />
                  <div className="about-glass-badge">
                    <div className="about-badge-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                    </div>
                    <div className="about-badge-text">
                      <strong>{siteData.about.floatingBadge}</strong>
                      <span>Master Technician</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: About Content */}
              <div className="about-content reveal delay-100" ref={addToRefs}>
                <span className="section-tag">{siteData.about.label}</span>
                <h2 className="about-heading">{siteData.about.heading}</h2>
                <p className="about-story">{siteData.about.story}</p>

                {/* Stat Chips */}
                <div className="about-chips">
                  {siteData.about.statChips.map((chip, idx) => (
                    <div key={idx} className="about-chip">
                      <span className="chip-value">{chip.label}</span>
                      <span className="chip-desc">{chip.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Contact CTA buttons & direct text */}
                <div className="about-contact-wrap">
                  <div className="about-buttons">
                    <a href={siteData.about.contact.emailHref} className="btn-about-email">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                      {siteData.about.contact.emailLabel}
                    </a>

                    <a href={siteData.about.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-about-whatsapp">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                      {siteData.about.contact.whatsappLabel}
                    </a>
                  </div>

                  <div className="about-contact-details">
                    <span className="contact-item">
                      <span className="contact-label">Email:</span>
                      <a href={siteData.about.contact.emailHref} className="contact-link">{siteData.about.contact.email}</a>
                    </span>
                    <span className="contact-dot">•</span>
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
        <section className="stats">
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
                <div className="review-stars">★★★★★</div>
                <p className="review-text">"My AC died in the middle of July. AquaFlow was at my house within 40 minutes and had a new unit installed the very next day. Incredibly professional team!"</p>
                <div className="review-author">
                  <div className="review-avatar">
                    <img src="https://ui-avatars.com/api/?name=Sarah+J&background=random" style={{borderRadius: '50%'}} alt="Sarah" />
                  </div>
                  <div className="review-info">
                    <h4>Sarah Jenkins</h4>
                    <span className="review-badge"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg> Verified Customer</span>
                  </div>
                </div>
              </div>
              
              <div className="review-card reveal delay-200" ref={addToRefs}>
                <div className="review-stars">★★★★★</div>
                <p className="review-text">"We had a major pipe burst at 2 AM. The dispatcher was calm and helpful, and the plumber fixed the leak before it caused serious water damage. Lifesavers."</p>
                <div className="review-author">
                  <div className="review-avatar">
                    <img src="https://ui-avatars.com/api/?name=Michael+T&background=random" style={{borderRadius: '50%'}} alt="Michael" />
                  </div>
                  <div className="review-info">
                    <h4>Michael Torres</h4>
                    <span className="review-badge"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg> Verified Customer</span>
                  </div>
                </div>
              </div>

              <div className="review-card reveal delay-300" ref={addToRefs}>
                <div className="review-stars">★★★★★</div>
                <p className="review-text">"Upfront pricing with zero hidden fees. They explained everything clearly before starting the work on our new furnace. Highly recommend AquaFlow."</p>
                <div className="review-author">
                  <div className="review-avatar">
                    <img src="https://ui-avatars.com/api/?name=David+L&background=random" style={{borderRadius: '50%'}} alt="David" />
                  </div>
                  <div className="review-info">
                    <h4>David Lee</h4>
                    <span className="review-badge"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg> Verified Customer</span>
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
                  <a href="#quote" className="btn btn-primary">
                    Book Service Online
                    <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                  <a href="tel:18001234567" className="btn btn-ghost" style={{color: '#fff', borderColor: 'rgba(255,255,255,0.2)'}}>
                    Call 1-800-123-4567
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="/" className="logo">
                AquaFlow<span className="logo-dot">.</span>
              </a>
              <p>Premium plumbing, heating, and cooling services delivered with next-generation technology and old-fashioned integrity.</p>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li><a href="#">Emergency Plumbing</a></li>
                <li><a href="#">AC Repair & Install</a></li>
                <li><a href="#">Furnace Solutions</a></li>
                <li><a href="#">Water Heaters</a></li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#reviews">Reviews</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            &copy; {CURRENT_YEAR} AquaFlow Home Services. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bar */}
      <div className="mobile-bottom-bar">
        <a href="tel:18001234567" className="btn btn-ghost" style={{padding: '0.75rem', fontSize: '0.9rem'}}>Call Now</a>
        <a href="#quote" className="btn btn-primary" style={{padding: '0.75rem', fontSize: '0.9rem'}}>Get Quote</a>
      </div>
    </>
  );
}

export default App;

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { siteData } from '../data/siteData';

export const ContactSection = ({ addToRefs }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: siteData.contactSection?.servicesList?.[0] || 'Emergency Plumbing',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const services = siteData.contactSection?.servicesList || [
    'Emergency Plumbing',
    'AC & Cooling Repair',
    'Heating & Furnaces',
    'Water Heater Replacement',
    'Pipe Leak Diagnostics',
    'General Inquiry'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status !== 'idle') {
      setStatus('idle');
      setFeedbackMsg('');
    }
  };

  const handleServiceSelect = (serviceName) => {
    setFormData((prev) => ({ ...prev, service: serviceName }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setFeedbackMsg('Please fill in your name, email, and message details.');
      return;
    }

    setStatus('loading');
    setFeedbackMsg('');

    const serviceId = siteData.emailjs?.serviceId;
    const templateId = siteData.emailjs?.templateId;
    const publicKey = siteData.emailjs?.publicKey;

    // Check if EmailJS keys are provided
    if (!serviceId || !templateId || !publicKey) {
      // Keys not configured yet: simulate graceful send & provide mailto direct fallback
      setTimeout(() => {
        setStatus('demo_mode');
        setFeedbackMsg(
          `Form is ready! To deliver live emails to ${siteData.emailjs.recipientEmail}, enter your EmailJS credentials in .env. You can also send this message directly via the button below.`
        );
      }, 700);
      return;
    }

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        phone: formData.phone || 'Not provided',
        service_type: formData.service,
        message: formData.message,
        to_email: siteData.emailjs.recipientEmail || 'shijanpias3@gmail.com'
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setStatus('success');
      setFeedbackMsg(`Thank you, ${formData.name}! Your message has been sent directly to ${siteData.emailjs.recipientEmail}. We will get back to you shortly.`);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: services[0],
        message: ''
      });
    } catch (err) {
      console.error('EmailJS Send Error:', err);
      setStatus('error');
      setFeedbackMsg(
        `Failed to send via EmailJS: ${err?.text || err?.message || 'Check your EmailJS credentials'}. You can email directly to ${siteData.emailjs.recipientEmail}.`
      );
    }
  };

  const mailtoHref = `mailto:${siteData.emailjs.recipientEmail}?subject=${encodeURIComponent(
    `[AquaFlow Inquiry] ${formData.service || 'Service Request'} from ${formData.name || 'Customer'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="section contact-section">
      {/* Anchor for quote button scrolling */}
      <div id="quote" style={{ position: 'absolute', top: 0, left: 0 }} aria-hidden="true" />

      <div className="container">
        <div className="section-header reveal" ref={addToRefs}>
          <span className="section-tag">{siteData.contactSection.tag}</span>
          <h2 className="section-title">{siteData.contactSection.title}</h2>
          <p className="section-desc">{siteData.contactSection.description}</p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info & Quick Channels */}
          <div className="contact-info-card reveal" ref={addToRefs}>
            <div className="contact-info-header">
              <div className="contact-badge-live">
                <span className="pulse-indicator"></span>
                <span>Active & Responding</span>
              </div>
              <h3>Need Immediate Help?</h3>
              <p>
                Whether it's an urgent pipe burst, furnace breakdown, or a scheduled installation, Shijan Pias and the team are available 24/7.
              </p>
            </div>

            <div className="contact-methods-list">
              <a href={`mailto:${siteData.emailjs.recipientEmail}`} className="contact-method-item">
                <div className="method-icon-wrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="method-text">
                  <span className="method-label">Direct Email</span>
                  <span className="method-val">{siteData.emailjs.recipientEmail}</span>
                </div>
              </a>

              <a href={siteData.contactSection.phoneHref} className="contact-method-item">
                <div className="method-icon-wrap">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="method-text">
                  <span className="method-label">Direct Phone / Hotline</span>
                  <span className="method-val">{siteData.contactSection.phone}</span>
                </div>
              </a>

              <a href={siteData.contactSection.whatsappHref} target="_blank" rel="noopener noreferrer" className="contact-method-item">
                <div className="method-icon-wrap whatsapp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div className="method-text">
                  <span className="method-label">WhatsApp Quick Chat</span>
                  <span className="method-val">Chat Directly with Shijan</span>
                </div>
              </a>
            </div>

            <div className="contact-guarantees">
              <div className="guarantee-chip">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Upfront pricing — No hidden charges</span>
              </div>
              <div className="guarantee-chip">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span>30-minute rapid response guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: EmailJS Contact Form */}
          <div className="contact-form-card reveal delay-100" ref={addToRefs}>
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-card-header">
                <h4>Send a Direct Message</h4>
                <p>Delivers directly to {siteData.emailjs.recipientEmail}</p>
              </div>

              {/* Status alerts */}
              {status === 'success' && (
                <div className="form-alert form-alert-success">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span>{feedbackMsg}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="form-alert form-alert-error">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <div>
                    <p>{feedbackMsg}</p>
                    <a href={mailtoHref} className="alert-direct-link">
                      Click here to email directly →
                    </a>
                  </div>
                </div>
              )}

              {status === 'demo_mode' && (
                <div className="form-alert form-alert-info">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                  <div>
                    <p>{feedbackMsg}</p>
                    <div style={{ marginTop: '0.5rem' }}>
                      <a href={mailtoHref} className="btn-alert-action">
                        Send via Email App ({siteData.emailjs.recipientEmail})
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Service Selection Pills */}
              <div className="form-group">
                <label className="form-label">Select Service Needed</label>
                <div className="service-pills-wrap">
                  {services.map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={`service-pill-btn ${formData.service === item ? 'active' : ''}`}
                      onClick={() => handleServiceSelect(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone in 2 cols */}
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name <span className="req">*</span>
                  </label>
                  <div className="input-with-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <div className="input-with-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +1 800-123-4567"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Your Email Address <span className="req">*</span>
                </label>
                <div className="input-with-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. name@example.com"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Issue Details / Message <span className="req">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your issue (e.g. leaking pipe under sink, AC blowing warm air, emergency water heater replacement)..."
                  required
                  className="form-textarea"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn btn-primary btn-submit-contact"
              >
                {status === 'loading' ? (
                  <>
                    <span className="spinner-dot"></span>
                    <span>Sending to {siteData.emailjs.recipientEmail}...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>

              <div className="form-footnote">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span>Sent directly via EmailJS to <strong>{siteData.emailjs.recipientEmail}</strong>. 100% private.</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

// Site configuration and content data
// Easily swap images, text, and contact information here.

export const siteData = {
  // SEO & SITE METADATA
  meta: {
    title: "AquaFlow | 24/7 Emergency Plumbing & HVAC Services",
    description: "Licensed local emergency plumbing and HVAC repair experts. 24/7 rapid response, upfront pricing, leak detection, AC repair, and water heater replacements.",
    canonicalUrl: "https://aquaflow-chi.vercel.app/",
    siteUrl: "https://aquaflow-chi.vercel.app",
    ogImage: "/og-image.jpg",
    businessName: "AquaFlow Plumbing & HVAC",
    businessType: "Plumber",
    themeColor: "#0B1F3A",
    openingHours: "Mo-Su 00:00-23:59",
    areaServed: [
      "USA",
      "Canada",
      "UK",
      "Australia",
      "New Zealand",
      "UAE",
      "Saudi Arabia",
      "Qatar"
    ],
    ratingValue: "4.9",
    reviewCount: "2000"
  },

  // HEADER CONFIGURATION
  header: {
    brandName: "AquaFlow",
    navLinks: [
      { label: "Services", href: "#services" },
      { label: "Reviews", href: "#reviews" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" }
    ],
    phoneNumber: "+1 (800) 123-4567",
    phoneHref: "tel:+18001234567",
    ctaText: "Call Now"
  },

  // HERO SECTION CONFIGURATION
  // To swap the background photo, update `backgroundImage` below with any local path
  // (e.g. '/images/shijan.jpg') or any Unsplash image URL.
  hero: {
    // Current photo: Friendly professional technician in navy uniform inside modern plumbing workshop showroom
    backgroundImage: "/images/hero-workshop.jpg",
    
    // Alternative high-res Unsplash photo options if you want to switch anytime:
    // "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1920&q=85"
    // "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1920&q=85"
    
    altText: "Friendly professional plumber and HVAC technician in navy work uniform with tools and pipes",
    headline: "A Plumber & HVAC Expert You Can Count On",
    subtext: "Licensed, insured and on time. Upfront pricing, 24/7 emergency service.",
    primaryButton: {
      text: "Schedule or Get a Quote",
      href: "#quote"
    },
    secondaryButton: {
      text: "Call 24/7",
      href: "tel:+18001234567"
    },
    trustPill: "Licensed & Insured • Upfront Pricing • 24/7 Emergency"
  },

  // ABOUT SECTION CONFIGURATION
  about: {
    label: "About Us",
    heading: "Meet Shijan Pias, Your Local Plumbing & HVAC Expert",
    image: "/images/shijan.jpg",
    imageAlt: "Shijan Pias - Licensed Plumbing & HVAC Expert at AquaFlow",
    floatingBadge: "10+ Years Experience",
    story: "I started fixing pipes at 16, helping my uncle's plumbing crew after school. What began as a summer job turned into a career. Over the last 10 years I have repaired leaking taps, rebuilt bathrooms, installed boilers and serviced hundreds of AC systems for families and small businesses. I started AquaFlow because I was tired of seeing customers get surprise bills and delayed visits. Today our promise is simple: show up on time, explain the problem clearly, quote upfront, and fix it right the first time.",
    statChips: [
      { label: "10+ Years", desc: "Hands-on Field Work" },
      { label: "2,000+ Jobs Done", desc: "Residential & Commercial" },
      { label: "24/7 Emergency", desc: "Immediate Dispatch" }
    ],
    contact: {
      email: "hello@aquaflow-demo.com",
      emailHref: "mailto:hello@aquaflow-demo.com",
      phone: "+1 (800) 123-4567",
      phoneHref: "tel:+18001234567",
      whatsappHref: "#",
      whatsappLabel: "WhatsApp",
      emailLabel: "Email Us"
    }
  },

  // EMAILJS SYSTEM CONFIGURATION
  emailjs: {
    // These load from environment variables (e.g. .env) or fallback to empty strings
    // Sign up free at https://www.emailjs.com/ to get your credentials
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
    recipientEmail: "hello@aquaflow-demo.com"
  },

  // CONTACT & QUOTE SECTION CONTENT
  contactSection: {
    tag: "Get In Touch",
    title: "Request a Fast Quote or Send a Message",
    description: "Fill out the form below to connect directly with our team. We respond promptly to all inquiries.",
    phone: "+1 (800) 123-4567",
    phoneHref: "tel:+18001234567",
    whatsappHref: "#",
    servicesList: [
      "Emergency Plumbing",
      "AC & Cooling Repair",
      "Heating & Furnaces",
      "Water Heater Replacement",
      "Pipe Leak Diagnostics",
      "General Consultation"
    ]
  }
};

export default siteData;

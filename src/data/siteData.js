// Site configuration and content data
// Easily swap images, text, and contact information here.

export const siteData = {
  // HEADER CONFIGURATION
  header: {
    brandName: "AquaFlow",
    navLinks: [
      { label: "Services", href: "#services" },
      { label: "Reviews", href: "#reviews" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" }
    ],
    phoneNumber: "1-800-123-4567",
    phoneHref: "tel:18001234567",
    ctaText: "Call Now"
  },

  // HERO SECTION CONFIGURATION
  // To swap the background photo, update `backgroundImage` below with any local path
  // (e.g. '/images/shijan.jpg') or any Unsplash image URL.
  hero: {
    // Current photo: Friendly professional technician in navy uniform with tools and pipes
    backgroundImage: "/images/shijan.jpg",
    
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
      href: "tel:18001234567"
    },
    trust: {
      rating: "4.9",
      reviewsCount: "from 2,000+ reviews",
      badgeText: "Licensed & Insured"
    }
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
      email: "shijanpias3@gmail.com",
      emailHref: "mailto:shijanpias3@gmail.com",
      phone: "+880 1648-366406",
      phoneHref: "tel:+8801648366406",
      whatsappHref: "https://wa.me/8801648366406",
      whatsappLabel: "WhatsApp",
      emailLabel: "Email Me"
    }
  },

  // EMAILJS SYSTEM CONFIGURATION
  emailjs: {
    // These load from environment variables (e.g. .env) or fallback to empty strings
    // Sign up free at https://www.emailjs.com/ to get your credentials
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
    recipientEmail: "shijanpias3@gmail.com"
  },

  // CONTACT & QUOTE SECTION CONTENT
  contactSection: {
    tag: "Get In Touch",
    title: "Request a Fast Quote or Send a Message",
    description: "Fill out the form below to connect directly with Shijan Pias. We usually respond within 15–30 minutes for all inquiries.",
    phone: "+880 1648-366406",
    phoneHref: "tel:+8801648366406",
    whatsappHref: "https://wa.me/8801648366406",
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

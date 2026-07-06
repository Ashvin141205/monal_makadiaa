import React, { useState, useEffect } from "react";
import {
  Sprout,
  Award,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  Menu,
  X,
  MessageSquare,
  ExternalLink,
  ClipboardList
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Import modular page components
import PageHome from "./components/PageHome";
import PageAbout from "./components/PageAbout";
import PageUvSeeds from "./components/PageUvSeeds";
import PageServices from "./components/PageServices";
import PageProducts from "./components/PageProducts";
import PagePlantWorkflow from "./components/PagePlantWorkflow";
import PageMachinery from "./components/PageMachinery";
import PageCleaningProcess from "./components/PageCleaningProcess";
import PageSeedProcessing from "./components/PageSeedProcessing";
import PageInfrastructure from "./components/PageInfrastructure";
import PageQuality from "./components/PageQuality";
import PageGallery from "./components/PageGallery";
import PageBlogFAQs from "./components/PageBlogFAQs";
import PageContactQuote from "./components/PageContactQuote";

import InquiryModal from "./components/InquiryModal";
import AdvisorChat from "./components/AdvisorChat";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Tech Dropdown Hover state on desktop
  const [techDropdownOpen, setTechDropdownOpen] = useState(false);
  // Insights Dropdown Hover state on desktop
  const [insightsDropdownOpen, setInsightsDropdownOpen] = useState(false);

  // Inquiry modal state
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState("");

  // Detect scroll to make navbar sticky
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hash-based client-side router
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const cleanPage = hash.replace(/^#\/?/, "");
        if (cleanPage) {
          setActivePage(cleanPage);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        setActivePage("home");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Programmatic router trigger
  const navigateTo = (pageName: string) => {
    window.location.hash = `#/${pageName}`;
    setMobileMenuOpen(false);
    setTechDropdownOpen(false);
    setInsightsDropdownOpen(false);
  };

  // SEO & Schema JSON-LD dynamic injector
  useEffect(() => {
    const seoData: { [key: string]: { title: string; description: string; schema: any } } = {
      home: {
        title: "Kirit Corporation | Groundnut Processing, Cleaning & UV Seeds Gujarat",
        description: "Kirit Corporation is Gujarat's trusted partner in Groundnut Cleaning, Processing, Grading, and customized agricultural supply. Featuring UV Seeds specialized division.",
        schema: {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Kirit Corporation & UV Seeds",
          "url": window.location.origin,
          "logo": window.location.origin + "/src/assets/images/groundnut_seeds_biyaran_1783339518741.jpg",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-98252-53123",
            "contactType": "sales",
            "areaServed": "IN",
            "availableLanguage": ["en", "gu", "hi"]
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Veraval Road, Opp. Shrinathji Weighbridge, Sondarda",
            "addressLocality": "Keshod",
            "addressRegion": "Gujarat",
            "postalCode": "362227",
            "addressCountry": "IN"
          }
        }
      },
      about: {
        title: "About Kirit Corporation | Gujarat's Groundnut Industry Trust",
        description: "Learn about Kirit Corporation's journey as Gujarat's leading agricultural processing provider and our dedicated premium brand, UV Seeds.",
        schema: {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Kirit Corporation",
          "description": "Leader in groundnut shelling, grading, sorting, and seed processing in Gujarat."
        }
      },
      "uv-seeds": {
        title: "UV Seeds | Premium Groundnut Seed (Biyaran) Division",
        description: "Discover UV Seeds, the specialized seed division of Kirit Corporation providing high germination (85%+), heavy-yield GG-20, GG-2, and G-22 groundnut seeds.",
        schema: {
          "@context": "https://schema.org",
          "@type": "ProductModel",
          "name": "UV Seeds Groundnut Seed",
          "manufacturer": "Kirit Corporation",
          "description": "High germination and pest-resistant groundnut seeds (Biyaran) for Saurashtra farmers."
        }
      },
      services: {
        title: "Our Services | Custom Groundnut Cleaning, Shelling & Sorting",
        description: "Kirit Corporation offers industrial Groundnut Cleaning, Grading, Color Sorting, Custom Processing, and Bulk Moisture-Controlled Warehousing.",
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          "provider": {
            "@type": "Organization",
            "name": "Kirit Corporation"
          },
          "serviceType": "Groundnut Cleaning & Shelling"
        }
      },
      products: {
        title: "Products Catalog | Graded Peanut Kernels & Sowing Seeds",
        description: "Explore our export-grade Bold and Java peanuts, splits, raw pods, and high-purity UV Seeds (GG-20, GG-2, G-22) sorted via advanced computer vision.",
        schema: {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Groundnut Products",
          "description": "Bold Peanuts, Java Peanuts, Splits, and Raw Pods graded for export."
        }
      },
      "plant-workflow": {
        title: "Processing Plant & Workflow | Kirit Corporation",
        description: "Follow the 10-stage processing journey of groundnuts from raw farm inwarding through de-stoning, size sizing, color sorting to ultimate dispatch.",
        schema: {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "Groundnut Shelling & Sorting Workflow"
        }
      },
      machinery: {
        title: "Machinery & Equipment Catalog | Advanced Sorting Technology",
        description: "See our state-of-the-art machinery: pre-cleaners, destoners, pneumatic sizers, Buhler-style CCD color sorters, and high-speed bag stitchers.",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Industrial Machinery"
        }
      },
      "cleaning-process": {
        title: "Cleaning Process | Physical Impurity & Stone Extraction",
        description: "Detailed look at our state-of-the-art multi-stage pre-cleaners and pressurized dry de-stoners that eliminate clay clods, dirt, and stones.",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Groundnut Cleaning Process"
        }
      },
      "seed-processing": {
        title: "Seed Processing | Preparing High-Vigor Sowing Crops",
        description: "How UV Seeds are graded and treated with safe anti-fungal protectants to achieve extreme purity and secure 85%+ germination success.",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Groundnut Seed Processing"
        }
      },
      infrastructure: {
        title: "Infrastructure & Facilities | Sondarda Factory Plant",
        description: "Explore Kirit Corporation's modern facilities: pre-engineered industrial shed, clean packing zones, loading docks, and testing labs.",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Kirit Corporation Infrastructure"
        }
      },
      quality: {
        title: "Quality Assurance & Standards | Kirit Corporation",
        description: "Our strict quality policies cover oven-dried moisture tests, laboratory seedling vigor germination checks, and aflatoxin elimination.",
        schema: {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Quality Assurance"
        }
      },
      gallery: {
        title: "Factory & Machinery Gallery | Groundnut Processing",
        description: "High definition photos of our automated sorting facility, graded peanuts, packaging lines, and agronomist seed labs.",
        schema: {
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": "Kirit Corporation Gallery"
        }
      },
      blog: {
        title: "Agronomy & Food Industry Blog | Kirit Corporation",
        description: "Get valuable tips from Saurashtra's leading agronomists on maximizing groundnut crop yields, safe warehouse storage, and color sorting.",
        schema: {
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Groundnut Agronomy Blog"
        }
      },
      faqs: {
        title: "Frequently Asked Questions | Groundnut Seeds & Job Work",
        description: "Answers about seed varieties, custom sorting job work, aflatoxin prevention, payment terms, and visiting our plant in Sondarda, Gujarat.",
        schema: {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": []
        }
      },
      contact: {
        title: "Contact Us | Kirit Corporation & UV Seeds Sondarda Gujarat",
        description: "Visit our plant on Veraval Road, Sondarda, Gujarat. Get physical address, Google map coordinates, email, and direct WhatsApp lines.",
        schema: {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Kirit Corporation"
        }
      },
      quote: {
        title: "Request a Quote | B2B Commercial Offers & Sizing Quotes",
        description: "Get customized wholesale B2B pricing quotes for bold peanut kernels, java peanuts, or bulk UV Seeds groundnut sowing crop.",
        schema: {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Request Quote"
        }
      }
    };

    const currentSeo = seoData[activePage] || seoData.home;
    document.title = currentSeo.title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", currentSeo.description);

    let schemaScript = document.getElementById("jsonld-schema");
    if (schemaScript) {
      schemaScript.remove();
    }
    schemaScript = document.createElement("script");
    schemaScript.setAttribute("id", "jsonld-schema");
    schemaScript.setAttribute("type", "application/ld+json");
    schemaScript.innerHTML = JSON.stringify(currentSeo.schema);
    document.head.appendChild(schemaScript);
  }, [activePage]);

  const handleOpenInquiry = (productName: string) => {
    setSelectedProductForInquiry(productName);
    setIsInquiryModalOpen(true);
  };

  const handleInquirySuccess = () => {
    // Silently notify or trigger update
  };

  // Render current page dynamically
  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <PageHome onNavigate={navigateTo} onOpenInquiry={handleOpenInquiry} />;
      case "about":
        return <PageAbout />;
      case "uv-seeds":
        return <PageUvSeeds onOpenInquiry={handleOpenInquiry} />;
      case "services":
        return <PageServices onOpenInquiry={handleOpenInquiry} />;
      case "products":
        return <PageProducts onOpenInquiry={handleOpenInquiry} />;
      case "plant-workflow":
        return <PagePlantWorkflow onOpenInquiry={handleOpenInquiry} />;
      case "machinery":
        return <PageMachinery onOpenInquiry={handleOpenInquiry} />;
      case "cleaning-process":
        return <PageCleaningProcess onOpenInquiry={handleOpenInquiry} />;
      case "seed-processing":
        return <PageSeedProcessing onOpenInquiry={handleOpenInquiry} />;
      case "infrastructure":
        return <PageInfrastructure />;
      case "quality":
        return <PageQuality onOpenInquiry={handleOpenInquiry} />;
      case "gallery":
        return <PageGallery />;
      case "blog":
      case "faqs":
        return <PageBlogFAQs onOpenInquiry={handleOpenInquiry} />;
      case "contact":
      case "quote":
        return <PageContactQuote onOpenInquiry={handleOpenInquiry} onSubmitSuccess={handleInquirySuccess} />;
      default:
        return <PageHome onNavigate={navigateTo} onOpenInquiry={handleOpenInquiry} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFB] text-[#2D2D2A] font-sans antialiased selection:bg-[#E5E2D9] selection:text-[#2D4F1E] flex flex-col justify-between">
      <div>
        {/* TOP CONTACT BAR */}
        <div className="bg-[#1C3213] text-[#E5E2D9] py-1.5 px-4 text-xs border-b border-[#2D4F1E] relative z-50">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-4 text-[10.5px] sm:text-xs">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-[#D4AF37]" /> Sondarda, Keshod, Gujarat 362227
              </span>
              <span className="hidden md:inline text-[#2D4F1E]">•</span>
              <span className="hidden md:flex items-center gap-1">
                <Clock className="h-3 w-3 text-[#D4AF37]" /> Mon - Sat: 9:00 AM - 7:00 PM (IST)
              </span>
            </div>
            <div className="flex items-center gap-4 text-[10.5px] sm:text-xs font-bold">
              <a href="tel:+919825253123" className="hover:text-[#D4AF37] flex items-center gap-1">
                <Phone className="h-3 w-3 text-[#D4AF37]" /> +91 98252 53123
              </a>
              <span className="text-[#D4AF37] hidden sm:inline">★ ISO 9001:2015 Certified Plant</span>
            </div>
          </div>
        </div>

        {/* STICKY MAIN NAVBAR */}
        <header
          className={`sticky top-0 z-40 transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-md border-b border-[#E5E2D9] py-3.5"
              : "bg-white py-5 border-b border-gray-100"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            {/* Logo brand block */}
            <div 
              onClick={() => navigateTo("home")} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2D4F1E] text-white shadow-md shadow-[#2D4F1E]/20 transition-all group-hover:scale-105">
                <Sprout className="h-5.5 w-5.5 text-[#D4AF37]" />
              </div>
              <div className="text-left">
                <span className="text-sm font-black text-gray-900 tracking-tight uppercase block leading-tight font-serif">
                  Kirit Corporation
                </span>
                <span className="text-[9.5px] font-bold text-[#8B4513] uppercase tracking-widest block leading-none">
                  UV Seeds Division
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-extrabold text-gray-700">
              <button 
                onClick={() => navigateTo("home")}
                className={`px-3 py-2 rounded-xl transition-all ${activePage === "home" ? "bg-[#2D4F1E]/5 text-[#2D4F1E]" : "hover:bg-gray-50 hover:text-gray-900"}`}
              >
                Home
              </button>
              <button 
                onClick={() => navigateTo("about")}
                className={`px-3 py-2 rounded-xl transition-all ${activePage === "about" ? "bg-[#2D4F1E]/5 text-[#2D4F1E]" : "hover:bg-gray-50 hover:text-gray-900"}`}
              >
                About Us
              </button>
              <button 
                onClick={() => navigateTo("uv-seeds")}
                className={`px-3 py-2 rounded-xl transition-all ${activePage === "uv-seeds" ? "bg-[#2D4F1E]/5 text-[#2D4F1E]" : "hover:bg-gray-50 hover:text-[#2D4F1E]"}`}
              >
                UV Seeds
              </button>
              <button 
                onClick={() => navigateTo("services")}
                className={`px-3 py-2 rounded-xl transition-all ${activePage === "services" ? "bg-[#2D4F1E]/5 text-[#2D4F1E]" : "hover:bg-gray-50 hover:text-gray-900"}`}
              >
                Our Services
              </button>
              <button 
                onClick={() => navigateTo("products")}
                className={`px-3 py-2 rounded-xl transition-all ${activePage === "products" ? "bg-[#2D4F1E]/5 text-[#2D4F1E]" : "hover:bg-gray-50 hover:text-gray-900"}`}
              >
                Products
              </button>

              {/* Technology Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setTechDropdownOpen(true)}
                onMouseLeave={() => setTechDropdownOpen(false)}
              >
                <button 
                  className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1 ${
                    ["plant-workflow", "machinery", "cleaning-process", "seed-processing", "infrastructure", "quality"].includes(activePage)
                      ? "bg-[#2D4F1E]/5 text-[#2D4F1E]"
                      : "hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span>Process & Tech</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                <AnimatePresence>
                  {techDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute left-0 mt-1 w-52 rounded-2xl bg-white border border-[#E5E2D9] p-2 shadow-xl z-50 text-left space-y-1"
                    >
                      <button onClick={() => navigateTo("plant-workflow")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-700 block">Processing Plant</button>
                      <button onClick={() => navigateTo("machinery")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-700 block">Machinery & Equipment</button>
                      <button onClick={() => navigateTo("cleaning-process")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-700 block">Cleaning Process</button>
                      <button onClick={() => navigateTo("seed-processing")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-700 block">Seed Processing</button>
                      <button onClick={() => navigateTo("infrastructure")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-700 block">Infrastructure</button>
                      <button onClick={() => navigateTo("quality")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-700 block">Quality Assurance</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => navigateTo("gallery")}
                className={`px-3 py-2 rounded-xl transition-all ${activePage === "gallery" ? "bg-[#2D4F1E]/5 text-[#2D4F1E]" : "hover:bg-gray-50 hover:text-gray-900"}`}
              >
                Gallery
              </button>

              {/* Insights Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setInsightsDropdownOpen(true)}
                onMouseLeave={() => setInsightsDropdownOpen(false)}
              >
                <button 
                  className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1 ${
                    ["blog", "faqs"].includes(activePage)
                      ? "bg-[#2D4F1E]/5 text-[#2D4F1E]"
                      : "hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span>Insights</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                <AnimatePresence>
                  {insightsDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-1 w-44 rounded-2xl bg-white border border-[#E5E2D9] p-2 shadow-xl z-50 text-left space-y-1"
                    >
                      <button onClick={() => navigateTo("blog")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-700 block">Agronomy Blog</button>
                      <button onClick={() => navigateTo("faqs")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-700 block">FAQs Help Center</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => navigateTo("contact")}
                className={`px-3 py-2 rounded-xl transition-all ${activePage === "contact" ? "bg-[#2D4F1E]/5 text-[#2D4F1E]" : "hover:bg-gray-50 hover:text-gray-900"}`}
              >
                Contact
              </button>
            </nav>

            {/* Header Right Action */}
            <div className="hidden lg:block">
              <button
                onClick={() => navigateTo("quote")}
                className="rounded-xl bg-[#2D4F1E] px-4.5 py-2.5 text-xs font-black text-white hover:bg-[#3D5F2F] transition-colors shadow shadow-[#2D4F1E]/15 cursor-pointer inline-flex items-center gap-1.5"
              >
                <ClipboardList className="h-4 w-4 text-[#D4AF37]" />
                <span>Request Quote</span>
              </button>
            </div>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
            </button>
          </div>

          {/* MOBILE NAV DRAWER PANEL */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-white border-b border-[#E5E2D9] px-4 py-4 space-y-2 overflow-hidden text-left"
              >
                <button onClick={() => navigateTo("home")} className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-gray-50 text-xs font-extrabold text-gray-800 block">Home</button>
                <button onClick={() => navigateTo("about")} className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-gray-50 text-xs font-extrabold text-gray-800 block">About Us</button>
                <button onClick={() => navigateTo("uv-seeds")} className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-[#2D4F1E]/5 text-xs font-extrabold text-[#2D4F1E] block">🌱 UV Seeds Sowing Division</button>
                <button onClick={() => navigateTo("services")} className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-gray-50 text-xs font-extrabold text-gray-800 block">Our Services</button>
                <button onClick={() => navigateTo("products")} className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-gray-50 text-xs font-extrabold text-gray-800 block">Products Catalog</button>
                
                {/* Mobile Tech Sub-links */}
                <div className="pl-3 py-1 border-l-2 border-gray-200 space-y-1">
                  <span className="text-[10px] font-black uppercase text-gray-400 block px-3">Process & Technology</span>
                  <button onClick={() => navigateTo("plant-workflow")} className="w-full text-left py-2 px-3 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-600 block">• Processing Plant</button>
                  <button onClick={() => navigateTo("machinery")} className="w-full text-left py-2 px-3 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-600 block">• Machinery Floor</button>
                  <button onClick={() => navigateTo("cleaning-process")} className="w-full text-left py-2 px-3 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-600 block">• Cleaning Process</button>
                  <button onClick={() => navigateTo("seed-processing")} className="w-full text-left py-2 px-3 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-600 block">• Seed Processing</button>
                  <button onClick={() => navigateTo("infrastructure")} className="w-full text-left py-2 px-3 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-600 block">• Facility Infrastructure</button>
                  <button onClick={() => navigateTo("quality")} className="w-full text-left py-2 px-3 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-600 block">• Quality Assurance</button>
                </div>

                <button onClick={() => navigateTo("gallery")} className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-gray-50 text-xs font-extrabold text-gray-800 block">Factory Gallery</button>
                <button onClick={() => navigateTo("blog")} className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-gray-50 text-xs font-extrabold text-gray-800 block">Agronomy Blog</button>
                <button onClick={() => navigateTo("faqs")} className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-gray-50 text-xs font-extrabold text-gray-800 block">FAQs Help</button>
                <button onClick={() => navigateTo("contact")} className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-gray-50 text-xs font-extrabold text-gray-800 block">Contact Us</button>
                
                <div className="pt-2 border-t border-gray-100">
                  <button
                    onClick={() => navigateTo("quote")}
                    className="w-full text-center rounded-xl bg-[#2D4F1E] py-3 text-xs font-black text-white hover:bg-[#3D5F2F] block cursor-pointer"
                  >
                    B2B Request a Quote
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>

      {/* DYNAMIC COMPONENT STAGE */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.25 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* DEDICATED CORPORATE FOOTER */}
      <footer className="bg-[#1C3213] text-[#E5E2D9] py-14 px-4 border-t border-[#2D4F1E]">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2D4F1E] border border-white/20 text-white">
                <Sprout className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <span className="text-sm font-extrabold text-white tracking-tight uppercase font-serif">Kirit Corporation</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              We stand as Gujarat's leading processors of premium graded groundnut kernels and certified planting seeds, committed to farmers' prosperity, agricultural technology, and honest trading.
            </p>
            <p className="text-[10px] text-gray-400">
              © 2026 Kirit Corporation Ltd. All Rights Reserved.
            </p>
          </div>

          {/* Sowing Varieties */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">UV Seeds (Biyaran)</h4>
            <div className="space-y-2 text-xs text-gray-300 flex flex-col">
              <button onClick={() => navigateTo("uv-seeds")} className="hover:text-[#D4AF37] text-left transition-colors cursor-pointer">GG-20 Premium Seeds</button>
              <button onClick={() => navigateTo("uv-seeds")} className="hover:text-[#D4AF37] text-left transition-colors cursor-pointer">GG-2 Bunch Early Seeds</button>
              <button onClick={() => navigateTo("uv-seeds")} className="hover:text-[#D4AF37] text-left transition-colors cursor-pointer">G-22 Heavy Seeds</button>
              <button onClick={() => navigateTo("products")} className="hover:text-[#D4AF37] text-left transition-colors cursor-pointer">In-Shell Raw Pods</button>
            </div>
          </div>

          {/* Plant & Processes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Process & Tech</h4>
            <div className="space-y-2 text-xs text-gray-300 flex flex-col">
              <button onClick={() => navigateTo("cleaning-process")} className="hover:text-[#D4AF37] text-left transition-colors cursor-pointer">Dry De-stoning & Cleaning</button>
              <button onClick={() => navigateTo("plant-workflow")} className="hover:text-[#D4AF37] text-left transition-colors cursor-pointer">Decortication Shelling</button>
              <button onClick={() => navigateTo("machinery")} className="hover:text-[#D4AF37] text-left transition-colors cursor-pointer">Computerized Color Sorting</button>
              <button onClick={() => navigateTo("quality")} className="hover:text-[#D4AF37] text-left transition-colors cursor-pointer">Aflatoxin ELISA Screening</button>
            </div>
          </div>

          {/* Farmers Outreach Slogan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Factory Head Office</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              We provide raw harvest evaluations and moisture certifications free for Saurashtra farmers. Visit our plant on Veraval Highway Road during regular work hours.
            </p>
            <div className="pt-1.5 flex flex-col gap-1 text-[10.5px] text-[#D4AF37] font-bold font-mono">
              <p>📍 Keshod, Sondarda, Gujarat, India</p>
              <p>📞 Phone desk: +91 98252 53123</p>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION WIDGETS & POPUPS */}
      <AdvisorChat />

      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        initialProduct={selectedProductForInquiry}
        onSubmitSuccess={handleInquirySuccess}
      />

      {/* Floating WhatsApp Action Widget */}
      <a
        href="https://wa.me/919825253123?text=Namaste!%20I%20am%20interested%20in%20your%20Groundnut%20Seeds%20and%20processing%20services."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-24 right-6 z-50 flex items-center justify-center h-12 w-12 rounded-full bg-[#2D4F1E] hover:bg-[#3D5F2F] text-white shadow-2xl transition-all hover:scale-105 active:scale-95 focus:outline-none cursor-pointer border border-white/10"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="h-5.5 w-5.5 text-[#D4AF37]" />
      </a>
    </div>
  );
}

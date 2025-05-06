// Localized text structure
export interface LocalizedText {
    en: string;
    ar: string;
  }
  
  // Navigation link structure
  export interface NavLink {
    id: string;
    titleEn: string;
    titleAr: string;
    url: string;
  }
  
  // Social media link structure
  export interface SocialLink {
    id: string;
    url: string;
    icon: string;
  }
  
  // Footer link category structure
  export interface FooterLinkCategory {
    title: LocalizedText;
    links: {
      titleEn: string;
      titleAr: string;
      url: string;
    }[];
  }
  
  // Contact information structure
  export interface ContactInfo {
    address: LocalizedText;
    phone: string;
    email: string;
    workingHours: LocalizedText;
  }
  
  // Sanity image type
  export interface SanityImage {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
    hotspot?: {
      _type: 'hotspot';
      height: number;
      width: number;
      x: number;
      y: number;
    };
    crop?: {
      _type: 'crop';
      bottom: number;
      left: number;
      right: number;
      top: number;
    };
  }
  
  // Page structure
  export interface Page {
    _id: string;
    title: LocalizedText;
    slug: {
      current: string;
    };
    description: LocalizedText;
    content: any[]; // This could be more specific depending on your block content
  }
  
  // Service structure
  export interface Service {
    _id: string;
    title: LocalizedText;
    slug: {
      current: string;
    };
    icon: string;
    description: LocalizedText;
    image: SanityImage;
    content: any[];
  }
  
  // Category structure
  export interface Category {
    _id: string;
    title: LocalizedText;
    slug: {
      current: string;
    };
  }
  
  // Project structure
  export interface Project {
    _id: string;
    title: LocalizedText;
    slug: {
      current: string;
    };
    client: string;
    category: {
      _ref: string;
      _type: 'reference';
    };
    description: LocalizedText;
    completedAt: string;
    featuredImage: SanityImage;
    gallery: SanityImage[];
    content: any[];
  }
  
  // Settings structure
  export interface Settings {
    title: string;
    description: string;
    logo: SanityImage;
    logoWhite: SanityImage;
    contactInfo: ContactInfo;
    socialLinks: {
      platform: string;
      url: string;
    }[];
  }
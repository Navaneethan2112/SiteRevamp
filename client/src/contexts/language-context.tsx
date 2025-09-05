import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ta' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    features: 'Features',
    pricing: 'Pricing', 
    contact: 'Contact',
    policies: 'Policies',
    dashboard: 'Dashboard',
    logout: 'Logout',
    userLogin: 'User Login',
    adminLogin: 'Admin Login',
    requestDemo: 'Request Demo',
    
    // Hero Section
    heroTitle1: 'Enterprise',
    heroTitle2: 'WhatsApp Business Platform',
    heroTitle3: 'for Modern Businesses',
    heroDescription: 'Transform your customer communication with our professional WhatsApp Business API platform. Features intelligent chatbots, bulk messaging campaigns, and comprehensive analytics for businesses across UAE and India.',
    apiPartner: '✅ Official WhatsApp Business API Partner',
    bulkMessaging: 'Bulk Messaging',
    aiChatbots: 'AI Chatbots', 
    analytics: 'Analytics',
    crmIntegration: 'CRM Integration',
    requestBusinessDemo: 'Request Business Demo',
    viewCaseStudies: 'View Case Studies',
    enterpriseClients: 'Enterprise Clients',
    messagesDelivered: 'Messages Delivered',
    apiUptime: 'API Uptime',
    avgResponseTime: 'Avg Response Time',
    
    // Features Section
    featuresTitle: 'Enterprise-Grade WhatsApp Business Solutions',
    featuresDescription: 'Comprehensive WhatsApp Business API platform designed for enterprises across UAE and India. Features advanced automation, AI-powered chatbots, and enterprise integrations with guaranteed SLAs.',
    
    // Pricing Section
    pricingTitle: 'Enterprise WhatsApp Messaging Solutions',
    pricingDescription: 'Professional WhatsApp Business API plans for businesses of all sizes. Includes chatbots, bulk messaging, and analytics.',
    usdGlobal: '🇺🇸 USD (Global)',
    aedUae: '🇦🇪 AED (UAE)',
    inrIndia: '🇮🇳 INR (India)',
    
    // Plan Names & Descriptions
    starter: 'Starter',
    starterDesc: 'Perfect for small businesses getting started',
    professional: 'Professional', 
    professionalDesc: 'Ideal for growing businesses with advanced needs',
    enterprise: 'Enterprise',
    enterpriseDesc: 'For large organizations with custom requirements',
    month: '/month',
    selectPlan: 'Select Plan',
    mostPopular: 'Most Popular'
  },
  ta: {
    // Navigation  
    features: 'அம்சங்கள்',
    pricing: 'விலைகள்',
    contact: 'தொடர்பு',
    policies: 'கொள்கைகள்',
    dashboard: 'டாஷ்போர்டு',
    logout: 'வெளியேறு',
    userLogin: 'பயனர் உள்நுழைவு',
    adminLogin: 'நிர்வாக உள்நுழைவு', 
    requestDemo: 'டெமோ கோரிக்கை',
    
    // Hero Section
    heroTitle1: 'எண்டர்பிரைஸ்',
    heroTitle2: 'WhatsApp வணிக தளம்',
    heroTitle3: 'நவீன வணிகங்களுக்கு',
    heroDescription: 'எங்கள் தொழில்முறை WhatsApp வணிக API தளத்துடன் உங்கள் வாடிக்கையாளர் தொடர்புகளை மாற்றவும். UAE மற்றும் இந்தியாவில் வணிகங்களுக்கு அறிவார்ந்த சாட்போட்கள், மொத்த செய்திகள் மற்றும் விரிவான பகுப்பாய்வு.',
    apiPartner: '✅ அதிகாரப்பூர்வ WhatsApp வணிக API பங்குதாரர்',
    bulkMessaging: 'மொத்த செய்தி',
    aiChatbots: 'AI சாட்போட்கள்',
    analytics: 'பகுப்பாய்வு',
    crmIntegration: 'CRM ஒருங்கிணைப்பு',
    requestBusinessDemo: 'வணிக டெமோ கோரிக்கை',
    viewCaseStudies: 'வழக்கு ஆய்வுகளை பார்க்கவும்',
    enterpriseClients: 'நிறுவன வாடிக்கையாளர்கள்',
    messagesDelivered: 'செய்திகள் விநியோகம்',
    apiUptime: 'API இயங்கும் நேரம்',
    avgResponseTime: 'சராசரி பதில் நேரம்',
    
    // Features Section
    featuresTitle: 'நிறுவன-தர WhatsApp வணிக தீர்வுகள்',
    featuresDescription: 'UAE மற்றும் இந்தியாவில் நிறுவனங்களுக்கு வடிவமைக்கப்பட்ட விரிவான WhatsApp வணிக API தளம். உத்தரவாத SLAகளுடன் மேம்பட்ட ஆட்டோமேஷன், AI-இயங்கும் சாட்போட்கள் மற்றும் நிறுவன ஒருங்கிணைப்புகள்.',
    
    // Pricing Section
    pricingTitle: 'நிறுவன WhatsApp செய்தி தீர்வுகள்',
    pricingDescription: 'அனைத்து அளவிலான வணிகங்களுக்கும் தொழில்முறை WhatsApp வணிக API திட்டங்கள். சாட்போட்கள், மொத்த செய்திகள் மற்றும் பகுப்பாய்வு உள்ளடங்கும்.',
    usdGlobal: '🇺🇸 USD (உலகளாவிய)',
    aedUae: '🇦🇪 AED (UAE)',
    inrIndia: '🇮🇳 INR (இந்தியா)',
    
    // Plan Names & Descriptions  
    starter: 'ஆரம்ப',
    starterDesc: 'தொடங்கும் சிறு வணிகங்களுக்கு ஏற்றது',
    professional: 'தொழில்முறை',
    professionalDesc: 'மேம்பட்ட தேவைகளுடன் வளரும் வணிகங்களுக்கு ஏற்றது',
    enterprise: 'நிறுவன',
    enterpriseDesc: 'தனிப்பயன் தேவைகளுடன் பெரிய நிறுவனங்களுக்கு',
    month: '/மாதம்',
    selectPlan: 'திட்டத்தை தேர்ந்தெடுக்கவும்',
    mostPopular: 'மிகவும் பிரபலமான'
  },
  ar: {
    // Navigation
    features: 'المميزات',
    pricing: 'التسعير', 
    contact: 'اتصل بنا',
    policies: 'السياسات',
    dashboard: 'لوحة التحكم',
    logout: 'تسجيل الخروج',
    userLogin: 'تسجيل دخول المستخدم',
    adminLogin: 'تسجيل دخول المشرف',
    requestDemo: 'طلب عرض تجريبي',
    
    // Hero Section
    heroTitle1: 'منصة',
    heroTitle2: 'WhatsApp التجارية المؤسسية',
    heroTitle3: 'للشركات الحديثة',
    heroDescription: 'حول اتصالات عملائك مع منصة WhatsApp Business API المهنية لدينا. تتميز بروبوتات المحادثة الذكية وحملات الرسائل المجمعة والتحليلات الشاملة للشركات في دولة الإمارات والهند.',
    apiPartner: '✅ شريك رسمي لـ WhatsApp Business API',
    bulkMessaging: 'الرسائل المجمعة',
    aiChatbots: 'روبوتات الذكاء الاصطناعي',
    analytics: 'التحليلات',
    crmIntegration: 'تكامل CRM',
    requestBusinessDemo: 'طلب عرض تجاري',
    viewCaseStudies: 'عرض دراسات الحالة',
    enterpriseClients: 'عملاء المؤسسات',
    messagesDelivered: 'الرسائل المُسلمة',
    apiUptime: 'وقت تشغيل API',
    avgResponseTime: 'متوسط وقت الاستجابة',
    
    // Features Section
    featuresTitle: 'حلول WhatsApp التجارية على مستوى المؤسسات',
    featuresDescription: 'منصة WhatsApp Business API شاملة مصممة للمؤسسات في دولة الإمارات والهند. تتميز بالأتمتة المتقدمة وروبوتات المحادثة المدعومة بالذكاء الاصطناعي وتكاملات المؤسسات مع ضمانات SLA.',
    
    // Pricing Section
    pricingTitle: 'حلول رسائل WhatsApp المؤسسية',
    pricingDescription: 'خطط WhatsApp Business API المهنية للشركات من جميع الأحجام. تشمل روبوتات المحادثة والرسائل المجمعة والتحليلات.',
    usdGlobal: '🇺🇸 USD (عالمي)',
    aedUae: '🇦🇪 AED (الإمارات)',
    inrIndia: '🇮🇳 INR (الهند)',
    
    // Plan Names & Descriptions
    starter: 'المبتدئ',
    starterDesc: 'مثالي للشركات الصغيرة التي تبدأ',
    professional: 'المحترف',
    professionalDesc: 'مثالي للشركات النامية ذات الاحتياجات المتقدمة',
    enterprise: 'المؤسسية',
    enterpriseDesc: 'للمؤسسات الكبيرة ذات المتطلبات المخصصة',
    month: '/شهر',
    selectPlan: 'اختر الخطة',
    mostPopular: 'الأكثر شعبية'
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
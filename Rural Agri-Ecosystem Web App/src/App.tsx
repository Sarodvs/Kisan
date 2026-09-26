import { useState, type ReactNode } from "react";

type IconName =
  | "home"
  | "tractor"
  | "users"
  | "warehouse"
  | "leaf"
  | "sun"
  | "cloud"
  | "speaker"
  | "mic"
  | "bell"
  | "map"
  | "phone"
  | "calendar"
  | "clock"
  | "check"
  | "close"
  | "tool"
  | "shield"
  | "briefcase"
  | "user"
  | "chevron"
  | "search"
  | "box";

function Icon({ name, size = 24, className = "" }: { name: IconName; size?: number; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10M9 21v-7h6v7" /></>,
    tractor: <><path d="M4 14h10l-2-6H8v6M14 11h4l3 3v3h-2" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="18" r="2" /><path d="M9 18h6M8 8V5h4" /></>,
    users: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-4 2.5-7 6-7s6 3 6 7M15 14c3.5 0 6 2 6 6" /></>,
    warehouse: <><path d="m3 10 9-6 9 6v11H3z" /><path d="M7 21v-7h10v7M7 17h10" /></>,
    leaf: <><path d="M19 4C11 4 5 8 5 14c0 3 2 5 5 5 6 0 9-7 9-15Z" /><path d="M5 21c2-6 6-9 11-12" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    cloud: <path d="M6 19h12a4 4 0 0 0 .5-8A7 7 0 0 0 5 9a5 5 0 0 0 1 10Z" />,
    speaker: <><path d="M5 10v4h4l5 4V6L9 10zM17 9c1.5 1.5 1.5 4.5 0 6M19.5 6.5c3 3 3 8 0 11" /></>,
    mic: <><rect x="9" y="3" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    map: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    phone: <path d="M7 3 4 5c-1 1 1 6 5 10s9 6 10 5l2-3-5-3-2 2c-2-1-5-4-6-6l2-2z" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    check: <path d="m4 12 5 5L20 6" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    tool: <><path d="M14 7a5 5 0 0 0-7-4l3 3-4 4-3-3a5 5 0 0 0 6 6l7 8 5-5-8-7a5 5 0 0 0 1-2Z" /></>,
    shield: <path d="M12 3 4 6v6c0 5 3 8 8 10 5-2 8-5 8-10V6z" />,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V4h6v3M3 12h18M10 12v2h4v-2" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-5 3-8 8-8s8 3 8 8" /></>,
    chevron: <path d="m9 6 6 6-6 6" />,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    box: <><path d="m4 7 8-4 8 4-8 4zM4 7v10l8 4 8-4V7M12 11v10" /></>,
  };
  return <svg aria-hidden="true" className={className} fill="none" height={size} viewBox="0 0 24 24" width={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">{paths[name]}</svg>;
}

type LanguageCode = "en" | "hi" | "mr" | "bn" | "te" | "ta" | "gu" | "kn" | "ml" | "pa" | "or" | "as";

const languageOptions: { code: LanguageCode; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" }, { code: "hi", label: "Hindi", nativeLabel: "हिंदी" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी" }, { code: "bn", label: "Bengali", nativeLabel: "বাংলা" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" }, { code: "ta", label: "Tamil", nativeLabel: "தமிழ்" },
  { code: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી" }, { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", nativeLabel: "മലയാളം" }, { code: "pa", label: "Punjabi", nativeLabel: "ਪੰਜਾਬੀ" },
  { code: "or", label: "Odia", nativeLabel: "ଓଡ଼ିଆ" }, { code: "as", label: "Assamese", nativeLabel: "অসমীয়া" },
];

const translations: Record<LanguageCode, Record<string, string>> = {
  en: { welcome: "WELCOME", signIn: "Sign in to continue", chooseUse: "Choose how you use Kisan Saathi, then enter your mobile number.", mobile: "Mobile number", sendOtp: "Send one-time password", secure: "Your number stays private and secure.", whatNeed: "What do you need?", schemes: "Government schemes", schemesHint: "Suggestions matched to your crops, land, and needs.", apply: "Can I apply?", home: "Home", equipment: "Equipment", jobs: "Jobs", requests: "Requests", profile: "Profile", logout: "Log out", selectLanguage: "Select language", onboarding: "Set up your profile", skip: "Skip for now", continue: "Continue", finish: "Finish setup", back: "Back" },
  hi: { welcome: "स्वागत है", signIn: "जारी रखने के लिए साइन इन करें", chooseUse: "किसान साथी का उपयोग कैसे करेंगे? अपना मोबाइल नंबर दर्ज करें।", mobile: "मोबाइल नंबर", sendOtp: "वन-टाइम पासवर्ड भेजें", secure: "आपका नंबर सुरक्षित और निजी रहेगा।", whatNeed: "आपको क्या चाहिए?", schemes: "सरकारी योजनाएं", schemesHint: "आपकी फसल, जमीन और जरूरतों के आधार पर सुझाव।", apply: "क्या मैं आवेदन कर सकता हूं?", home: "होम", equipment: "उपकरण", jobs: "काम", requests: "अनुरोध", profile: "प्रोफाइल", logout: "लॉग आउट", selectLanguage: "भाषा चुनें", onboarding: "अपनी प्रोफाइल बनाएं", skip: "अभी छोड़ें", continue: "जारी रखें", finish: "सेटअप पूरा करें" },
  mr: { welcome: "स्वागत आहे", signIn: "पुढे जाण्यासाठी साइन इन करा", chooseUse: "किसान साथी कसे वापराल? तुमचा मोबाईल नंबर टाका.", mobile: "मोबाईल नंबर", sendOtp: "वन-टाइम पासवर्ड पाठवा", secure: "तुमचा नंबर सुरक्षित आणि खासगी राहील.", whatNeed: "तुम्हाला काय हवे आहे?", schemes: "सरकारी योजना", schemesHint: "तुमची पिके, जमीन आणि गरजांवर आधारित सूचना.", apply: "मी अर्ज करू शकतो का?", home: "मुख्यपृष्ठ", equipment: "उपकरणे", jobs: "कामे", requests: "विनंत्या", profile: "प्रोफाइल", logout: "लॉग आउट", selectLanguage: "भाषा निवडा", onboarding: "प्रोफाइल तयार करा", skip: "आत्ता वगळा", continue: "पुढे चला", finish: "सेटअप पूर्ण करा" },
  bn: { welcome: "স্বাগতম", signIn: "চালিয়ে যেতে সাইন ইন করুন", chooseUse: "আপনি কিষান সাথী কীভাবে ব্যবহার করবেন? মোবাইল নম্বর দিন।", mobile: "মোবাইল নম্বর", sendOtp: "ওটিপি পাঠান", secure: "আপনার নম্বর নিরাপদ ও গোপন থাকবে।", whatNeed: "আপনার কী প্রয়োজন?", schemes: "সরকারি প্রকল্প", schemesHint: "আপনার ফসল, জমি ও প্রয়োজনের ভিত্তিতে পরামর্শ।", apply: "আমি কি আবেদন করতে পারি?", home: "হোম", equipment: "সরঞ্জাম", jobs: "কাজ", requests: "অনুরোধ", profile: "প্রোফাইল", logout: "লগ আউট", selectLanguage: "ভাষা নির্বাচন করুন", onboarding: "প্রোফাইল তৈরি করুন", skip: "এখন এড়িয়ে যান", continue: "চালিয়ে যান", finish: "সেটআপ শেষ করুন" },
  te: { welcome: "స్వాగతం", signIn: "కొనసాగించడానికి సైన్ ఇన్ చేయండి", chooseUse: "కిసాన్ సాథీని ఎలా ఉపయోగిస్తారు? మొబైల్ నంబర్ నమోదు చేయండి.", mobile: "మొబైల్ నంబర్", sendOtp: "వన్ టైమ్ పాస్‌వర్డ్ పంపండి", secure: "మీ నంబర్ సురక్షితంగా ఉంటుంది.", whatNeed: "మీకు ఏమి కావాలి?", schemes: "ప్రభుత్వ పథకాలు", schemesHint: "మీ పంటలు, భూమి మరియు అవసరాల ఆధారంగా సూచనలు.", apply: "నేను దరఖాస్తు చేయవచ్చా?", home: "హోమ్", equipment: "పరికరాలు", jobs: "పనులు", requests: "అభ్యర్థనలు", profile: "ప్రొఫైల్", logout: "లాగ్ అవుట్", selectLanguage: "భాషను ఎంచుకోండి", onboarding: "మీ ప్రొఫైల్ ఏర్పాటు చేయండి", skip: "ఇప్పుడు దాటవేయండి", continue: "కొనసాగించండి", finish: "సెటప్ పూర్తి చేయండి" },
  ta: { welcome: "வரவேற்கிறோம்", signIn: "தொடர உள்நுழையவும்", chooseUse: "கிசான் சாதியை எப்படிப் பயன்படுத்துவீர்கள்? கைபேசி எண்ணை உள்ளிடவும்.", mobile: "கைபேசி எண்", sendOtp: "ஒருமுறை கடவுச்சொல் அனுப்பவும்", secure: "உங்கள் எண் பாதுகாப்பாக இருக்கும்.", whatNeed: "உங்களுக்கு என்ன தேவை?", schemes: "அரசுத் திட்டங்கள்", schemesHint: "உங்கள் பயிர்கள், நிலம் மற்றும் தேவைகளின் அடிப்படையில் பரிந்துரைகள்.", apply: "நான் விண்ணப்பிக்கலாமா?", home: "முகப்பு", equipment: "கருவிகள்", jobs: "வேலைகள்", requests: "கோரிக்கைகள்", profile: "சுயவிவரம்", logout: "வெளியேறு", selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்", onboarding: "சுயவிவரத்தை அமைக்கவும்", skip: "இப்போது தவிர்க்கவும்", continue: "தொடரவும்", finish: "அமைப்பை முடிக்கவும்" },
  gu: { welcome: "સ્વાગત છે", signIn: "ચાલુ રાખવા માટે સાઇન ઇન કરો", chooseUse: "કિસાન સાથીનો ઉપયોગ કેવી રીતે કરશો? મોબાઇલ નંબર દાખલ કરો.", mobile: "મોબાઇલ નંબર", sendOtp: "વન-ટાઇમ પાસવર્ડ મોકલો", secure: "તમારો નંબર સુરક્ષિત અને ખાનગી રહેશે.", whatNeed: "તમને શું જોઈએ છે?", schemes: "સરકારી યોજનાઓ", schemesHint: "તમારા પાક, જમીન અને જરૂરિયાતો પર આધારિત સૂચનો.", apply: "શું હું અરજી કરી શકું?", home: "હોમ", equipment: "સાધનો", jobs: "કામ", requests: "વિનંતીઓ", profile: "પ્રોફાઇલ", logout: "લૉગ આઉટ", selectLanguage: "ભાષા પસંદ કરો", onboarding: "તમારી પ્રોફાઇલ સેટ કરો", skip: "હમણાં છોડો", continue: "ચાલુ રાખો", finish: "સેટઅપ પૂર્ણ કરો" },
  kn: { welcome: "ಸ್ವಾಗತ", signIn: "ಮುಂದುವರಿಯಲು ಸೈನ್ ಇನ್ ಮಾಡಿ", chooseUse: "ಕಿಸಾನ್ ಸಾಥಿಯನ್ನು ಹೇಗೆ ಬಳಸುತ್ತೀರಿ? ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.", mobile: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", sendOtp: "ಒಟಿಪಿ ಕಳುಹಿಸಿ", secure: "ನಿಮ್ಮ ಸಂಖ್ಯೆ ಸುರಕ್ಷಿತವಾಗಿರುತ್ತದೆ.", whatNeed: "ನಿಮಗೆ ಏನು ಬೇಕು?", schemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು", schemesHint: "ನಿಮ್ಮ ಬೆಳೆಗಳು, ಭೂಮಿ ಮತ್ತು ಅಗತ್ಯಗಳ ಆಧಾರದ ಸಲಹೆಗಳು.", apply: "ನಾನು ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದೇ?", home: "ಮುಖಪುಟ", equipment: "ಉಪಕರಣಗಳು", jobs: "ಕೆಲಸಗಳು", requests: "ವಿನಂತಿಗಳು", profile: "ಪ್ರೊಫೈಲ್", logout: "ಲಾಗ್ ಔಟ್", selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ", onboarding: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಹೊಂದಿಸಿ", skip: "ಈಗ ಬಿಟ್ಟುಬಿಡಿ", continue: "ಮುಂದುವರಿಸಿ", finish: "ಸೆಟಪ್ ಮುಗಿಸಿ" },
  ml: { welcome: "സ്വാഗതം", signIn: "തുടരാൻ സൈൻ ഇൻ ചെയ്യുക", chooseUse: "കിസാൻ സാഥി എങ്ങനെ ഉപയോഗിക്കും? മൊബൈൽ നമ്പർ നൽകുക.", mobile: "മൊബൈൽ നമ്പർ", sendOtp: "ഒടിപി അയയ്ക്കുക", secure: "നിങ്ങളുടെ നമ്പർ സുരക്ഷിതമായിരിക്കും.", whatNeed: "നിങ്ങൾക്ക് എന്താണ് വേണ്ടത്?", schemes: "സർക്കാർ പദ്ധതികൾ", schemesHint: "നിങ്ങളുടെ വിളകൾ, ഭൂമി, ആവശ്യങ്ങൾ എന്നിവ അടിസ്ഥാനമാക്കിയുള്ള നിർദ്ദേശങ്ങൾ.", apply: "എനിക്ക് അപേക്ഷിക്കാമോ?", home: "ഹോം", equipment: "ഉപകരണങ്ങൾ", jobs: "ജോലികൾ", requests: "അഭ്യർത്ഥനകൾ", profile: "പ്രൊഫൈൽ", logout: "ലോഗ് ഔട്ട്", selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക", onboarding: "പ്രൊഫൈൽ സജ്ജമാക്കുക", skip: "ഇപ്പോൾ ഒഴിവാക്കുക", continue: "തുടരുക", finish: "സജ്ജീകരണം പൂർത്തിയാക്കുക" },
  pa: { welcome: "ਜੀ ਆਇਆਂ ਨੂੰ", signIn: "ਜਾਰੀ ਰੱਖਣ ਲਈ ਸਾਈਨ ਇਨ ਕਰੋ", chooseUse: "ਤੁਸੀਂ ਕਿਸਾਨ ਸਾਥੀ ਨੂੰ ਕਿਵੇਂ ਵਰਤੋਗੇ? ਮੋਬਾਈਲ ਨੰਬਰ ਦਿਓ।", mobile: "ਮੋਬਾਈਲ ਨੰਬਰ", sendOtp: "ਓਟੀਪੀ ਭੇਜੋ", secure: "ਤੁਹਾਡਾ ਨੰਬਰ ਸੁਰੱਖਿਅਤ ਰਹੇਗਾ।", whatNeed: "ਤੁਹਾਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ?", schemes: "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ", schemesHint: "ਤੁਹਾਡੀਆਂ ਫਸਲਾਂ, ਜ਼ਮੀਨ ਅਤੇ ਲੋੜਾਂ ਦੇ ਆਧਾਰ ਤੇ ਸੁਝਾਅ।", apply: "ਕੀ ਮੈਂ ਅਰਜ਼ੀ ਦੇ ਸਕਦਾ ਹਾਂ?", home: "ਘਰ", equipment: "ਸਾਜ਼ੋ-ਸਾਮਾਨ", jobs: "ਕੰਮ", requests: "ਬੇਨਤੀਆਂ", profile: "ਪ੍ਰੋਫਾਈਲ", logout: "ਲੌਗ ਆਊਟ", selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ", onboarding: "ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ", skip: "ਹੁਣੇ ਛੱਡੋ", continue: "ਜਾਰੀ ਰੱਖੋ", finish: "ਸੈੱਟਅੱਪ ਪੂਰਾ ਕਰੋ" },
  or: { welcome: "ସ୍ୱାଗତ", signIn: "ଜାରି ରଖିବାକୁ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ", chooseUse: "ଆପଣ କିସାନ ସାଥୀକୁ କିପରି ବ୍ୟବହାର କରିବେ? ମୋବାଇଲ୍ ନମ୍ବର ଦିଅନ୍ତୁ।", mobile: "ମୋବାଇଲ୍ ନମ୍ବର", sendOtp: "ଓଟିପି ପଠାନ୍ତୁ", secure: "ଆପଣଙ୍କ ନମ୍ବର ସୁରକ୍ଷିତ ରହିବ।", whatNeed: "ଆପଣଙ୍କର କଣ ଦରକାର?", schemes: "ସରକାରୀ ଯୋଜନା", schemesHint: "ଆପଣଙ୍କ ଫସଲ, ଜମି ଓ ଆବଶ୍ୟକତା ଆଧାରିତ ପରାମର୍ଶ।", apply: "ମୁଁ ଆବେଦନ କରିପାରିବି କି?", home: "ହୋମ୍", equipment: "ଉପକରଣ", jobs: "କାମ", requests: "ଅନୁରୋଧ", profile: "ପ୍ରୋଫାଇଲ୍", logout: "ଲଗ୍ ଆଉଟ୍", selectLanguage: "ଭାଷା ବାଛନ୍ତୁ", onboarding: "ପ୍ରୋଫାଇଲ୍ ସେଟ୍ କରନ୍ତୁ", skip: "ବର୍ତ୍ତମାନ ଛାଡନ୍ତୁ", continue: "ଜାରି ରଖନ୍ତୁ", finish: "ସେଟଅପ୍ ସମାପ୍ତ କରନ୍ତୁ" },
  as: { welcome: "স্বাগতম", signIn: "আগবাঢ়িবলৈ ছাইন ইন কৰক", chooseUse: "আপুনি কিষাণ সাথী কেনেকৈ ব্যৱহাৰ কৰিব? মোবাইল নম্বৰ দিয়ক।", mobile: "মোবাইল নম্বৰ", sendOtp: "ওটিপি পঠিয়াওক", secure: "আপোনাৰ নম্বৰ সুৰক্ষিত থাকিব।", whatNeed: "আপোনাক কি লাগে?", schemes: "চৰকাৰী আঁচনি", schemesHint: "আপোনাৰ শস্য, মাটি আৰু প্ৰয়োজনৰ ওপৰত ভিত্তি কৰি পৰামৰ্শ।", apply: "মই আবেদন কৰিব পাৰোঁনে?", home: "হোম", equipment: "সঁজুলি", jobs: "কাম", requests: "অনুৰোধ", profile: "প্ৰফাইল", logout: "লগ আউট", selectLanguage: "ভাষা বাছক", onboarding: "আপোনাৰ প্ৰফাইল সাজু কৰক", skip: "এতিয়া বাদ দিয়ক", continue: "আগবাঢ়ক", finish: "ছেটআপ সম্পূৰ্ণ কৰক" },
};

function text(language: LanguageCode, key: string) {
  return translations[language][key] || translations.en[key] || key;
}

const contentTranslations: Record<LanguageCode, Record<string, string>> = {
  en: {},
  hi: {
    "I am a...": "मैं हूं...", Farmer: "किसान", "I grow crops": "मैं फसल उगाता हूं", "Tool Lender": "उपकरण किराए पर देने वाला", "I rent equipment": "मैं उपकरण किराए पर देता हूं", "Job Seeker": "काम खोजने वाला", "I need farm work": "मुझे खेत में काम चाहिए", "Storage Owner": "भंडारण मालिक", "I have storage space": "मेरे पास भंडारण की जगह है", "What do you grow?": "आप क्या उगाते हैं?", "Choose all crops on your farm": "अपने खेत की सभी फसलें चुनें", Wheat: "गेहूं", Rice: "चावल", Vegetables: "सब्जियां", "Other crops": "अन्य फसलें", "How large is your farm?": "आपका खेत कितना बड़ा है?", "A rough estimate is enough": "लगभग अनुमान पर्याप्त है", "Less than 2 acres": "2 एकड़ से कम", "2–5 acres": "2–5 एकड़", "5–10 acres": "5–10 एकड़", "More than 10 acres": "10 एकड़ से अधिक", "What help do you need most?": "आपको सबसे ज्यादा किस मदद की जरूरत है?", "We will put this first on your home screen": "हम इसे आपके होम स्क्रीन पर सबसे पहले दिखाएंगे", "Farm equipment": "कृषि उपकरण", "Farm workers": "कृषि श्रमिक", "Crop storage": "फसल भंडारण", "Government schemes": "सरकारी योजनाएं", "Book Tractor": "ट्रैक्टर बुक करें", "Find Labor": "श्रमिक खोजें", "Find Storage": "भंडारण खोजें", "PM-KISAN": "पीएम-किसान", "Pradhan Mantri Fasal Bima Yojana": "प्रधानमंत्री फसल बीमा योजना", "Kisan Credit Card": "किसान क्रेडिट कार्ड", "Per Drop More Crop": "प्रति बूंद अधिक फसल"
  },
  mr: {
    "I am a...": "मी आहे...", Farmer: "शेतकरी", "I grow crops": "मी पिके घेतो", "Tool Lender": "उपकरणे भाड्याने देणारा", "I rent equipment": "मी उपकरणे भाड्याने देतो", "Job Seeker": "काम शोधणारा", "I need farm work": "मला शेतीचे काम हवे आहे", "Storage Owner": "साठवणूक मालक", "I have storage space": "माझ्याकडे साठवणुकीची जागा आहे", "What do you grow?": "तुम्ही काय पिकवता?", "Choose all crops on your farm": "तुमच्या शेतातील सर्व पिके निवडा", Wheat: "गहू", Rice: "तांदूळ", Vegetables: "भाज्या", "Other crops": "इतर पिके", "How large is your farm?": "तुमचे शेत किती मोठे आहे?", "A rough estimate is enough": "अंदाज पुरेसा आहे", "Less than 2 acres": "2 एकरपेक्षा कमी", "2–5 acres": "2–5 एकर", "5–10 acres": "5–10 एकर", "More than 10 acres": "10 एकरांपेक्षा जास्त", "What help do you need most?": "तुम्हाला सर्वात जास्त कोणती मदत हवी?", "We will put this first on your home screen": "हे तुमच्या होम स्क्रीनवर प्रथम दाखवले जाईल", "Farm equipment": "शेतीची उपकरणे", "Farm workers": "शेतमजूर", "Crop storage": "पीक साठवणूक", "Government schemes": "सरकारी योजना", "Book Tractor": "ट्रॅक्टर बुक करा", "Find Labor": "मजूर शोधा", "Find Storage": "साठवणूक शोधा", "PM-KISAN": "पीएम-किसान", "Pradhan Mantri Fasal Bima Yojana": "प्रधानमंत्री पीक विमा योजना", "Kisan Credit Card": "किसान क्रेडिट कार्ड", "Per Drop More Crop": "प्रति थेंब अधिक पीक"
  },
  bn: {
    "I am a...": "আমি...", Farmer: "কৃষক", "I grow crops": "আমি ফসল চাষ করি", "Tool Lender": "সরঞ্জাম প্রদানকারী", "I rent equipment": "আমি সরঞ্জাম ভাড়া দিই", "Job Seeker": "কাজপ্রার্থী", "I need farm work": "আমার কৃষিকাজ দরকার", "Storage Owner": "গুদাম মালিক", "I have storage space": "আমার গুদামঘর আছে", "What do you grow?": "আপনি কী চাষ করেন?", "Choose all crops on your farm": "আপনার খামারের সব ফসল বেছে নিন", Wheat: "গম", Rice: "ধান", Vegetables: "সবজি", "Other crops": "অন্যান্য ফসল", "How large is your farm?": "আপনার খামার কত বড়?", "A rough estimate is enough": "আনুমানিক হিসাবই যথেষ্ট", "Less than 2 acres": "২ একরের কম", "2–5 acres": "২–৫ একর", "5–10 acres": "৫–১০ একর", "More than 10 acres": "১০ একরের বেশি", "What help do you need most?": "আপনার সবচেয়ে বেশি কী সাহায্য দরকার?", "We will put this first on your home screen": "এটি আপনার হোম স্ক্রিনে প্রথমে দেখানো হবে", "Farm equipment": "কৃষি সরঞ্জাম", "Farm workers": "কৃষিশ্রমিক", "Crop storage": "ফসল সংরক্ষণ", "Government schemes": "সরকারি প্রকল্প", "Book Tractor": "ট্রাক্টর বুক করুন", "Find Labor": "শ্রমিক খুঁজুন", "Find Storage": "সংরক্ষণ খুঁজুন", "PM-KISAN": "পিএম-কিষাণ", "Pradhan Mantri Fasal Bima Yojana": "প্রধানমন্ত্রী ফসল বিমা যোজনা", "Kisan Credit Card": "কিষাণ ক্রেডিট কার্ড", "Per Drop More Crop": "প্রতি ফোঁটায় বেশি ফসল"
  },
  te: {
    "I am a...": "నేను...", Farmer: "రైతు", "I grow crops": "నేను పంటలు పండిస్తాను", "Tool Lender": "పరికరాల అద్దెదారు", "I rent equipment": "నేను పరికరాలు అద్దెకిస్తాను", "Job Seeker": "ఉద్యోగ అన్వేషకుడు", "I need farm work": "నాకు వ్యవసాయ పని కావాలి", "Storage Owner": "నిల్వ యజమాని", "I have storage space": "నా వద్ద నిల్వ స్థలం ఉంది", "What do you grow?": "మీరు ఏమి పండిస్తారు?", "Choose all crops on your farm": "మీ పొలంలోని పంటలను ఎంచుకోండి", Wheat: "గోధుమ", Rice: "వరి", Vegetables: "కూరగాయలు", "Other crops": "ఇతర పంటలు", "How large is your farm?": "మీ పొలం ఎంత పెద్దది?", "A rough estimate is enough": "సుమారు అంచనా సరిపోతుంది", "Less than 2 acres": "2 ఎకరాల కంటే తక్కువ", "2–5 acres": "2–5 ఎకరాలు", "5–10 acres": "5–10 ఎకరాలు", "More than 10 acres": "10 ఎకరాల కంటే ఎక్కువ", "What help do you need most?": "మీకు ఏ సహాయం ఎక్కువగా కావాలి?", "We will put this first on your home screen": "దీన్ని మీ హోమ్ స్క్రీన్‌లో ముందుగా చూపిస్తాము", "Farm equipment": "వ్యవసాయ పరికరాలు", "Farm workers": "వ్యవసాయ కార్మికులు", "Crop storage": "పంట నిల్వ", "Government schemes": "ప్రభుత్వ పథకాలు", "Book Tractor": "ట్రాక్టర్ బుక్ చేయండి", "Find Labor": "కార్మికులను కనుగొనండి", "Find Storage": "నిల్వను కనుగొనండి", "PM-KISAN": "పీఎం-కిసాన్", "Pradhan Mantri Fasal Bima Yojana": "ప్రధాన మంత్రి ఫసల్ బీమా యోజన", "Kisan Credit Card": "కిసాన్ క్రెడిట్ కార్డ్", "Per Drop More Crop": "ప్రతి చుక్కకు ఎక్కువ పంట"
  },
  ta: {
    "I am a...": "நான்...", Farmer: "விவசாயி", "I grow crops": "நான் பயிர்கள் வளர்க்கிறேன்", "Tool Lender": "கருவி வாடகையாளர்", "I rent equipment": "நான் கருவிகளை வாடகைக்கு விடுகிறேன்", "Job Seeker": "வேலை தேடுபவர்", "I need farm work": "எனக்கு விவசாய வேலை தேவை", "Storage Owner": "சேமிப்பு உரிமையாளர்", "I have storage space": "என்னிடம் சேமிப்பு இடம் உள்ளது", "What do you grow?": "நீங்கள் என்ன பயிரிடுகிறீர்கள்?", "Choose all crops on your farm": "உங்கள் பண்ணையின் பயிர்களைத் தேர்ந்தெடுக்கவும்", Wheat: "கோதுமை", Rice: "நெல்", Vegetables: "காய்கறிகள்", "Other crops": "மற்ற பயிர்கள்", "How large is your farm?": "உங்கள் பண்ணை எவ்வளவு பெரியது?", "A rough estimate is enough": "தோராயமான மதிப்பீடு போதும்", "Less than 2 acres": "2 ஏக்கருக்கும் குறைவு", "2–5 acres": "2–5 ஏக்கர்", "5–10 acres": "5–10 ஏக்கர்", "More than 10 acres": "10 ஏக்கருக்கும் மேல்", "What help do you need most?": "உங்களுக்கு எந்த உதவி அதிகம் தேவை?", "We will put this first on your home screen": "இதை உங்கள் முகப்புத் திரையில் முதலில் காட்டுவோம்", "Farm equipment": "விவசாயக் கருவிகள்", "Farm workers": "விவசாயத் தொழிலாளர்கள்", "Crop storage": "பயிர் சேமிப்பு", "Government schemes": "அரசுத் திட்டங்கள்", "Book Tractor": "டிராக்டரை முன்பதிவு செய்க", "Find Labor": "தொழிலாளர்களைக் கண்டறியவும்", "Find Storage": "சேமிப்பைக் கண்டறியவும்", "PM-KISAN": "பிஎம்-கிசான்", "Pradhan Mantri Fasal Bima Yojana": "பிரதம மந்திரி பயிர் காப்பீட்டுத் திட்டம்", "Kisan Credit Card": "கிசான் கடன் அட்டை", "Per Drop More Crop": "ஒவ்வொரு துளிக்கும் அதிக பயிர்"
  },
  gu: { "I am a...": "હું છું...", Farmer: "ખેડૂત", "I grow crops": "હું પાક ઉગાડું છું", "Tool Lender": "સાધન ભાડે આપનાર", "I rent equipment": "હું સાધનો ભાડે આપું છું", "Job Seeker": "કામ શોધનાર", "I need farm work": "મારે ખેતીનું કામ જોઈએ છે", "Storage Owner": "સંગ્રહ માલિક", "I have storage space": "મારી પાસે સંગ્રહની જગ્યા છે", "What do you grow?": "તમે શું ઉગાડો છો?", "Choose all crops on your farm": "તમારા ખેતરના પાક પસંદ કરો", Wheat: "ઘઉં", Rice: "ચોખા", Vegetables: "શાકભાજી", "Other crops": "અન્ય પાક", "How large is your farm?": "તમારું ખેતર કેટલું મોટું છે?", "A rough estimate is enough": "અંદાજ પૂરતો છે", "Less than 2 acres": "2 એકરથી ઓછું", "2–5 acres": "2–5 એકર", "5–10 acres": "5–10 એકર", "More than 10 acres": "10 એકરથી વધુ", "What help do you need most?": "તમને કઈ મદદની સૌથી વધુ જરૂર છે?", "We will put this first on your home screen": "આ તમારા હોમ સ્ક્રીન પર પ્રથમ દેખાશે", "Farm equipment": "ખેતીનાં સાધનો", "Farm workers": "ખેત મજૂરો", "Crop storage": "પાક સંગ્રહ", "Government schemes": "સરકારી યોજનાઓ", "Book Tractor": "ટ્રેક્ટર બુક કરો", "Find Labor": "મજૂર શોધો", "Find Storage": "સંગ્રહ શોધો", "PM-KISAN": "પીએમ-કિસાન", "Pradhan Mantri Fasal Bima Yojana": "પ્રધાનમંત્રી ફસલ વીમા યોજના", "Kisan Credit Card": "કિસાન ક્રેડિટ કાર્ડ", "Per Drop More Crop": "દર ટીપે વધુ પાક" },
  kn: { "I am a...": "ನಾನು...", Farmer: "ರೈತ", "I grow crops": "ನಾನು ಬೆಳೆ ಬೆಳೆಯುತ್ತೇನೆ", "Tool Lender": "ಉಪಕರಣ ಬಾಡಿಗೆದಾರ", "I rent equipment": "ನಾನು ಉಪಕರಣಗಳನ್ನು ಬಾಡಿಗೆಗೆ ನೀಡುತ್ತೇನೆ", "Job Seeker": "ಕೆಲಸ ಹುಡುಕುವವರು", "I need farm work": "ನನಗೆ ಕೃಷಿ ಕೆಲಸ ಬೇಕು", "Storage Owner": "ಸಂಗ್ರಹ ಮಾಲೀಕ", "I have storage space": "ನನ್ನ ಬಳಿ ಸಂಗ್ರಹ ಸ್ಥಳವಿದೆ", "What do you grow?": "ನೀವು ಏನು ಬೆಳೆಯುತ್ತೀರಿ?", "Choose all crops on your farm": "ನಿಮ್ಮ ಹೊಲದ ಬೆಳೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ", Wheat: "ಗೋಧಿ", Rice: "ಅಕ್ಕಿ", Vegetables: "ತರಕಾರಿಗಳು", "Other crops": "ಇತರ ಬೆಳೆಗಳು", "How large is your farm?": "ನಿಮ್ಮ ಹೊಲ ಎಷ್ಟು ದೊಡ್ಡದು?", "A rough estimate is enough": "ಅಂದಾಜು ಸಾಕು", "Less than 2 acres": "2 ಎಕರೆಗಿಂತ ಕಡಿಮೆ", "2–5 acres": "2–5 ಎಕರೆ", "5–10 acres": "5–10 ಎಕರೆ", "More than 10 acres": "10 ಎಕರೆಗಿಂತ ಹೆಚ್ಚು", "What help do you need most?": "ನಿಮಗೆ ಯಾವ ಸಹಾಯ ಹೆಚ್ಚು ಬೇಕು?", "We will put this first on your home screen": "ಇದನ್ನು ನಿಮ್ಮ ಹೋಮ್ ಸ್ಕ್ರೀನ್‌ನಲ್ಲಿ ಮೊದಲು ತೋರಿಸುತ್ತೇವೆ", "Farm equipment": "ಕೃಷಿ ಉಪಕರಣಗಳು", "Farm workers": "ಕೃಷಿ ಕಾರ್ಮಿಕರು", "Crop storage": "ಬೆಳೆ ಸಂಗ್ರಹಣೆ", "Government schemes": "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು", "Book Tractor": "ಟ್ರ್ಯಾಕ್ಟರ್ ಬುಕ್ ಮಾಡಿ", "Find Labor": "ಕಾರ್ಮಿಕರನ್ನು ಹುಡುಕಿ", "Find Storage": "ಸಂಗ್ರಹ ಹುಡುಕಿ", "PM-KISAN": "ಪಿಎಂ-ಕಿಸಾನ್", "Pradhan Mantri Fasal Bima Yojana": "ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ", "Kisan Credit Card": "ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್", "Per Drop More Crop": "ಪ್ರತಿ ಹನಿಗೆ ಹೆಚ್ಚು ಬೆಳೆ" },
  ml: { "I am a...": "ഞാൻ...", Farmer: "കർഷകൻ", "I grow crops": "ഞാൻ വിളകൾ കൃഷി ചെയ്യുന്നു", "Tool Lender": "ഉപകരണങ്ങൾ വാടകയ്ക്ക് നൽകുന്നവർ", "I rent equipment": "ഞാൻ ഉപകരണങ്ങൾ വാടകയ്ക്ക് നൽകുന്നു", "Job Seeker": "ജോലി അന്വേഷിക്കുന്നവർ", "I need farm work": "എനിക്ക് കൃഷിപ്പണി വേണം", "Storage Owner": "സംഭരണ ഉടമ", "I have storage space": "എന്റെ കൈവശം സംഭരണ സ്ഥലമുണ്ട്", "What do you grow?": "നിങ്ങൾ എന്താണ് കൃഷി ചെയ്യുന്നത്?", "Choose all crops on your farm": "നിങ്ങളുടെ കൃഷിയിടത്തിലെ വിളകൾ തിരഞ്ഞെടുക്കുക", Wheat: "ഗോതമ്പ്", Rice: "നെല്ല്", Vegetables: "പച്ചക്കറികൾ", "Other crops": "മറ്റ് വിളകൾ", "How large is your farm?": "നിങ്ങളുടെ കൃഷിയിടം എത്ര വലുതാണ്?", "A rough estimate is enough": "ഏകദേശ കണക്ക് മതിയാകും", "Less than 2 acres": "2 ഏക്കറിൽ കുറവ്", "2–5 acres": "2–5 ഏക്കർ", "5–10 acres": "5–10 ഏക്കർ", "More than 10 acres": "10 ഏക്കറിൽ കൂടുതൽ", "What help do you need most?": "നിങ്ങൾക്ക് ഏറ്റവും ആവശ്യമുള്ള സഹായം ഏതാണ്?", "We will put this first on your home screen": "ഇത് നിങ്ങളുടെ ഹോം സ്ക്രീനിൽ ആദ്യം കാണിക്കും", "Farm equipment": "കാർഷിക ഉപകരണങ്ങൾ", "Farm workers": "കാർഷിക തൊഴിലാളികൾ", "Crop storage": "വിള സംഭരണം", "Government schemes": "സർക്കാർ പദ്ധതികൾ", "Book Tractor": "ട്രാക്ടർ ബുക്ക് ചെയ്യുക", "Find Labor": "തൊഴിലാളികളെ കണ്ടെത്തുക", "Find Storage": "സംഭരണം കണ്ടെത്തുക", "PM-KISAN": "പിഎം-കിസാൻ", "Pradhan Mantri Fasal Bima Yojana": "പ്രധാനമന്ത്രി വിള ഇൻഷുറൻസ് പദ്ധതി", "Kisan Credit Card": "കിസാൻ ക്രെഡിറ്റ് കാർഡ്", "Per Drop More Crop": "ഓരോ തുള്ളിക്കും കൂടുതൽ വിള" },
  pa: { "I am a...": "ਮੈਂ ਹਾਂ...", Farmer: "ਕਿਸਾਨ", "I grow crops": "ਮੈਂ ਫਸਲਾਂ ਉਗਾਉਂਦਾ ਹਾਂ", "Tool Lender": "ਸੰਦ ਕਿਰਾਏ ਤੇ ਦੇਣ ਵਾਲਾ", "I rent equipment": "ਮੈਂ ਸੰਦ ਕਿਰਾਏ ਤੇ ਦਿੰਦਾ ਹਾਂ", "Job Seeker": "ਕੰਮ ਲੱਭਣ ਵਾਲਾ", "I need farm work": "ਮੈਨੂੰ ਖੇਤੀ ਦਾ ਕੰਮ ਚਾਹੀਦਾ ਹੈ", "Storage Owner": "ਸਟੋਰੇਜ ਮਾਲਕ", "I have storage space": "ਮੇਰੇ ਕੋਲ ਸਟੋਰੇਜ ਦੀ ਜਗ੍ਹਾ ਹੈ", "What do you grow?": "ਤੁਸੀਂ ਕੀ ਉਗਾਉਂਦੇ ਹੋ?", "Choose all crops on your farm": "ਆਪਣੇ ਖੇਤ ਦੀਆਂ ਫਸਲਾਂ ਚੁਣੋ", Wheat: "ਕਣਕ", Rice: "ਚੌਲ", Vegetables: "ਸਬਜ਼ੀਆਂ", "Other crops": "ਹੋਰ ਫਸਲਾਂ", "How large is your farm?": "ਤੁਹਾਡਾ ਖੇਤ ਕਿੰਨਾ ਵੱਡਾ ਹੈ?", "A rough estimate is enough": "ਲਗਭਗ ਅੰਦਾਜ਼ਾ ਕਾਫ਼ੀ ਹੈ", "Less than 2 acres": "2 ਏਕੜ ਤੋਂ ਘੱਟ", "2–5 acres": "2–5 ਏਕੜ", "5–10 acres": "5–10 ਏਕੜ", "More than 10 acres": "10 ਏਕੜ ਤੋਂ ਵੱਧ", "What help do you need most?": "ਤੁਹਾਨੂੰ ਸਭ ਤੋਂ ਵੱਧ ਕਿਹੜੀ ਮਦਦ ਚਾਹੀਦੀ ਹੈ?", "We will put this first on your home screen": "ਇਹ ਤੁਹਾਡੀ ਹੋਮ ਸਕ੍ਰੀਨ ਤੇ ਪਹਿਲਾਂ ਦਿਖੇਗਾ", "Farm equipment": "ਖੇਤੀ ਦੇ ਸੰਦ", "Farm workers": "ਖੇਤ ਮਜ਼ਦੂਰ", "Crop storage": "ਫਸਲ ਸਟੋਰੇਜ", "Government schemes": "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ", "Book Tractor": "ਟਰੈਕਟਰ ਬੁੱਕ ਕਰੋ", "Find Labor": "ਮਜ਼ਦੂਰ ਲੱਭੋ", "Find Storage": "ਸਟੋਰੇਜ ਲੱਭੋ", "PM-KISAN": "ਪੀਐਮ-ਕਿਸਾਨ", "Pradhan Mantri Fasal Bima Yojana": "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਫਸਲ ਬੀਮਾ ਯੋਜਨਾ", "Kisan Credit Card": "ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਕਾਰਡ", "Per Drop More Crop": "ਹਰ ਬੂੰਦ ਤੋਂ ਵੱਧ ਫਸਲ" },
  or: { "I am a...": "ମୁଁ...", Farmer: "ଚାଷୀ", "I grow crops": "ମୁଁ ଫସଲ ଚାଷ କରେ", "Tool Lender": "ଉପକରଣ ଭଡ଼ାଦାତା", "I rent equipment": "ମୁଁ ଉପକରଣ ଭଡ଼ା ଦିଏ", "Job Seeker": "କାମ ଖୋଜୁଥିବା ବ୍ୟକ୍ତି", "I need farm work": "ମୋତେ ଚାଷ କାମ ଦରକାର", "Storage Owner": "ସଂରକ୍ଷଣ ମାଲିକ", "I have storage space": "ମୋ ପାଖରେ ସଂରକ୍ଷଣ ସ୍ଥାନ ଅଛି", "What do you grow?": "ଆପଣ କଣ ଚାଷ କରନ୍ତି?", "Choose all crops on your farm": "ଆପଣଙ୍କ ଜମିର ଫସଲ ବାଛନ୍ତୁ", Wheat: "ଗହମ", Rice: "ଧାନ", Vegetables: "ପନିପରିବା", "Other crops": "ଅନ୍ୟ ଫସଲ", "How large is your farm?": "ଆପଣଙ୍କ ଜମି କେତେ ବଡ଼?", "A rough estimate is enough": "ଆନୁମାନିକ ହିସାବ ଯଥେଷ୍ଟ", "Less than 2 acres": "2 ଏକରରୁ କମ୍", "2–5 acres": "2–5 ଏକର", "5–10 acres": "5–10 ଏକର", "More than 10 acres": "10 ଏକରରୁ ଅଧିକ", "What help do you need most?": "ଆପଣଙ୍କୁ କେଉଁ ସାହାଯ୍ୟ ଅଧିକ ଦରକାର?", "We will put this first on your home screen": "ଏହା ଆପଣଙ୍କ ହୋମ ସ୍କ୍ରିନରେ ପ୍ରଥମେ ଦେଖାଯିବ", "Farm equipment": "କୃଷି ଉପକରଣ", "Farm workers": "କୃଷି ଶ୍ରମିକ", "Crop storage": "ଫସଲ ସଂରକ୍ଷଣ", "Government schemes": "ସରକାରୀ ଯୋଜନା", "Book Tractor": "ଟ୍ରାକ୍ଟର ବୁକ୍ କରନ୍ତୁ", "Find Labor": "ଶ୍ରମିକ ଖୋଜନ୍ତୁ", "Find Storage": "ସଂରକ୍ଷଣ ଖୋଜନ୍ତୁ", "PM-KISAN": "ପିଏମ୍-କିସାନ", "Pradhan Mantri Fasal Bima Yojana": "ପ୍ରଧାନମନ୍ତ୍ରୀ ଫସଲ ବୀମା ଯୋଜନା", "Kisan Credit Card": "କିସାନ କ୍ରେଡିଟ୍ କାର୍ଡ", "Per Drop More Crop": "ପ୍ରତି ବୁନ୍ଦାରେ ଅଧିକ ଫସଲ" },
  as: { "I am a...": "মই...", Farmer: "কৃষক", "I grow crops": "মই শস্য খেতি কৰোঁ", "Tool Lender": "সঁজুলি ভাড়াদাতা", "I rent equipment": "মই সঁজুলি ভাড়াত দিওঁ", "Job Seeker": "কাম বিচৰা ব্যক্তি", "I need farm work": "মোক কৃষিৰ কাম লাগে", "Storage Owner": "সংৰক্ষণৰ মালিক", "I have storage space": "মোৰ সংৰক্ষণৰ ঠাই আছে", "What do you grow?": "আপুনি কি খেতি কৰে?", "Choose all crops on your farm": "আপোনাৰ খেতিৰ শস্য বাছক", Wheat: "ঘেঁহু", Rice: "ধান", Vegetables: "শাক-পাচলি", "Other crops": "অন্যান্য শস্য", "How large is your farm?": "আপোনাৰ খেতি কিমান ডাঙৰ?", "A rough estimate is enough": "আনুমানিক হিচাপেই যথেষ্ট", "Less than 2 acres": "২ একৰৰ কম", "2–5 acres": "২–৫ একৰ", "5–10 acres": "৫–১০ একৰ", "More than 10 acres": "১০ একৰতকৈ অধিক", "What help do you need most?": "আপোনাক কোনটো সহায় আটাইতকৈ বেছি লাগে?", "We will put this first on your home screen": "এইটো আপোনাৰ হোম স্ক্ৰীণত প্ৰথমে দেখুওৱা হ'ব", "Farm equipment": "কৃষি সঁজুলি", "Farm workers": "কৃষি শ্ৰমিক", "Crop storage": "শস্য সংৰক্ষণ", "Government schemes": "চৰকাৰী আঁচনি", "Book Tractor": "ট্ৰেক্টৰ বুক কৰক", "Find Labor": "শ্ৰমিক বিচাৰক", "Find Storage": "সংৰক্ষণ বিচাৰক", "PM-KISAN": "পিএম-কিষাণ", "Pradhan Mantri Fasal Bima Yojana": "প্ৰধানমন্ত্ৰী ফচল বীমা যোজনা", "Kisan Credit Card": "কিষাণ ক্ৰেডিট কাৰ্ড", "Per Drop More Crop": "প্ৰতি টোপালত অধিক শস্য" },
};

function content(language: LanguageCode, value: string) {
  return contentTranslations[language][value] || value;
}

function LanguageSelect({ language, onChange }: { language: LanguageCode; onChange: (language: LanguageCode) => void }) {
  return <label className="language-select"><span className="language-symbol">अ</span><span className="visually-hidden">{text(language, "selectLanguage")}</span><select aria-label={text(language, "selectLanguage")} value={language} onChange={event => onChange(event.target.value as LanguageCode)}>{languageOptions.map(option => <option value={option.code} key={option.code}>{option.nativeLabel} / {option.label}</option>)}</select><Icon name="chevron" size={16} /></label>;
}

const photos = {
  farmer: "https://images.unsplash.com/photo-1627475320102-d73fcb4eb427?auto=format&fit=crop&w=500&q=85",
  tractor: "https://images.unsplash.com/photo-1564868480822-32f714a0e763?auto=format&fit=crop&w=800&q=85",
  redTractor: "https://images.unsplash.com/photo-1606739211185-2c846d734a6d?auto=format&fit=crop&w=800&q=85",
  workers: "https://images.unsplash.com/photo-1760973177205-2d27e31f9afa?auto=format&fit=crop&w=800&q=85",
};

function SpeakButton({ label, hidden = false }: { label: string; hidden?: boolean }) {
  if (hidden) return null;
  return <button aria-label={`Listen to ${label}`} className="icon-button"><Icon name="speaker" size={20} /></button>;
}

function SectionTitle({ children, action, onAction }: { children: ReactNode; action?: string; onAction?: () => void }) {
  return <div className="section-title"><h2>{children}</h2>{action && <button onClick={onAction}>{action} <Icon name="chevron" size={18} /></button>}</div>;
}

type OnboardingProfile = {
  role: UserRole;
  answers: Record<number, string[]>;
  account?: SignupForm;
};

type SignupForm = {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
};

function Dashboard({ notify, go, profile, language }: { notify: (message: string) => void; go: (page: string) => void; profile: OnboardingProfile; language: LanguageCode }) {
  const quick = [
    { label: "Book Tractor", icon: "tractor" as IconName, color: "green", page: "market" },
    { label: "Find Labor", icon: "users" as IconName, color: "gold", page: "jobs" },
    { label: "Find Storage", icon: "warehouse" as IconName, color: "blue", page: "market" },
    ...(profile.role === "Farmer" ? [{ label: "Government schemes", icon: "shield" as IconName, color: "purple", page: "schemes" }] : []),
  ];
  return <main className="page-content">
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">GOOD MORNING</div>
        <h1>Namaste, Ramesh!</h1>
        <p>Your wheat farm is looking healthy today.</p>
      </div>
      <img src={photos.farmer} alt="Farmer standing in a green field" />
    </section>

    <section className="weather-card">
      <div className="weather-main"><div className="sun-icon"><Icon name="sun" size={34} /></div><div><strong>29°</strong><span>Sunny</span></div></div>
      <div className="weather-place"><Icon name="map" size={18} /><span>Nashik, Maharashtra<br /><b>Good day for sowing</b></span></div>
      <SpeakButton label="today's weather" />
    </section>

    <SectionTitle>{text(language, "whatNeed")}</SectionTitle>
    <div className="quick-grid">
      {quick.map(item => <button className={`quick-card ${item.color}`} key={item.label} onClick={() => go(item.page)}>
        <span className="quick-icon"><Icon name={item.icon} size={35} /></span>
        <strong>{content(language, item.label)}</strong><Icon name="chevron" size={20} />
      </button>)}
    </div>

    <SectionTitle action="View all" onAction={() => go("requests")}>Active requests</SectionTitle>
    <section className="request-card">
      <div className="request-top">
        <span className="request-image"><Icon name="tractor" size={30} /></span>
        <div><span className="status pending">Awaiting response</span><h3>Mahindra 575 Tractor</h3><p><Icon name="calendar" size={16} /> Tomorrow, 8:00 AM</p></div>
        <SpeakButton label="tractor request" />
      </div>
      <div className="progress"><i /><i /><i /><i /></div>
      <div className="progress-labels"><b>Requested</b><span>Accepted</span><span>On the way</span><span>Done</span></div>
    </section>

    <SectionTitle action="Open forum" onAction={() => notify("The village forum will be available soon")}>Village voices</SectionTitle>
    <section className="voice-card">
      <img src={photos.workers} alt="Farmers working together in a rice field" />
      <div><span className="status live">Community tip</span><h3>Best time to water wheat?</h3><p>Shared by Sunita • 2 km away</p>
        <button className="play-button" onClick={() => notify("Playing Sunita's voice message")}><span>▶</span><span className="wave">▮▮▮▮▮▮</span><b>0:38</b></button>
      </div>
    </section>
  </main>;
}

const governmentSchemes = [
  { name: "PM-KISAN", summary: "Income support for eligible landholding farmer families.", icon: "leaf" as IconName, match: () => true, questions: ["Do you have land records in your name?", "Is your family income within the scheme limits?"] },
  { name: "Pradhan Mantri Fasal Bima Yojana", summary: "Crop insurance support for seasonal crop losses.", icon: "shield" as IconName, match: (answers: string[]) => answers.some(answer => ["Wheat", "Rice", "Vegetables"].includes(answer)), questions: ["Do you want to insure your current crop?", "Do you have a crop loan or bank account?"] },
  { name: "Kisan Credit Card", summary: "Flexible credit for crop inputs and farm expenses.", icon: "briefcase" as IconName, match: (answers: string[]) => answers.some(answer => answer.includes("acres") || answer === "Farm equipment"), questions: ["Do you have an active bank account?", "Do you need credit for seeds, tools, or inputs?"] },
  { name: "Per Drop More Crop", summary: "Support for efficient irrigation and water-saving systems.", icon: "cloud" as IconName, match: (answers: string[]) => answers.includes("Vegetables") || answers.includes("Crop storage"), questions: ["Do you have access to a water source?", "Would drip or sprinkler irrigation help your farm?"] },
];

function GovernmentSchemes({ profile, notify, language }: { profile: OnboardingProfile; notify: (message: string) => void; language: LanguageCode }) {
  const [activeScheme, setActiveScheme] = useState<typeof governmentSchemes[number] | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const profileAnswers = Object.values(profile.answers).flat();
  const suggestions = governmentSchemes.filter(scheme => scheme.match(profileAnswers));
  const answerScheme = (question: string, value: string) => setAnswers(current => ({ ...current, [question]: value }));
  const submitApplication = () => {
    if (!activeScheme || activeScheme.questions.some(question => !answers[question])) return;
    notify(`Your ${activeScheme.name} eligibility answers are saved`);
    setActiveScheme(null);
  };

  return <main className="page-content">
    <div className="page-heading"><div><span className="eyebrow">{text(language, "welcome")}</span><h1>{text(language, "schemes")}</h1><p>{text(language, "schemesHint")}</p></div><SpeakButton label={text(language, "schemes")} /></div>
    <section className="scheme-intro"><Icon name="shield" size={30} /><div><strong>Personalised for you</strong><span>We used your onboarding answers to find these starting points.</span></div></section>
    <div className="scheme-list">{suggestions.map(scheme => <article className="scheme-card" key={scheme.name}>
      <span className="scheme-icon"><Icon name={scheme.icon} size={28} /></span><div><h3>{content(language, scheme.name)}</h3><p>{scheme.summary}</p><button className="scheme-apply" onClick={() => setActiveScheme(scheme)}>{text(language, "apply")} <Icon name="chevron" size={17} /></button></div>
    </article>)}</div>
    {activeScheme && <div className="scheme-question-panel"><button className="scheme-close" aria-label="Close eligibility questions" onClick={() => setActiveScheme(null)}><Icon name="close" /></button><span className="eyebrow">CHECK ELIGIBILITY</span><h2>{activeScheme.name}</h2><p>Answer these questions to prepare your application.</p>{activeScheme.questions.map(question => <fieldset key={question}><legend>{question}</legend><div className="eligibility-options"><button className={answers[question] === "Yes" ? "selected" : ""} onClick={() => answerScheme(question, "Yes")}>Yes</button><button className={answers[question] === "No" ? "selected" : ""} onClick={() => answerScheme(question, "No")}>No</button></div></fieldset>)}<button className="primary-action" disabled={activeScheme.questions.some(question => !answers[question])} onClick={submitApplication}>Save answers <Icon name="check" /></button></div>}
  </main>;
}

function Marketplace({ notify }: { notify: (message: string) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All tools");
  const items = [
    { name: "Mahindra 575 DI", type: "Tractor • 45 HP", price: "₹1,800", distance: "2.4 km", image: photos.tractor, available: true },
    { name: "Swaraj 744 FE", type: "Tractor • 48 HP", price: "₹2,100", distance: "4.1 km", image: photos.redTractor, available: true },
    { name: "Rotary Power Tiller", type: "Tiller • 9 HP", price: "₹850", distance: "1.8 km", image: photos.tractor, available: false },
  ];
  const filteredItems = items.filter(item => {
    const matchesQuery = `${item.name} ${item.type}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All tools" || item.type.toLowerCase().startsWith(category.slice(0, -1).toLowerCase());
    return matchesQuery && matchesCategory;
  });
  return <main className="page-content">
    <div className="page-heading"><div><span className="eyebrow">NEAR YOUR FARM</span><h1>Book equipment</h1><p>Trusted tools, ready when you need them.</p></div><SpeakButton label="equipment marketplace" /></div>
    <label className="search-box"><Icon name="search" /><input aria-label="Search equipment" placeholder="Search tractor, tiller..." value={query} onChange={event => setQuery(event.target.value)} /><button type="button" onClick={() => { setQuery(""); setCategory("All tools") }}>Clear</button></label>
    <div className="filter-row">{["All tools", "Tractors", "Tillers", "Harvesters"].map(filter => <button className={category === filter ? "active" : ""} key={filter} onClick={() => setCategory(filter)}>{filter}</button>)}</div>
    <div className="catalog-grid">
      {filteredItems.map(item => <article className="equipment-card" key={item.name}>
        <div className="equipment-photo"><img src={item.image} alt={item.name} /><span className={`availability ${item.available ? "" : "busy"}`}>{item.available ? "Available now" : "In use today"}</span></div>
        <div className="equipment-content">
          <div className="equipment-title"><div><h3>{item.name}</h3><p>{item.type}</p></div><SpeakButton label={item.name} /></div>
          <div className="meta-line"><span><Icon name="map" size={17} /> {item.distance}</span><span className="rating">★ 4.8</span></div>
          <div className="price-line"><div><strong>{item.price}</strong><span>/ day</span></div><span>Fuel included</span></div>
          <div className="action-row"><button className="call-btn" onClick={() => notify(`Calling owner of ${item.name}`)}><Icon name="phone" /> Call</button><button disabled={!item.available} className="book-btn" onClick={() => notify(`${item.name} added to your booking`)}><Icon name="calendar" /> {item.available ? "Book now" : "View dates"}</button></div>
        </div>
      </article>)}
    </div>
    {filteredItems.length === 0 && <p className="empty-state">No equipment matches your search.</p>}
  </main>;
}

function Jobs({ notify }: { notify: (message: string) => void }) {
  const jobs = [
    { title: "Onion harvesting", farm: "Patil Family Farm", wage: "₹650", distance: "1.2 km", date: "Tomorrow", tags: ["Harvesting", "6 workers"] },
    { title: "Drip line setup", farm: "Green Valley Fields", wage: "₹800", distance: "3.5 km", date: "18 Jun", tags: ["Irrigation", "2 workers"] },
    { title: "Wheat bag loading", farm: "Shinde Farm", wage: "₹700", distance: "5.0 km", date: "20 Jun", tags: ["Loading", "4 workers"] },
  ];
  return <main className="page-content">
    <div className="page-heading"><div><span className="eyebrow">WORK NEAR YOU</span><h1>Farm jobs</h1><p>Fair wages. Verified farmers. Paid daily.</p></div><SpeakButton label="nearby farm jobs" /></div>
    <div className="job-map"><div><Icon name="map" size={32} /><strong>12 jobs within 5 km</strong><span>Near Nashik Road</span></div><button onClick={() => notify("Area selection will be connected to your location")}>Change area</button></div>
    <div className="jobs-list">
      {jobs.map((job, index) => <article className="job-card" key={job.title}>
        <div className={`job-symbol job-${index}`}><Icon name={index === 1 ? "tool" : index === 2 ? "box" : "leaf"} size={32} /></div>
        <div className="job-info"><div className="job-top"><span className="status live">{index === 0 ? "Starts tomorrow" : "Open"}</span><SpeakButton label={job.title} /></div><h3>{job.title}</h3><p className="farm-name">{job.farm}</p>
          <div className="job-meta"><span><Icon name="map" size={17} /> {job.distance}</span><span><Icon name="calendar" size={17} /> {job.date}</span></div>
          <div className="tags">{job.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <div className="job-footer"><div><span>Daily wage</span><strong>{job.wage}<small>/day</small></strong></div><button onClick={() => notify(`Calling ${job.farm}`)}><Icon name="phone" /> Call now</button></div>
        </div>
      </article>)}
    </div>
  </main>;
}

function Requests({ notify }: { notify: (message: string) => void }) {
  const [decisions, setDecisions] = useState<Record<string, string>>({});
  const decide = (name: string, value: string) => { setDecisions(current => ({ ...current, [name]: value })); notify(`${name}'s request ${value}`); };
  return <main className="page-content">
    <div className="page-heading"><div><span className="eyebrow">OWNER DASHBOARD</span><h1>Requests & inventory</h1><p>Manage your equipment and storage.</p></div><SpeakButton label="owner dashboard" /></div>
    <div className="inventory-summary">
      <div><span className="dot available-dot" /><strong>6</strong><small>Available</small></div>
      <div><span className="dot use-dot" /><strong>3</strong><small>In use</small></div>
      <div><span className="dot maintenance-dot" /><strong>1</strong><small>Maintenance</small></div>
    </div>
    <SectionTitle action="Manage inventory">New booking requests</SectionTitle>
    {["Ramesh Patil", "Vijay More"].map((name, index) => <article className="owner-request" key={name}>
      <div className="owner-head"><div className="avatar">{name.split(" ").map(n => n[0]).join("")}</div><div><span className="status pending">New request</span><h3>{name}</h3><p><Icon name="map" size={16} /> {index ? "4.3 km away" : "2.4 km away"}</p></div><SpeakButton label={`${name}'s booking request`} /></div>
      <div className="booking-detail"><span className="booking-icon"><Icon name={index ? "warehouse" : "tractor"} size={29} /></span><div><strong>{index ? "Cold storage • 20 crates" : "Mahindra 575 DI"}</strong><span>{index ? "20–25 June" : "Tomorrow • 8:00 AM – 5:00 PM"}</span></div><b>{index ? "₹1,250" : "₹1,800"}</b></div>
      {decisions[name] ? <div className={`decision ${decisions[name]}`}><Icon name={decisions[name] === "accepted" ? "check" : "close"} /> Request {decisions[name]}</div> :
      <div className="decision-actions"><button className="decline" onClick={() => decide(name, "declined")}><Icon name="close" /> Decline</button><button className="accept" onClick={() => decide(name, "accepted")}><Icon name="check" /> Accept</button></div>}
    </article>)}
  </main>;
}

function Profile({ profile, notify, onLogout, language }: { profile: OnboardingProfile; notify: (message: string) => void; onLogout: () => void; language: LanguageCode }) {
  const account = profile.account || { firstName: "Ramesh", lastName: "Patil", addressLine1: "Nashik Road", addressLine2: "", city: "Nashik", state: "Maharashtra", pincode: "422001", phone: "9876543210" };
  const [editing, setEditing] = useState(false);
  const [details, setDetails] = useState(account);
  const updateDetails = (field: keyof SignupForm, value: string) => setDetails(current => ({ ...current, [field]: value }));
  return <main className="auth-page">
    <section className="auth-intro"><div className="brand-mark large"><Icon name="leaf" size={34} /></div><span className="eyebrow">WELCOME TO</span><h1>Kisan Saathi</h1><p>Your trusted farming companion</p>
      <button className="voice-intro" onClick={() => notify("Playing a voice introduction")}><span><Icon name="speaker" /></span><div><strong>Listen to introduction</strong><small>Tap to hear in your language</small></div><span className="play-circle">▶</span></button>
    </section>
    <section className="role-panel profile-details"><div className="role-heading"><div><h2>My details</h2><p>Your account information and registered role.</p></div><button className="edit-details" onClick={() => { setEditing(value => !value); if (editing) notify("Profile details saved") }}>{editing ? "Save" : "Edit"}</button></div>
      <div className="profile-role"><span className="profile-detail-label">User type</span><strong>{content(language, profile.role)}</strong></div>
      <div className="signup-fields">
        {([ ["firstName", "First name"], ["lastName", "Last name"], ["addressLine1", "Address line 1"], ["addressLine2", "Address line 2"], ["city", "City / district"], ["state", "State"], ["pincode", "Pincode"], ["phone", "Phone number"] ] as [keyof SignupForm, string][]).map(([field, label]) => <label key={field}>{label}<input readOnly={!editing} inputMode={field === "pincode" || field === "phone" ? "numeric" : undefined} value={details[field]} onChange={event => updateDetails(field, field === "pincode" || field === "phone" ? event.target.value.replace(/\D/g, "") : event.target.value)} /></label>)}
      </div>
      <button className="logout-button" onClick={onLogout}><Icon name="close" size={18} /> {text(language, "logout")}</button>
    </section>
  </main>;
}

type UserRole = "Farmer" | "Tool Lender" | "Job Seeker" | "Storage Owner";

const roleQuestions: Record<UserRole, { title: string; help: string; options: { label: string; icon: IconName }[] }[]> = {
  Farmer: [
    { title: "What do you grow?", help: "Choose all crops on your farm", options: [{ label: "Wheat", icon: "leaf" }, { label: "Rice", icon: "leaf" }, { label: "Vegetables", icon: "box" }, { label: "Other crops", icon: "sun" }] },
    { title: "How large is your farm?", help: "A rough estimate is enough", options: [{ label: "Less than 2 acres", icon: "map" }, { label: "2–5 acres", icon: "map" }, { label: "5–10 acres", icon: "map" }, { label: "More than 10 acres", icon: "map" }] },
    { title: "What help do you need most?", help: "We will put this first on your home screen", options: [{ label: "Farm equipment", icon: "tractor" }, { label: "Farm workers", icon: "users" }, { label: "Crop storage", icon: "warehouse" }, { label: "Government schemes", icon: "shield" }] },
  ],
  "Tool Lender": [
    { title: "What equipment do you rent?", help: "Choose all that you own", options: [{ label: "Tractors", icon: "tractor" }, { label: "Tillers", icon: "tool" }, { label: "Harvesters", icon: "leaf" }, { label: "Other tools", icon: "box" }] },
    { title: "How many machines do you manage?", help: "This helps us set up your inventory", options: [{ label: "1 machine", icon: "tractor" }, { label: "2–5 machines", icon: "tractor" }, { label: "6–10 machines", icon: "tractor" }, { label: "More than 10", icon: "tractor" }] },
    { title: "How far can you deliver?", help: "Choose your usual service area", options: [{ label: "Within 5 km", icon: "map" }, { label: "Within 10 km", icon: "map" }, { label: "Within 25 km", icon: "map" }, { label: "Any distance", icon: "map" }] },
  ],
  "Job Seeker": [
    { title: "What work can you do?", help: "Choose all your skills", options: [{ label: "Planting", icon: "leaf" }, { label: "Harvesting", icon: "tool" }, { label: "Irrigation", icon: "sun" }, { label: "Loading", icon: "box" }] },
    { title: "How far can you travel?", help: "We will only show suitable jobs", options: [{ label: "Within 2 km", icon: "map" }, { label: "Within 5 km", icon: "map" }, { label: "Within 10 km", icon: "map" }, { label: "Any distance", icon: "map" }] },
    { title: "When are you available?", help: "You can change this at any time", options: [{ label: "Available now", icon: "check" }, { label: "Weekdays", icon: "calendar" }, { label: "Weekends", icon: "calendar" }, { label: "Seasonal work", icon: "sun" }] },
  ],
  "Storage Owner": [
    { title: "What storage do you offer?", help: "Choose all available facilities", options: [{ label: "Dry warehouse", icon: "warehouse" }, { label: "Cold storage", icon: "cloud" }, { label: "Grain silos", icon: "box" }, { label: "Open yard", icon: "sun" }] },
    { title: "What is your total capacity?", help: "A rough estimate is enough", options: [{ label: "Under 50 crates", icon: "box" }, { label: "50–200 crates", icon: "box" }, { label: "200–500 crates", icon: "box" }, { label: "Over 500 crates", icon: "box" }] },
    { title: "What can farmers store?", help: "Choose all that apply", options: [{ label: "Grains", icon: "leaf" }, { label: "Vegetables", icon: "box" }, { label: "Fruit", icon: "sun" }, { label: "Farm supplies", icon: "tool" }] },
  ],
};

function Onboarding({ onComplete, language, onLanguageChange }: { onComplete: (message: string, profile: OnboardingProfile) => void; language: LanguageCode; onLanguageChange: (language: LanguageCode) => void }) {
  const [step, setStep] = useState<"login" | "signupOtp" | "otp" | "questions">("login");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [signupComplete, setSignupComplete] = useState(false);
  const [role, setRole] = useState<UserRole>("Farmer");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [signup, setSignup] = useState<SignupForm>({ firstName: "", lastName: "", addressLine1: "", addressLine2: "", city: "", state: "", pincode: "", phone: "" });
  const roles: { label: UserRole; help: string; icon: IconName }[] = [
    { label: "Farmer", help: "I grow crops", icon: "leaf" },
    { label: "Tool Lender", help: "I rent equipment", icon: "tractor" },
    { label: "Job Seeker", help: "I need farm work", icon: "users" },
    { label: "Storage Owner", help: "I have storage space", icon: "warehouse" },
  ];
  const questions = roleQuestions[role];
  const current = questions[question];
  const toggleAnswer = (answer: string) => setAnswers(existing => {
    const selected = existing[question] || [];
    return { ...existing, [question]: selected.includes(answer) ? selected.filter(item => item !== answer) : [...selected, answer] };
  });
  const nextQuestion = () => {
    if (question < questions.length - 1) setQuestion(value => value + 1);
    else onComplete(`Welcome! Your ${role.toLowerCase()} profile is ready.`, { role, answers, account: signup });
  };
  const updateSignup = (field: keyof SignupForm, value: string) => setSignup(current => ({ ...current, [field]: value }));
  const signupReady = Object.values(signup).every(value => value.trim().length > 0) && signup.pincode.length === 6 && signup.phone.length === 10;

  return <div className="onboarding-shell">
    <header className="onboarding-header">
      <div className="brand"><span className="brand-mark"><Icon name="leaf" /></span><span>Kisan <b>Saathi</b></span></div>
      <LanguageSelect language={language} onChange={onLanguageChange} />
    </header>
    <div className="onboarding-layout">
      <aside className="onboarding-story">
        <img src={step === "questions" ? photos.workers : photos.farmer} alt="Farmers working in a green field" />
        <div className="story-overlay"><span className="eyebrow">FARMING, MADE EASIER</span><h1>Everything your farm needs, in one place.</h1><p>Tools, workers, storage and trusted local support.</p></div>
      </aside>
      <main className="onboarding-card">
        {step === "login" && authMode === "signup" && <>
          <div className="auth-card-heading"><span className="welcome-icon"><Icon name="user" /></span><div><span className="eyebrow">CREATE ACCOUNT</span><h1>Join Kisan Saathi</h1><p>Tell us a little about yourself to get started.</p></div></div>
          <div className="signup-fields">
            <label>First name<input value={signup.firstName} onChange={event => updateSignup("firstName", event.target.value)} /></label>
            <label>Last name<input value={signup.lastName} onChange={event => updateSignup("lastName", event.target.value)} /></label>
            <label className="full-field">Address line 1<input value={signup.addressLine1} onChange={event => updateSignup("addressLine1", event.target.value)} /></label>
            <label className="full-field">Address line 2<input value={signup.addressLine2} onChange={event => updateSignup("addressLine2", event.target.value)} /></label>
            <label>City / district<input value={signup.city} onChange={event => updateSignup("city", event.target.value)} /></label>
            <label>State<input value={signup.state} onChange={event => updateSignup("state", event.target.value)} /></label>
            <label>Pincode<input inputMode="numeric" maxLength={6} value={signup.pincode} onChange={event => updateSignup("pincode", event.target.value.replace(/\D/g, ""))} /></label>
            <label>Phone number<input inputMode="numeric" maxLength={10} value={signup.phone} onChange={event => updateSignup("phone", event.target.value.replace(/\D/g, ""))} /></label>
          </div>
          <fieldset className="role-picker signup-role"><legend>{content(language, "I am a...")}</legend><div>{roles.map(item => <button type="button" className={role === item.label ? "selected" : ""} onClick={() => setRole(item.label)} key={item.label}><span><Icon name={item.icon} /></span><b>{content(language, item.label)}</b></button>)}</div></fieldset>
          <button className="primary-action" disabled={!signupReady} onClick={() => { setPhone(signup.phone); setSignupComplete(false); setStep("signupOtp"); }}>Create account <Icon name="chevron" /></button>
          <button className="text-action" onClick={() => setAuthMode("login")}>Already have an account? <b>Sign in</b></button>
        </>}
        {step === "signupOtp" && <>
          <button className="back-button" onClick={() => setStep("login")}>‹ Back</button>
          <div className="otp-illustration"><Icon name="phone" size={35} /></div>
          <div className="center-heading"><span className="eyebrow">VERIFY YOUR PHONE</span><h1>Confirm your account</h1><p>We sent a 4-digit code to +91 ••••••{signup.phone.slice(-4)}</p></div>
          <div className="otp-field"><input autoFocus aria-label="Sign up verification code" inputMode="numeric" maxLength={4} placeholder="—  —  —  —" value={otp} onChange={event => setOtp(event.target.value.replace(/\D/g, ""))} /></div>
          <button className="primary-action" disabled={otp.length !== 4} onClick={() => setStep("questions")}><Icon name="check" /> Verify and continue</button>
          <button className="text-action">Didn't get it? <b>Send again</b></button>
        </>}
        {step === "login" && authMode === "login" && <>
          <div className="auth-card-heading"><span className="welcome-icon"><Icon name="user" /></span><div><span className="eyebrow">{text(language, "welcome")}</span><h1>{text(language, "signIn")}</h1><p>{text(language, "chooseUse")}</p></div><SpeakButton label={text(language, "signIn")} hidden={language === "ta" || language === "ml"} /></div>
          {signupComplete && <p className="signup-success">Account created. Sign in with your phone number to continue.</p>}
          <fieldset className="role-picker"><legend>{content(language, "I am a...")}</legend><div>{roles.map(item => <button type="button" className={role === item.label ? "selected" : ""} onClick={() => setRole(item.label)} key={item.label}><span><Icon name={item.icon} /></span><b>{content(language, item.label)}</b><small>{content(language, item.help || "")}</small><i><Icon name="check" size={16} /></i></button>)}</div></fieldset>
          <label className="field-label" htmlFor="phone">{text(language, "mobile")}</label>
          <div className="phone-field"><span>+91</span><input id="phone" inputMode="numeric" maxLength={10} placeholder="Enter 10-digit number" value={phone} onChange={event => setPhone(event.target.value.replace(/\D/g, ""))} /><SpeakButton label="mobile number field" /></div>
          <button className="primary-action" disabled={phone.length !== 10} onClick={() => setStep("otp")}>{text(language, "sendOtp")} <Icon name="chevron" /></button>
          <p className="secure-note"><Icon name="shield" size={18} /> {text(language, "secure")}</p>
          <button className="text-action signup-link" onClick={() => { setSignupComplete(false); setAuthMode("signup"); }}>New here? <b>Create an account</b></button>
        </>}
        {step === "otp" && <>
          <button className="back-button" onClick={() => setStep("login")}>‹ Back</button>
          <div className="otp-illustration"><Icon name="phone" size={35} /></div>
          <div className="center-heading"><span className="eyebrow">VERIFY YOUR NUMBER</span><h1>Enter the 4-digit code</h1><p>We sent it to +91 ••••••{phone.slice(-4)}</p></div>
          <div className="otp-field"><input autoFocus aria-label="Four digit verification code" inputMode="numeric" maxLength={4} placeholder="—  —  —  —" value={otp} onChange={event => setOtp(event.target.value.replace(/\D/g, ""))} /></div>
          <button className="primary-action" disabled={otp.length !== 4} onClick={() => setStep("questions")}><Icon name="check" /> Verify and continue</button>
          <button className="text-action">Didn't get it? <b>Send again</b></button>
        </>}
        {step === "questions" && <>
          <div className="question-top"><div><span className="eyebrow">{text(language, "onboarding")} / {content(language, role)}</span><div className="question-dots">{questions.map((_, index) => <i className={index <= question ? "active" : ""} key={index} />)}</div></div><button onClick={() => onComplete("Welcome to Kisan Saathi!", { role, answers, account: signup })}>{text(language, "skip")}</button></div>
          <div className="question-heading"><span className="question-number">{question + 1}</span><div><h1>{content(language, current.title)}</h1><p>{content(language, current.help)}</p></div><SpeakButton label={content(language, current.title)} hidden={language === "ta" || language === "ml"} /></div>
          <div className="answer-grid">{current.options.map(option => {
            const selected = (answers[question] || []).includes(option.label);
            return <button className={selected ? "selected" : ""} key={option.label} onClick={() => toggleAnswer(option.label)}><span><Icon name={option.icon} size={30} /></span><b>{content(language, option.label)}</b><i><Icon name="check" size={17} /></i></button>;
          })}</div>
          <div className="question-actions">{question > 0 && <button className="secondary-action" onClick={() => setQuestion(value => value - 1)}>{text(language, "back")}</button>}<button className="primary-action" onClick={nextQuestion}>{question === questions.length - 1 ? text(language, "finish") : text(language, "continue")} <Icon name="chevron" /></button></div>
          <p className="question-note">This helps us show you more useful information. You can change it later.</p>
        </>}
      </main>
    </div>
  </div>;
}

const navItems = [
  { id: "home", labelKey: "home", icon: "home" as IconName },
  { id: "market", labelKey: "equipment", icon: "tractor" as IconName },
  { id: "jobs", labelKey: "jobs", icon: "briefcase" as IconName },
  { id: "requests", labelKey: "requests", icon: "bell" as IconName },
  { id: "profile", labelKey: "profile", icon: "user" as IconName },
  { id: "schemes", labelKey: "schemes", icon: "shield" as IconName },
];

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [page, setPage] = useState("home");
  const [language, setLanguage] = useState<LanguageCode>(() => (localStorage.getItem("kisan-language") as LanguageCode) || "en");
  const [listening, setListening] = useState(false);
  const [toast, setToast] = useState("");
  const [profile, setProfile] = useState<OnboardingProfile>({ role: "Farmer", answers: {} });
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2800); };
  const changeLanguage = (nextLanguage: LanguageCode) => { setLanguage(nextLanguage); localStorage.setItem("kisan-language", nextLanguage); };
  if (!authenticated) return <Onboarding language={language} onLanguageChange={changeLanguage} onComplete={(message, completedProfile) => { setProfile(completedProfile); setAuthenticated(true); setToast(message); window.setTimeout(() => setToast(""), 2800); }} />;
  const visibleNavItems = navItems.filter(item => (item.id !== "schemes" || profile.role === "Farmer") && (item.id !== "requests" || profile.role !== "Farmer"));
  return <div className="app-shell">
    <aside className="desktop-sidebar">
      <button className="brand" onClick={() => setPage("home")}><span className="brand-mark"><Icon name="leaf" /></span><span>Kisan<br /><b>Saathi</b></span></button>
      <nav>{visibleNavItems.map(item => <button className={page === item.id ? "active" : ""} key={item.id} onClick={() => setPage(item.id)}><Icon name={item.icon} /><span>{text(language, item.labelKey)}</span>{item.id === "requests" && <i>2</i>}</button>)}</nav>
      <div className="help-card"><Icon name="speaker" /><strong>Need help?</strong><span>Tap and speak to us</span><button onClick={() => setListening(true)}>Start voice help</button></div>
    </aside>
    <div className="app-main">
      <header className="topbar">
        <button className="brand mobile-brand" onClick={() => setPage("home")}><span className="brand-mark"><Icon name="leaf" /></span><span>Kisan <b>Saathi</b></span></button>
        <div className="top-actions"><LanguageSelect language={language} onChange={changeLanguage} />{profile.role !== "Farmer" && <button className="notification-btn" aria-label="Notifications" onClick={() => { setPage("requests"); }}><Icon name="bell" /><i>2</i></button>}<button className="profile-chip" onClick={() => setPage("profile")}><img src={photos.farmer} alt="" /><span>Ramesh<small>{profile.role}</small></span></button></div>
      </header>
      {page === "home" && <Dashboard notify={notify} go={setPage} profile={profile} language={language} />}
      {page === "market" && <Marketplace notify={notify} />}
      {page === "jobs" && <Jobs notify={notify} />}
      {page === "requests" && <Requests notify={notify} />}
      {page === "profile" && <Profile profile={profile} notify={notify} language={language} onLogout={() => { setAuthenticated(false); setPage("home"); }} />}
      {page === "schemes" && profile.role === "Farmer" && <GovernmentSchemes profile={profile} language={language} notify={notify} />}
    </div>
    <button className={`floating-mic ${listening ? "listening" : ""}`} aria-label="Voice navigation" onClick={() => setListening(value => !value)}><Icon name={listening ? "close" : "mic"} size={30} /></button>
    {listening && <div className="listening-panel"><span className="voice-pulse"><Icon name="mic" /></span><div><strong>I'm listening...</strong><small>Say “Book a tractor” or “Find work”</small></div></div>}
    {toast && <div className="toast"><Icon name="check" />{toast}</div>}
    <nav className="bottom-nav">{visibleNavItems.map(item => <button className={page === item.id ? "active" : ""} key={item.id} onClick={() => setPage(item.id)}><span><Icon name={item.icon} />{item.id === "requests" && <i>2</i>}</span><small>{text(language, item.labelKey)}</small></button>)}</nav>
  </div>;
}

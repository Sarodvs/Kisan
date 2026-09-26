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

const photos = {
  farmer: "https://images.unsplash.com/photo-1627475320102-d73fcb4eb427?auto=format&fit=crop&w=500&q=85",
  tractor: "https://images.unsplash.com/photo-1564868480822-32f714a0e763?auto=format&fit=crop&w=800&q=85",
  redTractor: "https://images.unsplash.com/photo-1606739211185-2c846d734a6d?auto=format&fit=crop&w=800&q=85",
  workers: "https://images.unsplash.com/photo-1760973177205-2d27e31f9afa?auto=format&fit=crop&w=800&q=85",
};

function SpeakButton({ label }: { label: string }) {
  return <button aria-label={`Listen to ${label}`} className="icon-button"><Icon name="speaker" size={20} /></button>;
}

function SectionTitle({ children, action, onAction }: { children: ReactNode; action?: string; onAction?: () => void }) {
  return <div className="section-title"><h2>{children}</h2>{action && <button onClick={onAction}>{action} <Icon name="chevron" size={18} /></button>}</div>;
}

function Dashboard({ notify, go }: { notify: (message: string) => void; go: (page: string) => void }) {
  const quick = [
    { label: "Book Tractor", icon: "tractor" as IconName, color: "green", page: "market" },
    { label: "Find Labor", icon: "users" as IconName, color: "gold", page: "jobs" },
    { label: "Find Storage", icon: "warehouse" as IconName, color: "blue", page: "market" },
    { label: "Subsidies", icon: "shield" as IconName, color: "purple", page: "profile" },
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

    <SectionTitle>What do you need?</SectionTitle>
    <div className="quick-grid">
      {quick.map(item => <button className={`quick-card ${item.color}`} key={item.label} onClick={() => go(item.page)}>
        <span className="quick-icon"><Icon name={item.icon} size={35} /></span>
        <strong>{item.label}</strong><Icon name="chevron" size={20} />
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

function Profile({ notify }: { notify: (message: string) => void }) {
  const [selectedRole, setSelectedRole] = useState("Farmer");
  const roles = [
    { label: "Farmer", help: "I grow crops", icon: "leaf" as IconName, color: "green" },
    { label: "Tool Lender", help: "I rent equipment", icon: "tractor" as IconName, color: "gold" },
    { label: "Job Seeker", help: "I need farm work", icon: "users" as IconName, color: "blue" },
    { label: "Storage Owner", help: "I have storage space", icon: "warehouse" as IconName, color: "purple" },
  ];
  return <main className="auth-page">
    <section className="auth-intro"><div className="brand-mark large"><Icon name="leaf" size={34} /></div><span className="eyebrow">WELCOME TO</span><h1>Kisan Saathi</h1><p>Your trusted farming companion</p>
      <button className="voice-intro" onClick={() => notify("Playing a voice introduction")}><span><Icon name="speaker" /></span><div><strong>Listen to introduction</strong><small>Tap to hear in your language</small></div><span className="play-circle">▶</span></button>
    </section>
    <section className="role-panel"><div className="role-heading"><div><h2>How will you use Kisan Saathi?</h2><p>Choose one. You can change this later.</p></div><SpeakButton label="role choices" /></div>
      <div className="role-grid">{roles.map(role => <button className={`role-card ${role.color} ${selectedRole === role.label ? "selected" : ""}`} key={role.label} onClick={() => { setSelectedRole(role.label); notify(`${role.label} profile selected`) }}><span><Icon name={role.icon} size={38} /></span><div><strong>{role.label}</strong><small>{role.help}</small></div><Icon name={selectedRole === role.label ? "check" : "chevron"} /></button>)}</div>
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

function Onboarding({ onComplete }: { onComplete: (message: string) => void }) {
  const [step, setStep] = useState<"login" | "otp" | "questions">("login");
  const [role, setRole] = useState<UserRole>("Farmer");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const roles: { label: UserRole; icon: IconName }[] = [
    { label: "Farmer", icon: "leaf" },
    { label: "Tool Lender", icon: "tractor" },
    { label: "Job Seeker", icon: "users" },
    { label: "Storage Owner", icon: "warehouse" },
  ];
  const questions = roleQuestions[role];
  const current = questions[question];
  const toggleAnswer = (answer: string) => setAnswers(existing => {
    const selected = existing[question] || [];
    return { ...existing, [question]: selected.includes(answer) ? selected.filter(item => item !== answer) : [...selected, answer] };
  });
  const nextQuestion = () => {
    if (question < questions.length - 1) setQuestion(value => value + 1);
    else onComplete(`Welcome! Your ${role.toLowerCase()} profile is ready.`);
  };

  return <div className="onboarding-shell">
    <header className="onboarding-header">
      <div className="brand"><span className="brand-mark"><Icon name="leaf" /></span><span>Kisan <b>Saathi</b></span></div>
      <button className="language-btn"><span>अ</span>English<Icon name="chevron" size={16} /></button>
    </header>
    <div className="onboarding-layout">
      <aside className="onboarding-story">
        <img src={step === "questions" ? photos.workers : photos.farmer} alt="Farmers working in a green field" />
        <div className="story-overlay"><span className="eyebrow">FARMING, MADE EASIER</span><h1>Everything your farm needs, in one place.</h1><p>Tools, workers, storage and trusted local support.</p></div>
      </aside>
      <main className="onboarding-card">
        {step === "login" && <>
          <div className="auth-card-heading"><span className="welcome-icon"><Icon name="user" /></span><div><span className="eyebrow">WELCOME</span><h1>Sign in to continue</h1><p>Choose how you use Kisan Saathi, then enter your mobile number.</p></div><SpeakButton label="sign in instructions" /></div>
          <fieldset className="role-picker"><legend>I am a...</legend><div>{roles.map(item => <button type="button" className={role === item.label ? "selected" : ""} onClick={() => setRole(item.label)} key={item.label}><span><Icon name={item.icon} /></span><b>{item.label}</b><i><Icon name="check" size={16} /></i></button>)}</div></fieldset>
          <label className="field-label" htmlFor="phone">Mobile number</label>
          <div className="phone-field"><span>+91</span><input id="phone" inputMode="numeric" maxLength={10} placeholder="Enter 10-digit number" value={phone} onChange={event => setPhone(event.target.value.replace(/\D/g, ""))} /><SpeakButton label="mobile number field" /></div>
          <button className="primary-action" disabled={phone.length !== 10} onClick={() => setStep("otp")}>Send one-time password <Icon name="chevron" /></button>
          <p className="secure-note"><Icon name="shield" size={18} /> Your number stays private and secure.</p>
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
          <div className="question-top"><div><span className="eyebrow">SET UP YOUR {role.toUpperCase()} PROFILE</span><div className="question-dots">{questions.map((_, index) => <i className={index <= question ? "active" : ""} key={index} />)}</div></div><button onClick={() => onComplete("Welcome to Kisan Saathi!")}>Skip for now</button></div>
          <div className="question-heading"><span className="question-number">{question + 1}</span><div><h1>{current.title}</h1><p>{current.help}</p></div><SpeakButton label={current.title} /></div>
          <div className="answer-grid">{current.options.map(option => {
            const selected = (answers[question] || []).includes(option.label);
            return <button className={selected ? "selected" : ""} key={option.label} onClick={() => toggleAnswer(option.label)}><span><Icon name={option.icon} size={30} /></span><b>{option.label}</b><i><Icon name="check" size={17} /></i></button>;
          })}</div>
          <div className="question-actions">{question > 0 && <button className="secondary-action" onClick={() => setQuestion(value => value - 1)}>Back</button>}<button className="primary-action" onClick={nextQuestion}>{question === questions.length - 1 ? "Finish setup" : "Continue"} <Icon name="chevron" /></button></div>
          <p className="question-note">This helps us show you more useful information. You can change it later.</p>
        </>}
      </main>
    </div>
  </div>;
}

const navItems = [
  { id: "home", label: "Home", icon: "home" as IconName },
  { id: "market", label: "Equipment", icon: "tractor" as IconName },
  { id: "jobs", label: "Jobs", icon: "briefcase" as IconName },
  { id: "requests", label: "Requests", icon: "bell" as IconName },
  { id: "profile", label: "Profile", icon: "user" as IconName },
];

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [page, setPage] = useState("home");
  const [language, setLanguage] = useState("English");
  const [listening, setListening] = useState(false);
  const [toast, setToast] = useState("");
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2800); };
  const languages = ["English", "हिंदी", "मराठी"];
  const changeLanguage = () => setLanguage(languages[(languages.indexOf(language) + 1) % languages.length]);
  if (!authenticated) return <Onboarding onComplete={(message) => { setAuthenticated(true); setToast(message); window.setTimeout(() => setToast(""), 2800); }} />;
  return <div className="app-shell">
    <aside className="desktop-sidebar">
      <button className="brand" onClick={() => setPage("home")}><span className="brand-mark"><Icon name="leaf" /></span><span>Kisan<br /><b>Saathi</b></span></button>
      <nav>{navItems.map(item => <button className={page === item.id ? "active" : ""} key={item.id} onClick={() => setPage(item.id)}><Icon name={item.icon} /><span>{item.label}</span>{item.id === "requests" && <i>2</i>}</button>)}</nav>
      <div className="help-card"><Icon name="speaker" /><strong>Need help?</strong><span>Tap and speak to us</span><button onClick={() => setListening(true)}>Start voice help</button></div>
    </aside>
    <div className="app-main">
      <header className="topbar">
        <button className="brand mobile-brand" onClick={() => setPage("home")}><span className="brand-mark"><Icon name="leaf" /></span><span>Kisan <b>Saathi</b></span></button>
        <div className="top-actions"><button className="language-btn" onClick={changeLanguage}><span>अ</span>{language}<Icon name="chevron" size={16} /></button><button className="notification-btn" aria-label="Notifications" onClick={() => { setPage("requests"); }}><Icon name="bell" /><i>2</i></button><button className="profile-chip" onClick={() => setPage("profile")}><img src={photos.farmer} alt="" /><span>Ramesh<small>Farmer</small></span></button></div>
      </header>
      {page === "home" && <Dashboard notify={notify} go={setPage} />}
      {page === "market" && <Marketplace notify={notify} />}
      {page === "jobs" && <Jobs notify={notify} />}
      {page === "requests" && <Requests notify={notify} />}
      {page === "profile" && <Profile notify={notify} />}
    </div>
    <button className={`floating-mic ${listening ? "listening" : ""}`} aria-label="Voice navigation" onClick={() => setListening(value => !value)}><Icon name={listening ? "close" : "mic"} size={30} /></button>
    {listening && <div className="listening-panel"><span className="voice-pulse"><Icon name="mic" /></span><div><strong>I'm listening...</strong><small>Say “Book a tractor” or “Find work”</small></div></div>}
    {toast && <div className="toast"><Icon name="check" />{toast}</div>}
    <nav className="bottom-nav">{navItems.map(item => <button className={page === item.id ? "active" : ""} key={item.id} onClick={() => setPage(item.id)}><span><Icon name={item.icon} />{item.id === "requests" && <i>2</i>}</span><small>{item.label}</small></button>)}</nav>
  </div>;
}

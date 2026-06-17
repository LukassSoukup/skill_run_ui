export type Language = 'en' | 'cs';

const translations = {
  en: {
    hero: {
      availableBadge: "Available for new projects",
      headlinePre: "Your backend ships on time.",
      headlineAccent: "Your architecture scales.",
      headlinePost: "I make it happen.",
      subheadline:
        "Reliable APIs, scalable architecture, and features that ship — backed by 3+ years at Komerční banka and a SwissHacks 2025 win. Let's build something great.",
      ctaPrimary: "Get in Touch",
      ctaSecondary: "See My Work",
      profilePicAlt: "Lukáš Soukup — Full-Stack Software Engineer",
      services: [
        "Backend API design & distributed systems",
        "Full-stack application development",
        "Architecture, DevOps & technical consulting",
      ],
    },
    trustSignals: [
      { label: "3+ yrs at Komerční banka", iconPath: "/icons/kb-logo.svg" },
      { label: "SwissHacks 2025 Winner", iconPath: "/icons/hackathon-medal.svg" },
      { label: "Cyber Security Certified", iconPath: "/icons/cert-shield.svg" },
    ],
    aboutIntro: `I'm Lukáš Soukup, a dedicated Software Engineer with a strong foundation in Java and Spring Boot, currently shaping digital banking solutions at Komerční banka (Société Générale). My focus is building secure, scalable, and maintainable software where performance, resilience, and quality are key.

With 7+ years of experience with Java and little over 3 years of professional work in the industry, I have a deep understanding of backend systems, distributed architecture, event-driven design, and DevOps practices. I also work on full-stack projects and enjoy exploring areas like cybersecurity, AI integration, and 3D prototyping.

Driven by discipline and curiosity, I regularly take part in endurance races and hackathons—seeking growth through challenge, both professionally and personally.`,
    ui: {
      navAbout: 'About',
      navProjects: 'Projects',
      navWork: 'Experience',
      navContact: 'Hire Me',
      navHome: 'Home',
      aboutSectionTitle: 'About Me',
      technicalSkills: 'Technical Skills',
      sortBy: 'Sort by:',
      sortType: 'Type',
      sortLevel: 'Level',
      sortName: 'Name',
      sortFrequency: 'Frequency',
      githubProjects: 'GitHub Projects',
      technologiesUsed: 'Technologies Used:',
      liveDemo: 'Live Demo',
      code: 'Code',
      noRepoMessage: 'Other members of the project do not wish to share the repository.',
      professionalExperience: 'Professional Experience',
      keyAchievements: 'Key Achievements:',
      sources: 'Sources:',
      present: 'Present',
      getInTouch: 'Get In Touch',
      contactSubheading:
        "I'm always open to new opportunities and collaborations. Feel free to reach out if you have a question or just want to say hi!",
      sendMessage: 'Send Me a Message',
      nameLabel: 'Name',
      emailLabel: 'Email',
      messageLabel: 'Message',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'Your email address',
      messagePlaceholder: 'What would you like to discuss?',
      sending: 'Sending...',
      sendBtn: 'Send Message',
      successMessage: 'Thank you! Your message has been sent successfully.',
      errorMessage: 'Oops! Something went wrong. Please try again later.',
      connect: 'Connect:',
      rights: 'All rights reserved.',
    },
    projects: {
      InvoiceParser:
        "A simple and small Java application to parse invoices from my Gmail using Google's API. Genuinely helpful to speed up the process of gathering invoices for travel expenses and other purposes. First it queries Gmail for emails which contains specific keywords in the subject, then it downloads the attachments and saves it on my shared local storage within my local network that runs on Raspberry Pi. Everything is done in a Docker container so it can be easily managed and deployed on any machine.",
      'Welder Norm Checker':
        "ElectronJS desktop application designed to streamline employee record management and performance monitoring for welding operations. The application organizes local file storage for employee data, tracks individual work performance, and automatically calculates income based on the number of completed welded parts, providing an efficient and transparent solution for workforce and productivity management.",
      'RAIvisor - an AI Agent for Banking Advisors':
        "An advanced AI-powered tool developed at SwissHacks 2025 for banking advisors, enabling real-time multilingual speech-to-text transcription, product sale recommendations, compliance checks, automated note-taking, customer data synchronization, and sentiment analysis. The solution was built in just 36 hours and won first place at the hackathon.\n\nDemo is unfortunately not available since it was designed to run onpremise to comply with data privacy regulations and some of the team members do not wish to share the code publicly, yet.",
      'Skill Run':
        "It is this web application you are currently using. It is built with React, TypeScript, Next.js and Tailwind CSS with DaisyUI components on the frontend. It features responsive design, dark mode, Three.js animation scenes and interactive components. The backend side is currently in progress, there I'm using Java, Spring Boot, PostgreSQL, Docker, Kubernetes, Jenkins, however basic features like sending emails are already implemented so feel free to send me an email :)",
      HarvestGuard:
        "A mobile-first dashboard built at START Hack 2025 for Syngenta, designed to empower farmers by aggregating diverse sensor data (soil quality, weather, humidity, pest control, plant health, etc.) into actionable insights. The solution highlights risks, provides recommendations, and features a minimal-text interface for accessibility in developing regions.\n\nWhen trying out the demo, please be patient, the backend has to start up and since it's a free hosting service it takes some time.",
    } as Record<string, string>,
    experiences: {
      '1': {
        description:
          "Participated on multiple projects but mainly focused on backend development. The biggest project I worked on, MIGR, is a microservices-based system for migrating entire customer data between different systems within the bank (the old legacy system and new modern SW solution). On the other projects I've touched the legacy system and worked on rewriting them to a modern microservices architecture.",
        achievements: [
          'Designed and implemented RESTful APIs, Async messaging (Kafka, ActiveMQ) for internal services and external clients',
          'Managed and monitored Kubernetes clusters and resources through Argo CD, Helm, Grafana, Kibana and Kubernetes dashboard',
          'Worked within a clustered, cross-functional team environment, where each team operated as an independent service provider.',
        ],
      },
      '2': {
        description:
          "My first professional role after university, focused on energy sector projects. The largest project, MARI (cross-border energy market), provided a strong foundation for my growth as a junior developer. I primarily worked as a maintenance developer, contributing to both frontend and backend tasks, and gained valuable experience in troubleshooting, feature enhancements, and cross-functional collaboration.",
        achievements: [
          'Maintained and enhanced core features for energy sector applications, ensuring reliability and performance',
          'Worked across both frontend and backend codebases, supporting full stack development needs',
          'Collaborated with senior developers to resolve production issues and implement new features in the MARI project',
          'Developed a strong understanding of agile workflows and best practices in a professional software environment',
        ],
      },
      '3': {
        description:
          "Achieved first place at SwissHacks 2025 hackathon in Zürich, collaborating with a team of five on a case for Raiffeisen Bank. We developed an advanced AI-powered tool for banking advisors, enabling real-time multilingual speech-to-text transcription, product sale recommendations, compliance checks, automated note-taking, customer data synchronization, and sentiment analysis—all delivered within a 36-hour hackathon.",
        achievements: [
          'Built a full-stack AI agent platform for banking advisors in just 36 hours, winning first place at SwissHacks 2025',
          'Designed the initial architecture and the dataflow for the AI agents',
          'Implemented real-time speech-to-text transcription using OpenAI Whisper and LangChain',
          'Developed AI-driven product recommendation and compliance check modules for banking advisors',
          'Successfully collaborated in a high-pressure, cross-functional team environment',
          'Presented the solution to a panel of judges at SwissHacks and later presented at Point Zero Forum',
        ],
      },
      '4': {
        description:
          "Collaborated in a team of four at START Hack 2025 to develop a mobile-first dashboard solution for Syngenta, aimed at empowering farmers. Our application aggregated diverse sensor data (soil quality, weather, humidity, pest control, plant health, and more) to generate actionable insights, highlight risks, and provide clear recommendations—enabling farmers to maximize crop yield and better prepare for the harvesting season. The interface was designed for ease of use, with minimal text to support accessibility for farmers in developing regions.",
        achievements: [
          'Designed and implemented a mobile-first dashboard for real-time agricultural sensor data aggregation and visualization',
          'Integrated multiple data sources including soil quality, weather forecasts, humidity, pest control, and plant health',
          "Developed automated risk detection and recommendation features to support farmers' decision-making",
          'Optimized the user interface for low-literacy and third-world accessibility by minimizing text and maximizing clarity',
          'Collaborated closely with a cross-functional team to deliver a working prototype within the hackathon timeframe',
        ],
      },
      '5': {
        description:
          "Completed an intensive Cyber Security Specialist certification course at Kyber Akademie, covering a broad spectrum of topics including IT security fundamentals, privacy protection, OSINT, ethical hacking, risk management, Microsoft 365 and Active Directory administration and security, business continuity, incident response, legislative compliance, and cloud and Windows security. The course combined theoretical knowledge with hands-on labs and real-world scenarios, culminating in a comprehensive final exam.",
        achievements: [
          'Developed a strong foundation in IT security principles, privacy protection, and OSINT techniques',
          'Gained practical experience in ethical hacking, physical and hardware security, and risk management',
          'Acquired hands-on skills in Microsoft 365, Active Directory, and cloud administration and security',
          'Learned to manage business continuity, disaster recovery, and incident response processes',
          'Understood legislative compliance, supplier management, and best practices for organizational security',
          'Completed practical labs and a final exam to validate comprehensive cybersecurity expertise',
        ],
      },
    } as Record<string, { description: string; achievements: string[] }>,
  },
  cs: {
    hero: {
      availableBadge: "K dispozici pro nové projekty",
      headlinePre: "Hledáte",
      headlineAccent: "Softwarového",
      headlinePost: "Inženýra?",
      subheadline:
        "Stavím spolehlivé backendové systémy a full\u2011stack aplikace. 3+ roky profesní praxe v Komerční bance. Pojďme vyřešit váš technický problém.",
      ctaPrimary: "Kontaktujte mě",
      ctaSecondary: "Prohlédnout práci",
      profilePicAlt: "Lukáš Soukup — Full-Stack Software Engineer",
      services: [
        "Návrh backend API a distribuovaných systémů",
        "Full-stack vývoj aplikací",
        "Architektura, DevOps a technické poradenství",
      ],
    },
    trustSignals: [
      { label: "3+ roky v Komerční bance", iconPath: "/icons/kb-logo.svg" },
      { label: "Vítěz SwissHacks 2025", iconPath: "/icons/hackathon-medal.svg" },
      { label: "Certifikát kybernetické bezpečnosti", iconPath: "/icons/cert-shield.svg" },
    ],
    aboutIntro: `Jsem Lukáš Soukup, softwarový inženýr se silnými základy v Javě a Spring Bootu, který v současné době formuje digitální bankovní řešení v Komerční bance (Société Générale). Zaměřuji se na budování bezpečného, škálovatelného a udržovatelného softwaru, kde jsou klíčové výkon, odolnost a kvalita.

S 7+ lety zkušeností s Javou a více než 3 roky profesní praxe mám hluboké znalosti backendových systémů, distribuované architektury, event-driven designu a DevOps praktik. Pracuji také na full-stack projektech a rád se věnuji oblastem jako kybernetická bezpečnost, integrace umělé inteligence a 3D prototypování.

Poháněn disciplínou a zvídavostí se pravidelně účastním vytrvalostních závodů a hackathonů – hledám růst skrze výzvy, a to jak profesně, tak osobně.`,
    ui: {
      navAbout: 'O mně',
      navProjects: 'Projekty',
      navWork: 'Zkušenosti',
      navContact: 'Najmout',
      navHome: 'Domů',
      aboutSectionTitle: 'O mně',
      technicalSkills: 'Technické dovednosti',
      sortBy: 'Řadit podle:',
      sortType: 'Typ',
      sortLevel: 'Úroveň',
      sortName: 'Název',
      sortFrequency: 'Frekvence',
      githubProjects: 'GitHub projekty',
      technologiesUsed: 'Použité technologie:',
      liveDemo: 'Demo',
      code: 'Kód',
      noRepoMessage: 'Ostatní členové projektu si nepřejí sdílet repozitář.',
      professionalExperience: 'Profesní zkušenosti',
      keyAchievements: 'Klíčové úspěchy:',
      sources: 'Zdroje:',
      present: 'Současnost',
      getInTouch: 'Napište mi',
      contactSubheading:
        'Jsem vždy otevřen novým příležitostem a spolupráci. Neváhejte mě kontaktovat, pokud máte dotaz nebo jen chcete pozdravit!',
      sendMessage: 'Pošlete mi zprávu',
      nameLabel: 'Jméno',
      emailLabel: 'E-mail',
      messageLabel: 'Zpráva',
      namePlaceholder: 'Vaše jméno',
      emailPlaceholder: 'Vaše e-mailová adresa',
      messagePlaceholder: 'O čem byste rádi mluvili?',
      sending: 'Odesílám...',
      sendBtn: 'Odeslat zprávu',
      successMessage: 'Děkuji! Vaše zpráva byla úspěšně odeslána.',
      errorMessage: 'Jejda! Něco se pokazilo. Zkuste to prosím znovu.',
      connect: 'Spojení:',
      rights: 'Všechna práva vyhrazena.',
    },
    projects: {
      InvoiceParser:
        "Jednoduchá Java aplikace pro zpracování faktur z Gmailu pomocí Google API. Skutečně užitečná pro urychlení sběru faktur pro cestovní výdaje a jiné účely. Nejprve vyhledá e-maily s konkrétními klíčovými slovy v předmětu, poté stáhne přílohy a uloží je na sdílené lokální úložiště v mé domácí síti běžící na Raspberry Pi. Vše běží v Docker kontejneru, takže může být snadno spravováno a nasazeno na jakémkoli stroji.",
      'Welder Norm Checker':
        "Desktopová aplikace ElectronJS navržená pro zefektivnění správy záznamů o zaměstnancích a monitorování výkonu svářečských operací. Aplikace organizuje lokální úložiště souborů pro data zaměstnanců, sleduje individuální pracovní výkon a automaticky vypočítává výdělky na základě počtu dokončených svarů – přináší efektivní a transparentní řešení pro řízení pracovní síly a produktivity.",
      'RAIvisor - an AI Agent for Banking Advisors':
        "Pokročilý AI nástroj vyvinutý na SwissHacks 2025 pro bankovní poradce, umožňující přepis řeči v reálném čase ve více jazycích, doporučení produktů, kontroly souladu s předpisy, automatické poznámky, synchronizaci zákaznických dat a analýzu sentimentu. Řešení bylo postaveno za pouhých 36 hodin a vyhrálo první místo na hackathonu.\n\nDemo bohužel není dostupné, protože bylo navrženo pro provoz on-premise z důvodu ochrany dat a někteří členové týmu si zatím nepřejí sdílet kód veřejně.",
      'Skill Run':
        "Tato webová aplikace, kterou právě používáte. Je postavena na Reactu, TypeScriptu, Next.js a Tailwind CSS s DaisyUI komponentami na frontendu. Nabízí responzivní design, tmavý režim, Three.js animační scény a interaktivní komponenty. Backend je právě ve vývoji – používám Javu, Spring Boot, PostgreSQL, Docker, Kubernetes, Jenkins. Základní funkce jako odesílání e-mailů jsou již implementovány, takže mi klidně napište :)",
      HarvestGuard:
        "Mobilní dashboard postavený na START Hack 2025 pro Syngenta, navržený pro posílení postavení zemědělců agregací různých senzorových dat (kvalita půdy, počasí, vlhkost, ochrana rostlin, zdraví plodin atd.) do praktických poznatků. Řešení upozorňuje na rizika, poskytuje doporučení a nabízí rozhraní s minimem textu pro dostupnost v rozvojových regionech.\n\nPři zkoušení dema buďte prosím trpěliví – backend se musí nastartovat a protože jde o bezplatný hosting, chvíli to trvá.",
    } as Record<string, string>,
    experiences: {
      '1': {
        description:
          "Podílel jsem se na více projektech, ale primárně jsem se zaměřoval na backendový vývoj. Největší projekt, na kterém jsem pracoval – MIGR – je systém postavený na mikroslužbách pro migraci zákaznických dat mezi různými systémy v rámci banky (starý legacy systém a nové moderní softwarové řešení). Na dalších projektech jsem pracoval s legacy systémem a přepisoval jej do moderní mikroslužbové architektury.",
        achievements: [
          'Navrhl a implementoval RESTful API, asynchronní zasílání zpráv (Kafka, ActiveMQ) pro interní služby a externí klienty',
          'Spravoval a monitoroval Kubernetes clustery a prostředky prostřednictvím Argo CD, Helm, Grafana, Kibana a Kubernetes dashboardu',
          'Pracoval v clusterovém, mezifunkčním týmovém prostředí, kde každý tým fungoval jako nezávislý poskytovatel služeb.',
        ],
      },
      '2': {
        description:
          "Moje první profesionální role po univerzitě, zaměřená na projekty v energetickém sektoru. Největší projekt, MARI (přeshraniční energetický trh), mi poskytl silný základ pro růst jako juniornímu vývojáři. Primárně jsem pracoval jako maintenance developer, přispíval k frontendovým i backendovým úkolům a získával cenné zkušenosti v řešení problémů, vylepšování funkcí a mezifunkční spolupráci.",
        achievements: [
          'Udržoval a vylepšoval klíčové funkce pro aplikace energetického sektoru, zajišťující spolehlivost a výkon',
          'Pracoval napříč frontendovými i backendovými kódy, podporující full stack vývoj',
          'Spolupracoval se seniorními vývojáři na řešení produkčních problémů a implementaci nových funkcí v projektu MARI',
          'Vyvinul silné pochopení agilních pracovních postupů a osvědčených postupů v profesionálním softwarovém prostředí',
        ],
      },
      '3': {
        description:
          "Dosáhl jsem prvního místa na hackathonu SwissHacks 2025 v Curychu v týmu pěti lidí pro případ Raiffeisen Bank. Vyvinuli jsme pokročilý AI nástroj pro bankovní poradce umožňující přepis řeči v reálném čase ve více jazycích, doporučení produktů, kontroly souladu, automatické poznámky, synchronizaci zákaznických dat a analýzu sentimentu – vše dodáno v rámci 36hodinového hackathonu.",
        achievements: [
          'Postavil full-stack AI agentní platformu pro bankovní poradce za pouhých 36 hodin a vyhrál první místo na SwissHacks 2025',
          'Navrhl počáteční architekturu a datový tok pro AI agenty',
          'Implementoval přepis řeči v reálném čase pomocí OpenAI Whisper a LangChain',
          'Vyvinul AI moduly pro doporučení produktů a kontroly souladu pro bankovní poradce',
          'Úspěšně spolupracoval v týmovém prostředí pod tlakem',
          'Prezentoval řešení porotě na SwissHacks a následně na Point Zero Forum',
        ],
      },
      '4': {
        description:
          "Spolupracoval jsem v týmu čtyř lidí na START Hack 2025 při vývoji mobilního dashboardu pro Syngenta, jehož cílem bylo posílení postavení zemědělců. Naše aplikace agregovala různá senzorová data (kvalita půdy, předpovědi počasí, vlhkost, ochrana rostlin, zdraví plodin a další) pro generování praktických poznatků, upozorňování na rizika a poskytování jasných doporučení – umožňující zemědělcům maximalizovat výnosy plodin. Rozhraní bylo navrženo pro snadné použití s minimem textu pro přístupnost v rozvojových regionech.",
        achievements: [
          'Navrhl a implementoval mobilní dashboard pro agregaci a vizualizaci zemědělských senzorových dat v reálném čase',
          'Integroval více datových zdrojů včetně kvality půdy, předpovědí počasí, vlhkosti, ochrany rostlin a zdraví plodin',
          'Vyvinul funkce automatické detekce rizik a doporučení pro podporu rozhodování zemědělců',
          'Optimalizoval uživatelské rozhraní pro přístupnost minimalizací textu a maximalizací přehlednosti',
          'Úzce spolupracoval s mezifunkčním týmem na dodání funkčního prototypu v rámci hackathonu',
        ],
      },
      '5': {
        description:
          "Absolvoval jsem intenzivní certifikační kurz Specialisty kybernetické bezpečnosti na Kyber Akademii, pokrývající široké spektrum témat včetně základů IT bezpečnosti, ochrany soukromí, OSINT, etického hackingu, řízení rizik, administrace a zabezpečení Microsoft 365 a Active Directory, kontinuity podnikání, reakce na incidenty, legislativního souladu a zabezpečení cloudu a Windows. Kurz kombinoval teoretické znalosti s praktickými cvičeními a reálnými scénáři, zakončenými komplexní závěrečnou zkouškou.",
        achievements: [
          'Vyvinul silné základy v principech IT bezpečnosti, ochraně soukromí a technikách OSINT',
          'Získal praktické zkušenosti v etickém hackingu, fyzické a hardwarové bezpečnosti a řízení rizik',
          'Osvojil si praktické dovednosti v administraci a zabezpečení Microsoft 365, Active Directory a cloudu',
          'Naučil se řídit kontinuitu podnikání, obnovu po havárii a procesy reakce na incidenty',
          'Pochopil legislativní soulad, řízení dodavatelů a osvědčené postupy pro organizační bezpečnost',
          'Absolvoval praktická cvičení a závěrečnou zkoušku k potvrzení komplexních znalostí kybernetické bezpečnosti',
        ],
      },
    } as Record<string, { description: string; achievements: string[] }>,
  },
} as const;

export default translations;
export type TranslationsType = typeof translations;
export type ContentType = typeof translations[Language];

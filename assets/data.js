/* All site content lives here. Edit this file to update the site.
   Text fields are { en, ru } pairs. */
window.SITE_DATA = {
  github: "sksiiiwei",
  links: {
    github: "https://github.com/sksiiiwei",
    telegram: "https://t.me/sksiiiwei",
    tryhackme: "https://tryhackme.com/p/1olyaprivet1",
    email: "mailto:mayakovskaya2021@mail.ru"
  },

  /* Technique categories used to tag writeups. */
  categories: {
    web: { en: "Web", ru: "Web" },
    ad: { en: "Active Directory", ru: "Active Directory" },
    privesc: { en: "Privilege escalation", ru: "Повышение привилегий" },
    containers: { en: "Containers", ru: "Контейнеры" },
    network: { en: "Network services", ru: "Сетевые сервисы" }
  },

  /* Disclosure log on the About tab.
     tone: "ok" (resolved), "info" (found / pending). */
  findings: [
    {
      target: { en: "National messenger", ru: "Национальный мессенджер" },
      issue: { en: "RBAC bypass through video-call WebSockets", ru: "Обход RBAC через WebSocket видеозвонков" },
      status: { en: "Found", ru: "Найдена" },
      tone: "info"
    },
    {
      target: { en: "International logistics platform", ru: "Международная логистическая платформа" },
      issue: { en: "Next.js SSR flaw bypassed the paywall and exposed users' personal data", ru: "Уязвимость SSR в Next.js обходила платный доступ и открывала персональные данные пользователей" },
      status: { en: "Accepted, rewarded", ru: "Принята, вознаграждена" },
      tone: "ok"
    },
    {
      target: { en: "Medical ML project", ru: "Медицинский ML-проект" },
      issue: { en: "MLflow server open without authentication", ru: "MLflow-сервер без аутентификации" },
      status: { en: "Fixed next day", ru: "Устранена на следующий день" },
      tone: "ok"
    },
    {
      target: { en: "Project of a major bank", ru: "Проект крупного банка" },
      issue: { en: "Leaked API token gave access to a paid service", ru: "Утечка API-токена открывала платный доступ к сервису" },
      status: { en: "Accepted, fixed", ru: "Принята, устранена" },
      tone: "ok"
    }
  ],

  /* Case study: a real sequence, so it is numbered. */
  caseSteps: [
    {
      en: "Found an MLflow server with no authentication, used to develop a diagnostic AI.",
      ru: "Найден MLflow-сервер без аутентификации, на котором разрабатывали диагностический ИИ."
    },
    {
      en: "Read the available endpoints without changing anything. They showed the model architectures (RT-DETR, MONAI) and training metrics.",
      ru: "Доступные эндпоинты изучены без изменений на сервере. Они показывали архитектуры моделей (RT-DETR, MONAI) и метрики обучения."
    },
    {
      en: "Used OSINT to tie the cloud setup to a specific research institute and found the people responsible.",
      ru: "С помощью OSINT облачная инфраструктура сопоставлена с конкретным НИИ, найдены ответственные люди."
    },
    {
      en: "Sent a responsible-disclosure report. The vendor fixed it the next day, before data covered by GDPR could leak.",
      ru: "Отправлен отчёт по Responsible Disclosure. Вендор устранил проблему на следующий день, до утечки данных, подпадающих под GDPR."
    }
  ],

  skills: [
    {
      group: { en: "Web and API", ru: "Web и API" },
      items: ["OWASP", "Burp Suite", "REST API", "SQLi", "XSS", "IDOR", "SSRF", "white-box testing", "CVSS"]
    },
    {
      group: { en: "Active Directory", ru: "Active Directory" },
      items: ["BloodHound", "Kerberoasting", "golden/silver ticket", "impacket", "NetExec"]
    },
    {
      group: { en: "AI and ML security", ru: "Безопасность AI/ML" },
      items: ["LLM red teaming", "promptfoo", "MLflow", "pickle deserialization"]
    },
    {
      group: { en: "DFIR and SOC", ru: "DFIR и SOC" },
      items: ["Wireshark", "SIEM", "incident timelines", "malware triage"]
    },
    {
      group: { en: "Linux and tooling", ru: "Linux и инструменты" },
      items: ["Arch Linux", "Bash", "Python", "Nmap", "Metasploit", "Docker", "Git"]
    }
  ],

  /* TryHackMe writeups: https://github.com/sksiiiwei/tryhackme
     cats: any of web, ad, privesc, containers, network. */
  writeups: [
    { name: "Hijack", diff: "easy", file: "🟢Hijack.md", cats: ["web", "network", "privesc"], tech: ["NFS misconfiguration", "FTP", "cookie brute force (Base64, MD5)", "LD_LIBRARY_PATH hijack"] },
    { name: "Opacity", diff: "easy", file: "🟢Opacity.md", cats: ["web", "network", "privesc"], tech: ["SMB enumeration", "file upload filter bypass", "KeePass cracking", "cron privesc"] },
    { name: "Plotted-TMS", diff: "easy", file: "🟢Plotted-TMS.md", cats: ["web", "privesc"], tech: ["SQL injection", "web shell upload", "OpenSSL privesc"] },
    { name: "Proxy", diff: "easy", file: "🟢Proxy.md", cats: ["ad"], tech: ["AD enumeration", "AS-REP roasting", "Kerberoasting", "constrained delegation", "Responder"] },
    { name: "Publisher", diff: "easy", file: "🟢Publisher.md", cats: ["web", "privesc"], tech: ["SPIP RCE", "AppArmor bypass", "SUID reverse engineering in Ghidra"] },
    { name: "Team", diff: "easy", file: "🟢Team.md", cats: ["web", "privesc"], tech: ["subdomain fuzzing", "LFI", "command injection", "cron privesc"] },
    { name: "U.A. High School", diff: "easy", file: "🟢UA_High_School.md", cats: ["web"], tech: ["parameter fuzzing", "PHP RCE", "steganography", "eval filter bypass"] },
    { name: "Lookup", diff: "easy", file: "🟢lookup.md", cats: ["web", "privesc"], tech: ["user enumeration", "brute force", "elFinder RCE", "PATH injection", "sudo look"] },

    { name: "Annie", diff: "medium", file: "🟡Annie.md", cats: ["network", "privesc"], tech: ["AnyDesk exploit", "Linux capabilities", "SSH key cracking"] },
    { name: "Domino", diff: "medium", file: "🟡Domino.md", cats: ["web"], tech: ["token tampering", "IDOR", "fuzzing", "RFI"] },
    { name: "Forward", diff: "medium", file: "🟡Forward.md", cats: ["ad"], tech: ["AD enumeration", "DPAPI and KeePass", "RBCD", "impacket"] },
    { name: "New York Flankees", diff: "medium", file: "🟡New_York_Flankees.md", cats: ["web", "containers"], tech: ["padding oracle (AES-CBC)", "msfvenom", "Docker breakout"] },
    { name: "Oh My WebServer", diff: "medium", file: "🟡Oh_my_webserver.md", cats: ["web", "containers", "privesc"], tech: ["Apache mod_cgi RCE", "OMI", "capabilities", "Docker escape"] },
    { name: "Ollie", diff: "medium", file: "🟡Ollie.md", cats: ["web", "privesc"], tech: ["phpIPAM exploit", "process monitoring", "sudo abuse"] },
    { name: "Umbrella", diff: "medium", file: "🟡Umbrella.md", cats: ["web", "containers"], tech: ["Docker Registry", "Node.js eval RCE", "MD5 cracking", "container breakout"] },
    { name: "VulnNet: Active", diff: "medium", file: "🟡vulnnet.md", cats: ["ad", "network", "privesc"], tech: ["unauthenticated Redis", "NTLMv2 hash theft", "scheduled task hijack", "GodPotato"] },
    { name: "VulnNet: Endgame", diff: "medium", file: "🟡vulnnet_engame.md", cats: ["web", "privesc"], tech: ["SQLi", "TYPO3", "Firefox cache", "OpenSSL capabilities"] }
  ],

  utilities: [
    {
      repo: "safe_analysis_pkl",
      kind: { en: "Python, static analysis", ru: "Python, статический анализ" },
      summary: {
        en: "Checks pickle and PyTorch model files for code that would run on load, without ever loading them. Loading an untrusted model can mean remote code execution, so this runs first.",
        ru: "Проверяет pickle- и PyTorch-файлы на код, который выполнится при загрузке, не загружая их. Загрузка недоверенной модели может привести к RCE, поэтому проверка идёт до неё."
      },
      points: [
        { en: "Reads opcodes with pickletools.genops, so nothing is executed", ru: "Читает опкоды через pickletools.genops, ничего не исполняется" },
        { en: "Flags dangerous imports (os.system, subprocess) and payload strings", ru: "Находит опасные импорты (os.system, subprocess) и строки с нагрузкой" },
        { en: "Scans single files or whole directories; JSON output and exit codes for CI", ru: "Проверяет файл или каталог; JSON-вывод и коды возврата для CI" },
        { en: "No dependencies", ru: "Без зависимостей" }
      ],
      usage: "python safe_analysis_pkl.py model.pkl\npython safe_analysis_pkl.py models/ --json"
    },
    {
      repo: "arp_scanner",
      kind: { en: "Python, scapy", ru: "Python, scapy" },
      summary: {
        en: "Finds live hosts on a local network over ARP and shows each host's IP, MAC address and hardware vendor.",
        ru: "Находит живые хосты в локальной сети по ARP и показывает IP, MAC-адрес и производителя адаптера."
      },
      points: [
        { en: "Scans a subnet or one address; vendor lookup by MAC prefix (OUI)", ru: "Сканирует подсеть или адрес; производитель определяется по префиксу MAC (OUI)" },
        { en: "Configurable timeout and packet interval; checks the range and interface before sending", ru: "Настраиваемые таймаут и интервал; проверяет диапазон и интерфейс до отправки" },
        { en: "The optional --ip-spoof mode affects the network and asks for confirmation first", ru: "Опциональный режим --ip-spoof воздействует на сеть и сначала просит подтверждение" },
        { en: "For networks you are authorized to test", ru: "Только для сетей, на тестирование которых есть разрешение" }
      ],
      usage: "sudo python3 arp_scanner.py \\\n  -t 192.168.1.0/24 -i eth0"
    },
    {
      repo: "forenzicia_of_malware_3day",
      kind: { en: "DFIR case study", ru: "DFIR-разбор" },
      summary: {
        en: "Investigation of a compromised Linux server from a disk image and a network capture, written up as a report with the attacker's timeline.",
        ru: "Расследование взлома Linux-сервера по образу диска и дампу трафика: отчёт с хронологией действий атакующего."
      },
      points: [
        { en: "Wireshark showed an OWASP ZAP scan, then SSH brute force that ended in root access", ru: "В Wireshark видно сканирование OWASP ZAP, затем перебор SSH и доступ под root" },
        { en: "A dropper disguised as an avahi service, started from cron", ru: "Скрипт-дроппер, замаскированный под службу avahi и запускаемый из cron" },
        { en: "A Diamorphine kernel rootkit hiding the malware", ru: "LKM-руткит Diamorphine, скрывающий вредоносное ПО" },
        { en: "Anti-forensics: the attacker cleared auth logs", ru: "Anti-Forensics: злоумышленник зачистил логи авторизации" }
      ],
      usage: "report.md       timeline, IoCs\nlogs.md         attacker commands\nscreenshots.md  Wireshark captures"
    }
  ],

  /* Add url: "https://..." to any item to link its credential. */
  certificates: [
    {
      issuer: "TryHackMe",
      items: [
        { title: "PT1: Junior Penetration Tester", kind: "exam", year: 2026 },
        { title: "Jr Penetration Tester", kind: "path", year: 2026 },
        { title: "AI Security", kind: "path", year: 2026 },
        { title: "Pre Security", kind: "path", year: 2026 }
      ]
    },
    {
      issuer: "Skillfactory",
      items: [
        { title: "White Hat Hacker / Penetration Tester", kind: "course", year: 2026 }
      ]
    },
    {
      issuer: "CTF",
      items: [
        { title: "AcLabs CTF", kind: "ctf", year: 2026 },
        { title: "Love At First Breach CTF", kind: "ctf", year: 2026 }
      ]
    }
  ]
};

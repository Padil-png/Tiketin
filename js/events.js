/* ============================================
   EventHive — Event Data & API
   ============================================ */

// Helper: format currency without depending on i18n
function _formatRp(amount) {
  if (amount === 0) return 'GRATIS';
  return 'Rp ' + amount.toLocaleString('id-ID');
}

// Mock Data — 10 diverse events
const MOCK_EVENTS = [
  {
    id: "evt_1",
    title: "Neon Nights Music Festival 2026",
    category: "Musik",
    date: "2026-08-15",
    endDate: "2026-08-16",
    time: "16:00 - 23:30",
    venue: "Gelora Bung Karno",
    location: "Jakarta",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
    description: "Festival musik elektronik terbesar tahun ini menghadirkan DJ internasional ternama. Rasakan pengalaman tata cahaya neon yang spektakuler dan tata suara kelas dunia.",
    organizer: "LiveNation ID",
    organizerDetails: {
      logo: "https://ui-avatars.com/api/?name=Live+Nation&background=0D8ABC&color=fff",
      bio: "Promotor musik berskala internasional yang berdedikasi untuk menghadirkan pengalaman konser kelas dunia di Indonesia."
    },
    terms: [
      "Tiket yang sudah dibeli tidak dapat dikembalikan (Non-refundable).",
      "Pengunjung wajib berusia 18 tahun ke atas.",
      "Dilarang membawa makanan dan minuman dari luar.",
      "Penyelenggara berhak menolak pengunjung yang melanggar protokol."
    ],
    venueMap: {
      zones: [
        { name: "Main Stage", desc: "Panggung utama headliner" },
        { name: "Second Stage", desc: "Panggung artis pendukung" },
        { name: "Food Court", desc: "Area makan & minum" },
        { name: "VIP Lounge", desc: "Area eksklusif VIP & VVIP" },
        { name: "Merchandise", desc: "Booth merchandise official" },
        { name: "First Aid", desc: "Pos kesehatan & P3K" }
      ]
    },
    status: "approved",
    trending: true,
    tiers: [
      { name: "Festival (Standing)", price: 750000, stock: 5000, benefits: ["Akses 2 Hari", "Area Festival", "F&B Voucher 50k"] },
      { name: "VIP (Seating)", price: 1500000, stock: 1000, benefits: ["Akses 2 Hari", "VIP Seating", "Fast Track Entry"] },
      { name: "VVIP (Lounge)", price: 3500000, stock: 100, benefits: ["Akses 2 Hari", "Lounge Access", "Meet & Greet"] }
    ],
    rundown: [
      { time: "16:00", title: "Open Gate", desc: "Pemeriksaan tiket" },
      { time: "18:00", title: "Opening Act: Local Heroes", desc: "DJ lokal" },
      { time: "20:00", title: "Main Act Part 1", desc: "Artis internasional" },
      { time: "22:00", title: "Headliner", desc: "Puncak acara" }
    ],
    lineup: [
      { name: "Martin Garrix", role: "Headliner", img: "https://ui-avatars.com/api/?name=Martin+Garrix&background=6366f1&color=fff" },
      { name: "Zedd", role: "Co-Headliner", img: "https://ui-avatars.com/api/?name=Zedd&background=8b5cf6&color=fff" },
      { name: "Weird Genius", role: "Opening Act", img: "https://ui-avatars.com/api/?name=Weird+Genius&background=ec4899&color=fff" }
    ]
  },
  {
    id: "evt_2",
    title: "Web3 & AI Summit Jakarta",
    category: "Seminar",
    date: "2026-09-10",
    endDate: "2026-09-11",
    time: "09:00 - 17:00",
    venue: "Jakarta Convention Center",
    location: "Jakarta",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    description: "Konferensi teknologi terbesar yang membahas masa depan Web3 dan Artificial Intelligence. Pelajari tren terbaru dan bangun jaringan dengan para profesional industri.",
    organizer: "TechInAsia",
    organizerDetails: {
      logo: "https://ui-avatars.com/api/?name=Tech+Asia&background=ff3b30&color=fff",
      bio: "Platform media teknologi terkemuka di Asia."
    },
    terms: [
      "Student Pass wajib menunjukkan kartu pelajar aktif.",
      "Sertifikat dikirim via email maks H+7.",
      "Harap menggunakan pakaian rapi (Business Casual)."
    ],
    venueMap: {
      zones: [
        { name: "Main Hall", desc: "Keynote & panel discussion" },
        { name: "Workshop Room A", desc: "Hands-on AI" },
        { name: "Workshop Room B", desc: "Hands-on Web3" },
        { name: "Expo Hall", desc: "Booth startup & sponsor" },
        { name: "Networking Lounge", desc: "Area networking" }
      ]
    },
    speakers: [
      { name: "Dr. Andi Wijaya", role: "Keynote Speaker - AI Ethics", img: "https://ui-avatars.com/api/?name=Andi+Wijaya&background=3b82f6&color=fff" },
      { name: "Sarah Chen", role: "Head of Web3, Binance SEA", img: "https://ui-avatars.com/api/?name=Sarah+Chen&background=f59e0b&color=fff" },
      { name: "Budi Hartono", role: "CTO, GoTo Group", img: "https://ui-avatars.com/api/?name=Budi+Hartono&background=10b981&color=fff" },
      { name: "Dr. Lisa Surjani", role: "AI Researcher, Google", img: "https://ui-avatars.com/api/?name=Lisa+Surjani&background=ef4444&color=fff" }
    ],
    status: "approved",
    trending: true,
    tiers: [
      { name: "Student Pass", price: 250000, stock: 500, benefits: ["Akses 2 Hari", "Sertifikat Digital"] },
      { name: "Professional Pass", price: 850000, stock: 1000, benefits: ["Akses 2 Hari", "Makan Siang", "Networking"] },
      { name: "Corporate Pass", price: 2500000, stock: 200, benefits: ["Akses 2 Hari", "VIP Lunch", "Gala Dinner"] }
    ]
  },
  {
    id: "evt_3",
    title: "Pottery & Mindfulness Workshop",
    category: "Workshop",
    date: "2026-07-12",
    endDate: "2026-07-12",
    time: "10:00 - 14:00",
    venue: "Tanah Liat Studio",
    location: "Bandung",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
    description: "Lepaskan stres dan temukan ketenangan melalui seni keramik. Workshop untuk pemula yang ingin belajar teknik dasar pottery.",
    organizer: "Kala Art",
    organizerDetails: {
      logo: "https://ui-avatars.com/api/?name=Kala+Art&background=8b5cf6&color=fff",
      bio: "Komunitas seni independen yang berfokus pada art therapy."
    },
    terms: [
      "Harga sudah termasuk material dan biaya pembakaran.",
      "Hasil karya diambil 2 minggu setelah acara.",
      "Keterlambatan maks 30 menit."
    ],
    venueMap: {
      zones: [
        { name: "Workshop Area", desc: "Ruang utama praktek pottery" },
        { name: "Kiln Room", desc: "Ruang pembakaran keramik" },
        { name: "Gallery", desc: "Galeri hasil karya" },
        { name: "Pantry", desc: "Area snack & minuman" }
      ]
    },
    speakers: [
      { name: "Rina Artistika", role: "Instruktur Pottery", img: "https://ui-avatars.com/api/?name=Rina+A&background=8b5cf6&color=fff" },
      { name: "Dewi Ayu", role: "Mindfulness Coach", img: "https://ui-avatars.com/api/?name=Dewi+Ayu&background=ec4899&color=fff" }
    ],
    status: "approved",
    trending: false,
    tiers: [
      { name: "Single Pax", price: 350000, stock: 20, benefits: ["Bahan & Alat", "Snack & Drink", "Hasil Karya"] },
      { name: "Couple (2 Pax)", price: 600000, stock: 10, benefits: ["Bahan (2x)", "Snack & Drink", "Hasil Karya"] }
    ]
  },
  {
    id: "evt_4",
    title: "Nusantara Cultural Night",
    category: "Seni & Budaya",
    date: "2026-10-28",
    endDate: "2026-10-28",
    time: "19:00 - 22:00",
    venue: "Candi Prambanan",
    location: "Yogyakarta",
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
    description: "Pertunjukan seni tari dan musik tradisional dari seluruh nusantara dengan latar Candi Prambanan yang megah di malam hari.",
    organizer: "Dinas Pariwisata DIY",
    organizerDetails: {
      logo: "https://ui-avatars.com/api/?name=Dinas+Pariwisata&background=059669&color=fff",
      bio: "Instansi resmi pemerintah yang melestarikan seni budaya lokal."
    },
    terms: [
      "Anak di bawah 5 tahun gratis.",
      "Jaga kebersihan area pelataran candi.",
      "Dilarang menyalakan flash kamera."
    ],
    venueMap: {
      zones: [
        { name: "Panggung Utama", desc: "Pertunjukan tari & musik" },
        { name: "Tribun A", desc: "Tempat duduk bernomor" },
        { name: "Tribun B", desc: "Tempat duduk bebas" },
        { name: "VIP Area", desc: "Area eksklusif" },
        { name: "Souvenir Shop", desc: "Oleh-oleh & merchandise" }
      ]
    },
    lineup: [
      { name: "Sanggar Ramayana", role: "Penampil Utama", img: "https://ui-avatars.com/api/?name=Ramayana&background=059669&color=fff" },
      { name: "Gamelan Sekar Jaya", role: "Musik Pengiring", img: "https://ui-avatars.com/api/?name=Sekar+Jaya&background=d97706&color=fff" },
      { name: "Didik Nini Thowok", role: "Guest Star", img: "https://ui-avatars.com/api/?name=Didik+NT&background=7c3aed&color=fff" }
    ],
    status: "approved",
    trending: true,
    tiers: [
      { name: "Tribun B", price: 150000, stock: 1000, benefits: ["Free Seating"] },
      { name: "Tribun A", price: 250000, stock: 500, benefits: ["Numbered Seating"] },
      { name: "VIP", price: 500000, stock: 200, benefits: ["Best View", "Welcome Drink"] }
    ]
  },
  {
    id: "evt_5",
    title: "Marathon 10K City Run",
    category: "Olahraga",
    date: "2026-07-19",
    endDate: "2026-07-19",
    time: "05:30 - 09:00",
    venue: "Monumen Nasional",
    location: "Jakarta",
    image: "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&w=800&q=80",
    description: "Lomba lari 10K mengelilingi ikon kota Jakarta di Minggu pagi. Terbuka untuk umum dan pelari profesional.",
    organizer: "RunID",
    organizerDetails: {
      logo: "https://ui-avatars.com/api/?name=Run+ID&background=f59e0b&color=fff",
      bio: "Penyelenggara race management ternama di Indonesia."
    },
    terms: [
      "Pendaftaran tidak bisa dialihkan.",
      "Race pack collection diinfokan H-7.",
      "Peserta wajib dalam kondisi prima."
    ],
    venueMap: {
      zones: [
        { name: "Start / Finish", desc: "Depan Monas" },
        { name: "Hydration Station", desc: "Pos minum setiap 2.5 km" },
        { name: "Medical Post", desc: "Pos kesehatan" },
        { name: "Bag Drop", desc: "Penitipan tas" }
      ]
    },
    status: "approved",
    trending: false,
    tiers: [
      { name: "Early Bird", price: 200000, stock: 0, benefits: ["Race Pack", "Medali", "Jersey"] },
      { name: "Normal", price: 250000, stock: 2000, benefits: ["Race Pack", "Medali", "Jersey"] }
    ]
  },
  {
    id: "evt_6",
    title: "Djakarta Warehouse Project 2026",
    category: "Musik",
    date: "2026-12-12",
    endDate: "2026-12-13",
    time: "15:00 - 04:00",
    venue: "JIExpo Kemayoran",
    location: "Jakarta",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=800&q=80",
    description: "DWP kembali dengan lineup spektakuler! Festival musik dance terbesar di Asia Tenggara yang mempertemukan ribuan pecinta musik dari seluruh dunia.",
    organizer: "Ismaya Live",
    organizerDetails: {
      logo: "https://ui-avatars.com/api/?name=Ismaya+Live&background=1e293b&color=fff",
      bio: "Perusahaan entertainment dan lifestyle terdepan di Indonesia."
    },
    terms: [
      "Usia minimum 18 tahun dengan KTP.",
      "Tiket tidak dapat di-refund.",
      "Dilarang membawa senjata tajam dan obat-obatan terlarang."
    ],
    venueMap: {
      zones: [
        { name: "Neon Jungle Stage", desc: "Main stage utama" },
        { name: "Garudha Land Stage", desc: "Stage kedua indoor" },
        { name: "Tropical Paradise", desc: "Stage outdoor" },
        { name: "VIP Village", desc: "Area eksklusif VIP" }
      ]
    },
    lineup: [
      { name: "Skrillex", role: "Headliner", img: "https://ui-avatars.com/api/?name=Skrillex&background=1e293b&color=fff" },
      { name: "Tiësto", role: "Co-Headliner", img: "https://ui-avatars.com/api/?name=Tiesto&background=3b82f6&color=fff" },
      { name: "KSHMR", role: "Main Act", img: "https://ui-avatars.com/api/?name=KSHMR&background=ef4444&color=fff" },
      { name: "Rich Brian", role: "Special Guest", img: "https://ui-avatars.com/api/?name=Rich+Brian&background=f59e0b&color=fff" }
    ],
    status: "approved",
    trending: true,
    tiers: [
      { name: "GA 2-Day", price: 1800000, stock: 8000, benefits: ["Akses 2 Hari", "Area General"] },
      { name: "VIP 2-Day", price: 3500000, stock: 2000, benefits: ["Akses 2 Hari", "VIP Area", "Fast Entry"] },
      { name: "VVIP Table", price: 15000000, stock: 50, benefits: ["Akses 2 Hari", "Private Table", "Bottle Service"] }
    ]
  },
  {
    id: "evt_7",
    title: "Digital Marketing Masterclass",
    category: "Workshop",
    date: "2026-07-26",
    endDate: "2026-07-26",
    time: "09:00 - 16:00",
    venue: "Co-Hive Mega Kuningan",
    location: "Jakarta",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    description: "Workshop intensif sehari penuh tentang strategi digital marketing modern: SEO, Social Media Ads, Content Marketing, dan Analytics. Cocok untuk UMKM dan startup.",
    organizer: "MarketerID Academy",
    organizerDetails: {
      logo: "https://ui-avatars.com/api/?name=Marketer+ID&background=2563eb&color=fff",
      bio: "Platform edukasi digital marketing #1 di Indonesia."
    },
    terms: [
      "Peserta wajib membawa laptop.",
      "Sertifikat diberikan setelah menyelesaikan workshop.",
      "Termasuk makan siang dan coffee break."
    ],
    venueMap: {
      zones: [
        { name: "Main Room", desc: "Ruang presentasi utama" },
        { name: "Breakout Room", desc: "Ruang diskusi kelompok" },
        { name: "Lounge", desc: "Area istirahat & networking" }
      ]
    },
    speakers: [
      { name: "Faisal Rahman", role: "CEO MarketerID, Ex-Google", img: "https://ui-avatars.com/api/?name=Faisal+R&background=2563eb&color=fff" },
      { name: "Amanda Lee", role: "Head of Social Media, Tokopedia", img: "https://ui-avatars.com/api/?name=Amanda+Lee&background=ec4899&color=fff" },
      { name: "Reza Pratama", role: "Performance Marketing Expert", img: "https://ui-avatars.com/api/?name=Reza+P&background=10b981&color=fff" }
    ],
    status: "approved",
    trending: true,
    tiers: [
      { name: "Early Bird", price: 499000, stock: 30, benefits: ["Materi Digital", "Sertifikat", "Lunch"] },
      { name: "Regular", price: 750000, stock: 70, benefits: ["Materi Digital", "Sertifikat", "Lunch", "Recording"] }
    ]
  },
  {
    id: "evt_8",
    title: "Bali Yoga & Wellness Retreat",
    category: "Workshop",
    date: "2026-08-08",
    endDate: "2026-08-10",
    time: "06:00 - 20:00",
    venue: "Ubud Wellness Resort",
    location: "Bali",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    description: "Retreat 3 hari 2 malam di Ubud, Bali. Yoga, meditasi, spa, dan healthy cuisine dalam suasana alam yang damai dan menenangkan.",
    organizer: "ZenLife Bali",
    organizerDetails: {
      logo: "https://ui-avatars.com/api/?name=Zen+Life&background=059669&color=fff",
      bio: "Penyelenggara wellness retreat premium di Bali."
    },
    terms: [
      "Termasuk akomodasi 2 malam.",
      "Pembatalan H-14 mendapat refund 50%.",
      "Peserta membawa perlengkapan yoga sendiri."
    ],
    venueMap: {
      zones: [
        { name: "Yoga Pavilion", desc: "Paviliun yoga terbuka" },
        { name: "Meditation Garden", desc: "Taman meditasi" },
        { name: "Spa House", desc: "Fasilitas spa" },
        { name: "Organic Kitchen", desc: "Area makan sehat" }
      ]
    },
    speakers: [
      { name: "Kadek Surya", role: "Yoga Master, 15 tahun pengalaman", img: "https://ui-avatars.com/api/?name=Kadek+S&background=059669&color=fff" },
      { name: "Dr. Ni Wayan", role: "Holistic Wellness Practitioner", img: "https://ui-avatars.com/api/?name=Ni+Wayan&background=8b5cf6&color=fff" }
    ],
    status: "approved",
    trending: false,
    tiers: [
      { name: "Shared Room", price: 4500000, stock: 20, benefits: ["3H2M", "Yoga Session", "Spa", "All Meals"] },
      { name: "Private Villa", price: 8500000, stock: 5, benefits: ["3H2M", "Private Villa", "Spa", "All Meals", "Personal Coach"] }
    ]
  },
  {
    id: "evt_9",
    title: "Startup Pitch Competition 2026",
    category: "Seminar",
    date: "2026-11-15",
    endDate: "2026-11-15",
    time: "13:00 - 21:00",
    venue: "Surabaya Convention Hall",
    location: "Surabaya",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
    description: "Kompetisi pitch startup terbesar di Jawa Timur! 20 startup terbaik mempresentasikan ide mereka di depan panel investor ternama. Terbuka untuk umum sebagai penonton.",
    organizer: "East Java Startup Hub",
    organizerDetails: {
      logo: "https://ui-avatars.com/api/?name=EJSH&background=f59e0b&color=fff",
      bio: "Komunitas startup dan inkubator bisnis berbasis di Surabaya."
    },
    terms: [
      "Penonton tidak diperkenankan merekam presentasi.",
      "Dress code: Smart Casual.",
      "Hadiah total Rp 500 juta untuk 3 pemenang."
    ],
    venueMap: {
      zones: [
        { name: "Main Stage", desc: "Area presentasi startup" },
        { name: "Investor Lounge", desc: "Area networking investor" },
        { name: "Demo Booth", desc: "Booth demo produk startup" }
      ]
    },
    speakers: [
      { name: "William Tanuwijaya", role: "Juri - Founder Tokopedia", img: "https://ui-avatars.com/api/?name=William+T&background=10b981&color=fff" },
      { name: "Nadiem Makarim", role: "Juri - Founder Gojek", img: "https://ui-avatars.com/api/?name=Nadiem+M&background=3b82f6&color=fff" },
      { name: "Ferry Unardi", role: "Juri - Founder Traveloka", img: "https://ui-avatars.com/api/?name=Ferry+U&background=ef4444&color=fff" }
    ],
    status: "approved",
    trending: true,
    tiers: [
      { name: "Audience", price: 150000, stock: 500, benefits: ["Akses Penonton", "Lunch Box", "Networking"] },
      { name: "VIP Audience", price: 500000, stock: 100, benefits: ["Front Row", "Dinner Gala", "Meet Investors"] }
    ]
  },
  {
    id: "evt_10",
    title: "Bandung Food & Coffee Festival",
    category: "Festival",
    date: "2026-08-22",
    endDate: "2026-08-24",
    time: "10:00 - 22:00",
    venue: "Trans Studio Mall Outdoor",
    location: "Bandung",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
    description: "Festival kuliner dan kopi terbesar di Bandung! 100+ booth makanan, latte art competition, live cooking demo, dan live music setiap malam.",
    organizer: "Bandung Foodies",
    organizerDetails: {
      logo: "https://ui-avatars.com/api/?name=BDG+Foodies&background=f97316&color=fff",
      bio: "Komunitas pecinta kuliner Bandung yang aktif menyelenggarakan festival makanan."
    },
    terms: [
      "Tiket berlaku untuk 1 hari saja.",
      "Anak di bawah 12 tahun gratis.",
      "Kupon makanan dijual terpisah di dalam venue."
    ],
    venueMap: {
      zones: [
        { name: "Food Street", desc: "100+ booth makanan" },
        { name: "Coffee Corner", desc: "Specialty coffee booth" },
        { name: "Latte Art Stage", desc: "Kompetisi barista" },
        { name: "Music Stage", desc: "Live musik malam hari" },
        { name: "Kids Zone", desc: "Area bermain anak" }
      ]
    },
    status: "approved",
    trending: true,
    tiers: [
      { name: "Daily Pass", price: 50000, stock: 3000, benefits: ["Akses 1 Hari", "Welcome Drink"] },
      { name: "3-Day Pass", price: 120000, stock: 1000, benefits: ["Akses 3 Hari", "Welcome Drink", "Tote Bag"] },
      { name: "Foodie Pass", price: 250000, stock: 500, benefits: ["Akses 3 Hari", "Food Voucher 100k", "Priority Queue"] }
    ]
  }
];

// ===== SET DATA IMMEDIATELY =====
try {
  localStorage.setItem('eventhive_events_v3', JSON.stringify(MOCK_EVENTS));
} catch(e) {
  console.warn('localStorage not available');
}

window.api = {
  getAllEvents: function() {
    try {
      var data = JSON.parse(localStorage.getItem('eventhive_events_v3'));
      return (data && data.length > 0) ? data : MOCK_EVENTS;
    } catch (e) {
      return MOCK_EVENTS;
    }
  },

  getPublicEvents: function() {
    return this.getAllEvents().filter(function(e) { return e.status === 'approved'; });
  },

  getEventById: function(id) {
    return this.getAllEvents().find(function(e) { return e.id === id; });
  },

  getUpcomingEvents: function(limit) {
    limit = limit || 5;
    var events = this.getPublicEvents();
    var today = new Date();
    events = events.filter(function(e) { return new Date(e.date) >= today; });
    events.sort(function(a, b) { return new Date(a.date) - new Date(b.date); });
    return events.slice(0, limit);
  },
  
  getCities: function() {
    var events = this.getPublicEvents();
    var citySet = {};
    events.forEach(function(e) {
      var city = e.location.split(',')[0].trim();
      citySet[city] = true;
    });
    return Object.keys(citySet);
  },
  
  getEventsByCity: function(city) {
    return this.getPublicEvents().filter(function(e) {
      return e.location.split(',')[0].trim().toLowerCase() === city.toLowerCase();
    });
  },

  getEventsByUser: function(userId) {
    return this.getAllEvents().filter(function(e) { return e.userId === userId; });
  },

  searchEvents: function(query, category, dateFilter, sortBy) {
    query = query || "";
    category = category || "all";
    dateFilter = dateFilter || "all";
    sortBy = sortBy || "newest";
    
    var events = this.getPublicEvents();
    
    if (category !== "all") {
      events = events.filter(function(e) { return e.category === category; });
    }
    
    if (query.trim() !== "") {
      var q = query.toLowerCase();
      events = events.filter(function(e) {
        return e.title.toLowerCase().indexOf(q) !== -1 || 
               e.organizer.toLowerCase().indexOf(q) !== -1 ||
               e.location.toLowerCase().indexOf(q) !== -1 ||
               e.category.toLowerCase().indexOf(q) !== -1;
      });
    }

    if (dateFilter !== "all") {
      var today = new Date();
      today.setHours(0,0,0,0);
      events = events.filter(function(e) {
        var eventDate = new Date(e.date);
        eventDate.setHours(0,0,0,0);
        if (dateFilter === "today") {
          return eventDate.getTime() === today.getTime();
        } else if (dateFilter === "this_week") {
          var endOfWeek = new Date(today);
          endOfWeek.setDate(today.getDate() + 7);
          return eventDate >= today && eventDate <= endOfWeek;
        } else if (dateFilter === "this_month") {
          return eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();
        }
        return true;
      });
    }
    
    if (sortBy === "newest") {
      events.sort(function(a, b) { return new Date(b.date) - new Date(a.date); });
    } else if (sortBy === "price_asc") {
      events.sort(function(a, b) { return a.tiers[0].price - b.tiers[0].price; });
    } else if (sortBy === "price_desc") {
      events.sort(function(a, b) { return b.tiers[0].price - a.tiers[0].price; });
    } else if (sortBy === "date_asc") {
      events.sort(function(a, b) { return new Date(a.date) - new Date(b.date); });
    } else if (sortBy === "date_desc") {
      events.sort(function(a, b) { return new Date(b.date) - new Date(a.date); });
    }
    
    return events;
  },

  formatDate: function(dateStr) {
    try {
      var lang = (window.i18n && window.i18n.getLang) ? window.i18n.getLang() : 'id';
      var date = new Date(dateStr);
      return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(date);
    } catch(e) {
      return dateStr;
    }
  },
  
  getStartingPrice: function(tiers) {
    if (!tiers || tiers.length === 0) return 0;
    return Math.min.apply(null, tiers.map(function(t) { return t.price; }));
  }
};

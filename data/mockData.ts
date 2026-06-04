// Mock data in Bengali for all DNCC application types

export interface HoldingApplication {
  id: string;
  applicationNumber: string;
  applicantName: string;
  fatherName: string;
  motherName: string;
  spouseName: string;
  mobile: string;
  nid: string;
  email: string;
  houseNo: string;
  zone: string;
  ward: string;
  sector: string;
  area: string;
  road: string;
  date: string;
  status: 'পেন্ডিং' | 'অনুমোদিত' | 'প্রত্যাখ্যাত' | 'প্রক্রিয়াধীন';
}

export interface TradeLicenseApplication {
  id: string;
  applicationNumber: string;
  licenseNo: string;
  businessName: string;
  businessType1: string;
  businessType2: string;
  businessAddress: string;
  houseNo: string;
  zone: string;
  ward: string;
  sector: string;
  area: string;
  road: string;
  applicantName: string;
  mobile: string;
  capital: string;
  licenseFee: string;
  financialYear: string;
  date: string;
  status: 'পেন্ডিং' | 'অনুমোদিত' | 'প্রত্যাখ্যাত' | 'প্রক্রিয়াধীন';
}

export interface NamjariApplication {
  id: string;
  applicationNumber: string;
  applicantName: string;
  fatherName: string;
  motherName: string;
  mobile: string;
  nid: string;
  houseNo: string;
  zone: string;
  ward: string;
  sector: string;
  area: string;
  road: string;
  date: string;
  status: 'পেন্ডিং' | 'অনুমোদিত' | 'প্রত্যাখ্যাত' | 'প্রক্রিয়াধীন';
}

export interface NayabadiApplication {
  id: string;
  applicationNumber: string;
  applicantName: string;
  fatherName: string;
  motherName: string;
  mobile: string;
  houseNo: string;
  zone: string;
  ward: string;
  sector: string;
  area: string;
  road: string;
  date: string;
  status: 'পেন্ডিং' | 'অনুমোদিত' | 'প্রত্যাখ্যাত' | 'প্রক্রিয়াধীন';
}

export interface FreedomFighterApplication {
  id: string;
  applicationNumber: string;
  applicantName: string;
  fatherName: string;
  motherName: string;
  mobile: string;
  certificateNo: string;
  houseNo: string;
  zone: string;
  ward: string;
  sector: string;
  area: string;
  road: string;
  date: string;
  status: 'পেন্ডিং' | 'অনুমোদিত' | 'প্রত্যাখ্যাত' | 'প্রক্রিয়াধীন';
}

export interface ChangeTLApplication {
  id: string;
  applicationNumber: string;
  tradeLicenseNo: string;
  docketNo: string;
  changeReason: string;
  nameChange: string;
  addressChange: string;
  date: string;
  status: 'পেন্ডিং' | 'অনুমোদিত' | 'প্রত্যাখ্যাত' | 'প্রক্রিয়াধীন';
}

// --- Holding Tax Applications ---
export const holdingApplications: HoldingApplication[] = [
  {
    id: '1',
    applicationNumber: 'NH-২০২৬-০০১৪৫',
    applicantName: 'মোঃ আব্দুল করিম',
    fatherName: 'মৃত মোঃ আব্দুল জলিল',
    motherName: 'মোসাঃ আয়েশা খাতুন',
    spouseName: 'মোসাঃ ফাতেমা বেগম',
    mobile: '০১৭১২৩৪৫৬৭৮',
    nid: '১৯৮৭৬৫৪৩২১০৯৮',
    email: 'abdul.karim@email.com',
    houseNo: '১২/এ',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-১৯',

    sector: 'সেক্টর-১',

    area: 'বনানী',

    road: 'রোড নং- ০৮',
    date: '2026-01-15',
    status: 'অনুমোদিত',
  },
  {
    id: '2',
    applicationNumber: 'NH-২০২৬-০০১৪৬',
    applicantName: 'মোসাঃ রহিমা বেগম',
    fatherName: 'মৃত মোঃ আলী আকবর',
    motherName: 'মোসাঃ নূরজাহান',
    spouseName: 'মোঃ শফিকুল ইসলাম',
    mobile: '০১৮১২৩৪৫৬৭৮',
    nid: '১৯৯০১২৩৪৫৬৭৮৯',
    email: 'rahima.begum@email.com',
    houseNo: '৪৫/বি',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-২০',

    sector: 'সেক্টর-১',

    area: 'গুলশান',

    road: 'রোড নং- ১১',
    date: '2026-01-20',
    status: 'প্রক্রিয়াধীন',
  },
  {
    id: '3',
    applicationNumber: 'NH-২০২৬-০০১৪৭',
    applicantName: 'মোঃ কামরুল হাসান',
    fatherName: 'মোঃ শামসুল হক',
    motherName: 'মোসাঃ হাসিনা বেগম',
    spouseName: 'মোসাঃ নাসরিন সুলতানা',
    mobile: '০১৯১২৩৪৫৬৭৮',
    nid: '১৯৯২৩৪৫৬৭৮৯০১',
    email: 'kamrul.hasan@email.com',
    houseNo: '৭/সি',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৩৫',

    sector: 'সেক্টর-১',

    area: 'ধানমন্ডি',

    road: 'রোড নং- ১৭',
    date: '2026-02-03',
    status: 'পেন্ডিং',
  },
  {
    id: '4',
    applicationNumber: 'NH-২০২৬-০০১৪৮',
    applicantName: 'মোঃ রফিকুল ইসলাম',
    fatherName: 'মৃত মোঃ সিরাজুল ইসলাম',
    motherName: 'মোসাঃ কামেলা খাতুন',
    spouseName: 'মোসাঃ রুবি আক্তার',
    mobile: '০১৬১২৩৪৫৬৭৮',
    nid: '১৯৮৫৪৩২১০৯৮৭৬',
    email: 'rafiq.islam@email.com',
    houseNo: '২৩/ডি',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০৬',

    sector: 'সেক্টর-১',

    area: 'মিরপুর',

    road: 'রোড নং- ০৫',
    date: '2026-02-10',
    status: 'অনুমোদিত',
  },
  {
    id: '5',
    applicationNumber: 'NH-২০২৬-০০১৪৯',
    applicantName: 'মোসাঃ সারা খান',
    fatherName: 'মোঃ আনোয়ার হোসেন খান',
    motherName: 'মোসাঃ জাকিয়া সুলতানা',
    spouseName: '',
    mobile: '০১৫১২৩৪৫৬৭৮',
    nid: '১৯৯৫৬৭৮৯০১২৩৪',
    email: 'sara.khan@email.com',
    houseNo: '৫৬/এ',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০১',

    sector: 'সেক্টর-১',

    area: 'উত্তরা',

    road: 'রোড নং- ২৪',
    date: '2026-02-18',
    status: 'প্রত্যাখ্যাত',
  },
  {
    id: '6',
    applicationNumber: 'NH-২০২৬-০০১৫০',
    applicantName: 'মোঃ তানভীর আহমেদ',
    fatherName: 'মোঃ নজরুল ইসলাম',
    motherName: 'মোসাঃ রহিমা আক্তার',
    spouseName: 'মোসাঃ তানিয়া ইয়াসমিন',
    mobile: '০১৪১২৩৪৫৬৭৮',
    nid: '১৯৯১১২২৩৩৪৪৫৫',
    email: 'tanvir.ahmed@email.com',
    houseNo: '৩৪/বি',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৩৩',

    sector: 'সেক্টর-১',

    area: 'মোহাম্মদপুর',

    road: 'রোড নং- ১১',
    date: '2026-03-01',
    status: 'প্রক্রিয়াধীন',
  },
  {
    id: '7',
    applicationNumber: 'NH-২০২৬-০০১৫১',
    applicantName: 'মোঃ জাহিদ হোসেন',
    fatherName: 'মোঃ আবুল কালাম',
    motherName: 'মোসাঃ মাহমুদা বেগম',
    spouseName: 'মোসাঃ সুমাইয়া আক্তার',
    mobile: '০১৩১২৩৪৫৬৭৮',
    nid: '১৯৯৩৪৪৫৫৬৬৭৭৮',
    email: 'zahid.hossain@email.com',
    houseNo: '১২/সি',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৩৪',

    sector: 'সেক্টর-১',

    area: 'শ্যামলী',

    road: 'রোড নং- ০৯',
    date: '2026-03-05',
    status: 'অনুমোদিত',
  },
  {
    id: '8',
    applicationNumber: 'NH-২০২৬-০০১৫২',
    applicantName: 'মোসাঃ নাসরিন জাহান',
    fatherName: 'মৃত মোঃ আব্দুল মান্নান',
    motherName: 'মোসাঃ আফিয়া বেগম',
    spouseName: 'মোঃ মোস্তফা কামাল',
    mobile: '০১৭৯৮৭৬৫৪৩২১',
    nid: '১৯৮৮৫৫৬৬৭৭৮৮৯',
    email: 'nasrin.jahan@email.com',
    houseNo: '৬৭/এ',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০৭',

    sector: 'সেক্টর-১',

    area: 'কল্যাণপুর',

    road: 'রোড নং- ০৩',
    date: '2026-03-12',
    status: 'পেন্ডিং',
  },
  {
    id: '9',
    applicationNumber: 'NH-২০২৬-০০১৫৩',
    applicantName: 'মোঃ শহিদুল্লাহ',
    fatherName: 'মোঃ আব্দুল ওহাব',
    motherName: 'মোসাঃ জাহানারা বেগম',
    spouseName: 'মোসাঃ লুৎফা আক্তার',
    mobile: '০১৭১১২২৩৩৪৪',
    nid: '১৯৯০৬৬৭৭৮৮৯৯০',
    email: 'shahidullah@email.com',
    houseNo: '৫/বি',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৩৬',

    sector: 'সেক্টর-১',

    area: 'নিউ মার্কেট',

    road: 'রোড নং- ১৪',
    date: '2026-03-18',
    status: 'অনুমোদিত',
  },
  {
    id: '10',
    applicationNumber: 'NH-২০২৬-০০১৫৪',
    applicantName: 'মোসাঃ রেহানা বেগম',
    fatherName: 'মৃত মোঃ শামসুদ্দিন',
    motherName: 'মোসাঃ আখতারিয়া বেগম',
    spouseName: 'মোঃ গোলাম মোস্তফা',
    mobile: '০১৮২২৩৩৪৪৫৫',
    nid: '১৯৮৪১১২২৩৩৪৪৫',
    email: 'rehana.begum@email.com',
    houseNo: '২৮/সি',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৩৫',

    sector: 'সেক্টর-১',

    area: 'ফার্মগেট',

    road: 'রোড নং- ০৬',
    date: '2026-03-25',
    status: 'প্রক্রিয়াধীন',
  },
  {
    id: '11',
    applicationNumber: 'NH-২০২৬-০০১৫৫',
    applicantName: 'মোঃ আনিসুল হক',
    fatherName: 'মোঃ জহিরুল ইসলাম',
    motherName: 'মোসাঃ মাহবুবা খাতুন',
    spouseName: 'মোসাঃ শারমিন সুলতানা',
    mobile: '০১৯৩৩৪৪৫৫৬৬',
    nid: '১৯৯২৫৫৬৬৭৭৮৮৯',
    email: 'anisul.haque@email.com',
    houseNo: '৪১/এ',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-২৭',

    sector: 'সেক্টর-১',

    area: 'কারওয়ান বাজার',

    road: 'রোড নং- ১৮',
    date: '2026-04-02',
    status: 'পেন্ডিং',
  },
  {
    id: '12',
    applicationNumber: 'NH-২০২৬-০০১৫৬',
    applicantName: 'মোসাঃ ফারজানা ইয়াসমিন',
    fatherName: 'মোঃ মোয়াজ্জেম হোসেন',
    motherName: 'মোসাঃ নুরুন্নাহার',
    spouseName: '',
    mobile: '০১৫৪৪৫৫৬৬৭৭',
    nid: '১৯৯৬৭৭৮৮৯৯০০১',
    email: 'farzana.yasmin@email.com',
    houseNo: '১৬/ডি',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-২৮',

    sector: 'সেক্টর-১',

    area: 'তেজগাঁও',

    road: 'রোড নং- ২১',
    date: '2026-04-08',
    status: 'প্রত্যাখ্যাত',
  },
  {
    id: '13',
    applicationNumber: 'NH-২০২৬-০০১৫৭',
    applicantName: 'মোঃ মোস্তাফিজুর রহমান',
    fatherName: 'মৃত মোঃ আমীনুল হক',
    motherName: 'মোসাঃ হাজেরা বেগম',
    spouseName: 'মোসাঃ রুবাইয়াত হোসাইন',
    mobile: '০১৬৫৫৬৬৭৭৮৮',
    nid: '১৯৮৯৮৮৯৯০০১১২',
    email: 'mostafiz.rahman@email.com',
    houseNo: '৩৩/বি',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-৩০',

    sector: 'সেক্টর-১',

    area: 'রমনা',

    road: 'রোড নং- ০৯',
    date: '2026-04-15',
    status: 'অনুমোদিত',
  },
];

// --- Namjari (Name Transfer) Applications ---
export const namjariApplications: NamjariApplication[] = [
  {
    id: '1',
    applicationNumber: 'NJ-২০২৬-০০০৮৭',
    applicantName: 'মোঃ সোহেল রানা',
    fatherName: 'মোঃ আব্দুল হালিম',
    motherName: 'মোসাঃ রাবেয়া খাতুন',
    mobile: '০১৭২৩৪৫৬৭৮৯',
    nid: '১৯৮৯১২৩৪৫৬৭৮৯',
    houseNo: '১০/এ',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-১৮',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৪',
    date: '2026-01-10',
    status: 'অনুমোদিত',
  },
  {
    id: '2',
    applicationNumber: 'NJ-২০২৬-০০০৮৮',
    applicantName: 'মোসাঃ হাসিনা পারভীন',
    fatherName: 'মৃত মোঃ গিয়াস উদ্দিন',
    motherName: 'মোসাঃ লাইলী বেগম',
    mobile: '০১৮৩৪৫৬৭৮৯০১',
    nid: '১৯৯১২২৩৩৪৪৫৫৬',
    houseNo: '২২/বি',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-২১',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৭',
    date: '2026-01-25',
    status: 'প্রক্রিয়াধীন',
  },
  {
    id: '3',
    applicationNumber: 'NJ-২০২৬-০০০৮৯',
    applicantName: 'মোঃ ইমরান হোসেন',
    fatherName: 'মোঃ আবু বকর',
    motherName: 'মোসাঃ নাজমুন নাহার',
    mobile: '০১৯৪৫৬৭৮৯০১২',
    nid: '১৯৯৪৫৬৭৮৯০১২৩',
    houseNo: '৩১/সি',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০৫',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ১২',
    date: '2026-02-08',
    status: 'পেন্ডিং',
  },
  {
    id: '4',
    applicationNumber: 'NJ-২০২৬-০০০৯০',
    applicantName: 'মোঃ আশরাফুল হক',
    fatherName: 'মৃত মোঃ দেলোয়ার হোসেন',
    motherName: 'মোসাঃ মোমেনা খাতুন',
    mobile: '০১৬৫৬৭৮৯০১২৩',
    nid: '১৯৮৬৭৮৯০১২৩৪৫',
    houseNo: '৪৮/ডি',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৩৬',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ১৬',
    date: '2026-02-20',
    status: 'অনুমোদিত',
  },
  {
    id: '5',
    applicationNumber: 'NJ-২০২৬-০০০৯১',
    applicantName: 'মোসাঃ রুবিনা আক্তার',
    fatherName: 'মোঃ আলাউদ্দিন',
    motherName: 'মোসাঃ জোবাইদা খাতুন',
    mobile: '০১৫৬৭৮৯০১২৩৪',
    nid: '১৯৯০০১১২২৩৩৪',
    houseNo: '১৫/এ',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-১৯',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০২',
    date: '2026-03-02',
    status: 'প্রত্যাখ্যাত',
  },
  {
    id: '6',
    applicationNumber: 'NJ-২০২৬-০০০৯২',
    applicantName: 'মোঃ মাহবুবুল আলম',
    fatherName: 'মোঃ সিরাজুল মোস্তফা',
    motherName: 'মোসাঃ জাহানারা খাতুন',
    mobile: '০১৭৫৬৭৮৯০১২',
    nid: '১৯৮৮৩৩৪৪৫৫৬৬৭',
    houseNo: '৯/বি',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০৭',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ১৯',
    date: '2026-03-10',
    status: 'অনুমোদিত',
  },
  {
    id: '7',
    applicationNumber: 'NJ-২০২৬-০০০৯৩',
    applicantName: 'মোসাঃ শামীমা আক্তার',
    fatherName: 'মৃত মোঃ রফিকুল হোসেন',
    motherName: 'মোসাঃ মোসলেমা খাতুন',
    mobile: '০১৮৬৭৮৯০১২৩',
    nid: '১৯৯১৪৪৫৫৬৬৭৭৮',
    houseNo: '২৬/সি',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৩৩',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৪',
    date: '2026-03-18',
    status: 'প্রক্রিয়াধীন',
  },
  {
    id: '8',
    applicationNumber: 'NJ-২০২৬-০০০৯৪',
    applicantName: 'মোঃ সাইফুল ইসলাম ভূঁইয়া',
    fatherName: 'মোঃ আব্দুল মতিন ভূঁইয়া',
    motherName: 'মোসাঃ রহিমা বেগম',
    mobile: '০১৯৭৮৯০১২৩৪',
    nid: '১৯৯৩৫৫৬৬৭৭৮৮৯',
    houseNo: '৫১/ডি',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-১২',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ১১',
    date: '2026-03-25',
    status: 'পেন্ডিং',
  },
  {
    id: '9',
    applicationNumber: 'NJ-২০২৬-০০০৯৫',
    applicantName: 'মোসাঃ নাজমুল হোসনা বেগম',
    fatherName: 'মোঃ তোফাজ্জল হোসেন',
    motherName: 'মোসাঃ লাইলী আক্তার',
    mobile: '০১৬৮৯০১২৩৪৫',
    nid: '১৯৮৬৬৬৭৭৮৮৯৯০',
    houseNo: '৩৭/এ',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০১',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৮',
    date: '2026-04-03',
    status: 'প্রত্যাখ্যাত',
  },
  {
    id: '10',
    applicationNumber: 'NJ-২০২৬-০০০৯৬',
    applicantName: 'মোঃ আবুল কালাম আজাদ',
    fatherName: 'মৃত মোঃ আব্দুল জব্বার',
    motherName: 'মোসাঃ আমেনা খাতুন',
    mobile: '০১৫৯০১২৩৪৫৬',
    nid: '১৯৯০৭৭৮৮৯৯০০১',
    houseNo: '১৪/বি',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-২০',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ১৫',
    date: '2026-04-10',
    status: 'অনুমোদিত',
  },
];

// --- Nayabadi (New Settlement) Applications ---
export const nayabadiApplications: NayabadiApplication[] = [
  {
    id: '1',
    applicationNumber: 'NB-২০২৬-০০০৩৪',
    applicantName: 'মোঃ রিয়াজুল ইসলাম',
    fatherName: 'মোঃ আব্দুল মজিদ',
    motherName: 'মোসাঃ মরিয়ম বেগম',
    mobile: '০১৭৩৪৫৬৭৮৯০১',
    houseNo: '৮/বি',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০৩',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৬',
    date: '2026-01-08',
    status: 'অনুমোদিত',
  },
  {
    id: '2',
    applicationNumber: 'NB-২০২৬-০০০৩৫',
    applicantName: 'মোসাঃ সাবরিনা ইয়াসমিন',
    fatherName: 'মোঃ হাবিবুর রহমান',
    motherName: 'মোসাঃ রাবেয়া বেগম',
    mobile: '০১৮৪৫৬৭৮৯০১২',
    houseNo: '১৯/সি',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০৮',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ১৩',
    date: '2026-01-22',
    status: 'প্রক্রিয়াধীন',
  },
  {
    id: '3',
    applicationNumber: 'NB-২০২৬-০০০৩৬',
    applicantName: 'মোঃ শাহিদুল ইসলাম',
    fatherName: 'মৃত মোঃ তোফাজ্জল হোসেন',
    motherName: 'মোসাঃ আমেনা খাতুন',
    mobile: '০১৯৫৬৭৮৯০১২৩',
    houseNo: '৪২/এ',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-১২',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ১০',
    date: '2026-02-05',
    status: 'পেন্ডিং',
  },
  {
    id: '4',
    applicationNumber: 'NB-২০২৬-০০০৩৭',
    applicantName: 'মোঃ আল আমিন',
    fatherName: 'মোঃ আনিসুর রহমান',
    motherName: 'মোসাঃ কামরুন নাহার',
    mobile: '০১৬৬৭৮৯০১২৩৪',
    houseNo: '৫৫/ডি',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৩৩',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০১',
    date: '2026-02-15',
    status: 'অনুমোদিত',
  },
  {
    id: '5',
    applicationNumber: 'NB-২০২৬-০০০৩৮',
    applicantName: 'মোসাঃ হাসিনা বেগম',
    fatherName: 'মৃত মোঃ আব্দুল গনি',
    motherName: 'মোসাঃ নূরজাহান বেগম',
    mobile: '০১৭৬৭৮৯০১২৩',
    houseNo: '১১/এ',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০৩',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৩',
    date: '2026-02-22',
    status: 'প্রক্রিয়াধীন',
  },
  {
    id: '6',
    applicationNumber: 'NB-২০২৬-০০০৩৯',
    applicantName: 'মোঃ সোহরাব হোসেন',
    fatherName: 'মোঃ আনোয়ার হোসেন',
    motherName: 'মোসাঃ মালেকা বেগম',
    mobile: '০১৮৭৮৯০১২৩৪',
    houseNo: '৩৮/বি',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-১৯',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৭',
    date: '2026-03-05',
    status: 'পেন্ডিং',
  },
  {
    id: '7',
    applicationNumber: 'NB-২০২৬-০০০৪০',
    applicantName: 'মোঃ জাহাঙ্গীর আলম',
    fatherName: 'মৃত মোঃ শামসুল হুদা',
    motherName: 'মোসাঃ আয়েশা খাতুন',
    mobile: '০১৯৮৯০১২৩৪৫',
    houseNo: '৬২/সি',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০৬',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ১২',
    date: '2026-03-12',
    status: 'অনুমোদিত',
  },
  {
    id: '8',
    applicationNumber: 'NB-২০২৬-০০০৪১',
    applicantName: 'মোসাঃ রুবিনা ইয়াসমিন',
    fatherName: 'মোঃ মোস্তফা কামাল',
    motherName: 'মোসাঃ জাকিয়া খাতুন',
    mobile: '০১৬৯০১২৩৪৫৬',
    houseNo: '৭/ডি',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৩৫',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৯',
    date: '2026-03-20',
    status: 'প্রত্যাখ্যাত',
  },
  {
    id: '9',
    applicationNumber: 'NB-২০২৬-০০০৪২',
    applicantName: 'মোঃ আব্দুল্লাহ আল মামুন',
    fatherName: 'মোঃ মোজাম্মেল হক',
    motherName: 'মোসাঃ ফাতেমা খাতুন',
    mobile: '০১৫১১২২৩৩৪৪',
    houseNo: '৪৪/এ',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-২০',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ১৫',
    date: '2026-03-28',
    status: 'প্রক্রিয়াধীন',
  },
];

// --- Freedom Fighter Applications ---
export const freedomFighterApplications: FreedomFighterApplication[] = [
  {
    id: '1',
    applicationNumber: 'FF-২০২৬-০০০১২',
    applicantName: 'মোঃ আব্দুল হামিদ',
    fatherName: 'মৃত মোঃ এমান আলী',
    motherName: 'মোসাঃ মোসলেমা খাতুন',
    mobile: '০১৭৪৫৬৭৮৯০১২',
    certificateNo: 'মুক্তি-৭৬৫৪',
    houseNo: '১৪/এ',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-১৯',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৭',
    date: '2026-01-05',
    status: 'অনুমোদিত',
  },
  {
    id: '2',
    applicationNumber: 'FF-২০২৬-০০০১৩',
    applicantName: 'মোঃ কাদের সিকদার',
    fatherName: 'মৃত মোঃ রহিম সিকদার',
    motherName: 'মোসাঃ রোকেয়া বেগম',
    mobile: '০১৮৫৬৭৮৯০১২৩',
    certificateNo: 'মুক্তি-৩৪৫৬',
    houseNo: '২৭/বি',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০৬',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৩',
    date: '2026-01-18',
    status: 'প্রক্রিয়াধীন',
  },
  {
    id: '3',
    applicationNumber: 'FF-২০২৬-০০০১৪',
    applicantName: 'মোঃ মোজাম্মেল হোসেন',
    fatherName: 'মৃত মোঃ ছোট মিয়া',
    motherName: 'মোসাঃ আনোয়ারা বেগম',
    mobile: '০১৯৬৭৮৯০১২৩৪',
    certificateNo: 'মুক্তি-৯৮৭৬',
    houseNo: '৩৬/সি',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৩৫',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ১১',
    date: '2026-02-01',
    status: 'পেন্ডিং',
  },
  {
    id: '4',
    applicationNumber: 'FF-২০২৬-০০০১৫',
    applicantName: 'মোঃ আবুল কালাম আজাদ',
    fatherName: 'মৃত মোঃ সিরাজ মিয়া',
    motherName: 'মোসাঃ হালিমা বেগম',
    mobile: '০১৬৭৮৯০১২৩৪৫',
    certificateNo: 'মুক্তি-১২৩৪',
    houseNo: '৪৪/ডি',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০৮',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৫',
    date: '2026-02-12',
    status: 'অনুমোদিত',
  },
  {
    id: '5',
    applicationNumber: 'FF-২০২৬-০০০১৬',
    applicantName: 'মোঃ গোলাম মোস্তফা',
    fatherName: 'মৃত মোঃ আব্দুল হাকিম',
    motherName: 'মোসাঃ মাহফুজা খাতুন',
    mobile: '০১৭৮৯০১২৩৪৫',
    certificateNo: 'মুক্তি-৪৫৬৭',
    houseNo: '১৮/এ',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-১৯',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০২',
    date: '2026-02-25',
    status: 'প্রক্রিয়াধীন',
  },
  {
    id: '6',
    applicationNumber: 'FF-২০২৬-০০০১৭',
    applicantName: 'মোঃ আব্দুল কাদের',
    fatherName: 'মৃত মোঃ হাবিবুল্লাহ',
    motherName: 'মোসাঃ নাজনীন বেগম',
    mobile: '০১৮৯০১২৩৪৫৬',
    certificateNo: 'মুক্তি-২৩৪৫',
    houseNo: '৩১/বি',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৩৫',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৮',
    date: '2026-03-08',
    status: 'পেন্ডিং',
  },
  {
    id: '7',
    applicationNumber: 'FF-২০২৬-০০০১৮',
    applicantName: 'মোঃ মোহাম্মদ আলী',
    fatherName: 'মৃত মোঃ ইদ্রিস আলী',
    motherName: 'মোসাঃ সাহেদা বেগম',
    mobile: '০১৯০১২৩৪৫৬৭',
    certificateNo: 'মুক্তি-৬৭৮৯',
    houseNo: '৫৩/সি',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০৬',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ১৩',
    date: '2026-03-15',
    status: 'অনুমোদিত',
  },
  {
    id: '8',
    applicationNumber: 'FF-২০২৬-০০০১৯',
    applicantName: 'মোঃ আবুল হোসেন',
    fatherName: 'মৃত মোঃ লাল মিয়া',
    motherName: 'মোসাঃ কুলসুম বেগম',
    mobile: '০১৬১১২২৩৩৪৪',
    certificateNo: 'মুক্তি-৮৯০১',
    houseNo: '৭/ডি',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৩৩',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৬',
    date: '2026-03-22',
    status: 'প্রত্যাখ্যাত',
  },
  {
    id: '9',
    applicationNumber: 'FF-২০২৬-০০০২০',
    applicantName: 'মোঃ নুরুল ইসলাম',
    fatherName: 'মৃত মোঃ আব্দুল হান্নান',
    motherName: 'মোসাঃ হালিমা আক্তার',
    mobile: '০১৫২২৩৩৪৪৫৫',
    certificateNo: 'মুক্তি-৫৬৭৮',
    houseNo: '২৫/এ',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-১২',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ১০',
    date: '2026-04-01',
    status: 'প্রক্রিয়াধীন',
  },
];

// --- New Trade License Applications ---
export const newTradeLicenseApplications: TradeLicenseApplication[] = [
  {
    id: '1',
    applicationNumber: 'NTL-২০২৬-০০২৩৪',
    licenseNo: 'TL-০৩৪৫৬',
    businessName: 'আল-আমিন জেনারেল স্টোর',
    businessType1: 'খুচরা বিক্রয়',
    businessType2: 'মুদি দোকান',
    businessAddress: 'বনানী, ঢাকা',
    houseNo: '১০/এ',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-১৯',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ১১',

    applicantName: 'মোঃ আল আমিন',

    mobile: '০১৭৫৬৭৮৯০১২',
    capital: '৫,০০,০০০ টাকা',
    licenseFee: '২,৫০০ টাকা',
    financialYear: '২০২৫-২০২৬',
    date: '2026-01-12',
    status: 'অনুমোদিত',
  },
  {
    id: '2',
    applicationNumber: 'NTL-২০২৬-০০২৩৫',
    licenseNo: 'TL-০৩৪৫৭',
    businessName: 'ঢাকা ফুড এন্ড রেস্টুরেন্ট',
    businessType1: 'রেস্টুরেন্ট',
    businessType2: 'খাদ্য পরিবেশন',
    businessAddress: 'গুলশান-২, ঢাকা',
    houseNo: '৪৫/বি',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-২০',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ১৩৫',

    applicantName: 'মোঃ নজরুল ইসলাম',

    mobile: '০১৮৬৭৮৯০১২৩',
    capital: '১৫,০০,০০০ টাকা',
    licenseFee: '৫,০০০ টাকা',
    financialYear: '২০২৫-২০২৬',
    date: '2026-01-20',
    status: 'প্রক্রিয়াধীন',
  },
  {
    id: '3',
    applicationNumber: 'NTL-২০২৬-০০২৩৬',
    licenseNo: 'TL-০৩৪৫৮',
    businessName: 'মডার্ন ফার্নিচার হাউজ',
    businessType1: 'আসবাবপত্র',
    businessType2: 'কাঠের কাজ',
    businessAddress: 'মিরপুর-১০, ঢাকা',
    houseNo: '২৩/সি',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০৬',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৮',

    applicantName: 'মোঃ শফিকুল হক',

    mobile: '০১৯৭৮৯০১২৩৪',
    capital: '৮,০০,০০০ টাকা',
    licenseFee: '৩,৫০০ টাকা',
    financialYear: '২০২৫-২০২৬',
    date: '2026-02-01',
    status: 'পেন্ডিং',
  },
  {
    id: '4',
    applicationNumber: 'NTL-২০২৬-০০২৩৭',
    licenseNo: 'TL-০৩৪৫৯',
    businessName: 'সিটি ফার্মেসি',
    businessType1: 'ওষুধ বিক্রয়',
    businessType2: 'ফার্মেসি',
    businessAddress: 'ধানমন্ডি, ঢাকা',
    houseNo: '১২/ডি',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৩৫',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ২৭',

    applicantName: 'মোসাঃ নাজনীন আক্তার',

    mobile: '০১৬৮৯০১২৩৪৫',
    capital: '১০,০০,০০০ টাকা',
    licenseFee: '৪,০০০ টাকা',
    financialYear: '২০২৫-২০২৬',
    date: '2026-02-10',
    status: 'অনুমোদিত',
  },
  {
    id: '5',
    applicationNumber: 'NTL-২০২৬-০০২৩৮',
    licenseNo: 'TL-০৩৪৬০',
    businessName: 'টেক সলিউশন লিমিটেড',
    businessType1: 'আইটি সেবা',
    businessType2: 'কম্পিউটার বিক্রয়',
    businessAddress: 'উত্তরা সেক্টর-৭, ঢাকা',
    houseNo: '৩৫/এ',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০১',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৪',

    applicantName: 'মোঃ তানভীর হোসেন',

    mobile: '০১৫৯০১২৩৪৫৬',
    capital: '২০,০০,০০০ টাকা',
    licenseFee: '৬,০০০ টাকা',
    financialYear: '২০২৫-২০২৬',
    date: '2026-02-18',
    status: 'প্রক্রিয়াধীন',
  },
  {
    id: '6',
    applicationNumber: 'NTL-২০২৬-০০২৩৯',
    licenseNo: 'TL-০৩৪৬১',
    businessName: 'গ্রিন গ্রোসারি',
    businessType1: 'খুচরা বিক্রয়',
    businessType2: 'শাকসবজি ও ফল',
    businessAddress: 'শ্যামলী, ঢাকা',
    houseNo: '১৮/বি',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৩৪',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৬',

    applicantName: 'মোঃ রবিউল ইসলাম',

    mobile: '০১৩১২৩৪৫৬৭৮',
    capital: '৩,০০,০০০ টাকা',
    licenseFee: '১,৫০০ টাকা',
    financialYear: '২০২৫-২০২৬',
    date: '2026-03-01',
    status: 'অনুমোদিত',
  },
  {
    id: '7',
    applicationNumber: 'NTL-২০২৬-০০২৪০',
    licenseNo: 'TL-০৩৪৬২',
    businessName: 'ঢাকা হেলথ কেয়ার সেন্টার',
    businessType1: 'স্বাস্থ্য সেবা',
    businessType2: 'ক্লিনিক',
    businessAddress: 'বাড্ডা, ঢাকা',
    houseNo: '২১/সি',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-২১',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৩',

    applicantName: 'ডাঃ মোঃ রাসেল আহমেদ',

    mobile: '০১৭২২৩৩৪৪৫৫',
    capital: '৩০,০০,০০০ টাকা',
    licenseFee: '৭,৫০০ টাকা',
    financialYear: '২০২৫-২০২৬',
    date: '2026-03-08',
    status: 'পেন্ডিং',
  },
  {
    id: '8',
    applicationNumber: 'NTL-২০২৬-০০২৪১',
    licenseNo: 'TL-০৩৪৬৩',
    businessName: 'গুলিস্তান ইলেকট্রনিক্স',
    businessType1: 'ইলেকট্রনিক্স',
    businessType2: 'হোম অ্যাপ্লায়েন্স',
    businessAddress: 'গুলিস্তান, ঢাকা',
    houseNo: '১৪/এ',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-২৭',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৫',

    applicantName: 'মোঃ শাহ আলম',

    mobile: '০১৮৩৩৪৪৫৫৬৬',
    capital: '১৬,০০,০০০ টাকা',
    licenseFee: '৫,০০০ টাকা',
    financialYear: '২০২৫-২০২৬',
    date: '2026-03-15',
    status: 'অনুমোদিত',
  },
  {
    id: '9',
    applicationNumber: 'NTL-২০২৬-০০২৪২',
    licenseNo: 'TL-০৩৪৬৪',
    businessName: 'হাজারীবাগ ট্যানারি সাপ্লাই',
    businessType1: 'চামড়া বিক্রয়',
    businessType2: 'চামড়া সামগ্রী',
    businessAddress: 'হাজারীবাগ, ঢাকা',
    houseNo: '৮/বি',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৪৩',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০২',

    applicantName: 'মোঃ মোস্তফা মিয়া',

    mobile: '০১৯৪৪৫৫৬৬৭৭',
    capital: '২২,০০,০০০ টাকা',
    licenseFee: '৬,৫০০ টাকা',
    financialYear: '২০২৫-২০২৬',
    date: '2026-03-22',
    status: 'প্রক্রিয়াধীন',
  },
  {
    id: '10',
    applicationNumber: 'NTL-২০২৬-০০২৪৩',
    licenseNo: 'TL-০৩৪৬৫',
    businessName: 'বেইলি রোড বুটিক হাউজ',
    businessType1: 'পোশাক বিক্রয়',
    businessType2: 'বুটিক',
    businessAddress: 'বেইলি রোড, ঢাকা',
    houseNo: '৩৬/ডি',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-৩০',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০১',

    applicantName: 'মোসাঃ তাসনিম আক্তার',

    mobile: '০১৬৫৫৬৬৭৭৮৮',
    capital: '৭,০০,০০০ টাকা',
    licenseFee: '৩,০০০ টাকা',
    financialYear: '২০২৫-২০২৬',
    date: '2026-04-01',
    status: 'প্রত্যাখ্যাত',
  },
  {
    id: '11',
    applicationNumber: 'NTL-২০২৬-০০২৪৪',
    licenseNo: 'TL-০৩৪৬৬',
    businessName: 'রায়েরবাজার প্লাস্টিক ইন্ডাস্ট্রিজ',
    businessType1: 'প্লাস্টিক',
    businessType2: 'নির্মাণ সামগ্রী',
    businessAddress: 'রায়েরবাজার, ঢাকা',
    houseNo: '৪৭/এ',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৪৪',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৮',

    applicantName: 'মোঃ কামরুজ্জামান',

    mobile: '০১৫৬৬৭৭৮৮৯৯',
    capital: '১৪,০০,০০০ টাকা',
    licenseFee: '৪,৫০০ টাকা',
    financialYear: '২০২৫-২০২৬',
    date: '2026-04-10',
    status: 'পেন্ডিং',
  },
];

// --- Old Trade License Applications ---
export const oldTradeLicenseApplications: TradeLicenseApplication[] = [
  {
    id: '1',
    applicationNumber: 'OTL-২০২৬-০০০৪৫',
    licenseNo: 'OTL-৯৮৭৬৫',
    businessName: 'রহমান ট্রেডার্স',
    businessType1: 'পাইকারি বিক্রয়',
    businessType2: 'নির্মাণ সামগ্রী',
    businessAddress: 'মিরপুর-১, ঢাকা',
    houseNo: '৫/এ',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০৫',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০২',

    applicantName: 'মোঃ আব্দুর রহমান',

    mobile: '০১৭১১১২২২৩৩',
    capital: '২৫,০০,০০০ টাকা',
    licenseFee: '৮,০০০ টাকা',
    financialYear: '২০২৪-২০২৫',
    date: '2026-01-08',
    status: 'অনুমোদিত',
  },
  {
    id: '2',
    applicationNumber: 'OTL-২০২৬-০০০৪৬',
    licenseNo: 'OTL-৫৪৩২১',
    businessName: 'নিউ মার্কেট বুক সেন্টার',
    businessType1: 'বই বিক্রয়',
    businessType2: 'স্টেশনারি',
    businessAddress: 'নিউ মার্কেট, ঢাকা',
    houseNo: '৩০/সি',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৩৬',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ১৪',

    applicantName: 'মোঃ জাহাঙ্গীর আলম',

    mobile: '০১৮২২২৩৩৩৪৪',
    capital: '৬,০০,০০০ টাকা',
    licenseFee: '২,৫০০ টাকা',
    financialYear: '২০২৪-২০২৫',
    date: '2026-01-15',
    status: 'প্রক্রিয়াধীন',
  },
  {
    id: '3',
    applicationNumber: 'OTL-২০২৬-০০০৪৭',
    licenseNo: 'OTL-১১২২৩',
    businessName: 'সাউদার্ন ক্লোথিং',
    businessType1: 'পোশাক বিক্রয়',
    businessType2: 'গার্মেন্টস',
    businessAddress: 'মোহাম্মদপুর, ঢাকা',
    houseNo: '৪১/ডি',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৩৩',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৯',

    applicantName: 'মোসাঃ রুবিনা বেগম',

    mobile: '০১৯৩৩৩৪৪৪৫৫',
    capital: '১২,০০,০০০ টাকা',
    licenseFee: '৪,৫০০ টাকা',
    financialYear: '২০২৪-২০২৫',
    date: '2026-02-03',
    status: 'পেন্ডিং',
  },
  {
    id: '4',
    applicationNumber: 'OTL-২০২৬-০০০৪৮',
    licenseNo: 'OTL-৬৭৮৯০',
    businessName: 'ক্যাপিটাল হার্ডওয়্যার',
    businessType1: 'হার্ডওয়্যার',
    businessType2: 'সরঞ্জাম বিক্রয়',
    businessAddress: 'উত্তরা সেক্টর-১১, ঢাকা',
    houseNo: '২২/এ',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০২',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৭',

    applicantName: 'মোঃ সাইফুল ইসলাম',

    mobile: '০১৬৪৪৪৫৫৫৬৬',
    capital: '১৮,০০,০০০ টাকা',
    licenseFee: '৫,৫০০ টাকা',
    financialYear: '২০২৪-২০২৫',
    date: '2026-02-15',
    status: 'অনুমোদিত',
  },
  {
    id: '5',
    applicationNumber: 'OTL-২০২৬-০০০৪৯',
    licenseNo: 'OTL-২৩৪৫৬',
    businessName: 'মিরপুর মেডিকেল হল',
    businessType1: 'ওষুধ বিক্রয়',
    businessType2: 'ফার্মেসি',
    businessAddress: 'মিরপুর-১০, ঢাকা',
    houseNo: '১৭/বি',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০৬',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ১৪',

    applicantName: 'মোঃ আশরাফ হোসেন',

    mobile: '০১৭৫৫৫৬৬৬৭৭',
    capital: '১১,০০,০০০ টাকা',
    licenseFee: '৪,০০০ টাকা',
    financialYear: '২০২৪-২০২৫',
    date: '2026-02-28',
    status: 'প্রক্রিয়াধীন',
  },
  {
    id: '6',
    applicationNumber: 'OTL-২০২৬-০০০৫০',
    licenseNo: 'OTL-৩৪৫৬৭',
    businessName: 'শাহবাগ প্রিন্টিং প্রেস',
    businessType1: 'প্রিন্টিং',
    businessType2: 'প্রকাশনা',
    businessAddress: 'শাহবাগ, ঢাকা',
    houseNo: '৯/সি',

    zone: '৪ মিরপুর',

    ward: 'ওয়ার্ড-৩০',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৩',

    applicantName: 'মোঃ কামরুল হাসান টিপু',

    mobile: '০১৮৬৬৬৭৭৭৮৮',
    capital: '৯,০০,০০০ টাকা',
    licenseFee: '৩,৫০০ টাকা',
    financialYear: '২০২৪-২০২৫',
    date: '2026-03-10',
    status: 'পেন্ডিং',
  },
  {
    id: '7',
    applicationNumber: 'OTL-২০২৬-০০০৫১',
    licenseNo: 'OTL-৪৫৬৭৮',
    businessName: 'পল্লবী এগ্রো ফুডস',
    businessType1: 'খাদ্য প্রক্রিয়াজাতকরণ',
    businessType2: 'পাইকারি বিক্রয়',
    businessAddress: 'পল্লবী, ঢাকা',
    houseNo: '২৬/ডি',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০৪',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৬',

    applicantName: 'মোসাঃ নাসরিন সুলতানা',

    mobile: '০১৯৭৭৭৮৮৮৯৯',
    capital: '২০,০০,০০০ টাকা',
    licenseFee: '৬,০০০ টাকা',
    financialYear: '২০২৪-২০২৫',
    date: '2026-03-18',
    status: 'অনুমোদিত',
  },
  {
    id: '8',
    applicationNumber: 'OTL-২০২৬-০০০৫২',
    licenseNo: 'OTL-৫৬৭৮৯',
    businessName: 'পাইকপাড়া জেনারেল হসপিটাল',
    businessType1: 'হাসপাতাল',
    businessType2: 'স্বাস্থ্য সেবা',
    businessAddress: 'পাইকপাড়া, ঢাকা',
    houseNo: '৪৩/এ',

    zone: '৩ মহাখালী',

    ward: 'ওয়ার্ড-৩৩',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ০৯',

    applicantName: 'ডাঃ মোঃ শফিকুল ইসলাম',

    mobile: '০১৬৮৮৮৯৯৯০০',
    capital: '৫০,০০,০০০ টাকা',
    licenseFee: '১০,০০০ টাকা',
    financialYear: '২০২৪-২০২৫',
    date: '2026-03-25',
    status: 'প্রক্রিয়াধীন',
  },
  {
    id: '9',
    applicationNumber: 'OTL-২০২৬-০০০৫৩',
    licenseNo: 'OTL-৬৭৮৯০১',
    businessName: 'কুড়িল স্টিল হাউজ',
    businessType1: 'স্টিল',
    businessType2: 'নির্মাণ সামগ্রী',
    businessAddress: 'কুড়িল, ঢাকা',
    houseNo: '১২/বি',

    zone: '১ উত্তরা',

    ward: 'ওয়ার্ড-০৩',

    sector: 'সেক্টর-১',

    area: '',

    road: 'রোড নং- ১১',

    applicantName: 'মোঃ আলী আকবর',

    mobile: '০১৫৯৯৯০০০১১',
    capital: '৩৫,০০,০০০ টাকা',
    licenseFee: '৮,৫০০ টাকা',
    financialYear: '২০২৪-২০২৫',
    date: '2026-04-05',
    status: 'প্রত্যাখ্যাত',
  },
];

// --- Change/Correction TL Applications ---
export const changeTLApplications: ChangeTLApplication[] = [
  {
    id: '1',
    applicationNumber: 'CTL-২০২৬-০০০১৯',
    tradeLicenseNo: 'TL-০৩৪৫৬',
    docketNo: 'DKT-২০২৬-০০১২৩',
    changeReason: 'ব্যবসা প্রতিষ্ঠানের নাম পরিবর্তন',
    nameChange: 'আল-আমিন জেনারেল স্টোর → আল-আমিন সুপার শপ',
    addressChange: '',
    date: '2026-01-25',
    status: 'অনুমোদিত',
  },
  {
    id: '2',
    applicationNumber: 'CTL-২০২৬-০০০২০',
    tradeLicenseNo: 'TL-০৩৪৫৭',
    docketNo: 'DKT-২০২৬-০০১২৪',
    changeReason: 'ঠিকানা পরিবর্তন',
    nameChange: '',
    addressChange: 'গুলশান-২ → গুলশান-১, ঢাকা',
    date: '2026-02-05',
    status: 'প্রক্রিয়াধীন',
  },
  {
    id: '3',
    applicationNumber: 'CTL-২০২৬-০০০২১',
    tradeLicenseNo: 'TL-০৩৪৫৮',
    docketNo: 'DKT-২০২৬-০০১২৫',
    changeReason: 'মালিকের নাম পরিবর্তন',
    nameChange: 'মোঃ শফিকুল হক → মোঃ রফিকুল হক',
    addressChange: '',
    date: '2026-02-12',
    status: 'পেন্ডিং',
  },
  {
    id: '4',
    applicationNumber: 'CTL-২০২৬-০০০২২',
    tradeLicenseNo: 'TL-০৩৪৬০',
    docketNo: 'DKT-২০২৬-০০১২৬',
    changeReason: 'ব্যবসার ধরন পরিবর্তন',
    nameChange: '',
    addressChange: 'উত্তরা সেক্টর-৭ → উত্তরা সেক্টর-৯, ঢাকা',
    date: '2026-03-01',
    status: 'অনুমোদিত',
  },
  {
    id: '5',
    applicationNumber: 'CTL-২০২৬-০০০২৩',
    tradeLicenseNo: 'TL-০৩৪৫৯',
    docketNo: 'DKT-২০২৬-০০১২৭',
    changeReason: 'মালিকের নাম পরিবর্তন',
    nameChange: 'মোসাঃ নাজনীন আক্তার → মোঃ সোহেল রানা',
    addressChange: '',
    date: '2026-03-10',
    status: 'প্রক্রিয়াধীন',
  },
  {
    id: '6',
    applicationNumber: 'CTL-২০২৬-০০০২৪',
    tradeLicenseNo: 'TL-০৩৪৬১',
    docketNo: 'DKT-২০২৬-০০১২৮',
    changeReason: 'ঠিকানা পরিবর্তন',
    nameChange: '',
    addressChange: 'শ্যামলী → কল্যাণপুর, ঢাকা',
    date: '2026-03-18',
    status: 'পেন্ডিং',
  },
  {
    id: '7',
    applicationNumber: 'CTL-২০২৬-০০০২৫',
    tradeLicenseNo: 'OTL-৯৮৭৬৫',
    docketNo: 'DKT-২০২৬-০০১২৯',
    changeReason: 'ব্যবসা প্রতিষ্ঠানের নাম পরিবর্তন',
    nameChange: 'রহমান ট্রেডার্স → রহমান এন্টারপ্রাইজ',
    addressChange: '',
    date: '2026-03-25',
    status: 'অনুমোদিত',
  },
  {
    id: '8',
    applicationNumber: 'CTL-২০২৬-০০০২৬',
    tradeLicenseNo: 'OTL-৫৪৩২১',
    docketNo: 'DKT-২০২৬-০০১৩০',
    changeReason: 'ব্যবসার ধরন ও ঠিকানা পরিবর্তন',
    nameChange: '',
    addressChange: 'নিউ মার্কেট → ফার্মগেট, ঢাকা',
    date: '2026-04-02',
    status: 'প্রত্যাখ্যাত',
  },
  {
    id: '9',
    applicationNumber: 'CTL-২০২৬-০০০২৭',
    tradeLicenseNo: 'TL-০৩৪৬৩',
    docketNo: 'DKT-২০২৬-০০১৩১',
    changeReason: 'মালিকের নাম ও ঠিকানা পরিবর্তন',
    nameChange: 'মোঃ শাহ আলম → মোঃ জাহাঙ্গীর আলম',
    addressChange: 'গুলিস্তান → শাহবাগ, ঢাকা',
    date: '2026-04-12',
    status: 'প্রক্রিয়াধীন',
  },
];

// --- Helper: Search functions ---

type StatusColor = 'green' | 'orange' | 'red' | 'blue';

export function getStatusColor(status: string): StatusColor {
  switch (status) {
    case 'অনুমোদিত':
      return 'green';
    case 'প্রক্রিয়াধীন':
      return 'blue';
    case 'পেন্ডিং':
      return 'orange';
    case 'প্রত্যাখ্যাত':
      return 'red';
    default:
      return 'orange';
  }
}

export interface SearchResultRow {
  applicationNumber: string;
  applicantName: string;
  area: string;
  date: string;
  status: string;
  details: Record<string, string>;
}

function toBengaliDate(dateStr: string): string {
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
  ];
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const toBengali = (n: number) => String(n).split('').map(d => bengaliDigits[parseInt(d)] || d).join('');
  const d = new Date(dateStr);
  return `${toBengali(d.getDate())} ${months[d.getMonth()]} ${toBengali(d.getFullYear())}`;
}

export function searchHolding(query: string, area?: string, appNumber?: string): SearchResultRow[] {
  return holdingApplications
    .filter(app => {
      const q = query.toLowerCase();
      const matchArea = !area || app.area.includes(area) || app.ward.includes(area) || app.zone.includes(area);
      const matchNumber = !appNumber || app.applicationNumber.includes(appNumber);
      const matchQuery = !query ||
        app.applicantName.includes(q) ||
        app.applicationNumber.toLowerCase().includes(q) ||
        app.area.includes(q);
      return matchArea && matchNumber && (matchQuery || !query);
    })
    .map(app => ({
      applicationNumber: app.applicationNumber,
      applicantName: app.applicantName,
      area: app.area,
      date: toBengaliDate(app.date),
      status: app.status,
      details: {
        'পিতার নাম': app.fatherName,
        'মাতার নাম': app.motherName,
        'মোবাইল': app.mobile,
        'এনআইডি': app.nid,
        'হাউস নং': app.houseNo,
        'রোড': app.road,
        'ওয়ার্ড': app.ward,
        'জোন': app.zone,
      },
    }));
}

export function searchNamjari(query: string, area?: string, appNumber?: string): SearchResultRow[] {
  return namjariApplications
    .filter(app => {
      const matchArea = !area || app.road.includes(area) || app.ward.includes(area) || app.zone.includes(area);
      const matchNumber = !appNumber || app.applicationNumber.includes(appNumber);
      const matchQuery = !query || app.applicantName.includes(query) || app.applicationNumber.includes(query);
      return matchArea && matchNumber && (matchQuery || !query);
    })
    .map(app => ({
      applicationNumber: app.applicationNumber,
      applicantName: app.applicantName,
      area: app.ward + ', ' + app.zone,
      date: toBengaliDate(app.date),
      status: app.status,
      details: {
        'পিতার নাম': app.fatherName,
        'মাতার নাম': app.motherName,
        'মোবাইল': app.mobile,
        'এনআইডি': app.nid,
        'হাউস নং': app.houseNo,
        'রোড': app.road,
      },
    }));
}

export function searchNayabadi(query: string, area?: string, appNumber?: string): SearchResultRow[] {
  return nayabadiApplications
    .filter(app => {
      const matchArea = !area || app.road.includes(area) || app.ward.includes(area) || app.zone.includes(area);
      const matchNumber = !appNumber || app.applicationNumber.includes(appNumber);
      const matchQuery = !query || app.applicantName.includes(query) || app.applicationNumber.includes(query);
      return matchArea && matchNumber && (matchQuery || !query);
    })
    .map(app => ({
      applicationNumber: app.applicationNumber,
      applicantName: app.applicantName,
      area: app.ward + ', ' + app.zone,
      date: toBengaliDate(app.date),
      status: app.status,
      details: {
        'পিতার নাম': app.fatherName,
        'মাতার নাম': app.motherName,
        'মোবাইল': app.mobile,
        'হাউস নং': app.houseNo,
        'রোড': app.road,
      },
    }));
}

export function searchFreedomFighter(query: string, area?: string, appNumber?: string): SearchResultRow[] {
  return freedomFighterApplications
    .filter(app => {
      const matchArea = !area || app.road.includes(area) || app.ward.includes(area) || app.zone.includes(area);
      const matchNumber = !appNumber || app.applicationNumber.includes(appNumber);
      const matchQuery = !query || app.applicantName.includes(query) || app.applicationNumber.includes(query);
      return matchArea && matchNumber && (matchQuery || !query);
    })
    .map(app => ({
      applicationNumber: app.applicationNumber,
      applicantName: app.applicantName,
      area: app.ward + ', ' + app.zone,
      date: toBengaliDate(app.date),
      status: app.status,
      details: {
        'পিতার নাম': app.fatherName,
        'মাতার নাম': app.motherName,
        'মোবাইল': app.mobile,
        'সনদ নং': app.certificateNo,
        'হাউস নং': app.houseNo,
        'রোড': app.road,
      },
    }));
}

export function searchNewTL(area?: string, appNumber?: string, applicantName?: string): SearchResultRow[] {
  return newTradeLicenseApplications
    .filter(app => {
      const matchArea = !area || app.businessAddress.includes(area) || app.ward.includes(area) || app.zone.includes(area);
      const matchNumber = !appNumber || app.applicationNumber.includes(appNumber) || app.licenseNo.includes(appNumber);
      const matchName = !applicantName || app.applicantName.includes(applicantName) || app.businessName.includes(applicantName);
      return matchArea && matchNumber && matchName;
    })
    .map(app => ({
      applicationNumber: app.applicationNumber,
      applicantName: app.businessName,
      area: app.businessAddress,
      date: toBengaliDate(app.date),
      status: app.status,
      details: {
        'মালিকের নাম': app.applicantName,
        'ব্যবসার ধরণ': app.businessType1 + ', ' + app.businessType2,
        'লাইসেন্স নং': app.licenseNo,
        'মোবাইল': app.mobile,
        'ওয়ার্ড': app.ward,
        'জোন': app.zone,
        'মূলধন': app.capital,
        'লাইসেন্স ফি': app.licenseFee,
      },
    }));
}

export function searchOldTL(area?: string, licenseNo?: string, oldLicenseNo?: string): SearchResultRow[] {
  return oldTradeLicenseApplications
    .filter(app => {
      const matchArea = !area || app.businessAddress.includes(area) || app.ward.includes(area) || app.zone.includes(area);
      const matchLicense = !licenseNo || app.licenseNo.includes(licenseNo) || app.applicationNumber.includes(licenseNo);
      const matchOld = !oldLicenseNo || app.licenseNo.includes(oldLicenseNo);
      return matchArea && matchLicense && matchOld;
    })
    .map(app => ({
      applicationNumber: app.applicationNumber,
      applicantName: app.businessName,
      area: app.businessAddress,
      date: toBengaliDate(app.date),
      status: app.status,
      details: {
        'মালিকের নাম': app.applicantName,
        'ব্যবসার ধরণ': app.businessType1 + ', ' + app.businessType2,
        'লাইসেন্স নং': app.licenseNo,
        'মোবাইল': app.mobile,
        'ওয়ার্ড': app.ward,
        'জোন': app.zone,
        'মূলধন': app.capital,
        'অর্থ বছর': app.financialYear,
      },
    }));
}

export function searchChangeTL(area?: string, tradeLicenseNo?: string, docketNo?: string): SearchResultRow[] {
  return changeTLApplications
    .filter(app => {
      const matchArea = !area || app.changeReason.includes(area);
      const matchLicense = !tradeLicenseNo || app.tradeLicenseNo.includes(tradeLicenseNo);
      const matchDocket = !docketNo || app.docketNo.includes(docketNo);
      return matchArea && matchLicense && matchDocket;
    })
    .map(app => ({
      applicationNumber: app.applicationNumber,
      applicantName: app.changeReason,
      area: app.tradeLicenseNo,
      date: toBengaliDate(app.date),
      status: app.status,
      details: {
        'ট্রেড লাইসেন্স নং': app.tradeLicenseNo,
        'ডকেট নং': app.docketNo,
        'পরিবর্তনের কারণ': app.changeReason,
        'নাম পরিবর্তন': app.nameChange || 'নেই',
        'ঠিকানা পরিবর্তন': app.addressChange || 'নেই',
      },
    }));
}

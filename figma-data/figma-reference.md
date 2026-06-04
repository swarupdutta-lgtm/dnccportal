# Figma Design Reference - Citizen Portal (DNCC)

**Figma File:** `2D1zJbKw9HLt4iVvuKiXVE`
**File URL:** https://www.figma.com/design/2D1zJbKw9HLt4iVvuKiXVE/Citizen-Portal--Copy-

---

## Screen Inventory

### Auth Pages
| Node ID | Screen Name | Description |
|---------|------------|-------------|
| `48:6146` | Login Page | Sign in with User/Email + Password |
| `48:6185` | Registration Page | Registration form with Email + Mobile No fields |
| `48:6209` | Registration Page 2 | Full registration form with name, phone, email, password, OTP |
| `48:6111` | Forget Password Page | Enter email to reset password |

### Dashboard Pages
| Node ID | Screen Title (Bengali) | English Description |
|---------|----------------------|-------------------|
| `48:5503` | ড্যাশবোর্ড (Main Home) | Home dashboard with 6 info cards, zone office search, map |
| `32:2234` | নতুন হোল্ডিং এর আবেদন অনুসন্ধান | Search New Holding Application |
| `61:6462` | ট্রেড লাইসেন্স আবেদন | Trade License Application (menu: New/Old/Change) |
| `61:7158` | হোল্ডিং ট্যাক্স আবেদন | Holding Tax Application (menu: New/Namjari/Nayabadi/Muktijoddha) |
| `71:2386` | নতুন হোল্ডিং এর আবেদন | New Holding Application Form (detailed form) |
| `128:7916` | নামজারির আবেদন | Namjari (Transfer) Application Form |
| `134:8764` | নয়াবাদি আবেদন | Nayabadi (New Land) Application Form |
| `96:3490` | নতুন ট্রেড লাইসেন্সের আবেদন | New Trade License Application Form |
| `115:4713` | পুরাতন ট্রেড লাইসেন্সের আবেদন | Old Trade License Application Form |
| `122:6541` | (Payment Page) | Payment page |
| `61:6716` | ট্রেড লাইসেন্স অনুসন্ধান | Trade License Search |
| `61:7393` | হোল্ডিং ট্যাক্স অনুসন্ধান | Holding Tax Search |
| `48:4705` | নতুন ট্রেড লাইসেন্সের আবেদন অনুসন্ধান | New Trade License Application Search |
| `48:5025` | পুরাতন ট্রেড লাইসেন্সের আবেদন অনুসন্ধান | Old Trade License Application Search |
| `122:6276` | পরিবর্তন/সংশোধন আবেদন | Change/Correction Application |
| `48:5264` | পরিবর্তন/সংশোধন আবেদন অনুসন্ধান | Change/Correction Application Search |
| `48:3961` | নামজারির আবেদন অনুসন্ধান | Namjari Application Search |
| `48:4209` | নয়াবাদি আবেদন অনুসন্ধান | Nayabadi Application Search |
| `48:4457` | মুক্তিযোদ্ধার সুবিধার আবেদন অনুসন্ধান | Freedom Fighter Benefit Application Search |

### Menu Components
| Node ID | Component Name |
|---------|---------------|
| `32:2842` | Holding Menu |
| `32:3344` | TL Menu |
| `61:6261` | Holding Main Menu |
| `61:7628` | TL Main Menu |
| `32:3499` | TL Fee Menu |
| `32:2900` | Dropdown Menu |

### Form Dropdown Components
| Node ID | Component Name |
|---------|---------------|
| `71:2915` | Gender |
| `96:4238` | Business Type |
| `79:3148` | Zone |
| `84:3194` | Word |
| `84:3297` | Land |
| `84:3215` | Sector |
| `128:8551` | Payment Method |
| `84:3232` | Area |
| `106:4398` | Business Place |
| `106:4432` | Place Type |
| `106:4471` | Yes No |
| `106:4520` | Floor |
| `157:4060` | Sign board |
| `84:3416` | Attachment |
| `96:4076` | TL Attachment |
| `84:3251` | Road |

---

## Design Tokens

### Colors
- **Primary Green:** `#198754` (buttons, sidebar, header bar, accents)
- **Background:** `#f4f6f9` (auth pages), `#f0f2f5` (dashboard)
- **Card Background:** `#e6e8e9` with `#c7ccd0` border
- **Input Background:** `#e8f0fe` with `#c7ccd0` border
- **Text Primary:** `#000000`, `#5c5c5c`
- **Text Placeholder:** `#9e9e9e`
- **Text Secondary:** `#7b809a`
- **White:** `#ffffff` (sidebar items, cards, forms)
- **Dark Overlay:** `rgba(0,0,0,0.56)` (auth pages background)

### Typography
- **Font Family:** Roboto + Noto Sans Bengali
- **Weights:** Regular (400), Medium (500), Semi Bold (600), Bold (700)
- **Sizes:** 12px (buttons), 14px (sidebar/menu), 16px (body), 20px (form labels), 22px (page titles), 24px (dashboard title), 40px (Citizen's Portal)

### Spacing & Layout
- **Canvas:** 1440px x 1024px
- **Sidebar:** 250px wide, 12px border-radius
- **Header:** 60px tall, green background
- **Card border-radius:** 9px
- **Button border-radius:** 8px
- **Input border-radius:** 8px (auth), 9px (dashboard forms)
- **Main content left offset:** 275px (sidebar 16px + 250px + gap)

### Sidebar Menu Structure
```
DNCC Logo + "DNCC" text
───────────────
Username (user icon)
───────────────
🏠 হোম (Home)
   ▼ হোল্ডিং ট্যাক্স (Holding Tax)
      আবেদন এবং অনুসন্ধান
      ই-হোল্ডিং নাম্বার সংযুক্ত করুন
      বকেয়া বিবরণী
      কুইক পে
      অনলাইন কর পরিশোধের বিবরণ
   ▼ ট্রেড লাইসেন্স (Trade License)
      আবেদন এবং অনুসন্ধান
      ফি অনুসন্ধান
      ট্রেড লাইসেন্স প্রিন্ট
      ট্রেড লাইসেন্স রিসিট
   ▼ হোটেল ট্যাক্স (Hotel Tax)
      ই-হোটেল নম্বর নিবন্ধীকরণ
      ই-হোটেল ড্যাশবোর্ড
      হোটেল পেমেন্ট জেনারেট
```

---

## Detailed Screen Data

### 1. Login Page (48:6146)
- Background: istockphoto image with dark overlay (56% black)
- DNCC logo + "Citizen's Portal" title (40px, white, text-shadow green)
- White card (408x392px, rounded 12px) with green header (70px)
- Green header: "Sign In" text
- Two form fields: "User or Email" + "Password" (bg: #e8f0fe, border: #c7ccd0)
- Green "Log In" button (#198754, 361x40px)
- "Forgot your password? Click Here" link
- "Do not have an account? Create One" link

### 2. Registration Page (48:6185)
- Same layout as Login page
- Green header: "Registration"
- Two form fields: "Email" + "Mobile No"
- Green "Next" button

### 3. Registration Page 2 (48:6209)
- Same background pattern
- DNCC logo + "Citizen's Portal"
- Large white card (1263x628px)
- Green header: "Registration"
- Left column: First Name, Phone (01900000000), Password, OTP
- Right column: Last Name, Email (test@gmail.com), Confirm Password
- Green "Submit" button

### 4. Forget Password Page (48:6111)
- Same background pattern
- DNCC logo + "Citizen's Portal"
- White card with green header
- "Forgot Password" title
- One form field: "Email"
- Green submit button

### 5. Main Home Dashboard (48:5503)
- Header bar (green, 60px): breadcrumbs "ড্যাশবোর্ড" + icons (account, settings, notification, logout)
- 6 info cards in 3x2 grid (380x351px each):
  - Card 1: ই-হোল্ডিং নম্বর সংযুক্ত (e-Holding number registration with OTP)
  - Card 2: ই-হোল্ডিং বিস্তারিত (e-Holding details view)
  - Card 3: বকেয়া কর পরিশোধ (Outstanding tax payment)
  - Card 4: ব্যবহার বিধি (Usage guidelines download)
  - Card 5: নোটিশ (Notices from corporation)
  - Card 6: ব্যবহারবিধি (Portal usage guide)
- DNCC Zone Office Location section with map image
- Zone office search panel: Address, Ward, Zone fields + search button
- Footer: "পরিকল্পনা ও রূপায়নে ICT Cell Dhaka North City Corporation"

### 6. Search Pages (32:2234, 61:6716, 61:7393, etc.)
All search pages share same pattern:
- Header bar with breadcrumbs
- Page title (24px semi-bold)
- Search form card (#e6e8e9 bg):
  - Search icon + "অনুসন্ধানের যায়গা" label
  - Left: Date From (mm/dd/yyyy with calendar icon) + Application No field
  - Right: Date To (mm/dd/yyyy with calendar icon)
  - Vertical divider line
  - Green "অনুসন্ধান করুন" (Search) button

### 7. Application Menu Pages (61:6462, 61:7158)
- Centered card with selectable options (361x92px each)
- **Trade License Application** options: নতুন ট্রেডলাইসেন্সের আবেদন, পুরাতন ট্রেড লাইসেন্সের আবেদন, পরিবর্তন/সংশোধন আবেদন
- **Holding Tax Application** options: নতুন হোল্ডিং এর আবেদন, নামজারির আবেদন, নয়াবাদি আবেদন, মুক্তিযোদ্ধার সুবিধার জন্য আবেদন

### 8. New Holding Application Form (71:2386)
- Large form (1155x1013px) with two sections
- **Section 1: ব্যক্তিগত বিবরণ (Personal Details)**
  - Left column:
    - এসেসি - মালিক / দখলকারের নাম (বাংলা) (*)
    - পেশা (Profession) - dropdown (Sector)
    - পিতার নাম (বাংলা) - dropdown (Road)
    - মাতার নাম (বাংলা)
    - স্বামীর / স্ত্রীর নাম (বাংলা)
    - লিঙ্গ (Gender) - dropdown instance
    - মোবাইল নম্বর (*) (+88 prefix + input)
    - বিকল্প যোগাযোগের নম্বর (*)
    - ই-মেইল আইডি(যদি থাকে)
    - বিকল্প ই-মেইল আইডি(যদি থাকে)
  - Right column:
    - এসেসি - মালিক / দখলকারের নাম (ইংরেজি) (*)
    - পিতার নাম (ইংরেজি) - dropdown (Area)
    - মাতার নাম (ইংরেজি) - dropdown (Asset)
    - স্বামীর / স্ত্রীর নাম (ইংরেজি) - dropdown (Land)
    - আবেদনের তারিখ (*)
    - ঠিকানা
    - সমাপ্তির তারিখ
    - জাতীয় পরিচয়পত্র নম্বর
    - অন্যান্য পরিচয় পত্র নম্বর
    - ই-টিন নম্বর (যদি থাকে)
    - সম্পত্তির সংক্ষিপ্ত বিবরণ
  - Vertical divider between columns
- **Section 2: সম্পত্তির অবস্থান (Property Location)**
  - জমির ব্যবহারের ধরণ (Land use type)
  - মোট আয়তন(বর্গফুট) (Total area in sq ft)

---

## Sidebar Component (32:2595)
- Background: #198754
- Size: 250x994px
- Border-radius: 12px
- Padding: 16px horizontal, 24px vertical
- Gap: 21px between items
- Sections separated by white divider lines
- DNCC logo at top
- Username with user icon
- Menu items: white background, 48px height, 9px border-radius, 14px text
- Section headers: 18px bold white text with arrow icon

# RAH-E-HIDAYAT

## The Ultimate Premium Islamic Digital Platform

Build a **complete, production-quality, modern, premium and fully responsive Islamic web platform** called:

# **RAH-E-HIDAYAT**

### Tagline:

**“Walk the Path of Guidance.”**

Build this as a serious, scalable **MERN Stack project**, not as a simple demo or generic template.

### Required Technology

* MongoDB
* Express.js
* React.js
* Node.js
* Mongoose
* Tailwind CSS
* Framer Motion
* Lucide React
* REST APIs
* JWT Authentication
* bcrypt
* React Router
* Proper form validation
* Responsive mobile-first architecture

---

# 1. CORE VISION

RAH-E-HIDAYAT should be a beautiful digital Islamic platform where users can:

* Read the Quran
* Listen to Quran
* Search Quran
* Read Hadith
* Explore Duas
* Read Azkar
* Use Digital Tasbeeh
* Check Prayer Times
* View Islamic Calendar
* Read Islamic Articles
* Take Islamic Quizzes
* Learn through Kids Corner
* Download Islamic resources
* Save/bookmark content
* Track their personal activity
* Manage their profile
* Receive useful reminders and notifications

The website should feel like a combination of:

**Islamic knowledge + spiritual experience + modern technology + beautiful UX.**

It should NOT look like an ordinary blog or basic Islamic website.

The first impression should be:

> **“This is a premium, trustworthy and thoughtfully designed Islamic platform.”**

---

# 2. BRAND IDENTITY

Brand Name:

**RAH-E-HIDAYAT**

Meaning:

**The Path of Guidance**

The visual identity should communicate:

* Guidance
* Light
* Knowledge
* Peace
* Spirituality
* Quran
* Reflection
* Growth

Create a unique brand identity rather than using a generic mosque icon.

The logo should combine ideas such as:

* A subtle crescent
* A path/road
* Light
* A star
* Islamic geometry
* Optional subtle “R/H” monogram

Keep the logo:

* Minimal
* Elegant
* Modern
* Recognizable
* Timeless
* Professional

---

# 3. COLOR SYSTEM

Use a sophisticated Islamic-inspired color palette.

Primary:

* Deep Emerald Green
* Forest Green

Secondary:

* Warm Ivory
* Soft Beige
* Off White

Accent:

* Subtle Gold

Dark mode:

* Deep Charcoal
* Dark Emerald
* Muted Gold

Do not use excessive gradients.

Do not use extremely bright colors.

Do not make the website look childish.

The overall appearance should feel:

**Calm + Elegant + Spiritual + Premium**

---

# 4. TYPOGRAPHY

Use beautiful typography for both English and Arabic.

Use:

* Elegant modern English font
* High-quality Arabic font
* Excellent line height
* Proper Arabic alignment
* Comfortable reading width

Arabic Quran/Hadith/Dua text must be visually separated from translations.

Users should be able to increase/decrease Arabic font size.

---

# 5. GLOBAL DESIGN LANGUAGE

Every page should follow one consistent design system.

Use:

* Rounded cards
* Soft shadows
* Elegant borders
* Subtle Islamic geometric patterns
* Beautiful whitespace
* Premium icons
* Smooth transitions
* Micro-interactions
* Subtle hover effects
* Soft backgrounds

Use Islamic patterns very carefully.

Avoid:

* Over-decoration
* Excessive animations
* Clutter
* Cheap gradients
* Generic templates
* Huge unnecessary text
* Too many cards on one screen

---

# 6. RESPONSIVE DESIGN

The website must be fully responsive.

Support:

* Mobile
* Tablet
* Laptop
* Desktop
* Large monitors

Use a **mobile-first approach**.

The mobile version must be designed intentionally rather than simply shrinking the desktop version.

---

# 7. NAVIGATION

Create a premium responsive navbar.

Desktop:

```text
Logo | Home | Quran | Duas | Hadith | Azkar | More | Search | Profile
```

The “More” menu can contain:

* Tasbeeh
* Islamic Calendar
* Articles
* Quiz
* Kids Corner
* Downloads
* About

Add:

* Search button
* Notification icon
* Theme toggle
* User avatar

Mobile:

* Hamburger menu
* Beautiful slide-out navigation
* Bottom navigation

Mobile bottom navigation should contain the most important sections:

```text
Home
Quran
Duas
Tasbeeh
Profile
```

---

# 8. LANDING / HOME PAGE

Create a stunning homepage.

## Hero Section

Large peaceful hero section.

Heading:

**Walk the Path of Guidance**

Subheading:

**Quran • Hadith • Duas • Azkar • Knowledge**

Buttons:

**Explore Quran**

**Daily Dua**

Add a subtle Islamic visual in the background.

Use a very subtle mosque/crescent/geometric pattern.

Do not make the hero visually overwhelming.

---

# 9. PERSONALIZED HOME EXPERIENCE

After login, the homepage should become personalized.

Show:

**Assalamu Alaikum, [User Name]**

Example:

```text
Assalamu Alaikum, Sakib 👋

May your day be filled with peace and guidance.
```

Display the user's avatar beside their name.

Show:

* Today's Quran verse
* Prayer times
* Next prayer
* Daily Hadith
* Today's Dua
* Azkar progress
* Tasbeeh progress
* Reading progress
* Daily streak

For guests, show a generic welcome message.

---

# 10. USER AUTHENTICATION SYSTEM

Create a complete authentication system.

Users should be able to create an account using:

### Option 1 — Email

```text
Email
Password
```

### Option 2 — Phone Number

```text
Country Code
Phone Number
OTP
```

Phone verification should use OTP.

Email verification should also be supported.

Include:

* Register
* Login
* Logout
* Email verification
* Phone OTP verification
* Forgot password
* Reset password
* Remember session
* Protected routes

Use:

**JWT + bcrypt**

Never store plain-text passwords.

Never expose secrets in frontend code.

---

# 11. USER PROFILE SYSTEM

Create a beautiful profile page.

When a user registers:

Example:

```text
Name:
Sakib Hasan
```

Automatically create a circular avatar containing the **first letter of the user's name**:

```text
S
```

If the user name is:

```text
Ahmed
```

show:

```text
A
```

If the user name is:

```text
Fatima
```

show:

```text
F
```

The avatar should have:

* Beautiful gradient/background
* White or high-contrast letter
* Circular shape
* Consistent design

Allow users to later upload a profile image if desired.

If no profile image exists:

**Always fall back to the first letter of the user's name.**

---

# 12. PROFILE PAGE

Create:

```text
Profile

      [ S ]

   Sakib Hasan
   sakib@email.com

Member since August 2026
```

Show statistics:

```text
Quran Reading
12 Surahs

Bookmarks
24

Hadith Read
48

Quiz Score
86%

Tasbeeh
1,240

Current Streak
7 Days
```

Profile sections:

* My Bookmarks
* My Favorites
* Reading History
* Quiz History
* Tasbeeh History
* Azkar Progress
* Settings

---

# 13. EDIT PROFILE

Allow users to edit:

* Name
* Email
* Phone
* Profile image
* Password
* Language
* Preferences

If the name changes, automatically update the initial-letter avatar.

Example:

```text
Before:
S

Name:
Sakib

After:
A

Name:
Ahmed
```

---

# 14. HOME QUICK ACCESS

Create beautiful quick-access cards:

* Quran
* Duas
* Hadith
* Tasbeeh
* Azkar
* Prayer Times
* Islamic Calendar

Use elegant Islamic icons.

---

# 15. QURAN SECTION

Create a complete Quran experience.

## Surah Page

Display all 114 Surahs.

Each Surah card:

* Surah number
* Arabic name
* English name
* Meaning
* Number of Ayahs
* Meccan/Madinan
* Last read indicator

Add search.

---

# 16. QURAN READER

Create a premium distraction-free Quran reader.

Each Ayah should show:

* Ayah number
* Arabic
* Translation
* Transliteration where available
* Surah name
* Reference

Actions:

* Play
* Pause
* Bookmark
* Favorite
* Copy
* Share
* Repeat
* Next
* Previous

Allow:

* Arabic font size
* Translation font size
* Reading theme
* Translation selection
* Reciter selection

---

# 17. CONTINUE READING

Remember the user's last Quran reading position.

Example:

```text
Continue Reading

Surah Al-Baqarah
Ayah 142

[Continue Reading →]
```

Save progress for logged-in users.

---

# 18. SEARCH QURAN

Create powerful Quran search.

Search:

* Surah
* Ayah
* Translation
* Keywords

Results should show:

```text
Surah Name
Ayah Number
Arabic
Translation
```

Highlight matching text.

---

# 19. QURAN AUDIO

Create an elegant audio player.

Features:

* Play
* Pause
* Previous
* Next
* Progress bar
* Volume
* Playback speed
* Repeat
* Reciter selection

On mobile, provide a sticky mini-player.

---

# 20. DUA SECTION

Create a complete Dua library.

Categories:

* Daily Duas
* Salah
* Morning
* Evening
* Travel
* Food
* Protection
* Forgiveness
* Before Sleep
* Ramadan
* Other Duas

Each Dua should display:

* Arabic
* Transliteration
* Translation
* Reference
* Audio if available
* Copy
* Share
* Bookmark

---

# 21. HADITH SECTION

Create:

### Hadith of the Day

A beautiful featured Hadith card.

### Collections

Support reliable Hadith collections.

### Categories

Allow users to browse categories.

### Search

Search by:

* Keyword
* Collection
* Category
* Hadith number

Every Hadith must clearly display its:

* Source
* Book
* Reference
* Hadith number

Do not fabricate or paraphrase religious sources without clearly labeling them.

---

# 22. DIGITAL TASBEEH

Create a beautiful digital Tasbeeh.

Display:

```text
       33

   ┌─────────┐
   │    +    │
   └─────────┘
```

Features:

* Increment
* Decrement
* Reset
* Target
* Circular progress
* Vibration on supported mobile devices
* Presets
* Custom Tasbeeh

Presets:

* SubhanAllah
* Alhamdulillah
* Allahu Akbar
* Astaghfirullah

Save user's Tasbeeh progress when logged in.

---

# 23. AZKAR

Create:

* Morning Azkar
* Evening Azkar
* After Salah
* Before Sleep

Each item:

* Arabic
* Translation
* Transliteration
* Counter
* Completion
* Bookmark

Create:

**Daily Azkar Progress**

Example:

```text
Today's Progress

████████░░ 80%

8 / 10 completed
```

---

# 24. PRAYER TIMES

Add location-based prayer times.

Ask for location permission where appropriate.

Allow users to manually select:

* Country
* City

Show:

* Fajr
* Sunrise
* Dhuhr
* Asr
* Maghrib
* Isha

Highlight:

**Next Prayer**

Example:

```text
Next Prayer

Maghrib

01:42:35
```

Allow users to configure calculation/preferences where supported.

---

# 25. PRAYER NOTIFICATIONS

Allow users to enable/disable prayer reminders.

Settings:

```text
Fajr       ON
Dhuhr      ON
Asr        OFF
Maghrib    ON
Isha       ON
```

Do not enable notifications without user permission.

---

# 26. ISLAMIC CALENDAR

Create a beautiful Hijri calendar.

Display:

* Hijri date
* Gregorian date
* Islamic month
* Important Islamic events

Include:

* Monthly calendar
* Events
* Ramadan
* Eid
* Other significant dates

Clearly indicate that some dates may vary depending on local moon sighting/methodology where relevant.

---

# 27. ARTICLES

Create a premium Islamic knowledge/blog section.

Categories:

* Quran
* Hadith
* Salah
* Ramadan
* Seerah
* Islamic History
* Islamic Knowledge
* Daily Reminders

Features:

* Search
* Categories
* Featured articles
* Related articles
* Bookmark
* Share
* Reading progress

---

# 28. DAILY REMINDER

Create a beautiful daily reminder card.

Example structure:

```text
Daily Reminder

[Content]

Source / Reference

Share
Bookmark
```

Content must come from verified/admin-managed sources.

---

# 29. ISLAMIC QUIZ

Create an interactive quiz.

Features:

* Categories
* Multiple-choice questions
* Progress bar
* Optional timer
* Correct/incorrect feedback
* Score
* Result screen
* Restart
* Quiz history

Show:

```text
Your Score

8 / 10

80%
```

Allow logged-in users to track their scores.

---

# 30. DAILY STREAK

Create a gentle engagement system.

Example:

```text
🔥 7 Day Streak

You have completed your daily Islamic activity for 7 days.
```

Track meaningful activities such as:

* Quran reading
* Azkar completion
* Dua reading
* Hadith reading

Do not make religious worship feel like a competitive game.

Keep gamification subtle and respectful.

---

# 31. KIDS CORNER

Create a separate child-friendly section.

Include:

* Islamic Stories
* Prophets
* Basic Duas
* Islamic Manners
* Simple Quiz
* Arabic Learning
* Knowledge Cards

Use:

* Friendly illustrations
* Soft colors
* Large readable typography
* Simple navigation

Keep it educational and respectful.

---

# 32. DOWNLOADS

Create a resources section.

Include:

* Dua PDFs
* Azkar PDFs
* Islamic wallpapers
* Ramadan resources
* Educational resources

Each card:

```text
Title
Description
File type
Size

[Download]
```

---

# 33. GLOBAL SEARCH

Create a powerful global search.

Search across:

* Quran
* Hadith
* Duas
* Azkar
* Articles
* Quiz
* Kids Corner

Search UI:

```text
🔍 Search Quran, Hadith, Dua, Articles...
```

Show grouped results:

```text
Quran
3 results

Hadith
5 results

Duas
2 results

Articles
4 results
```

---

# 34. BOOKMARKS

Users can bookmark:

* Quran Ayahs
* Hadith
* Duas
* Azkar
* Articles

Create:

# My Collection

Tabs:

```text
Quran
Hadith
Duas
Azkar
Articles
```

---

# 35. FAVORITES

Allow users to favorite important content.

Create a separate:

**My Favorites**

section.

---

# 36. READING HISTORY

Track recently viewed content.

Example:

```text
Recently Read

Surah Yaseen
Hadith #123
Morning Azkar
Islamic Article
```

Allow:

**Clear History**

---

# 37. NOTIFICATION CENTER

Create a notification system.

Notifications can include:

* Prayer reminders
* Daily Quran
* Daily Hadith
* Daily Dua
* New articles
* Important app updates

Create:

```text
🔔 Notifications

Today
Prayer reminder...

Yesterday
New article available...
```

Users should have complete notification controls.

---

# 38. DARK MODE

Add beautiful dark mode.

The dark theme should maintain readability for:

* Quran Arabic
* Hadith
* Dua
* Articles

Do not simply invert colors.

Create a professionally designed dark theme.

---

# 39. LANGUAGE SUPPORT

Prepare the application for multilingual support.

Initially support:

* English
* Hindi/Urdu-style translations where reliable content is available

Structure the application so additional languages can be added later.

---

# 40. ACCESSIBILITY

Follow accessibility best practices.

Include:

* Keyboard navigation
* Proper contrast
* Screen-reader friendly labels
* Large touch targets
* Focus states
* Reduced-motion preference
* Proper semantic HTML

---

# 41. ADMIN DASHBOARD

Create a completely separate professional Admin Dashboard.

Admin dashboard sections:

```text
Dashboard
Users
Quran Content
Hadith
Duas
Azkar
Articles
Quiz
Kids Corner
Downloads
Categories
Notifications
Settings
```

Dashboard statistics:

```text
Total Users
Active Users
Articles
Hadith
Duas
Quiz Questions
Bookmarks
```

---

# 42. ADMIN CONTENT MANAGEMENT

Admin should be able to:

* Create
* Read
* Update
* Delete
* Search
* Filter
* Publish
* Unpublish

content.

Admin should be able to manage:

* Articles
* Duas
* Azkar
* Hadith metadata
* Quiz questions
* Kids content
* Downloads
* Categories

Use confirmation dialogs before destructive actions.

---

# 43. ROLE SYSTEM

Create role-based authorization.

Roles:

```text
User
Admin
```

Regular users must never access admin APIs.

Protect admin routes on both:

**Frontend + Backend**

---

# 44. BACKEND ARCHITECTURE

Use:

**Node.js + Express.js + MongoDB + Mongoose**

Structure:

```text
server/
│
├── config/
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── utils/
├── validators/
└── server.js
```

Use clean separation of responsibilities.

---

# 45. DATABASE MODELS

Create scalable MongoDB models for:

```text
User
Bookmark
Favorite
ReadingHistory
UserSettings
Hadith
Dua
Azkar
Article
Quiz
QuizAttempt
Category
Download
Notification
PrayerSettings
```

User model should support:

```text
name
email
phone
password
profileImage
role
emailVerified
phoneVerified
preferences
createdAt
updatedAt
```

Do not store sensitive information unnecessarily.

---

# 46. USER AVATAR LOGIC

Implement dynamic avatar generation.

Logic:

```text
If profileImage exists:
    Show profile image

Else:
    Take first character of user's name
    Convert it to uppercase
    Display it inside circular avatar
```

Example:

```text
Sakib Hasan → S
Ahmed Khan → A
Fatima → F
```

Use the same avatar throughout:

* Navbar
* Profile
* Comments if added later
* Settings
* Dashboard
* Mobile menu

---

# 47. API ARCHITECTURE

Create REST APIs such as:

```text
/api/auth
/api/users
/api/quran
/api/hadith
/api/duas
/api/azkar
/api/articles
/api/quiz
/api/bookmarks
/api/favorites
/api/history
/api/notifications
/api/prayer
```

Use proper:

* HTTP status codes
* Error responses
* Validation
* Authentication middleware
* Authorization middleware

---

# 48. SECURITY

Implement:

* Password hashing with bcrypt
* JWT authentication
* Protected routes
* Role-based authorization
* Input validation
* Sanitization where appropriate
* Secure cookies/token strategy as appropriate
* Rate limiting for sensitive endpoints
* CORS configuration
* Environment variables
* Secure error handling

Never expose:

```text
JWT_SECRET
Database credentials
API secrets
Private keys
```

in frontend code or GitHub.

---

# 49. CONTENT INTEGRITY

This is an Islamic platform, so content accuracy is extremely important.

For Quran, Hadith, Duas and Azkar:

* Use reliable sources
* Preserve Arabic accurately
* Clearly show references
* Clearly distinguish translations
* Do not invent religious content
* Do not generate fake Hadith
* Do not present AI-generated religious claims as authoritative
* Keep content data separate from application logic
* Provide source/reference wherever applicable
* Make content reviewable by an admin

---

# 50. SEARCH ENGINE OPTIMIZATION

Make public content SEO-friendly.

Implement:

* Proper page titles
* Meta descriptions
* Semantic HTML
* Open Graph metadata
* Sitemap
* Robots configuration
* Clean URLs

Example:

```text
/quran
/quran/surah/al-baqarah
/hadith
/duas
/azkar
/articles
/islamic-calendar
```

---

# 51. PERFORMANCE

Optimize the website for speed.

Use:

* Lazy loading
* Code splitting
* Image optimization
* API caching where appropriate
* Pagination
* Efficient MongoDB queries
* Database indexes
* Debounced search
* Minimal unnecessary React renders

The website should feel fast even on mobile networks.

---

# 52. PWA

Prepare the website as a Progressive Web App.

Support:

* Installable website
* App icon
* Splash experience
* Offline-friendly shell
* Caching of appropriate public resources

Do not claim religious content is available offline unless it has actually been cached/packaged.

---

# 53. ERROR / EMPTY / LOADING STATES

Every important page should have:

### Loading State

Beautiful skeleton loaders.

### Empty State

Example:

```text
No bookmarks yet.

Start saving content that inspires you.
```

### Error State

Friendly error message with:

**Try Again**

Never show raw server errors to users.

---

# 54. 404 PAGE

Create a beautiful Islamic-themed 404 page.

Example:

```text
404

This path could not be found.

Return to Home
```

Keep it elegant and minimal.

---

# 55. FOOTER

Create a premium footer.

Include:

```text
RAH-E-HIDAYAT

Walk the Path of Guidance.

Quran
Duas
Hadith
Azkar
Articles
Quiz
About
Contact
Privacy
Terms
```

Also include social links if configured.

---

# 56. CONTACT / FEEDBACK

Create a contact/feedback page.

Users can submit:

* Feedback
* Suggestions
* Bug reports
* Content concerns

Admin can review submissions.

---

# 57. PRIVACY AND ACCOUNT CONTROLS

Create:

* Privacy Policy page
* Terms page
* Account settings
* Logout
* Delete account option

If account deletion is provided, handle it securely and clearly explain what data is removed/retained.

---

# 58. ANIMATIONS

Use Framer Motion.

Add subtle:

* Page transitions
* Card entrance animations
* Hover animations
* Modal animations
* Menu animations
* Progress animations
* Scroll animations

Animations should feel:

**Smooth + Calm + Premium**

Never make the website distracting.

Respect users who prefer reduced motion.

---

# 59. MICRO-INTERACTIONS

Add polished interactions:

* Bookmark animation
* Favorite animation
* Copy confirmation
* Share confirmation
* Button feedback
* Toast notifications
* Audio player feedback
* Tasbeeh counter feedback
* Search suggestions
* Profile avatar interaction

---

# 60. MOBILE EXPERIENCE

Mobile should feel like a real Islamic mobile application.

Include:

* Bottom navigation
* Sticky Quran audio player
* Swipe-friendly cards
* Large buttons
* Mobile profile menu
* Mobile search
* Mobile Tasbeeh
* Mobile prayer countdown
* Mobile-friendly Quran reader

Make all interactive elements touch-friendly.

---

# 61. FINAL USER EXPERIENCE

A normal visitor should be able to:

```text
Open Website
      ↓
Explore Quran
      ↓
Read / Listen
      ↓
Discover Dua / Hadith
      ↓
Check Prayer Times
      ↓
Use Tasbeeh
      ↓
Create Account
      ↓
Save Bookmarks
      ↓
Track Reading
      ↓
Personalized Profile
```

---

# 62. PROFILE EXPERIENCE EXAMPLE

For a user named:

**Sakib Hasan**

Navbar should show:

```text
┌─────┐
│  S  │
└─────┘
Sakib Hasan
```

Clicking it opens:

```text
Profile
────────────────────

       ┌─────┐
       │  S  │
       └─────┘

     Sakib Hasan
   sakib@email.com

   7 Day Streak 🔥

────────────────────

📖 Quran
12 Surahs Read

📚 Hadith
48 Read

❤️ Saved
24 Items

📿 Tasbeeh
1,240 Counts

────────────────────

My Bookmarks
Reading History
Quiz History
Settings
Logout
```

Make this interface visually premium.

---

# 63. TECHNICAL QUALITY

Write clean, maintainable code.

Do not create one giant component.

Use reusable components such as:

```text
Navbar
Hero
SectionHeader
QuranCard
HadithCard
DuaCard
AzkarCard
PrayerCard
TasbeehCounter
ProfileAvatar
BookmarkButton
ShareButton
AudioPlayer
SearchBar
Modal
Toast
Loader
EmptyState
```

Use reusable hooks and services.

Avoid unnecessary duplication.

---

# 64. COMPONENT ARCHITECTURE

Frontend:

```text
src/
│
├── assets/
├── components/
│   ├── common/
│   ├── navbar/
│   ├── quran/
│   ├── hadith/
│   ├── duas/
│   ├── azkar/
│   ├── tasbeeh/
│   ├── prayer/
│   ├── profile/
│   └── admin/
│
├── pages/
├── layouts/
├── hooks/
├── context/
├── services/
├── utils/
├── routes/
└── App.jsx
```

Backend:

```text
server/
│
├── config/
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── validators/
├── utils/
└── server.js
```

---

# 65. DO NOT BUILD A GENERIC WEBSITE

This is extremely important.

Do NOT create:

* Generic SaaS dashboard
* Generic green Islamic template
* Random mosque stock image everywhere
* Excessive gold
* Excessive gradients
* Excessive glassmorphism
* Overly rounded everything
* Excessive animations
* Cluttered homepage

Instead create a **unique visual identity for RAH-E-HIDAYAT**.

---

# 66. DESIGN INSPIRATION

The website should combine:

**Modern premium web design**

with:

**Traditional Islamic visual principles**

Use inspiration from:

* Islamic geometry
* Architecture
* Elegant manuscripts
* Light and shadow
* Nature
* Crescent
* Stars
* Subtle ornamental patterns

But do not copy another website.

Create an original design.

---

# 67. FINAL PRODUCT FEEL

The final website should feel:

### Spiritual

Peaceful and calming.

### Premium

High-quality visual design.

### Modern

Contemporary UI and technology.

### Trustworthy

Accurate and referenced Islamic content.

### Fast

Excellent performance.

### Personal

User profile, bookmarks and history.

### Responsive

Perfect on every screen.

### Scalable

Ready for future features.

---

# 68. FINAL OUTPUT REQUIREMENT

Do not only generate a homepage.

Build the complete application architecture and all major screens.

Provide:

1. Complete frontend
2. Complete backend
3. MongoDB models
4. Authentication
5. User profile
6. Dynamic initial-letter avatar
7. Quran experience
8. Hadith experience
9. Dua system
10. Azkar
11. Digital Tasbeeh
12. Prayer times
13. Islamic Calendar
14. Articles
15. Quiz
16. Kids Corner
17. Downloads
18. Bookmarks
19. Favorites
20. Reading history
21. Notifications
22. Settings
23. Admin dashboard
24. Responsive design
25. Dark mode
26. Search
27. Error/loading states
28. SEO foundations
29. PWA foundations
30. Secure production-ready architecture

The final result should look like a **real premium Islamic technology platform**, not a student-level CRUD project.

# BRAND STATEMENT

**RAH-E-HIDAYAT**

### “Walk the Path of Guidance.”

Build the experience around this idea:

**A peaceful digital place to read, learn, remember and reflect.**

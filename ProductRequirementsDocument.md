# Product Requirements Document (PRD)

## 1. Product Information

**Product Name:** QR Business Card Platform
**Version:** MVP v1.0
**Product Type:** B2B2C Web Application
**Platform:** Responsive Web
**Primary User:** Business Owner / Service Provider
**End User:** Business Owner's Customer

### Technology Stack

* **Framework:** Next.js + TypeScript
* **Styling:** Tailwind CSS
* **UI Components:** shadcn/ui
* **ORM:** Prisma
* **Database:** PostgreSQL
* **Architecture:** Next.js Full-Stack Application
* **QR:** Dynamic QR Code
* **Validation:** Zod

---

# 2. Product Overview

QR Business Card Platform သည် Business Owner တစ်ယောက်က သူ့ရဲ့ Customer များအတွက် digital business card များကို ဖန်တီး၊ စီမံ၊ update လုပ်ပြီး QR Code ဖြင့် share ပေးနိုင်ရန် ရည်ရွယ်ထားသော web application ဖြစ်သည်။

Customer တစ်ယောက်ချင်းစီတွင် unique QR Code နှင့် public digital business card တစ်ခု ရှိမည်။

### Core Concept

```text
Business Owner
      ↓
Create Customer
      ↓
Create Digital Card
      ↓
Generate QR Code
      ↓
Share QR with Customer
      ↓
Customer scans QR
      ↓
Public Digital Business Card
```

### Core Value Proposition

> **Create and manage digital QR business cards for your customers from one dashboard.**

---

# 3. Problem Statement

Traditional business cards များတွင် အောက်ပါပြဿနာများရှိသည်။

* Contact information ပြောင်းလဲလျှင် card အသစ် print လုပ်ရသည်။
* Phone number, email, website, social links များကို တစ်နေရာတည်းတွင် မစီမံနိုင်ပါ။
* Business Owner များသည် customer အများအတွက် digital cards ဖန်တီးရန် centralized management system မရှိနိုင်ပါ။
* Printed business cards များတွင် update လုပ်နိုင်ခြင်းမရှိပါ။
* Customer သည် contact information ကို phone ထဲသို့ manually ထည့်ရနိုင်သည်။

QR Business Card Platform သည် dynamic QR + digital profile ဖြင့် အဆိုပါ workflow ကို digitalize လုပ်မည်။

---

# 4. Product Goals

MVP ၏ အဓိကရည်ရွယ်ချက်များမှာ—

1. Business Owner account တည်ဆောက်နိုင်ရန်
2. Customer များကို create/manage လုပ်နိုင်ရန်
3. Customer တစ်ယောက်ချင်းစီအတွက် digital business card ဖန်တီးနိုင်ရန်
4. Unique dynamic QR Code generate လုပ်နိုင်ရန်
5. Customer က QR scan ပြီး card ကို login မလိုဘဲ ကြည့်နိုင်ရန်
6. Customer information ကို QR အသစ်မထုတ်ဘဲ update လုပ်နိုင်ရန်
7. QR scan အရေအတွက်ကို basic analytics အဖြစ် ကြည့်နိုင်ရန်

---

# 5. Non-Goals

MVP v1.0 တွင် အောက်ပါ features များ မပါဝင်ပါ။

* Payment Gateway
* Subscription Billing
* Team Management
* Advanced CRM
* Chat System
* Appointment Booking
* E-commerce
* AI Features
* Native Mobile Application
* Advanced Analytics
* Marketing Automation
* Multi-language CMS

---

# 6. User Roles

## 6.1 Business Owner

Business Owner သည် platform ၏ primary authenticated user ဖြစ်သည်။

### Permissions

* Register
* Login
* Manage business profile
* Create customer
* Edit customer
* Deactivate customer
* Create QR card
* View QR card
* Download QR
* Share card
* View scan statistics

---

## 6.2 Customer

Customer သည် account မလိုပါ။

Customer သည် QR Code ကို scan လုပ်ပြီး public digital business card ကိုကြည့်နိုင်သည်။

### Customer Actions

* View profile
* Call
* Email
* Open website
* Open social links
* Open location
* Save contact
* Share card

---

# 7. Core User Flow

## Business Owner Flow

```text
Register
   ↓
Create Business Profile
   ↓
Dashboard
   ↓
Add Customer
   ↓
Enter Customer Information
   ↓
Create QR Business Card
   ↓
Generate QR
   ↓
Download / Share
```

## Customer Flow

```text
Receive QR
   ↓
Scan QR
   ↓
Open Browser
   ↓
View Digital Business Card
   ↓
Call / Email / Website / Social
   ↓
Save Contact
```

---

# 8. Functional Requirements

## 8.1 Authentication

Business Owner သည် account တည်ဆောက်နိုင်ရမည်။

### Features

* Register
* Login
* Logout
* Password validation
* Protected dashboard routes

### Registration Fields

* Name
* Business Name
* Email
* Password

---

# 9. Business Profile

Business Owner သည် သူ့ Business information ကို manage လုပ်နိုင်ရမည်။

### Fields

* Business Name
* Logo
* Description
* Phone
* Email
* Address
* Website

Business profile သည် customer cards များနှင့် ဆက်စပ်နေမည်။

---

# 10. Dashboard

Login ဝင်ပြီးနောက် Business Owner သည် dashboard ကိုမြင်ရမည်။

### Dashboard Metrics

```text
Customers
128

Active Cards
115

Inactive Cards
13

Total Scans
4,820
```

### Quick Actions

```text
[ Add Customer ]
[ View Customers ]
```

Dashboard သည် MVP အတွက် simple ဖြစ်ရမည်။

---

# 11. Customer Management

Business Owner သည် customer များကို centralized list မှ manage လုပ်နိုင်ရမည်။

### Customer List

```text
Customers

Search...

Name        Company       Status
----------------------------------
John Doe    ABC Co.       Active
Su Su       XYZ Co.       Active
Mg Mg       MNO Co.       Inactive
```

### Actions

* View
* Edit
* Create/View QR
* Deactivate

### Search

Customer name သို့မဟုတ် company name ဖြင့် search လုပ်နိုင်ရမည်။

---

# 12. Create Customer

Business Owner သည် customer အသစ်တစ်ယောက်ကို create လုပ်နိုင်ရမည်။

### Required Fields

* Full Name
* Phone

### Optional Fields

* Profile Photo
* Job Title
* Company
* Email
* Address
* Website
* Bio

### Social Links

MVP တွင်—

* Facebook
* LinkedIn
* Telegram
* WhatsApp

တို့ကို support လုပ်နိုင်ရမည်။

---

# 13. QR Business Card

Customer တစ်ယောက် create ပြီးပါက QR Business Card တစ်ခုဖန်တီးနိုင်ရမည်။

### QR Card Contains

* Customer profile
* Contact information
* Social links
* Unique public URL

Example:

```text
https://app.com/card/abc123
```

ဒီ URL ကို QR Code အဖြစ် generate လုပ်မည်။

---

# 14. Dynamic QR

QR Code ထဲတွင် customer information ကို တိုက်ရိုက် encode မလုပ်ရ။

### Required Architecture

```text
QR Code
   ↓
/card/abc123
   ↓
Next.js
   ↓
Prisma
   ↓
PostgreSQL
   ↓
Customer Data
   ↓
Public Digital Card
```

ဒါကြောင့် Customer information ပြောင်းလဲသော်လည်း QR Code ကို ပြန် generate လုပ်ရန် မလိုအပ်ပါ။

### Example

Before:

```text
John Doe
09 123456789
ABC Company
```

After update:

```text
John Doe
09 987654321
XYZ Company
```

QR သည် အတူတူပင်ဖြစ်သည်။

---

# 15. Public Digital Business Card

Customer က QR scan လုပ်သောအခါ public card page ကိုမြင်ရမည်။

### Card Information

* Profile photo
* Full name
* Job title
* Company
* Bio
* Phone
* Email
* Website
* Address
* Social links

### Main Actions

```text
[ Call ]
[ Email ]
[ Website ]

[ Save Contact ]

Facebook
LinkedIn
Telegram
WhatsApp
```

### Requirements

* No login required
* Mobile-first
* Responsive
* Fast loading
* Shareable URL

---

# 16. Contact Actions

## Call

Phone number ကိုနှိပ်လျှင် device phone application ကိုဖွင့်မည်။

## Email

Email button နှိပ်လျှင် email application ကိုဖွင့်မည်။

## Website

Customer website ကိုဖွင့်မည်။

## Location

Customer address ကို map service ဖြင့်ဖွင့်နိုင်မည်။

## Social Links

သက်ဆိုင်ရာ social profile သို့ redirect လုပ်မည်။

---

# 17. Save Contact

Public card တွင်—

```text
[ Save Contact ]
```

button ပါရမည်။

User နှိပ်ပါက customer information ပါဝင်သော vCard file ကို download လုပ်နိုင်ရမည်။

Example:

```text
John Doe
ABC Company
CEO
09xxxxxxxx
john@example.com
website.com
```

---

# 18. QR Management

Business Owner သည် customer QR ကို manage လုပ်နိုင်ရမည်။

### Actions

* View QR
* Download QR
* Copy Card Link
* Share Card
* Print QR
* Deactivate Card

### MVP Download

* PNG

### Future

* SVG
* PDF
* Print templates
* Custom QR styles

---

# 19. Card Status

QR Card တွင် status ရှိရမည်။

```text
ACTIVE
INACTIVE
```

### ACTIVE

QR scan → Public card ပြမည်။

### INACTIVE

QR scan → unavailable message ပြမည်။

```text
This business card is currently unavailable.
```

---

# 20. Basic Analytics

MVP တွင် basic scan analytics သာပါဝင်မည်။

### Dashboard

```text
Total Scans
4,820

Today
32

This Week
184

This Month
720
```

Customer level တွင်လည်း—

```text
John Doe

Total Scans
324
```

ကိုကြည့်နိုင်ရမည်။

### Scan Data

MVP တွင်—

* QR Card ID
* Scanned At
* User Agent

တို့ကို သိမ်းဆည်းမည်။

---

# 21. Database Requirements

### Entity Relationship

```text
User
  │
  │ 1:1
  ▼
Business
  │
  │ 1:N
  ▼
Customer
  │
  │ 1:1
  ▼
QrCard
  │
  │ 1:N
  ▼
Scan
```

### Prisma Models

Core models:

* User
* Business
* Customer
* QrCard
* Scan

Additional model:

* SocialLink

---

# 22. Database Schema Requirements

## User

```text
id
name
email
passwordHash
createdAt
updatedAt
```

## Business

```text
id
ownerId
name
logo
description
phone
email
address
website
createdAt
updatedAt
```

## Customer

```text
id
businessId
name
photo
jobTitle
company
phone
email
address
website
bio
status
createdAt
updatedAt
```

## SocialLink

```text
id
customerId
platform
url
```

## QrCard

```text
id
customerId
slug
status
createdAt
updatedAt
```

## Scan

```text
id
qrCardId
scannedAt
userAgent
```

---

# 23. Application Routes

```text
/
├── /login
├── /register
│
├── /dashboard
│
├── /dashboard/customers
├── /dashboard/customers/new
├── /dashboard/customers/[id]
│
├── /dashboard/cards/[id]
│
└── /card/[slug]
```

### Route Types

Authenticated:

```text
/dashboard/*
```

Public:

```text
/card/[slug]
```

---

# 24. UI Requirements

## Design Direction

**Modern SaaS × Premium Business Card**

### Principles

* Clean
* Minimal
* Professional
* Mobile-first
* Accessible
* Consistent spacing
* Clear hierarchy

### UI Library

Use **shadcn/ui** for:

* Button
* Input
* Label
* Card
* Dialog
* Dropdown Menu
* Table
* Badge
* Avatar
* Sheet
* Alert Dialog
* Skeleton
* Sonner

### Styling

Use **Tailwind CSS** for:

* Layout
* Spacing
* Typography
* Responsive design
* Grid
* Flex
* States
* Visual styling

---

# 25. Recommended Application Structure

```text
src/
├── app/
│   ├── (marketing)/
│   ├── (auth)/
│   ├── dashboard/
│   ├── card/
│   └── api/
│
├── components/
│   ├── ui/
│   ├── dashboard/
│   ├── customers/
│   ├── qr-card/
│   └── public-card/
│
├── actions/
│   ├── business-actions.ts
│   ├── customer-actions.ts
│   └── card-actions.ts
│
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── validations/
│   └── utils.ts
│
└── types/

prisma/
└── schema.prisma
```

---

# 26. Security Requirements

MVP တွင် အနည်းဆုံး—

* Password hashing
* Protected dashboard routes
* Server-side authorization
* Input validation
* Zod validation
* Customer ownership verification
* Business ownership verification

လိုအပ်သည်။

### Important

Business Owner A သည် Business Owner B ၏ customer data ကို access မလုပ်နိုင်ရ။

```text
Owner A
  ↓
Business A
  ↓
Customer A only
```

---

# 27. Validation Requirements

Customer create/update တွင်—

* Name required
* Phone format validation
* Email format validation
* URL validation
* Social URL validation

တို့ကို server-side + client-side validation လုပ်ရမည်။

---

# 28. MVP Acceptance Criteria

MVP သည် အောက်ပါ workflow တစ်ခုလုံး အောင်မြင်စွာလုပ်ဆောင်နိုင်ပါက complete ဖြစ်သည်။

### Owner

```text
Register
   ↓
Login
   ↓
Add Customer
   ↓
Enter Customer Data
   ↓
Create QR Card
   ↓
Download QR
```

### Customer

```text
Scan QR
   ↓
Open Public Card
   ↓
View Information
   ↓
Call / Email / Website
   ↓
Save Contact
```

### Update

```text
Owner edits customer
        ↓
Customer data updated
        ↓
Existing QR still works
```

### Analytics

```text
Customer scans QR
        ↓
Scan recorded
        ↓
Dashboard count increases
```

---

# 29. MVP Priority

## P0 — Must Have

* Authentication
* Business Profile
* Customer CRUD
* Dynamic QR generation
* Public digital card
* QR download
* Contact actions
* Save Contact
* Card activation/deactivation

## P1 — Should Have

* Search customers
* Basic scan analytics
* Social links
* Share card
* Print QR

## P2 — Future

* Custom card templates
* Custom QR colors
* Logo inside QR
* Multiple QR designs
* Bulk customer import
* CSV import/export
* Advanced analytics
* PDF printing
* Team management
* Subscription
* Payment
* White-label branding

---

# 30. MVP Success Definition

The MVP is successful when a Business Owner can:

> **Create a customer → create a digital QR business card → download/share the QR → customer scans it → customer views the digital card → customer can contact/save the person → owner can update the information without changing the QR.**

ဒီ workflow ကို **simple, reliable, fast** ဖြစ်အောင်လုပ်တာက MVP ရဲ့ main objective ဖြစ်သည်။

---

# 31. Product Expansion — Future Vision

MVP အောင်မြင်ပြီးနောက် platform ကို—

```text
QR Business Card
        ↓
Customer Management
        ↓
Digital Identity
        ↓
Business Networking
        ↓
CRM
        ↓
Marketing Analytics
```

အထိ တိုးချဲ့နိုင်သည်။

သို့သော် MVP တွင် **QR Business Card creation + customer management + public card** ကိုသာ core product အဖြစ်ထားမည်။

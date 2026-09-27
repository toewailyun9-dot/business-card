import Link from "next/link";
import {
  QrCode,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Share2,
  Smartphone,
  BarChart3,
  Building,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <QrCode className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-200">
              QR Card Platform
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-600/20 transition-all active:scale-98"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dynamic QR Business Card Suite v1.0</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Create and manage{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              dynamic QR cards
            </span>{" "}
            for your customers
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
            Eliminate reprinting costs forever. Provide your clients and team members with permanent dynamic QR business cards that update in real-time, generate contact files (.vcf), and track scan analytics.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition-all active:scale-98"
            >
              <span>Create Business Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-800 shadow-md transition-all active:scale-98"
            >
              <Smartphone className="w-4 h-4 text-indigo-400" />
              <span>Go to Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Feature Teaser Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl hover:border-indigo-500/40 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Dynamic QR Technology</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Customer phone numbers or jobs change? Edit details instantly without re-printing or re-generating the physical QR code.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl hover:border-purple-500/40 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1-Click Contact Save</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Recipients can download standard .vcf cards to instantly add the contact directly to their iPhone or Android address book.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl hover:border-pink-500/40 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Built-in Scan Analytics</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Track how many times cards are scanned with real-time analytics daily, weekly, and monthly across all client profiles.
            </p>
          </div>
        </div>

        {/* Workflow Showcase */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            How It Works in 4 Simple Steps
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-10">
            From creation to real-world customer engagement in under 2 minutes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs font-mono font-bold text-indigo-400">STEP 01</span>
              <h4 className="text-base font-semibold text-white mt-1 mb-1">Add Customer</h4>
              <p className="text-xs text-slate-400">
                Input name, phone, email, company, and social links in the dashboard.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs font-mono font-bold text-purple-400">STEP 02</span>
              <h4 className="text-base font-semibold text-white mt-1 mb-1">Generate Dynamic QR</h4>
              <p className="text-xs text-slate-400">
                A permanent high-res QR code and unique card slug are created instantly.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs font-mono font-bold text-pink-400">STEP 03</span>
              <h4 className="text-base font-semibold text-white mt-1 mb-1">Share or Print</h4>
              <p className="text-xs text-slate-400">
                Download high-res PNG, print, or share the dynamic public card link.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs font-mono font-bold text-emerald-400">STEP 04</span>
              <h4 className="text-base font-semibold text-white mt-1 mb-1">Scan & Save</h4>
              <p className="text-xs text-slate-400">
                End users scan the code with their smartphone and save the contact.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-indigo-500" />
            <span className="font-semibold text-slate-400">QR Business Card Platform</span>
          </div>
          <div>
            Built with Next.js, Prisma, PostgreSQL & Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
}

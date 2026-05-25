import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-accent py-12 mt-16">
      <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white tracking-tight">
            Agro<span className="text-primary">Honey</span>
          </h3>
          <p className="text-sm text-gray-400 max-w-xs">
            Premium, raw, and pure honey tracked from the hive straight to your home. Experience nature&apos;s liquid gold.
          </p>
        </div>

        {/* Shop */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/store?category=raw" className="hover:text-primary transition-colors">Raw Honey</Link></li>
            <li><Link href="/store?category=manuka" className="hover:text-primary transition-colors">Manuka (UMF™)</Link></li>
            <li><Link href="/store?category=gifts" className="hover:text-primary transition-colors">Gift Sets</Link></li>
            <li><Link href="/traceability" className="hover:text-primary transition-colors">Trace Your Batch</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Support</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/track-order" className="hover:text-primary transition-colors">Track Order</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Join the Hive</h4>
          <p className="text-sm text-gray-400">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 bg-gray-800 text-white rounded-md text-sm w-full focus:outline-none focus:ring-1 focus:ring-primary border border-gray-700"
            />
            <button type="button" className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md text-sm font-medium transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="container-custom mt-12 pt-8 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} AgroHoney. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

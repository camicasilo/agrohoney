import Link from "next/link";
import { sdk } from "../lib/medusa";

export default async function Home() {
  let products = [];
  try {
    // Fetch real products from the Medusa backend
    const { products: fetchedProducts } = await sdk.store.product.list({
      limit: 4,
      fields: "id,title,handle,thumbnail,variants.prices,categories.name"
    });
    products = fetchedProducts || [];
  } catch (error) {
    console.error("Failed to fetch products from Medusa backend:", error);
    // Fallback to empty if the backend is unreachable during build or dev
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gray-900 overflow-hidden">
        {/* Placeholder for Hero Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587049352847-4d4b126a61fc?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay"></div>
        <div className="relative z-10 text-center space-y-6 max-w-3xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
            Pure Liquid <span className="text-primary">Gold</span>
          </h1>
          <p className="text-xl text-gray-200">
            Discover the rarest, most potent honey harvested from the pristine landscapes of our selected apiaries. Uncompromising quality, straight from the hive.
          </p>
          <div className="pt-4 flex gap-4 justify-center">
            <Link href="/store" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-md text-lg font-medium transition-all transform hover:scale-105">
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-accent py-6 border-b border-gray-200">
        <div className="container-custom flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-semibold uppercase tracking-wider text-secondary">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            100% Raw & Pure
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Sustainably Harvested
          </div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Secure Global Shipping
          </div>
        </div>
      </section>

      {/* Featured UMF/MGO Filter Section (Clone Requirement) */}
      <section className="py-20 container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Potency</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our premium grade honey is rigorously tested and certified. Select the perfect UMF™ / MGO rating for your wellness needs.
          </p>
        </div>

        {/* Filter Tabs Placeholder */}
        <div className="flex justify-center gap-2 md:gap-4 mb-12 flex-wrap">
          {["All", "UMF™ 5+", "UMF™ 10+", "UMF™ 15+", "UMF™ 20+"].map((tab, idx) => (
            <button
              key={idx}
              className={`px-6 py-2 rounded-full border text-sm font-medium transition-colors ${idx === 0 ? 'bg-foreground text-white border-foreground' : 'bg-white text-foreground border-gray-300 hover:border-primary hover:text-primary'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Grid dynamically fetching from Medusa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length > 0 ? products.map((item: Record<string, unknown>) => {
            const variants = item.variants as { prices?: { amount?: string | number }[] }[] | undefined;
            const price = variants?.[0]?.prices?.[0]?.amount
              ? Number(variants[0].prices[0].amount).toFixed(2)
              : "0.00";

            const categories = item.categories as { name?: string }[] | undefined;
            const categoryName = categories?.[0]?.name ? categories[0].name : "Premium Honey";

            return (
              <Link href={`/product/${item.handle}`} key={item.id as string} className="group cursor-pointer">
                <div className="aspect-[4/5] bg-accent rounded-lg overflow-hidden relative mb-4">
                  {item.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.thumbnail as string}
                      alt={item.title as string}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex-center text-secondary/30 group-hover:scale-105 transition-transform duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                  )}
                </div>
                <div className="space-y-1 text-center">
                  <div className="text-xs font-semibold tracking-widest text-primary uppercase">{categoryName as string}</div>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">{item.title as string}</h3>
                  <p className="text-gray-500">${price}</p>
                </div>
              </Link>
            )
          }) : (
            // Fallback empty state if backend is down or no products exist
            <div className="col-span-full text-center py-12 text-gray-500">
              No products found. Please ensure the Medusa backend is running and seeded.
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link href="/store" className="inline-block border-b-2 border-foreground pb-1 font-medium hover:text-primary hover:border-primary transition-colors">
            View All Products
          </Link>
        </div>
      </section>

      {/* Traceability Section (Clone Requirement) */}
      <section className="bg-secondary text-white py-24 relative overflow-hidden">
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 z-10 relative">
            <h2 className="text-4xl font-bold">Tracked from Hive to Home</h2>
            <p className="text-secondary-100 text-lg opacity-90">
              Every jar of our honey carries a unique batch code. Enter your code to trace the exact journey of your honey—from the specific apiary where it was harvested, right to your doorstep.
            </p>
            <form className="flex gap-2 max-w-md pt-4" aria-label="Track Batch Code">
              <input
                type="text"
                placeholder="Enter your Batch Code (e.g. BATCH-123)"
                className="px-4 py-3 bg-white text-foreground rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="button" className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md font-medium transition-colors whitespace-nowrap">
                Trace
              </button>
            </form>
          </div>
          <div className="relative h-96 bg-gray-800 rounded-lg overflow-hidden">
             {/* Map/Hive Image Placeholder */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587049352851-8d4e89134a6e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-luminosity"></div>
             <div className="absolute inset-0 flex-center">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-full border border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SEO/Content Section */}
      <section className="py-20 container-custom max-w-4xl text-center space-y-6">
        <h2 className="text-3xl font-bold">Why Our Honey is Different</h2>
        <p className="text-gray-600 leading-relaxed">
          Unlike mass-produced alternatives, our honey is raw, unpasteurized, and minimally processed to preserve its natural enzymes, antioxidants, and unique flavor profile. We work directly with master beekeepers who prioritize the health of the bees and the sustainability of the land.
        </p>
      </section>
    </div>
  );
}

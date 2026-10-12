import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { products } from '@/data/products';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { MobileCarousel } from '@/components/ui/MobileCarousel';
import '@/styles/mobile-carousel.css';

export function ProductShowcase() {
  // Build slide components for carousel - simplified to work with slider__card
  const slides = products.map((product, index) => (
    <div
      key={product.id}
      className="slider__card"
      data-slider-card
      data-slide-index={index}
    >
      <button
        type="button"
        className="w-full h-full aspect-[4/3] rounded-2xl overflow-hidden bg-pink-50 focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-offset-2"
        aria-label={`Produk: ${product.name}`}
      >
        <img
          src={product.image}
          alt=""
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          loading={index < 2 ? 'eager' : 'lazy'}
          aria-hidden="true"
        />
        {product.badge && (
          <span className="absolute top-3 right-3 bg-brand text-white text-xs font-semibold px-2.5 py-1 rounded-pill shadow-md">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-heading/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
        <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 hover:opacity-100 transition-all duration-300 translate-y-2 hover:translate-y-0">
          <p className="font-heading text-lg font-medium">{product.name}</p>
          <p className="text-xs text-white/80">{product.category}</p>
        </div>
      </button>
    </div>
  ));

  return (
    <section
      id="products"
      className="relative bg-pink-50 section-padding overflow-hidden"
      aria-labelledby="products-title"
      style={{ scrollMarginTop: '80px' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 via-transparent to-transparent" aria-hidden="true" />
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="lg:order-1 relative z-10 animate-slide-up">
            <SectionHeading
              ref={(el) => { if (el) el.id = 'products-title'; }}
              eyebrow="PRODUK UNGGULAN"
              title="Produk Perawatan Rambut Pilihan"
              subtitle="Gunakan produk berkualitas untuk menjaga kesehatan dan keindahan rambut Anda."
              centered={false}
              cta={
                <Button variant="ghost" size="md" icon="arrow-right" className="text-brand hover:text-brand-hover">
                  Lihat Semua Produk
                </Button>
              }
            />
          </div>

          <div className="lg:order-2">
            {/* Mobile Carousel - IDENTIK dengan Gallery */}
            <MobileCarousel
              id="products-carousel"
              ariaLabel="Produk unggulan salon"
              count={products.length}
            >
              {slides}
            </MobileCarousel>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {products.map((product, index) => (
                <article
                  key={product.id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-pink-100 hover:shadow-xl hover:border-brand/20 transition-all duration-500 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      aria-hidden="true"
                    />
                    {product.badge && (
                      <span className="absolute top-3 right-3 bg-brand text-white text-xs font-semibold px-2.5 py-1 rounded-pill shadow-md">
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-heading/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4" aria-hidden="true">
                      <button
                        type="button"
                        className="w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm shadow-lg focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                        aria-label={`Lihat detail ${product.name}`}
                        disabled
                        aria-disabled="true"
                      >
                        <ArrowRight className="w-6 h-6 text-brand" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-brand font-semibold uppercase tracking-wider mb-1">{product.category}</p>
                    <h3 className="font-heading text-lg font-semibold text-heading mb-2 group-hover:text-brand transition-colors">{product.name}</h3>
                    <p className="text-sm text-text-muted mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-baseline gap-3">
                      <span className="font-heading text-xl font-semibold text-heading">
                        Rp{product.price.toLocaleString('id-ID')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-text-muted line-through">
                          Rp{product.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
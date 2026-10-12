import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative bg-pink-50 overflow-hidden"
      aria-labelledby="hero-title"
      style={{ scrollMarginTop: '80px' }}
    >
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 md:py-24 lg:py-32">
          <div className="lg:order-1 relative z-10 animate-slide-up">
            <span className="section-eyebrow inline-block">SALON & HAIR CARE</span>
            <h1
              id="hero-title"
              className="font-heading font-semibold text-heading leading-tight mt-4 mb-6 tracking-tight text-balance"
              style={{
                fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
                lineHeight: '1.1',
              }}
            >
              Rambut Sehat,
              <span className="block">Penampilan Lebih</span>
              <span className="block text-brand">Percaya Diri</span>
            </h1>
            <p className="text-lg md:text-xl text-text max-w-xl mb-8 leading-relaxed">
              Temukan perawatan rambut profesional dan produk berkualitas untuk kecantikan alami yang bersinar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                icon="arrow-right"
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Lihat Hasil Kerja
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Produk Kami
              </Button>
            </div>
          </div>

          <div className="lg:order-2 relative">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden">
              <img
                src="/images/hair-la-venia/hero-model.svg"
                alt="Model rambut panjang glossy dengan perawatan salon profesional"
                className="w-full h-full object-cover"
                loading="eager"
                width="1920"
                height="1080"
                style={{ contentVisibility: 'auto' }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-pink-50/90 via-pink-50/30 to-transparent" aria-hidden="true" />
            </div>
            <div className="absolute -top-4 -right-4 w-32 h-32 md:w-48 md:h-48 rounded-full bg-brand/10 blur-3xl animate-float" aria-hidden="true" />
            <div className="absolute bottom-8 left-4 w-24 h-24 md:w-32 md:h-32 rounded-full bg-brand/5 blur-2xl animate-float" style={{ animationDelay: '2s' }} aria-hidden="true" />
          </div>
        </div>
      </Container>
    </section>
  );
}
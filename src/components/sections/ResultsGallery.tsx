import { useState, useRef, useEffect, useCallback } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { galleryImages } from '@/data/gallery';
import { MobileCarousel } from '@/components/ui/MobileCarousel';
import '@/styles/mobile-carousel.css';

export function ResultsGallery() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    lastFocusedRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    document.body.style.overflow = '';
    lastFocusedRef.current?.focus();
  }, []);

  const goToPrev = useCallback(() => {
    if (isLightboxOpen) {
      setLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    }
  }, [isLightboxOpen]);

  const goToNext = useCallback(() => {
    if (isLightboxOpen) {
      setLightboxIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    }
  }, [isLightboxOpen]);

  // Focus trap for lightbox
  useEffect(() => {
    if (!isLightboxOpen || !lightboxRef.current) return;

    const focusable = lightboxRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusableElementsRef.current = Array.from(focusable);
    const first = focusableElementsRef.current[0];
    const last = focusableElementsRef.current[focusableElementsRef.current.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    lightboxRef.current.addEventListener('keydown', handleTab);
    first?.focus();
    return () => lightboxRef.current?.removeEventListener('keydown', handleTab);
  }, [isLightboxOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, closeLightbox, goToPrev, goToNext]);

  // Build slide components for carousel
  const slides = galleryImages.map((image, index) => (
    <button
      key={image.id}
      type="button"
      className="w-full h-full aspect-[4/3] rounded-2xl overflow-hidden bg-pink-50 focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-offset-2"
      onClick={() => openLightbox(index)}
      aria-label={`Lihat ${image.category} - ${image.alt}`}
    >
      <img
        src={image.src}
        alt=""
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        loading={index < 2 ? 'eager' : 'lazy'}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-heading/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 hover:opacity-100 transition-all duration-300 translate-y-2 hover:translate-y-0">
        <p className="font-heading text-lg font-medium">{image.category}</p>
      </div>
    </button>
  ));

  return (
    <section
      id="gallery"
      className="bg-white section-padding"
      aria-labelledby="gallery-title"
      style={{ scrollMarginTop: '80px' }}
    >
      <Container>
        <SectionHeading
          ref={(el) => { if (el) el.id = 'gallery-title'; }}
          eyebrow="HASIL KERJA"
          title="Transformasi Rambut Klien Kami"
          subtitle="Lihat hasil perawatan dan styling profesional dari tim kami"
          cta={
            <Button variant="ghost" size="md" icon="arrow-right" className="text-brand hover:text-brand-hover">
              Lihat Semua
            </Button>
          }
        />

        {/* Mobile Carousel */}
        <MobileCarousel
          id="gallery-carousel"
          ariaLabel="Galeri hasil kerja salon"
          count={galleryImages.length}
          autoSlideInterval={4000}
        >
          {slides}
        </MobileCarousel>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mt-12" role="list">
          {galleryImages.map((image, index) => (
            <article
              key={image.id}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-pink-50"
              role="listitem"
            >
              <button
                type="button"
                className="w-full h-full focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-offset-2"
                onClick={() => openLightbox(index)}
                aria-label={`Lihat ${image.category} - ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-heading/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <p className="font-heading text-lg font-medium">{image.category}</p>
                </div>
              </button>
            </article>
          ))}
        </div>

        {/* Lightbox */}
        {isLightboxOpen && (
          <div
            ref={lightboxRef}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-label="Galeri hasil kerja"
            onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
          >
            <button
              type="button"
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white focus-visible:ring-2 focus-visible:ring-white"
              onClick={closeLightbox}
              aria-label="Tutup galeri"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white focus-visible:ring-2 focus-visible:ring-white"
              onClick={() => setLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
              aria-label="Gambar sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>

            <div className="relative max-w-4xl max-h-[80vh] w-full">
              <img
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>

            <button
              type="button"
              className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white focus-visible:ring-2 focus-visible:ring-white"
              onClick={() => setLightboxIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
              aria-label="Gambar selanjutnya"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2" role="tablist" aria-label="Indikator gambar">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                    index === lightboxIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
                  }`}
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Ke gambar ${index + 1}`}
                  aria-selected={index === lightboxIndex}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
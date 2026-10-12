import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface MobileCarouselProps {
  /** Jumlah slide */
  count: number;
  /** ID unik untuk aria-label */
  id: string;
  /** Label untuk region (aksesibilitas) */
  ariaLabel: string;
  /** Children: setiap child = 1 slide */
  children: React.ReactNode[];
  /** Class tambahan untuk container */
  className?: string;
  /** Callback saat slide berubah */
  onSlideChange?: (index: number) => void;
}

export function MobileCarousel({
  count,
  id,
  ariaLabel,
  children,
  className = '',
  onSlideChange,
}: MobileCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Sync currentIndex via IntersectionObserver (native, performant)
  useEffect(() => {
    if (!trackRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const slideIndex = Array.from(trackRef.current!.children).indexOf(
              entry.target as HTMLDivElement
            );
            if (slideIndex !== -1 && slideIndex !== currentIndex) {
              setCurrentIndex(slideIndex);
              onSlideChange?.(slideIndex);
            }
          }
        });
      },
      {
        root: trackRef.current,
        threshold: [0.5, 0.75],
        rootMargin: '0px',
      }
    );

    trackRef.current.querySelectorAll('[data-slide-index]').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [currentIndex, onSlideChange]);

  // Scroll to slide via native scrollTo (smooth)
  const scrollToSlide = useCallback((index: number) => {
    if (!trackRef.current) return;
    const clamped = Math.max(0, Math.min(count - 1, index));
    const slide = trackRef.current.children[clamped] as HTMLElement;
    if (slide) {
      slide.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      setCurrentIndex(clamped);
    }
  }, [count]);

  const goToPrev = useCallback(() => scrollToSlide(currentIndex - 1), [currentIndex, scrollToSlide]);
  const goToNext = useCallback(() => scrollToSlide(currentIndex + 1), [currentIndex, scrollToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      else if (e.key === 'ArrowRight') goToNext();
    };
    const track = trackRef.current;
    track?.addEventListener('keydown', handleKeyDown);
    return () => track?.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < count - 1;

  return (
    <div
      className={`mobile-carousel ${className}`}
      id={id}
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
    >
      {/* Track - Native Scroll Snap */}
      <div
        ref={trackRef}
        className="mobile-carousel__track"
        role="list"
        onScroll={() => {
          setIsScrolling(true);
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="mobile-carousel__slide"
            role="listitem"
            aria-roledescription="slide"
            aria-label={`${index + 1} dari ${count}`}
            data-slide-index={index}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        type="button"
        className="mobile-carousel__btn mobile-carousel__btn--prev"
        onClick={goToPrev}
        disabled={!canGoPrev}
        aria-label="Slide sebelumnya"
        aria-disabled={!canGoPrev}
      >
        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* Next Button */}
      <button
        type="button"
        className="mobile-carousel__btn mobile-carousel__btn--next"
        onClick={goToNext}
        disabled={!canGoNext}
        aria-label="Slide selanjutnya"
        aria-disabled={!canGoNext}
      >
        <ChevronRight className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* Dot Indicators */}
      <div className="mobile-carousel__dots" role="tablist" aria-label="Indikator slide">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            className="mobile-carousel__dot"
            onClick={() => scrollToSlide(i)}
            aria-label={`Ke slide ${i + 1}`}
            aria-selected={i === currentIndex}
            aria-controls={`${id}-slide-${i}`}
          />
        ))}
      </div>
    </div>
  );
}
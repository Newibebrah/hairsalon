import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface MobileCarouselProps {
  count: number;
  id: string;
  ariaLabel: string;
  children: React.ReactNode[];
  className?: string;
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
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  // Calculate current slide from scroll position (throttled via rAF)
  const updateIndexFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const scrollLeft = track.scrollLeft;
    const slideWidth = track.clientWidth;
    if (slideWidth === 0) return;

    const newIndex = Math.round(scrollLeft / slideWidth);
    const clamped = Math.max(0, Math.min(count - 1, newIndex));

    if (clamped !== currentIndex) {
      setCurrentIndex(clamped);
      onSlideChange?.(clamped);
    }
  }, [count, currentIndex, onSlideChange]);

  // Scroll handler with rAF throttling
  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateIndexFromScroll);
  }, [updateIndexFromScroll]);

  // Scroll to slide via native scrollTo (smooth)
  const scrollToSlide = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(count - 1, index));
    const slide = track.children[clamped] as HTMLElement;
    if (slide) {
      slide.scrollIntoView({ behavior: 'smooth', inline: 'center' });
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

  // Cleanup rAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
        onScroll={handleScroll}
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

export { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';

export interface MobileCarouselProps {
  count: number;
  id: string;
  ariaLabel: string;
  children: React.ReactNode[];
  className?: string;
  onSlideChange?: (index: number) => void;
  autoSlideInterval?: number; // ms, default 4000, 0 = disabled
}

export function MobileCarousel({
  count,
  id,
  ariaLabel,
  children,
  className = '',
  onSlideChange,
  autoSlideInterval = 0, // DISABLED per spec
}: MobileCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const rafRef = useRef<number | null>(null);
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isUserInteractingRef = useRef(false);

  // Calculate current slide from scroll position
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

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateIndexFromScroll);
  }, [updateIndexFromScroll]);

  // Prevent vertical scroll during horizontal swipe
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const track = trackRef.current;
    if (!track) return;
    
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - (touch as any).startX || touch.clientX);
    const deltaY = Math.abs(touch.clientY - (touch as any).startY || touch.clientY);
    
    // If horizontal movement is greater than vertical, prevent vertical scroll
    if (deltaX > deltaY) {
      e.preventDefault();
    }
  }, []);

  // Track touch start for delta calculation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    (touch as any).startX = touch.clientX;
    (touch as any).startY = touch.clientY;
  }, []);

  // Scroll to slide via native scrollTo on track (smooth, NO page scroll)
  const scrollToSlide = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(count - 1, index));
    const slide = track.children[clamped] as HTMLElement;
    if (slide) {
      track.scrollTo({
        left: slide.offsetLeft,
        behavior: 'smooth'
      });
    }
  }, [count]);

  // Auto-slide logic - DISABLED per spec
  useEffect(() => {
    if (autoSlideInterval <= 0) return;

    autoSlideRef.current = setInterval(() => {
      if (isUserInteractingRef.current) return;
      
      const nextIndex = currentIndex >= count - 1 ? 0 : currentIndex + 1;
      scrollToSlide(nextIndex);
    }, autoSlideInterval);

    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [currentIndex, count, autoSlideInterval, scrollToSlide]);

  // Pause auto-slide on user interaction
  const handleInteractionStart = () => { isUserInteractingRef.current = true; };
  const handleInteractionEnd = () => { isUserInteractingRef.current = false; };

  return (
    <div
      className={`gallery ${className}`}
      id={id}
      data-gallery
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      onPointerDown={handleInteractionStart}
      onPointerUp={handleInteractionEnd}
      onPointerLeave={handleInteractionEnd}
    >
      {/* Track - Native Scroll Snap */}
      <div
        ref={trackRef}
        className="gallery__track"
        data-gallery-track
        role="list"
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchStartCapture={handleTouchStart}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="gallery__slide"
            role="listitem"
            aria-roledescription="slide"
            aria-label={`${index + 1} dari ${count}`}
            data-gallery-slide
            data-slide-index={index}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="gallery__dots" data-gallery-dots role="tablist" aria-label="Navigasi galeri">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            className="gallery__dot"
            onClick={() => scrollToSlide(i)}
            onPointerDown={handleInteractionStart}
            onPointerUp={handleInteractionEnd}
            aria-label={`Ke slide ${i + 1}`}
            aria-selected={i === currentIndex}
            aria-controls={`${id}-slide-${i}`}
          />
        ))}
      </div>
    </div>
  );
}
import { useEffect, useRef, useState, useCallback } from 'react';

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

  const updateActiveDot = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = track.clientWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const step = slideWidth + gap;
    if (step === 0) return;
    const index = Math.round(track.scrollLeft / step);
    const safeIndex = Math.max(0, Math.min(index, count - 1));
    if (safeIndex !== currentIndex) {
      setCurrentIndex(safeIndex);
      onSlideChange?.(safeIndex);
    }
  }, [count, currentIndex, onSlideChange]);

  const handleScroll = useCallback(() => {
    updateActiveDot();
  }, [updateActiveDot]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    (touch as any).startX = touch.clientX;
    (touch as any).startY = touch.clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const track = trackRef.current;
    if (!track) return;
    const touch = e.touches[0];
    const startX = (touch as any).startX ?? touch.clientX;
    const startY = (touch as any).startY ?? touch.clientY;
    const deltaX = Math.abs(touch.clientX - startX);
    const deltaY = Math.abs(touch.clientY - startY);
    if (deltaX > deltaY) {
      e.preventDefault();
    }
  };

  const scrollToSlide = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(count - 1, index));
    const slide = track.children[clamped] as HTMLElement;
    if (slide) {
      track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
    }
  }, [count]);

  // Initialize dots on mount
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateActiveDot();
  }, [updateActiveDot]);

  // Scroll listener
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Resize listener
  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateActiveDot, 100);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [updateActiveDot]);

  return (
    <div
      className={`slider ${className}`}
      id={id}
      data-slider
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
    >
      {/* Track - Swipe Area */}
      <div
        ref={trackRef}
        className="slider__track"
        data-slider-track
        role="list"
        onScroll={(e) => {
          const track = e.currentTarget;
          const slideWidth = track.clientWidth;
          const gap = parseFloat(getComputedStyle(track).gap) || 0;
          const step = slideWidth + gap;
          if (step === 0) return;
          const index = Math.round(track.scrollLeft / step);
          const safeIndex = Math.max(0, Math.min(index, count - 1));
          if (safeIndex !== currentIndex) {
            setCurrentIndex(safeIndex);
            onSlideChange?.(safeIndex);
          }
        }}
        onTouchStart={(e: React.TouchEvent) => {
          const touch = e.touches[0];
          (touch as any).startX = touch.clientX;
          (touch as any).startY = touch.clientY;
        }}
        onTouchMove={(e: React.TouchEvent) => {
          const track = trackRef.current;
          if (!track) return;
          const touch = e.touches[0];
          const startX = (touch as any).startX ?? touch.clientX;
          const startY = (touch as any).startY ?? touch.clientY;
          const deltaX = Math.abs(touch.clientX - startX);
          const deltaY = Math.abs(touch.clientY - startY);
          if (deltaX > deltaY) {
            e.preventDefault();
          }
        }}
        onTouchStartCapture={(e: React.TouchEvent) => {
          const touch = e.touches[0];
          (touch as any).startX = touch.clientX;
          (touch as any).startY = touch.clientY;
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="slider__card"
            role="listitem"
            aria-roledescription="slide"
            aria-label={`${index + 1} dari ${count}`}
            data-slider-card
            data-slide-index={index}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="slider__dots" data-slider-dots role="tablist" aria-label="Navigasi slider">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            className="slider__dot"
            onClick={() => {
              const track = trackRef.current;
              if (!track) return;
              const clamped = Math.max(0, Math.min(count - 1, i));
              const slide = track.children[clamped] as HTMLElement;
              if (slide) {
                track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
              }
            }}
            aria-label={`Ke item ${i + 1}`}
            aria-selected={i === currentIndex}
            aria-controls={`${id}-slide-${i}`}
          />
        ))}
      </div>
    </div>
  );
}
import { useEffect, useRef, useState, useCallback } from 'react';

export interface MobileCarouselProps {
  count: number;
  id: string;
  ariaLabel: string;
  children: React.ReactNode[];
  className?: string;
  onSlideChange?: (index: number) => void;
  autoSlideInterval?: number;
}

export function MobileCarousel({
  count,
  id,
  ariaLabel,
  children,
  className = '',
  onSlideChange,
  autoSlideInterval = 0,
}: MobileCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate current slide from scroll position
  const updateIndexFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = track.clientWidth;
    if (slideWidth === 0) return;
    const newIndex = Math.round(track.scrollLeft / track.clientWidth);
    const clamped = Math.max(0, Math.min(count - 1, newIndex));
    if (clamped !== currentIndex) {
      setCurrentIndex(clamped);
    }
  }, [count, currentIndex]);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = track.clientWidth;
    if (slideWidth === 0) return;
    const newIndex = Math.round(track.scrollLeft / track.clientWidth);
    const clamped = Math.max(0, Math.min(count - 1, newIndex));
    if (clamped !== currentIndex) {
      setCurrentIndex(clamped);
    }
  }, [count, currentIndex]);

  // Prevent vertical scroll during horizontal swipe
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const track = trackRef.current;
    if (!track) return;
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - (touch as any).startX || touch.clientX);
    const deltaY = Math.abs(touch.clientY - (touch as any).startY || touch.clientY);
    if (deltaX > deltaY) {
      e.preventDefault();
    }
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    (touch as any).startX = touch.clientX;
    (touch as any).startY = touch.clientY;
  }, []);

  const scrollToSlide = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(count - 1, index));
    const slide = track.children[clamped] as HTMLElement;
    if (slide) {
      track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
    }
  }, [count]);

  return (
    <div
      className={`gallery ${className}`}
      id={id}
      data-gallery
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
    >
      {/* Track - Native Scroll Snap */}
      <div
        ref={trackRef}
        className="gallery__track"
        data-gallery-track
        role="list"
        onScroll={() => {
          const track = trackRef.current;
          if (!track) return;
          const slideWidth = track.clientWidth;
          if (slideWidth === 0) return;
          const newIndex = Math.round(track.scrollLeft / track.clientWidth);
          const clamped = Math.max(0, Math.min(count - 1, newIndex));
          if (clamped !== currentIndex) {
            setCurrentIndex(clamped);
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
          const deltaX = Math.abs(touch.clientX - (touch as any).startX || touch.clientX);
          const deltaY = Math.abs(touch.clientY - (touch as any).startY || touch.clientY);
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
            onClick={() => {
              const track = trackRef.current;
              if (!track) return;
              const clamped = Math.max(0, Math.min(count - 1, i));
              const slide = track.children[clamped] as HTMLElement;
              if (slide) {
                track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
              }
            }}
            aria-label={`Ke gambar ${i + 1}`}
            aria-selected={i === currentIndex}
            aria-controls={`${id}-slide-${i}`}
          />
        ))}
      </div>
    </div>
  );
}
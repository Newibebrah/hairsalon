import { useState, useEffect, useCallback, useRef } from 'react';

interface UseMobileCarouselOptions {
  itemCount: number;
  breakpoint?: number;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

interface UseMobileCarouselReturn {
  isMobile: boolean;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  goToPrev: () => void;
  goToNext: () => void;
  translateX: number;
  containerRef: React.RefObject<HTMLDivElement>;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export function useMobileCarousel({
  itemCount,
  breakpoint = 768,
  loop = false, // CHANGED: default false - no infinite loop
  autoPlay = false,
  autoPlayInterval = 5000,
}: UseMobileCarouselOptions): UseMobileCarouselReturn {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Computed bounds
  const maxIndex = itemCount - 1;
  const minTranslate = -maxIndex * 100; // e.g., -400% for 5 items
  const maxTranslate = 0; // 0% for first item

  // Sync translateX when currentIndex changes (from buttons/dots/keys)
  useEffect(() => {
    const targetTranslate = -currentIndex * 100;
    setTranslateX(targetTranslate);
    currentTranslate.current = targetTranslate;
  }, [currentIndex]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  // Auto play
  useEffect(() => {
    if (!autoPlay || !isMobile) return;
    autoPlayTimer.current = setInterval(() => {
      goToNext();
    }, autoPlayInterval);
    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [autoPlay, isMobile, autoPlayInterval, itemCount]);

  // Bounds checking for navigation
  const canGoPrev = currentIndex > 0 || loop;
  const canGoNext = currentIndex < maxIndex || loop;

  const updatePosition = useCallback((index: number) => {
    // Clamp index to valid range
    const clampedIndex = Math.max(0, Math.min(maxIndex, index));
    setCurrentIndex(clampedIndex);
  }, [maxIndex]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return loop ? maxIndex : 0;
      }
      return prev - 1;
    });
  }, [loop, maxIndex]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev === maxIndex) {
        return loop ? 0 : maxIndex;
      }
      return prev + 1;
    });
  }, [loop, maxIndex]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (!isMobile) return;
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
    currentTranslate.current = -currentIndex * 100;
    if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
  }, [isMobile, currentIndex, autoPlay]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !isMobile) return;
    const deltaX = e.touches[0].clientX - startX.current;
    const containerWidth = containerRef.current?.clientWidth || 1;
    const deltaPercent = (deltaX / containerWidth) * 100;
    let newTranslate = currentTranslate.current + deltaPercent;

    // CLAMP: Prevent dragging beyond bounds (with slight resistance at edges)
    if (newTranslate > maxTranslate) {
      // Past left edge - add resistance
      newTranslate = maxTranslate + (newTranslate - maxTranslate) * 0.3;
    } else if (newTranslate < minTranslate) {
      // Past right edge - add resistance
      newTranslate = minTranslate + (newTranslate - minTranslate) * 0.3;
    }

    setTranslateX(newTranslate);
  }, [isDragging, isMobile, minTranslate, maxTranslate]);

  const onTouchEnd = useCallback(() => {
    if (!isDragging || !isMobile) return;
    setIsDragging(false);

    // Calculate how far we moved from the current item center
    const itemCenter = -currentIndex * 100;
    const moved = translateX - itemCenter;
    const threshold = 25; // 25% of item width to trigger swipe

    let nextIndex = currentIndex;

    if (Math.abs(moved) > threshold) {
      if (moved < 0 && currentIndex < maxIndex) {
        nextIndex = currentIndex + 1; // Swipe left -> next
      } else if (moved > 0 && currentIndex > 0) {
        nextIndex = currentIndex - 1; // Swipe right -> prev
      }
    }

    // Snap to nearest valid index (clamps automatically)
    updatePosition(nextIndex);

    // Restart auto play
    if (autoPlay) {
      autoPlayTimer.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);
    }
  }, [isDragging, isMobile, translateX, currentIndex, maxIndex, updatePosition, autoPlay, autoPlayInterval, goToNext]);

  return {
    isMobile,
    currentIndex,
    setCurrentIndex: updatePosition,
    goToPrev,
    goToNext,
    translateX,
    containerRef,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    canGoPrev,
    canGoNext,
  };
}
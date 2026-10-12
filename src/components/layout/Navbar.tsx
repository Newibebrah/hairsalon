import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/data/navigation';
import { siteConfig } from '@/data/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const focusableElementsRef = useRef<HTMLElement[]>([]);

  // Scroll handler for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sections = ['hero', 'gallery', 'products', 'team', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0.1 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Focus trap for mobile menu
  const trapFocus = useCallback((element: HTMLDivElement) => {
    const focusable = element.querySelectorAll<HTMLElement>(
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
    element.addEventListener('keydown', handleTab);
    first?.focus();
    return () => element.removeEventListener('keydown', handleTab);
  }, []);

  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      lastFocusedRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      const cleanup = trapFocus(mobileMenuRef.current);
      return cleanup;
    } else {
      document.body.style.overflow = '';
      lastFocusedRef.current?.focus();
    }
  }, [isOpen, trapFocus]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const mobileMenuContent = (
    <div
      ref={mobileMenuRef}
      id="mobile-menu"
      className={cn(
        'md:hidden fixed inset-0 top-0 right-0 bottom-0 bg-white z-[101] overflow-y-auto animate-slide-in-right',
        'flex flex-col max-w-[320px] w-full ml-auto'
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Navigasi mobile"
      tabIndex={-1}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-[-1]" aria-hidden="true" onClick={closeMenu} />
      <div className="flex-1 flex flex-col justify-start pt-16 pb-8 px-6">
        <ul className="flex flex-col items-center gap-2 w-full" role="menu">
          {navLinks.map((link, index) => (
            <li key={link.label} role="none" className="w-full">
              <a
                href={link.href}
                role="menuitem"
                className={cn(
                  'block w-full py-4 px-4 text-lg font-medium text-brand rounded-xl transition-all duration-200 text-left',
                  'hover:bg-pink-50 hover:text-brand-hover',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
                  'border-l-4 border-transparent hover:border-brand hover:bg-pink-50',
                  activeSection === link.href.replace('#', '') ? 'bg-pink-50 text-brand-hover border-brand' : '',
                  link.scroll ? 'cursor-pointer' : ''
                )}
                onClick={(e) => {
                  if (link.scroll) {
                    e.preventDefault();
                    handleLinkClick(link.href);
                    // Delay close to allow scroll to start
                    setTimeout(closeMenu, 100);
                  }
                }}
                style={{ transitionDelay: `${index * 50}ms` }}
                aria-current={activeSection === link.href.replace('#', '') ? 'page' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-6 border-t border-pink-100 w-full flex flex-col items-center gap-3">
          <Button variant="primary" size="lg" fullWidth onClick={() => handleLinkClick('#contact')}>
            Hubungi Kami
          </Button>
          <div className="flex items-center gap-4 w-full justify-center">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              className="btn-light flex-1 text-center min-h-[44px]"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="btn-light flex-1 text-center min-h-[44px]"
              aria-label="Telepon"
            >
              Telepon
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <header
      className={cn(
        'sticky top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-sm transition-all duration-300',
        isScrolled && 'shadow-md'
      )}
      role="banner"
    >
      <a href="#main" className="skip-link">
        Lewati ke konten utama
      </a>
      <nav className="relative" aria-label="Navigasi utama">
        <Container>
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                </div>
                <div>
                  <span className="font-heading text-xl md:text-2xl font-semibold text-heading">
                    Hair La Venia
                  </span>
                  <span className="block text-xs text-text-muted font-body">Beauty</span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex md:items-center md:gap-8">
              <ul className="flex items-center gap-6 md:gap-8 font-medium text-sm text-heading" role="menubar">
                {navLinks.map((link, index) => (
                  <li key={link.label} role="none">
                    <a
                      href={link.href}
                      role="menuitem"
                      className={cn(
                        'relative transition-all duration-200',
                        'after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand after:transition-all after:duration-300',
                        'hover:text-brand hover:after:w-full',
                        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
                        'py-2 px-1 border-b-2 border-transparent hover:border-brand hover:bg-pink-50',
                        activeSection === link.href.replace('#', '') ? 'text-brand border-brand' : '',
                        link.scroll ? 'cursor-pointer' : ''
                      )}
                      onClick={(e) => {
                        if (link.scroll) {
                          e.preventDefault();
                          handleLinkClick(link.href);
                        }
                      }}
                      style={{ transitionDelay: `${index * 30}ms` }}
                      aria-current={activeSection === link.href.replace('#', '') ? 'page' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Button variant="primary" size="md" onClick={() => handleLinkClick('#contact')}>
                Hubungi Kami
              </Button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                className="p-2 text-heading hover:text-brand transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Menu"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Menu - Rendered as Portal outside Container for proper positioning */}
        {isOpen && createPortal(mobileMenuContent, document.body)}
      </nav>
    </header>
  );
}
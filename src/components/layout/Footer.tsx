import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { InstagramIcon, FacebookIcon, TikTokIcon, WhatsAppIcon, MailIcon, MapPinIcon, ClockIcon, PhoneIcon } from '@/components/icons/SocialIcons';
import { footerNav, socialLinks, siteConfig } from '@/data/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative bg-footer text-white"
      role="contentinfo"
      style={{ scrollMarginTop: '80px' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-footer/90 via-footer to-footer-dark" aria-hidden="true" />

      <Container>
        <div className="relative z-10 pt-16 pb-12 lg:pt-20 lg:pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm flex-shrink-0" aria-hidden="true">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                </div>
                <div>
                  <span className="font-heading text-xl md:text-2xl font-semibold">Hair La Venia</span>
                  <span className="block text-xs text-white/70">Beauty</span>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">
                Salon kecantikan premium yang menghadirkan perawatan rambut profesional dan produk berkualitas untuk penampilan percaya diri Anda.
              </p>
              <nav className="flex items-center gap-4" aria-label="Media sosial">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-all duration-300 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-footer"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.name === 'instagram' && <InstagramIcon className="w-5 h-5" />}
                    {social.name === 'facebook' && <FacebookIcon className="w-5 h-5" />}
                    {social.name === 'tiktok' && <TikTokIcon className="w-5 h-5" />}
                  </a>
                ))}
              </nav>
            </div>

            <nav aria-label="Navigasi">
              <h3 className="font-heading text-lg font-semibold mb-5">Navigasi</h3>
              <ul className="space-y-3">
                {footerNav.navigasi.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-white/70 hover:text-white transition-colors text-sm focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-footer rounded-sm px-1 -ml-1">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Layanan">
              <h3 className="font-heading text-lg font-semibold mb-5">Layanan</h3>
              <ul className="space-y-3">
                {footerNav.layanan.map((service) => (
                  <li key={service.label}>
                    <a href={service.href} className="text-white/70 hover:text-white transition-colors text-sm focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-footer rounded-sm px-1 -ml-1">
                      {service.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="font-heading text-lg font-semibold mb-5">Kontak</h3>
              <address className="not-italic space-y-4 mb-6">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm group min-h-[44px] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-footer rounded-md px-2 -mx-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors flex-shrink-0" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm group min-h-[44px] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-footer rounded-md px-2 -mx-2"
                >
                  <PhoneIcon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors flex-shrink-0" aria-hidden="true" />
                  <span>{siteConfig.phone}</span>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm group min-h-[44px] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-footer rounded-md px-2 -mx-2"
                >
                  <MailIcon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors flex-shrink-0" aria-hidden="true" />
                  <span>{siteConfig.email}</span>
                </a>
                <div className="flex items-start gap-3 text-white/70 text-sm min-h-[44px]">
                  <MapPinIcon className="w-5 h-5 text-white/50 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-relaxed">{siteConfig.address}</span>
                </div>
              </address>

              <h4 className="font-heading text-sm font-semibold mb-3">Jam Buka</h4>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-white/70 whitespace-nowrap">Senin – Jumat</dt>
                  <dd className="text-white text-right whitespace-nowrap">{siteConfig.hours.weekdays}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/70 whitespace-nowrap">Sabtu – Minggu</dt>
                  <dd className="text-white text-right whitespace-nowrap">{siteConfig.hours.weekends}</dd>
                </div>
              </dl>

              <Button variant="outline" size="md" fullWidth className="mt-6 min-h-[44px]" onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}>
                Hubungi Kami
              </Button>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 pt-8 pb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              &copy; {currentYear} Hair La Venia Beauty. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { InstagramIcon, FacebookIcon, TikTokIcon, WhatsAppIcon, MailIcon, MapPinIcon, ClockIcon, PhoneIcon, SendIcon, XIcon } from '@/components/icons/SocialIcons';
import { footerNav, socialLinks, siteConfig } from '@/data/navigation';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<typeof formData>>({});

  const validateForm = () => {
    const errors: Partial<typeof formData> = {};
    if (!formData.name.trim()) errors.name = 'Nama wajib diisi';
    if (!formData.email.trim()) errors.email = 'Email wajib diisi';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Format email tidak valid';
    if (!formData.phone.trim()) errors.phone = 'Nomor telepon wajib diisi';
    if (!formData.message.trim()) errors.message = 'Pesan wajib diisi';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        type: 'success',
        title: 'Pesan Terkirim',
        message: 'Terima kasih! Kami akan menghubungi Anda segera.',
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch {
      toast({
        type: 'error',
        title: 'Gagal Mengirim',
        message: 'Terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12 lg:mb-16">
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

        {/* Contact Form Section */}
        <div className="relative z-10 mt-16 pt-12 border-t border-white/10">
          <div className="max-w-xl mx-auto">
            <h3 className="font-heading text-2xl font-semibold text-center mb-2">Kirim Pesan</h3>
            <p className="text-white/70 text-center mb-8">Isi formulir di bawah ini, tim kami akan membalas secepatnya.</p>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-1.5">Nama Lengkap</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40',
                      'focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent',
                      'transition-all duration-200',
                      formErrors.name && 'border-red-400 focus:ring-red-400'
                    )}
                    placeholder="Nama Anda"
                    aria-invalid={formErrors.name ? 'true' : 'false'}
                    aria-describedby={formErrors.name ? 'name-error' : undefined}
                    required
                  />
                  {formErrors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1.5">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40',
                      'focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent',
                      'transition-all duration-200',
                      formErrors.email && 'border-red-400 focus:ring-red-400'
                    )}
                    placeholder="email@domain.com"
                    aria-invalid={formErrors.email ? 'true' : 'false'}
                    aria-describedby={formErrors.email ? 'email-error' : undefined}
                    required
                  />
                  {formErrors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">{formErrors.email}</p>
                  )}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-1.5">Nomor Telepon</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40',
                      'focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent',
                      'transition-all duration-200',
                      formErrors.phone && 'border-red-400 focus:ring-red-400'
                    )}
                    placeholder="+62 8xx-xxxx-xxxx"
                    aria-invalid={formErrors.phone ? 'true' : 'false'}
                    aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                    required
                  />
                  {formErrors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-red-400" role="alert">{formErrors.phone}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-1.5">Pesan</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40',
                      'focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent',
                      'transition-all duration-200 resize-none',
                      formErrors.message && 'border-red-400 focus:ring-red-400'
                    )}
                    placeholder="Tulis pesan Anda di sini..."
                    aria-invalid={formErrors.message ? 'true' : 'false'}
                    aria-describedby={formErrors.message ? 'message-error' : undefined}
                    required
                  />
                  {formErrors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">{formErrors.message}</p>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                className="mt-2 min-h-[52px]"
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </Button>
              <p className="text-center text-xs text-white/50 mt-4">Dengan mengirim formulir ini, Anda menyetujui Kebijakan Privasi kami.</p>
            </form>
          </div>
        </div>
      </Container>
    </footer>
  );
}
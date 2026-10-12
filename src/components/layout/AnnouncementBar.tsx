import { Container } from '@/components/ui/Container';
import { ClockIcon } from '@/components/icons/SocialIcons';

export function AnnouncementBar() {
  return (
    <div className="bg-pink-100 border-b border-pink-200 py-2" role="status" aria-live="polite">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-heading">
          <span className="flex items-center gap-2 text-balance">
            <span className="relative w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" aria-hidden="true" />
            Tampil Lebih Percaya Diri dengan Perawatan Terbaik di Hair La Venia Beauty
          </span>
          <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm whitespace-nowrap shrink-0">
            <span className="flex items-center gap-1.5">
              <ClockIcon className="w-3.5 h-3.5 text-brand" aria-hidden="true" />
              <span>Sen–Jumat: 09:00–20:00</span>
            </span>
            <span className="flex items-center gap-1.5 hidden lg:inline-flex">
              <ClockIcon className="w-3.5 h-3.5 text-brand" aria-hidden="true" />
              <span>Sab–Min: 09:00–18:00</span>
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
}
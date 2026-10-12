import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { teamMembers } from '@/data/team';
import { InstagramIcon, FacebookIcon } from '@/components/icons/SocialIcons';

export function TeamSection() {
  return (
    <section
      id="team"
      className="bg-white section-padding"
      aria-labelledby="team-title"
      style={{ scrollMarginTop: '80px' }}
    >
      <Container>
        <SectionHeading
          ref={(el) => { if (el) el.id = 'team-title'; }}
          eyebrow="TIM KAMI"
          title="Profesional & Berpengalaman"
          subtitle="Tim stylist kami siap mewujudkan gaya rambut impian Anda dengan keahlian dan perhatian penuh."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12">
          {teamMembers.map((member, index) => (
            <article
              key={member.id}
              className="group text-center animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-5">
                <img
                  src={member.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  aria-hidden="true"
                />
                {(member.instagram || member.facebook) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-heading/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 flex items-end p-4" aria-hidden="true">
                    <div className="flex items-center justify-center gap-3 w-full">
                      {member.instagram && (
                        <a
                          href={member.instagram}
                          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                          aria-label={`Instagram ${member.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <InstagramIcon className="w-5 h-5 text-heading" aria-hidden="true" />
                        </a>
                      )}
                      {member.facebook && (
                        <a
                          href={member.facebook}
                          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                          aria-label={`Facebook ${member.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FacebookIcon className="w-5 h-5 text-heading" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <h3 className="font-heading text-lg font-semibold text-heading mb-1">{member.name}</h3>
              <p className="text-sm text-brand font-medium mb-1">{member.role}</p>
              <p className="text-xs text-text-muted">{member.specialization}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
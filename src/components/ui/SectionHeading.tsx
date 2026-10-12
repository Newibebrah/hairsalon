import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  cta?: React.ReactNode;
}

export const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  (
    {
      eyebrow,
      title,
      subtitle,
      centered = true,
      cta,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('relative', centered ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl', className)}
        {...props}
      >
        {eyebrow && <span className="section-eyebrow inline-block">{eyebrow}</span>}
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        {cta && <div className="mt-8">{cta}</div>}
        {children}
      </div>
    );
  }
);

SectionHeading.displayName = 'SectionHeading';
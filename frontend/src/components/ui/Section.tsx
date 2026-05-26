import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  titleCenter?: boolean;
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  title,
  subtitle,
  className = '',
  titleCenter = false,
  id,
}) => {
  const textAlignClass = titleCenter ? 'text-center' : 'text-left';

  return (
    <section id={id} className={`py-12 ${className}`}>
      <div className="container mx-auto px-6 lg:px-10">
        {(title || subtitle) && (
          <div className={`mb-10 ${textAlignClass}`}>
            {title && <h2 className="text-3xl font-bold text-primary mb-3">{title}</h2>}
            {subtitle && <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
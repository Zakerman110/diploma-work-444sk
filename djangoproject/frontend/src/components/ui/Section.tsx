import React from 'react';
import IntersectionObserver from './IntersectionObserver';

interface SectionProps {
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ children }) => {
    return (
        <IntersectionObserver threshold={0.5}>
            <section className="h-full flex items-center justify-center">
                {children}
            </section>
        </IntersectionObserver>
    );
};

export default Section;
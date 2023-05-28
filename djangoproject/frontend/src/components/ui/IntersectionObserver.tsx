import React from 'react';
import { useInView } from 'react-intersection-observer';

interface IntersectionObserverProps {
    children: React.ReactNode;
    threshold?: number | number[];
}

const IntersectionObserver: React.FC<IntersectionObserverProps> = ({children, threshold}) => {

    // const ref = useRef<HTMLDivElement>(null);
    const { ref, inView } = useInView({ threshold: threshold });

    return (
        <div className="h-full" ref={ref}>
            <div className={`h-full ${inView ? 'in-view' : 'not-in-view'}`}>{children}</div>
        </div>
    );
};

export default IntersectionObserver;
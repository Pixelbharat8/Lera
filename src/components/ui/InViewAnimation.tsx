import React, { useEffect, useRef, useState } from 'react';

interface InViewAnimationProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'fade-in-left' | 'fade-in-right' | 'slide-in-left' | 'slide-in-right' | 'slide-in-up';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

const InViewAnimation: React.FC<InViewAnimationProps> = ({
  children,
  animation = 'fade-in-up',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-${Math.round(duration * 1000)} ${
        isVisible ? animation : 'opacity-0'
      } ${className}`}
      style={{
        transitionDelay: isVisible ? '0ms' : `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default InViewAnimation;
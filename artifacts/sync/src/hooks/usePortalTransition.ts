import { useState } from 'react';
import { useLocation } from 'wouter';
import gsap from 'gsap';

export function usePortalTransition() {
  const [, setLocation] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionColor, setTransitionColor] = useState('black');

  const triggerTransition = (targetRef: React.RefObject<HTMLElement>, destUrl: string, color: string) => {
    if (isTransitioning || !targetRef.current) return;
    setIsTransitioning(true);
    setTransitionColor(color);

    const tl = gsap.timeline({
      onComplete: () => {
        setLocation(destUrl);
      }
    });

    // Scale up the door, increase blur
    tl.to(targetRef.current, {
      scale: 20,
      filter: 'blur(20px)',
      duration: 1.2,
      ease: "power3.inOut"
    }, 0);

    // Flash overlay
    tl.to("#portal-flash-overlay", {
      opacity: 1,
      duration: 0.8,
      ease: "power2.in"
    }, 0.4);
  };

  return { triggerTransition, isTransitioning, transitionColor };
}

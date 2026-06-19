import { usePortalTransition } from '@/hooks/usePortalTransition';

export function PortalTransition() {
  const { transitionColor, isTransitioning } = usePortalTransition();

  return (
    <div 
      id="portal-flash-overlay"
      className="fixed inset-0 z-[100] pointer-events-none opacity-0 flex items-center justify-center"
      style={{ backgroundColor: transitionColor }}
    />
  );
}

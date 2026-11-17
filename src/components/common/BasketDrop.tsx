import { useEffect, useMemo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useStore } from '../../context/StoreContext';
import { BasketDropEvent } from '../../types/store';

export interface BasketDropProps {
  /** Optional custom list of drop events; defaults to StoreContext basketDrops when omitted */
  drops?: BasketDropEvent[];
  /** Optional completion callback; defaults to StoreContext dismissBasketDrop when omitted */
  onComplete?: (id: string) => void;
  /** Optional CSS selector overriding the default desktop/mobile cart target lookup */
  targetSelector?: string;
  /** Viewport width breakpoint (px) below which mobile drop path & scale are used */
  mobileBreakpoint?: number;
  className?: string;
}

interface DropGeometry {
  isMobile: boolean;
  size: number;
  startX: number;
  startY: number;
  midX: number;
  midY: number;
  targetX: number;
  targetY: number;
  duration: number;
}

function measureDropGeometry(
  drop: BasketDropEvent,
  mobileBreakpoint: number,
  targetSelector?: string
): DropGeometry {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const isMobile = vw < mobileBreakpoint;

  let targetRect: DOMRect | null = null;
  if (typeof document !== 'undefined') {
    const selectors = targetSelector
      ? [targetSelector]
      : isMobile
      ? ['[data-cart-target="mobile"]', '[data-cart-target="desktop"]']
      : ['[data-cart-target="desktop"]', '[data-cart-target="mobile"]'];

    for (const sel of selectors) {
      const el = document.querySelector<HTMLElement>(sel);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          targetRect = rect;
          break;
        }
      }
    }
  }

  const targetX = targetRect
    ? targetRect.left + targetRect.width / 2
    : isMobile
    ? vw * 0.5
    : vw - 84;
  const targetY = targetRect
    ? targetRect.top + targetRect.height / 2
    : isMobile
    ? vh - 27
    : 36;

  const startX = drop.origin
    ? drop.origin.x + (drop.origin.width ?? 0) / 2
    : vw * 0.5;
  const startY = drop.origin
    ? drop.origin.y + (drop.origin.height ?? 0) / 2
    : vh * 0.44;

  // Adapt drop capsule size & flight arc path per viewport
  const size = isMobile ? 52 : 68;
  const duration = isMobile ? 0.66 : 0.72;

  const midX = isMobile
    ? startX + (targetX - startX) * 0.48
    : startX + (targetX - startX) * 0.45;

  // Desktop arcs gracefully up toward top-right bag; mobile tosses upward then drops into bottom Cart tab
  const midY = isMobile
    ? Math.max(72, Math.min(startY, targetY) - 58)
    : Math.min(startY, targetY) - Math.min(115, Math.abs(targetY - startY) * 0.32 + 44);

  return {
    isMobile,
    size,
    startX,
    startY,
    midX,
    midY,
    targetX,
    targetY,
    duration,
  };
}

function BasketDropFlight({
  drop,
  onComplete,
  targetSelector,
  mobileBreakpoint,
}: {
  drop: BasketDropEvent;
  onComplete: (id: string) => void;
  targetSelector?: string;
  mobileBreakpoint: number;
}) {
  const prefersReduced = useReducedMotion();
  const geom = useMemo(
    () => measureDropGeometry(drop, mobileBreakpoint, targetSelector),
    [drop, mobileBreakpoint, targetSelector]
  );

  // Safety cleanup timer in case tab backgrounding throttles onAnimationComplete
  useEffect(() => {
    const timer = window.setTimeout(
      () => onComplete(drop.id),
      (prefersReduced ? 320 : geom.duration * 1000 + 220)
    );
    return () => window.clearTimeout(timer);
  }, [drop.id, geom.duration, onComplete, prefersReduced]);

  const half = geom.size / 2;

  if (prefersReduced) {
    return (
      <motion.div
        initial={{ opacity: 0.9, scale: 0.65 }}
        animate={{ opacity: 0, scale: 1.5 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        onAnimationComplete={() => onComplete(drop.id)}
        style={{
          left: geom.targetX - 20,
          top: geom.targetY - 20,
          width: 40,
          height: 40,
        }}
        className="fixed rounded-full border-2 border-[#e6b31e] bg-[#135224]/15 pointer-events-none"
      />
    );
  }

  return (
    <>
      {/* Flying white product capsule dropping into basket */}
      <motion.div
        initial={{
          x: geom.startX - half,
          y: geom.startY - half,
          scale: geom.isMobile ? 0.9 : 0.94,
          rotate: 0,
          opacity: 0.95,
        }}
        animate={{
          x: [geom.startX - half, geom.midX - half, geom.targetX - half],
          y: [geom.startY - half, geom.midY - half, geom.targetY - half],
          scale: geom.isMobile ? [0.9, 1.1, 0.68, 0.28] : [0.94, 1.15, 0.72, 0.32],
          rotate: geom.isMobile ? [0, 10, -8, 0] : [0, -10, 8, 0],
          opacity: [0.95, 1, 0.96, 0],
        }}
        transition={{
          duration: geom.duration,
          times: [0, 0.3, 0.78, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
        onAnimationComplete={() => onComplete(drop.id)}
        style={{ width: geom.size, height: geom.size }}
        className="fixed top-0 left-0 rounded-full bg-white border-2 border-[#e6b31e] p-1.5 shadow-lg pointer-events-none flex items-center justify-center overflow-hidden will-change-transform"
      >
        <img
          src={drop.image}
          alt=""
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain bg-white rounded-full mix-blend-multiply"
        />
      </motion.div>

      {/* Landing splash ring on target cart icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.45 }}
        animate={{ opacity: [0, 0.9, 0], scale: [0.45, 1.25, 1.85] }}
        transition={{
          delay: geom.duration * 0.72,
          duration: 0.34,
          ease: 'easeOut',
        }}
        style={{
          left: geom.targetX - (geom.isMobile ? 18 : 22),
          top: geom.targetY - (geom.isMobile ? 18 : 22),
          width: geom.isMobile ? 36 : 44,
          height: geom.isMobile ? 36 : 44,
        }}
        className="fixed rounded-full border-2 border-[#e6b31e] bg-[#f7d23a]/20 pointer-events-none"
      />
    </>
  );
}

/**
 * Reusable Framer Motion BasketDrop component.
 * Adapts flying thumbnail scale and parabolic arc path for desktop (top-right bag)
 * vs mobile (bottom navigation cart tab) whenever an item is added to cart.
 */
export function BasketDrop({
  drops: propDrops,
  onComplete: propOnComplete,
  targetSelector,
  mobileBreakpoint = 768,
  className = '',
}: BasketDropProps) {
  const { basketDrops, dismissBasketDrop } = useStore();
  const activeDrops = propDrops ?? basketDrops;
  const handleComplete = propOnComplete ?? dismissBasketDrop;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[120] overflow-hidden ${className}`}
    >
      <AnimatePresence>
        {activeDrops.map((drop) => (
          <BasketDropFlight
            key={drop.id}
            drop={drop}
            onComplete={handleComplete}
            targetSelector={targetSelector}
            mobileBreakpoint={mobileBreakpoint}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

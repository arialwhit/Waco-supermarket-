import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { STORE_IMAGES } from '../../data/images';
import { PRODUCTS } from '../../data/products';
import { clamp } from '../../utils/format';

const CACHE_SIZE = 560;
const KITCHEN_INTRINSIC_W = 1408;
const KITCHEN_INTRINSIC_H = 768;

/**
 * Flood-fills pure studio white pixels connected to the image edges so the
 * woven market basket floats cleanly over the twilight sky & kitchen counter
 * without erasing white labels inside the basket.
 */
function buildKeyedBasketCanvas(img: HTMLImageElement): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = CACHE_SIZE;
  c.height = CACHE_SIZE;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  if (!ctx) return c;

  ctx.drawImage(img, 0, 0, CACHE_SIZE, CACHE_SIZE);
  const frame = ctx.getImageData(0, 0, CACHE_SIZE, CACHE_SIZE);
  const data = frame.data;
  const total = CACHE_SIZE * CACHE_SIZE;
  const visited = new Uint8Array(total);
  const queue = new Int32Array(total);
  let head = 0;
  let tail = 0;

  const isBg = (idx: number) => {
    const o = idx * 4;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    const minC = Math.min(r, g, b);
    const maxC = Math.max(r, g, b);
    return minC > 224 && maxC - minC < 18;
  };

  for (let x = 0; x < CACHE_SIZE; x++) {
    const top = x;
    const bot = (CACHE_SIZE - 1) * CACHE_SIZE + x;
    if (isBg(top) && !visited[top]) {
      visited[top] = 1;
      queue[tail++] = top;
    }
    if (isBg(bot) && !visited[bot]) {
      visited[bot] = 1;
      queue[tail++] = bot;
    }
  }
  for (let y = 0; y < CACHE_SIZE; y++) {
    const left = y * CACHE_SIZE;
    const right = y * CACHE_SIZE + (CACHE_SIZE - 1);
    if (isBg(left) && !visited[left]) {
      visited[left] = 1;
      queue[tail++] = left;
    }
    if (isBg(right) && !visited[right]) {
      visited[right] = 1;
      queue[tail++] = right;
    }
  }

  while (head < tail) {
    const curr = queue[head++];
    data[curr * 4 + 3] = 0;
    const cx = curr % CACHE_SIZE;
    const cy = (curr - cx) / CACHE_SIZE;

    const neighbors = [
      cx > 0 ? curr - 1 : -1,
      cx < CACHE_SIZE - 1 ? curr + 1 : -1,
      cy > 0 ? curr - CACHE_SIZE : -1,
      cy < CACHE_SIZE - 1 ? curr + CACHE_SIZE : -1,
    ];

    for (let i = 0; i < 4; i++) {
      const n = neighbors[i];
      if (n >= 0 && !visited[n]) {
        visited[n] = 1;
        if (isBg(n)) {
          queue[tail++] = n;
        } else {
          // Soft 1px fringe softening at basket boundary
          const o = n * 4;
          const lum = (data[o] + data[o + 1] + data[o + 2]) / 3;
          if (lum > 205) {
            data[o + 3] = Math.round(data[o + 3] * 0.45);
          }
        }
      }
    }
  }

  ctx.putImageData(frame, 0, 0);
  return c;
}

export function MotionHero() {
  const skyRef = useRef<HTMLDivElement>(null);
  const kitchenRef = useRef<HTMLDivElement>(null);
  const balloonsRef = useRef<HTMLDivElement>(null);
  const gSRef = useRef<HTMLCanvasElement>(null);
  const gKRef = useRef<HTMLCanvasElement>(null);
  const ktextRef = useRef<HTMLDivElement>(null);
  const yellowImgRef = useRef<HTMLImageElement>(null);

  const [cardBg, setCardBg] = useState('#f7d23a');
  const [landed, setLanded] = useState(false);

  const handleYellowBoxLoad = () => {
    const img = yellowImgRef.current;
    if (!img) return;
    try {
      const c = document.createElement('canvas');
      c.width = 8;
      c.height = 8;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(
        img,
        0,
        0,
        img.naturalWidth * 0.12,
        img.naturalHeight * 0.12,
        0,
        0,
        8,
        8
      );
      const px = ctx.getImageData(0, 0, 8, 8).data;
      let r = 0;
      let g = 0;
      let b = 0;
      for (let i = 0; i < px.length; i += 4) {
        r += px[i];
        g += px[i + 1];
        b += px[i + 2];
      }
      const n = px.length / 4;
      setCardBg(`rgb(${Math.floor(r / n)}, ${Math.floor(g / n)}, ${Math.floor(b / n)})`);
    } catch {
      setCardBg('#f7d23a');
    }
  };

  useEffect(() => {
    let keyedBasket: HTMLCanvasElement | null = null;
    let rafId = 0;
    let sp = 0;
    let lastLanded = false;

    const geom = {
      Sx: 0,
      Sy: 0,
      Sw: 1000,
      Sh: 700,
      Kx: 0,
      Ky: 800,
      Kw: 1000,
      Kh: 700,
      x0: 0,
      y0: 0,
      c0: 260,
      x1: 0,
      y1: 0,
      c1: 180,
      m: 300,
      end: 700,
    };

    const drawCanvases = () => {
      if (!keyedBasket) return;
      [gSRef.current, gKRef.current].forEach((canvas) => {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(keyedBasket!, 0, 0, canvas.width, canvas.height);
      });
    };

    const measure = () => {
      const skyEl = skyRef.current;
      const kitchenEl = kitchenRef.current;
      const balloonsEl = balloonsRef.current;
      const ktextEl = ktextRef.current;
      if (!skyEl || !kitchenEl) return;

      const sr = skyEl.getBoundingClientRect();
      const kr = kitchenEl.getBoundingClientRect();
      const sy = window.scrollY;
      const isMobile = window.innerWidth < 768;

      geom.Sx = sr.left;
      geom.Sy = sr.top + sy;
      geom.Sw = sr.width;
      geom.Sh = sr.height;

      geom.Kx = kr.left;
      geom.Ky = kr.top + sy;
      geom.Kw = kr.width;
      geom.Kh = kr.height;

      // Responsive sky anchor: clear of top-left headline on both mobile portrait and 1440px desktop
      const anchorXRatio = isMobile ? 0.77 : 0.78;
      const anchorYRatio = isMobile ? 0.67 : 0.56;
      geom.c0 = isMobile
        ? clamp(Math.min(geom.Sh * 0.34, geom.Sw * 0.42), 118, 175)
        : geom.Sh * 0.43;
      geom.x0 = geom.Sx + geom.Sw * anchorXRatio;
      geom.y0 = geom.Sy + geom.Sh * anchorYRatio;

      // Position balloons tied to top handles of the basket
      if (balloonsEl) {
        const bw = isMobile
          ? clamp(geom.Sw * 0.35, 96, 145)
          : geom.Sw * 0.28;
        const bh = (bw * 2048) / 1360;
        const handleX = geom.Sw * anchorXRatio;
        const handleY = geom.Sh * anchorYRatio - geom.c0 * 0.34;
        balloonsEl.style.width = `${bw}px`;
        balloonsEl.style.height = `${bh}px`;
        balloonsEl.style.left = `${handleX - bw * 0.494}px`;
        balloonsEl.style.top = `${handleY - bh * 0.946}px`;
      }

      // Kitchen cover-fit mapping
      const natW = kitchenImgNatural.w || KITCHEN_INTRINSIC_W;
      const natH = kitchenImgNatural.h || KITCHEN_INTRINSIC_H;
      const sc = Math.max(geom.Kw / natW, geom.Kh / natH);
      const ox = (geom.Kw - natW * sc) / 2;
      const oy = (geom.Kh - natH * sc) / 2;
      const displayedH = natH * sc;

      // Empty travertine island surface spot on kitchen_counter_scene
      const gx = isMobile
        ? geom.Kx + geom.Kw * 0.5
        : geom.Kx + ox + 0.44 * natW * sc;
      const gy = isMobile
        ? geom.Ky + geom.Kh * 0.78
        : geom.Ky + oy + 0.73 * natH * sc;

      geom.c1 = isMobile
        ? clamp(displayedH * 0.33, 112, 160)
        : displayedH * 0.31;
      geom.x1 = gx;
      geom.y1 = gy - geom.c1 * 0.88 + geom.c1 / 2;

      if (ktextEl) {
        const hx = isMobile ? geom.Kw * 0.5 : ox + 0.49 * natW * sc;
        const hy = isMobile ? geom.Kh * 0.22 : oy + 0.17 * natH * sc;
        ktextEl.style.left = `${hx}px`;
        ktextEl.style.top = `${hy}px`;
        kitchenEl.style.setProperty(
          '--kh',
          `${(isMobile ? clamp(geom.Kw * 0.06, 20, 26) : displayedH * 0.036).toFixed(1)}px`
        );
        kitchenEl.style.setProperty(
          '--kp',
          `${(isMobile ? clamp(geom.Kw * 0.036, 13, 16) : displayedH * 0.021).toFixed(1)}px`
        );
      }

      geom.end = Math.max(
        180,
        geom.Ky - (isMobile ? 0.16 : 0.095) * window.innerHeight
      );
      geom.m = Math.ceil(Math.max(geom.c0, geom.c1) * 1.05);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      [gSRef.current, gKRef.current].forEach((canvas) => {
        if (!canvas) return;
        canvas.style.width = `${geom.m}px`;
        canvas.style.height = `${geom.m}px`;
        canvas.width = Math.round(geom.m * dpr);
        canvas.height = Math.round(geom.m * dpr);
      });

      drawCanvases();
    };

    const kitchenImgNatural = { w: KITCHEN_INTRINSIC_W, h: KITCHEN_INTRINSIC_H };
    const kitchenProbe = new Image();
    kitchenProbe.onload = () => {
      kitchenImgNatural.w = kitchenProbe.naturalWidth;
      kitchenImgNatural.h = kitchenProbe.naturalHeight;
      measure();
    };
    kitchenProbe.src = STORE_IMAGES.kitchenScene;

    const basketImg = new Image();
    basketImg.onload = () => {
      keyedBasket = buildKeyedBasketCanvas(basketImg);
      drawCanvases();
    };
    basketImg.src = STORE_IMAGES.marketBasket;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tick = () => {
      const target = geom.end > 0 ? window.scrollY / geom.end : 0;
      if (prefersReduced) {
        sp = target;
      } else {
        sp += (target - sp) * 0.18;
        if (Math.abs(target - sp) < 0.0005) sp = target;
      }
      const p = clamp(sp, 0, 1);
      const q = clamp((p - 0.02) / 0.9, 0, 1);
      const smooth = q * q * (3 - 2 * q);
      const fall = Math.pow(q, 1.75);

      const t = performance.now() / 1000;
      const idle = prefersReduced ? 0 : 1 - clamp(p * 12, 0, 1);
      const bob = idle * Math.sin(1.9 * t) * 6;
      const sway = idle * Math.sin(1.3 * t) * 1.4;

      const x = geom.x0 + (geom.x1 - geom.x0) * smooth;
      const y = geom.y0 + (geom.y1 - geom.y0) * fall + bob;
      const size = geom.c0 + (geom.c1 - geom.c0) * smooth;
      const tilt = Math.sin(q * Math.PI) * -7.5 + sway;
      const scl = geom.m > 0 ? size / geom.m : 1;

      if (gSRef.current) {
        gSRef.current.style.transform = `translate(${x - geom.Sx - geom.m / 2}px, ${
          y - geom.Sy - geom.m / 2
        }px) rotate(${tilt}deg) scale(${scl})`;
      }
      if (gKRef.current) {
        gKRef.current.style.transform = `translate(${x - geom.Kx - geom.m / 2}px, ${
          y - geom.Ky - geom.m / 2
        }px) rotate(${tilt}deg) scale(${scl})`;
      }

      if (balloonsRef.current) {
        const r = clamp(p * 1.25, 0, 1);
        balloonsRef.current.style.transform = `translate(${r * -0.06 * geom.Sw}px, ${
          bob - r * 1.25 * geom.Sh
        }px) rotate(${sway * 1.6 - r * 6}deg)`;
      }

      const isNowLanded = p > 0.85 || prefersReduced;
      if (isNowLanded !== lastLanded) {
        lastLanded = isNowLanded;
        setLanded(isNowLanded);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    measure();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        measure();
      });
    }
    window.addEventListener('resize', measure);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div className="w-[var(--w)] mx-auto pt-[70px] sm:pt-[96px] md:pt-[10.2vh] flex flex-col md:flex-row md:flex-wrap gap-[var(--gap)]">
      {/* Row 1 Left: Sky Panel (Always immediately above Kitchen Panel on both phone & desktop so basket drops cleanly across the beige gutter) */}
      <div
        ref={skyRef}
        id="sky"
        style={{
          backgroundImage: `url(${STORE_IMAGES.heroSky})`,
        }}
        className="order-1 relative w-full md:w-[71.1%] min-h-[440px] h-[58vh] md:h-[87vh] md:min-h-[480px] rounded-[14px] overflow-hidden bg-[#0d1650] bg-cover bg-center"
      >
        {/* Top-left Hero Tagline & Actions */}
        <div className="relative z-[3] pl-[6.4%] pt-[7%] md:pt-[7.5%] pr-6 max-w-[38rem]">
          <p className="text-[10px] md:text-xs font-semibold tracking-[0.1em] uppercase text-[#f7d23a] mb-2">
            WACO FOODS · NOURISHING NIGERIA. ENRICHING LIVES.
          </p>
          <h1 className="text-white text-[clamp(24px,2.75vw,44px)] font-medium leading-[1.06] tracking-[-0.015em] text-balance">
            Quality from our farms
            <br />
            to your kitchen.
          </h1>
          <p className="mt-2.5 text-white/85 text-xs sm:text-sm md:text-[15px] max-w-[34ch] md:max-w-[38ch] leading-relaxed">
            Hygienically packed Ekpoma Rice, Honey Beans, Garri &amp; Plantain Flour alongside daily produce from Apo Urban Market.
          </p>
          <div className="mt-4 md:mt-5 flex flex-wrap items-center gap-2">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center h-9 md:h-10 px-5 md:px-6 rounded-full bg-[#f7d23a] text-[#0c3b19] text-xs md:text-sm font-semibold hover:bg-white transition-colors whitespace-nowrap shrink-0"
            >
              Shop Now
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center justify-center h-9 md:h-10 px-4 md:px-5 rounded-full bg-[#135224] text-white text-xs md:text-sm font-medium hover:bg-[#0c3b19] transition-colors whitespace-nowrap shrink-0"
            >
              Explore 15 Aisles
            </Link>
          </div>
        </div>

        {/* Glossy Yellow & Cream Balloons Cluster (visible on BOTH mobile & desktop) */}
        <div
          ref={balloonsRef}
          id="balloons"
          style={{ transformOrigin: '49.4% 94.6%' }}
          className="absolute z-[2] pointer-events-none will-change-transform"
          aria-hidden="true"
        >
          <svg viewBox="0 0 136 205" className="w-full h-full overflow-visible">
            <g stroke="rgba(255,255,255,0.65)" strokeWidth="1" fill="none">
              <path d="M36,74 Q48,136 67.2,193.9" />
              <path d="M56,56 Q60,126 67.2,193.9" />
              <path d="M78,48 Q73,120 67.2,193.9" />
              <path d="M100,72 Q84,132 67.2,193.9" />
              <path d="M46,96 Q56,144 67.2,193.9" />
              <path d="M90,98 Q78,144 67.2,193.9" />
              <path d="M68,84 Q68,138 67.2,193.9" />
            </g>
            <defs>
              <radialGradient id="bGold" cx="35%" cy="30%" r="68%">
                <stop offset="0%" stopColor="#fff3a8" />
                <stop offset="55%" stopColor="#f7d23a" />
                <stop offset="100%" stopColor="#d9a912" />
              </radialGradient>
              <radialGradient id="bGoldAlt" cx="35%" cy="30%" r="68%">
                <stop offset="0%" stopColor="#fff7c4" />
                <stop offset="60%" stopColor="#f9dc5c" />
                <stop offset="100%" stopColor="#e0b21a" />
              </radialGradient>
            </defs>
            <ellipse cx="36" cy="48" rx="19" ry="24" fill="url(#bGold)" />
            <ellipse cx="100" cy="46" rx="19" ry="24" fill="url(#bGold)" />
            <ellipse cx="56" cy="30" rx="20" ry="25" fill="url(#bGoldAlt)" />
            <ellipse cx="80" cy="24" rx="20" ry="25" fill="url(#bGold)" />
            <ellipse cx="46" cy="70" rx="19" ry="24" fill="url(#bGoldAlt)" />
            <ellipse cx="90" cy="72" rx="19" ry="24" fill="url(#bGoldAlt)" />
            <ellipse cx="68" cy="56" rx="21" ry="26" fill="url(#bGold)" />
            <circle cx="67.2" cy="193.9" r="2.2" fill="#f7d23a" />
          </svg>
        </div>

        {/* Sky Copy of Falling Market Basket Canvas (visible on BOTH mobile & desktop) */}
        <canvas
          ref={gSRef}
          id="gS"
          className="absolute left-0 top-0 z-[2] pointer-events-none will-change-transform"
        />

        {/* Giant WACO Wordmark */}
        <div
          aria-hidden="true"
          className="absolute left-[6%] bottom-[5%] z-[3] text-white font-semibold select-none pointer-events-none text-[19vw] sm:text-[18vw] md:text-[16.5vh] lg:text-[21vh] leading-[0.74] tracking-[-0.04em]"
        >
          WACO
        </div>
      </div>

      {/* Row 1 Right on Desktop / Below Kitchen on Phone: Yellow Showcase Card */}
      <aside
        id="card"
        style={{ backgroundColor: cardBg }}
        className="order-3 md:order-2 relative w-full md:flex-1 h-auto md:h-[87vh] md:min-h-[480px] rounded-[14px] overflow-hidden text-[#0c3b19] p-5 sm:p-6 md:px-[1.4vw] md:py-[2.2vh] flex flex-col justify-between gap-4 md:gap-3"
      >
        <div className="relative z-[2] shrink-0">
          <span className="inline-grid place-items-center h-7 px-3.5 rounded-[30px] bg-[#135224] text-[#f7d23a] text-[11px] font-semibold tracking-[0.04em]">
            WACO SIGNATURE LINE
          </span>
          <p className="mt-3.5 text-[clamp(14px,1.02vw,17px)] leading-[1.48] font-medium text-[#141a4a]">
            100% natural, stone-free.
            <br />
            Ekpoma Rice, Honey Beans,
            <br />
            Garri &amp; Plantain Flour.
          </p>
        </div>

        <div className="relative flex-1 min-h-0 w-full flex items-center justify-center pointer-events-none">
          <img
            ref={yellowImgRef}
            src={STORE_IMAGES.yellowBox}
            alt="WACO curated market crate with plantains, tomatoes, rice and spices"
            onLoad={handleYellowBoxLoad}
            referrerPolicy="no-referrer"
            className="w-[68%] max-w-[240px] sm:max-w-[270px] md:w-auto md:h-auto md:max-w-full md:max-h-full aspect-square object-contain radial-feather-mask"
          />
        </div>

        <Link
          to="/offers"
          className="relative z-[2] shrink-0 w-full h-11 rounded-[40px] bg-[#c61d23] text-white flex items-center justify-center px-5 text-sm font-semibold hover:bg-[#135224] transition-colors duration-300"
        >
          Shop Weekly Bundles
        </Link>
      </aside>

      {/* Kitchen Landing Panel (Immediately below Sky Panel on mobile & full-width Row 2 on desktop) */}
      <section
        ref={kitchenRef}
        id="kitchen"
        style={{ backgroundImage: `url(${STORE_IMAGES.kitchenScene})` }}
        className={`order-2 md:order-3 md:basis-full relative w-full min-h-[410px] h-[54vh] md:h-[86vh] md:min-h-[480px] rounded-[14px] overflow-hidden bg-[#efe9de] bg-cover bg-center ${
          landed ? 'kitchen-landed' : ''
        }`}
      >
        {/* Kitchen Copy of Falling Market Basket Canvas (visible on BOTH mobile & desktop) */}
        <canvas
          ref={gKRef}
          id="gK"
          className="absolute left-0 top-0 z-[2] pointer-events-none will-change-transform"
        />

        {/* Subtle warm light scrim behind headline */}
        <div
          className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-[#f4efe4]/85 via-[#f4efe4]/45 to-transparent pointer-events-none z-[3]"
          aria-hidden="true"
        />

        {/* Centered Kitchen Headline Block */}
        <div
          ref={ktextRef}
          id="ktext"
          className="absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2 text-center text-[#16193a] z-[4] w-[90%] md:w-auto md:whitespace-nowrap"
        >
          <h2
            style={{ fontSize: 'var(--kh, clamp(20px, 2.5vw, 38px))' }}
            className="kitchen-reveal-item font-semibold tracking-[-0.015em] leading-[1.18]"
          >
            Cooks for your family. Fits your budget.
          </h2>
          <p
            style={{ fontSize: 'var(--kp, clamp(13px, 1.25vw, 19px))' }}
            className="kitchen-reveal-item kitchen-reveal-delay mt-1.5 md:mt-2 font-medium leading-[1.38] text-[#16193a]/85"
          >
            From Shop F1008, Apo Urban Market straight to your counter —
            <br className="hidden sm:inline" /> {PRODUCTS.length} verified Nigerian pantry &amp; fresh food staples ready today.
          </p>
          <div className="kitchen-reveal-item kitchen-reveal-delay mt-3 md:mt-4">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center h-9 md:h-10 px-5 md:px-6 rounded-full bg-[#135224] text-white text-xs md:text-sm font-semibold hover:bg-[#0c3b19] transition-colors"
            >
              Browse All {PRODUCTS.length} Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

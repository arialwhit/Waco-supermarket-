import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { STORE_IMAGES } from '../../data/images';
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

  // Sample yellow background from yellow_grocery_box for seamless card integration
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

      geom.Sx = sr.left;
      geom.Sy = sr.top + sy;
      geom.Sw = sr.width;
      geom.Sh = sr.height;

      geom.Kx = kr.left;
      geom.Ky = kr.top + sy;
      geom.Kw = kr.width;
      geom.Kh = kr.height;

      // Basket start in sky panel (right of center, clear of tagline and giant WACO wordmark)
      geom.c0 = geom.Sh * 0.43;
      geom.x0 = geom.Sx + geom.Sw * 0.78;
      geom.y0 = geom.Sy + geom.Sh * 0.56;

      // Position balloons tied to top handles of the basket
      if (balloonsEl) {
        const bw = geom.Sw * 0.28;
        const bh = (bw * 2048) / 1360;
        const handleX = geom.Sw * 0.78;
        const handleY = geom.Sh * 0.56 - geom.c0 * 0.34;
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
      const gx = geom.Kx + ox + 0.44 * natW * sc;
      const gy = geom.Ky + oy + 0.73 * natH * sc;

      geom.c1 = displayedH * 0.31;
      geom.x1 = gx;
      geom.y1 = gy - geom.c1 * 0.88 + geom.c1 / 2;

      if (ktextEl) {
        const hx = ox + 0.49 * natW * sc;
        const hy = oy + 0.17 * natH * sc;
        ktextEl.style.left = `${hx}px`;
        ktextEl.style.top = `${hy}px`;
        kitchenEl.style.setProperty('--kh', `${(displayedH * 0.036).toFixed(1)}px`);
        kitchenEl.style.setProperty('--kp', `${(displayedH * 0.021).toFixed(1)}px`);
      }

      geom.end = Math.max(200, geom.Ky - 0.095 * window.innerHeight);
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
    <div className="w-full">
      {/* Row 1: Two-panel MotionSites Hero Split */}
      <section
        id="hero"
        className="w-[var(--w)] mx-auto pt-[94px] md:pt-[10.2vh] flex flex-col md:flex-row gap-[var(--gap)]"
      >
        {/* Left Sky Panel */}
        <div
          ref={skyRef}
          id="sky"
          style={{
            backgroundImage: `url(${STORE_IMAGES.heroSky})`,
          }}
          className="relative w-full md:flex-[0_0_71.1%] h-[68vh] md:h-[87vh] min-h-[460px] rounded-[14px] overflow-hidden bg-[#0d1650] bg-cover bg-center"
        >
          {/* Top-left Hero Tagline & Actions */}
          <div className="relative z-[3] pl-[6.4%] pt-[8.2%] pr-6 max-w-[36rem]">
            <h1 className="text-white text-[clamp(26px,2.75vw,44px)] font-medium leading-[1.06] tracking-[-0.015em] text-balance">
              Fresh from market
              <br />
              to your kitchen.
            </h1>
            <p className="mt-3 text-white/80 text-sm md:text-[15px] max-w-[38ch] leading-relaxed">
              Stone-free Nigerian grains, chilled meats, farm produce, and everyday pantry essentials from WACO&apos;s retail store.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#f7d23a] text-[#141a4a] text-sm font-semibold hover:bg-white transition-colors whitespace-nowrap shrink-0"
              >
                Shop Now
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-white/15 text-white text-sm font-medium hover:bg-white hover:text-[#141a4a] transition-colors whitespace-nowrap shrink-0"
              >
                Explore Categories
              </Link>
            </div>
          </div>

          {/* Glossy Yellow & Cream Balloons Cluster (custom vector SVG matching MotionSites origin) */}
          <div
            ref={balloonsRef}
            id="balloons"
            style={{ transformOrigin: '49.4% 94.6%' }}
            className="absolute z-[2] pointer-events-none will-change-transform hidden sm:block"
            aria-hidden="true"
          >
            <svg viewBox="0 0 136 205" className="w-full h-full overflow-visible">
              {/* Strings converging to 49.4% 94.6% -> (67.2, 193.9) */}
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
              {/* Back balloons */}
              <ellipse cx="36" cy="48" rx="19" ry="24" fill="url(#bGold)" />
              <ellipse cx="100" cy="46" rx="19" ry="24" fill="url(#bGold)" />
              <ellipse cx="56" cy="30" rx="20" ry="25" fill="url(#bGoldAlt)" />
              <ellipse cx="80" cy="24" rx="20" ry="25" fill="url(#bGold)" />
              {/* Front balloons */}
              <ellipse cx="46" cy="70" rx="19" ry="24" fill="url(#bGoldAlt)" />
              <ellipse cx="90" cy="72" rx="19" ry="24" fill="url(#bGoldAlt)" />
              <ellipse cx="68" cy="56" rx="21" ry="26" fill="url(#bGold)" />
              {/* String knot */}
              <circle cx="67.2" cy="193.9" r="2.2" fill="#f7d23a" />
            </svg>
          </div>

          {/* Sky Copy of Falling Market Basket Canvas */}
          <canvas
            ref={gSRef}
            id="gS"
            className="absolute left-0 top-0 z-[2] pointer-events-none will-change-transform hidden sm:block"
          />

          {/* Giant WACO Wordmark (z-3 sits ABOVE the falling basket) */}
          <div
            aria-hidden="true"
            className="absolute left-[6%] bottom-[5%] z-[3] text-white font-semibold select-none pointer-events-none text-[24vw] sm:text-[18vw] md:text-[16.5vh] lg:text-[21vh] leading-[0.74] tracking-[-0.04em]"
          >
            WACO
          </div>
        </div>

        {/* Right Yellow Showcase Card */}
        <aside
          id="card"
          style={{ backgroundColor: cardBg }}
          className="relative w-full md:flex-1 h-[62vh] md:h-[87vh] min-h-[430px] rounded-[14px] overflow-hidden text-[#141a4a] px-5 py-6 md:px-[1.4vw] md:py-[2.2vh] flex flex-col justify-between"
        >
          <div className="relative z-[2]">
            <span className="inline-grid place-items-center h-7 px-3.5 rounded-[30px] bg-white text-[#141a4a] text-[11px] font-semibold tracking-[0.02em]">
              WEEKLY BOX
            </span>
            <p className="mt-4 text-[clamp(14px,1.02vw,17px)] leading-[1.5] font-medium">
              Say hello to fresh.
              <br />
              Introducing WACO
              <br />
              Market Staples.
            </p>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-2 pointer-events-none">
            <img
              ref={yellowImgRef}
              src={STORE_IMAGES.yellowBox}
              alt="WACO curated market crate with plantains, tomatoes, rice and spices"
              onLoad={handleYellowBoxLoad}
              referrerPolicy="no-referrer"
              className="w-[92%] md:w-[114%] max-w-none aspect-square object-cover radial-feather-mask"
            />
          </div>

          <Link
            to="/offers"
            className="relative z-[2] h-11 rounded-[40px] bg-white text-[#141a4a] grid place-items-center text-sm font-semibold hover:bg-[#141a4a] hover:text-white transition-colors duration-300"
          >
            Shop Weekly Bundles
          </Link>
        </aside>
      </section>

      {/* Row 2: Kitchen Landing Panel (separated by --gap warm beige gutter) */}
      <section
        ref={kitchenRef}
        id="kitchen"
        style={{ backgroundImage: `url(${STORE_IMAGES.kitchenScene})` }}
        className={`relative w-[var(--w)] h-[66vh] md:h-[86vh] min-h-[430px] mx-auto mt-[var(--gap)] rounded-[14px] overflow-hidden bg-[#efe9de] bg-cover bg-center ${
          landed ? 'kitchen-landed' : ''
        }`}
      >
        {/* Kitchen Copy of Falling Market Basket Canvas */}
        <canvas
          ref={gKRef}
          id="gK"
          className="absolute left-0 top-0 z-[2] pointer-events-none will-change-transform hidden sm:block"
        />

        {/* Subtle warm light scrim behind headline for consistent legibility across viewports */}
        <div
          className="absolute inset-x-0 top-0 h-[44%] bg-gradient-to-b from-[#f4efe4]/80 via-[#f4efe4]/35 to-transparent pointer-events-none z-[3]"
          aria-hidden="true"
        />

        {/* Centered Kitchen Headline Block */}
        <div
          ref={ktextRef}
          id="ktext"
          className="absolute left-1/2 top-[18%] -translate-x-1/2 -translate-y-1/2 text-center text-[#16193a] z-[4] w-[88%] md:w-auto md:whitespace-nowrap"
        >
          <h2
            style={{ fontSize: 'var(--kh, clamp(22px, 2.5vw, 38px))' }}
            className="kitchen-reveal-item font-semibold tracking-[-0.015em] leading-[1.18]"
          >
            Cooks for your family. Fits your budget.
          </h2>
          <p
            style={{ fontSize: 'var(--kp, clamp(13px, 1.25vw, 19px))' }}
            className="kitchen-reveal-item kitchen-reveal-delay mt-2 font-medium leading-[1.38] text-[#16193a]/85"
          >
            From our retail aisles straight to your counter —
            <br className="hidden sm:inline" /> 120+ Nigerian pantry &amp; fresh food staples ready today.
          </p>
          <div className="kitchen-reveal-item kitchen-reveal-delay mt-4">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#141a4a] text-white text-xs md:text-sm font-semibold hover:bg-[#3a49c9] transition-colors"
            >
              Browse All 124 Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

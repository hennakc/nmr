import React, { useState, useCallback, useRef } from 'react';
import { menuData } from '../data/menuData';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

// All items for the reel (prefer ones with images, fallback to all)
const ITEMS_WITH_IMAGES: MenuItem[] = menuData.flatMap((c) => c.items).filter((i) => i.imageUrl);
const ALL_ITEMS: MenuItem[] = menuData.flatMap((c) => c.items);
const POOL = ITEMS_WITH_IMAGES.length >= 3 ? ITEMS_WITH_IMAGES : ALL_ITEMS;

const REEL_ITEM_HEIGHT = 220;
const REEL_SPIN_COUNT = 16;

interface ReelItem { item: MenuItem; key: string; }

function buildStrip(winner: MenuItem): ReelItem[] {
  const strip: ReelItem[] = [];
  for (let i = 0; i < REEL_SPIN_COUNT - 1; i++) {
    const pick = POOL[Math.floor(Math.random() * POOL.length)];
    strip.push({ item: pick, key: `s${i}-${pick.id}` });
  }
  strip.push({ item: winner, key: `winner-${winner.id}` });
  return strip;
}

function pickOne(): MenuItem {
  return POOL[Math.floor(Math.random() * POOL.length)];
}

/* ─── Reel ─── */
interface ReelProps { strip: ReelItem[]; spinning: boolean; done: boolean; }

const Reel: React.FC<ReelProps> = ({ strip, spinning, done }) => {
  const winnerOffset = (strip.length - 1) * REEL_ITEM_HEIGHT;
  return (
    <div className="ld-reel-window">
      <div
        className={`ld-reel-strip${spinning ? ' ld-reel-spinning' : ''}${done ? ' ld-reel-done' : ''}`}
        style={{ '--reel-offset': `-${winnerOffset}px` } as React.CSSProperties}
      >
        {strip.map((e) => (
          <div key={e.key} className="ld-reel-item">
            {e.item.imageUrl
              ? <img src={e.item.imageUrl} alt={e.item.name} className="ld-reel-img" draggable={false} />
              : <div className="ld-reel-img-fallback" />}
            <span className="ld-reel-name">{e.item.name}</span>
          </div>
        ))}
      </div>
      {/* Top & bottom fade masks */}
      <div className="ld-reel-fade-top" />
      <div className="ld-reel-fade-bottom" />
    </div>
  );
};

/* ─── Main Modal ─── */
interface LuckyDrawProps { isOpen: boolean; onClose: () => void; }
type Phase = 'idle' | 'spinning' | 'result';

const LuckyDraw: React.FC<LuckyDrawProps> = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [winner, setWinner] = useState<MenuItem | null>(null);
  const [strip, setStrip] = useState<ReelItem[]>([]);
  const [done, setDone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const handleSpin = useCallback(() => {
    if (phase === 'spinning') return;
    clear();
    const picked = pickOne();
    setWinner(picked);
    setStrip(buildStrip(picked));
    setDone(false);
    setPhase('spinning');

    const t1 = setTimeout(() => {
      setDone(true);
      const t2 = setTimeout(() => setPhase('result'), 500);
      timers.current.push(t2);
    }, 2000);
    timers.current.push(t1);
  }, [phase]);

  const handleClose = () => { clear(); setPhase('idle'); setDone(false); onClose(); };
  const handleReset = () => { clear(); setPhase('idle'); setDone(false); };

  const gst = winner ? Math.round(winner.price * 0.05) : 0;
  const total = winner ? winner.price + gst : 0;

  if (!isOpen) return null;

  return (
    <div className="ld-backdrop" onClick={handleClose}>
      <div className="ld-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="ld-header">
          <div className="ld-header-left">
            {/* Premium SVG dice */}
            <div className="ld-dice-wrap">
              <svg viewBox="0 0 40 40" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="36" height="36" rx="8" fill="url(#dg)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
                {/* Top face shine */}
                <rect x="4" y="4" width="32" height="10" rx="5" fill="rgba(255,255,255,0.12)"/>
                {/* Dots — pattern like a 5 face */}
                <circle cx="13" cy="13" r="3.2" fill="white" opacity="0.95"/>
                <circle cx="27" cy="13" r="3.2" fill="white" opacity="0.95"/>
                <circle cx="20" cy="20" r="3.2" fill="white" opacity="0.95"/>
                <circle cx="13" cy="27" r="3.2" fill="white" opacity="0.95"/>
                <circle cx="27" cy="27" r="3.2" fill="white" opacity="0.95"/>
                <defs>
                  <linearGradient id="dg" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D4A853"/>
                    <stop offset="1" stopColor="#9B4915"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <div className="ld-title">Chef's Surprise</div>
              <div className="ld-subtitle">Spin & discover your meal!</div>
            </div>
          </div>
          <button className="ld-close-btn" onClick={handleClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Single Reel */}
        <div className="ld-reel-center">
          <Reel
            strip={strip.length > 0 ? strip : [{ item: { id: 'ph', name: '?', price: 0 }, key: 'ph' }]}
            spinning={phase === 'spinning' && !done}
            done={done}
          />
        </div>

        {/* Result bill */}
        {phase === 'result' && winner && (
          <div className="ld-bill">
            <div className="ld-bill-header">🎉 Your Lucky Pick</div>
            <div className="ld-bill-item-name">{winner.name}</div>
            <div className="ld-bill-divider" />
            <div className="ld-bill-row">
              <span>Price</span><span>₹{winner.price}</span>
            </div>
            <div className="ld-bill-row ld-bill-gst">
              <span>GST (5%)</span><span>₹{gst}</span>
            </div>
            <div className="ld-bill-divider" />
            <div className="ld-bill-row ld-bill-total">
              <span>Total</span><span>₹{total}</span>
            </div>
          </div>
        )}

        {/* Spinning dots */}
        {phase === 'spinning' && (
          <div className="ld-spinning-label">
            <span className="ld-dot"/><span className="ld-dot"/><span className="ld-dot"/>
            Picking your meal…
          </div>
        )}

        {/* CTA */}
        {phase !== 'spinning' && (
          <button className="ld-spin-btn" onClick={phase === 'result' ? handleReset : handleSpin}>
            {phase === 'idle' ? (
              <>
                <svg viewBox="0 0 40 40" width="20" height="20" fill="none">
                  <rect x="2" y="2" width="36" height="36" rx="8" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                  <circle cx="13" cy="13" r="3" fill="white"/>
                  <circle cx="27" cy="13" r="3" fill="white"/>
                  <circle cx="20" cy="20" r="3" fill="white"/>
                  <circle cx="13" cy="27" r="3" fill="white"/>
                  <circle cx="27" cy="27" r="3" fill="white"/>
                </svg>
                Roll the Dice!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.66"/>
                </svg>
                Spin Again
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default LuckyDraw;

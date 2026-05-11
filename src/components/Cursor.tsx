import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current!;
    const ring   = ringRef.current!;

    const move = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      cursor.style.left = x + 'px';
      cursor.style.top  = y + 'px';
      ring.style.left   = x + 'px';
      ring.style.top    = y + 'px';

      const dot = document.createElement('div');
      const sz  = Math.random() * 4 + 2;
      Object.assign(dot.style, {
        position: 'fixed', borderRadius: '50%', pointerEvents: 'none',
        zIndex: '9990', background: 'rgba(226,54,54,0.6)',
        transform: 'translate(-50%,-50%)',
        left: x + 'px', top: y + 'px',
        width: sz + 'px', height: sz + 'px',
        animation: 'webFade 0.8s forwards',
      });
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 800);
    };

    const enterEl = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.2)';
    };
    const leaveEl = () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    };

    document.addEventListener('mousemove', move);

    const addHover = () => {
      document.querySelectorAll('a,button,.btn').forEach(el => {
        el.addEventListener('mouseenter', enterEl);
        el.addEventListener('mouseleave', leaveEl);
      });
    };
    addHover();
    const obs = new MutationObserver(addHover);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', move);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes webFade {
          0%   { opacity:1; transform:translate(-50%,-50%) scale(1); }
          100% { opacity:0; transform:translate(-50%,-50%) scale(0); }
        }
      `}</style>
      <div ref={cursorRef} style={{
        position:'fixed', width:14, height:14, borderRadius:'50%',
        background:'var(--red)', pointerEvents:'none', zIndex:9999,
        transform:'translate(-50%,-50%)',
        transition:'transform 0.1s, width 0.2s, height 0.2s, background 0.2s',
        mixBlendMode:'screen',
      }} />
      <div ref={ringRef} style={{
        position:'fixed', width:36, height:36, borderRadius:'50%',
        border:'1.5px solid rgba(226,54,54,0.5)', pointerEvents:'none', zIndex:9998,
        transform:'translate(-50%,-50%)',
        transition:'left 0.12s ease-out, top 0.12s ease-out',
      }} />
    </>
  );
}

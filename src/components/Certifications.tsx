import { useEffect, useRef } from 'react';
import { certifications } from '../data';

export default function Certifications() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.cert-card') ?? [];
    cards.forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateX(-30px)'; });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target as HTMLElement;
          card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateX(0)';
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach((c, i) => {
      (c as HTMLElement).style.transitionDelay = `${i * 0.07}s`;
      observer.observe(c);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="certs">
      <div className="section-wrap">
        <div className="section-header">
          <div className="section-tag">// power-ups collected</div>
          <h2 className="section-title">Certifications <span className="accent">&amp; Training</span></h2>
          <div className="section-divider">
            <div className="divider-line"/><span className="divider-spider">🕷</span><div className="divider-line right"/>
          </div>
        </div>

        <div ref={gridRef} style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1.2rem' }}>
          {certifications.map(c => (
            <div key={c.name} className="cert-card glass-card" style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:4, padding:'1.3rem 1.5rem', display:'flex', alignItems:'center', gap:'1rem', position:'relative', overflow:'hidden' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='var(--red)'; el.style.transform='translateX(6px)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='var(--border)'; el.style.transform='translateX(0)'; }}
            >
              <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:'linear-gradient(to bottom,var(--red),var(--blue2))' }}/>
              <div style={{ width:44, height:44, flexShrink:0, borderRadius:4, background:'linear-gradient(135deg,var(--red),var(--blue2))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem' }}>{c.icon}</div>
              <div>
                <div style={{ fontSize:'0.84rem', fontWeight:700, color:'var(--white)', lineHeight:1.4 }}>{c.name}</div>
                <div style={{ fontSize:'0.72rem', color:'var(--text)', marginTop:'0.2rem' }}>{c.issuer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

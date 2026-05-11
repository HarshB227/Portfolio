import { useEffect, useRef } from 'react';
import { skills } from '../data';

export default function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.skill-card') ?? [];
    cards.forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(50px)'; });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target as HTMLElement;
          card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          // animate skill bar
          const bar = card.querySelector<HTMLElement>('.skill-bar-fill');
          if (bar) bar.style.width = bar.dataset.width + '%';
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach((c, i) => {
      (c as HTMLElement).style.transitionDelay = `${i * 0.08}s`;
      observer.observe(c);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div id="skills" className="full-section bg-dark2">
      <div className="section-wrap">
        <div className="section-header">
          <div className="section-tag">// spider-senses activated</div>
          <h2 className="section-title">Technical <span className="accent">Skills</span></h2>
          <div className="section-divider">
            <div className="divider-line"/><span className="divider-spider">🕸</span><div className="divider-line right"/>
          </div>
        </div>

        <div ref={gridRef} style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(290px,1fr))', gap:'1.4rem' }}>
          {skills.map(s => (
            <div key={s.name} className="skill-card glass-card" style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:4, padding:'1.8rem', position:'relative', overflow:'hidden' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='var(--red)'; el.style.boxShadow='0 0 40px rgba(226,54,54,0.12)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='var(--border)'; el.style.boxShadow='none'; }}
            >
              <div style={{ fontSize:'1.8rem', marginBottom:'0.8rem' }}>{s.icon}</div>
              <div style={{ fontSize:'1rem', fontWeight:700, color:'var(--white)', marginBottom:'0.6rem' }}>{s.name}</div>
              <div style={{ height:3, background:'rgba(255,255,255,0.08)', borderRadius:2, overflow:'hidden', marginBottom:'0.8rem' }}>
                <div className="skill-bar-fill" data-width={s.width} style={{ height:'100%', borderRadius:2, background:'linear-gradient(90deg,var(--red),var(--blue3))', width:0, transition:'width 1.2s ease' }}/>
              </div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem' }}>
                {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

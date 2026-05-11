import { useEffect, useRef } from 'react';
import { education } from '../data';

export default function Education() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.edu-card') ?? [];
    cards.forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(50px)'; });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target as HTMLElement;
          card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach((c, i) => {
      (c as HTMLElement).style.transitionDelay = `${i * 0.15}s`;
      observer.observe(c);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div id="education" className="full-section bg-dark2">
      <div className="section-wrap">
        <div className="section-header">
          <div className="section-tag">// training arc</div>
          <h2 className="section-title">Education</h2>
          <div className="section-divider">
            <div className="divider-line"/><span className="divider-spider">🕸</span><div className="divider-line right"/>
          </div>
        </div>

        <div ref={gridRef} style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:'1.4rem' }}>
          {education.map(e => (
            <div key={e.degree} className="edu-card glass-card" style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:4, padding:'2rem', position:'relative', overflow:'hidden' }}
              onMouseEnter={el => { (el.currentTarget as HTMLElement).style.borderColor='var(--red)'; (el.currentTarget as HTMLElement).style.boxShadow='0 0 40px rgba(226,54,54,0.1)'; }}
              onMouseLeave={el => { (el.currentTarget as HTMLElement).style.borderColor='var(--border)'; (el.currentTarget as HTMLElement).style.boxShadow='none'; }}
            >
              <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,var(--red),var(--blue2))' }}/>
              <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>{e.emoji}</div>
              <div style={{ fontSize:'1rem', fontWeight:800, color:'var(--white)', marginBottom:'0.3rem' }}>{e.degree}</div>
              <div style={{ color:'var(--blue3)', fontSize:'0.88rem', marginBottom:'0.3rem' }}>{e.uni}</div>
              <div style={{ fontSize:'0.75rem', color:'var(--text)', marginBottom:'0.8rem' }}>{e.year}</div>
              <span style={{ display:'inline-block', padding:'0.3rem 0.9rem', borderRadius:2, background:'rgba(226,54,54,0.1)', border:'1px solid rgba(226,54,54,0.3)', fontSize:'0.78rem', fontWeight:700, color:'var(--red)' }}>{e.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

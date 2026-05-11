import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data';
import { MusicMockup, CryptoMockup, MLMockup, AgentMockup } from './ProjectMockup';

const MOCKUPS = [MusicMockup, CryptoMockup, MLMockup, AgentMockup];

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const cards = track.querySelectorAll<HTMLElement>('.proj-card');
      const totalW = Array.from(cards).reduce((acc, c) => acc + c.offsetWidth + 24, 0);
      const scrollAmt = totalW - window.innerWidth + 128;

      if (scrollAmt > 0) {
        gsap.to(track, {
          x: -scrollAmt,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${scrollAmt}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
      }

      gsap.from('.proj-card', {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: track, start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} style={{ overflow:'hidden', background:'var(--dark)' }}>
      <div style={{ padding:'6rem 4rem 2rem' }}>
        <div className="section-header">
          <div className="section-tag">// web of work</div>
          <h2 className="section-title">Featured <span className="accent">Projects</span></h2>
          <div className="section-divider">
            <div className="divider-line"/><span className="divider-spider">🕷</span><div className="divider-line right"/>
          </div>
        </div>
      </div>

      <div style={{ paddingLeft:'4rem' }}>
        <div ref={trackRef} style={{ display:'flex', gap:'1.5rem', width:'max-content', paddingBottom:'4rem', paddingRight:'4rem' }}>
          {projects.map((p, idx) => {
            const Mockup = MOCKUPS[idx];
            return (
            <div key={p.title} className="proj-card web-card glass-card" style={{
              width: 420, flexShrink: 0,
              background:'var(--card)', border:'1px solid var(--border)',
              borderRadius:4, padding:'1.8rem',
              display:'flex', flexDirection:'column', gap:'0.9rem',
              position:'relative', overflow:'hidden',
              transition:'border-color 0.3s,box-shadow 0.3s,transform 0.3s',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='var(--red)'; el.style.boxShadow='0 0 40px rgba(226,54,54,0.15)'; el.style.transform='translateY(-6px)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='var(--border)'; el.style.boxShadow='none'; el.style.transform='none'; }}
            >
              <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,var(--red),var(--blue3))' }}/>

              {/* Project mockup illustration */}
              <Mockup />

              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'0.5rem' }}>
                <div style={{ fontSize:'1rem', fontWeight:800, color:'var(--white)', lineHeight:1.3 }}>{p.title}</div>
                <span style={{ fontSize:'0.65rem', letterSpacing:1, padding:'0.3rem 0.8rem', borderRadius:2, background:'rgba(226,54,54,0.08)', border:'1px solid rgba(226,54,54,0.2)', color:'var(--red)', whiteSpace:'nowrap' }}>{p.badge}</span>
              </div>

              <div style={{ fontSize:'0.75rem', color:'var(--blue3)', fontFamily:"'Courier New',monospace", lineHeight:1.5 }}>{p.stack}</div>

              <ul style={{ listStyle:'none', margin:0, padding:0, flex:1 }}>
                {p.bullets.map((b,i) => (
                  <li key={i} style={{ fontSize:'0.86rem', lineHeight:1.75, color:'var(--text)', padding:'0.2rem 0 0.2rem 1.4rem', position:'relative' }}>
                    <span style={{ position:'absolute', left:0, color:'var(--red)' }}>▸</span>{b}
                  </li>
                ))}
              </ul>

              <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginTop:'auto', paddingTop:'0.5rem' }}>
                <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontSize:'0.72rem', letterSpacing:1, textTransform:'uppercase', color:'var(--blue3)', textDecoration:'none', fontWeight:700, display:'flex', alignItems:'center', gap:'0.4rem', transition:'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color='var(--red)')}
                  onMouseLeave={e => (e.currentTarget.style.color='var(--blue3)')}
                >🐙 GitHub →</a>
                {p.wip && <span style={{ fontSize:'0.68rem', letterSpacing:'1.5px', textTransform:'uppercase', padding:'0.25rem 0.7rem', borderRadius:2, background:'rgba(74,144,217,0.1)', border:'1px solid rgba(74,144,217,0.3)', color:'var(--blue3)' }}>⚙ In Progress</span>}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

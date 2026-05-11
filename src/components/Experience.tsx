import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tl-item', {
        opacity: 0, x: -50, duration: 0.7, stagger: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: '.timeline', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef}>
      <div className="section-wrap">
        <div className="section-header">
          <div className="section-tag">// mission log</div>
          <h2 className="section-title">Work <span className="accent">Experience</span></h2>
          <div className="section-divider">
            <div className="divider-line"/><span className="divider-spider">🕷</span><div className="divider-line right"/>
          </div>
        </div>

        <div className="timeline" style={{ position:'relative' }}>
          <div style={{ position:'absolute', left:20, top:0, bottom:0, width:2, background:'repeating-linear-gradient(to bottom,var(--red) 0,var(--red) 8px,transparent 8px,transparent 14px)', opacity:0.4 }}/>

          {experience.map((e,i) => (
            <div key={i} className="tl-item" style={{ display:'flex', gap:'2.5rem', marginBottom:'3rem' }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', paddingTop:'0.4rem' }}>
                <div style={{ width:42, height:42, borderRadius:'50%', flexShrink:0, background:'var(--dark)', border:'2px solid var(--red)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', boxShadow:'0 0 16px rgba(226,54,54,0.5)' }}>{e.icon}</div>
              </div>
              <div style={{ flex:1 }}>
                <div className="web-card" style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:4, padding:'1.8rem', transition:'all 0.3s', position:'relative', overflow:'hidden' }}
                  onMouseEnter={el => { (el.currentTarget as HTMLElement).style.borderColor='var(--red)'; (el.currentTarget as HTMLElement).style.boxShadow='0 0 40px rgba(226,54,54,0.1)'; }}
                  onMouseLeave={el => { (el.currentTarget as HTMLElement).style.borderColor='var(--border)'; (el.currentTarget as HTMLElement).style.boxShadow='none'; }}
                >
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'0.5rem', marginBottom:'0.8rem' }}>
                    <div>
                      <div style={{ fontSize:'1.1rem', fontWeight:800, color:'var(--white)' }}>{e.role}</div>
                      <div style={{ color:'var(--blue3)', fontSize:'0.88rem', fontWeight:600, marginTop:'0.2rem' }}>{e.company}</div>
                    </div>
                    <span style={{ fontSize:'0.72rem', letterSpacing:1, padding:'0.3rem 0.8rem', borderRadius:2, background:'rgba(226,54,54,0.08)', border:'1px solid rgba(226,54,54,0.2)', color:'var(--red)', whiteSpace:'nowrap' }}>{e.date}</span>
                  </div>
                  <ul style={{ listStyle:'none', margin:0, padding:0 }}>
                    {e.bullets.map((b,j) => (
                      <li key={j} style={{ fontSize:'0.88rem', lineHeight:1.75, color:'var(--text)', padding:'0.25rem 0 0.25rem 1.4rem', position:'relative' }}>
                        <span style={{ position:'absolute', left:0, color:'var(--red)' }}>▸</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .tl-item{flex-direction:column!important;gap:1rem!important;}
          .timeline::before{display:none;}
        }
      `}</style>
    </section>
  );
}

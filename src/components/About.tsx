import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-badge', {
        rotateY: 360, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-badge', start: 'top 80%' },
      });
      gsap.from('.about-text > *', {
        opacity: 0, x: 40, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-text', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef}>
      <div className="section-wrap">
        <div className="section-header">
          <div className="section-tag">// origin story</div>
          <h2 className="section-title">About <span className="accent">Me</span></h2>
          <div className="section-divider">
            <div className="divider-line"/><span className="divider-spider">🕷</span><div className="divider-line right"/>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:'5rem', alignItems:'center' }}>
          {/* 3D Badge */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', perspective:600 }}>
            <div className="about-badge" style={{ width:240, height:240, transformStyle:'preserve-3d', animation:'badgeSpin 15s linear infinite', position:'relative' }}>
              {[240,180,120].map((size,i) => (
                <div key={i} style={{
                  position:'absolute', borderRadius:'50%', border:'1px solid',
                  width:size, height:size, margin:-size/2,
                  top:'50%', left:'50%',
                  borderColor:`rgba(226,54,54,${0.5 - i*0.1})`,
                  transform:`rotateX(${i*60}deg)`,
                  animation: i===0 ? 'ringPulse 2s ease-in-out infinite' : undefined,
                }}/>
              ))}
              <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%) translateZ(20px)', fontSize:'5rem', lineHeight:1, filter:'drop-shadow(0 0 20px rgba(226,54,54,0.8))', animation:'spiderFloat 3s ease-in-out infinite' }}>🕷️</div>
            </div>
          </div>

          {/* Text */}
          <div className="about-text" style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            <p style={{ fontSize:'0.97rem', lineHeight:1.9, color:'var(--text)' }}>
              <strong style={{ color:'var(--red)' }}>Generative AI Developer</strong> and MSc Data Science graduate (University of Roehampton, 2026) with hands-on experience building Transformer architectures, GANs, Graph Neural Networks, and NLP pipelines in Python and PyTorch.
            </p>
            <p style={{ fontSize:'0.97rem', lineHeight:1.9, color:'var(--text)' }}>
              Projects include a <strong style={{ color:'var(--red)' }}>Transformer-based GAN</strong> for controllable music generation, a deployed <strong style={{ color:'var(--red)' }}>crypto scam detection system</strong> using XGBoost and GCN, and an end-to-end supervised ML pipeline — backed by 1.5+ years in IT and network security engineering.
            </p>
            <p style={{ fontSize:'0.97rem', lineHeight:1.9, color:'var(--text)' }}>
              Armed with <strong style={{ color:'var(--red)' }}>AWS GenAI</strong>, <strong style={{ color:'var(--red)' }}>Cisco CCNA</strong>, <strong style={{ color:'var(--red)' }}>Google Cloud</strong>, and <strong style={{ color:'var(--red)' }}>Fortinet NSE</strong> credentials. Eligible to work full-time immediately in the UK on a Graduate Route Visa — no sponsorship required.
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem', marginTop:'1rem' }}>
              {[['4+','ML Projects'],['8+','Certifications'],['9.27','CGPA / 10']].map(([num,label]) => (
                <div key={label} style={{ textAlign:'center', padding:'1.2rem 1rem', background:'var(--card)', border:'1px solid var(--border)', borderRadius:4, position:'relative', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,var(--red),var(--blue3))' }}/>
                  <div style={{ fontSize:'2rem', fontWeight:900, color:'var(--red)', fontFamily:"'Courier New',monospace" }}>{num}</div>
                  <div style={{ fontSize:'0.65rem', letterSpacing:2, textTransform:'uppercase', color:'var(--text)', marginTop:'0.2rem' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes badgeSpin { from{transform:rotateY(0deg) rotateX(15deg);} to{transform:rotateY(360deg) rotateX(15deg);} }
        @keyframes ringPulse { 0%,100%{border-color:rgba(226,54,54,0.5);} 50%{border-color:rgba(226,54,54,0.9);box-shadow:0 0 20px 4px rgba(226,54,54,0.2);} }
        @keyframes spiderFloat { 0%,100%{transform:translate(-50%,-50%) translateZ(20px);} 50%{transform:translate(-50%,-50%) translateZ(40px);} }
        @media(max-width:900px){
          #about .section-wrap > div:last-child { grid-template-columns:1fr!important; }
        }
      `}</style>
    </section>
  );
}

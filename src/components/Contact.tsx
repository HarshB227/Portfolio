import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const links = [
  { icon:'✉️', label:'Email',    val:'bhavsarharsh0904@gmail.com', href:'mailto:bhavsarharsh0904@gmail.com' },
  { icon:'📱', label:'Phone',    val:'+44 7375 109 422',            href:'tel:+447375109422' },
  { icon:'💼', label:'LinkedIn', val:'harsh-bhavsar-059b90250',     href:'https://linkedin.com/in/harsh-bhavsar-059b90250' },
  { icon:'🐙', label:'GitHub',   val:'HarshB227',                   href:'https://github.com/HarshB227' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-item', {
        opacity: 0, y: 40, duration: 0.6, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-links', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div id="contact" className="full-section bg-dark2" ref={sectionRef}>
      <div className="section-wrap">
        <div className="section-header">
          <div className="section-tag">// send a signal</div>
          <h2 className="section-title">Get In <span className="accent">Touch</span></h2>
          <div className="section-divider">
            <div className="divider-line"/><span className="divider-spider">🕸</span><div className="divider-line right"/>
          </div>
        </div>

        <div style={{ textAlign:'center' }}>
          <p style={{ fontSize:'1rem', color:'var(--text)', lineHeight:1.9, marginBottom:'3rem', maxWidth:600, margin:'0 auto 3rem' }}>
            Looking for part-time or full-time roles in <strong style={{ color:'var(--red)' }}>Generative AI</strong>, <strong style={{ color:'var(--red)' }}>Data Science</strong>, <strong style={{ color:'var(--red)' }}>IT Support</strong>, or <strong style={{ color:'var(--red)' }}>Network Security</strong> within the UK. Open to opportunities — let's connect.
          </p>

          <div className="contact-links" style={{ display:'flex', flexWrap:'wrap', gap:'1.2rem', justifyContent:'center', marginBottom:'2.5rem' }}>
            {links.map(l => (
              <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="contact-item" style={{ display:'flex', alignItems:'center', gap:'0.9rem', padding:'1rem 1.8rem', borderRadius:4, background:'var(--card)', border:'1px solid var(--border)', textDecoration:'none', color:'var(--text)', transition:'all 0.3s', clipPath:'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='var(--red)'; el.style.color='var(--red)'; el.style.transform='translateY(-4px)'; el.style.boxShadow='0 15px 40px rgba(226,54,54,0.15)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='var(--border)'; el.style.color='var(--text)'; el.style.transform='none'; el.style.boxShadow='none'; }}
              >
                <span style={{ fontSize:'1.2rem' }}>{l.icon}</span>
                <div>
                  <span style={{ fontSize:'0.65rem', textTransform:'uppercase', letterSpacing:2, color:'var(--red)', display:'block', marginBottom:'0.1rem' }}>{l.label}</span>
                  <span style={{ fontSize:'0.88rem' }}>{l.val}</span>
                </div>
              </a>
            ))}
          </div>

          <a href="/Harsh_Bhavsar_CV.docx" download className="btn btn-red">🕸 Download CV</a>
        </div>
      </div>
    </div>
  );
}

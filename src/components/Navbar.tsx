import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const links = ['About','Skills','Projects','Experience','Education','Certs','Contact'];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.from(navRef.current, { y: -80, opacity: 0, duration: 0.8, ease: 'power3.out' });
  }, []);

  return (
    <nav ref={navRef} style={{
      position:'fixed', top:0, left:0, right:0, zIndex:1000,
      display:'flex', justifyContent:'space-between', alignItems:'center',
      padding:'1.1rem 4rem',
      background:'rgba(5,10,20,0.85)',
      backdropFilter:'blur(20px)',
      borderBottom:'1px solid var(--border)',
    }}>
      <div style={{
        display:'flex', alignItems:'center', gap:'0.7rem',
        fontFamily:"'Courier New',monospace", fontSize:'1.2rem',
        fontWeight:900, letterSpacing:2, color:'var(--white)',
      }}>
        <div style={{
          width:36, height:36, background:'var(--red)',
          clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem',
          animation:'spiderPulse 2s ease-in-out infinite',
        }}>🕷</div>
        HARSH<span style={{color:'var(--red)'}}>.</span>
      </div>

      <ul style={{listStyle:'none', display:'flex', gap:'2.2rem', margin:0, padding:0}}>
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} style={{
              textDecoration:'none', color:'var(--text)',
              fontSize:'0.82rem', letterSpacing:'1.5px', textTransform:'uppercase',
              transition:'color 0.3s', position:'relative', paddingBottom:4,
            }}
            onMouseEnter={e => (e.currentTarget.style.color='var(--red)')}
            onMouseLeave={e => (e.currentTarget.style.color='var(--text)')}
            >{l}</a>
          </li>
        ))}
      </ul>

      <style>{`
        @keyframes spiderPulse {
          0%,100%{box-shadow:0 0 0 0 rgba(226,54,54,0.4);}
          50%{box-shadow:0 0 0 10px rgba(226,54,54,0);}
        }
        @media(max-width:900px){
          nav{padding:1rem 1.5rem!important;}
          nav ul{gap:1rem!important;font-size:0.7rem!important;}
        }
      `}</style>
    </nav>
  );
}

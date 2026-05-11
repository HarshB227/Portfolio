import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ROLES = [
  'Generative AI Developer',
  'Data Scientist',
  'ML Engineer',
  'Network Security Expert',
];


export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  /* ── Typing effect ── */
  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed   = isDeleting ? 42 : 88;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, displayed.length + 1);
        setDisplayed(next);
        if (next === current) setTimeout(() => setIsDeleting(true), 1800);
      } else {
        const next = current.slice(0, displayed.length - 1);
        setDisplayed(next);
        if (next === '') {
          setIsDeleting(false);
          setRoleIndex(i => (i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, isDeleting, roleIndex]);

  /* ── Three.js spider-web scene ── */
  useEffect(() => {
    const canvas   = canvasRef.current!;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 22);

    const makeWeb = (rings: number, spokes: number, radius: number, zOffset: number) => {
      const verts: number[] = [];
      const step = (Math.PI * 2) / spokes;
      for (let r = 1; r <= rings; r++) {
        const rad = (r / rings) * radius;
        for (let s = 0; s < spokes; s++) {
          const a1 = s * step, a2 = (s + 1) * step;
          verts.push(Math.cos(a1)*rad, Math.sin(a1)*rad, zOffset,
                     Math.cos(a2)*rad, Math.sin(a2)*rad, zOffset);
        }
      }
      for (let s = 0; s < spokes; s++) {
        const a = s * step;
        verts.push(0, 0, zOffset, Math.cos(a)*radius, Math.sin(a)*radius, zOffset);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
      return geo;
    };

    const mat1 = new THREE.LineBasicMaterial({ color: 0xe23636, transparent: true, opacity: 0.18 });
    const mat2 = new THREE.LineBasicMaterial({ color: 0x2d6abf, transparent: true, opacity: 0.10 });

    const web1 = new THREE.LineSegments(makeWeb(8, 12, 18, 0), mat1);
    const web2 = new THREE.LineSegments(makeWeb(5,  8, 12, -5), mat2);
    const web3 = new THREE.LineSegments(makeWeb(6, 10, 10,  3), mat1);
    web2.position.set(-8, 6, 0);
    web3.position.set(10, -5, 0);
    scene.add(web1, web2, web3);

    const dropCount = 120;
    const dropPos   = new Float32Array(dropCount * 3);
    const dropVels  = Array.from({ length: dropCount }, () => ({
      x: (Math.random() - 0.5) * 0.03,
      y: (Math.random() - 0.5) * 0.03,
      z: (Math.random() - 0.5) * 0.02,
    }));
    for (let i = 0; i < dropCount; i++) {
      dropPos[i*3]   = (Math.random() - 0.5) * 60;
      dropPos[i*3+1] = (Math.random() - 0.5) * 40;
      dropPos[i*3+2] = (Math.random() - 0.5) * 20;
    }
    const dropGeo = new THREE.BufferGeometry();
    dropGeo.setAttribute('position', new THREE.BufferAttribute(dropPos, 3));
    const dropMat = new THREE.PointsMaterial({ color: 0xe23636, size: 0.15, transparent: true, opacity: 0.5 });
    scene.add(new THREE.Points(dropGeo, dropMat));

    const makeFloat = (color: number, x: number, y: number, z: number, size: number) => {
      const m = new THREE.Mesh(
        new THREE.IcosahedronGeometry(size, 0),
        new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.12 })
      );
      m.position.set(x, y, z); return m;
    };
    const f1 = makeFloat(0xe23636, -14,  7, -8, 2.5);
    const f2 = makeFloat(0x2d6abf,  14, -6, -6, 2.0);
    const f3 = makeFloat(0xe23636,   0, -10, -4, 1.5);
    scene.add(f1, f2, f3);

    let mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    document.addEventListener('mousemove', onMove);

    let t = 0, rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += 0.005;
      web1.rotation.z += 0.0008; web2.rotation.z -= 0.0012; web3.rotation.z += 0.001;
      web1.scale.setScalar(1 + Math.sin(t) * 0.03);
      for (let i = 0; i < dropCount; i++) {
        dropPos[i*3]   += dropVels[i].x;
        dropPos[i*3+1] += dropVels[i].y;
        dropPos[i*3+2] += dropVels[i].z;
        if (Math.abs(dropPos[i*3])   > 30) dropVels[i].x *= -1;
        if (Math.abs(dropPos[i*3+1]) > 20) dropVels[i].y *= -1;
        if (Math.abs(dropPos[i*3+2]) > 10) dropVels[i].z *= -1;
      }
      dropGeo.attributes.position.needsUpdate = true;
      f1.rotation.x += 0.005; f1.rotation.y += 0.007;
      f2.rotation.x -= 0.004; f2.rotation.y += 0.006;
      f3.rotation.y += 0.008; f3.rotation.z += 0.004;
      camera.position.x += (mx * 4 - camera.position.x) * 0.03;
      camera.position.y += (-my * 3 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  /* ── GSAP entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-eyebrow', { opacity: 0, y: 30, duration: 0.8, delay: 0.4 });
      gsap.from('.hero-name',    { opacity: 0, y: 30, duration: 0.8, delay: 0.6 });
      gsap.from('.hero-typing',  { opacity: 0, y: 30, duration: 0.8, delay: 0.8 });
      gsap.from('.hero-quote',   { opacity: 0, y: 30, duration: 0.8, delay: 1.0 });
      gsap.from('.hero-btns',    { opacity: 0, y: 30, duration: 0.8, delay: 1.2 });
      gsap.from('.hero-mask',    { opacity: 0, scale: 0.75, duration: 1.1, delay: 0.5, ease: 'back.out(1.4)' });
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--dark)' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* City skyline */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1, height: 220, background: 'linear-gradient(to top,rgba(5,10,20,1) 0%,rgba(5,10,20,0.6) 60%,transparent 100%)' }}>
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }}>
          <path fill="rgba(5,10,20,0.9)" d="M0,220 L0,140 L40,140 L40,100 L60,100 L60,120 L80,120 L80,80 L90,80 L90,60 L100,60 L100,80 L110,80 L110,40 L120,40 L120,30 L125,30 L125,40 L130,40 L130,80 L150,80 L150,100 L170,100 L170,60 L185,60 L185,50 L190,50 L190,60 L210,60 L210,100 L230,100 L230,70 L250,70 L250,50 L260,50 L260,30 L265,30 L265,20 L270,20 L270,30 L275,30 L275,50 L285,50 L285,70 L310,70 L310,90 L330,90 L330,60 L350,60 L350,40 L360,40 L360,20 L370,20 L370,10 L380,10 L380,20 L390,20 L390,40 L400,40 L400,60 L430,60 L430,80 L450,80 L450,55 L470,55 L470,35 L480,35 L480,25 L490,25 L490,35 L500,35 L500,55 L530,55 L530,75 L560,75 L560,45 L580,45 L580,30 L590,30 L590,45 L620,45 L620,75 L650,75 L650,50 L670,50 L670,30 L680,30 L680,15 L690,15 L690,5 L700,5 L700,15 L710,15 L710,30 L720,30 L720,50 L750,50 L750,70 L780,70 L780,45 L800,45 L800,30 L810,30 L810,20 L820,20 L820,30 L840,30 L840,45 L870,45 L870,65 L900,65 L900,40 L920,40 L920,55 L950,55 L950,75 L980,75 L980,50 L1000,50 L1000,30 L1010,30 L1010,20 L1020,20 L1020,10 L1030,10 L1030,20 L1040,20 L1040,30 L1060,30 L1060,50 L1090,50 L1090,70 L1120,70 L1120,45 L1140,45 L1140,30 L1155,30 L1155,45 L1180,45 L1180,65 L1210,65 L1210,40 L1230,40 L1230,55 L1260,55 L1260,75 L1290,75 L1290,55 L1310,55 L1310,40 L1325,40 L1325,25 L1335,25 L1335,40 L1360,40 L1360,55 L1390,55 L1390,80 L1440,80 L1440,220 Z"/>
          <g fill="rgba(226,54,54,0.15)">
            <rect x="362" y="22" width="6" height="6"/><rect x="372" y="22" width="6" height="6"/>
            <rect x="362" y="32" width="6" height="6"/><rect x="692" y="8"  width="6" height="6"/>
            <rect x="702" y="18" width="6" height="6"/><rect x="1022" y="12" width="6" height="6"/>
            <rect x="1032" y="22" width="6" height="6"/>
          </g>
          <g fill="rgba(74,144,217,0.2)">
            <rect x="112" y="42" width="5" height="5"/><rect x="122" y="32" width="5" height="5"/>
            <rect x="262" y="32" width="5" height="5"/><rect x="482" y="27" width="5" height="5"/>
            <rect x="812" y="22" width="5" height="5"/>
          </g>
        </svg>
      </div>

      {/* Hero content — centred */}
      <div ref={contentRef} className="hero-grid" style={{
        position: 'relative', zIndex: 3, width: '100%', maxWidth: 900,
        margin: '0 auto', padding: '0 4rem',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'center', minHeight: '100vh',
      }}>

        {/* LEFT — text, vertically centred */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, justifyContent: 'center' }}>

          {/* Fix 1 — single-line eyebrow, tighter spacing */}
          <div className="hero-eyebrow" style={{
            fontFamily: "'Courier New',monospace", fontSize: '0.72rem',
            letterSpacing: 3, textTransform: 'uppercase',
            color: 'var(--red)', marginBottom: '1.2rem', whiteSpace: 'nowrap',
          }}>
            🕸 Friendly Neighborhood Generative AI Developer 🕸
          </div>

          <h1 className="hero-name" style={{
            fontSize: 'clamp(3rem,7vw,5.5rem)', fontWeight: 900,
            lineHeight: 0.95, color: 'var(--white)', letterSpacing: -3, marginBottom: '1.4rem',
          }}>
            <span style={{ color: 'var(--red)', textShadow: '0 0 40px rgba(226,54,54,0.5)', display: 'inline-block', animation: 'nameGlow 3s ease-in-out infinite 1.4s' }}>HARSH</span><br/>
            BHAVSAR
          </h1>

          {/* Typing line */}
          <div className="hero-typing" style={{ fontSize: 'clamp(1rem,2vw,1.3rem)', marginBottom: '0.8rem', minHeight: '2rem' }}>
            <span style={{ color: 'var(--blue3)', fontWeight: 600 }}>{displayed}</span>
            <span style={{ color: 'var(--red)', fontWeight: 300, animation: 'blink 1s step-end infinite' }}>|</span>
          </div>

          <p className="hero-quote" style={{ fontSize: '0.85rem', color: 'rgba(200,216,240,0.5)', fontStyle: 'italic', marginBottom: '2rem' }}>
            "With great data, comes great responsibility."
          </p>

          {/* Available badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.8rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'availPulse 2s ease-in-out infinite', flexShrink: 0 }}/>
            <span style={{ fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(200,216,240,0.6)' }}>
              Available · UK Graduate Visa · No Sponsorship Needed
            </span>
          </div>

          {/* Fix 3 — stronger Contact Me button */}
          <div className="hero-btns" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#projects" className="btn btn-red">View My Work</a>
            <a href="#contact" style={{
              padding: '0.85rem 2.2rem', borderRadius: 3,
              fontSize: '0.8rem', fontWeight: 700, letterSpacing: 2,
              textTransform: 'uppercase', textDecoration: 'none',
              cursor: 'none', display: 'inline-block',
              clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
              background: 'transparent',
              color: 'var(--white)',
              border: '1.5px solid rgba(226,54,54,0.8)',
              boxShadow: '0 0 18px rgba(226,54,54,0.2), inset 0 0 18px rgba(226,54,54,0.05)',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='rgba(226,54,54,0.15)'; el.style.transform='translateY(-3px)'; el.style.boxShadow='0 0 30px rgba(226,54,54,0.4)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='transparent'; el.style.transform='none'; el.style.boxShadow='0 0 18px rgba(226,54,54,0.2), inset 0 0 18px rgba(226,54,54,0.05)'; }}
            >Contact Me</a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '0.65rem', letterSpacing: 3, color: 'rgba(200,216,240,0.4)', textTransform: 'uppercase' }}>Scroll Down</span>
        <div style={{ width: 1, height: 55, background: 'linear-gradient(to bottom,var(--red),transparent)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-100%', width: '100%', height: '100%', background: 'linear-gradient(to bottom,transparent,var(--red),transparent)', animation: 'webShoot 1.8s ease-in-out infinite' }}/>
        </div>
      </div>

      <style>{`
        @keyframes nameGlow {
          0%,100%{text-shadow:0 0 30px rgba(226,54,54,0.4);}
          50%{text-shadow:0 0 60px rgba(226,54,54,0.8),0 0 100px rgba(226,54,54,0.3);}
        }
        @keyframes webShoot { 0%{top:-100%;} 100%{top:200%;} }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
        @keyframes availPulse {
          0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.5);}
          50%{box-shadow:0 0 0 8px rgba(34,197,94,0);}
        }
        @keyframes maskPulse {
          0%,100%{ opacity:1; transform:scale(1); }
          50%{ opacity:0.7; transform:scale(1.08); }
        }
        @keyframes heroFloat {
          0%,100%{ transform:translateY(0px); }
          50%{ transform:translateY(-14px); }
        }
        @media(max-width:900px){
          .hero-grid{
            grid-template-columns:1fr !important;
            padding:0 1.5rem !important;
            text-align:center;
          }
          .hero-mask{ order:-1; }
          .hero-mask svg{ max-width:220px !important; }
          .hero-btns{ justify-content:center; }
          .hero-eyebrow{ font-size:0.65rem !important; }
        }
      `}</style>
    </section>
  );
}

import { useEffect, useState } from 'react';

interface Word { id: number; text: string; x: number; y: number; color: string; rotation: number; }

const TRIGGERS = [
  { section: 'about',      word: 'ORIGIN!',  color: '#e23636' },
  { section: 'skills',     word: 'POW!',     color: '#ff5252' },
  { section: 'projects',   word: 'THWIP!',   color: '#4a90d9' },
  { section: 'experience', word: 'ACTION!',  color: '#e23636' },
  { section: 'education',  word: 'LEVEL UP!',color: '#f5c518' },
  { section: 'certs',      word: 'ZAP!',     color: '#ff5252' },
  { section: 'contact',    word: 'CONNECT!', color: '#4a90d9' },
];

let nextId = 0;

export default function ComicWords() {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    TRIGGERS.forEach(({ section, word, color }) => {
      const el = document.getElementById(section);
      if (!el) return;

      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          const id = ++nextId;
          const x = 10 + Math.random() * 60;
          const y = 20 + Math.random() * 50;
          const rotation = -15 + Math.random() * 30;

          setWords(prev => [...prev, { id, text: word, x, y, color, rotation }]);
          setTimeout(() => setWords(prev => prev.filter(w => w.id !== id)), 1500);
        }
      }, { threshold: 0.3 });

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      {words.map(w => (
        <div key={w.id} className="action-word" style={{
          left:  `${w.x}vw`,
          top:   `${w.y}vh`,
          color:  w.color,
          transform: `rotate(${w.rotation}deg)`,
          /* starburst background */
          background: 'rgba(5,10,20,0.85)',
          padding: '0.3rem 1rem',
          borderRadius: 4,
          border: `3px solid ${w.color}`,
          boxShadow: `4px 4px 0 #000, 0 0 30px ${w.color}55`,
          textShadow: `2px 2px 0 #000`,
          WebkitTextStroke: `2px #000`,
        }}>
          {w.text}
        </div>
      ))}
    </>
  );
}

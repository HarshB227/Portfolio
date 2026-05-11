/* SVG mockup illustrations for each project card */

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(226,54,54,0.2)', marginBottom: '1rem' }}>
      {/* Browser bar */}
      <div style={{ background: '#0a1525', padding: '7px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#e23636', display: 'inline-block' }}/>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}/>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}/>
        <div style={{ flex: 1, height: 14, background: 'rgba(255,255,255,0.05)', borderRadius: 3, marginLeft: 6 }}/>
      </div>
      {/* Content area */}
      <div style={{ background: '#060d1a', padding: '1rem' }}>
        {children}
      </div>
    </div>
  );
}

/* Waveform bars for music GAN project */
export function MusicMockup() {
  const bars = [28, 45, 62, 38, 75, 55, 82, 48, 65, 40, 72, 35, 58, 80, 42, 68, 52, 76, 44, 60];
  return (
    <BrowserFrame>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 3, height: 70 }}>
        {bars.map((h, i) => (
          <div key={i} style={{
            width: 8, height: h, borderRadius: 2,
            background: `linear-gradient(to top, var(--red), #ff8a8a)`,
            opacity: 0.7 + (i % 3) * 0.1,
            animation: `barPulse${i % 4} ${1.2 + (i % 5) * 0.3}s ease-in-out infinite ${i * 0.08}s`,
          }}/>
        ))}
      </div>
      <div style={{ marginTop: '0.5rem', display: 'flex', gap: 8, justifyContent: 'center' }}>
        {['Genre: Jazz', 'Tempo: 120bpm', 'Mood: Upbeat'].map(tag => (
          <span key={tag} style={{ fontSize: '0.6rem', padding: '2px 6px', borderRadius: 3, background: 'rgba(226,54,54,0.12)', color: 'var(--red)', border: '1px solid rgba(226,54,54,0.2)' }}>{tag}</span>
        ))}
      </div>
      <style>{`
        @keyframes barPulse0 { 0%,100%{transform:scaleY(1);} 50%{transform:scaleY(0.5);} }
        @keyframes barPulse1 { 0%,100%{transform:scaleY(0.7);} 50%{transform:scaleY(1.1);} }
        @keyframes barPulse2 { 0%,100%{transform:scaleY(1.1);} 50%{transform:scaleY(0.6);} }
        @keyframes barPulse3 { 0%,100%{transform:scaleY(0.8);} 50%{transform:scaleY(1);} }
      `}</style>
    </BrowserFrame>
  );
}

/* Network graph for crypto detection */
export function CryptoMockup() {
  const nodes = [
    { x: 50, y: 50, r: 7, flagged: true  },
    { x: 130, y: 30, r: 5, flagged: false },
    { x: 160, y: 75, r: 9, flagged: true  },
    { x: 80,  y: 90, r: 5, flagged: false },
    { x: 220, y: 40, r: 6, flagged: false },
    { x: 200, y: 85, r: 5, flagged: true  },
    { x: 270, y: 60, r: 5, flagged: false },
    { x: 30,  y: 20, r: 4, flagged: false },
  ];
  const edges = [[0,3],[0,1],[1,2],[2,3],[2,5],[4,5],[4,6],[5,6],[0,7]];
  return (
    <BrowserFrame>
      <svg viewBox="0 0 300 110" style={{ width: '100%', height: 90 }}>
        {edges.map(([a,b], i) => (
          <line key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke="rgba(74,144,217,0.3)" strokeWidth="1"
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            {n.flagged && <circle cx={n.x} cy={n.y} r={n.r + 5} fill="rgba(226,54,54,0.15)" style={{ animation: 'nodeAlert 1.5s ease-in-out infinite' }}/>}
            <circle cx={n.x} cy={n.y} r={n.r} fill={n.flagged ? '#e23636' : '#2d6abf'} opacity={0.9}/>
          </g>
        ))}
        <text x="240" y="100" fontSize="9" fill="rgba(200,216,240,0.4)">Risk: HIGH</text>
      </svg>
      <style>{`
        @keyframes nodeAlert { 0%,100%{opacity:0.2;} 50%{opacity:0.7;} }
      `}</style>
    </BrowserFrame>
  );
}

/* Bar chart for ML prediction */
export function MLMockup() {
  const models = [
    { name: 'XGBoost',     acc: 88, color: '#e23636' },
    { name: 'Random Forest', acc: 83, color: '#4a90d9' },
    { name: 'SVM',         acc: 79, color: '#2d6abf' },
    { name: 'Logistic Reg',acc: 72, color: '#1b3a6b' },
  ];
  return (
    <BrowserFrame>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {models.map(m => (
          <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.6rem', color: 'rgba(200,216,240,0.5)', width: 72, textAlign: 'right', flexShrink: 0 }}>{m.name}</span>
            <div style={{ flex: 1, height: 12, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: `${m.acc}%`, height: '100%', background: `linear-gradient(90deg, ${m.color}, ${m.color}99)`, borderRadius: 2, transition: 'width 1s ease' }}/>
            </div>
            <span style={{ fontSize: '0.6rem', color: m.color, width: 28, fontWeight: 700 }}>{m.acc}%</span>
          </div>
        ))}
      </div>
    </BrowserFrame>
  );
}

/* Connected agent nodes for multi-agent */
export function AgentMockup() {
  const agents = [
    { x: 150, y: 30,  label: 'Agent A' },
    { x: 60,  y: 85,  label: 'Agent B' },
    { x: 240, y: 85,  label: 'Agent C' },
    { x: 150, y: 85,  label: 'Env' },
  ];
  return (
    <BrowserFrame>
      <svg viewBox="0 0 300 115" style={{ width: '100%', height: 95 }}>
        {/* Connections */}
        <line x1="150" y1="42"  x2="60"  y2="73"  stroke="rgba(226,54,54,0.4)" strokeWidth="1.5" strokeDasharray="4,3"/>
        <line x1="150" y1="42"  x2="240" y2="73"  stroke="rgba(226,54,54,0.4)" strokeWidth="1.5" strokeDasharray="4,3"/>
        <line x1="150" y1="42"  x2="150" y2="73"  stroke="rgba(74,144,217,0.5)" strokeWidth="1.5"/>
        <line x1="60"  y1="85"  x2="150" y2="85"  stroke="rgba(74,144,217,0.25)" strokeWidth="1" strokeDasharray="3,3"/>
        <line x1="240" y1="85"  x2="150" y2="85"  stroke="rgba(74,144,217,0.25)" strokeWidth="1" strokeDasharray="3,3"/>
        {agents.map((a, i) => (
          <g key={i}>
            <circle cx={a.x} cy={a.y === 30 ? 36 : 85} r={i === 3 ? 14 : 11}
              fill={i === 0 ? '#e23636' : i === 3 ? '#2d6abf' : '#1b3a6b'}
              stroke={i === 0 ? '#ff5252' : '#4a90d9'} strokeWidth="1.5" opacity="0.9"
            />
            <text x={a.x} y={(a.y === 30 ? 36 : 85) + 4} textAnchor="middle"
              fontSize="7" fill="white" fontWeight="600">{a.label.split(' ')[1] || 'E'}</text>
            <text x={a.x} y={(a.y === 30 ? 36 : 85) + 20}
              textAnchor="middle" fontSize="7" fill="rgba(200,216,240,0.4)">{a.label}</text>
          </g>
        ))}
      </svg>
    </BrowserFrame>
  );
}

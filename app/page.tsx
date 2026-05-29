'use client'
export default function Home() {
  const SQ = {
    black: '#0e0e0e', white: '#ffffff', grayLight: '#f2f2f2',
    grayMid: '#878787', graySubtle: '#e7e7e7',
  }

  const moments = [
    { num: '01', title: 'The Intake', principle: 'Make AI useful', desc: 'Replace checkbox onboarding with a conversational intake that gathers real intent — including clarifying questions when answers are vague.', failureModes: ['Intent Translation Failure', 'Generic Output', 'False Promise'], href: '/moment-1' },
    { num: '02', title: 'The Transparent Builder', principle: 'Show AI reasoning', desc: 'Click any section of the live preview to see why the AI made that decision — and override it with your own direction.', failureModes: ['Opacity', 'False Recommendation', 'Template Prison'], href: '/moment-2' },
    { num: '03', title: 'The Context Layer', principle: 'Learn from behavior', desc: 'A persistent model of who you are, built from your intake and updated as you edit. The AI never forgets, and never starts from zero.', failureModes: ['Session Blindness', 'Voice Displacement', 'Domain Collapse'], href: '/moment-3' },
  ]

  return (
    <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", minHeight: '100vh', background: SQ.white }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 40px', borderBottom: `1px solid ${SQ.graySubtle}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M16 3C8.82 3 3 8.82 3 16s5.82 13 13 13 13-5.82 13-13S23.18 3 16 3zm-3.25 18L7.5 15.75l2.25-2.25 3 3 9.5-9.5 2.25 2.25-12 12z" fill={SQ.black}/></svg>
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '1px', color: SQ.black, textTransform: 'uppercase' as const }}>Squarespace</span>
          <span style={{ fontSize: 12, color: SQ.grayMid, marginLeft: 8 }}>Blueprint AI — Redesign</span>
        </div>
        <span style={{ fontSize: 14, letterSpacing: '3.5px', textTransform: 'uppercase' as const, color: SQ.black, fontWeight: 500 }}>Ali Khan, 2026</span>
      </div>

      {/* Hero */}
      <div style={{ padding: '64px 40px 48px', maxWidth: 900 }}>
        <p style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: SQ.grayMid, fontWeight: 500, marginBottom: 16 }}>Case Study — Interaction Design</p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 500, color: SQ.black, lineHeight: 1.2, marginBottom: 20 }}>From Checkboxes to Conversations</h1>
        <p style={{ fontSize: 16, color: SQ.grayMid, lineHeight: 1.7, maxWidth: 680, marginBottom: 32 }}>
          Squarespace's Blueprint AI promises a website "customized for your brand after a few simple questions." After auditing the experience across two user journeys and documenting 20 distinct failure modes, I redesigned three key moments — each one a direct response to a documented failure.
        </p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' as const }}>
          {[['20', 'Failure modes documented'], ['2', 'Audit tracks (new + power user)'], ['3', 'Redesigned moments'], ['4', 'Design principles']].map(([n, l]) => (
            <div key={l}>
              <p style={{ fontSize: 28, fontWeight: 500, color: SQ.black, lineHeight: 1 }}>{n}</p>
              <p style={{ fontSize: 12, color: SQ.grayMid, marginTop: 4 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnosis */}
      <div style={{ padding: '0 40px 48px', maxWidth: 680 }}>
        <div style={{ borderLeft: '3px solid #f0a500', padding: '16px 20px', background: '#fffbf0' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#c47a00', marginBottom: 8 }}>The Diagnosis</p>
          <p style={{ fontSize: 15, color: SQ.black, lineHeight: 1.7, fontStyle: 'italic' }}>
            "Squarespace's AI is a categorization engine wearing a personalization promise — and every category in that engine maps to Squarespace's business model, not the user's actual needs."
          </p>
        </div>
      </div>

      {/* Moments */}
      <div style={{ padding: '0 40px 64px' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: SQ.grayMid, fontWeight: 500, marginBottom: 24 }}>Three Redesigned Moments</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 900 }}>
          {moments.map(m => (
            <a key={m.num} href={m.href} style={{ display: 'block', padding: '28px 32px', border: `1px solid ${SQ.graySubtle}`, textDecoration: 'none', color: 'inherit', transition: 'border-color 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = SQ.black; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = SQ.graySubtle; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: SQ.grayMid, letterSpacing: '0.1em', fontWeight: 500 }}>{m.num}</span>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: SQ.black, margin: 0 }}>{m.title}</h2>
                    <span style={{ fontSize: 11, background: SQ.grayLight, color: SQ.grayMid, padding: '2px 10px', fontWeight: 500 }}>{m.principle}</span>
                  </div>
                  <p style={{ fontSize: 14, color: SQ.grayMid, lineHeight: 1.6, marginBottom: 12 }}>{m.desc}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
                    {m.failureModes.map(f => (
                      <span key={f} style={{ fontSize: 11, color: '#c47a00', border: '1px solid #f0a500', padding: '2px 8px' }}>{f}</span>
                    ))}
                  </div>
                </div>
                <span style={{ fontSize: 20, color: SQ.grayMid, flexShrink: 0, marginTop: 4 }}>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main style={{ fontFamily: 'Inter, sans-serif', padding: '4rem', maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem' }}>Squarespace Blueprint AI — Redesign</h1>
      <p style={{ color: '#666', marginBottom: '2rem', lineHeight: 1.6 }}>An interaction design case study by Ali Khan. Four redesigned moments addressing the core failures of Squarespace's AI website builder.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          { num: '01', title: 'The Intake', desc: 'Replacing checkbox onboarding with intentional conversation', href: '/moment-1' },
          { num: '02', title: 'The Transparent Builder', desc: 'Live collaborative preview with AI reasoning', href: '/moment-2' },
          { num: '03', title: 'The Context Layer', desc: 'Persistent user model that learns from behavior', href: '/moment-3' },
          { num: '04', title: 'The Creative Override', desc: 'Escape hatch from template constraints', href: '/moment-4' },
        ].map(m => (
          <a key={m.num} href={m.href} style={{ padding: '1.5rem', border: '1px solid #e5e5e5', borderRadius: 4, textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999' }}>{m.num}</span>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0.25rem 0' }}>{m.title}</h2>
            <p style={{ fontSize: 14, color: '#666', margin: 0 }}>{m.desc}</p>
          </a>
        ))}
      </div>
    </main>
  )
}

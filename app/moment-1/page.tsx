'use client'
import { useState, useRef, useEffect } from 'react'

const SQ_LOGO = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="2" fill="#000"/>
    <path d="M6 8.5C6 7.12 7.12 6 8.5 6h7C16.88 6 18 7.12 18 8.5v7c0 1.38-1.12 2.5-2.5 2.5h-7C7.12 18 6 16.88 6 15.5v-7z" fill="white"/>
    <path d="M9.5 9.5h5v5h-5z" fill="#000"/>
  </svg>
)

const questions = [
  {
    id: 'identity',
    question: "Let's start with you. Tell me about yourself — who you are, what you do, and what this site is for.",
    placeholder: "e.g. I'm a UX designer with 10 years of experience. I'm building a portfolio to find my next role at an AI-focused company...",
    followUp: (answer: string) => `Got it. I can work with that.`,
  },
  {
    id: 'audience',
    question: "Who are you trying to reach? And when they land on your site, what do you want them to do?",
    placeholder: "e.g. Hiring managers and recruiters at product companies. I want them to read my case studies and reach out to schedule a call...",
    followUp: (answer: string) => `That helps me understand the purpose of every page.`,
  },
  {
    id: 'personality',
    question: "Last one — how would you describe the feel of your brand? Don't worry about finding the perfect word. Just describe it naturally.",
    placeholder: "e.g. Professional but human. Not corporate. I want it to feel like a real person made it, not an agency...",
    followUp: (answer: string) => `Perfect. I have everything I need to build something that actually feels like you.`,
  },
]

interface Message {
  type: 'ai' | 'user' | 'summary'
  content: string
  questionIndex?: number
}

export default function Moment1() {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'ai', content: questions[0].question, questionIndex: 0 }
  ])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [input, setInput] = useState('')
  const [answers, setAnswers] = useState<string[]>([])
  const [done, setDone] = useState(false)
  const [editing, setEditing] = useState<number | null>(null)
  const [showBefore, setShowBefore] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = () => {
    if (!input.trim()) return
    const answer = input.trim()
    const qIndex = currentQuestion
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    setInput('')

    const newMessages: Message[] = [
      ...messages,
      { type: 'user', content: answer },
    ]

    if (qIndex < questions.length - 1) {
      const followUp = questions[qIndex].followUp(answer)
      const nextQ = questions[qIndex + 1].question
      newMessages.push({ type: 'ai', content: `${followUp}\n\n${nextQ}`, questionIndex: qIndex + 1 })
      setCurrentQuestion(qIndex + 1)
    } else {
      const followUp = questions[qIndex].followUp(answer)
      newMessages.push({ type: 'ai', content: followUp })
      newMessages.push({ type: 'summary', content: 'summary' })
      setDone(true)
    }

    setMessages(newMessages)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const summaryLabels = ['About you', 'Your audience', 'Your brand feel']

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif', minHeight: '100vh', background: '#fff' }}>

      {/* Toggle bar */}
      <div style={{ background: '#f5f5f5', borderBottom: '1px solid #e5e5e5', padding: '0.6rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SQ_LOGO />
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.05em' }}>BLUEPRINT AI</span>
          <span style={{ fontSize: 12, color: '#999', marginLeft: '0.5rem' }}>— Moment 01: The Intake</span>
        </div>
        <button
          onClick={() => setShowBefore(!showBefore)}
          style={{ fontSize: 12, padding: '0.4rem 1rem', border: '1px solid #000', background: showBefore ? '#000' : '#fff', color: showBefore ? '#fff' : '#000', cursor: 'pointer', borderRadius: 2, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}
        >
          {showBefore ? 'Show After →' : '← Show Before'}
        </button>
      </div>

      {showBefore ? (
        /* BEFORE — current Squarespace */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 48px)' }}>
          {/* Before: Topic screen */}
          <div style={{ borderRight: '1px solid #e5e5e5', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid #e5e5e5', background: '#fafafa' }}>
              <span style={{ fontSize: 11, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontWeight: 500 }}>Before — Step 2: Topic Selection</span>
            </div>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative' }}>
              <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.5rem', lineHeight: 1.3 }}>What's your site about?</h2>
                <p style={{ fontSize: 13, color: '#666', margin: 0 }}>We'll tailor content and advice to your site needs.</p>
                <div style={{ marginTop: '1.5rem', height: 2, width: 40, background: '#e5e5e5' }} />
              </div>
              <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%' }}>
                  <div style={{ background: '#f5f5f5', border: '1px solid #e5e5e5', borderRadius: 2, padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#999', fontSize: 14 }}>🔍</span>
                    <span style={{ fontSize: 14, color: '#999' }}>Search for your site topic</span>
                  </div>
                  <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid #f0f0f0' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#999', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Popular Topics</span>
                    </div>
                    {['Photography', 'Design', 'Education', 'Consulting', 'Art', 'Health'].map(t => (
                      <div key={t} style={{ padding: '0.6rem 1rem', fontSize: 14, borderBottom: '1px solid #f5f5f5', color: '#333' }}>{t}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem' }}>
                <div style={{ background: '#000', color: '#fff', padding: '0.6rem 1.5rem', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, cursor: 'pointer' }}>NEXT</div>
              </div>
            </div>
          </div>

          {/* Before: Goals screen */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid #e5e5e5', background: '#fafafa' }}>
              <span style={{ fontSize: 11, color: '#999', letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontWeight: 500 }}>Before — Step 3: Goal Selection</span>
            </div>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.5fr', position: 'relative' }}>
              <div style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid #f0f0f0' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: '0.5rem', lineHeight: 1.3 }}>What do you want to do with your website?</h2>
                <div style={{ marginTop: '1rem', height: 2, width: 40, background: '#e5e5e5' }} />
              </div>
              <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {['Sell access to group events', 'Promote a physical business', 'Publish a blog or other media', 'Sell products', 'Sell memberships', 'Sell online courses', 'Offer a contact form', 'Collect donations', 'Showcase work/expertise', 'Build community', 'Get appointments', 'Sell services'].map(g => (
                    <div key={g} style={{ padding: '0.6rem 0.75rem', border: '1px solid #e5e5e5', borderRadius: 2, fontSize: 12, color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem', background: g === 'Showcase work/expertise' ? '#f5f5f5' : '#fff' }}>
                      <div style={{ width: 14, height: 14, border: '1.5px solid', borderColor: g === 'Showcase work/expertise' ? '#000' : '#ccc', borderRadius: 2, flexShrink: 0, background: g === 'Showcase work/expertise' ? '#000' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {g === 'Showcase work/expertise' && <span style={{ color: '#fff', fontSize: 9 }}>✓</span>}
                      </div>
                      {g}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: 11, color: '#e55', fontStyle: 'italic' }}>
                  ⚠ No option for "Get hired" or "Find a job"
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', display: 'flex', gap: '1rem' }}>
                <div style={{ color: '#333', padding: '0.6rem 1.5rem', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, cursor: 'pointer' }}>BACK</div>
                <div style={{ background: '#000', color: '#fff', padding: '0.6rem 1.5rem', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, cursor: 'pointer' }}>NEXT</div>
              </div>
            </div>
          </div>
        </div>

      ) : (
        /* AFTER — redesigned conversational intake */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 48px)' }}>

          {/* Left — decorative / context */}
          <div style={{ background: '#1a1a1a', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#666', marginBottom: '1rem', fontWeight: 500 }}>What changes</div>
                {[
                  { before: 'Pick a topic from a dropdown', after: 'Describe yourself in your own words' },
                  { before: 'Check boxes for goals', after: 'Tell us who you\'re trying to reach' },
                  { before: 'Select a personality archetype', after: 'Describe your brand naturally' },
                ].map((item, i) => (
                  <div key={i} style={{ marginBottom: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ marginTop: 3, width: 6, height: 6, borderRadius: '50%', background: '#444', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 12, color: '#555', textDecoration: 'line-through', marginBottom: '0.2rem' }}>{item.before}</div>
                      <div style={{ fontSize: 13, color: '#ccc' }}>{item.after}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #333', paddingTop: '1.5rem' }}>
                <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#666', marginBottom: '0.5rem', fontWeight: 500 }}>Failure modes addressed</div>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.4rem' }}>
                  {['Intent Translation Failure', 'Generic Output', 'False Promise', 'Discoverability Failure'].map(f => (
                    <span key={f} style={{ fontSize: 11, color: '#888', border: '1px solid #333', padding: '2px 8px', borderRadius: 2 }}>{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — conversational intake */}
          <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 48px)' }}>

            {/* Header */}
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#999', marginBottom: '0.25rem', fontWeight: 500 }}>Blueprint AI</div>
              <h1 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, color: '#1a1a1a' }}>Let's understand your site</h1>
              <p style={{ fontSize: 13, color: '#999', margin: '0.25rem 0 0', lineHeight: 1.5 }}>3 questions. No checkboxes. Just tell us what you're building.</p>
            </div>

            {/* Progress */}
            <div style={{ display: 'flex', padding: '0.75rem 2rem', gap: '0.5rem', borderBottom: '1px solid #f5f5f5' }}>
              {questions.map((_, i) => (
                <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < answers.length ? '#000' : i === currentQuestion && !done ? '#ccc' : '#f0f0f0', transition: 'background 0.3s' }} />
              ))}
            </div>

            {/* Conversation */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((msg, i) => {
                if (msg.type === 'summary') {
                  return (
                    <div key={i} style={{ background: '#f9f9f9', border: '1px solid #e5e5e5', borderRadius: 4, padding: '1.25rem', marginTop: '0.5rem' }}>
                      <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' as const, fontWeight: 600, color: '#999', marginBottom: '1rem' }}>Here's what I understand about your site</div>
                      {answers.map((ans, idx) => (
                        <div key={idx} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: idx < answers.length - 1 ? '1px solid #eee' : 'none' }}>
                          <div style={{ fontSize: 11, color: '#999', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' as const, marginBottom: '0.25rem' }}>{summaryLabels[idx]}</div>
                          <div style={{ fontSize: 13, color: '#1a1a1a', lineHeight: 1.6 }}>{ans}</div>
                          <button onClick={() => setEditing(idx)} style={{ fontSize: 11, color: '#666', background: 'none', border: 'none', padding: '0.25rem 0', cursor: 'pointer', textDecoration: 'underline', marginTop: '0.25rem' }}>Edit</button>
                        </div>
                      ))}
                      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
                        <button style={{ flex: 1, background: '#000', color: '#fff', border: 'none', padding: '0.75rem', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, cursor: 'pointer' }}>
                          Build My Site →
                        </button>
                        <button style={{ background: '#fff', color: '#333', border: '1px solid #e5e5e5', padding: '0.75rem 1rem', fontSize: 13, cursor: 'pointer' }}>
                          Start Over
                        </button>
                      </div>
                    </div>
                  )
                }
                return (
                  <div key={i} style={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
                    {msg.type === 'ai' && (
                      <div style={{ width: 24, height: 24, background: '#000', borderRadius: '50%', flexShrink: 0, marginRight: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>AI</span>
                      </div>
                    )}
                    <div style={{
                      maxWidth: '80%',
                      background: msg.type === 'user' ? '#000' : '#f5f5f5',
                      color: msg.type === 'user' ? '#fff' : '#1a1a1a',
                      padding: '0.75rem 1rem',
                      borderRadius: msg.type === 'user' ? '12px 12px 2px 12px' : '2px 12px 12px 12px',
                      fontSize: 14,
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap' as const,
                    }}>
                      {msg.content}
                    </div>
                  </div>
                )
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            {!done && (
              <div style={{ padding: '1rem 2rem', borderTop: '1px solid #f0f0f0', background: '#fff' }}>
                <div style={{ border: '1.5px solid #e5e5e5', borderRadius: 4, overflow: 'hidden', transition: 'border-color 0.2s' }}
                  onFocus={() => {}} >
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={questions[currentQuestion]?.placeholder}
                    rows={3}
                    style={{ width: '100%', border: 'none', outline: 'none', padding: '0.75rem 1rem', fontSize: 14, fontFamily: 'inherit', resize: 'none', color: '#1a1a1a', lineHeight: 1.6, boxSizing: 'border-box' as const }}
                  />
                  <div style={{ padding: '0.5rem 0.75rem', background: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f0' }}>
                    <span style={{ fontSize: 11, color: '#bbb' }}>Press Enter to send · Shift+Enter for new line</span>
                    <button
                      onClick={handleSubmit}
                      disabled={!input.trim()}
                      style={{ background: input.trim() ? '#000' : '#e5e5e5', color: input.trim() ? '#fff' : '#999', border: 'none', padding: '0.4rem 1rem', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, cursor: input.trim() ? 'pointer' : 'default', borderRadius: 2, transition: 'all 0.2s' }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom nav */}
            <div style={{ padding: '0.75rem 2rem', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a href="/" style={{ fontSize: 12, color: '#666', textDecoration: 'none', letterSpacing: '0.05em', fontWeight: 500 }}>← BACK</a>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {['Topic', 'Goals', 'Site Info', 'Pages', 'Colors', 'Fonts'].map((tab, i) => (
                  <span key={tab} style={{ fontSize: 11, color: i === 0 ? '#000' : '#ccc', fontWeight: i === 0 ? 600 : 400, letterSpacing: '0.05em', borderBottom: i === 0 ? '2px solid #000' : 'none', paddingBottom: '0.25rem' }}>{tab}</span>
                ))}
              </div>
              <span style={{ fontSize: 12, color: '#ccc', letterSpacing: '0.05em', fontWeight: 500 }}>NEXT →</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

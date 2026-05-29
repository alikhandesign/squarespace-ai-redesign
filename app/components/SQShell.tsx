'use client'
// Squarespace Blueprint AI shell — header + footer + side image

interface SQShellProps {
  children: React.ReactNode
  showBack?: boolean
  showNext?: boolean
  nextDisabled?: boolean
  onNext?: () => void
  onBack?: () => void
  step?: number
  totalSteps?: number
  sideImage?: string
  progressStep?: number
}

const SQ_LOGO = () => (
  <svg width="207" height="22" viewBox="0 0 207 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="17" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="16" fontWeight="500" fill="#0e0e0e" letterSpacing="0.5">SQUARESPACE</text>
  </svg>
)

export default function SQShell({ children, showBack, showNext = true, nextDisabled, onNext, onBack, sideImage, progressStep }: SQShellProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#fff', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 40px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 0C6.268 0 0 6.268 0 14s6.268 14 14 14 14-6.268 14-14S21.732 0 14 0zm-2.8 19.6L6.4 14.7l1.96-1.96 2.84 2.84 8.44-8.44 1.96 1.96-10.4 10.5z" fill="#0e0e0e"/>
          </svg>
          <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '0.5px', color: '#0e0e0e' }}>SQUARESPACE</span>
        </div>
        <span style={{ fontSize: 14, letterSpacing: '3.5px', textTransform: 'uppercase', color: '#0e0e0e', fontWeight: 500 }}>I'M JUST BROWSING</span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Progress bar */}
          {progressStep !== undefined && (
            <div style={{ padding: '0 40px', marginBottom: 0 }}>
              <div style={{ height: 2, background: '#b7b7b7', borderRadius: 5, width: 88, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: 2, background: '#0e0e0e', borderRadius: 5, width: `${(progressStep / 3) * 88}px`, transition: 'width 0.3s' }} />
              </div>
            </div>
          )}
          {/* Content */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {children}
          </div>
          {/* Footer */}
          <div style={{ background: '#fff', boxShadow: '0px -4px 32px 0px rgba(0,0,0,0.12)', height: 94, display: 'flex', alignItems: 'center', justifyContent: showBack ? 'space-between' : 'flex-end', padding: '0 20px', flexShrink: 0 }}>
            {showBack && (
              <button onClick={onBack} className="sq-btn-secondary">BACK</button>
            )}
            {showNext && (
              <button onClick={onNext} disabled={nextDisabled} className="sq-btn-primary" style={{ opacity: nextDisabled ? 0.4 : 1 }}>NEXT</button>
            )}
          </div>
        </div>
        {/* Side panel */}
        {sideImage && (
          <div style={{ width: '24%', flexShrink: 0, background: '#e8e4de', overflow: 'hidden' }}>
            <img src={sideImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
      </div>
    </div>
  )
}

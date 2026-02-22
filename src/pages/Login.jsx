import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login({ onLogin }) {
  const [step, setStep] = useState('login') // login | forgot | otp
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', ''])

  const handleSubmitLogin = (e) => {
    e.preventDefault()
    onLogin()
  }

  const handleForgot = (e) => {
    e.preventDefault()
    setStep('forgot')
  }

  const handleRequestOTP = (e) => {
    e.preventDefault()
    setStep('otp')
  }

  const handleOTPChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1)
    const next = [...otp]
    next[index] = value
    setOtp(next)
    if (value && index < 4) document.getElementById(`otp-${index + 1}`)?.focus()
  }

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus()
    }
  }

  const handleSubmitOTP = (e) => {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {step === 'login' && (
          <>
            <h1>Login Admin</h1>
            <form onSubmit={handleSubmitLogin}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="btn-login">Masuk</button>
            </form>
            <button type="button" className="link-forgot" onClick={handleForgot}>
              Lupa password anda?
            </button>
          </>
        )}

        {step === 'forgot' && (
          <>
            <h1>Lupa Password</h1>
            <form onSubmit={handleRequestOTP}>
              <input
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn-login">Minta Kode OTP</button>
            </form>
            <button type="button" className="link-forgot" onClick={() => setStep('login')}>
              Kembali ke Login
            </button>
          </>
        )}

        {step === 'otp' && (
          <>
            <h1>Masukkan Kode OTP</h1>
            <form onSubmit={handleSubmitOTP}>
              <div className="otp-inputs">
                {otp.map((v, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={v}
                    onChange={(e) => handleOTPChange(i, e.target.value)}
                    onKeyDown={(e) => handleOTPKeyDown(i, e)}
                  />
                ))}
              </div>
              <button type="submit" className="btn-login">Lanjut</button>
            </form>
            <button type="button" className="link-forgot" onClick={() => setStep('forgot')}>
              Ganti email
            </button>
          </>
        )}

        <p className="footer-text">© 2025 E-Prokesba - Panel Admin</p>
      </div>
    </div>
  )
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('hire-me@anshumat.org');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('HireMe@2025!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (email) {
      setOtpSent(true);
      setError('');
    } else {
      setError('Please enter a valid mobile number or email');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: otp }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/onboarding');
      } else {
        setError(data.message || 'OTP Verification failed');
      }
    } catch (err) {
      setError('Cannot connect to backend server. Make sure it is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="card animate-fade-in" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="h2" style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Secure Login</h1>
        <p className="p-text" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          Sign in via OTP to access your application.
        </p>

        {error && (
          <div style={{ padding: '0.75rem', backgroundColor: '#FEF2F2', border: '1px solid var(--error)', color: 'var(--error)', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleSendOTP}>
            <div className="form-group">
              <label className="form-label">Phone or Email</label>
              <input 
                type="text" 
                className="form-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label">One Time Password (OTP)</label>
              <input 
                type="password" 
                className="form-input" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>
            <p className="p-text" style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--primary-color)' }} onClick={() => setOtpSent(false)}>
              Change Mobile/Email
            </p>
          </form>
        )}

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)' }}>
          <p className="p-text" style={{ textAlign: 'center', fontSize: '0.85rem', margin: 0 }}>
            Demo Email: <strong>hire-me@anshumat.org</strong><br/>
            Demo OTP: <strong>HireMe@2025!</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

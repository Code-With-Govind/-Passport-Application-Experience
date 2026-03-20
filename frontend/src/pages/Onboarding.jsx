import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, FileText, CalendarCheck, Clock } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem('user'))?.name || 'Applicant';

  const startNewApplication = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const res = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      });
      const data = await res.json();
      if (data.success) {
        navigate(`/application/${data.application.id}`);
      }
    } catch (error) {
      alert("Error starting application");
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="h1">Welcome {userName}!</h1>
        <p className="p-text" style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          Your new, simplified passport application journey starts here.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 className="h2" style={{ marginBottom: '1.5rem' }}>How it works</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ background: '#EFF6FF', padding: '1rem', borderRadius: '50%', color: 'var(--primary-color)', marginBottom: '1rem' }}>
              <FileText size={32} />
            </div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>1. Smart Form</h3>
            <p className="p-text" style={{ fontSize: '0.9rem' }}>Fill your details step-by-step. Everything auto-saves.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ background: '#EFF6FF', padding: '1rem', borderRadius: '50%', color: 'var(--primary-color)', marginBottom: '1rem' }}>
              <ShieldCheck size={32} />
            </div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>2. Easy Documents</h3>
            <p className="p-text" style={{ fontSize: '0.9rem' }}>Upload clearly guided essential documents.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ background: '#EFF6FF', padding: '1rem', borderRadius: '50%', color: 'var(--primary-color)', marginBottom: '1rem' }}>
              <CalendarCheck size={32} />
            </div>
            <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>3. Book Slot</h3>
            <p className="p-text" style={{ fontSize: '0.9rem' }}>Pick a convenient slot for physical verification.</p>
          </div>

        </div>
      </div>

      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Clock size={24} color="var(--text-muted)" />
          <div>
            <h3 style={{ fontWeight: '600' }}>Time required</h3>
            <p className="p-text" style={{ fontSize: '0.9rem' }}>Approx. 5-10 minutes to complete.</p>
          </div>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={startNewApplication}
          style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
        >
          Start New Application
        </button>
      </div>

    </div>
  );
};

export default Onboarding;

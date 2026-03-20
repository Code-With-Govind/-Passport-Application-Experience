import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Share2, Download, Home } from 'lucide-react';

const Confirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '3rem', textAlign: 'center' }}>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <CheckCircle size={64} color="var(--success)" />
      </div>

      <h1 className="h1" style={{ marginBottom: '1rem' }}>Application Submitted!</h1>
      <p className="p-text" style={{ fontSize: '1.1rem', marginBottom: '2.5rem' }}>
        Your passport application has been successfully submitted and your appointment is confirmed.
      </p>

      <div className="card" style={{ marginBottom: '2.5rem', textAlign: 'left', backgroundColor: '#F8FAFC', border: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
          <span className="p-text">Application ID</span>
          <span style={{ fontWeight: '600' }}>{id.substring(0,8).toUpperCase()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
          <span className="p-text">Status</span>
          <span style={{ color: 'var(--success)', fontWeight: '600' }}>Submitted</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className="p-text">Email Address</span>
          <span style={{ fontWeight: '600' }}>{JSON.parse(localStorage.getItem('user'))?.email}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <button className="btn btn-outline" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
          <Download size={18} /> Download Receipt
        </button>
        <button className="btn btn-outline" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
          <Share2 size={18} /> Share Application
        </button>
      </div>

      <button className="btn btn-primary" onClick={() => navigate('/dashboard')} style={{ width: '100%', padding: '1rem' }}>
        <Home size={18} /> Return to Dashboard
      </button>

    </div>
  );
};

export default Confirmation;

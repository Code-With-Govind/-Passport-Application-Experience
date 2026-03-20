import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, ArrowRight, Clock, CheckCircle2, ChevronRight, Search } from 'lucide-react';

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${user.id}`);
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications.reverse());
      }
    } catch (error) {
      console.error('Failed to fetch applications', error);
    } finally {
      setLoading(false);
    }
  };

  const startNewApplication = async () => {
    try {
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
      alert("Error creating application");
    }
  };

  const TrackerStep = ({ title, active, completed, isLast }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative' }}>
      {!isLast && <div style={{ position: 'absolute', top: '15px', left: '50%', width: '100%', height: '3px', background: completed ? 'var(--success)' : 'var(--border-color)', zIndex: 0 }}></div>}
      <div style={{ 
        width: '30px', height: '30px', borderRadius: '50%', background: completed ? 'var(--success)' : (active ? 'var(--primary-color)' : 'var(--surface-color)'),
        border: `2px solid ${completed ? 'var(--success)' : (active ? 'var(--primary-color)' : 'var(--border-color)')}`,
        display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', zIndex: 1, marginBottom: '0.5rem'
      }}>
        {completed ? <CheckCircle2 size={16} /> : (active ? <Search size={14} /> : null)}
      </div>
      <span style={{ fontSize: '0.75rem', fontWeight: active ? '600' : '400', color: (active||completed) ? 'var(--text-main)' : 'var(--text-muted)', textAlign: 'center' }}>
        {title}
      </span>
    </div>
  );

  if (loading) return <div style={{ textAlign: 'center', marginTop: '4rem' }} aria-live="polite">Loading dashboard...</div>;

  return (
    <div className="animate-fade-in" style={{ paddingTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h1 className="h1">Dashboard</h1>
          <p className="p-text">Manage your passport applications</p>
        </div>
        
        {applications.length > 0 && (
          <button className="btn btn-primary" onClick={startNewApplication} aria-label="Start New Application">
            <Plus size={18} /> New Application
          </button>
        )}
      </div>

      {applications.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ background: '#EFF6FF', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 1.5rem auto' }}>
            <FileText size={40} color="var(--primary-color)" />
          </div>
          <h2 className="h2" style={{ marginBottom: '1rem' }}>No Active Applications</h2>
          <p className="p-text" style={{ maxWidth: '400px', margin: '0 auto 2rem auto' }}>
            It looks like you haven't started your passport journey yet. Click below to begin!
          </p>
          <button className="btn btn-primary" onClick={startNewApplication}>
            Start First Application <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {applications.map(app => (
            <div key={app.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', border: app.status === 'Submitted' ? '1px solid var(--success)' : '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>APP ID: {app.id.substring(0,8)}</span>
                <span style={{ 
                  fontSize: '0.8rem', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-full)', 
                  backgroundColor: app.status === 'Submitted' ? '#F0FDF4' : '#FFFBEB',
                  color: app.status === 'Submitted' ? '#166534' : '#B45309', fontWeight: '600'
                }}>
                  {app.status}
                </span>
              </div>
              
              {app.status === 'Submitted' ? (
                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '1rem' }}>Live Status Tracking</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TrackerStep title="Submitted" completed={true} />
                    <TrackerStep title="Verification" active={true} completed={false} />
                    <TrackerStep title="Police Check" active={false} completed={false} />
                    <TrackerStep title="Dispatched" active={false} completed={false} isLast={true} />
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <Clock size={16} /> Last saved: {new Date(app.lastSaved).toLocaleString()}
                </div>
              )}

              <div style={{ marginTop: 'auto' }}>
                <button 
                  className={app.status === 'Submitted' ? "btn btn-outline" : "btn btn-primary"} 
                  style={{ width: '100%', display:'flex', justifyContent:'space-between', alignItems:'center' }}
                  onClick={() => navigate(app.status === 'Submitted' ? `/application/${app.id}/confirmation` : `/application/${app.id}`)}
                >
                  {app.status === 'Submitted' ? 'View Details & Receipt' : 'Continue Draft'} <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Dashboard;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';

const AppointmentBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  const dates = [
    { label: 'Tomorrow', value: '2026-03-21' },
    { label: 'Friday', value: '2026-03-22' },
    { label: 'Next Monday', value: '2026-03-25' }
  ];

  const times = ['10:00 AM', '11:30 AM', '02:00 PM', '03:45 PM'];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await fetch(`http://localhost:5000/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: 'Submitted',
          data: { appointmentDate: selectedDate, appointmentTime: selectedTime }
        })
      });
      navigate(`/application/${id}/confirmation`);
    } catch(e) {
      alert("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '1rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h2 className="h2" style={{marginBottom: '0.25rem'}}>Appointment Booking</h2>
          <p style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Step 5 of 5 completed</p>
        </div>
      </div>

       <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: 'var(--radius-full)', marginBottom: '2rem' }}>
           <div style={{ width: `100%`, height: '100%', background: 'linear-gradient(90deg, var(--primary-color), var(--success))', borderRadius: 'var(--radius-full)' }}></div>
        </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '2rem' }}>
        
        {/* Left Column: Calendar UI */}
        <div className="card">
          <h3 className="h2" style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} color="var(--primary-color)"/> Calendar View
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {dates.map(date => (
              <div 
                key={date.value}
                onClick={() => setSelectedDate(date.value)}
                style={{
                  padding: '1rem',
                  border: `2px solid ${selectedDate === date.value ? 'var(--primary-color)' : 'transparent'}`,
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  backgroundColor: selectedDate === date.value ? '#EFF6FF' : 'var(--surface-color)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontWeight: '600' }}>{date.label}</div>
                <div className="p-text" style={{ fontSize: '0.85rem' }}>{date.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Time/Location UI */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="card">
            <h3 className="h2" style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={20} color="var(--primary-color)"/> Time Slot Selection
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {times.map(time => (
                <div 
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  style={{
                    padding: '0.75rem',
                    textAlign: 'center',
                    border: `2px solid ${selectedTime === time ? 'var(--primary-color)' : 'transparent'}`,
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    backgroundColor: selectedTime === time ? '#EFF6FF' : 'var(--surface-color)',
                    fontWeight: '600',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.2s'
                  }}
                >
                  {time}
                </div>
              ))}
            </div>
            {!selectedDate && <p className="p-text" style={{fontSize: '0.85rem', marginTop: '1rem', color: 'var(--warning)'}}>Please select a date first.</p>}
          </div>

          <div className="card" style={{ backgroundColor: '#F8FAFC', padding: '1.5rem', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <MapPin size={18} color="var(--text-muted)" /> Passport Seva Kendra
            </h3>
            <p className="p-text" style={{ fontSize: '0.9rem' }}>Regional Passport Office, IT Park Branch</p>
          </div>

        </div>

      </div>

      <button 
        className="btn btn-primary" 
        disabled={!selectedDate || !selectedTime || loading}
        onClick={handleSubmit}
        style={{ width: '100%', padding: '1rem', marginTop: '2.5rem', fontSize: '1.1rem' }}
      >
        {loading ? 'Submitting Application...' : 'Confirm & Submit Application'}
      </button>

    </div>
  );
};
export default AppointmentBooking;

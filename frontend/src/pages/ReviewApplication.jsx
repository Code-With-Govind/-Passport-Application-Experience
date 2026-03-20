import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const ReviewApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/applications/${JSON.parse(localStorage.getItem('user')).id}`)
      .then(res => res.json())
      .then(data => {
        const app = data.applications.find(a => a.id === id);
        if (app) setFormData(app.data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{textAlign:'center', marginTop:'4rem'}}>Loading draft...</div>;

  return (
    <div className="animate-fade-in" style={{ paddingTop: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h2 className="h2" style={{marginBottom: '0.25rem'}}>Review Application</h2>
          <p style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Step 4 of 5 completed</p>
        </div>
      </div>

       <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: 'var(--radius-full)', marginBottom: '2rem' }}>
           <div style={{ width: `80%`, height: '100%', background: 'linear-gradient(90deg, var(--primary-color), var(--accent-color))', borderRadius: 'var(--radius-full)' }}></div>
        </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 className="h2" style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Personal Info</h3>
        <p className="p-text" style={{marginBottom:'0.5rem'}}><strong>Full Name:</strong> {formData.fullName}</p>
        <p className="p-text" style={{marginBottom:'0.5rem'}}><strong>DOB:</strong> {formData.dob}</p>
        <p className="p-text"><strong>Gender:</strong> {formData.gender}</p>
      </div>

      <div className="card">
        <h3 className="h2" style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Address</h3>
        <p className="p-text" style={{marginBottom:'0.5rem'}}><strong>Address:</strong> {formData.address}</p>
        <p className="p-text" style={{marginBottom:'0.5rem'}}><strong>State / PIN:</strong> {formData.state} - {formData.pincode}</p>
        <p className="p-text"><strong>Mobile:</strong> {formData.mobile}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
        <button className="btn btn-secondary" onClick={() => navigate(`/application/${id}/docs`)}>
          Back to Documents
        </button>
        <button className="btn btn-primary" onClick={() => navigate(`/application/${id}/book`)}>
          Proceed to Booking <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
export default ReviewApplication;

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';

const ApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [saveStatus, setSaveStatus] = useState('saved');
  const [lastSaved, setLastSaved] = useState('');
  const [loading, setLoading] = useState(true);
  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/applications/${JSON.parse(localStorage.getItem('user')).id}`)
      .then(res => res.json())
      .then(data => {
        const app = data.applications.find(a => a.id === id);
        if (app) {
          setFormData(app.data);
          setStep(app.data.step || 1);
          setLastSaved(new Date(app.lastSaved).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
        }
        setLoading(false);
      });
  }, [id]);

  const triggerAutoSave = (newData, currentStep) => {
    setSaveStatus('saving');
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    
    saveTimeoutRef.current = setTimeout(() => {
      fetch(`http://localhost:5000/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { ...newData, step: currentStep } })
      })
      .then(res => res.json())
      .then(resData => {
        if(resData.success) {
          setSaveStatus('saved');
          setLastSaved(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
        }
      })
      .catch(() => setSaveStatus('error'));
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    
    if (name === 'pincode' && value.length === 6) {
      newData.state = value.startsWith('4') ? 'Maharashtra' : value.startsWith('1') ? 'Delhi' : 'Karnataka';
    }
    
    setFormData(newData);
    if(errors[name]) setErrors({...errors, [name]: null});
    triggerAutoSave(newData, step);
  };

  const validateStep = () => {
    let newErrors = {};
    if (step === 1) {
      if (!formData.fullName) newErrors.fullName = 'Full Name is strictly required';
      if (!formData.dob) newErrors.dob = 'Please enter valid DOB';
      if (!formData.gender) newErrors.gender = 'Please select a gender';
    }
    if (step === 2) {
      if (!formData.address) newErrors.address = 'Complete Address is required';
      if (!formData.pincode || formData.pincode.length < 6) newErrors.pincode = 'Valid 6-digit PIN is required';
      if (!formData.mobile || formData.mobile.length < 10) newErrors.mobile = 'Valid 10-digit mobile is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      const next = step + 1;
      setStep(next);
      triggerAutoSave(formData, next);
    }
  };

  const prevStep = () => {
    const prev = step - 1;
    setStep(prev);
    triggerAutoSave(formData, prev);
  };

  const handleSubmit = () => {
    if (validateStep()) navigate(`/application/${id}/docs`);
  };

  if (loading) return <div style={{textAlign:'center', marginTop:'4rem'}}>Loading draft...</div>;

  return (
    <div className="animate-fade-in" style={{ paddingTop: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h2 className="h2" style={{marginBottom: '0.25rem'}}>Passport Application</h2>
          <p style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Step {step} of 5 completed</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {saveStatus === 'saving' ? (
             <><div style={{width:'8px', height:'8px', borderRadius:'50%', background:'var(--warning)', animation:'fadeIn 1s infinite alternate'}}></div> Saving...</>
          ) : saveStatus === 'saved' ? (
             <><CheckCircle2 size={16} color="var(--success)"/> Saved at {lastSaved}</>
          ) : (
             <span style={{color: 'var(--error)'}}>Save error</span>
          )}
        </div>
      </div>

      <div className="card">
        {/* Simplified global progress bar to match user request explicitly */}
        <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: 'var(--radius-full)', marginBottom: '2rem' }}>
           <div style={{ width: `${(step / 5) * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary-color), var(--accent-color))', borderRadius: 'var(--radius-full)', transition: 'width 0.4s ease' }}></div>
        </div>

        {Object.keys(errors).length > 0 && (
          <div style={{ padding: '0.75rem', background: '#FEF2F2', border: '1px solid var(--error)', color: 'var(--error)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize:'0.9rem' }}>
            <AlertCircle size={18} /> Error: Please fix the highlighted fields below.
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h3 className="h2" style={{marginBottom: '1.5rem', fontSize: '1.25rem'}}>Personal Info (1/5)</h3>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" name="fullName" className={`form-input ${errors.fullName ? 'error' : ''}`} value={formData.fullName || ''} onChange={handleChange} placeholder="As per official documents" />
              {errors.fullName && <span className="error-text">❌ {errors.fullName}</span>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input type="date" name="dob" className={`form-input ${errors.dob ? 'error' : ''}`} value={formData.dob || ''} onChange={handleChange} />
                {errors.dob && <span className="error-text">❌ {errors.dob}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Gender</label>
                <select name="gender" className={`form-input ${errors.gender ? 'error' : ''}`} value={formData.gender || ''} onChange={handleChange}>
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && <span className="error-text">❌ {errors.gender}</span>}
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h3 className="h2" style={{marginBottom: '1.5rem', fontSize: '1.25rem'}}>Address Check (2/5)</h3>
            <div className="form-group">
              <label className="form-label">Complete Residential Address</label>
              <textarea name="address" className={`form-input ${errors.address ? 'error' : ''}`} rows="3" value={formData.address || ''} onChange={handleChange}></textarea>
              {errors.address && <span className="error-text">❌ {errors.address}</span>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="pincode">PIN Code (Auto-fills state)</label>
                <input type="text" name="pincode" maxLength="6" className={`form-input ${errors.pincode ? 'error' : ''}`} value={formData.pincode || ''} onChange={handleChange} />
                {errors.pincode && <span className="error-text">❌ {errors.pincode}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">State</label>
                <input type="text" name="state" className="form-input" value={formData.state || ''} onChange={handleChange} readOnly style={{background: '#f1f5f9'}} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <input type="tel" name="mobile" maxLength="10" className={`form-input ${errors.mobile ? 'error' : ''}`} value={formData.mobile || ''} onChange={handleChange} />
              {errors.mobile && <span className="error-text">❌ {errors.mobile}</span>}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', paddingTop: '1.5rem' }}>
          <button className="btn btn-outline" onClick={prevStep} disabled={step === 1}>
            <ChevronLeft size={18} /> Previous
          </button>
          
          {step < 2 ? (
            <button className="btn btn-primary" onClick={nextStep}>
              Save & Next <ChevronRight size={18} />
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSubmit}>
              Proceed to Documents <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ApplicationForm;

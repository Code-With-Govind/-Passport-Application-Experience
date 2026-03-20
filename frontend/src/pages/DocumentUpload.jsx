import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle2, ChevronRight, File, XCircle } from 'lucide-react';

const DocumentUpload = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uploads, setUploads] = useState({ identity: false, photo: false });
  const [dragActive, setDragActive] = useState(false);

  const handleUploadClick = (type) => {
    setTimeout(() => {
      setUploads(prev => ({ ...prev, [type]: true }));
    }, 800);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h2 className="h2" style={{marginBottom: '0.25rem'}}>Document Upload</h2>
          <p style={{ color: 'var(--primary-color)', fontWeight: '600' }}>Step 3 of 5 completed</p>
        </div>
      </div>

       <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: 'var(--radius-full)', marginBottom: '2rem' }}>
           <div style={{ width: `60%`, height: '100%', background: 'linear-gradient(90deg, var(--primary-color), var(--accent-color))', borderRadius: 'var(--radius-full)' }}></div>
        </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 2fr) minmax(200px, 1fr)', gap: '2rem' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Document 1 */}
          <div className="card" style={{ border: uploads.identity ? '1px solid var(--success)' : '' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Proof of Identity / Aadhaar</h3>
                <p className="p-text" style={{ fontSize: '0.9rem' }}>Aadhaar Card, PAN Card, or Voter ID.</p>
              </div>
            </div>
            {!uploads.identity ? (
              <div 
                style={{ padding: '2rem', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', textAlign: 'center', cursor: 'pointer' }}
                onClick={() => handleUploadClick('identity')}
              >
                <UploadCloud size={32} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
                <p style={{ fontWeight: '500' }}>Click to upload Aadhaar</p>
              </div>
            ) : (
               <div style={{ padding: '1rem', background: '#F0FDF4', borderRadius: 'var(--radius-md)', color: '#166534', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <CheckCircle2 /> Aadhaar_Uploaded.pdf
               </div>
            )}
          </div>

          {/* Document 2 */}
          <div className="card" style={{ border: uploads.photo ? '1px solid var(--success)' : '' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Passport Photo</h3>
                <p className="p-text" style={{ fontSize: '0.9rem' }}>Recent colored photograph.</p>
              </div>
            </div>
            {!uploads.photo ? (
              <div 
                style={{ padding: '2rem', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', textAlign: 'center', cursor: 'pointer' }}
                onClick={() => handleUploadClick('photo')}
              >
                <UploadCloud size={32} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
                <p style={{ fontWeight: '500' }}>Click to upload Photo</p>
              </div>
            ) : (
               <div style={{ padding: '1rem', background: '#F0FDF4', borderRadius: 'var(--radius-md)', color: '#166534', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <CheckCircle2 /> Photo_Uploaded.jpg
               </div>
            )}
          </div>
        </div>

        {/* Clear Checklist Panel */}
        <div>
          <div className="card" style={{ position: 'sticky', top: '100px' }}>
            <h3 className="h2" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Checklist Clarity</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '500' }}>
                Aadhaar {uploads.identity ? <CheckCircle2 color="var(--success)" /> : <span style={{display:'flex', alignItems:'center', color:'var(--error)'}}>❌</span>}
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '500' }}>
                Photo {uploads.photo ? <CheckCircle2 color="var(--success)" /> : <span style={{display:'flex', alignItems:'center', color:'var(--error)'}}>❌</span>}
              </li>
            </ul>
          </div>
        </div>

      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
        <button className="btn btn-secondary" onClick={() => navigate(`/application/${id}`)}>
          Back to Form
        </button>
        <button 
          className="btn btn-primary" 
          disabled={!uploads.identity || !uploads.photo}
          onClick={() => navigate(`/application/${id}/review`)}
        >
          Review Application <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
export default DocumentUpload;

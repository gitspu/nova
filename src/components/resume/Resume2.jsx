
import 'bootstrap/dist/css/bootstrap.min.css';

const Resume2 = () => {
  return (
    <div className="container my-4" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '900px' }}>

      {/* --- HEADER & PHOTO --- */}
      <header className="p-4 rounded-top shadow-sm text-white mb-4" 
        style={{ background: 'linear-gradient(135deg, #0a17c9ff, #e6e6e6ff)' }}>
        <div className="row align-items-center">
          <div className="col-md-2 text-center">
            <div 
              className="rounded-circle border border-white d-flex align-items-center justify-content-center mx-auto" 
              style={{ width: '120px', height: '120px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
            >
              <img 
                src="https://via.placeholder.com/150" 
                alt="Profile" 
                className="w-100 h-100" 
                style={{ objectFit: 'cover' }} 
              />
            </div>
          </div>
          <div className="col-md-10 text-center text-md-start mt-3 mt-md-0">
            <h1 className="fw-bold display-5 m-0">Emily Hughes</h1>
            <p className="fs-4 mb-0 opacity-75">Social Media Manager</p>
          </div>
        </div>
      </header>

      {/* --- ABOUT ME --- */}
      <section className="bg-white p-4 shadow-sm mb-4 border-start border-4 border-primary">
        <h4 className="fw-bold text-secondary mb-2">About Me</h4>
        <p className="text-muted" style={{ fontSize: '0.95rem' }}>
          Dynamic Social Media Manager with 5+ years of experience in content creation and strategy for diverse brands. 
          Skilled in analytics to drive engagement and business goals. Passionate about storytelling and community building.
        </p>
      </section>

      {/* --- 3 COLUMN GRID: CONTACT, SKILLS, LANGUAGES --- */}
      <div className="row g-3 mb-4">
        {/* Contact */}
        <div className="col-md-4">
          <div className="card p-3 h-100 shadow-sm">
            <h5 className="text-primary fw-bold">Contact</h5>
            <ul className="list-unstyled text-muted small mb-0">
              <li className="mb-1"><strong>Phone:</strong> +1 (222) 345-6788</li>
              <li className="mb-1"><strong>Email:</strong> emily.hughes@email.com</li>
              <li><strong>Address:</strong> New York, USA</li>
            </ul>
          </div>
        </div>

        {/* Skills */}
        <div className="col-md-4">
          <div className="card p-3 h-100 shadow-sm">
            <h5 className="text-primary fw-bold">Skills</h5>
            <ul className="list-unstyled text-muted small mb-0">
              <li>• Social Media Strategy</li>
              <li>• Content Creation</li>
              <li>• Analytics & SEO</li>
              <li>• Community Management</li>
              <li>• Brand Development</li>
            </ul>
          </div>
        </div>

        {/* Languages */}
        <div className="col-md-4">
          <div className="card p-3 h-100 shadow-sm">
            <h5 className="text-primary fw-bold">Languages</h5>
            <ul className="list-unstyled text-muted small mb-0">
              <li>• English — Native</li>
              <li>• Spanish — Professional</li>
              <li>• French — Conversational</li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- EXPERIENCE --- */}
      <section className="mb-4">
        <h4 className="fw-bold text-secondary mb-3">Experience</h4>

        {/* Job 1 */}
        <div className="position-relative ps-4 mb-4 border-start border-3 border-primary">
          <h5 className="fw-bold mb-1">Social Media Manager</h5>
          <span className="text-muted small">2020 - Present</span>
          <p className="text-primary small mb-1">Creative Agency, Los Angeles</p>
          <ul className="text-muted small mb-0">
            <li>Boosted brand visibility by 40% through targeted campaigns.</li>
            <li>Optimized content based on weekly analytics reports.</li>
            <li>Collaborated on multimedia production with design teams.</li>
          </ul>
        </div>

        {/* Job 2 */}
        <div className="position-relative ps-4 mb-4 border-start border-3 border-primary">
          <h5 className="fw-bold mb-1">Social Media Coordinator</h5>
          <span className="text-muted small">2017 - 2020</span>
          <p className="text-primary small mb-1">TrendSetters Inc., New York</p>
          <ul className="text-muted small mb-0">
            <li>Increased followers by 30% in the first year.</li>
            <li>Created engaging daily content for Instagram and Facebook.</li>
            <li>Handled audience communication and inquiries.</li>
          </ul>
        </div>
      </section>

      {/* --- EDUCATION --- */}
      <section className="mb-4">
        <h4 className="fw-bold text-secondary mb-3">Education</h4>

        <div className="position-relative ps-4 mb-3 border-start border-3 border-primary">
          <h6 className="fw-bold mb-0">Bachelor of Arts in Communications</h6>
          <p className="text-muted small mb-0">University of California, Los Angeles (2017)</p>
        </div>

        <div className="position-relative ps-4 border-start border-3 border-primary">
          <h6 className="fw-bold mb-0">Diploma in Digital Marketing</h6>
          <p className="text-muted small mb-0">New York University (2015)</p>
        </div>
      </section>

    </div>
  );
};

export default Resume2;

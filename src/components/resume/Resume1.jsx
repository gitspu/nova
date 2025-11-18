import "bootstrap/dist/css/bootstrap.min.css";
import Resume02 from "./Resume2";

export default function Resume1() {
  return (
    <div className="container">
      <div className="row g-0 min-h-100">
        {/* Left Sidebar */}
        <div
          className="col-md-4"
          style={{ backgroundColor: "#1a1a1a"}}
        >
          <div className="p-4">
            {/* Profile Image */}
            <div className="text-center mb-5 mt-4">
              <div
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "8px solid white",
                  // image
                }}
              >
                <img
                  src=""
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Contact Section */}
            <div className="mb-5">
              <div
                style={{
                  backgroundColor: "#84260c",
                  padding: "15px",
                  marginBottom: "20px",
                  fontWeight: "bold",
                  fontSize: "28px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                CONTACT
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-start mb-2">
                  <span style={{ marginRight: "10px", fontSize: "20px" }}>
                    📞
                  </span>
                  <div>
                    <div className="fw-bold mb-1"style={{color:"white"}}>PHONE</div>
                    <div style={{color:"white"}}>+1 (222) 345-6789</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-start mb-2">
                  <span style={{ marginRight: "10px", fontSize: "20px" }}>
                    ✉️
                  </span>
                  <div>
                    <div className="fw-bold mb-1"style={{color:"white"}}>EMAIL</div>
                    <div style={{color:"white"}}>emily.hughes@email.com</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-start mb-2">
                  <span style={{ marginRight: "10px", fontSize: "20px" }}>
                    📍
                  </span>
                  <div>
                    <div className="fw-bold mb-1"style={{color:"white"}}>ADDRESS</div>
                    <div style={{color:"white"}}>New York, USA</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Skills Section */}
            <div className="mb-5">
              <div
                style={{
                  backgroundColor: "#84260c",
                  padding: "15px",
                  marginBottom: "20px",
                  fontWeight: "bold",
                  fontSize: "28px",
                  textAlign: "center",
                  color: "white", 
                }}
              >
                SKILLS
              </div>

              <ul className="list-unstyled" style={{ fontSize: "15px" }}>
                <li className="mb-2 d-flex align-items-center" style={{color:"white"}}>
                  <span style={{ color: "#D47B5F", marginRight: "10px" }}>
                    ●
                  </span>
                  Social Media Strategy
                </li>
                <li className="mb-2 d-flex align-items-center "style={{color:"white"}}>
                  <span style={{ color: "#D47B5F", marginRight: "10px" }}>
                    ●
                  </span>
                  Content Creation
                </li>
                <li className="mb-2 d-flex align-items-center"style={{color:"white"}}>
                  <span style={{ color: "#D47B5F", marginRight: "10px" }}>
                    ●
                  </span>
                  Analytics and Reporting
                </li>
                <li className="mb-2 d-flex align-items-center"style={{color:"white"}}>
                  <span style={{ color: "#D47B5F", marginRight: "10px" }}>
                    ●
                  </span>
                  Community Management
                </li>
                <li className="mb-2 d-flex align-items-center"style={{color:"white"}}>
                  <span style={{ color: "#D47B5F", marginRight: "10px" }}>
                    ●
                  </span>
                  Brand Development
                </li>
                <li className="mb-2 d-flex align-items-center"style={{color:"white"}}>
                  <span style={{ color: "#D47B5F", marginRight: "10px" }}>
                    ●
                  </span>
                  Multimedia Production
                </li>
              </ul>
            </div>

            {/* Languages Section */}
            <div>
              <div
                style={{
                  backgroundColor: "#84260c ",
                  padding: "15px",
                  marginBottom: "20px",
                  fontWeight: "bold",
                  fontSize: "28px",
                  textAlign: "center",
                  color: "white",
                }}
              >
                LANGUAGES
              </div>

              <ul className="list-unstyled" style={{ fontSize: "15px" }}>
                <li className="mb-2 d-flex align-items-center">
                  <span style={{ color: "#D47B5F", marginRight: "10px" }}>
                    ●
                  </span>
                  <div style={{color:"white"}}>
                    <strong>English:</strong> Native
                  </div>
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <span style={{ color: "#D47B5F", marginRight: "10px" }}>
                    ●
                  </span>
                  <div style={{color:"white"}}>
                    <strong>Spanish:</strong> Professional
                  </div>
                </li>
                <li className="mb-2 d-flex align-items-center">
                  <span style={{ color: "#D47B5F", marginRight: "10px" }}>
                    ●
                  </span>
                  <div style={{color:"white"}}>
                    <strong>French:</strong> Conversational
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="col-md-8" style={{ backgroundColor: "#F5F5F5" }}>
          <div className="p-5">
            {/* Header */}
            <div className="mb-5">
              <h1
                className="display-3 fw-bold mb-0 "
                style={{ color: "#A0442C", textAlign: "center" }}
              >
                EMILY
              </h1>
              <h1
                className="display-3 fw-bold mb-3"
                style={{ textAlign: "center" }}
              >
                HUGHES
              </h1>

              <div
                style={{
                  height: "4px",
                  backgroundColor: "#D47B5F",
                  width: "100%",
                  marginBottom: "20px",
                }}
              ></div>
              <h3 className="fw-bold mb-4">SOCIAL MEDIA MANAGER</h3>
              <p style={{ textAlign: "justify", lineHeight: "1.8" }}>
                Dynamic Social Media Manager with 5+ years of experience in
                content creation and strategy for diverse brands. Skilled in
                analytics to drive engagement and business goals. Passionate
                about storytelling and community building.
              </p>
            </div>

            {/* Experience Section */}
            <div className="mb-5">
              <div
                style={{
                  backgroundColor: "#A0442C",
                  color: "white",
                  padding: "15px 30px",
                  marginBottom: "30px",
                  fontWeight: "bold",
                  fontSize: "32px",
                  textAlign: "center",
                  
                }}
              >
                EXPERIENCE
              </div>

              {/* Experience Item 1 */}
              <div
                className="mb-4 position-relative"
                style={{ paddingLeft: "30px" }}
              >
                <div className="d-flex justify-content-between mb-2">
                  <h5 className="fw-bold mb-0">SOCIAL MEDIA MANAGER</h5>
                  <span className="text-muted">2020 - Present</span>
                </div>
                <p className="text-muted fst-italic mb-3">
                  Creative Agency, Los Angeles, USA
                </p>
                <ul style={{ fontSize: "14px" }}>
                  <li className="mb-2">
                    Developed and executed social media campaigns that increased
                    brand visibility by 40%.
                  </li>
                  <li className="mb-2">
                    Analyzed social media metrics to optimize content and
                    engagement strategies.
                  </li>
                  <li className="mb-2">
                    Collaborated with marketing and creative teams to produce
                    engaging multimedia content.
                  </li>
                </ul>
              </div>

              {/* Experience Item 2 */}
              <div
                className="position-relative"
                style={{ paddingLeft: "30px" }}
              >
                <div className="d-flex justify-content-between mb-2">
                  <h5 className="fw-bold mb-0">SOCIAL MEDIA COORDINATOR</h5>
                  <span className="text-muted">2017 - 2020</span>
                </div>
                <p className="text-muted fst-italic mb-3">
                  TrendSetters Inc., New York, USA
                </p>
                <ul style={{ fontSize: "14px" }}>
                  <li className="mb-2">
                    Assisted in the management of social media platforms,
                    increasing followers by 30%.
                  </li>
                  <li className="mb-2">
                    Created and curated content for various social meia
                    channels, ensuring brand consistency.
                  </li>
                  <li className="mb-2">
                    Monitored and responded to audience interactions, fostering
                    a positive online community.
                  </li>
                </ul>
              </div>
            </div>

            {/* Education Section */}
            <div>
              <div
                style={{
                  backgroundColor: "#A0442C",
                  color: "white",
                  padding: "15px 30px",
                  marginBottom: "30px",
                  fontWeight: "bold",
                  fontSize: "32px",
                  textAlign: "center",
                }}
              >
                EDUCATION
              </div>

              {/* Education Item 1 */}
              <div
                className="mb-4 position-relative"
                style={{ paddingLeft: "30px" }}
              >
                <div className="d-flex justify-content-between mb-2">
                  <h5 className="fw-bold mb-0">
                    BACHELOR OF ARTS IN COMMUNICATIONS
                  </h5>
                  <span className="text-muted">2017</span>
                </div>
                <p className="text-muted mb-3">
                  University of California, Los Angeles, USA
                </p>
              </div>

              {/* Education Item 2 */}
              <div
                className="position-relative"
                style={{ paddingLeft: "30px" }}
              >
                <div className="d-flex justify-content-between mb-2">
                  <h5 className="fw-bold mb-0">DIPLOMA IN DIGITAL MARKETING</h5>
                  <span className="text-muted">2015</span>
                </div>
                <p className="text-muted mb-3">
                  New York University, New York, USA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

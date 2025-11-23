// import React, { useState, useEffect } from "react";

// /* =========================================
//    1. CONSTANTS & MOCK DATA
// ========================================= */
// const INITIAL_USER_DATA = {
//   name: "Waranon Soprok",
//   role: "Student • Virtual Influencer",
//   location: "Bangkok, Thailand",
//   email: "waranon.s@email.com",
//   website: "jobsdb.com/waranon",
//   status: "พร้อมเริ่มงาน",
// };

// const INITIAL_SECTIONS = [
//   { id: "personal", title: "ข้อมูลส่วนตัว", icon: "bi-person", desc: "สรุปประสบการณ์และเป้าหมายอาชีพ", items: [] },
//   { 
//     id: "work", 
//     title: "ประวัติการทำงาน", 
//     icon: "bi-briefcase", 
//     desc: "", 
//     items: [{ id: 1, position: "CEO", company: "Nekka Design", startMonth: "เม.ย.", startYear: "2022", endMonth: "มี.ค.", endYear: "2025", isCurrent: false, description: "บริหารจัดการทีมออกแบบ" }] 
//   },
//   { id: "education", title: "ประวัติการศึกษา", icon: "bi-mortarboard", desc: "", items: [] },
//   { id: "certificate", title: "ใบรับรอง", icon: "bi-award", desc: "", items: [] },
//   { 
//     id: "skills", 
//     title: "ทักษะ", 
//     icon: "bi-tools", 
//     desc: "", 
//     items: [{ id: 1, name: "Strategic Planning" }, { id: 2, name: "Team Leadership" }] 
//   },
//   { 
//     id: "languages", 
//     title: "ภาษา", 
//     icon: "bi-translate", 
//     desc: "", 
//     items: [{ id: 1, name: "Thai", level: "Native" }, { id: 2, name: "English", level: "Professional Working" }] 
//   },
// ];

// const THEMES = {
//   navy:   { id: "navy", primary: "#1e3a8a", light: "#e0e7ff", header: "#1e3a8a" },
//   purple: { id: "purple", primary: "#6b21a8", light: "#f3e8ff", header: "#581c87" },
//   green:  { id: "green", primary: "#15803d", light: "#dcfce7", header: "#14532d" },
//   slate:  { id: "slate", primary: "#334155", light: "#f1f5f9", header: "#1e293b" },
// };

// const MONTHS = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
// const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

// /* =========================================
//    2. MAIN APP COMPONENT
// ========================================= */
// const App = () => {
//   // State
//   const [userData, setUserData] = useState(INITIAL_USER_DATA);
//   const [sections, setSections] = useState(INITIAL_SECTIONS);
//   const [avatarImage, setAvatarImage] = useState(null);
//   const [activeThemeId, setActiveThemeId] = useState("navy");
  
//   // Modals
//   const [modals, setModals] = useState({ upload: false, profile: false, section: null });
//   const [showShareToast, setShowShareToast] = useState(false);

//   const currentTheme = THEMES[activeThemeId];

//   // Actions
//   const toggleModal = (key, value) => setModals(prev => ({ ...prev, [key]: value }));
  
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setAvatarImage(reader.result);
//         toggleModal("upload", false);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSaveProfile = (newData) => {
//     setUserData(newData);
//     toggleModal("profile", false);
//   };

//   const handleSaveSection = (updatedSection) => {
//     setSections(prev => prev.map(sec => sec.id === updatedSection.id ? updatedSection : sec));
//     toggleModal("section", null);
//   };

//   return (
//     <div className="d-flex flex-column min-vh-100 bg-light font-thai position-relative">
//       <GlobalStyles currentTheme={currentTheme} />
//       <Assets />

//       <TopBar onShare={() => setShowShareToast(true)} />
      
//       {/* Header & Content */}
//       <div className="w-100 shadow-sm print-h-auto header-decoration" style={{ background: currentTheme.header }}></div>
//       <div className="container pb-5 print-mt-0 content-wrapper">
//         <div className="row justify-content-center">
//           <div className="col-lg-9">
//             <UserProfileCard 
//               userData={userData} 
//               avatarImage={avatarImage} 
//               onEdit={() => toggleModal("profile", true)} 
//               onUpload={() => toggleModal("upload", true)} 
//             />
//             <SectionGrid 
//               sections={sections} 
//               onEdit={(section) => toggleModal("section", section)} 
//             />
//           </div>
//         </div>
//       </div>

//       {/* Floating Tools */}
//       <ThemeSwitcher activeThemeId={activeThemeId} onSwitch={setActiveThemeId} />
//       <ShareToast show={showShareToast} onClose={() => setShowShareToast(false)} />

//       {/* Modals */}
//       <UploadModal isOpen={modals.upload} onClose={() => toggleModal("upload", false)} onImageChange={handleImageChange} />
//       <EditProfileModal isOpen={modals.profile} onClose={() => toggleModal("profile", false)} initialData={userData} onSave={handleSaveProfile} />
//       <EditSectionModal isOpen={!!modals.section} onClose={() => toggleModal("section", null)} sectionData={modals.section} onSave={handleSaveSection} />
//     </div>
//   );
// };

// /* =========================================
//    3. DISPLAY COMPONENTS (VIEW)
// ========================================= */

// const UserProfileCard = ({ userData, avatarImage, onEdit, onUpload }) => (
//   <div className="card border-0 shadow rounded-4 mb-4 bg-white overflow-hidden">
//     <div className="card-body p-4 p-md-5">
//       <div className="d-flex flex-column flex-md-row align-items-center align-items-md-end gap-4">
//         {/* Avatar */}
//         <div className="position-relative bg-white p-1 rounded-4 shadow-sm cursor-pointer avatar-container" onClick={onUpload}>
//           <div className="rounded-4 border border-light bg-light d-flex align-items-center justify-content-center overflow-hidden avatar-box">
//             {avatarImage ? <img src={avatarImage} alt="Profile" className="w-100 h-100 object-fit-cover" /> : <i className="bi bi-person-fill text-secondary opacity-25" style={{ fontSize: "5rem" }}></i>}
//           </div>
//           <div className="position-absolute bottom-0 end-0 m-2 bg-dark text-white rounded-circle p-2 shadow-sm d-flex align-items-center justify-content-center" style={{width: "36px", height: "36px"}}>
//             <i className="bi bi-camera-fill small"></i>
//           </div>
//         </div>
//         {/* Text */}
//         <div className="flex-grow-1 text-center text-md-start pb-2">
//           <h2 className="fw-bold text-dark mb-1">{userData.name}</h2>
//           <p className="text-secondary mb-3 fs-5">{userData.role}</p>
//           <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-3 text-muted small">
//             <span><i className="bi bi-geo-alt-fill theme-text me-2"></i>{userData.location}</span>
//             <span className="d-none d-md-inline">|</span>
//             <span><i className="bi bi-envelope-fill theme-text me-2"></i>{userData.email}</span>
//           </div>
//         </div>
//         {/* Edit Button */}
//         <div className="pb-2 no-print">
//           <button className="btn theme-btn px-4 rounded-pill fw-medium shadow-sm d-flex align-items-center gap-2" onClick={onEdit}>
//             <i className="bi bi-pencil-square"></i> แก้ไขข้อมูล
//           </button>
//         </div>
//       </div>
//     </div>
//     {/* Status Footer */}
//     <div className="card-footer bg-light border-0 p-3 px-md-5 d-flex justify-content-between align-items-center flex-wrap gap-2">
//        <div className="d-flex align-items-center gap-2">
//           <span className="badge bg-success rounded-pill"><i className="bi bi-check-lg"></i></span>
//           <span className="fw-medium text-success small">{userData.status}</span>
//        </div>
//        <div className="text-muted small">Portfolio: <a href={`https://${userData.website}`} target="_blank" rel="noreferrer" className="text-decoration-none fw-bold theme-text">{userData.website}</a></div>
//     </div>
//   </div>
// );

// const SectionGrid = ({ sections, onEdit }) => (
//   <>
//     <h6 className="fw-bold text-secondary mb-3 ps-1 mt-4 no-print" style={{ letterSpacing: "0.5px" }}>ข้อมูลประกอบการสมัครงาน</h6>
//     <div className="row g-3">
//       {sections.map((section) => (
//         <div className="col-md-12" key={section.id}>
//           <SectionCard section={section} onClick={() => onEdit(section)} />
//         </div>
//       ))}
//     </div>
//   </>
// );

// // --- SECTION CARD COMPONENTS (Split for readability) ---
// const SectionCard = ({ section, onClick }) => {
//   const { id, title, icon, desc, items } = section;
//   const hasItems = items && items.length > 0;

//   return (
//     <div className="card h-100 border shadow-sm rounded-3 transition-all cursor-pointer theme-card mb-3" onClick={onClick}>
//       <div className="card-body p-4">
//         <div className="d-flex align-items-center gap-3 mb-3">
//           <div className="theme-bg-light rounded-3 p-3 d-flex align-items-center justify-content-center" style={{ width: "56px", height: "56px" }}>
//             <i className={`bi ${icon} fs-4`}></i>
//           </div>
//           <h5 className="fw-bold text-dark mb-0">{title}</h5>
//           <div className="ms-auto"><i className="bi bi-pencil-fill text-muted opacity-50 small no-print"></i></div>
//         </div>
        
//         {/* Render specific view based on type */}
//         {!hasItems ? (
//             <p className="text-muted small mb-0" style={{ whiteSpace: "pre-line" }}>{desc || "ยังไม่มีข้อมูล"}</p>
//         ) : (
//             <>
//                 {id === "skills" && <SkillsView items={items} />}
//                 {id === "languages" && <LanguagesView items={items} />}
//                 {["work", "education", "certificate"].includes(id) && <TimelineView items={items} type={id} />}
//             </>
//         )}
//       </div>
//     </div>
//   );
// };

// const SkillsView = ({ items }) => (
//   <div className="d-flex flex-wrap gap-2">
//     {items.map((item, idx) => (
//       <span key={idx} className="badge rounded-pill fw-medium px-3 py-2 border" style={{ backgroundColor: "#f8fafc", color: "#334155", fontSize: "0.85rem" }}>
//         {item.name}
//       </span>
//     ))}
//   </div>
// );

// const LanguagesView = ({ items }) => (
//   <div className="d-flex flex-wrap gap-3">
//     {items.map((item, idx) => (
//       <div key={idx} className="d-flex align-items-center gap-2 p-2 px-3 border rounded-3 bg-white">
//         <span className="fw-bold text-dark">{item.name}</span>
//         <span className="text-muted border-start ps-2 small">{item.level}</span>
//       </div>
//     ))}
//   </div>
// );

// const TimelineView = ({ items, type }) => (
//   <div className="d-flex flex-column gap-0">
//     {items.map((item, idx) => {
//       let main = "", sub = "", time = "";
//       if (type === "work") { main = item.position; sub = item.company; time = `${item.startMonth} ${item.startYear} - ${item.isCurrent ? "ปัจจุบัน" : item.endYear}`; }
//       else if (type === "education") { main = item.degree; sub = item.institution; time = `จบ ${item.gradYear}`; }
//       else if (type === "certificate") { main = item.name; sub = item.issuer; time = item.year; }

//       return (
//         <div key={idx} className="position-relative ps-4 pb-3 last-no-pb" style={{ borderLeft: idx === items.length - 1 ? "2px solid transparent" : "2px solid #e2e8f0" }}>
//           <div className="position-absolute rounded-circle bg-white border border-2 border-primary" style={{ width: "12px", height: "12px", left: "-7px", top: "5px" }}></div>
//           <div className="fw-bold text-dark fs-6">{main}</div>
//           <div className="text-muted small mb-1">{sub} {time && `• ${time}`}</div>
//           {item.description && <div className="text-secondary small mt-1 opacity-75">{item.description}</div>}
//         </div>
//       );
//     })}
//   </div>
// );

// /* =========================================
//    4. MODAL & FORM COMPONENTS (EDIT)
// ========================================= */

// const BaseModal = ({ isOpen, onClose, title, children, size = "md" }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
//       <div className={`modal-dialog modal-dialog-centered modal-${size}`}>
//         <div className="modal-content border-0 shadow-lg rounded-4 font-thai overflow-hidden">
//           <div className="modal-header border-bottom-0 p-4 pb-2 bg-white">
//             <h5 className="modal-title fw-bold text-dark fs-4">{title}</h5>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body p-4 pt-3 bg-white">{children}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const EditSectionModal = ({ isOpen, onClose, sectionData, onSave }) => {
//   const [mode, setMode] = useState("list");
//   const [items, setItems] = useState([]);
//   const [currentItem, setCurrentItem] = useState({});
//   const [generalText, setGeneralText] = useState("");
//   const [skillInput, setSkillInput] = useState("");

//   useEffect(() => {
//     if (isOpen && sectionData) {
//       setMode("list");
//       setItems(sectionData.items || []);
//       setGeneralText(sectionData.desc || "");
//     }
//   }, [isOpen, sectionData]);

//   const handleEditItem = (item) => { setCurrentItem(item); setMode("edit"); };
//   const handleAddItem = () => { setCurrentItem({}); setMode("edit"); };
//   const handleDeleteItem = (id) => setItems(items.filter((i) => i.id !== id));
  
//   const handleSaveItem = () => {
//     if (sectionData.id === "skills" && !currentItem.name && skillInput) {
//       setItems([...items, { id: Date.now(), name: skillInput }]);
//       setSkillInput("");
//       return;
//     }
//     const newItem = currentItem.id ? currentItem : { ...currentItem, id: Date.now() };
//     setItems(currentItem.id ? items.map(i => i.id === currentItem.id ? newItem : i) : [...items, newItem]);
//     setMode("list");
//   };

//   const handleMainSave = () => onSave({ ...sectionData, items, desc: generalText });
//   const handleItemChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setCurrentItem(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const isListType = ["work", "education", "certificate", "languages", "skills"].includes(sectionData?.id);

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose} title={mode === "edit" ? (currentItem.id ? "แก้ไขข้อมูล" : "เพิ่มข้อมูลใหม่") : `แก้ไข${sectionData?.title}`} size="lg">
//       {isListType && mode === "list" && (
//         <div className="fade-in">
//            {/* Skills Quick Add View */}
//            {sectionData.id === "skills" ? (
//                <div className="mb-4">
//                   <div className="input-group mb-3">
//                     <input type="text" className="form-control form-control-custom" placeholder="พิมพ์ทักษะ แล้วกด Enter" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleSaveItem())} />
//                     <button className="btn btn-primary px-4" onClick={handleSaveItem}><i className="bi bi-plus-lg"></i></button>
//                   </div>
//                   <div className="d-flex flex-wrap gap-2">
//                     {items.map(i => (<span key={i.id} className="badge bg-white text-dark border shadow-sm p-2 px-3 rounded-pill">{i.name} <i className="bi bi-x-circle-fill text-secondary ms-2 cursor-pointer" onClick={() => handleDeleteItem(i.id)}></i></span>))}
//                   </div>
//                </div>
//            ) : (
//                <div className="mb-4 d-flex flex-column gap-2">
//                   {items.length === 0 && <div className="text-center py-4 bg-light border border-dashed rounded text-muted">ยังไม่มีข้อมูล</div>}
//                   {items.map(item => (
//                     <div key={item.id} className="item-list-card d-flex justify-content-between align-items-start fade-in">
//                        <div>
//                           <h6 className="fw-bold mb-0">{item.position || item.degree || item.name}</h6>
//                           <div className="text-primary small">{item.company || item.institution || item.issuer || item.level}</div>
//                           <small className="text-muted">{(item.startYear || item.gradYear || item.year)}</small>
//                        </div>
//                        <div className="d-flex gap-2">
//                           <button className="btn btn-light border btn-sm rounded-3" onClick={() => handleEditItem(item)}><i className="bi bi-pencil text-primary"></i></button>
//                           <button className="btn btn-light border btn-sm rounded-3" onClick={() => handleDeleteItem(item.id)}><i className="bi bi-trash text-danger"></i></button>
//                        </div>
//                     </div>
//                   ))}
//                   <button className="btn-add-dashed mt-2" onClick={handleAddItem}><i className="bi bi-plus-circle-fill me-2"></i>เพิ่มข้อมูลใหม่</button>
//                </div>
//            )}
//            <div className="border-top pt-3 d-flex justify-content-end gap-2">
//               <button className="btn btn-cancel-custom" onClick={onClose}>ปิด</button>
//               <button className="btn btn-save-custom" onClick={handleMainSave}>บันทึกทั้งหมด</button>
//            </div>
//         </div>
//       )}

//       {isListType && mode === "edit" && sectionData.id !== "skills" && (
//         <form onSubmit={(e) => { e.preventDefault(); handleSaveItem(); }} className="fade-in">
//            <div className="bg-light p-4 rounded-4 mb-4 border border-light">
//               {/* Form Switcher */}
//               {sectionData.id === "work" && <WorkForm item={currentItem} onChange={handleItemChange} />}
//               {sectionData.id === "education" && <EducationForm item={currentItem} onChange={handleItemChange} />}
//               {sectionData.id === "certificate" && <CertificateForm item={currentItem} onChange={handleItemChange} />}
//               {sectionData.id === "languages" && <LanguageForm item={currentItem} onChange={handleItemChange} />}
//            </div>
//            <div className="d-flex justify-content-between align-items-center pt-2">
//               <button type="button" className="btn btn-cancel-custom ps-0" onClick={() => setMode("list")}><i className="bi bi-arrow-left me-1"></i> ย้อนกลับ</button>
//               <button type="submit" className="btn btn-save-custom px-4">ยืนยัน</button>
//            </div>
//         </form>
//       )}

//       {!isListType && (
//          <form onSubmit={(e) => { e.preventDefault(); handleMainSave(); }} className="fade-in">
//             <div className="mb-3"><label className="form-label-custom">รายละเอียด</label><textarea className="form-control form-control-custom" rows="6" value={generalText} onChange={(e) => setGeneralText(e.target.value)}></textarea></div>
//             <div className="d-flex justify-content-end gap-2 border-top pt-3">
//                <button type="button" className="btn btn-cancel-custom" onClick={onClose}>ยกเลิก</button>
//                <button type="submit" className="btn btn-save-custom">บันทึก</button>
//             </div>
//          </form>
//       )}
//     </BaseModal>
//   );
// };

// // --- INDIVIDUAL FORMS ---
// const WorkForm = ({ item, onChange }) => (
//   <div className="row g-3">
//     <div className="col-12"><label className="form-label-custom">ตำแหน่ง</label><input type="text" className="form-control form-control-custom" name="position" value={item.position || ""} onChange={onChange} /></div>
//     <div className="col-12"><label className="form-label-custom">บริษัท</label><input type="text" className="form-control form-control-custom" name="company" value={item.company || ""} onChange={onChange} /></div>
//     <div className="col-md-6"><label className="form-label-custom">เริ่ม</label><div className="d-flex gap-2"><select className="form-select form-select-custom" name="startMonth" value={item.startMonth || "เดือน"} onChange={onChange}><option>เดือน</option>{MONTHS.map(m=><option key={m}>{m}</option>)}</select><select className="form-select form-select-custom" name="startYear" value={item.startYear || "ปี"} onChange={onChange}><option>ปี</option>{YEARS.map(y=><option key={y}>{y}</option>)}</select></div></div>
//     <div className="col-md-6"><label className="form-label-custom">สิ้นสุด</label><div className="d-flex gap-2"><select className="form-select form-select-custom" name="endMonth" value={item.endMonth || "เดือน"} onChange={onChange} disabled={item.isCurrent}><option>เดือน</option>{MONTHS.map(m=><option key={m}>{m}</option>)}</select><select className="form-select form-select-custom" name="endYear" value={item.endYear || "ปี"} onChange={onChange} disabled={item.isCurrent}><option>ปี</option>{YEARS.map(y=><option key={y}>{y}</option>)}</select></div><div className="form-check mt-2"><input className="form-check-input" type="checkbox" name="isCurrent" checked={item.isCurrent || false} onChange={onChange} /><label className="form-check-label small text-muted ms-2">ปัจจุบันทำที่นี่</label></div></div>
//     <div className="col-12"><label className="form-label-custom">รายละเอียด</label><textarea className="form-control form-control-custom" name="description" rows="3" value={item.description || ""} onChange={onChange}></textarea></div>
//   </div>
// );

// const EducationForm = ({ item, onChange }) => (
//   <div className="row g-3">
//     <div className="col-12"><label className="form-label-custom">วุฒิ/สาขา</label><input type="text" className="form-control form-control-custom" name="degree" value={item.degree || ""} onChange={onChange} /></div>
//     <div className="col-12"><label className="form-label-custom">สถาบัน</label><input type="text" className="form-control form-control-custom" name="institution" value={item.institution || ""} onChange={onChange} /></div>
//     <div className="col-md-6"><label className="form-label-custom">ปีจบ</label><select className="form-select form-select-custom" name="gradYear" value={item.gradYear || "เลือกปี"} onChange={onChange}><option>เลือกปี</option>{YEARS.map(y=><option key={y}>{y}</option>)}</select></div>
//     <div className="col-12"><label className="form-label-custom">รายละเอียด</label><textarea className="form-control form-control-custom" name="description" rows="3" value={item.description || ""} onChange={onChange}></textarea></div>
//   </div>
// );

// const CertificateForm = ({ item, onChange }) => (
//   <div className="row g-3">
//     <div className="col-12"><label className="form-label-custom">ชื่อใบรับรอง</label><input type="text" className="form-control form-control-custom" name="name" value={item.name || ""} onChange={onChange} /></div>
//     <div className="col-12"><label className="form-label-custom">ผู้มอบ</label><input type="text" className="form-control form-control-custom" name="issuer" value={item.issuer || ""} onChange={onChange} /></div>
//     <div className="col-md-6"><label className="form-label-custom">ปีที่ได้รับ</label><select className="form-select form-select-custom" name="year" value={item.year || "เลือกปี"} onChange={onChange}><option>เลือกปี</option>{YEARS.map(y=><option key={y}>{y}</option>)}</select></div>
//   </div>
// );

// const LanguageForm = ({ item, onChange }) => (
//   <div className="row g-3">
//     <div className="col-12"><label className="form-label-custom">ภาษา</label><input type="text" className="form-control form-control-custom" name="name" value={item.name || ""} onChange={onChange} /></div>
//     <div className="col-12"><label className="form-label-custom">ระดับ</label><select className="form-select form-select-custom" name="level" value={item.level || "เลือกระดับ"} onChange={onChange}><option>เลือกระดับ</option><option>Native</option><option>Fluent</option><option>Professional Working</option><option>Intermediate</option><option>Basic</option></select></div>
//   </div>
// );

// // --- OTHER MODALS ---
// const UploadModal = ({ isOpen, onClose, onImageChange }) => (
//   <BaseModal isOpen={isOpen} onClose={onClose} title="อัปโหลดรูปโปรไฟล์">
//     <div className="border-2 border-dashed rounded-4 p-5 bg-light position-relative cursor-pointer hover-bg-gray text-center" style={{ borderStyle: "dashed", borderColor: "#dee2e6" }}>
//       <input type="file" className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer" onChange={onImageChange} accept="image/*" />
//       <div className="mb-3 p-3 bg-white rounded-circle shadow-sm d-inline-block"><i className="bi bi-cloud-arrow-up-fill fs-1 text-primary"></i></div>
//       <h6 className="fw-bold text-dark mb-1">คลิกเพื่ออัปโหลดรูปภาพ</h6>
//     </div>
//   </BaseModal>
// );

// const EditProfileModal = ({ isOpen, onClose, initialData, onSave }) => {
//   const [formData, setFormData] = useState(initialData);
//   useEffect(() => { if (isOpen) setFormData(initialData); }, [isOpen, initialData]);
//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose} title="แก้ไขข้อมูลส่วนตัว" size="lg">
//       <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
//         <div className="row g-3 mb-3">
//           <div className="col-md-6"><label className="form-label-custom">ชื่อ-นามสกุล</label><input type="text" className="form-control form-control-custom" name="name" value={formData.name || ""} onChange={handleChange} /></div>
//           <div className="col-md-6"><label className="form-label-custom">ตำแหน่ง</label><input type="text" className="form-control form-control-custom" name="role" value={formData.role || ""} onChange={handleChange} /></div>
//           <div className="col-md-6"><label className="form-label-custom">ที่อยู่</label><input type="text" className="form-control form-control-custom" name="location" value={formData.location || ""} onChange={handleChange} /></div>
//           <div className="col-md-6"><label className="form-label-custom">อีเมล</label><input type="email" className="form-control form-control-custom" name="email" value={formData.email || ""} onChange={handleChange} /></div>
//           <div className="col-12"><label className="form-label-custom">เว็บไซต์</label><input type="text" className="form-control form-control-custom" name="website" value={formData.website || ""} onChange={handleChange} /></div>
//           <div className="col-12"><label className="form-label-custom">สถานะ</label><select className="form-select form-select-custom" name="status" value={formData.status || ""} onChange={handleChange}><option>พร้อมเริ่มงาน</option><option>เปิดรับโอกาสใหม่</option><option>ไม่ว่าง</option></select></div>
//         </div>
//         <div className="d-flex gap-2 mt-4"><button type="submit" className="btn btn-save-custom">บันทึก</button><button type="button" className="btn btn-cancel-custom" onClick={onClose}>ยกเลิก</button></div>
//       </form>
//     </BaseModal>
//   );
// };

// /* =========================================
//    5. HELPER COMPONENTS
// ========================================= */
// const TopBar = ({ onShare }) => (
//   <div className="bg-white border-bottom py-2 px-4 d-flex justify-content-end align-items-center sticky-top shadow-sm no-print" style={{ zIndex: 1020 }}>
//     <div className="d-flex align-items-center gap-2">
//       <button className="btn btn-outline-primary btn-sm rounded-pill px-3" onClick={onShare}><i className="bi bi-share-fill me-2"></i>แชร์</button>
//       <button className="btn btn-primary btn-sm rounded-pill px-3" onClick={() => window.print()}><i className="bi bi-download me-2"></i>ดาวน์โหลด</button>
//     </div>
//   </div>
// );

// const ThemeSwitcher = ({ activeThemeId, onSwitch }) => (
//   <div className="position-fixed bottom-0 end-0 m-4 bg-white p-2 rounded-pill shadow d-flex gap-2 border no-print" style={{ zIndex: 100 }}>
//     {Object.values(THEMES).map(t => (
//       <div key={t.id} className="rounded-circle cursor-pointer border border-2 border-white shadow-sm" 
//            style={{ width: "32px", height: "32px", background: t.primary, transform: activeThemeId === t.id ? "scale(1.2)" : "scale(1)", transition: "transform 0.2s" }} 
//            onClick={() => onSwitch(t.id)} />
//     ))}
//   </div>
// );

// const ShareToast = ({ show, onClose }) => {
//     useEffect(() => { if(show) setTimeout(onClose, 3000); }, [show, onClose]);
//     if (!show) return null;
//     return (
//         <div className="position-fixed bottom-0 start-50 translate-middle-x mb-4 p-3 rounded-3 bg-dark text-white shadow-lg d-flex align-items-center gap-3 no-print" style={{ zIndex: 1060, animation: "fadeInOut 3s forwards" }}>
//             <i className="bi bi-check-circle-fill text-success fs-4"></i>
//             <div><h6 className="mb-0 fw-bold">คัดลอกลิงก์แล้ว!</h6><small className="text-white-50">ส่งต่อโปรไฟล์ได้เลย</small></div>
//         </div>
//     );
// };

// const Assets = () => (
//   <>
//     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
//     <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet" />
//     <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
//   </>
// );

// const GlobalStyles = ({ currentTheme }) => (
//   <style jsx>{`
//     body, .font-thai { font-family: "Sarabun", sans-serif; }
//     .cursor-pointer { cursor: pointer; }
//     .transition-all { transition: all 0.3s ease; }
//     .theme-btn { background-color: ${currentTheme.primary}; border-color: ${currentTheme.primary}; color: white; }
//     .theme-btn:hover { filter: brightness(110%); color: white; }
//     .theme-text { color: ${currentTheme.primary}; }
//     .theme-bg-light { background-color: ${currentTheme.light}; color: ${currentTheme.primary}; }
//     .theme-card:hover { border-color: ${currentTheme.primary} !important; background-color: ${currentTheme.light}20; transform: translateY(-3px); }
//     .header-decoration { height: 200px; transition: background 0.5s ease; }
//     .content-wrapper { margin-top: -100px; }
//     .avatar-container { margin-top: -80px; }
//     .avatar-box { width: 150px; height: 150px; }
//     .form-control-custom, .form-select-custom { border-radius: 8px; border: 1px solid #e2e8f0; padding: 0.7rem 1rem; background-color: #f8fafc; }
//     .form-control-custom:focus, .form-select-custom:focus { border-color: ${currentTheme.primary}; box-shadow: 0 0 0 3px ${currentTheme.light}60; background-color: white; }
//     .btn-save-custom { background-color: #1e3a8a; border-color: #1e3a8a; color: white; padding: 0.6rem 2rem; border-radius: 8px; font-weight: 600; }
//     .btn-cancel-custom { color: #64748b; font-weight: 600; text-decoration: none; padding: 0.6rem 1.5rem; }
//     .btn-cancel-custom:hover { color: #334155; background-color: #f1f5f9; border-radius: 8px; }
//     .item-list-card { border: 1px solid #dee2e6; border-radius: 12px; padding: 1.25rem; margin-bottom: 0.75rem; background-color: white; transition: all 0.2s; }
//     .item-list-card:hover { border-color: ${currentTheme.primary}; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
//     .btn-add-dashed { border: 2px dashed #cbd5e1; background-color: #f8fafc; color: #64748b; width: 100%; padding: 0.8rem; border-radius: 12px; display: flex; justify-content: center; align-items: center; gap: 0.5rem; }
//     .btn-add-dashed:hover { border-color: ${currentTheme.primary}; color: ${currentTheme.primary}; background-color: ${currentTheme.light}40; }
//     .last-no-pb:last-child { padding-bottom: 0 !important; border-left-color: transparent !important; }
//     .fade-in { animation: fadeIn 0.3s ease-out; }
//     @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
//     @keyframes fadeInOut { 0% { opacity: 0; transform: translateY(20px); } 10% { opacity: 1; transform: translateY(0); } 90% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-20px); } }
//     @media print { .no-print { display: none !important; } body { background: white !important; } .card { border: 1px solid #ddd !important; box-shadow: none !important; } .print-h-auto { height: auto !important; } .print-mt-0 { margin-top: 0 !important; } }
//   `}</style>
// );

// export default App;

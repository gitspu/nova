import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // อย่าลืม import CSS ของ Bootstrap

// --- Icons Components ---
const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill me-2" viewBox="0 0 16 16">
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
    </svg>
);
const EnvelopeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill me-2" viewBox="0 0 16 16">
        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
    </svg>
);
const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg me-2" viewBox="0 0 16 16">
        <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829c.39-.39.518-1.09.283-1.467A.5.5 0 0 1 10.5 9h-2A.5.5 0 0 1 8 8.5V6a.5.5 0 0 1 1 0v2.5h2A1.5 1.5 0 0 1 12 11c0 .41-.176.791-.48 1.05L9.692 14.156a4 4 0 0 1-5.656 0L2.121 11.979a4 4 0 0 1 0-5.657l1.432-1.432A.5.5 0 0 1 4 5h1.5a.5.5 0 0 1 .5.5v1z"/>
    </svg>
);
const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg>
);
// ArrowRight ถูกลบออกเนื่องจากไม่ได้ใช้ในคอลัมน์ขวาแล้ว

// --- Component: Profile ---
function Profile() {
    // 1. State สำหรับข้อมูลโปรไฟล์ส่วนหัว
    const [profileData, setProfileData] = useState({
        name: "",
        address: "",
        email: "",
        profileLink: "",
        profileImage: null, // เก็บ URL ของรูปภาพ
    });

    // **ส่วนที่เพิ่ม/แก้ไข:** 4. State สำหรับระดับการเปิดโปรไฟล์
    const [profileVisibility, setProfileVisibility] = useState("สาธารณะ"); 

    // 2. State สำหรับควบคุมโหมดแก้ไขส่วนหัว
    const [isEditing, setIsEditing] = useState(false);
    const [tempData, setTempData] = useState(profileData);

    // 3. State สำหรับข้อมูลเนื้อหาส่วนต่างๆ 
    const [workHistory, setWorkHistory] = useState([]); 
    const [education, setEducation] = useState([]); 
    const [licenses, setLicenses] = useState([]); 
    const [skills, setSkills] = useState([]); 
    const [languages, setLanguages] = useState([]); 
    const [summary, setSummary] = useState(""); 

    // --- ฟังก์ชันจัดการการแก้ไขส่วนหัว ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempData(prev => ({ ...prev, [name]: value }));
    };

    // ฟังก์ชันจัดการการอัพโหลดรูปภาพ
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setTempData(prev => ({ ...prev, profileImage: imageUrl }));
        }
    };

    const handleSave = () => {
        setProfileData(tempData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempData(profileData);
        setIsEditing(false);
    };

    // --- ส่วนแสดงผล/แก้ไขรูปโปรไฟล์ ---
    const AvatarArea = ({ isEditing, profileImage, handleImageChange }) => {
        const avatarStyle = { 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            backgroundColor: '#f0f0f0', 
            border: '3px solid white', 
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        };

        if (isEditing) {
            return (
                <div style={avatarStyle}>
                    <input 
                        type="file" 
                        id="profile-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 10 }}
                    />
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span className="small text-secondary text-center" style={{ padding: '5px', lineHeight: '1.2' }}>เลือกรูป</span>
                    )}
                    <label htmlFor="profile-upload" className="btn btn-sm btn-dark position-absolute" style={{ bottom: 0, right: 0, transform: 'translate(25%, 25%)', padding: '0 5px', fontSize: '0.6rem' }}>+</label>
                </div>
            );
        }

        return (
            <div style={avatarStyle}>
                {profileImage ? (
                    <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <span className="text-secondary" style={{ fontSize: '2rem' }}>👤</span>
                )}
            </div>
        );
    };

    // --- ส่วนแสดงผล/แก้ไขส่วนหัว ---
    const HeaderContent = () => {
        const displayName = profileData.name || "ยังไม่ได้ระบุชื่อ";
        const displayAddress = profileData.address || "ยังไม่ได้ระบุที่อยู่";
        const displayEmail = profileData.email || "ยังไม่ได้ระบุอีเมล";
        const displayLink = profileData.profileLink || "ยังไม่ได้ระบุลิงก์โปรไฟล์";

        if (isEditing) {
            // โหมดแก้ไขส่วนหัว
            return (
                <div className="card p-3 border-0 shadow-sm bg-light text-dark">
                    <h5 className="mb-3">แก้ไขข้อมูลส่วนตัว</h5>
                    <div className="mb-2">
                        <label className="form-label small">ชื่อ</label>
                        <input type="text" name="name" className="form-control form-control-sm" value={tempData.name} onChange={handleChange} placeholder="ใส่ชื่อ-นามสกุลของคุณ" />
                    </div>
                    <div className="mb-2">
                        <label className="form-label small">ที่อยู่</label>
                        <input type="text" name="address" className="form-control form-control-sm" value={tempData.address} onChange={handleChange} placeholder="ใส่ที่อยู่ปัจจุบัน" />
                    </div>
                    <div className="mb-2">
                        <label className="form-label small">อีเมล</label>
                        <input type="email" name="email" className="form-control form-control-sm" value={tempData.email} onChange={handleChange} placeholder="ใส่ที่อยู่อีเมลของคุณ" />
                    </div>
                     <div className="mb-3">
                        <label className="form-label small">ลิงก์โปรไฟล์</label>
                        <input type="text" name="profileLink" className="form-control form-control-sm" value={tempData.profileLink} onChange={handleChange} placeholder="ใส่ลิงก์โปรไฟล์ (ถ้ามี)" />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-outline-secondary btn-sm me-2" onClick={handleCancel}>ยกเลิก</button>
                        <button className="btn btn-primary btn-sm" onClick={handleSave}>บันทึก</button>
                    </div>
                </div>
            );
        } else {
            // โหมดแสดงผลส่วนหัว
            return (
                <div>
                    <h2 className="mb-1 text-white">{displayName}</h2>
                    <p className="mb-0 small" style={{ opacity: displayAddress === "ยังไม่ได้ระบุที่อยู่" ? 0.7 : 1 }}><LocationIcon />{displayAddress}</p>
                    <p className="mb-0 small" style={{ opacity: displayEmail === "ยังไม่ได้ระบุอีเมล" ? 0.7 : 1 }}><EnvelopeIcon />{displayEmail}</p>
                    <p className="mb-3 small" style={{ opacity: displayLink === "ยังไม่ได้ระบุลิงก์โปรไฟล์" ? 0.7 : 1 }}><LinkIcon />{displayLink}</p>
                    <button className="btn btn-light btn-sm px-4" onClick={() => setIsEditing(true)}>แก้ไข</button>
                </div>
            );
        }
    };

    // --- Component: ProfileStatus (คอลัมน์ขวา) ---
    const ProfileStatus = () => {
        const statuses = ["สาธารณะ", "จำกัด", "ส่วนตัว"];

        // กำหนดสีตามสถานะ
        const getStatusClass = (status) => {
            switch (status) {
                case "สาธารณะ": return "text-success";
                case "จำกัด": return "text-warning";
                case "ส่วนตัว": return "text-danger";
                default: return "text-secondary";
            }
        };

        return (
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    {/* ส่วนแสดงสถานะปัจจุบัน */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h5 className="card-title fs-6 mb-1">ระดับการเปิดโปรไฟล์</h5>
                            <p className={`card-text small fw-bold mb-0 ${getStatusClass(profileVisibility)}`}>
                                {profileVisibility}
                            </p>
                        </div>
                    </div>

                    {/* Dropdown สำหรับเลือกสถานะ */}
                    <div className="dropdown w-100">
                        <button 
                            className="btn btn-outline-primary btn-sm dropdown-toggle w-100" 
                            type="button" 
                            id="profileVisibilityDropdown" 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                        >
                            เปลี่ยนระดับ
                        </button>
                        <ul className="dropdown-menu w-100" aria-labelledby="profileVisibilityDropdown">
                            {statuses.map(status => (
                                <li key={status}>
                                    <button 
                                        className={`dropdown-item ${profileVisibility === status ? 'active' : ''}`} 
                                        onClick={() => setProfileVisibility(status)}
                                    >
                                        {status}
                                        {profileVisibility === status && (
                                            <span className="float-end text-success">✔️</span>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <hr className="my-3"/>
                    
                    {/* คำอธิบายสถานะ (เพื่อให้ผู้ใช้เข้าใจความหมาย) */}
                    <p className="small text-secondary mb-0">
                        **สาธารณะ:** ทุกคนสามารถค้นหาและดูโปรไฟล์ของคุณได้
                    </p>
                    <p className="small text-secondary mb-0">
                        **จำกัด:** เฉพาะผู้ใช้ที่ลงทะเบียนและมีบัญชีเท่านั้นที่ดูได้
                    </p>
                    <p className="small text-secondary mb-0">
                        **ส่วนตัว:** มีเพียงคุณเท่านั้นที่สามารถดูโปรไฟล์นี้ได้
                    </p>
                </div>
            </div>
        );
    }
    // --- สิ้นสุด Component: ProfileStatus ---


    return (
        <div className="container-fluid p-0 bg-light" style={{ minHeight: '100vh' }}>
            {/* ส่วนหัว */}
            <div className="p-4 mb-4" style={{ backgroundColor: '#2d3e50', color: 'white', borderBottom: '10px solid #f653a1' }}>
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="d-flex align-items-start">
                            {/* รูปโปรไฟล์/ตัวเลือกรูป */}
                            <div className="me-4">
                                <AvatarArea 
                                    isEditing={isEditing} 
                                    profileImage={isEditing ? tempData.profileImage : profileData.profileImage}
                                    handleImageChange={handleImageChange}
                                />
                            </div>
                            {/* เนื้อหาที่สลับระหว่างแสดงผล/แก้ไข */}
                            {HeaderContent()}
                        </div>
                    </div>
                    <div className="col-lg-6 d-none d-lg-block">
                        <div className="float-end" style={{ width: '150px', height: '150px', backgroundColor: '#f653a1', borderRadius: '50%', opacity: 0.7, transform: 'translate(30px, -30px)' }}></div>
                    </div>
                </div>
            </div>

            {/* เนื้อหาหลัก */}
            <div className="container py-4">
                <div className="row">
                    <div className="col-lg-8">
                        {/* 1. ข้อมูลส่วนตัวโดยสรุป (ใช้ Textarea) */}
                        <EditableSection 
                            title="ข้อมูลส่วนตัวโดยสรุป" 
                            data={summary}
                            setData={setSummary}
                            dataType="textarea"
                            buttonText="เพิ่มข้อมูลโดยสรุป"
                            emptyMessage="เพิ่มข้อมูลส่วนตัวโดยสรุปในโปรไฟล์ของคุณ เพื่อแนะนำตัว"
                        />
                        
                        {/* 2. ประวัติการทำงาน (ใช้ List/Array) */}
                        <EditableSectionList 
                            title="ประวัติการทำงาน" 
                            items={workHistory}
                            setItems={setWorkHistory}
                            buttonText="เพิ่มตำแหน่งงาน"
                            emptyMessage="เพิ่มข้อมูลของคุณเพื่อให้ผู้ประกอบการทราบถึงประสบการณ์และทำให้โปรไฟล์ของคุณโดดเด่นมากขึ้น"
                            inputType="work" 
                        />

                        {/* 3. ข้อมูลการศึกษา (ใช้ List/Array) */}
                        <EditableSectionList 
                            title="ข้อมูลการศึกษา" 
                            items={education}
                            setItems={setEducation}
                            buttonText="เพิ่มข้อมูลการศึกษา"
                            emptyMessage="แจ้งผู้ประกอบการที่เกี่ยวข้องกับข้อมูลการศึกษาของคุณ"
                            inputType="education" 
                        />

                        {/* 4. ใบอนุญาตหรือใบประกาศนียบัตร (ใช้ List/Array พร้อมรูป) */}
                        <EditableSectionList 
                            title="ใบอนุญาตหรือใบประกาศนียบัตร" 
                            items={licenses}
                            setItems={setLicenses}
                            buttonText="เพิ่มใบอนุญาตหรือประกาศนียบัตร"
                            emptyMessage="แสดงข้อมูลที่เกี่ยวข้อง เพิ่มใบอนุญาต ประกาศนียบัตร การเป็นสมาชิกและใบรับรองที่เกี่ยวข้องกับงานนี้"
                            inputType="license" 
                        />

                        {/* 5. ทักษะ (ใช้ List/Array ของข้อความ) */}
                        <EditableSectionList 
                            title="ทักษะ" 
                            items={skills}
                            setItems={setSkills}
                            buttonText="เพิ่มทักษะอื่น ๆ"
                            emptyMessage="บอกให้ผู้ประกอบการทราบถึงความสำคัญของบทบาทที่คุณมีต่อองค์กร"
                            inputType="skill" 
                        />

                        {/* 6. ภาษา (ใช้ List/Array ของข้อความ) */}
                        <EditableSectionList 
                            title="ภาษา" 
                            items={languages}
                            setItems={setLanguages}
                            buttonText="เพิ่มภาษา"
                            emptyMessage="เพิ่มภาษาเพื่อดึงดูดผู้สมัครและผู้ประกอบการให้มากขึ้น"
                            inputType="language" 
                        />
                    </div>

                    {/* คอลัมน์ขวา (แถบข้าง) - ใช้คอมโพเนนต์ ProfileStatus ใหม่ */}
                    <div className="col-lg-4">
                        <ProfileStatus />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;

// ----------------------------------------------------
// ## คอมโพเนนต์ที่ 1: EditableSection (สำหรับ Text/Textarea เดียว)
// ----------------------------------------------------
const EditableSection = ({ title, data, setData, buttonText, emptyMessage, dataType = 'text' }) => {
    const [tempData, setTempData] = useState(data);
    const [isSectionEditing, setIsSectionEditing] = useState(false);

    const handleSave = () => {
        setData(tempData);
        setIsSectionEditing(false);
    };
    
    const handleCancel = () => {
        setTempData(data); 
        setIsSectionEditing(false);
    }

    const InputComponent = dataType === 'textarea' ? 'textarea' : 'input';

    const displayData = data || emptyMessage;

    return (
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h3 className="card-title fs-5 mb-1">{title}</h3>
          
          {isSectionEditing ? (
              // โหมดแก้ไข
              <div>
                <InputComponent
                    className="form-control mb-3" 
                    rows={dataType === 'textarea' ? "3" : null}
                    type={dataType === 'textarea' ? null : dataType}
                    value={tempData} 
                    onChange={(e) => setTempData(e.target.value)}
                    placeholder={emptyMessage}
                />
                <div className='d-flex justify-content-end'>
                    <button className="btn btn-outline-secondary btn-sm me-2" onClick={handleCancel}>ยกเลิก</button>
                    <button className="btn btn-primary btn-sm" onClick={handleSave}>บันทึก</button>
                </div>
              </div>
          ) : (
              // โหมดแสดงผล
              <div>
                {/* แสดงข้อมูลที่บันทึกไว้ หรือข้อความเริ่มต้น */}
                <p className={`card-text small mb-3 ${data ? 'text-dark' : 'text-secondary'}`}>
                    {displayData}
                </p>
                <div className='d-flex justify-content-between align-items-center'>
                    <button className="btn btn-outline-primary" onClick={() => setIsSectionEditing(true)}>{buttonText}</button>
                    {data && (
                        <button className="btn btn-link btn-sm text-decoration-none" onClick={() => setIsSectionEditing(true)}>แก้ไข</button>
                    )}
                </div>
              </div>
          )}
        </div>
      </div>
    );
};

// ----------------------------------------------------
// ## คอมโพเนนต์ที่ 2.1: LicenseItem (สำหรับแสดงผลใบอนุญาต/ประกาศนียบัตร)
// ----------------------------------------------------
const LicenseItem = ({ item, index, handleDeleteItem }) => {
    // กำหนดรูปแบบการแสดงผล: ชื่อประกาศนียบัตร
    const itemName = item.name || "ไม่มีชื่อประกาศนียบัตร";
    const imageUrl = item.imageUrl;

    return (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-start small py-3">
            <div className="d-flex align-items-center">
                {/* แสดงรูปภาพขนาดเล็ก ถ้ามี */}
                <div className="me-3" style={{ width: '40px', height: '40px', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {imageUrl ? (
                        <img src={imageUrl} alt="License" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <span className="text-secondary" style={{ fontSize: '1.2rem' }}>📄</span>
                    )}
                </div>
                
                {/* ชื่อประกาศนียบัตร */}
                <span className="fw-bold">{itemName}</span>
            </div>
            
            <div className="btn-group btn-group-sm">
                <button className="btn btn-outline-secondary py-0 px-2" onClick={() => console.log('Edit item', index)}>แก้ไข</button>
                <button className="btn btn-outline-danger py-0 px-2" onClick={() => handleDeleteItem(index)}>ลบ</button>
            </div>
        </li>
    );
}

// ----------------------------------------------------
// ## คอมโพเนนต์ที่ 2: EditableSectionList (สำหรับรายการ/ข้อมูลชุด - ปรับปรุงรองรับ License Object)
// ----------------------------------------------------
const EditableSectionList = ({ title, items, setItems, buttonText, emptyMessage, inputType }) => {
    const [isAdding, setIsAdding] = useState(false);

    // ใช้ State แยกสำหรับการเพิ่ม/แก้ไขรายการใหม่
    // สำหรับ License จะเก็บเป็น Object: { name: string, imageUrl: string | null, file: File | null }
    // สำหรับอื่นๆ จะเก็บเป็น string
    const initialNewItem = inputType === 'license' ? { name: "", imageUrl: null, file: null } : "";
    const [newItem, setNewItem] = useState(initialNewItem); 
    
    // ฟังก์ชันจัดการการเปลี่ยนแปลงสำหรับฟอร์ม (ใช้กับ license โดยเฉพาะ)
    const handleNewItemChange = (e) => {
        const { name, value } = e.target;
        if (inputType === 'license') {
            setNewItem(prev => ({ ...prev, [name]: value }));
        } else {
            setNewItem(value);
        }
    };
    
    // ฟังก์ชันจัดการการอัปโหลดรูปภาพ (ใช้กับ license โดยเฉพาะ)
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewItem(prev => ({ ...prev, imageUrl: imageUrl, file: file }));
        } else {
            setNewItem(prev => ({ ...prev, imageUrl: null, file: null }));
        }
    };

    // ฟังก์ชันเพิ่มรายการใหม่
    const handleAddItem = () => {
        if (inputType === 'license') {
            // Logic สำหรับ License
            if (newItem.name.trim() || newItem.imageUrl) {
                // เก็บเฉพาะ name และ imageUrl (ไม่ต้องเก็บ file: File object)
                const itemToSave = { name: newItem.name.trim(), imageUrl: newItem.imageUrl };
                setItems(prev => [...prev, itemToSave]);
                setNewItem(initialNewItem); // รีเซ็ต
                setIsAdding(false);
            }
        } else {
            // Logic สำหรับ Work, Education, Skill, Language
            if (typeof newItem === 'string' && newItem.trim()) {
                setItems(prev => [...prev, newItem.trim()]);
                setNewItem(initialNewItem);
                setIsAdding(false);
            }
        }
    };

    // ฟังก์ชันลบรายการ
    const handleDeleteItem = (indexToDelete) => {
        setItems(prev => prev.filter((_, index) => index !== indexToDelete));
    };

    // การแสดงผลของรายการย่อย
    const renderItems = () => {
        if (items.length === 0) {
            return <p className="card-text small text-secondary mb-3">{emptyMessage}</p>;
        }

        if (inputType === 'skill' || inputType === 'language') {
            // แสดงผลเป็น Chip/Tag สำหรับทักษะ/ภาษา
            return (
                <div className="d-flex flex-wrap mb-3">
                    {items.map((item, index) => (
                        <span key={index} className="badge bg-primary me-2 mb-2 p-2 d-flex align-items-center">
                            {item}
                            <button 
                                className="btn-close btn-close-white ms-2" 
                                aria-label="Close" 
                                onClick={() => handleDeleteItem(index)}
                            ></button>
                        </span>
                    ))}
                </div>
            );
        }

        // แสดงผลเป็นรายการพื้นฐานสำหรับงาน/การศึกษา/ใบประกาศฯ
        return (
            <ul className="list-group list-group-flush mb-3">
                {items.map((item, index) => {
                    // ใช้ LicenseItem สำหรับใบอนุญาต
                    if (inputType === 'license') {
                        // item เป็น object ที่มี name และ imageUrl
                        return <LicenseItem key={index} item={item} index={index} handleDeleteItem={handleDeleteItem} />;
                    }
                    
                    // แสดงผลแบบเดิมสำหรับ Work/Education (ถ้าข้อมูลยังเป็น String)
                    return (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center small">
                            {/* แสดงข้อความ */}
                            {typeof item === 'object' && item !== null ? item.name || JSON.stringify(item) : item}
                            
                            <div className="btn-group btn-group-sm">
                                <button className="btn btn-outline-secondary py-0 px-2" onClick={() => console.log('Edit item', index)}>แก้ไข</button>
                                <button className="btn btn-outline-danger py-0 px-2" onClick={() => handleDeleteItem(index)}>ลบ</button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }
    
    // รูปแบบฟอร์มเพิ่มข้อมูลย่อย
    const AddForm = () => {
        let placeholderText = "";
        let isLicenseForm = inputType === 'license';
        let currentItem = isLicenseForm ? newItem : newItem;

        switch(inputType) {
            case 'work': placeholderText = "ตำแหน่งงาน, บริษัท, ระยะเวลา"; break;
            case 'education': placeholderText = "วุฒิการศึกษา, สถาบัน"; break;
            case 'license': placeholderText = "ชื่อใบอนุญาตหรือประกาศนียบัตร"; break;
            case 'skill': placeholderText = "ชื่อทักษะ (เช่น JavaScript)"; break;
            case 'language': placeholderText = "ภาษาและระดับ (เช่น ไทย (เจ้าของภาษา))"; break;
            default: placeholderText = "เพิ่มรายการใหม่";
        }

        return (
            <div className="mt-3 p-3 border rounded bg-light">
                <p className="small fw-bold">เพิ่มรายการใหม่</p>
                
                {/* Input หลัก: ชื่อรายการ */}
                <input 
                    type="text" 
                    name="name" 
                    className="form-control form-control-sm mb-2" 
                    value={isLicenseForm ? currentItem.name : currentItem} 
                    onChange={handleNewItemChange} 
                    placeholder={placeholderText}
                />
                
                {/* ส่วนเฉพาะสำหรับ License */}
                {isLicenseForm && (
                    <div className="mb-2">
                        <label className="form-label small">รูปภาพประกอบ (ถ้ามี)</label>
                        <input 
                            type="file" 
                            className="form-control form-control-sm"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        {currentItem.imageUrl && (
                            <div className="mt-2 d-flex align-items-center">
                                <img src={currentItem.imageUrl} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} className="me-2" />
                                <span className="small text-success">รูปภาพถูกเลือกแล้ว</span>
                            </div>
                        )}
                    </div>
                )}
                
                <div className='d-flex justify-content-end mt-3'>
                    <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => {setIsAdding(false); setNewItem(initialNewItem);}}>ยกเลิก</button>
                    <button 
                        className="btn btn-primary btn-sm" 
                        onClick={handleAddItem} 
                        // ปุ่มจะถูกปิดใช้งานถ้าเป็น License และไม่มีทั้งชื่อและรูปภาพ หรือถ้าเป็นอื่น ๆ แล้วไม่มีชื่อ
                        disabled={isLicenseForm ? !currentItem.name.trim() && !currentItem.imageUrl : !currentItem.trim()}
                    >
                        บันทึก
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
                <h3 className="card-title fs-5 mb-3">{title}</h3>
                
                {renderItems()}
                
                {isAdding && AddForm()}

                {/* ปุ่มหลักสำหรับเพิ่ม/แก้ไข */}
                <div className='d-flex justify-content-between align-items-center'>
                    <button 
                        className="btn btn-outline-primary" 
                        onClick={() => setIsAdding(true)}
                        style={{ display: isAdding ? 'none' : 'block' }} // ซ่อนปุ่มเมื่อกำลังเพิ่ม
                    >
                        {items.length > 0 ? "เพิ่มรายการอีก" : buttonText}
                    </button>
                    {items.length > 0 && !isAdding && (
                        <button className="btn btn-link btn-sm text-decoration-none" onClick={() => setIsAdding(true)}>
                            จัดการรายการ
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
// ===================================================
// ไฟล์: src/Admin/data/mockData.js
// คำอธิบาย: ข้อมูลจำลองทั้งหมดสำหรับระบบ Admin
// ===================================================

// ข้อมูลสถิติรายเดือน (ใช้สำหรับกราฟ)
export const monthlyStats = [
  { month: 'ม.ค.', users: 145, resumes: 89, jobs: 23 },
  { month: 'ก.พ.', users: 178, resumes: 112, jobs: 31 },
  { month: 'มี.ค.', users: 203, resumes: 134, jobs: 28 },
  { month: 'เม.ย.', users: 234, resumes: 156, jobs: 35 },
  { month: 'พ.ค.', users: 267, resumes: 178, jobs: 42 },
  { month: 'มิ.ย.', users: 298, resumes: 201, jobs: 38 }
];

// ข้อมูลสถิติรวมทั้งหมด (ใช้แสดงในการ์ดภาพรวม)
export const summaryStats = {
  totalUsers: 1245,
  userGrowth: '+12%',
  totalResumes: 870,
  resumeGrowth: '+8%',
  totalJobs: 197,
  jobGrowth: '+15%',
};

// ข้อมูลผู้ใช้งานจำลอง
export const mockUsers = [
  {
    id: 1,
    name: 'สมชาย ใจดี',
    email: 'somchai@email.com',
    type: 'jobseeker', // jobseeker หรือ company
    status: 'active', // active, inactive, pending
    joinDate: '2024-01-15',
    resumeCount: 2,
    applicationCount: 5,
    phone: '081-234-5678'
  },
  {
    id: 2,
    name: 'สมหญิง รักสวย',
    email: 'somying@email.com',
    type: 'jobseeker',
    status: 'active',
    joinDate: '2024-02-03',
    resumeCount: 1,
    applicationCount: 8,
    phone: '082-345-6789'
  },
  {
    id: 3,
    name: 'บริษัท เทคโนโลยี จำกัด',
    email: 'hr@techco.com',
    type: 'company',
    status: 'active',
    joinDate: '2024-01-20',
    jobPostCount: 5,
    companySize: '100-500',
    phone: '02-123-4567'
  },
  {
    id: 4,
    name: 'นายพิชัย มั่งคั่ง',
    email: 'pichai@email.com',
    type: 'jobseeker',
    status: 'inactive',
    joinDate: '2024-03-10',
    resumeCount: 3,
    applicationCount: 12,
    phone: '089-876-5432'
  },
  {
    id: 5,
    name: 'บริษัท การตลาด ดี จำกัด',
    email: 'contact@marketing.com',
    type: 'company',
    status: 'active',
    joinDate: '2024-02-15',
    jobPostCount: 8,
    companySize: '50-100',
    phone: '02-234-5678'
  },
  {
    id: 6,
    name: 'นางสาวกานต์ สวยงาม',
    email: 'kan@email.com',
    type: 'jobseeker',
    status: 'active',
    joinDate: '2024-03-22',
    resumeCount: 1,
    applicationCount: 3,
    phone: '091-234-5678'
  },
  {
    id: 7,
    name: 'คุณสุชาติ ทันสมัย',
    email: 'suchat@email.com',
    type: 'jobseeker',
    status: 'active',
    joinDate: '2024-04-01',
    resumeCount: 2,
    applicationCount: 6,
    phone: '092-345-6789'
  },
  {
    id: 8,
    name: 'บริษัท ไอที โซลูชั่น จำกัด',
    email: 'info@itsolution.com',
    type: 'company',
    status: 'pending',
    joinDate: '2024-04-10',
    jobPostCount: 0,
    companySize: '10-50',
    phone: '02-345-6789'
  },
  {
    id: 9,
    name: 'นายวิชัย ประสบผล',
    email: 'wichai@email.com',
    type: 'jobseeker',
    status: 'active',
    joinDate: '2024-04-15',
    resumeCount: 1,
    applicationCount: 4,
    phone: '093-456-7890'
  },
  {
    id: 10,
    name: 'นางสาวมณี เพชรงาม',
    email: 'manee@email.com',
    type: 'jobseeker',
    status: 'active',
    joinDate: '2024-05-01',
    resumeCount: 2,
    applicationCount: 7,
    phone: '094-567-8901'
  },
  {
    id: 11,
    name: 'บริษัท ก่อสร้าง เจริญ จำกัด',
    email: 'hr@construction.com',
    type: 'company',
    status: 'active',
    joinDate: '2024-05-10',
    jobPostCount: 3,
    companySize: '500+',
    phone: '02-456-7890'
  },
  {
    id: 12,
    name: 'คุณอรุณ รุ่งเรือง',
    email: 'arun@email.com',
    type: 'jobseeker',
    status: 'active',
    joinDate: '2024-05-20',
    resumeCount: 1,
    applicationCount: 2,
    phone: '095-678-9012'
  }
];

// ข้อมูลงานที่โพสต์จำลอง
export const mockJobs = [
  {
    id: 1,
    title: 'วิศวกรซอฟต์แวร์ (Senior)',
    company: 'บริษัท เทคโนโลยี จำกัด',
    companyId: 3,
    category: 'เทคโนโลยี',
    location: 'กรุงเทพมหานคร',
    type: 'full-time', // full-time, part-time, freelance
    salary: '40,000-60,000',
    status: 'active', // active, pending, closed
    postedDate: '2024-06-01',
    applicationCount: 23,
    description: 'ต้องการวิศวกรซอฟต์แวร์ที่มีประสบการณ์ในการพัฒนา Web Application',
    requirements: 'มีประสบการณ์อย่างน้อย 3 ปี'
  },
  {
    id: 2,
    title: 'นักการตลาดดิจิทัล',
    company: 'บริษัท การตลาด ดี จำกัด',
    companyId: 5,
    category: 'การตลาด',
    location: 'กรุงเทพมหานคร',
    type: 'full-time',
    salary: '30,000-45,000',
    status: 'active',
    postedDate: '2024-06-10',
    applicationCount: 45,
    description: 'รับสมัครนักการตลาดดิจิทัลที่มีทักษะด้าน SEO, SEM, และ Social Media',
    requirements: 'มีประสบการณ์อย่างน้อย 2 ปี'
  },
  {
    id: 3,
    title: 'นักพัฒนาเว็บไซต์',
    company: 'บริษัท ไอที โซลูชั่น จำกัด',
    companyId: 8,
    category: 'เทคโนโลยี',
    location: 'กรุงเทพมหานคร',
    type: 'full-time',
    salary: '35,000-50,000',
    status: 'pending',
    postedDate: '2024-06-15',
    applicationCount: 12,
    description: 'รับสมัครนักพัฒนาเว็บไซต์ที่ชำนาญ React และ Node.js',
    requirements: 'มีประสบการณ์อย่างน้อย 1-2 ปี'
  },
  {
    id: 4,
    title: 'ผู้จัดการฝ่ายขาย',
    company: 'บริษัท การตลาด ดี จำกัด',
    companyId: 5,
    category: 'การขาย',
    location: 'กรุงเทพมหานคร',
    type: 'full-time',
    salary: '45,000-70,000',
    status: 'active',
    postedDate: '2024-06-08',
    applicationCount: 34,
    description: 'รับสมัครผู้จัดการฝ่ายขายที่มีภาวะผู้นำและทักษะการเจรจาต่อรอง',
    requirements: 'มีประสบการณ์อย่างน้อย 5 ปี'
  },
  {
    id: 5,
    title: 'นักวิเคราะห์ข้อมูล',
    company: 'บริษัท เทคโนโลยี จำกัด',
    companyId: 3,
    category: 'เทคโนโลยี',
    location: 'กรุงเทพมหานคร',
    type: 'full-time',
    salary: '38,000-55,000',
    status: 'closed',
    postedDate: '2024-05-20',
    applicationCount: 67,
    description: 'รับสมัครนักวิเคราะห์ข้อมูลที่มีทักษะ SQL, Python และ Data Visualization',
    requirements: 'มีประสบการณ์อย่างน้อย 2-3 ปี'
  },
  {
    id: 6,
    title: 'ผู้ออกแบบกราฟิก',
    company: 'บริษัท การตลาด ดี จำกัด',
    companyId: 5,
    category: 'ออกแบบ',
    location: 'กรุงเทพมหานคร',
    type: 'full-time',
    salary: '28,000-40,000',
    status: 'active',
    postedDate: '2024-06-12',
    applicationCount: 28,
    description: 'รับสมัครผู้ออกแบบกราฟิกที่ชำนาญ Adobe Creative Suite',
    requirements: 'มีประสบการณ์อย่างน้อย 1-2 ปี'
  },
  {
    id: 7,
    title: 'ผู้จัดการโครงการ',
    company: 'บริษัท เทคโนโลยี จำกัด',
    companyId: 3,
    category: 'บริหารจัดการ',
    location: 'กรุงเทพมหานคร',
    type: 'full-time',
    salary: '50,000-80,000',
    status: 'active',
    postedDate: '2024-06-14',
    applicationCount: 19,
    description: 'รับสมัครผู้จัดการโครงการที่มีประสบการณ์ในการบริหารทีม',
    requirements: 'มีประสบการณ์อย่างน้อย 5 ปี'
  },
  {
    id: 8,
    title: 'นักพัฒนาแอปพลิเคชัน',
    company: 'บริษัท ไอที โซลูชั่น จำกัด',
    companyId: 8,
    category: 'เทคโนโลยี',
    location: 'กรุงเทพมหานคร',
    type: 'full-time',
    salary: '38,000-58,000',
    status: 'active',
    postedDate: '2024-06-16',
    applicationCount: 31,
    description: 'รับสมัครนักพัฒนาแอปพลิเคชันมือถือ (iOS/Android)',
    requirements: 'มีประสบการณ์อย่างน้อย 2 ปี'
  },
  {
    id: 9,
    title: 'วิศวกรโยธา',
    company: 'บริษัท ก่อสร้าง เจริญ จำกัด',
    companyId: 11,
    category: 'วิศวกรรม',
    location: 'กรุงเทพมหานคร, ปริมณฑล',
    type: 'full-time',
    salary: '35,000-55,000',
    status: 'active',
    postedDate: '2024-06-18',
    applicationCount: 15,
    description: 'รับสมัครวิศวกรโยธาสำหรับงานก่อสร้างอาคาร',
    requirements: 'มีใบอนุญาตประกอบวิชาชีพ'
  },
  {
    id: 10,
    title: 'เจ้าหน้าที่ฝ่ายบุคคล (HR)',
    company: 'บริษัท การตลาด ดี จำกัด',
    companyId: 5,
    category: 'ทรัพยากรบุคคล',
    location: 'กรุงเทพมหานคร',
    type: 'full-time',
    salary: '30,000-42,000',
    status: 'active',
    postedDate: '2024-06-17',
    applicationCount: 22,
    description: 'รับสมัคร HR ที่มีประสบการณ์ด้าน Recruitment และ Employee Relations',
    requirements: 'มีประสบการณ์อย่างน้อย 2 ปี'
  }
];

// ข้อมูลเรซูเม่จำลอง
export const mockResumes = [
  {
    id: 1,
    userId: 1,
    ownerName: 'สมชาย ใจดี',
    title: 'Full Stack Developer',
    status: 'approved', // approved, pending, rejected
    createdDate: '2024-06-05',
    updatedDate: '2024-06-10',
    viewCount: 156,
    downloadCount: 23,
    template: 'Modern',
    summary: 'นักพัฒนาซอฟต์แวร์ที่มีประสบการณ์ 5 ปี'
  },
  {
    id: 2,
    userId: 2,
    ownerName: 'สมหญิง รักสวย',
    title: 'Marketing Specialist',
    status: 'approved',
    createdDate: '2024-06-08',
    updatedDate: '2024-06-08',
    viewCount: 89,
    downloadCount: 12,
    template: 'Classic',
    summary: 'ผู้เชี่ยวชาญด้านการตลาดดิจิทัล'
  },
  {
    id: 3,
    userId: 4,
    ownerName: 'นายพิชัย มั่งคั่ง',
    title: 'Sales Manager',
    status: 'pending',
    createdDate: '2024-06-15',
    updatedDate: '2024-06-15',
    viewCount: 34,
    downloadCount: 5,
    template: 'Professional',
    summary: 'ผู้จัดการฝ่ายขายที่มีผลงานโดดเด่น'
  },
  {
    id: 4,
    userId: 6,
    ownerName: 'นางสาวกานต์ สวยงาม',
    title: 'Graphic Designer',
    status: 'approved',
    createdDate: '2024-06-10',
    updatedDate: '2024-06-12',
    viewCount: 112,
    downloadCount: 18,
    template: 'Creative',
    summary: 'นักออกแบบกราฟิกที่สร้างสรรค์'
  },
  {
    id: 5,
    userId: 7,
    ownerName: 'คุณสุชาติ ทันสมัย',
    title: 'Data Analyst',
    status: 'rejected',
    createdDate: '2024-06-12',
    updatedDate: '2024-06-13',
    viewCount: 45,
    downloadCount: 3,
    template: 'Modern',
    summary: 'นักวิเคราะห์ข้อมูลเชิงลึก',
    rejectionReason: 'ข้อมูลไม่ครบถ้วน'
  },
  {
    id: 6,
    userId: 9,
    ownerName: 'นายวิชัย ประสบผล',
    title: 'Project Manager',
    status: 'approved',
    createdDate: '2024-06-14',
    updatedDate: '2024-06-14',
    viewCount: 78,
    downloadCount: 15,
    template: 'Professional',
    summary: 'ผู้จัดการโครงการที่มีประสบการณ์'
  },
  {
    id: 7,
    userId: 10,
    ownerName: 'นางสาวมณี เพชรงาม',
    title: 'UX/UI Designer',
    status: 'pending',
    createdDate: '2024-06-16',
    updatedDate: '2024-06-16',
    viewCount: 52,
    downloadCount: 8,
    template: 'Creative',
    summary: 'นักออกแบบ UX/UI ที่ใส่ใจผู้ใช้'
  },
  {
    id: 8,
    userId: 12,
    ownerName: 'คุณอรุณ รุ่งเรือง',
    title: 'Software Engineer',
    status: 'approved',
    createdDate: '2024-06-18',
    updatedDate: '2024-06-18',
    viewCount: 63,
    downloadCount: 11,
    template: 'Modern',
    summary: 'วิศวกรซอฟต์แวร์มืออาชีพ'
  }
];

// ข้อมูลประเภทผู้ใช้ (สำหรับกราฟ)
export const userTypeStats = [
  { type: 'ผู้หางาน', count: 923 },
  { type: 'องค์กร', count: 322 }
];

// ข้อมูลกิจกรรมล่าสุด (สำหรับแสดงใน Dashboard)
export const recentActivities = [
  {
    id: 1,
    type: 'user_register',
    message: 'สมชาย ใจดี ลงทะเบียนเป็นสมาชิกใหม่',
    timestamp: '2024-06-20 14:30'
  },
  {
    id: 2,
    type: 'job_post',
    message: 'บริษัท เทคโนโลยี จำกัด โพสต์งาน "วิศวกรซอฟต์แวร์"',
    timestamp: '2024-06-20 13:15'
  },
  {
    id: 3,
    type: 'resume_create',
    message: 'สมหญิง รักสวย สร้างเรซูเม่ใหม่',
    timestamp: '2024-06-20 11:45'
  },
  {
    id: 4,
    type: 'application',
    message: 'นายพิชัย มั่งคั่ง สมัครงาน "ผู้จัดการฝ่ายขาย"',
    timestamp: '2024-06-20 10:20'
  }
];
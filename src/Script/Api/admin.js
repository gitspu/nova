// src/shared/admin.js

// จำลองการเรียก API ด้วยการหน่วงเวลา
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

// ข้อมูล Mock สำหรับสถิติ Dashboard
const mockDashboardStats = {
  totalUsers: 1257,
  pending: 45,
  verifiedToday: 18,
  flagged: 12,
};

// ข้อมูล Mock สำหรับรายการผู้ใช้
const mockUsers = [
  {
    id: 1,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    status: "pending",
    registeredAt: "2025-11-19",
    lastActiveAt: "2025-11-21",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john.smith@example.com",
    status: "pending",
    registeredAt: "2025-11-19",
    lastActiveAt: "2025-11-21",
  },
  {
    id: 3,
    name: "Alex Lee",
    email: "alex.lee@example.com",
    status: "verified",
    registeredAt: "2025-11-10",
    lastActiveAt: "2025-11-20",
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    status: "flagged",
    registeredAt: "2025-11-05",
    lastActiveAt: "2025-11-21",
  },
];

// ข้อมูล Mock รายงานรายวัน (7 วัน)
const mockDailyReport7d = [
  { date: "2025-11-15", registrations: 12, verifications: 8, flags: 1 },
  { date: "2025-11-16", registrations: 19, verifications: 12, flags: 3 },
  { date: "2025-11-17", registrations: 7, verifications: 5, flags: 2 },
  { date: "2025-11-18", registrations: 15, verifications: 10, flags: 4 },
  { date: "2025-11-19", registrations: 20, verifications: 14, flags: 5 },
  { date: "2025-11-20", registrations: 14, verifications: 9, flags: 2 },
  { date: "2025-11-21", registrations: 9, verifications: 6, flags: 1 },
];

// ข้อมูล Mock รายงานรายวัน (30 วัน)
const mockDailyReport30d = [
  { date: "2025-10-22", registrations: 10, verifications: 7, flags: 2 },
  { date: "2025-10-23", registrations: 8, verifications: 6, flags: 1 },
  // เพิ่มข้อมูลให้ครบ 30 วัน
];

// ข้อมูล Mock สรุปรายงาน
const mockSummary7d = [
  { label: "Registrations (7d)", value: 97 },
  { label: "Verifications (7d)", value: 64 },
  { label: "Flags (7d)", value: 18 },
];

const mockSummary30d = [
  { label: "Registrations (30d)", value: 412 },
  { label: "Verifications (30d)", value: 320 },
  { label: "Flags (30d)", value: 72 },
];

/**
 * ดึงข้อมูลสถิติ Dashboard
 */
export async function fetchDashboardStats() {
  await delay();
  return mockDashboardStats;
}

/**
 * ดึงรายการผู้ใช้ พร้อมระบบค้นหา กรอง และแบ่งหน้า
 *
 * @param {Object} options - ตัวเลือกการค้นหาและกรอง
 * @param {number} options.page - หน้าปัจจุบัน
 * @param {number} options.pageSize - จำนวนรายการต่อหน้า
 * @param {string} options.searchQuery - คำค้นหา
 * @param {string} options.status - สถานะที่ต้องการกรอง (all, pending, verified, flagged)
 */
export async function fetchUsers({
  page = 1,
  pageSize = 10,
  searchQuery = "",
  status = "all",
} = {}) {
  await delay();

  const query = searchQuery.toLowerCase();

  // กรองตามคำค้นหาและสถานะ
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = `${user.name} ${user.email}`
      .toLowerCase()
      .includes(query);
    const matchesStatus = status === "all" || user.status === status;
    return matchesSearch && matchesStatus;
  });

  // แบ่งหน้าข้อมูล
  const total = filteredUsers.length;
  const startIndex = (page - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

  return {
    users: paginatedUsers,
    total,
    page,
    pageSize,
  };
}

/**
 * ดึงข้อมูลสรุปรายงาน
 *
 * @param {Object} options - ตัวเลือกช่วงเวลา
 * @param {string} options.range - ช่วงเวลา (7d หรือ 30d)
 */
export async function fetchReportsSummary({ range = "7d" } = {}) {
  await delay();
  return range === "30d" ? mockSummary30d : mockSummary7d;
}

/**
 * ดึงข้อมูลรายงานรายวัน
 *
 * @param {Object} options - ตัวเลือกช่วงเวลา
 * @param {string} options.range - ช่วงเวลา (7d หรือ 30d)
 * @param {string} options.startDate - วันที่เริ่มต้น (YYYY-MM-DD)
 * @param {string} options.endDate - วันที่สิ้นสุด (YYYY-MM-DD)
 */
export async function fetchReportsDaily({
  range = "7d",
  startDate,
  endDate,
} = {}) {
  await delay();

  const data = range === "30d" ? mockDailyReport30d : mockDailyReport7d;

  // ถ้าไม่มีการกำหนดช่วงวันที่ คืนข้อมูลทั้งหมด
  if (!startDate && !endDate) return data;

  const fromDate = startDate ? new Date(startDate) : null;
  const toDate = endDate ? new Date(endDate) : null;

  // กรองตามช่วงวันที่
  return data.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate)
    );
  });
}

/**
 * แปลงข้อมูลการลงทะเบียนเป็น Line Chart Dataset
 */
export function mapRegistrationsToLineDataset(dailyData) {
  return {
    labels: dailyData.map((item) => item.date),
    datasets: [
      {
        label: "Registrations",
        data: dailyData.map((item) => item.registrations),
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.2)",
        fill: true,
      },
    ],
  };
}

/**
 * แปลงข้อมูลการยืนยันตัวตนเป็น Bar Chart Dataset
 */
export function mapVerificationsToBarDataset(dailyData) {
  return {
    labels: dailyData.map((item) => item.date),
    datasets: [
      {
        label: "Verifications",
        data: dailyData.map((item) => item.verifications),
        backgroundColor: "#198754",
      },
    ],
  };
}

/**
 * แปลงข้อมูลการรายงานเป็น Line Chart Dataset
 */
export function mapFlagsToLineDataset(dailyData) {
  return {
    labels: dailyData.map((item) => item.date),
    datasets: [
      {
        label: "Flags",
        data: dailyData.map((item) => item.flags),
        borderColor: "#dc3545",
        backgroundColor: "rgba(220,53,69,0.3)",
        fill: true,
      },
    ],
  };
}

/**
 * แปลงข้อมูลสถานะผู้ใช้เป็น Doughnut Chart Dataset
 */
export function mapStatusToDoughnutDataset(stats) {
  return {
    labels: ["Verified", "Pending", "Flagged"],
    datasets: [
      {
        data: [
          stats.totalUsers - stats.pending - stats.flagged,
          stats.pending,
          stats.flagged,
        ],
        backgroundColor: ["#198754", "#ffc107", "#dc3545"],
      },
    ],
  };
}

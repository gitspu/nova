// ===================================================
// ไฟล์: src/Admin/utils/helpers.js
// คำอธิบาย: ฟังก์ชันช่วยเหลือต่างๆ ที่ใช้ซ้ำได้ทั่วทั้งระบบ Admin
// ===================================================
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * แปลงรูปแบบวันที่เป็นภาษาไทย
 * @param {string} dateString - วันที่ในรูปแบบ YYYY-MM-DD
 * @returns {string} - วันที่ในรูปแบบที่อ่านง่าย เช่น "15 มกราคม 2567"
 */
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543; // แปลงเป็นปีพุทธศักราช
  
  return `${day} ${month} ${year}`;
};

/**
 * แปลงรูปแบบวันที่และเวลา
 * @param {string} dateTimeString - วันที่และเวลา
 * @returns {string} - วันที่และเวลาในรูปแบบที่อ่านง่าย
 */
export const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return '-';
  
  const date = new Date(dateTimeString);
  const dateStr = formatDate(dateTimeString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  
  return `${dateStr} เวลา ${hours}:${minutes} น.`;
};

/**
 * จัดรูปแบบตัวเลขเงินเป็นภาษาไทย
 * @param {number|string} amount - จำนวนเงิน
 * @returns {string} - ตัวเลขเงินที่จัดรูปแบบแล้ว เช่น "50,000"
 */
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '-';
  
  return new Intl.NumberFormat('th-TH').format(amount);
};

/**
 * จัดรูปแบบช่วงเงินเดือน
 * @param {string} salaryRange - ช่วงเงินเดือน เช่น "40,000-60,000"
 * @returns {string} - ช่วงเงินเดือนพร้อมหน่วย เช่น "40,000-60,000 บาท"
 */
export const formatSalaryRange = (salaryRange) => {
  if (!salaryRange) return '-';
  return `${salaryRange} บาท`;
};

/**
 * แสดง Badge สถานะพร้อมสีและข้อความ
 * @param {string} status - สถานะ (active, inactive, pending, approved, rejected, closed)
 * @returns {object} - ข้อมูล class และ text ของ Badge
 */
export const getStatusBadge = (status) => {
  const statusConfig = {
    active: { 
      class: 'success', 
      text: 'เปิดใช้งาน',
      icon: '✓'
    },
    inactive: { 
      class: 'secondary', 
      text: 'ไม่ใช้งาน',
      icon: '○'
    },
    pending: { 
      class: 'warning', 
      text: 'รอตรวจสอบ',
      icon: '⏳'
    },
    approved: { 
      class: 'success', 
      text: 'อนุมัติแล้ว',
      icon: '✓'
    },
    rejected: { 
      class: 'danger', 
      text: 'ปฏิเสธ',
      icon: '✗'
    },
    closed: { 
      class: 'dark', 
      text: 'ปิดรับสมัคร',
      icon: '✗'
    }
  };
  
  return statusConfig[status] || { 
    class: 'secondary', 
    text: status,
    icon: '○'
  };
};

/**
 * แสดง Badge ประเภทผู้ใช้
 * @param {string} type - ประเภท (jobseeker, company)
 * @returns {object} - ข้อมูล class และ text ของ Badge
 */
export const getUserTypeBadge = (type) => {
  const typeConfig = {
    jobseeker: {
      class: 'info',
      text: 'ผู้หางาน',
      icon: '👤'
    },
    company: {
      class: 'primary',
      text: 'องค์กร',
      icon: '🏢'
    }
  };
  
  return typeConfig[type] || { 
    class: 'secondary', 
    text: type,
    icon: '?'
  };
};

/**
 * คำนวณจำนวนวันที่ผ่านมา
 * @param {string} dateString - วันที่
 * @returns {string} - จำนวนวันที่ผ่านมา เช่น "5 วันที่แล้ว"
 */
export const getTimeAgo = (dateString) => {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'วันนี้';
  if (diffDays === 1) return 'เมื่อวาน';
  if (diffDays < 7) return `${diffDays} วันที่แล้ว`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} สัปดาห์ที่แล้ว`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} เดือนที่แล้ว`;
  
  return `${Math.floor(diffDays / 365)} ปีที่แล้ว`;
};

/**
 * กรองข้อมูลตามช่วงวันที่
 * @param {array} data - ข้อมูลทั้งหมด
 * @param {string} dateField - ชื่อฟิลด์วันที่ที่ต้องการกรอง (เช่น 'joinDate', 'postedDate', 'createdDate')
 * @param {string} filter - ประเภทการกรอง ('today', 'week', 'month', 'all')
 * @returns {array} - ข้อมูลที่ถูกกรองตามเงื่อนไข
 */
export const filterByDate = (data, dateField, filter) => {
  if (!data || data.length === 0) return [];
  if (filter === 'all') return data;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  switch (filter) {
    case 'today':
      // กรองเฉพาะวันนี้
      return data.filter(item => {
        const itemDate = new Date(item[dateField]);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === today.getTime();
      });

    case 'week':
      // กรอง 7 วันที่ผ่านมา
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return data.filter(item => {
        const itemDate = new Date(item[dateField]);
        return itemDate >= weekAgo && itemDate <= today;
      });

    case 'month':
      // กรองเฉพาะเดือนนี้
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      endOfMonth.setHours(23, 59, 59, 999);
      return data.filter(item => {
        const itemDate = new Date(item[dateField]);
        return itemDate >= startOfMonth && itemDate <= endOfMonth;
      });

    default:
      return data;
  }
};

/**
 * ตัดข้อความให้สั้นลง
 * @param {string} text - ข้อความต้นฉบับ
 * @param {number} maxLength - ความยาวสูงสุด
 * @returns {string} - ข้อความที่ถูกตัด
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '-';
  if (text.length <= maxLength) return text;
  
  return `${text.substring(0, maxLength)}...`;
};

/**
 * ตรวจสอบอีเมลว่าถูกต้องหรือไม่
 * @param {string} email - อีเมล
 * @returns {boolean} - true ถ้าอีเมลถูกต้อง
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * ตรวจสอบเบอร์โทรศัพท์ว่าถูกต้องหรือไม่
 * @param {string} phone - เบอร์โทรศัพท์
 * @returns {boolean} - true ถ้าเบอร์โทรศัพท์ถูกต้อง
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  return phoneRegex.test(phone);
};

/**
 * ฟอร์แมตเบอร์โทรศัพท์
 * @param {string} phone - เบอร์โทรศัพท์
 * @returns {string} - เบอร์โทรศัพท์ที่ฟอร์แมตแล้ว
 */
export const formatPhone = (phone) => {
  if (!phone) return '-';
  
  // ลบตัวอักษรที่ไม่ใช่ตัวเลข
  const cleaned = phone.replace(/\D/g, '');
  
  // ฟอร์แมตเป็น XXX-XXX-XXXX
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
};

/**
 * คำนวณเปอร์เซ็นต์การเติบโต
 * @param {number} current - ค่าปัจจุบัน
 * @param {number} previous - ค่าก่อนหน้า
 * @returns {string} - เปอร์เซ็นต์การเติบโต เช่น "+12%"
 */
export const calculateGrowthPercentage = (current, previous) => {
  if (!previous || previous === 0) return '0%';
  
  const growth = ((current - previous) / previous) * 100;
  const sign = growth > 0 ? '+' : '';
  
  return `${sign}${growth.toFixed(1)}%`;
};

/**
 * สร้างสีสุ่มสำหรับกราฟ
 * @param {number} index - ดัชนีของสี
 * @returns {string} - รหัสสี hex
 */
export const getChartColor = (index) => {
  const colors = [
    '#0d6efd', // น้ำเงิน
    '#198754', // เขียว
    '#ffc107', // เหลือง
    '#dc3545', // แดง
    '#6f42c1', // ม่วง
    '#fd7e14', // ส้ม
    '#20c997', // เขียวอ่อน
    '#d63384'  // ชมพู
  ];
  
  return colors[index % colors.length];
};

/**
 * เรียงลำดับข้อมูลตามคอลัมน์
 * @param {array} data - ข้อมูลที่ต้องการเรียง
 * @param {string} column - ชื่อคอลัมน์
 * @param {string} direction - ทิศทาง (asc, desc)
 * @returns {array} - ข้อมูลที่เรียงแล้ว
 */
export const sortData = (data, column, direction = 'asc') => {
  return [...data].sort((a, b) => {
    const aValue = a[column];
    const bValue = b[column];
    
    if (typeof aValue === 'string') {
      return direction === 'asc' 
        ? aValue.localeCompare(bValue, 'th')
        : bValue.localeCompare(aValue, 'th');
    }
    
    return direction === 'asc' 
      ? aValue - bValue 
      : bValue - aValue;
  });
};

/**
 * กรองข้อมูลตามคำค้นหา
 * @param {array} data - ข้อมูลทั้งหมด
 * @param {string} searchTerm - คำค้นหา
 * @param {array} searchFields - ฟิลด์ที่ต้องการค้นหา
 * @returns {array} - ข้อมูลที่ถูกกรอง
 */
export const filterData = (data, searchTerm, searchFields) => {
  if (!searchTerm) return data;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  return data.filter(item => {
    return searchFields.some(field => {
      const value = item[field];
      if (!value) return false;
      
      return value.toString().toLowerCase().includes(lowerSearchTerm);
    });
  });
};

/**
 * แบ่งข้อมูลตามหน้า (Pagination)
 * @param {array} data - ข้อมูลทั้งหมด
 * @param {number} currentPage - หน้าปัจจุบัน
 * @param {number} itemsPerPage - จำนวนรายการต่อหน้า
 * @returns {object} - ข้อมูลที่แบ่งหน้าและข้อมูล pagination
 */
export const paginateData = (data, currentPage, itemsPerPage) => {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
};

/**
 * ดาวน์โหลดข้อมูลเป็นไฟล์ CSV
 * @param {array} data - ข้อมูลที่ต้องการดาวน์โหลด
 * @param {string} filename - ชื่อไฟล์
 */
export const downloadCSV = (data, filename = 'data.csv') => {
  if (!data || data.length === 0) return;
  
  // สร้าง header
  const headers = Object.keys(data[0]).join(',');
  
  // สร้าง rows
  const rows = data.map(item => 
    Object.values(item).map(value => 
      `"${value}"`
    ).join(',')
  );
  
  // รวม header และ rows
  const csv = [headers, ...rows].join('\n');
  
  // สร้าง Blob และดาวน์โหลด
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * ดาวน์โหลดข้อมูลเป็นไฟล์ PDF
 * @param {array} data - ข้อมูลที่ต้องการดาวน์โหลด
 * @param {string} filename - ชื่อไฟล์
 */
export const downloadPdf = (data, filename = 'data.pdf') =>
{
  const blob = new Blob([], { type: 'application/pdf' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
/**
 * คัดลอกข้อความไปยัง Clipboard
 * @param {string} text - ข้อความที่ต้องการคัดลอก
 * @returns {Promise} - Promise ที่ resolve เมื่อคัดลอกสำเร็จ
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};
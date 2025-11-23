/**
 * แปลงข้อมูลเป็นไฟล์ CSV และดาวน์โหลด
 *
 * @param {Array<Object>} data - ข้อมูลที่ต้องการ export
 * @param {string} filename - ชื่อไฟล์ที่ต้องการ (default: "export.csv")
 */
export function exportToCSV(data, filename = "export.csv") {
  // ตรวจสอบว่ามีข้อมูลหรือไม่
  if (!data || data.length === 0) return;

  // ดึง header จาก object แรก
  const headers = Object.keys(data[0]);

  // สร้าง CSV content โดยรวม header กับ rows
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((header) => JSON.stringify(row[header] ?? "")).join(",")
    ),
  ].join("\n");

  // สร้าง Blob object สำหรับไฟล์ CSV
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  // สร้าง link element และ trigger download
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // ทำความสะอาด URL object
  URL.revokeObjectURL(url);
}

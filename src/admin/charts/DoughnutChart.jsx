import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ลงทะเบียน Chart.js components และ plugins
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * แสดงกราฟโดนัท (Doughnut Chart)
 *
 * @param {Object} data - ข้อมูลกราฟ (labels และ datasets)
 * @param {Object} options - ตัวเลือกเพิ่มเติมสำหรับกำหนด style และ behavior
 */
export default function DoughnutChart({ data, options }) {
  return (
    <div style={{ height: "100%", position: "relative", width: "100%" }}>
      <Doughnut
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          ...options,
        }}
      />
    </div>
  );
}

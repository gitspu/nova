import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// ลงทะเบียน Chart.js components และ plugins
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

/**
 * แสดงกราฟแท่ง (Bar Chart)
 *
 * @param {Object} data - ข้อมูลกราฟ (labels และ datasets)
 * @param {Object} options - ตัวเลือกเพิ่มเติมสำหรับกำหนด style และ behavior
 */
export default function BarChart({ data, options }) {
  return (
    <div style={{ height: "100%", position: "relative", width: "100%" }}>
      <Bar
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

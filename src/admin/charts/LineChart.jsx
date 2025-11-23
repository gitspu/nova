import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

// ลงทะเบียน Chart.js components และ plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

/**
 * แสดงกราฟเส้น (Line Chart)
 *
 * @param {Object} data - ข้อมูลกราฟ (labels และ datasets)
 * @param {Object} options - ตัวเลือกเพิ่มเติมสำหรับกำหนด style และ behavior
 */
export default function LineChart({ data, options }) {
  return (
    <div style={{ height: "100%", position: "relative", width: "100%" }}>
      <Line
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

import {
  Bar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Analytics({ result }) {

  if (!result) return null;

  const latencyData = {
    labels: [
      "Zero Shot",
      "Role Based",
      "Few Shot",
      "CoT"
    ],
    datasets: [
      {
        label: "Latency (seconds)",
        data: [
          result.zero_shot.latency,
          result.role_based.latency,
          result.few_shot.latency,
          result.cot.latency
        ]
      }
    ]
  };

  const wordCountData = {
    labels: [
      "Zero Shot",
      "Role Based",
      "Few Shot",
      "CoT"
    ],
    datasets: [
      {
        label: "Word Count",
        data: [
          result.zero_shot.word_count,
          result.role_based.word_count,
          result.few_shot.word_count,
          result.cot.word_count
        ]
      }
    ]
  };

  return (
    <div style={{ marginTop: "30px" }}>

      <h2>Latency Comparison</h2>

      <Bar data={latencyData} />

      <h2 style={{ marginTop: "30px" }}>
        Word Count Comparison
      </h2>

      <Bar data={wordCountData} />

    </div>
  );
}

export default Analytics;
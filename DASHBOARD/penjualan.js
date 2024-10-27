// Data Penjualan Selama 1 Tahun
const monthlySalesData = [
  { bulan: "Januari", total: 15000000 },
  { bulan: "Februari", total: 20000000 },
  { bulan: "Maret", total: 25000000 },
  { bulan: "April", total: 22000000 },
  { bulan: "Mei", total: 30000000 },
  { bulan: "Juni", total: 28000000 },
  { bulan: "Juli", total: 32000000 },
  { bulan: "Agustus", total: 27000000 },
  { bulan: "September", total: 35000000 },
  { bulan: "Oktober", total: 40000000 },
  { bulan: "November", total: 45000000 },
  { bulan: "Desember", total: 50000000 },
];

// Memuat Data ke Tabel
window.onload = () => {
  const tableBody = document.getElementById("salesTableBody");
  monthlySalesData.forEach((data, index) => {
    const row = `<tr>
        <td>${index + 1}</td>
        <td>${data.bulan}</td>
        <td>Rp${data.total.toLocaleString()}</td>
      </tr>`;
    tableBody.innerHTML += row;
  });

  // Inisialisasi Chart.js
  initSalesChart();
};

// Fungsi untuk Inisialisasi Diagram Penjualan
function initSalesChart() {
  const ctx = document.getElementById("annualSalesChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: monthlySalesData.map((data) => data.bulan),
      datasets: [
        {
          label: "Penjualan Bulanan (Rp)",
          data: monthlySalesData.map((data) => data.total),
          backgroundColor: createGradient(
            ctx,
            "rgba(75, 192, 192, 0.2)",
            "rgba(75, 192, 192, 0)"
          ),
          borderColor: "rgba(75, 192, 192, 1)",
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
          pointBorderColor: "#fff",
          pointHoverRadius: 6,
          pointRadius: 4,
          borderWidth: 2,
          fill: true,
          tension: 0.3, // Membuat garis lebih halus
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => `Rp${context.raw.toLocaleString()}`, // Format tooltip dengan rupiah
          },
        },
        legend: {
          display: true,
          position: "top", // Pindahkan legend ke atas
          labels: {
            font: {
              size: 14, // Ukuran font legend lebih besar
            },
          },
        },
      },
      animation: {
        duration: 1500, // Animasi halus
        easing: "easeInOutQuart", // Transisi lembut
      },
      scales: {
        x: {
          grid: {
            display: false, // Hilangkan grid pada sumbu X
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(200, 200, 200, 0.3)", // Grid lebih halus
            borderDash: [5, 5], // Garis putus-putus
          },
          ticks: {
            callback: (value) => `Rp${value.toLocaleString()}`, // Format label sumbu Y
          },
        },
      },
    },
  });
}

// Fungsi untuk Membuat Gradasi Warna pada Grafik
function createGradient(ctx, colorStart, colorEnd) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);
  return gradient;
}

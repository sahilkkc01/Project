export function printreport_semen(data) {
  // Create a new window or tab
  const printWindow = window.open("", "", "height=600,width=800");

  // Add content to the new window
  printWindow.document.open();
  printWindow.document.write(`
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.container {
  padding: 20px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-section {
  font-size: 14px;
}

.left-section p {
  margin-bottom: 5px;
}

.left-section span {
  font-weight: bold;
}

.logo-section {
  text-align: center;
}

.logo-section img {
  width: 350px;
  height: auto;
}

.right-section {
  text-align: right;
  font-size: 14px;
}

.right-section p {
  margin-bottom: 5px;
}

.right-section strong {
  font-size: 16px;
  font-weight: bold;
}

.details-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.details-row {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding: 10px 0;
}

.details-left,
.details-right {
  flex: 1;
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.details-left p,
.details-right p {
  font-size: 16px;
}

.details-left span,
.details-right span {
  font-weight: bold;
  margin-left: 10px;
  color: #646363;
  border-bottom: #8d8b8b 1px solid;
  flex: 1;
}

.health-table-section {
  margin-top: 20px;
}

.sample-info-left,
.sample-info-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.sample-info-left p,
.sample-info-right p {
  font-size: 15px;
  color: #444;
  /* margin-bottom: 5px; */
  font-weight: 600;
}

.sample-info-left span,
.sample-info-right span {
  margin-left: 10px;
  font-weight: 500;
  color: #646363;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
td {
  border: 1px solid black;
  padding: 5px;
  text-align: left;
}
table th {
  background-color: #f1f1f1;
}

.chart-container {
  width: 100%;
  max-width: 350px;
  margin: auto;
}
canvas {
  margin-bottom: 40px;
}

.bar-chart {
  height: 400px;
  margin-bottom: 0;
}

.doctor-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 60px 0;
  p {
    font-weight: 500;
  }
}

    
    </style>
  </head>
  <body>
    <div class="container">
      <!-----------Header---------->
      <header class="header-container">
        <div class="left-section">
          <p>Date: <span>14-12-2023 11:52 AM</span></p>
          <p>Reference No.: <span>20231214ZVA0000002</span></p>
        </div>
        <div class="logo-section">
          <img src="../images/logo_copy.png" alt="lifelinkr Logo" />
        </div>
        <div class="right-section">
          <p><strong>Zivia Fertility Clinics - Jaipur</strong></p>
          <p>Second floor, 14, Gautam Marg,</p>
          <p>Jaipur, RAJASTHAN 302021</p>
          <p>Phone No.: 8976515454</p>
        </div>
      </header>

      <!-------Patient Details Section-------->
      <div class="details-section">
        <div class="details-row">
          <div class="details-left">
            <p>Patient Name:</p>
            <span>Rahul Singh</span>
          </div>
          <div class="details-right">
            <p>Patient Id:</p>
            <span>PI41223ZVA0000006/2</span>
          </div>
        </div>
        <div class="details-row">
          <div class="details-left">
            <p>Age:</p>
            <span>35</span>
          </div>
          <div class="details-right">
            <p>Test Type:</p>
            <span>Andrology</span>
          </div>
        </div>
      </div>

      <!-------Health Table---------->
      <div class="health-table-section">
        <table>
          <tr>
            <th colspan="2" style="width: 50%">Sample Info</th>
            <th colspan="2" style="width: 50%"></th>
          </tr>
          <tr>
            <td colspan="2">
              <div class="sample-info-left">
                <p>Sample Taken Date: <span>14-12-2023</span></p>
                <p>Sample Taken Time: <span>11:49 AM</span></p>
                <p>Sample Receiving Date: <span>14-12-2023</span></p>
                <p>Sample Receiving Time: <span>11:49 AM</span></p>
                <p>Sample Tested: <span>Retrograde</span></p>
                <p>Sample Collection At: <span>Onsite</span></p>
                <p>Any Spillage Reported: <span>No</span></p>
              </div>
            </td>
            <td colspan="2">
              <div class="sample-info-right">
                <p>Liquefaction: <span>Normal</span></p>
                <p>Liquefaction Time: <span>3 min</span></p>
                <p>Viscosity: <span>HIGH</span></p>
                <p>Abstinence: <span>13-16 Days</span></p>
                <p>Volume(mL): <span>34.00</span></p>
                <p>Ph: <span>2</span></p>
                <p>Visual Appearance: <span>Greyish White</span></p>
              </div>
            </td>
          </tr>

          <colgroup>
            <col style="width: 40%" />
            <col style="width: 10%" />
            <col style="width: 10%" />
            <col style="width: 40%" />
          </colgroup>
          <tr>
            <th>Parameter</th>
            <th>Result</th>
            <th>Ref. Value</th>
            <th>Analysis</th>
          </tr>

          <tr>
            <td>sperm concentration (million/ml)/</td>
            <td>34.00</td>
            <td>>=42</td>
            <td rowspan="0">
              <div class="chart-container">
                <canvas class="pie-chart" id="pieChart"></canvas>

                <canvas class="bar-chart" id="barChart"></canvas>
              </div>
            </td>
          </tr>

          <tr>
            <th>Motility</th>
            <th>Result</th>
            <th>Ref. Value</th>
          </tr>

          <tr>
            <td>Sperm Motility Total PR+NPR(%)</td>
            <td>${data.total_motile_Prog}</td>
            <td>>=42</td>
          </tr>

          <tr>
            <td>Progressive PR(%)</td>
            <td>58.00</td>
            <td>>=42</td>
          </tr>
          <tr>
            <td>Rapid Progressive(%)</td>
            <td>${data.rapid_progressive}</td>
            <td>>=42</td>
          </tr>
          <tr>
            <td>Slow Progressive(%)</td>
            <td>${data.slow_progressive}</td>
            <td>>=42</td>
          </tr>
          <tr>
            <td>Non Progressive NPR(%)</td>
            <td>${data.non_progressive}</td>
            <td>>=42</td>
          </tr>
          <tr>
            <td>Immotile IM</td>
            <td>${data.immotile}</td>
            <td>>=42</td>
          </tr>

          <tr>
            <th>Morphology</th>
            <th>Result</th>
            <th>Ref. Value</th>
          </tr>
          <tr>
            <td>Normal Forms (%)</td>
            <td>${data.normal_in}</td>
            <td>>=4</td>
          </tr>
          <tr>
            <td>Head Defects(%)</td>
            <td>${data.head_defects_in}</td>
            <td>>=4</td>
          </tr>
          <tr>
            <td>Mid Piece Defects (%)</td>
            <td>${data.mid_piece_defects_in}</td>
            <td>Ref. Value</td>
          </tr>

          <tr>
            <td>Tail Defects (%)</td>
            <td>${data.tail_defects_in}</td>
            <td></td>
          </tr>

          <tr>
            <th>Total Ejaculation</th>
            <th>Result</th>
            <th>Ref. Value</th>
          </tr>

          <tr>
            <td>Total Sperm Count (million/ejaculate)</td>
            <td>${data.total_sperm}</td>
            <td></td>
          </tr>
          <tr>
            <td>Motile Sperm (million/ejaculate)</td>
            <td>${data.total_motile_Prog}</td>
            <td></td>
          </tr>
          <tr>
            <td>Morphologically Normal Sperm</td>
            <td>${data.normal_prog_motile}</td>
            <td></td>
          </tr>

          <tr>
            <th>Additional Information</th>
            <th>Result</th>
            <th>Ref. Value</th>
          </tr>
          <tr>
            <td>Debris</td>
            <td>30.00</td>
            <td></td>
          </tr>
          <tr>
            <td>Round Cells (million/ml)</td>
            <td>30.00</td>
            <td></td>
          </tr>
          <tr>
            <td>Agglutination</td>
            <td>30.00</td>
            <td></td>
          </tr>
          <tr>
            <td>Aggregration</td>
            <td>30.00</td>
            <td></td>
          </tr>
          <tr>
            <td>Fructose</td>
            <td>30.00</td>
            <td></td>
          </tr>
          <tr>
            <td>
              Peroxidase-Positive Cells Concentration(10^6 Per Ml)-Pus Cells
            </td>
            <td>30.00</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="4">
              <b
                >Impression: Normozoospermia with Pyospermia, Hyperspermia add
                free text</b
              >
            </td>
          </tr>

          <tr>
            <td colspan="4">
              <b>Remarks :</b>
            </td>
          </tr>
        </table>
      </div>

      <div class="doctor-name">
        <p>Prepared by: Dr. ABC</p>
        <p>Checked by: Dr. XYZ</p>
      </div>
    </div>

    <script>
      // Bar Graph
      const barCtx = document.getElementById("barChart").getContext("2d");
      const barChart = new Chart(barCtx, {
        type: "bar",
        data: {
          labels: [
            "Normal Forms",
            "Head Defect",
            "Mid Piece Defect",
            "Tail Defect",
          ],
          datasets: [
            {
              label: "Values in percent(%)",
              data: [${parseInt(data.normal_in)}, ${parseInt(
    data.head_defects_in
  )}, ${parseInt(data.mid_piece_defects_in)}, ${parseInt(
    data.tail_defects_in
  )}],
              backgroundColor: [
                "#4CAF50",
                "#2196F3",
                "#FFC107",
                "#FF5722",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              min: 0, // Minimum value for y-axis
              max: 50, // Maximum value for y-axis
              ticks: {
                stepSize: 10, // Interval between ticks
              },
            },
          },
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
            // maintainAspectRatio: false,
        },
      });

      // pie chart
      const pieCtx = document.getElementById("pieChart").getContext("2d");
      const pieChart = new Chart(pieCtx, {
        type: "pie",
        data: {
          labels: [
            "Rapid Progressive",
            "Slow Progressive",
            "Non Progressive",
            "Immotile IM",
          ],
          datasets: [
            {
              label: "",
              data: [${parseInt(data.rapid_progressive)}, ${parseInt(
    data.slow_progressive
  )}, ${parseInt(data.non_progressive)}, ${parseInt(data.immotile)}],
              backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#FF5722"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
            maintainAspectRatio: false,
        },
      });
      const fetchData = () => {};
    </script>
  </body>
</html>

    `);
  printWindow.document.close();

  // Wait for the document to be fully loaded and then trigger the print dialog
  printWindow.onload = function () {
    printWindow.focus(); // Focus on the print window
    printWindow.print(); // Trigger the print dialog
  };

  // Optional: Close the print window after printing
  printWindow.onafterprint = function () {
    printWindow.close();
  };
}
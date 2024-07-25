document.addEventListener("DOMContentLoaded", function() {
    // Ensure areas is an array
    const areas = JSON.parse('<%- JSON.stringify(areas) %>');
    if (!Array.isArray(areas)) {
      console.error('Expected areas to be an array, got:', areas);
      return;
    }
    const labels = areas.map(area => area.clinic_area);
    const data = areas.map(area => area.areasaptcount);

    const languagesData = { 
      labels: labels,
      datasets: [{ 
        data: data, 
        backgroundColor: ['#4ac2b7', '#fac10c', '#fba119', '#f9655e', '#2196f3', '#8585ff'], 
      }], 
    }; 

    const config = { 
      type: 'doughnut', 
      data: languagesData, 
      options: { 
        aspectRatio: 3.75,
        legend: {
          display: true,
          position: 'right'
        }, 
      }, 
    }; 

    const ctx = document.getElementById('programmingLanguagesPieChart').getContext('2d'); 
    new Chart(ctx, config);
  });
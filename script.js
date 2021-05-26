const ctx = document.getElementById('chart').getContext('2d');
      const myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                  label: 'label',
                  data: [12, 19, 3, 5, 2, 3],
                  backgroundColor: 
                      'rgba(255, 99, 132, 0.2)',
                  borderColor: 
                      'rgba(255, 99, 132, 1)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
fetch('http://localhost:3001/api/managerFeedback')
.then(response => response.json())
.then(data => {
    const labels = data.map(item => item.manager);
    const counts = data.map(item => item.count);

    // Initialize the bar chart
    const ctx = document.getElementById('managerFeedbackChart').getContext('2d');
    const managerFeedbackChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Manager Feedback',
                data: counts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        fontSize: 20 // Increase font size
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
    });
})
.catch(error => {
    console.error('Error fetching data:', error);
});


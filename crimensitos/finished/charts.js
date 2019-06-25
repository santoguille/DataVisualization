// Init charts

let pie, line;
function initCharts() {
    pie = new Chart(
        document.querySelector("#a").getContext("2d"),
        {
            type: "pie",
            data: {
                "labels": ["Llegadas", "Salidas"],
                datasets: [
                    {
                        data: [2, 1],
                        backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)']
                    }
                ],
            },
            options: {
                maintainAspectRatio: false
            }
        }
    )
    
    line = new Chart(
        document.querySelector("#b").getContext("2d"),
        {
            type: "line",
            data: {
                "labels": [1, 2, 3, 4, 5, 6, 7],
                datasets: [
                    {
                        label: "Salidas por día",
                        data: [15, 26, 30, 25, 40, 45, 34],
                        lineTension: 0.2
                    }
                ]
            },
            options: {
                maintainAspectRatio: false
            }
        }
    )
    
}


function updatePie(data) {
    pie.data.datasets[0].data = data;
    pie.update();
}

function updateLine() {
    line.data.datasets[0].data = Array.from({length: 7}, () => Math.floor(Math.random() * 100));
    line.update();
}
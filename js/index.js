(function() {
    const apiUrl = 'http://104.154.149.157:8888/';
    let chart = null;

    function getRoutes() {
        $.ajax({
            url: apiUrl + "routes",
            type: 'GET',
            dataType: 'JSON',
            success: (data) => {
                if (data) {
                    addRoutes(data);
                } else {
                    console.log('No data');
                }
            },
            error: (request, status, error) => {
                console.log(error, status, request);
            }
        });
    }

    function addRoutes(routes) {;
        console.log(routes);
        let select = $('#routeSelect');
        for (let i = 0; i < routes.length; i++) {
            let option = $(document.createElement('option'));
            option.value = routes[i].routename;
            option.append(routes[i].routename);
            select.append(option);
        }
        let selectedRoute = select.find(":selected").val();
        getRouteData(selectedRoute);
    }

    function getRouteData(routeName) {
        $.ajax({
            url: apiUrl + "routes/" + routeName,
            type: 'GET',
            dataType: 'JSON',
            success: (data) => {
                if (data) {
                    displayChart(data);
                } else {
                    console.log('No data');
                }
            },
            error: (request, status, error) => {
                console.log(error, status, request);
            }
        });
    }

    function displayChart(data) {
        chartData.data.labels = data.years;
        chartData.data.datasets[0].data = data.crimes;
        chartData.options.title.text = data.name + ': Number of Crimes for School Year';
        chart = new Chart(canvasContext, chartData);
    }

    const canvasContext = $("#chart").get(0).getContext('2d');
    let chartData = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '# of Crimes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1
            }]
        },
        height: 400,
        width: 400,
        options: {
            title: {
                display: true,
                text: 'Number of Crimes for School Year'
            },
            
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of Crimes'
                    },
                    ticks: {
                        beginAtZero:true
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'School Year'
                    },
                    ticks: {
                        beginAtZero:false
                    }
                }]
            },
            responsive: true,

        }
    };

    let submitButton = $('#submitButton');
    submitButton.click(function(event) {
        let select = $("#routeSelect");
        let selectedRoute = select.find(":selected").val();
        getRouteData(selectedRoute);
    });

    getRoutes();
    
    //let chart = new Chart(canvasContext, chartData);
})();
    

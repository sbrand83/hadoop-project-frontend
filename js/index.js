(function() {
    const apiUrl = 'http://40.117.190.191:3000/';
    let dataDiv = $('data-table');
    dataDiv.append($('p'));

    function getData() {
        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'JSON',
            success: (data) => {
                if (data) {
                    // make a table or something with the data, but not sure what the data looks like yet
                } else {
                    console.log('No data');
                }
            },
            error: (request, status, error) => {
                console.log(error, status, request);
            }
        });
    }
})();
    

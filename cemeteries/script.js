document.addEventListener('DOMContentLoaded', function() {
    fetch('austin-cemeteries.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1);
            const tableBody = document.querySelector('#cemeteries-table tbody');

            rows.forEach(row => {
                const columns = row.split(',');
                const tr = document.createElement('tr');

                columns.forEach(column => {
                    const td = document.createElement('td');
                    td.textContent = column;
                    tr.appendChild(td);
                });

                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error fetching the CSV file:', error));
});

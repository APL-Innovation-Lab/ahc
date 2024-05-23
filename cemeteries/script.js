console.log('Loading data...');

document.addEventListener("DOMContentLoaded", function() {
    // Function to load CSV file
    function loadCSV(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText);
            }
        };
        xhr.send();
    }

    // Function to parse CSV data
    function parseCSV(data) {
        const rows = data.split('\n');
        const headers = rows[0].split(',').map(header => header.trim());
        const parsedData = rows.slice(1).map(row => {
            const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(value => value.trim().replace(/^"|"$/g, ''));
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index] !== undefined ? values[index] : '';
                return obj;
            }, {});
        });
        return parsedData;
    }

    // Function to populate table with data
    function populateTable(data) {
        const tableBody = document.querySelector("#cemeteries-table tbody");
        data.forEach(item => {
            const row = document.createElement("tr");
            row.classList.add("oakwood-row");

            const fullName = `${item["firstname"]} ${item["lastname"]} ${item["name_contribution"] ? "(" + item["name_contribution"] + ")" : ""}`;
            const causeOfDeath = `${item["disease"]} ${item["disease_contribution"] ? "(" + item["disease_contribution"] + ")" : ""}`;

            row.innerHTML = `
                <td headers="view-field-lastname-table-column"><strong>${fullName}</strong></td>
                <td headers="view-field-oakwood-date-table-column" class="views-field views-field-field-oakwood-date">${item["date"]}</td>
                <td headers="view-field-yearsmonthsdays-table-column" class="views-field views-field-field-oakwood-date"><span class="field_yearsmonthsdays">${item["yearsmonthsdays"]}</span></td>
                <td headers="view-field-sex-table-column" class="views-field views-field-field-sex"><span class="field_sex">${item["sex"]}</span></td>
                <td headers="view-field-color-table-column" class="views-field views-field-field-sex"><span class="field_ethnicity">${item["color"]}</span></td>
                <td headers="view-field-nativity-table-column" class="views-field views-field-field-nativity">${item["nativity"]}</td>
                <td headers="view-field-disease-table-column" class="views-field views-field-field-disease">${causeOfDeath}</td>
                <td headers="view-field-attendingphysician-table-column" class="views-field views-field-field-attendingphysician">${item["attendingphysician"]}</td>
                <td headers="view-field-whereburied-table-column" class="views-field views-field-field-whereburied">${item["whereburied"]}</td>
                <td headers="view-field-seclotspace-table-column" class="views-field views-field-field-seclotspace">${item["SecLotSpace"]}</td>
                <td headers="view-field-bywhomburied-table-column" class="views-field views-field-field-bywhomburied">${item["bywhomburied"]}</td>
                <td headers="view-field-profession-table-column" class="views-field views-field-field-profession">${item["profession"]}</td>
                <td headers="view-field-remarks-table-column" class="views-field views-field-field-remarks">${item["remarks"]}</td>
            `;
            tableBody.appendChild(row);
        });

        // Apply transformations for age, race/ethnicity, and burial locations
        transformTableData();
    }

    // Function to transform table data
    function transformTableData() {
        let text1 = document.getElementsByClassName('field_yearsmonthsdays');
        for (let i = 0; i < text1.length; i++) {
            let text = text1[i].innerText;
            text = text.replace('000-00-00', 'Blank');
            text = text.replace('N', 'Blank');
            text = text.replace(/(000)-(00)-(\d\d)/, '$3 days');
            text = text.replace(/(000)-(\d\d)-(\d\d)/, '$2 months');
            text = text.replace(/(\d\d\d)-(\d\d)-(\d+)/, '$1 years');
            text = text.replace(/0(\d\d)/, '$1');
            text = text.replace(/0(\d)/g, '$1');
            text = text.replace('/(.*), 1 months, (.*)', '$1, 1 month, $2');
            text = text.replace('1 days', '1 day');
            text = text.replace('1 months', '1 month');
            text = text.replace('/$1 years/', '1 year');
            text1[i].innerText = text;
        }

        let text2 = document.getElementsByClassName('field_ethnicity');
        for (let i = 0; i < text2.length; i++) {
            let text = text2[i].innerText;
            text = text.replace('C', 'African American');
            text = text.replace('N', 'African American');
            text = text.replace('M', 'Mexican');
            text = text.replace('I', 'Native American');
            text = text.replace('W', 'White');
            text2[i].innerText = text;
        }

        let text3 = document.querySelectorAll('.field_whereburied, .field_remarks, .field_seclotspace');
        for (let i = 0; i < text3.length; i++) {
            let text = text3[i].innerText;
            text = text.replace('Mt Calvary', 'Mount Calvary');
            text = text.replace('Mt Cal', 'Mount Calvary');
            text = text.replace(/^State$/, 'State Cemetery');
            text = text.replace(/^Annex$/, 'Oakwood Annex');
            text = text.replace(/Cem$/i, 'Cemetery');
            text = text.replace(/cem\s+/ig, 'Cemetery ');
            text = text.replace(/Col\.? Gr\.?/ig, 'Colored Grounds ');
            text = text.replace(/Col\. Grounds\.?/ig, 'Colored Grounds ');
            text = text.replace(/Stanger grounds?/ig, 'Strangers Grounds ');
            text = text.replace(/Stranger grounds?/ig, 'Strangers Grounds ');
            text = text.replace('Old Strangers Grounds', 'Strangers Grounds');
            text = text.replace(/Me?x\.?\s?Grd?\.?/ig, ' Mexican Grounds');
            text = text.replace('Mexican Groundss', 'Mexican Grounds');
            text = text.replace('Colored Grounds ds.', 'Colored Grounds');
            text = text.replace(/Strng\./, 'Strangers');
            text = text.replace('Grds.', 'Grounds');
            text = text.replace('Old Grds', ' Old Grounds');
            text = text.replace(/^Pauper(?: Gr\.)?$|Pauper Ground$/, 'Pauper Grounds');
            text = text.replace(/^Pauper$/, 'Pauper Grounds');

            text3[i].innerText = text;
        }

        const str = document.querySelectorAll('.oakwood-row strong, .burial_date, .field_sex, .field_ethnicity, .field_birth, .field_cause_of_death, .field_attendingphysician, .field_whereburied, .field_bywhomburied, .field_remarks, .field_seclotspace');
        for (let i = 0; i < str.length; i++) {
            let text = str[i].innerText;
            const str2 = text.charAt(0).toUpperCase() + text.slice(1);
            str[i].innerText = str2;
        }
    }

    // Load CSV and populate table
    loadCSV('austin-cemeteries.csv', function(data) {
        const parsedData = parseCSV(data);
        populateTable(parsedData);
    });
});

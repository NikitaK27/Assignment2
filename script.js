let productsData = [];

function importData() {
    const fileInput = document.getElementById('fileInput');
    const tableContainer = document.getElementById('tableContainer');
    const availableFieldsSelect = document.getElementById('availableFields');
    const displayFieldsSelect = document.getElementById('displayFields');

    const reader = new FileReader();
    reader.onload = function (e) {
        productsData = JSON.parse(e.target.result);
        populateAvailableFields();
        displayData();
    };
    reader.readAsText(fileInput.files[0]);
}

function populateAvailableFields() {
    const availableFieldsSelect = document.getElementById('availableFields');
    const fields = Object.keys(productsData[0]);

    for (const field of fields) {
        const option = document.createElement('option');
        option.value = field;
        option.text = field;
        availableFieldsSelect.add(option);
    }
}

function addSelectedFields() {
    moveOptions('availableFields', 'displayFields');
    displayData();
}

function removeSelectedFields() {
    moveOptions('displayFields', 'availableFields');
    displayData();
}

function moveOptions(sourceId, destinationId) {
    const sourceSelect = document.getElementById(sourceId);
    const destinationSelect = document.getElementById(destinationId);

    for (let i = 0; i < sourceSelect.options.length; i++) {
        const option = sourceSelect.options[i];
        if (option.selected) {
            destinationSelect.add(new Option(option.text, option.value));
            sourceSelect.remove(i);
            i--;
        }
    }
}

function displayData() {
    const tableContainer = document.getElementById('tableContainer');
    const displayFieldsSelect = document.getElementById('displayFields');
    const selectedFields = Array.from(displayFieldsSelect.options).map(option => option.value);

    tableContainer.innerHTML = '';
    const table = document.createElement('table');
    const headerRow = table.insertRow();

    for (const field of selectedFields) {
        const headerCell = headerRow.insertCell();
        headerCell.innerHTML = field;
    }

    const sortedData = productsData.sort((a, b) => b.Popularity - a.Popularity);

    for (const product of sortedData) {
        const row = table.insertRow();

        for (const field of selectedFields) {
            const cell = row.insertCell();
            cell.innerHTML = product[field];
        }
    }

    tableContainer.appendChild(table);
}

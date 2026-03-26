fetch('data/cot.json')
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        document.getElementById('loading').style.display = 'none';
        const tableBody = document.getElementById('table-body');
        data.forEach(row => {
            const tr = document.createElement('tr');
            const formatNum = (num) => parseInt(num).toLocaleString();
            tr.innerHTML = `
                <td>${row.date}</td>
                <td>${formatNum(row.openInterest)}</td>
                <td class="long">${formatNum(row.producerLong)}</td>
                <td class="short">${formatNum(row.producerShort)}</td>
            `;
            tableBody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').innerText = "Error loading data.";
        document.getElementById('error').style.display = 'block';
    });

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const CFTC_URL = 'https://www.cftc.gov/dea/newcot/c_disagg.txt';

async function fetchData() {
  try {
    console.log('Fetching data...');
    const response = await axios.get(CFTC_URL);
    const lines = response.data.split('\n');
    const formattedData = [];

    lines.forEach(line => {
      if (line.includes('GOLD - COMMODITY EXCHANGE INC.')) {
        const cols = line.split(',');
        if (cols.length > 10) {
          formattedData.push({
            market: cols[0].trim(),
            date: cols[1].trim(),
            openInterest: cols[8].trim(),
            producerLong: cols[9].trim(),
            producerShort: cols[10].trim()
          });
        }
      }
    });

    // Save to data folder
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    
    fs.writeFileSync(path.join(dataDir, 'cot.json'), JSON.stringify(formattedData, null, 2));
    console.log('Done!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

fetchData();

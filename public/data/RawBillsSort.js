const fs = require('fs');

// Read the JSON data from the file
fs.readFile('./public/data/rawbills.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const jsonData = JSON.parse(data);

    function customSort(a, b) {
        if (a.owner !== b.owner) {
            return compareStrings(a.owner, b.owner);
        } else if (a.platform !== b.platform) {
            return compareStrings(a.platform, b.platform);
        } else if (a.position !== b.position){
            return compareStrings(a.position, b.position);
        } else if (a.size && b.size){
            return compareStrings(a.size, b.size);
        }
    }
    
    function compareStrings(str1, str2) {
        for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
            const charCode1 = str1.charCodeAt(i);
            const charCode2 = str2.charCodeAt(i);
            if (charCode1 !== charCode2) {
                return charCode1 - charCode2;
            }
        }
        return str1.length - str2.length;
    }

    jsonData.sort(customSort);

    const sortedJsonData = JSON.stringify(jsonData, null, 4);

    fs.writeFile('./public/data/sorted_rawbills.json', sortedJsonData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('Data sorted and saved to rawbills.json');
    });
});

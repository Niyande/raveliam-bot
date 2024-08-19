const path = require('path')
const crypto = require('crypto')
const fs = require('node:fs');

module.exports = {
    
    data:
        DBPath = path.join(__dirname, '..', 'database.json'),
    data:
        WeaponsPath = path.join(__dirname, '..', 'weapons.json'),
    SaveFile(content) {
        fs.writeFile(DBPath, content, err => {
            if (err) {
            console.error(err);
            } else {
            console.log('file written successfully')
            }
        });
    },
    
    ReadWeaponDatabase() {
        var data = JSON.parse(fs.readFileSync(WeaponsPath, 'utf8'));
    
        return data;
    },

    ReadDatabase() {
        var data = JSON.parse(fs.readFileSync(DBPath, 'utf8'));
    
        return data;
    },
    
    getRandomInt(max) {
        let output = 1 + max*crypto.getRandomValues(new Uint32Array(1))[0]/2**32|0;
        return output;
    },
    
    DiceRoll(input) {
        // Split the input into parts (e.g., '2d6+3' -> ['2d6', '+3'])
        const parts = input.match(/([+-]?\d+d\d+)|([+-]?\d+)/g);
    
        let sum = 0;
        let dice_log = '';
    
        // Loop through each part
        for (const part of parts) {
            // Check if the part is a dice roll (e.g., '2d6')
            if (part.includes('d')) {
                const [dice_number, dice_value] = part.split('d').map(Number);
                let dice_sum = 0;
                let dice_log_part = '';
    
                // Roll the dice
                for (let i = 0; i < dice_number; i++) {
                    const num = this.getRandomInt(dice_value);
                    dice_sum += num;
                    dice_log_part += num + '+';
                }
    
                // Add the dice sum and log to the total
                sum += dice_sum;
                dice_log += dice_log_part;
            } else {
                // The part is a modifier (e.g., '+3')
                dice_log = dice_log.slice(0, -1);
                const modifier = parseInt(part);
                sum += modifier;
                dice_log += '[1;36m' + part + '[0m[1;37m +';
            }
        }
    
        dice_log = dice_log.trim();
        // Remove the trailing '+' or '-' character if it exists
        if (dice_log.endsWith('+') || dice_log.endsWith('-')) {
            dice_log = dice_log.slice(0, -1).trim();
        }
        return [sum, dice_log];
    },
    
    containsNumbers(str) {
        return /\d/.test(str);
    },
}
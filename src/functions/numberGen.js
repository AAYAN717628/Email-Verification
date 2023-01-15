function genCode() {

const char = '1234567890'; 
const length = 5;
let randomvalue = '';
for ( let i = 0; i < length; i++) {

    const value = Math.floor(Math.random() * char.length);

    randomvalue += char.substring(value, value + 1).toUpperCase();

}

return randomvalue
}

module.exports = genCode
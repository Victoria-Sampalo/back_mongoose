const bcrypt = require('bcrypt');

//Función que genera el hash para la constraseña
async function hashPassword(password) {
    // Genera el hash de la contraseña con una sal de 10 rondas
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

module.exports = {
    hashPassword
};

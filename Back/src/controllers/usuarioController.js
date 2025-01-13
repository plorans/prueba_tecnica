import { pool } from '../db.js';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

const SECRET_KEY = 'secret';

function generarToken(usuario) {
    return jwt.sign(usuario, SECRET_KEY, { expiresIn: '1800s' });

}

const saveUsuario = async (req, res) => {
    try {
        const { nombre, password, email } = req.body;
        const salt = 10;
        const hash = await bcrypt.hash(password, salt);

        const usuario = await pool.query('INSERT INTO USUARIO (NOMBRE, PASSWORD, ACTIVO, EMAIL) VALUES ($1, $2, true, $3) RETURNING *', [nombre, hash, email]);

        res.json(usuario.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al guardar el usuario" });
    }
};

const listUsuario = async (req, res) => {
    try {
        const lista = await pool.query("SELECT * FROM USUARIO");
        res.json(lista.rows)
    } catch (error) {
        console.log(error);
    }
};


const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        await check('email', 'Username Must Be an Email Address').isEmail().trim().escape().normalizeEmail().run(req);
        await check('password').trim().escape().run(req);
        // await check('password', 'Password Must Be at Least 8 Characters').isLength({ min: 8 }).trim().escape().run(req);


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const result = await pool.query('SELECT * FROM USUARIO WHERE EMAIL = $1', [email]);
        const usuario = result.rows[0];

        if (!usuario) {
            return res.status(404).json({ errors: [{ msg: 'Usuario no encontrado' }] });
        }

        const passwordCheck = await bcrypt.compare(password, usuario.password);
        if (!passwordCheck) {
            return res.status(401).json({ errors: [{ msg: 'Contraseña incorrecta' }] });
        }

        const token = generarToken({ payload: email });

        res.status(200).json(token);
        console.log("Login");
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ error: 'Hubo un error en el login.' });
    }
};


function verifyToken(req, res, next) {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token not provied" });
    }
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        req.usuario = payload.usuario;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token not valid" });
    }
}

export {
    saveUsuario,
    listUsuario,
    login,
    verifyToken,
}
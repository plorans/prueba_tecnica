import express from "express";

const router = express.Router();

import {saveUsuario,listUsuario,login,verifyToken} from '../controllers/usuarioController.js';

router.get('/listaUsuario',listUsuario);
router.post('/save',saveUsuario);
router.post('/login',login);
router.post('/verifyToken',verifyToken);

router.get('/', verifyToken, (req, res) => {
  console.log('acces');
  return res.status(200).json({ message: "You have access" });
})

export default router;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuth = void 0;
const auth_1 = require("../configs/auth");
const jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw Error("Usuário sem permissão");
    }
    const [, token] = authHeader.split(" ");
    try {
        const { sub: user_id } = (0, jsonwebtoken_1.verify)(token, auth_1.authConfigs.jwt.secret);
        req.user = {
            id: Number(user_id),
        };
        return next();
    }
    catch {
        return res.json({ message: "Usuário sem permissão" });
    }
}
exports.ensureAuth = ensureAuth;

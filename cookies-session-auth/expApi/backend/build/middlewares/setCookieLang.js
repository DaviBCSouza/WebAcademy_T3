"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setCookieLang = (req, res, next) => {
    if (!("lang" in req.cookies))
        res.cookie("lang", process.env.DEFAULT_LANG);
    next();
};
exports.default = setCookieLang;

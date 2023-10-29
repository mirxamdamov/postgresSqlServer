"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMid = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const GetMid = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization) {
            return res.status(404).send({
                error: {
                    message: 'tokeniz yo'
                },
                data: null,
                status: 404
            });
        }
        const tokenVerify = jsonwebtoken_1.default.verify(req.headers.authorization, 'olma');
        if (!tokenVerify) {
            return res.status(404).send({
                error: {
                    message: 'invalit tokenn'
                },
                data: null,
                status: 404
            });
        }
        else {
            next();
        }
    }
    catch (error) {
        if (error.message = 'invalid token') {
            res.status(404).send({
                error: {
                    message: 'invalit token'
                },
                data: null,
                status: 404
            });
        }
    }
});
exports.GetMid = GetMid;

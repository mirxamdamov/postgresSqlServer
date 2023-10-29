"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPut = exports.UserGet = exports.UsersGet = exports.signin = exports.signup = void 0;
const auth_1 = require("../model/auth");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.username || !req.body.password || !req.body.email) {
            res.send("Username yoki email yoki password yo'q");
            return;
        }
        yield auth_1.Auth.create({
            username: req.body.username,
            email: req.body.email,
            password: yield bcrypt.hash(req.body.password, 10),
        });
        const Userid = yield auth_1.Auth.findOne({ where: { username: req.body.username } });
        const Userid2 = Userid.id;
        const token = jwt.sign(Userid2, 'olma');
        res.status(201).send({
            status: 201,
            data: {
                token
            },
            err: null
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userUsername = yield auth_1.Auth.findOne({ where: { email: req.body.email } });
        const userPassword = userUsername.password;
        const reqPassword = req.body.password;
        if (userUsername === null) {
            res.status(404).send('User not fount');
            return;
        }
        const password = (yield bcrypt.compare(reqPassword, userPassword));
        if (password) {
            res.send({
                status: 200,
                data: jwt.sign(userUsername.id, 'olma'),
                err: null
            });
        }
        else {
            res.status(405).send('invalit password');
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.signin = signin;
const UsersGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield auth_1.Auth.findAll({
        attributes: [
            'id',
            "username",
            "email",
            "password"
        ]
    });
    yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield user.getProducts({
            attributes: ["id",
                "title",
                "price",
                "description",
                "category",
                "image",
                "rate",
                "count",
            ]
        });
        products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            delete product.dataValues.Orders;
        }));
        user.dataValues.products = products;
    })));
    res.send(users);
});
exports.UsersGet = UsersGet;
const UserGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const id = jwt.verify(token, 'olma');
        const users = yield auth_1.Auth.findOne({
            where: { id: id },
        });
        res.send(users);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.UserGet = UserGet;
const userPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    const userId = jwt.verify(token, 'olma');
    const { username } = req.body;
    if (!username) {
        return res.status(404).send('invalid Username');
    }
    try {
        const user = yield auth_1.Auth.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.username = username;
        yield user.save();
        return res.status(200).send('User updated successfully');
    }
    catch (err) {
        console.log(err);
    }
});
exports.userPut = userPut;

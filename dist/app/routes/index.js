"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.UserRoutes
    }
];
moduleRoutes.forEach(route => {
    exports.router.use(route.path, route.route);
});

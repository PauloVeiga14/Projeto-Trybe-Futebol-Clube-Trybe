"use strict";
exports.__esModule = true;
exports.mockResponseLogin = exports.mockReturnLogin = void 0;
exports.mockReturnLogin = {
    user: {
        id: 1,
        username: "Admin",
        role: "admin",
        email: "admin@admin.com"
    },
    token: "123.456.789"
};
exports.mockResponseLogin = {
    id: 1,
    username: "Admin",
    role: "admin",
    password: "secret_admin",
    email: "admin@admin.com"
};

"use strict";
(() => {
var exports = {};
exports.id = 748;
exports.ids = [748];
exports.modules = {

/***/ 5171:
/***/ ((module) => {

module.exports = require("@next-auth/sequelize-adapter");

/***/ }),

/***/ 4146:
/***/ ((module) => {

module.exports = require("date-fns");

/***/ }),

/***/ 3227:
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ 3598:
/***/ ((module) => {

module.exports = require("next-auth/providers/google");

/***/ }),

/***/ 5900:
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 9755:
/***/ ((module) => {

module.exports = require("react-use");

/***/ }),

/***/ 6235:
/***/ ((module) => {

module.exports = import("postgres");;

/***/ }),

/***/ 8210:
/***/ ((module) => {

module.exports = import("sequelize");;

/***/ }),

/***/ 7720:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "authOptions": () => (/* binding */ authOptions),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3227);
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3598);
/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _next_auth_sequelize_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5171);
/* harmony import */ var _next_auth_sequelize_adapter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_next_auth_sequelize_adapter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5900);
/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(pg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8210);
/* harmony import */ var postgres__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6235);
/* harmony import */ var _graphql_models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5137);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([sequelize__WEBPACK_IMPORTED_MODULE_4__, postgres__WEBPACK_IMPORTED_MODULE_5__]);
([sequelize__WEBPACK_IMPORTED_MODULE_4__, postgres__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);







const dbOptions = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || "") || 5432
};
const sequelize = new sequelize__WEBPACK_IMPORTED_MODULE_4__.Sequelize({
    dialect: "postgres",
    dialectModule: pg__WEBPACK_IMPORTED_MODULE_3__,
    ...dbOptions
});
const sql = (0,postgres__WEBPACK_IMPORTED_MODULE_5__["default"])(dbOptions);
const User = new _graphql_models__WEBPACK_IMPORTED_MODULE_6__/* .UserModel */ .T_(sql);
const Account = new _graphql_models__WEBPACK_IMPORTED_MODULE_6__/* .AccountModel */ .vG(sql);
const authOptions = {
    providers: [
        process.env.GOOGLE_ID && process.env.GOOGLE_SECRET && next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default()({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ].filter(Boolean),
    adapter: _next_auth_sequelize_adapter__WEBPACK_IMPORTED_MODULE_2___default()(sequelize, {
        synchronize: false
    }),
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async signIn ({ user , account  }) {
            try {
                if (user?.email && account) {
                    const existingUser = await User.get(user.email);
                    if (!existingUser) return "/invite-only";
                    const existingAccount = await Account.get(account.provider, account.providerAccountId);
                    if (!existingAccount) {
                        const newAccount = {
                            userId: existingUser.id,
                            type: account.type,
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                            refresh_token: account.refresh_token,
                            access_token: account.access_token,
                            expires_at: account.expires_at?.toString(),
                            token_type: account.token_type,
                            scope: account.scope,
                            id_token: account.id_token,
                            session_state: account.session_state
                        };
                        await Account.create(newAccount);
                    }
                    return true;
                }
            } catch (error) {
                console.error(error);
            }
            return false;
        }
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [137], () => (__webpack_exec__(7720)));
module.exports = __webpack_exports__;

})();
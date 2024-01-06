"use strict";
exports.id = 456;
exports.ids = [456];
exports.modules = {

/***/ 1456:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(9966), exports);


/***/ }),

/***/ 9966:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startServerAndCreateNextHandler = void 0;
/* eslint-disable no-restricted-syntax */
var server_1 = __webpack_require__(8083);
var url_1 = __webpack_require__(7310);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var defaultContext = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ({})];
}); }); };
function startServerAndCreateNextHandler(server, options) {
    var _this = this;
    server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();
    var contextFunction = (options === null || options === void 0 ? void 0 : options.context) || defaultContext;
    var handler = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var headers, _a, _b, _c, key, value, httpGraphQLResponse, _d, _e, _f, key, value, _g, _h, _j, chunk, e_1_1;
        var e_2, _k, e_3, _l;
        var _m, e_1, _o, _p;
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    headers = new server_1.HeaderMap();
                    try {
                        for (_a = __values(Object.entries(req.headers)), _b = _a.next(); !_b.done; _b = _a.next()) {
                            _c = __read(_b.value, 2), key = _c[0], value = _c[1];
                            if (typeof value === 'string') {
                                headers.set(key, value);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_k = _a.return)) _k.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    return [4 /*yield*/, server.executeHTTPGraphQLRequest({
                            context: function () { return contextFunction(req, res); },
                            httpGraphQLRequest: {
                                body: req.body,
                                headers: headers,
                                method: req.method || 'POST',
                                search: req.url ? (0, url_1.parse)(req.url).search || '' : '',
                            },
                        })];
                case 1:
                    httpGraphQLResponse = _q.sent();
                    try {
                        for (_d = __values(httpGraphQLResponse.headers), _e = _d.next(); !_e.done; _e = _d.next()) {
                            _f = __read(_e.value, 2), key = _f[0], value = _f[1];
                            res.setHeader(key, value);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_l = _d.return)) _l.call(_d);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    res.statusCode = httpGraphQLResponse.status || 200;
                    if (!(httpGraphQLResponse.body.kind === 'complete')) return [3 /*break*/, 2];
                    res.send(httpGraphQLResponse.body.string);
                    return [3 /*break*/, 14];
                case 2:
                    _q.trys.push([2, 7, 8, 13]);
                    _g = true, _h = __asyncValues(httpGraphQLResponse.body.asyncIterator);
                    _q.label = 3;
                case 3: return [4 /*yield*/, _h.next()];
                case 4:
                    if (!(_j = _q.sent(), _m = _j.done, !_m)) return [3 /*break*/, 6];
                    _p = _j.value;
                    _g = false;
                    try {
                        chunk = _p;
                        res.write(chunk);
                    }
                    finally {
                        _g = true;
                    }
                    _q.label = 5;
                case 5: return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_1_1 = _q.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _q.trys.push([8, , 11, 12]);
                    if (!(!_g && !_m && (_o = _h.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, _o.call(_h)];
                case 9:
                    _q.sent();
                    _q.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13:
                    res.end();
                    _q.label = 14;
                case 14: return [2 /*return*/];
            }
        });
    }); };
    return handler;
}
exports.startServerAndCreateNextHandler = startServerAndCreateNextHandler;


/***/ })

};
;
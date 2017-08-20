"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hash_map_1 = require("hash-map");
function cachedPromise(func) {
    const map = hash_map_1.stringMap();
    return function (key) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = map[key];
            if (existing !== undefined) {
                return existing;
            }
            const result = yield func(key);
            map[key] = result;
            return result;
        });
    };
}
exports.cachedPromise = cachedPromise;
//# sourceMappingURL=cachedPromise.js.map
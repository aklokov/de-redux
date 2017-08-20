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
const tools_1 = require("../tools");
const generators_1 = require("./generators");
function generateFiles(options, model) {
    return __awaiter(this, void 0, void 0, function* () {
        const rootPromise = model.rootState ? [generateRootState(options, model.rootState)] : [];
        const actionPromises = model.actionFiles.map(af => generateActionFile(options, af));
        const reducerPromises = model.reducerFiles.map(rf => generateReducerFile(options, rf));
        const dispatcherPromises = model.dispatcherFiles.map(df => generateDispatcherFile(options, df));
        yield Promise.all([...rootPromise, ...actionPromises, ...reducerPromises, ...dispatcherPromises]);
    });
}
exports.generateFiles = generateFiles;
function generateActionFile(options, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = generators_1.actionsGenerator.generate(file);
        return write(file.actionsFile, content);
    });
}
function generateDispatcherFile(options, file) {
    return __awaiter(this, void 0, void 0, function* () {
        return;
    });
}
function generateReducerFile(options, file) {
    return __awaiter(this, void 0, void 0, function* () {
        return;
    });
}
function generateRootState(options, file) {
    return __awaiter(this, void 0, void 0, function* () {
        return;
    });
}
function write(path, content) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield tools_1.ensureFolder(path);
            const written = yield tools_1.gracefulWriteFile(path, content);
            if (written) {
                console.log('written file ' + path);
            }
        }
        catch (err) {
            console.log('error writing ' + path + ' : ' + err);
        }
    });
}
//# sourceMappingURL=generate.js.map
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
const actions_1 = require("./generators/actions");
const reducer_1 = require("./generators/reducer");
const dispatcher_1 = require("./generators/dispatcher");
const rootState_1 = require("./generators/rootState");
const _1 = require(".");
function generateFiles(options, model) {
    return __awaiter(this, void 0, void 0, function* () {
        const unlink = [
            ...model.actionFiles.filter(af => af.unlink).map(af => af.actionsFile),
            ...model.dispatcherFiles.filter(df => df.unlink).map(df => df.dispatcherFile),
            ...model.reducerFiles.filter(rf => rf.unlink).map(rf => rf.reducerFile)
        ];
        yield Promise.all(unlink.map(file => _1.unlinkFile(file)));
        const rootPromise = model.rootState ? [generateRootState(options, model.rootState)] : [];
        const actionPromises = model.actionFiles.filter(af => !af.unlink).map(af => generateActionFile(options, af));
        const reducerPromises = model.reducerFiles.filter(df => !df.unlink).map(rf => generateReducerFile(options, rf));
        const dispatcherPromises = model.dispatcherFiles.filter(rf => !rf.unlink).map(df => generateDispatcherFile(options, df));
        yield Promise.all([...rootPromise, ...actionPromises, ...reducerPromises, ...dispatcherPromises]);
    });
}
exports.generateFiles = generateFiles;
function generateActionFile(options, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = actions_1.actionsGenerator.generate(file);
        return _1.writeGeneratedFile(file.actionsFile, content);
    });
}
function generateDispatcherFile(options, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = dispatcher_1.dispatcherGenerator.generate(file);
        return _1.writeGeneratedFile(file.dispatcherFile, content);
    });
}
function generateReducerFile(options, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = reducer_1.reducerGenerator.generate(file);
        return _1.writeGeneratedFile(file.reducerFile, content);
    });
}
function generateRootState(options, file) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = rootState_1.rootStateGenerator.generate(file);
        return _1.writeGeneratedFile(file.rootStateFile, content);
    });
}
//# sourceMappingURL=generate.js.map
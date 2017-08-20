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
const fs = require("fs");
function readDir(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(files);
            }
        });
    });
}
exports.readDir = readDir;
function mkdir(path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
exports.mkdir = mkdir;
function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
exports.readFile = readFile;
function writeFile(path, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, 'utf8', (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
exports.writeFile = writeFile;
function gracefulWriteFile(path, content) {
    return __awaiter(this, void 0, void 0, function* () {
        const ex = yield exists(path);
        if (ex) {
            const existing = yield readFile(path);
            if (existing === content) {
                return false;
            }
        }
        yield writeFile(path, content);
        return true;
    });
}
exports.gracefulWriteFile = gracefulWriteFile;
function isDirectory(path) {
    return new Promise((resolve, reject) => {
        fs.lstat(path, (err, stats) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(stats.isDirectory());
            }
        });
    });
}
exports.isDirectory = isDirectory;
function exists(path) {
    return new Promise((resolve, reject) => {
        fs.exists(path, (response) => {
            resolve(response);
        });
    });
}
exports.exists = exists;
function ensureFolder(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const split = path.split('/');
        let constructedPath = split[0];
        for (let segment of split.slice(1)) {
            constructedPath += '/' + segment;
            if (constructedPath !== path) {
                yield ensureFolderImpl(constructedPath);
            }
        }
    });
}
exports.ensureFolder = ensureFolder;
const dirRegex = /[^\/^\\^\.]/;
function ensureFolderImpl(path) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!dirRegex.exec(path)) {
            return;
        }
        const ex = yield exists(path);
        if (ex === true) {
            const isDir = yield isDirectory(path);
            if (!isDir) {
                throw new Error(`expected ${path} to be a directory`);
            }
            else {
                return;
            }
        }
        yield mkdir(path);
    });
}
//# sourceMappingURL=fsPromise.js.map
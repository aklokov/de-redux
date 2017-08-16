import * as fs from 'fs';

export function readDir(path: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

export function mkdir(path: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.mkdir(path, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function readFile(path: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export function writeFile(path: string, content: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.writeFile(path, content, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export async function gracefulWriteFile(path: string, content: string): Promise<boolean> {
  const ex = await exists(path);
  if (ex) {
    const existing = await readFile(path);
    if (existing === content) {
      return false;
    }
  }

  await writeFile(path, content);
  return true;
}

export function isDirectory(path: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    fs.lstat(path, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats.isDirectory());
      }
    });
  });
}

export function exists(path: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    fs.exists(path, (response) => {
      resolve(response);
    });
  });
}

export async function ensureFolder(path: string): Promise<void> {
  const split = path.split('/');
  let constructedPath = split[0];
  for (let segment of split.slice(1)) {
    constructedPath += '/' + segment;
    if (constructedPath !== path) {
      await ensureFolderImpl(constructedPath);
    }
  }
}

const dirRegex = /[^\/^\\^\.]/;
async function ensureFolderImpl(path: string): Promise<void> {
  if (!dirRegex.exec(path)) {
    return;
  }
  const ex = await exists(path);
  if (ex === true) {
    const isDir = await isDirectory(path);
    if (!isDir) {
      throw new Error(`expected ${path} to be a directory`);
    } else {
      return;
    }
  }

  await mkdir(path);
}

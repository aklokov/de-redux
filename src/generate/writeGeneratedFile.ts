import * as fse from 'fs-extra';
import { trimFilename } from '../tools';

async function needToWrite(path: string, content: string): Promise<boolean> {
  const exists = await fse.pathExists(path);
  if (!exists) {
    return true;
  }

  const existing = await fse.readFile(path, 'utf8');
  return content !== existing;
}

export async function gracefulWriteFile(path: string, content: string): Promise<void> {
  const need = await needToWrite(path, content);
  if (!need) {
    return;
  }

  try {
    await fse.writeFile(path, content);
    console.log('Written ' + path);
  } catch (err) {
    console.log('Error writing ' + path + '\n' + err);
  }
}

export async function writeGeneratedFile(path: string, content: string): Promise<void> {
  try {
    await fse.ensureDir(trimFilename(path));
    const written = await gracefulWriteFile(path, content);
    if (written) {
      console.log('written file ' + path);
    }
  } catch (err) {
    console.log('error writing ' + path + ' : ' + err);
  }
}

export async function unlinkFile(path: string): Promise<void> {
  const exists = await fse.pathExists(path);
  if (!exists) {
    return;
  }

  console.log('unlink ' + path);
  return fse.unlink(path);
}

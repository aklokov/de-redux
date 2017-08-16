import { Model, ActionsFile, DispatcherFile, ReducerFile, RootStateFile } from '../derive/model';
import { Options } from '../Options';
import { gracefulWriteFile, ensureFolder } from '../tools';
import { actionsGenerator } from './generators';

export async function generateFiles(options: Options, model: Model): Promise<void> {
  const rootPromise = model.rootState ? [generateRootState(options, model.rootState)] : [];

  const actionPromises = model.actionFiles.map(af => generateActionFile(options, af));
  const reducerPromises = model.reducerFiles.map(rf => generateReducerFile(options, rf));
  const dispatcherPromises = model.dispatcherFiles.map(df => generateDispatcherFile(options, df));

  await Promise.all([...rootPromise, ...actionPromises, ...reducerPromises, ...dispatcherPromises]);
}
async function generateActionFile(options: Options, file: ActionsFile): Promise<void> {
  const content = actionsGenerator.generate(file);
  return write(file.actionsFile, content);
}

async function generateDispatcherFile(options: Options, file: DispatcherFile): Promise<void> {
  return;
}

async function generateReducerFile(options: Options, file: ReducerFile): Promise<void> {
  return;
}

async function generateRootState(options: Options, file: RootStateFile): Promise<void> {
  return;
}

async function write(path: string, content: string): Promise<void> {
  try {
    await ensureFolder(path);
    const written = await gracefulWriteFile(path, content);
    if (written) {
      console.log('written file ' + path);
    }
  } catch (err) {
    console.log('error writing ' + path + ' : ' + err);
  }
}

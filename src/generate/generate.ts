import { Model, ActionsFile, DispatcherFile, ReducerFile, RootStateFile } from '../derive/model';
import { Options } from '../Options';
import { actionsGenerator } from './generators/actions';
import { reducerGenerator } from './generators/reducer';
import { dispatcherGenerator } from './generators/dispatcher';
import { rootStateGenerator } from './generators/rootState';
import { writeGeneratedFile, unlinkFile } from '.';

export async function generateFiles(options: Options, model: Model): Promise<void> {
  const unlink = [
    ...model.actionFiles.filter(af => af.unlink).map(af => af.actionsFile),
    ...model.dispatcherFiles.filter(df => df.unlink).map(df => df.dispatcherFile),
    ...model.reducerFiles.filter(rf => rf.unlink).map(rf => rf.reducerFile)
  ];
  await Promise.all(unlink.map(file => unlinkFile(file)));

  const rootPromise = model.rootState ? [generateRootState(options, model.rootState)] : [];
  const actionPromises = model.actionFiles.filter(af => !af.unlink).map(af => generateActionFile(options, af));
  const reducerPromises = model.reducerFiles.filter(df => !df.unlink).map(rf => generateReducerFile(options, rf));
  const dispatcherPromises = model.dispatcherFiles.filter(rf => !rf.unlink).map(df => generateDispatcherFile(options, df));

  await Promise.all([...rootPromise, ...actionPromises, ...reducerPromises, ...dispatcherPromises]);
}

async function generateActionFile(options: Options, file: ActionsFile): Promise<void> {
  const content = actionsGenerator.generate(file);
  return writeGeneratedFile(file.actionsFile, content);
}

async function generateDispatcherFile(options: Options, file: DispatcherFile): Promise<void> {
  const content = dispatcherGenerator.generate(file);
  return writeGeneratedFile(file.dispatcherFile, content);
}

async function generateReducerFile(options: Options, file: ReducerFile): Promise<void> {
  const content = reducerGenerator.generate(file);
  return writeGeneratedFile(file.reducerFile, content);
}

async function generateRootState(options: Options, file: RootStateFile): Promise<void> {
  const content = rootStateGenerator.generate(file);
  return writeGeneratedFile(file.rootStateFile, content);
}

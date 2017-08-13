import { collectModel } from './parse/parse';
import { Options } from './Options';

export async function generate(options: Options): Promise<void> {
    const nodes = collectModel(options.path);
}

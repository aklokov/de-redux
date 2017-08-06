import parse from './parse/parse';
import generateImpl from './generate/generate';

function generate(source: string): string {
    const nodes = parse(source);
    return generateImpl(nodes);
}


export {
    generate
}

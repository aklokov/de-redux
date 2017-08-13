import { generate } from '../src';

describe('manualTest', function (): void {
    it('should not throw', async function (): Promise<void> {
        const options = {
            path: './tst'
        };
        await generate(options);
        console.log('done');
    });
});

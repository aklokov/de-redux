import { generate } from '../src';

describe('manualTest', function (): void {
  it('should not throw', async function (): Promise<void> {
    const options = {
      path: './tst',
      tsconfig: {
        baseUrl: '.',
        paths:
        {
          '@mdminterfaces/*': ['app/interfaces/*']
        }
      }
    };
    await generate(options);
    console.log('done');
  });
});

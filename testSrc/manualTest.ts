import { generate } from '../src';

describe('manualTest', function (): void {
  it('should not throw', async function (): Promise<void> {
    const options = {
      path: '../../nielsen/csapps-metadata-manager/app',
      tsconfig: {
        baseUrl: '../../nielsen/csapps-metadata-manager',
        paths:
        {
          '@mdmapp/*': ['app/*'],
          '@mdmcomponents/*': ['app/components/*'],
          '@mdminterfaces/*': ['app/interfaces/*'],
          '@mdmservices/*': ['app/services/*'],
          '@mdmapi/*': ['app/services/api/*'],
          '@mdmtools': ['app/services/tools/']
        }
      }
    };
    await generate(options);
    console.log('done');
  });
});

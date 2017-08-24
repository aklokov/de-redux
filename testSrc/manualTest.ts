import { generate, Options } from '../src';

describe('manualTest', function (): void {
  it('should not throw', async function (): Promise<void> {
    const options: Options = {
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
      },
      generateRootIn: '../../nielsen/csapps-metadata-manager/redux',
      rootStateName: 'MetadataState'
    };
    await generate(options);
    console.log('done');
  });
});

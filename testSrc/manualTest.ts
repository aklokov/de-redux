import { generate, Options } from '../src';

describe('manualTest', function (): void {
  it('should not throw', async function (): Promise<void> {
    const options: Options = {
      path: '../../nielsen/csapps-metadata-manager/app',
      tsconfig: {
        baseUrl: '../../nielsen/csapps-metadata-manager',
        paths:
        {
          '@mdmservices/*': ['app/services/*'],
          '@mdmstate/*': ['app/state/*'],
          '@mdmstore-service': ['app/services/store.service'],
          '@mdmtools': ['app/services/tools/'],
          '@environment': ['testbed/client/environments/environment'],

          '@mdmcomponents/*': ['app/components/*'],
          '@mdmapi/*': ['app/services/api/*'],
          '@mdmbl/*': ['app/services/bl/*'],
          '@mdmhl/*': ['app/services/hl/*']
        }
      }
    };
    await generate(options);
    console.log('done');
  });
});

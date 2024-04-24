// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// DOMAINS
/**
 base_url: 'https://soporte.castitoner.com/api',
 local_url: 'https://soporte.castitoner.com'

 base_url: 'https://admin.lineatecnologicadecolombia.com/api',
 local_url: 'https://admin.lineatecnologicadecolombia.com'

 base_url: 'http://localhost:3000/api',
 local_url: 'http://localhost:4200'
 */

export const environment = {
  production: false,
  base_url: 'http://localhost:3000/api',
  local_url: 'http://localhost:4200'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlBase:"https://appqa.mapfrecr.com/AutoInspeccion",
  staticApiUrl : 'https://sgo.mapfre.com.co/servicios/rest/trnAutoInspecciones/ws/',
  EMarketApiUrl : "https://sgo.mapfre.com.co/servicios/restv2/autoInspecion/",
  cloudflare: 'https://www.cloudflare.com/cdn-cgi/trace',
  googleMaps:'https://maps.googleapis.com/maps/api/geocode/xml?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=false',
  user:"agente",
  pss:"Alagt0623$"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

import { sleep } from 'k6'
import http from 'k6/http'

export const options = {
  stages: [
    { duration: '1m', target: 20 }, // tiempo de la prueba (1m) y VUs variables (target) con un máx de 20.
    { duration: '3m', target: 20 }, // se pueden crear tantos escenarios como se quiera.
  ],
  thresholds: {
    http_req_failed: ['rate<0.02'], // los errores http deben ser menores al 2%
    http_req_duration: ['p(95)<2000'], // por lo menos el 95% de los reques deben durar menos de 2s
  },
  ext: {
    loadimpact: {
      distribution: {
        'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 },
      },
    },
  },
}

export default function main() {
  // En la siguiente linea se especifíca el método del request y el endpoint
  let response = http.get('http://desa-wlogic02.bicevida.cl:8452/sec/sc12/ImpresionPoliza/descargaPoliza?pol_prefijo=1&pol_tipo=1&pol_numero=27416&pol_secuencia=0&pol_rut=76371268&usuario=76371268')
  sleep(1)
}


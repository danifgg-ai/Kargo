/**
 * SIFEN (Sistema Integrado de Facturación Electrónica Nacional)
 * SET Paraguay — Subsecretaría de Estado de Tributación
 */

export const sifenConfig = {
  rucEmisor: process.env.SIFEN_RUC_EMISOR || '',
  razonSocial: process.env.SIFEN_RAZON_SOCIAL || 'KARGO S.A.',
  timbrado: process.env.SIFEN_TIMBRADO || '',
  certificadoBase64: process.env.SIFEN_CERTIFICADO_BASE64 || '',
  certificadoPassword: process.env.SIFEN_CERTIFICADO_PASSWORD || '',
  ambiente: (process.env.SIFEN_AMBIENTE || 'mock') as 'mock' | 'test' | 'production',
}

export const SIFEN_ENDPOINTS = {
  mock: {
    recepcion: '/mock/sifen/recepcion',
    consulta: '/mock/sifen/consulta',
    evento: '/mock/sifen/evento',
  },
  test: {
    recepcion: 'https://sifen-test.set.gov.py/de/ws/sync/recibe.wsdl',
    consulta: 'https://sifen-test.set.gov.py/de/ws/consultas/consulta.wsdl',
    evento: 'https://sifen-test.set.gov.py/de/ws/eventos/evento.wsdl',
  },
  production: {
    recepcion: 'https://sifen.set.gov.py/de/ws/sync/recibe.wsdl',
    consulta: 'https://sifen.set.gov.py/de/ws/consultas/consulta.wsdl',
    evento: 'https://sifen.set.gov.py/de/ws/eventos/evento.wsdl',
  },
} as const

// Tipo de Documento Electrónico
export const TIPO_DE = {
  FACTURA_ELECTRONICA: 1,
  FACTURA_ELECTRONICA_EXPORTACION: 2,
  FACTURA_ELECTRONICA_IMPORTACION: 3,
  AUTOFACTURA_ELECTRONICA: 4,
  NOTA_CREDITO_ELECTRONICA: 5,
  NOTA_DEBITO_ELECTRONICA: 6,
  NOTA_REMISION_ELECTRONICA: 7,
} as const

// Tipos de impuesto
export const TIPO_IMPUESTO = {
  IVA: 1,
  ISC: 2,
  RENTA: 3,
  NINGUNO: 4,
  IVA_RENTA: 5,
} as const

// Condición de operación
export const CONDICION_OPERACION = {
  CONTADO: 1,
  CREDITO: 2,
} as const

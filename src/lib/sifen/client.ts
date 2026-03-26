import { sifenConfig, SIFEN_ENDPOINTS } from './config'
import { buildInvoiceXML, generateCDC, type SifenInvoiceData } from './xml-builder'

export interface CreateInvoiceParams {
  invoiceNumber: string
  receiverRuc: string
  receiverName: string
  receiverAddress: string
  items: {
    description: string
    quantity: number
    unitPrice: number
    subtotal: number
  }[]
  subtotal: number
  ivaAmount: number
  totalAmount: number
}

export interface SifenResponse {
  success: boolean
  cdc: string
  xml: string
  qrCode: string
  status: 'approved' | 'rejected' | 'pending'
  message: string
}

/**
 * Submit invoice to SIFEN (SET Paraguay)
 * In production: signs XML with PKCS12 certificate and sends via SOAP
 * In mock/test: simulates the response
 */
export async function submitInvoice(params: CreateInvoiceParams): Promise<SifenResponse> {
  const cdc = generateCDC(params.invoiceNumber)
  const fechaEmision = new Date().toISOString()

  const invoiceData: SifenInvoiceData = {
    invoiceNumber: params.invoiceNumber,
    cdc,
    fechaEmision,
    receiverRuc: params.receiverRuc,
    receiverName: params.receiverName,
    receiverAddress: params.receiverAddress,
    items: params.items,
    subtotal: params.subtotal,
    ivaAmount: params.ivaAmount,
    totalAmount: params.totalAmount,
  }

  const xml = buildInvoiceXML(invoiceData)

  if (sifenConfig.ambiente === 'mock') {
    // Mock mode — simulate successful response
    return {
      success: true,
      cdc,
      xml,
      qrCode: `https://ekuatia.set.gov.py/consultas/qr?cdc=${cdc}`,
      status: 'approved',
      message: 'Documento electrónico aprobado (modo simulación)',
    }
  }

  // Production/Test: SOAP call to SIFEN
  // In production this would:
  // 1. Sign the XML with PKCS12 certificate (sifenConfig.certificadoBase64)
  // 2. Wrap in SOAP envelope
  // 3. POST to SIFEN_ENDPOINTS[sifenConfig.ambiente].recepcion
  // 4. Parse SOAP response

  const endpoints = SIFEN_ENDPOINTS[sifenConfig.ambiente]

  const soapEnvelope = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:xsd="http://ekuatia.set.gov.py/sifen/xsd">
  <soapenv:Header/>
  <soapenv:Body>
    <xsd:rEnviDe>
      <xsd:dId>1</xsd:dId>
      <xsd:xDE>${Buffer.from(xml).toString('base64')}</xsd:xDE>
    </xsd:rEnviDe>
  </soapenv:Body>
</soapenv:Envelope>`

  const response = await fetch(endpoints.recepcion, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml;charset=UTF-8',
      SOAPAction: '',
    },
    body: soapEnvelope,
  })

  if (!response.ok) {
    throw new Error(`SIFEN error: ${response.status}`)
  }

  // Parse SOAP response (simplified)
  const responseText = await response.text()
  const isApproved = responseText.includes('<dCodRes>0</dCodRes>')

  return {
    success: isApproved,
    cdc,
    xml,
    qrCode: `https://ekuatia.set.gov.py/consultas/qr?cdc=${cdc}`,
    status: isApproved ? 'approved' : 'rejected',
    message: isApproved ? 'Documento electrónico aprobado' : 'Documento rechazado por SIFEN',
  }
}

/**
 * Query invoice status by CDC
 */
export async function queryInvoiceStatus(cdc: string) {
  if (sifenConfig.ambiente === 'mock') {
    return {
      cdc,
      status: 'approved' as const,
      message: 'Documento aprobado (modo simulación)',
    }
  }

  const endpoints = SIFEN_ENDPOINTS[sifenConfig.ambiente]

  const soapEnvelope = `<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:xsd="http://ekuatia.set.gov.py/sifen/xsd">
  <soapenv:Header/>
  <soapenv:Body>
    <xsd:rEnviConsDE>
      <xsd:dId>1</xsd:dId>
      <xsd:dCDC>${cdc}</xsd:dCDC>
    </xsd:rEnviConsDE>
  </soapenv:Body>
</soapenv:Envelope>`

  const response = await fetch(endpoints.consulta, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml;charset=UTF-8',
      SOAPAction: '',
    },
    body: soapEnvelope,
  })

  if (!response.ok) {
    throw new Error(`SIFEN query error: ${response.status}`)
  }

  const responseText = await response.text()
  const isApproved = responseText.includes('<dCodRes>0</dCodRes>')

  return {
    cdc,
    status: isApproved ? ('approved' as const) : ('rejected' as const),
    message: isApproved ? 'Documento aprobado' : 'Documento no encontrado o rechazado',
  }
}

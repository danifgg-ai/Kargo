import { sifenConfig, TIPO_DE, TIPO_IMPUESTO, CONDICION_OPERACION } from './config'

export interface SifenInvoiceData {
  invoiceNumber: string
  cdc: string
  fechaEmision: string
  // Receptor
  receiverRuc: string
  receiverName: string
  receiverAddress: string
  // Items
  items: {
    description: string
    quantity: number
    unitPrice: number
    subtotal: number
  }[]
  // Totales
  subtotal: number
  ivaAmount: number
  totalAmount: number
}

/**
 * Generate CDC (Código de Control Digital) — 44 digits
 * Structure: tipoDE(2) + rucEmisor(8) + dv(1) + establecimiento(3) + puntoExpedicion(3) +
 *            numero(7) + tipoContribuyente(1) + fechaEmision(8) + tipoEmision(1) + codigoSeguridad(9) + digitoVerificador(1)
 */
export function generateCDC(invoiceNumber: string): string {
  const tipoDE = '01' // Factura electrónica
  const ruc = sifenConfig.rucEmisor.replace('-', '').padStart(9, '0')
  const establecimiento = '001'
  const puntoExpedicion = '001'
  const numero = invoiceNumber.replace(/\D/g, '').padStart(7, '0')
  const tipoContribuyente = '2' // Persona jurídica
  const fecha = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const tipoEmision = '1' // Normal
  const codigoSeguridad = String(Math.floor(Math.random() * 999999999)).padStart(9, '0')

  const base = `${tipoDE}${ruc}${establecimiento}${puntoExpedicion}${numero}${tipoContribuyente}${fecha}${tipoEmision}${codigoSeguridad}`

  // Simple check digit (mod 11)
  let sum = 0
  const weights = [2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2]
  for (let i = base.length - 1; i >= 0; i--) {
    sum += parseInt(base[i]) * (weights[base.length - 1 - i] || 2)
  }
  const dv = (11 - (sum % 11)) % 10

  return `${base}${dv}`
}

/**
 * Build SIFEN XML (DE - Documento Electrónico) for a factura electrónica
 * Follows SET Paraguay schema: rDE (raíz Documento Electrónico)
 */
export function buildInvoiceXML(data: SifenInvoiceData): string {
  const now = new Date().toISOString()

  const itemsXML = data.items
    .map(
      (item, i) => `
      <gCamItem>
        <dCodInt>${i + 1}</dCodInt>
        <dDesProSer>${escapeXml(item.description)}</dDesProSer>
        <dCantProSer>${item.quantity}</dCantProSer>
        <gValorItem>
          <dPUniProSer>${item.unitPrice}</dPUniProSer>
          <dTotBruOpeItem>${item.subtotal}</dTotBruOpeItem>
          <gValorRestaItem>
            <dTotOpeItem>${item.subtotal}</dTotOpeItem>
          </gValorRestaItem>
        </gValorItem>
        <gCamIVA>
          <iAfecIVA>1</iAfecIVA>
          <dDesAfecIVA>Gravado (10%)</dDesAfecIVA>
          <dPropIVA>100</dPropIVA>
          <dTasaIVA>10</dTasaIVA>
          <dBasGravIVA>${item.subtotal}</dBasGravIVA>
          <dLiqIVAItem>${Math.round(item.subtotal * 0.1)}</dLiqIVAItem>
        </gCamIVA>
      </gCamItem>`
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rDE xmlns="http://ekuatia.set.gov.py/sifen/xsd"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <DE Id="${data.cdc}">
    <gOpeDE>
      <iTipEmi>1</iTipEmi>
      <dDesTipEmi>Normal</dDesTipEmi>
      <dCodSeg>${data.cdc.slice(-10, -1)}</dCodSeg>
      <dInfoEmi>1</dInfoEmi>
      <dInfoFisc>Sin observación</dInfoFisc>
    </gOpeDE>
    <gTimb>
      <iTiDE>${TIPO_DE.FACTURA_ELECTRONICA}</iTiDE>
      <dDesTiDE>Factura electrónica</dDesTiDE>
      <dNumTim>${sifenConfig.timbrado}</dNumTim>
      <dEst>001</dEst>
      <dPunExp>001</dPunExp>
      <dNumDoc>${data.invoiceNumber}</dNumDoc>
      <dFeIniT>${now.slice(0, 10)}</dFeIniT>
    </gTimb>
    <gDatGralOpe>
      <dFeEmiDE>${data.fechaEmision}</dFeEmiDE>
      <gOpeCom>
        <iTipTra>1</iTipTra>
        <dDesTipTra>Venta de servicio</dDesTipTra>
        <iTImp>${TIPO_IMPUESTO.IVA}</iTImp>
        <dDesTImp>IVA</dDesTImp>
        <cMoneOpe>PYG</cMoneOpe>
        <dDesMoneOpe>Guarani</dDesMoneOpe>
        <dCondAnt>${CONDICION_OPERACION.CONTADO}</dCondAnt>
      </gOpeCom>
      <gEmis>
        <dRucEm>${sifenConfig.rucEmisor}</dRucEm>
        <dNomEmi>${escapeXml(sifenConfig.razonSocial)}</dNomEmi>
        <dDirEmi>Av. Aviadores del Chaco 2050</dDirEmi>
        <dCiuEmi>Asunción</dCiuEmi>
        <dTelEmi>021123456</dTelEmi>
      </gEmis>
      <gDatRec>
        <iNatRec>2</iNatRec>
        <dRucRec>${data.receiverRuc}</dRucRec>
        <dNomRec>${escapeXml(data.receiverName)}</dNomRec>
        <dDirRec>${escapeXml(data.receiverAddress)}</dDirRec>
      </gDatRec>
    </gDatGralOpe>
    <gDtipDE>
      <gCamFE>
        <iIndPres>1</iIndPres>
        <dDesIndPres>Operación presencial</dDesIndPres>
      </gCamFE>
    </gDtipDE>
    <gCamItem>${itemsXML}
    </gCamItem>
    <gTotSub>
      <dSubExe>0</dSubExe>
      <dSubExo>0</dSubExo>
      <dSub5>0</dSub5>
      <dSub10>${data.subtotal}</dSub10>
      <dTotOpe>${data.totalAmount}</dTotOpe>
      <dTotDesc>0</dTotDesc>
      <dTotDescGlowortem>0</dTotDescGlowortem>
      <dTotAntwortem>0</dTotAntwortem>
      <dPorcDescTotal>0</dPorcDescTotal>
      <dDescTotal>0</dDescTotal>
      <dAnticipo>0</dAnticipo>
      <dRewordo>0</dRewordo>
      <dComi>0</dComi>
      <dTotGralOpe>${data.totalAmount}</dTotGralOpe>
      <dIVA5>0</dIVA5>
      <dIVA10>${data.ivaAmount}</dIVA10>
      <dLiqTotIVA5>0</dLiqTotIVA5>
      <dLiqTotIVA10>${data.ivaAmount}</dLiqTotIVA10>
      <dTotIVA>${data.ivaAmount}</dTotIVA>
    </gTotSub>
  </DE>
</rDE>`
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { submitInvoice } from '@/lib/sifen/client'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const {
      rentalId,
      receiverRuc,
      receiverName,
      receiverAddress,
      description,
      subtotal,
      ivaAmount,
      totalAmount,
    } = body

    if (!rentalId || !receiverRuc || !receiverName || !subtotal) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos para la factura' },
        { status: 400 }
      )
    }

    // Generate invoice number
    const invoiceNumber = `001-001-${String(Date.now()).slice(-7)}`

    // Submit to SIFEN
    const sifenResponse = await submitInvoice({
      invoiceNumber,
      receiverRuc,
      receiverName,
      receiverAddress: receiverAddress || 'Asunción, Paraguay',
      items: [
        {
          description: description || 'Servicio de alquiler de maquinaria',
          quantity: 1,
          unitPrice: subtotal,
          subtotal,
        },
      ],
      subtotal,
      ivaAmount,
      totalAmount,
    })

    // In production: save invoice to database
    // const { data: invoice } = await supabase.from('invoices').insert({
    //   rental_id: rentalId,
    //   invoice_number: invoiceNumber,
    //   cdc: sifenResponse.cdc,
    //   xml_content: sifenResponse.xml,
    //   qr_code: sifenResponse.qrCode,
    //   status: sifenResponse.status === 'approved' ? 'approved' : 'draft',
    //   emitter_ruc: sifenConfig.rucEmisor,
    //   emitter_name: sifenConfig.razonSocial,
    //   receiver_ruc: receiverRuc,
    //   receiver_name: receiverName,
    //   subtotal,
    //   iva_amount: ivaAmount,
    //   total_amount: totalAmount,
    //   timbrado: sifenConfig.timbrado,
    // }).select().single()

    return NextResponse.json({
      success: true,
      invoice: {
        invoice_number: invoiceNumber,
        cdc: sifenResponse.cdc,
        qr_code: sifenResponse.qrCode,
        status: sifenResponse.status,
        message: sifenResponse.message,
      },
    })
  } catch (error) {
    console.error('Invoice generation error:', error)
    return NextResponse.json(
      { error: 'Error al generar factura electrónica' },
      { status: 500 }
    )
  }
}

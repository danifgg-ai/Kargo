import { NextRequest, NextResponse } from 'next/server'
import { confirmPayment } from '@/lib/bancard/client'

/**
 * Bancard VPOS Webhook — called by Bancard after payment completion
 * POST /api/payments/bancard/confirm
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      shop_process_id,
      response: bancardResponseStatus,
      response_details,
      authorization_number,
      ticket_number,
    } = body

    if (!shop_process_id) {
      return NextResponse.json(
        { error: 'shop_process_id requerido' },
        { status: 400 }
      )
    }

    // In production: look up the payment record by shop_process_id
    // const { data: payment } = await supabase
    //   .from('payments')
    //   .select('*, rentals(*)')
    //   .eq('shop_process_id', shop_process_id)
    //   .single()

    if (bancardResponseStatus === 'S' || bancardResponseStatus === '00') {
      // Payment successful — confirm with Bancard
      // In production:
      // await confirmPayment(shop_process_id)

      // Update payment status to approved
      // await supabase.from('payments').update({ status: 'approved', ... }).eq('shop_process_id', shop_process_id)

      // Update rental status to confirmed
      // await supabase.from('rentals').update({ status: 'confirmed' }).eq('id', payment.rental_id)

      // Suppress unused imports in demo mode
      void confirmPayment
      void response_details
      void authorization_number
      void ticket_number

      return NextResponse.json({
        status: 'confirmed',
        message: 'Pago confirmado exitosamente',
      })
    } else {
      // Payment rejected
      // await supabase.from('payments').update({ status: 'rejected', ... }).eq('shop_process_id', shop_process_id)
      // await supabase.from('rentals').update({ status: 'cancelled' }).eq('id', payment.rental_id)

      return NextResponse.json({
        status: 'rejected',
        message: 'Pago rechazado',
      })
    }
  } catch (error) {
    console.error('Bancard webhook error:', error)
    return NextResponse.json(
      { error: 'Error procesando webhook' },
      { status: 500 }
    )
  }
}

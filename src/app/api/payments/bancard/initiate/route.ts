import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { initiateSingleBuy } from '@/lib/bancard/client'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const {
      machineryId,
      machineryName,
      startDate,
      endDate,
      rateType,
      rateAmount,
      subtotal,
      iva,
      deposit,
      total,
      deliveryType,
      deliveryAddress,
      deliveryNotes,
      billingName,
      billingRuc,
      billingAddress,
      billingEmail,
      billingPhone,
    } = body

    // Validate required fields
    if (!machineryId || !startDate || !endDate || !subtotal) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 }
      )
    }

    // Generate unique IDs
    const rentalId = randomUUID()
    const shopProcessId = `KARGO-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    const rentalNumber = `R-${Date.now().toString().slice(-8)}`

    // In production, create rental and payment records in Supabase:
    // const { data: rental } = await supabase.from('rentals').insert({...}).select().single()
    // const { data: payment } = await supabase.from('payments').insert({...}).select().single()

    // For demo: simulate rental creation
    const rentalRecord = {
      id: rentalId,
      rental_number: rentalNumber,
      user_id: user.id,
      machinery_id: machineryId,
      status: 'pending_payment',
      start_date: startDate,
      end_date: endDate,
      rate_type: rateType,
      rate_amount: rateAmount,
      subtotal,
      iva_amount: iva,
      deposit_amount: deposit,
      total_amount: total,
      delivery_type: deliveryType,
      delivery_address: deliveryAddress,
      delivery_notes: deliveryNotes,
      billing_name: billingName,
      billing_ruc: billingRuc,
      billing_address: billingAddress,
      billing_email: billingEmail,
      billing_phone: billingPhone,
    }

    const totalToPay = total + deposit
    const description = `KARGO - Alquiler ${machineryName || 'maquinaria'} (${rentalNumber})`

    // In production, call Bancard API:
    // const bancardResponse = await initiateSingleBuy({
    //   shopProcessId,
    //   amount: totalToPay,
    //   description,
    // })

    // For demo: simulate Bancard response
    const bancardResponse = {
      status: 'success',
      process_id: shopProcessId,
      redirect_url: `/checkout/success?rental_id=${rentalId}&shop_process_id=${shopProcessId}`,
    }

    // Suppress unused variable warnings in demo mode
    void initiateSingleBuy
    void rentalRecord

    return NextResponse.json({
      success: true,
      rental_id: rentalId,
      rental_number: rentalNumber,
      shop_process_id: shopProcessId,
      redirect_url: bancardResponse.redirect_url,
      // In production: redirect_url would point to Bancard payment form
    })
  } catch (error) {
    console.error('Payment initiation error:', error)
    return NextResponse.json(
      { error: 'Error al iniciar el pago' },
      { status: 500 }
    )
  }
}

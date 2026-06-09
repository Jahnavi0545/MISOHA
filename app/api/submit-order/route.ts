import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const googleSheetURL = process.env.GOOGLE_SHEET_URL

    if (!googleSheetURL) {
      throw new Error('GOOGLE_SHEET_URL is not configured')
    }
    console.log("GOOGLE_SHEET_URL =", process.env.GOOGLE_SHEET_URL)

    const response = await fetch(googleSheetURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Sheets Error:', errorText)
      throw new Error('Failed to submit to Google Sheets')
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Order submitted successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Order submission error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit order',
      },
      { status: 500 }
    )
  }
}
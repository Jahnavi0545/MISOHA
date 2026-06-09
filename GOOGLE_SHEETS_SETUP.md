# Google Sheets Integration Guide for Order Collection

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "MISOHA Orders" (or your preferred name)
4. Add column headers in the first row:
   - Column A: Timestamp
   - Column B: Full Name
   - Column C: Phone
   - Column D: Email
   - Column E: Address
   - Column F: City
   - Column G: State
   - Column H: Postal Code
   - Column I: Oats Flavor
   - Column J: Oats Quantity
   - Column K: Wellness Shot
   - Column L: Shot Quantity
   - Column M: Subscription Type
   - Column N: Delivery Date
   - Column O: Special Instructions
   - Column P: Total Price

## Step 2: Set Up Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Replace the default code with this:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  
  try {
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp,
      data.fullName,
      data.phone,
      data.email,
      data.address,
      data.city,
      data.state,
      data.postalCode,
      data.oatsSelection,
      data.oatsQuantity,
      data.shotsSelection,
      data.shotsQuantity,
      data.subscriptionType,
      data.deliveryDate,
      data.instructions,
      data.totalPrice
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Deploy** → **New deployment**
4. Select type: **Web app**
5. Execute as: Your Google account
6. Who has access: **Anyone**
7. Click **Deploy**
8. Copy the **Deployment URL** (you'll need this for your website)

## Step 3: Update Your Website API Route

In your Next.js project, update `/app/api/submit-order/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Send to Google Sheets
    const googleSheetURL = process.env.GOOGLE_SHEET_URL
    
    const response = await fetch(googleSheetURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      throw new Error('Failed to submit to Google Sheets')
    }
    
    // You can add additional logic here (send email, etc.)
    
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit order' },
      { status: 500 }
    )
  }
}
```

## Step 4: Add Environment Variable

1. Go to your project settings
2. Click **Vars** (environment variables)
3. Add a new variable:
   - **Key**: `GOOGLE_SHEET_URL`
   - **Value**: Paste the Deployment URL from Step 2.8

## Step 5: Update Your Order Form

Your OrderForm component already sends data to `/api/submit-order`. The API will automatically forward it to your Google Sheet.

## How It Works

1. Customer fills out the order form on your website
2. Form data is sent to your API route (`/api/submit-order`)
3. API route sends the data to Google Sheets via the Apps Script endpoint
4. Data appears automatically in your Google Sheet in real-time

## Features

✓ Real-time data collection
✓ Automatic timestamps
✓ Easy to view and analyze in Google Sheets
✓ Can create charts and reports
✓ Shareable with your team
✓ Automatic backup to Google Drive

## Optional: Advanced Features

### Create Automatic Backups
- Set up Google Sheets with ["Archive" feature](https://support.google.com/docs/answer/9542151)
- Create a backup sheet to copy data daily

### Send Confirmation Email
Add to your API route:

```typescript
// Add nodemailer or your email service
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

await transporter.sendMail({
  from: 'orders@misoha.com',
  to: data.email,
  subject: 'Order Confirmation - MISOHA',
  html: `<h2>Thank you for your order!</h2>
         <p>Order Details:</p>
         <p>Delivery Date: ${data.deliveryDate}</p>
         <p>Total: ₹${data.totalPrice}</p>`,
})
```

### Automatic SMS Notification
Integrate with [Twilio](https://www.twilio.com) for SMS updates.

## Troubleshooting

**Data not appearing in Google Sheet?**
- Check that the API route is being called (check console/logs)
- Verify the Deployment URL is correct
- Make sure the Apps Script was deployed as "Web app" with public access

**Getting 403 error?**
- Re-deploy the Apps Script
- Make sure you selected "Anyone" for access level

**Need to update the Apps Script?**
- Go to Apps Script → Click the "Deployments" section
- Create a new version after making changes
- Update the environment variable with the new URL

---

That's it! Your order data will now automatically sync to Google Sheets.

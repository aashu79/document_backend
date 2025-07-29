// 1. REMOVE AUTHOR POSITION FROM FIELDS
export const fields = [
  "authorName",
  "authorEmail",
  "authorPhone",
  // REMOVED: "authorPosition",
  "recipientName",
  "recipientDesignation",
  "companyName",
  "resignationStatement",
  "resignationReason",
  "gratitudeNote",
  "transitionOffer",
  "closingStatement",
  "signature",
  "resignationDate",
  "lastWorkingDay",
];

// 2. UPDATED TEMPLATES

const classicTemplate = () => `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resignation Letter - {{authorName}}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Crimson Text', serif; 
      font-size: 11pt; 
      line-height: 1.5; 
      color: #333; 
      width: 100%;
      height: 100vh;
      margin: 0;
      padding: 0;
      background-color: #fff; 
    }
    .letter-container { 
      width: 100%; 
      height: 100%;
      padding: 50px;
      box-sizing: border-box; 
      background-color: #fff; 
    }
    .header { 
      text-align: center;
      margin-bottom: 40px;
    }
    .author-name {
      font-size: 20pt;
      font-weight: 600;
      color: #8B7355;
      margin-bottom: 8px;
      letter-spacing: 1px;
    }
    .document-title {
      font-size: 16pt;
      color: #8B7355;
      font-weight: 400;
      letter-spacing: 0.5px;
    }
    .date-section {
      text-align: left;
      margin: 35px 0 25px 0;
      font-size: 11pt;
      color: #333;
    }
    .recipient-section { 
      margin-bottom: 25px;
      line-height: 1.3;
    }
    .recipient-section p { 
      margin: 3px 0; 
    }
    .recipient-name {
      font-weight: 600;
    }
    .company-info {
      color: #333;
    }
    .address-info {
      color: #333;
    }
    .phone-info {
      color: #333;
    }
    .salutation {
      margin-bottom: 18px;
      font-weight: 600;
    }
    .letter-body { 
      margin-bottom: 25px;
      text-align: justify;
    }
    .letter-body p { 
      margin-bottom: 14px; 
      line-height: 1.6; 
    }
    .last-day-info {
      font-weight: 500;
    }
    .signature-section { 
      margin-top: 40px; 
    }
    .closing-statement {
      margin-bottom: 30px;
    }
    .signature-image { 
      height: 50px; 
      margin-bottom: 8px; 
    }
    .signature-image img {
      max-height: 50px;
      max-width: 200px;
    }
    .signature-name { 
      font-weight: 600;
      margin-bottom: 30px;
    }
    .contact-info {
      display: flex;
      justify-content: space-between;
      font-size: 9pt;
      color: #8B7355;
      margin-top: 30px;
      padding-top: 15px;
      border-top: 1px solid #e0e0e0;
    }
    .contact-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .icon::before {
      content: "📞";
      font-size: 10pt;
    }
    .icon.social::before {
      content: "👤";
    }
    .icon.email::before {
      content: "✉";
    }
  </style>
</head>
<body>
  <div class="letter-container">
    <div class="header">
      <div class="author-name">{{authorName}}</div>
      <div class="document-title">Resignation Letter</div>
    </div>
    
    <div class="date-section">{{resignationDate}}</div>
    
    <div class="recipient-section">
      <p class="recipient-name">{{recipientName}}</p>
      <p class="company-info">{{recipientDesignation}}</p>
      <p class="company-info">{{companyName}}</p>
      <p class="address-info">408 Byers Lane Sacramento, CA 94260</p>
      <p class="phone-info">+246-810-1214</p>
    </div>
    
    <p class="salutation">To Ms. Ferris:</p>
    
    <div class="letter-body">
      <p>{{resignationStatement}}</p>
      <p class="last-day-info">My last day is expected to be on {{lastWorkingDay}}, two weeks from today.</p>
      <p>{{gratitudeNote}}</p>
      <p>{{transitionOffer}}</p>
    </div>
    
    <div class="signature-section">
      <p class="closing-statement">{{closingStatement}}</p>
      <div class="signature-image"><img src="{{signature}}" alt="Signature" /></div>
      <p class="signature-name">{{authorName}}</p>
    </div>
    
    <div class="contact-info">
      <div class="contact-item">
        <span class="icon"></span>
        <span>{{authorPhone}}</span>
      </div>
      <div class="contact-item">
        <span class="icon social"></span>
        <span>@reallygreatsite</span>
      </div>
      <div class="contact-item">
        <span class="icon email"></span>
        <span>{{authorEmail}}</span>
      </div>
    </div>
  </div>
</body>
</html>
  `;

const modernTemplate = () => `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resignation Letter - {{authorName}}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Inter', sans-serif; 
      font-size: 11pt; 
      font-weight: 400; 
      line-height: 1.6; 
      color: #333; 
      width: 100%;
      height: 100vh;
      margin: 0;
      padding: 0;
      background-color: #fff; 
    }
    .document-container { 
      width: 100%;
      height: 100%;
      padding: 50px;
      box-sizing: border-box;
      position: relative;
      background-color: #fff;
    }
    .accent-bar { 
      position: absolute; 
      left: 50px; 
      top: 50px; 
      bottom: 50px; 
      width: 4px; 
      background-color: #4A90E2; 
    }
    .letter-content {
      margin-left: 30px;
      padding-left: 20px;
    }
    .letter-header { 
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 35px;
    }
    .author-name { 
      font-size: 20pt; 
      font-weight: 600; 
      color: #4A90E2; 
      margin: 0;
      letter-spacing: -0.5px;
    }
    .document-title {
      font-size: 14pt;
      color: #666;
      font-weight: 400;
      margin-top: 5px;
    }
    .date-line { 
      font-size: 10pt; 
      color: #666; 
      margin-top: 5px;
    }
    .recipient { 
      margin-bottom: 30px; 
    }
    .recipient p { 
      margin: 3px 0; 
      line-height: 1.4; 
    }
    .recipient-name { 
      font-weight: 600; 
    }
    .company-name {
      color: #333;
    }
    .company-address {
      color: #333;
    }
    .company-phone {
      color: #333;
    }
    .salutation {
      margin-bottom: 20px;
      font-weight: 500;
    }
    .letter-body { 
      margin-bottom: 25px;
    }
    .letter-body p { 
      margin-bottom: 15px; 
      line-height: 1.7;
      text-align: justify;
    }
    .last-day-statement {
      font-weight: 500;
    }
    .signature-section { 
      margin-top: 35px; 
    }
    .closing-statement {
      margin-bottom: 25px;
    }
    .signature-image { 
      height: 50px; 
      margin: 20px 0 10px 0; 
    }
    .signature-image img {
      max-height: 50px;
      max-width: 200px;
    }
    .signatory-name { 
      font-weight: 600; 
      margin-bottom: 20px;
    }
    .contact-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 9pt;
      color: #4A90E2;
      margin-top: 40px;
      padding-top: 15px;
      border-top: 1px solid #f0f0f0;
    }
    .contact-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .icon::before {
      content: "📞";
      font-size: 10pt;
    }
    .icon.location::before {
      content: "📍";
    }
    .icon.email::before {
      content: "✉";
    }
  </style>
</head>
<body>
  <div class="document-container">
    <div class="accent-bar"></div>
    <div class="letter-content">
      <div class="letter-header">
        <div>
          <div class="author-name">{{authorName}}</div>
          <div class="document-title">Resignation Letter</div>
        </div>
        <div class="date-line">{{resignationDate}}</div>
      </div>
      
      <div class="recipient">
        <p class="recipient-name">{{recipientName}}</p>
        <p class="company-name">{{recipientDesignation}}</p>
        <p class="company-name">{{companyName}}</p>
        <p class="company-address">408 Byers Lane Sacramento, CA 94260</p>
        <p class="company-phone">+246-810-1214</p>
      </div>
      
      <p class="salutation">To Ms. Ferris:</p>
      
      <div class="letter-body">
        <p>{{resignationStatement}}</p>
        <p class="last-day-statement">My last day is expected to be on {{lastWorkingDay}}, two weeks from today.</p>
        <p>{{gratitudeNote}}</p>
        <p>{{transitionOffer}}</p>
      </div>
      
      <div class="signature-section">
        <p class="closing-statement">{{closingStatement}}</p>
        <div class="signature-image"><img src="{{signature}}" alt="Signature" /></div>
        <p class="signatory-name">{{authorName}}</p>
      </div>
      
      <div class="contact-footer">
        <div class="contact-item">
          <span class="icon"></span>
          <span>{{authorPhone}}</span>
        </div>
        <div class="contact-item">
          <span class="icon location"></span>
          <span>123 Anywhere St., Any City, ST 1234</span>
        </div>
        <div class="contact-item">
          <span class="icon email"></span>
          <span>{{authorEmail}}</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

const minimalTemplate = () => `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resignation Letter - {{authorName}}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Inter', sans-serif; 
      font-size: 11pt; 
      font-weight: 400; 
      line-height: 1.6; 
      color: #333; 
      width: 100%;
      height: 100vh;
      margin: 0;
      padding: 0;
      background-color: #fff; 
    }
    .page { 
      width: 100%;
      height: 100%;
      padding: 50px;
      box-sizing: border-box; 
      background-color: #fff; 
    }
    .letterhead { 
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 2px solid #DC143C;
    }
    .company-logo {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .logo-squares {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .logo-row {
      display: flex;
      gap: 2px;
    }
    .logo-square {
      width: 12px;
      height: 12px;
      background-color: #DC143C;
    }
    .company-info h1 {
      font-size: 16pt;
      font-weight: 600;
      color: #333;
      margin: 0;
      letter-spacing: 0.5px;
    }
    .company-info p {
      font-size: 10pt;
      color: #666;
      margin: 2px 0 0 0;
    }
    .header-contact {
      text-align: right;
      font-size: 9pt;
      color: #666;
      line-height: 1.3;
    }
    .header-contact p {
      margin: 1px 0;
    }
    .recipient-section { 
      margin-bottom: 25px;
    }
    .recipient-section p { 
      margin: 2px 0; 
      line-height: 1.4; 
    }
    .recipient-label {
      font-weight: 500;
      margin-bottom: 5px;
    }
    .recipient-name { 
      font-weight: 600; 
    }
    .company-address {
      color: #333;
    }
    .date-line {
      text-align: right;
      margin-bottom: 30px;
      font-weight: 500;
      font-size: 11pt;
    }
    .letter-body { 
      margin-bottom: 25px;
    }
    .letter-body p { 
      margin-bottom: 15px; 
      line-height: 1.7;
      text-align: justify;
    }
    .salutation {
      font-weight: 500;
    }
    .last-day-info {
      font-weight: 500;
    }
    .signature { 
      margin-top: 35px; 
    }
    .regards {
      margin-bottom: 25px;
    }
    .signature-image { 
      height: 50px; 
      margin: 20px 0 10px 0; 
    }
    .signature-image img {
      max-height: 50px;
      max-width: 200px;
    }
    .signature-name { 
      font-weight: 600; 
      margin-bottom: 30px;
    }
    .footer-bar {
      width: 100%;
      height: 30px;
      background-color: #DC143C;
      margin-top: 40px;
      margin-left: -50px;
      margin-right: -50px;
      margin-bottom: -50px;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="letterhead">
      <div class="company-logo">
        <div class="logo-squares">
          <div class="logo-row">
            <div class="logo-square"></div>
            <div class="logo-square"></div>
          </div>
          <div class="logo-row">
            <div class="logo-square"></div>
            <div class="logo-square"></div>
          </div>
        </div>
        <div class="company-info">
          <h1>LICERIA & CO.</h1>
          <p>Real Estate</p>
        </div>
      </div>
      <div class="header-contact">
        <p>123 Anywhere St.</p>
        <p>Any City, ST 12345</p>
        <p>+123-456-7890</p>
        <p>hello@reallygreatsite.com</p>
        <p>www.reallygreatsite.com</p>
      </div>
    </div>
    
    <div class="recipient-section">
      <p class="recipient-label">To:</p>
      <p class="recipient-name">{{recipientName}}</p>
      <p class="company-address">{{companyName}}</p>
      <p class="company-address">123 Anywhere St.</p>
      <p class="company-address">Any City, ST 12345</p>
    </div>
    
    <div class="date-line">{{resignationDate}}</div>
    
    <div class="letter-body">
      <p class="salutation">Dear {{recipientName}},</p>
      <p>{{resignationStatement}}</p>
      <p class="last-day-info">My last day of employment will be {{lastWorkingDay}}.</p>
      <p>{{resignationReason}}</p>
      <p>{{gratitudeNote}}</p>
      <p>{{transitionOffer}}</p>
    </div>
    
    <div class="signature">
      <p class="regards">{{closingStatement}}</p>
      <div class="signature-image"><img src="{{signature}}" alt="Signature" /></div>
      <p class="signature-name">{{authorName}}</p>
    </div>
    
    <div class="footer-bar"></div>
  </div>
</body>
</html>
  `;

const traditionalTemplate = () => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resignation Letter - {{authorName}}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Noto Serif', Georgia, serif; 
          font-size: 12pt; 
          line-height: 1.6; 
          color: #333; 
          width: 100%;
          height: 100vh;
          margin: 0;
          padding: 0;
          background-color: #fff; 
        }
        .letter-sheet { 
          width: 100%; 
          height: 100%;
          padding: 15mm;
          box-sizing: border-box; 
          position: relative; 
          background-color: #fff; 
        }
        .letterhead {
          margin-bottom: 30px;
        }
        .company-name {
          font-size: 18pt;
          font-weight: 700;
          margin-bottom: 5px;
        }
        .company-tagline {
          font-size: 12pt;
          margin-bottom: 10px;
        }
        .letterhead-contact {
          font-size: 10pt;
          margin-bottom: 20px;
        }
        .recipient-address {
          float: left;
          width: 50%;
        }
        .date-block {
          float: right;
          text-align: right;
          width: 50%;
          font-size: 11pt;
        }
        .clear {
          clear: both;
        }
        .subject-line { 
          font-weight: 700; 
          text-align: center; 
          font-size: 14pt; 
          margin: 20px 0; 
          text-transform: uppercase; 
          letter-spacing: 2px; 
        }
        .letter-content { 
          text-align: justify; 
        }
        .greeting { 
          font-weight: 600; 
          margin-bottom: 15px;
        }
        .paragraph { 
          margin-bottom: 15px; 
        }
        .signature-area { 
          margin-top: 30px; 
        }
        .signatory { 
          font-weight: 600; 
        }
        .position {
          font-size: 10pt;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="letter-sheet">
        <div class="letterhead">
          <div class="company-name">LICERIA & CO.</div>
          <div class="company-tagline">Real Estate</div>
          <div class="letterhead-contact">
            <p>123 Anywhere St., Any City, ST 12345</p>
            <p>+123-456-7890 | hello@realigrestsite.com | www.realigrestsite.com</p>
          </div>
        </div>
        
        <div class="recipient-address">
          <p>To:</p>
          <p>{{recipientName}}</p>
          <p>123 Anywhere St., Any City, ST 12345</p>
        </div>
        
        <div class="date-block">
          <p>{{resignationDate}}</p>
        </div>
        
        <div class="clear"></div>
        
        <div class="subject-line">Notice of Resignation</div>
        
        <div class="letter-content">
          <p class="greeting">Dear {{recipientName}},</p>
          <p class="paragraph">{{resignationStatement}}</p>
          <p class="paragraph">My final day of work will be {{lastWorkingDay}}.</p>
          <p class="paragraph">{{resignationReason}}</p>
          <p class="paragraph">{{gratitudeNote}}</p>
          <p class="paragraph">{{transitionOffer}}</p>
          <p class="paragraph">{{closingStatement}}</p>
        </div>
        
        <div class="signature-area">
          <p class="signatory">Regards,</p>
          <p class="signatory">{{authorName}}</p>
          <p class="position">CEO</p>
        </div>
      </div>
    </body>
    </html>
  `;

export function rawTemplate() {
  return {
    classic: classicTemplate(),
    modern: modernTemplate(),
    minimal: minimalTemplate(),
    traditional: traditionalTemplate(),
  };
}

export function generate(formData: any) {
  // Ensure formData is an object
  const data = formData || {};

  // Helper to populate a single template
  const populateTemplate = (template: string): string => {
    let populated = template;
    for (const key of fields) {
      // Use a global regex to replace all occurrences of {{key}}
      populated = populated.replace(
        new RegExp(`{{${key}}}`, "g"),
        data[key] || ""
      );
    }
    // Special case for monogram in minimal/traditional themes
    const authorInitial = (data.authorName || " ").charAt(0);
    populated = populated.replace(
      new RegExp(`{{authorName.charAt\\(0\\)}}`, "g"),
      authorInitial
    );
    return populated;
  };

  return {
    classic: populateTemplate(classicTemplate()),
    modern: populateTemplate(modernTemplate()),
    minimal: populateTemplate(minimalTemplate()),
    traditional: populateTemplate(traditionalTemplate()),
  };
}

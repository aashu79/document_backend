/**
 * Document Module: Resignation Letter
 * Slug: resignation-letter
 *
 * This module defines the structure and generation logic for resignation letters.
 * It exports the required fields and a `generate` function that returns
 * all themed HTML templates for this document type.
 */

// 1. DEFINE REQUIRED FIELDS
export const fields = [
  "authorName",
  "authorEmail",
  "authorPhone",
  "authorPosition",
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

// 2. DEFINE THE TEMPLATES (with Placeholders)

const classicTemplate = () => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resignation Letter - {{authorName}}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+Pro:wght@400;600&display=swap');
        body { font-family: 'Source Sans Pro', Arial, sans-serif; font-size: 11pt; line-height: 1.6; color: #333; max-width: 8.5in; margin: 0 auto; padding: 0; background-color: #fff; }
        .letter-container { width: 100%; max-width: 8.5in; margin: 0 auto; padding: 1.25in 1in; box-sizing: border-box; position: relative; background-color: #fff; }
        .header { display: flex; justify-content: space-between; margin-bottom: 2.5em; }
        .date-block { text-align: right; font-weight: 400; color: #555; }
        .sender-info, .recipient-block { margin-bottom: 2em; }
        .sender-info p, .recipient-block p { margin: 0; line-height: 1.4; }
        .subject-line { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 14pt; margin: 2em 0; color: #2c3e50; text-align: center; }
        .greeting { font-weight: 600; margin-bottom: 1.5em; }
        .letter-body { text-align: justify; margin-bottom: 2em; }
        .letter-body p { margin-bottom: 1.2em; line-height: 1.7; }
        .closing { margin-top: 2em; }
        .signature-block { margin-top: 3.5em; }
        .signature-image { height: 50px; margin-bottom: 1em; }
        .signature-name { font-family: 'Playfair Display', serif; font-weight: 700; margin: 0; padding: 0; color: #2c3e50; }
        .ornament { text-align: center; margin: 2em 0; color: #7f8c8d; font-size: 18pt; }
      </style>
    </head>
    <body>
      <div class="letter-container">
        <div class="header">
          <div class="sender-info">
            <p><strong>{{authorName}}</strong></p>
            <p>{{authorPosition}}</p>
            <p>{{authorEmail}}</p>
            <p>{{authorPhone}}</p>
          </div>
          <div class="date-block"><p>{{resignationDate}}</p></div>
        </div>
        <div class="recipient-block">
          <p><strong>{{recipientName}}</strong></p>
          <p>{{recipientDesignation}}</p>
          <p>{{companyName}}</p>
        </div>
        <div class="subject-line">Letter of Resignation</div>
        <div class="letter-content">
          <p class="greeting">Dear {{recipientName}},</p>
          <div class="letter-body">
            <p>{{resignationStatement}}</p>
            <p>My last day of employment will be {{lastWorkingDay}}.</p>
            <p>{{resignationReason}}</p>
            <p>{{gratitudeNote}}</p>
            <p>{{transitionOffer}}</p>
          </div>
          <div class="closing"><p>{{closingStatement}}</p></div>
        </div>
        <div class="signature-block">
          <div class="signature-image"><img src="{{signature}}" alt="Signature" /></div>
          <p class="signature-name">{{authorName}}</p>
        </div>
        <div class="ornament">⁂</div>
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
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        body { font-family: 'Poppins', sans-serif; font-size: 11pt; font-weight: 300; line-height: 1.6; color: #2d3436; max-width: 8.5in; margin: 0 auto; padding: 0; background-color: #fff; }
        .document-container { max-width: 8.5in; margin: 0 auto; padding: 1.5in 1.25in; position: relative; }
        .letter-header { display: flex; align-items: center; margin-bottom: 3em; padding-bottom: 1em; border-bottom: 1px solid #f1f1f1; }
        .author-name { font-size: 18pt; font-weight: 500; letter-spacing: -0.5px; margin: 0; flex-grow: 1; color: #0984e3; }
        .letter-date { font-size: 10pt; color: #636e72; }
        .recipient { margin-bottom: 3em; }
        .recipient p { margin: 0; line-height: 1.5; }
        .recipient-name { font-weight: 500; }
        .letter-title { font-size: 14pt; font-weight: 600; letter-spacing: -0.5px; margin: 2em 0; color: #0984e3; }
        .letter-content p { margin-bottom: 1.5em; line-height: 1.8; }
        .letter-content .opener { font-weight: 400; }
        .signature-section { margin-top: 4em; }
        .signature-image { height: 50px; margin-bottom: 1.5em; }
        .signatory-name { font-weight: 500; margin: 0; margin-bottom: 0.2em; }
        .signatory-contact { font-size: 9pt; color: #636e72; margin: 0; }
        .accent-bar { position: absolute; left: 0; top: 1.5in; bottom: 1.5in; width: 5px; background-color: #0984e3; }
      </style>
    </head>
    <body>
      <div class="document-container">
        <div class="accent-bar"></div>
        <div class="letter-header">
          <h1 class="author-name">{{authorName}}</h1>
          <div class="letter-date">{{resignationDate}}</div>
        </div>
        <div class="recipient">
          <p class="recipient-name">{{recipientName}}</p>
          <p>{{recipientDesignation}}</p>
          <p>{{companyName}}</p>
        </div>
        <h2 class="letter-title">Letter of Resignation</h2>
        <div class="letter-content">
          <p class="opener">Dear {{recipientName}},</p>
          <p>{{resignationStatement}}</p>
          <p>My last day of employment will be {{lastWorkingDay}}.</p>
          <p>{{resignationReason}}</p>
          <p>{{gratitudeNote}}</p>
          <p>{{transitionOffer}}</p>
          <p>{{closingStatement}}</p>
        </div>
        <div class="signature-section">
          <div class="signature-image"><img src="{{signature}}" alt="Signature" /></div>
          <p class="signatory-name">{{authorName}}</p>
          <p class="signatory-contact">{{authorEmail}} | {{authorPhone}}</p>
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Montserrat:wght@300;400;500&display=swap');
        body { font-family: 'Montserrat', Arial, sans-serif; font-size: 11pt; font-weight: 300; line-height: 1.7; color: #2d3436; max-width: 8.5in; margin: 0 auto; padding: 0; background-color: #fff; }
        .page { max-width: 8.5in; margin: 0 auto; padding: 1.5in 1in; box-sizing: border-box; position: relative; background-color: #fff; }
        .letterhead { position: relative; margin-bottom: 3em; padding-bottom: 1.5em; border-bottom: 1px solid #e0e0e0; }
        .monogram { position: absolute; top: 0; left: 0; width: 50px; height: 50px; border: 1px solid #2d3436; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 24pt; font-weight: 600; color: #2d3436; }
        .author-details { margin-left: 70px; }
        .author-name { font-family: 'Cormorant Garamond', serif; font-size: 18pt; font-weight: 600; margin: 0; color: #2d3436; letter-spacing: 1px; text-transform: uppercase; }
        .author-contact { font-size: 9pt; color: #636e72; margin-top: 0.5em; }
        .date-line { text-align: right; font-size: 10pt; color: #636e72; margin-top: -3em; }
        .recipient-section { margin-bottom: 3em; }
        .recipient-section p { margin: 0 0 0.2em 0; line-height: 1.5; }
        .recipient-name { font-weight: 500; }
        .document-title { font-family: 'Cormorant Garamond', serif; text-align: center; font-size: 18pt; font-weight: 600; color: #2d3436; margin: 2em 0; position: relative; letter-spacing: 1.5px; }
        .document-title::before, .document-title::after { content: ""; display: inline-block; width: 80px; height: 1px; background-color: #b2bec3; margin: 0 10px; vertical-align: middle; }
        .letter-body { text-align: justify; margin-bottom: 2em; }
        .letter-body p { margin-bottom: 1.2em; }
        .salutation, .complimentary-close { font-weight: 400; }
        .signature { margin-top: 4em; }
        .signature-image { height: 60px; margin-bottom: 1.5em; }
        .signature-name { font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 14pt; margin: 0; color: #2d3436; }
        .signature-title { font-size: 10pt; color: #636e72; margin: 0.3em 0 0 0; }
        .footer { margin-top: 4em; text-align: center; font-size: 9pt; color: #b2bec3; }
      </style>
    </head>
    <body>
      <div class="page">
        <div class="letterhead">
          <div class="monogram">{{authorName.charAt(0)}}</div>
          <div class="author-details">
            <h1 class="author-name">{{authorName}}</h1>
            <div class="author-contact">{{authorEmail}} | {{authorPhone}}</div>
          </div>
          <div class="date-line">{{resignationDate}}</div>
        </div>
        <div class="recipient-section">
          <p class="recipient-name">{{recipientName}}</p>
          <p>{{recipientDesignation}}</p>
          <p>{{companyName}}</p>
        </div>
        <div class="document-title">Resignation</div>
        <div class="letter-body">
          <p class="salutation">Dear {{recipientName}},</p>
          <p>{{resignationStatement}}</p>
          <p>My final day of service will be {{lastWorkingDay}}.</p>
          <p>{{resignationReason}}</p>
          <p>{{gratitudeNote}}</p>
          <p>{{transitionOffer}}</p>
          <p class="complimentary-close">{{closingStatement}}</p>
        </div>
        <div class="signature">
          <div class="signature-image"><img src="{{signature}}" alt="Signature" /></div>
          <p class="signature-name">{{authorName}}</p>
          <p class="signature-title">{{authorPosition}}</p>
        </div>
        <div class="footer">Confidential | Personal</div>
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
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Noto+Serif:wght@400;700&display=swap');
        body { font-family: 'Noto Serif', Georgia, serif; font-size: 12pt; line-height: 1.6; color: #333; max-width: 8.5in; margin: 0 auto; padding: 0; background-color: #fff; }
        .letter-sheet { width: 100%; max-width: 8.5in; margin: 0 auto; padding: 1.25in 1in; box-sizing: border-box; position: relative; background-color: #fff; background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f9f9f9' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E"); }
        .content-area { background-color: #fff; padding: 2em; border: 1px solid #e0e0e0; }
        .header-section { text-align: right; margin-bottom: 2em; border-bottom: 2px solid #f0f0f0; padding-bottom: 1em; }
        .sender-block p { margin: 0; line-height: 1.5; }
        .date-block { font-weight: 700; margin-top: 1em; }
        .address-section { margin-bottom: 2.5em; }
        .address-section p { margin: 0; line-height: 1.5; }
        .subject-line { font-family: 'Lora', serif; font-weight: 700; text-align: center; font-size: 14pt; margin: 2em 0; text-transform: uppercase; letter-spacing: 2px; position: relative; }
        .subject-line::after { content: ""; display: block; width: 120px; height: 2px; background-color: #333; margin: 0.5em auto 0; }
        .letter-content { text-align: justify; }
        .greeting, .closing { font-family: 'Lora', serif; font-weight: 600; }
        .paragraph { margin-bottom: 1.5em; text-indent: 1.5em; }
        .paragraph.first { text-indent: 0; }
        .signature-area { margin-top: 3em; }
        .signature-image { height: 60px; margin: 2em 0 1em; }
        .signatory { font-family: 'Lora', serif; font-weight: 600; }
        .watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 80pt; color: rgba(200, 200, 200, 0.07); font-family: 'Lora', serif; font-weight: 700; white-space: nowrap; pointer-events: none; }
      </style>
    </head>
    <body>
      <div class="letter-sheet">
        <div class="watermark">Resignation</div>
        <div class="content-area">
          <div class="header-section">
            <div class="sender-block">
              <p><strong>{{authorName}}</strong></p>
              <p>{{authorEmail}}</p>
              <p>{{authorPhone}}</p>
            </div>
            <div class="date-block">{{resignationDate}}</div>
          </div>
          <div class="address-section">
            <p><strong>{{recipientName}}</strong></p>
            <p>{{recipientDesignation}}</p>
            <p>{{companyName}}</p>
          </div>
          <div class="subject-line">Notice of Resignation</div>
          <div class="letter-content">
            <p class="greeting">Dear {{recipientName}},</p>
            <p class="paragraph first">{{resignationStatement}}</p>
            <p class="paragraph">My final day of work will be {{lastWorkingDay}}.</p>
            <p class="paragraph">{{resignationReason}}</p>
            <p class="paragraph">{{gratitudeNote}}</p>
            <p class="paragraph">{{transitionOffer}}</p>
            <p class="paragraph closing">{{closingStatement}}</p>
            <div class="signature-area">
              <div class="signature-image"><img src="{{signature}}" alt="Signature" /></div>
              <p class="signatory">{{authorName}}</p>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

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

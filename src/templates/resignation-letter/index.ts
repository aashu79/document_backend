/**
 * Document Module: Resignation Letter
 * Slug: resignation-letter
 *
 * This module defines the structure and generation logic for resignation letters.
 * It exports the required fields and a `generate` function that returns
 * all themed HTML templates for this document type.
 */

// 1. DEFINE REQUIRED FIELDS
// These are the fields this document type needs. The frontend will build a form
// based on this, and the backend will use it to create placeholder data.
export const fields = [
  "authorName",
  "authorPosition",
  "authorEmail",
  "authorPhone",
  "companyName",
  "recipientName",
  "recipientDesignation",
  "resignationDate",
  "lastWorkingDay",
  "resignationStatement",
  "gratitudeNote",
  "transitionOffer",
  "closingStatement",
  "signatureImage", // For base64 image data
  "resignationReason", // Optional field
];

// 2. DEFINE THE TEMPLATES (with Placeholders)
// Each template is a function that returns a complete HTML string with placeholders.
// This keeps the code clean and separates the raw template from the data logic.

const classicTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resignation Letter</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Open+Sans:wght@400;600&display=swap');
        body {
            font-family: 'Merriweather', 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.6;
            color: #1a1a1a;
            background-color: #f8f8f8;
            margin: 0;
            padding: 0;
        }
        .page {
            width: 8.5in;
            min-height: 11in;
            margin: 0 auto;
            padding: 1in;
            box-sizing: border-box;
            background-color: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .sender-info {
            text-align: right;
            font-family: 'Open Sans', sans-serif;
            font-size: 11pt;
            line-height: 1.5;
        }
        .sender-info .name {
            font-weight: 700;
            font-size: 12pt;
        }
        .recipient-info {
            margin-top: 3em;
            margin-bottom: 2em;
            line-height: 1.5;
        }
        .recipient-info .name {
            font-weight: 700;
        }
        .date {
            margin-top: 2em;
            margin-bottom: 2em;
        }
        .subject {
            font-weight: 700;
            text-decoration: underline;
            margin-bottom: 2em;
        }
        .body-content p {
            margin-bottom: 1.2em;
            text-align: justify;
        }
        .closing {
            margin-top: 2em;
        }
        .signature-block {
            margin-top: 3em;
        }
        .signature-image {
            max-height: 50px;
            margin-bottom: 0.5em;
        }
        .typed-name {
            font-weight: 700;
        }
        @media print {
            body { background-color: white; }
            .page { box-shadow: none; margin: 0; padding: 0.5in; }
        }
    </style>
</head>
<body>
    <div class="page">
        <div class="sender-info">
            <p class="name">{{authorName}}</p>
            <p>{{authorPosition}}</p>
            <p>{{authorEmail}}</p>
            <p>{{authorPhone}}</p>
        </div>

        <p class="date">{{resignationDate}}</p>

        <div class="recipient-info">
            <p class="name">{{recipientName}}</p>
            <p>{{recipientDesignation}}</p>
            <p>{{companyName}}</p>
        </div>

        <p class="subject">Subject: Formal Notice of Resignation</p>

        <p>Dear {{recipientName}},</p>

        <div class="body-content">
            <p>{{resignationStatement}} My last day of employment will be on {{lastWorkingDay}}.</p>
            <p>{{resignationReason}}</p>
            <p>{{gratitudeNote}} I have genuinely enjoyed my time at {{companyName}} and I am grateful for the support and opportunities I have received.</p>
            <p>{{transitionOffer}} Please let me know how I can be of assistance during this transition period.</p>
        </div>

        <p class="closing">Sincerely,</p>

        <div class="signature-block">
            <img class="signature-image" src="{{signatureImage}}" alt="" />
            <p class="typed-name">{{authorName}}</p>
        </div>
    </div>
</body>
</html>`;

const modernTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resignation Letter</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        body {
            font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
            font-size: 11pt;
            font-weight: 400;
            line-height: 1.7;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .page {
            width: 8.5in;
            min-height: 11in;
            margin: 0 auto;
            padding: 0;
            box-sizing: border-box;
            background-color: white;
            display: flex;
        }
        .left-pane {
            width: 3in;
            background-color: #2c3e50;
            color: white;
            padding: 1in;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .left-pane .author-details .name {
            font-size: 24pt;
            font-weight: 700;
            margin-bottom: 0.2em;
        }
        .left-pane .author-details .position {
            font-size: 12pt;
            font-weight: 300;
            border-bottom: 1px solid #3498db;
            padding-bottom: 1em;
        }
        .left-pane .contact-info p {
            margin: 0.5em 0;
            font-size: 10pt;
            word-wrap: break-word;
        }
        .right-pane {
            width: 5.5in;
            padding: 1in 1in 1in 0.75in;
            box-sizing: border-box;
        }
        .right-pane .recipient-info {
            margin-bottom: 2em;
        }
        .right-pane .recipient-info .name { font-weight: 500; }
        .right-pane .date { margin-bottom: 2em; font-size: 11pt; color: #555; }
        .right-pane .body-content p { margin-bottom: 1.2em; }
        .right-pane .closing { margin-top: 3em; }
        .right-pane .signature-block { margin-top: 0.5em; }
        .right-pane .signature-image { max-height: 45px; }
        @media print {
            body { background-color: white; }
            .page { box-shadow: none; margin: 0; padding: 0; width: 100%; height: 100%;}
            .left-pane, .right-pane { padding: 0.5in; }
            .left-pane { width: 33%; }
            .right-pane { width: 67%; padding-left: 0.25in; }
        }
    </style>
</head>
<body>
    <div class="page">
        <div class="left-pane">
            <div class="author-details">
                <p class="name">{{authorName}}</p>
                <p class="position">{{authorPosition}}</p>
            </div>
            <div class="contact-info">
                <p><strong>Date of Submission:</strong><br>{{resignationDate}}</p>
                <p><strong>Contact:</strong><br>{{authorEmail}}<br>{{authorPhone}}</p>
            </div>
        </div>
        <div class="right-pane">
            <div class="recipient-info">
                <p class="name">{{recipientName}}</p>
                <p>{{recipientDesignation}}</p>
                <p>{{companyName}}</p>
            </div>
            <p>Dear {{recipientName}},</p>
            <div class="body-content">
                <p>{{resignationStatement}}</p>
                <p>My final day of employment with {{companyName}} will be {{lastWorkingDay}}. This is in accordance with the required notice period.</p>
                <p>{{resignationReason}}</p>
                <p>{{gratitudeNote}}</p>
                <p>{{transitionOffer}}</p>
                <p>{{closingStatement}}</p>
            </div>
            <p class="closing">Best regards,</p>
            <div class="signature-block">
                <img class="signature-image" src="{{signatureImage}}" alt="" />
                <p>{{authorName}}</p>
            </div>
        </div>
    </div>
</body>
</html>`;

const minimalTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resignation Letter</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');
        body {
            font-family: 'Inter', sans-serif;
            font-size: 10pt;
            font-weight: 400;
            line-height: 1.8;
            color: #404040;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .page {
            width: 8.5in;
            min-height: 11in;
            margin: 0 auto;
            padding: 1.25in;
            box-sizing: border-box;
            background-color: white;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 1.5em;
            margin-bottom: 3em;
        }
        .header .author .name {
            font-size: 14pt;
            font-weight: 500;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin: 0;
        }
        .header .author .position {
            font-size: 10pt;
            font-weight: 300;
            color: #888;
        }
        .header .contact-info {
            text-align: right;
            font-size: 9pt;
            color: #666;
            line-height: 1.6;
        }
        .body-content p {
            margin-bottom: 1.5em;
        }
        .key-info {
            background-color: #f9f9f9;
            border-left: 3px solid #ccc;
            padding: 1em 1.5em;
            margin: 2em 0;
            font-size: 10pt;
        }
        .salutation {
            font-weight: 500;
        }
        .signature-block {
            margin-top: 4em;
        }
        .signature-image {
            max-height: 40px;
        }
        @media print {
            body { background-color: white; }
            .page { box-shadow: none; margin: 0; padding: 0.5in; }
        }
    </style>
</head>
<body>
    <div class="page">
        <div class="header">
            <div class="author">
                <p class="name">{{authorName}}</p>
                <p class="position">{{authorPosition}}</p>
            </div>
            <div class="contact-info">
                <p>{{resignationDate}}</p>
                <p>{{authorEmail}}</p>
                <p>{{authorPhone}}</p>
            </div>
        </div>

        <div class="recipient-info">
            <p>{{recipientName}}</p>
            <p>{{recipientDesignation}}</p>
            <p>{{companyName}}</p>
        </div>
        
        <br/><br/>

        <p class="salutation">Subject: Resignation - {{authorName}}</p>
        <div class="body-content">
            <p>{{resignationStatement}}</p>
            <div class="key-info">
                <strong>Effective Last Day of Employment:</strong> {{lastWorkingDay}}
            </div>
            <p>{{gratitudeNote}}</p>
            <p>{{transitionOffer}}</p>
            <p>{{closingStatement}}</p>
        </div>
        
        <div class="signature-block">
            <p>Regards,</p>
            <img class="signature-image" src="{{signatureImage}}" alt="" />
            <p>{{authorName}}</p>
        </div>
    </div>
</body>
</html>`;

const traditionalTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resignation Letter</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=EB+Garamond:wght@400&display=swap');
        body {
            font-family: 'EB Garamond', 'Georgia', serif;
            font-size: 13pt;
            line-height: 1.7;
            color: #212121;
            background-color: #fdfdfd;
            margin: 0;
            padding: 0;
        }
        .page {
            width: 8.5in;
            min-height: 11in;
            margin: 0 auto;
            padding: 1.25in;
            box-sizing: border-box;
            background-color: #ffffff;
            border: 1px solid #e0e0e0;
        }
        .letterhead {
            text-align: center;
            margin-bottom: 3em;
        }
        .letterhead .name {
            font-family: 'Cormorant Garamond', serif;
            font-size: 26pt;
            font-weight: 700;
            margin: 0;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        .letterhead .contact {
            font-size: 10pt;
            color: #555;
            margin-top: 0.5em;
        }
        .letterhead .contact::after {
            content: '';
            display: block;
            width: 100px;
            height: 1px;
            background-color: #ccc;
            margin: 1.5em auto 0;
        }
        .main-content {
            text-align: justify;
        }
        .main-content .date, .main-content .recipient-info {
            margin-bottom: 2em;
        }
        .main-content p {
            margin-bottom: 1.2em;
            text-indent: 2em;
        }
        .main-content p:first-of-type {
            text-indent: 0;
        }
        .signature-block {
            margin-top: 4em;
            text-indent: 0;
        }
        .signature-image {
            max-height: 55px;
            mix-blend-mode: darken;
        }
        @media print {
            body { background-color: white; }
            .page { box-shadow: none; margin: 0; padding: 0.5in; border: none; }
        }
    </style>
</head>
<body>
    <div class="page">
        <div class="letterhead">
            <p class="name">{{authorName}}</p>
            <p class="contact">{{authorEmail}} &bull; {{authorPhone}}</p>
        </div>

        <div class="main-content">
            <p class="date">{{resignationDate}}</p>
            <div class="recipient-info">
                {{recipientName}}<br>
                {{recipientDesignation}}<br>
                {{companyName}}
            </div>
            
            <p>Dear {{recipientName}},</p>
            <p>{{resignationStatement}} I wish to inform you that my final day of service will be {{lastWorkingDay}}.</p>
            <p>{{resignationReason}}</p>
            <p>{{gratitudeNote}} I want to express my sincere appreciation for the opportunities I have been given at {{companyName}}. I have valued my time here and the relationships I've built.</p>
            <p>{{transitionOffer}} I am dedicated to facilitating a seamless handover of my duties and responsibilities before my departure.</p>
            <p>{{closingStatement}}</p>
            <p>Yours faithfully,</p>

            <div class="signature-block">
                <img class="signature-image" src="{{signatureImage}}" alt="" />
                <p>{{authorName}}</p>
            </div>
        </div>
    </div>
</body>
</html>`;

// 3. DEFINE THE GENERATOR FUNCTION
// This function takes form data, populates the templates, and returns them all.
// It also handles defaults and date formatting.
export function generate(formData: any) {
  // Provide defaults for any missing data
  const safeData = {
    authorName: formData.authorName || "{{authorName}}",
    authorPosition: formData.authorPosition || "{{authorPosition}}",
    authorEmail: formData.authorEmail || "{{authorEmail}}",
    authorPhone: formData.authorPhone || "{{authorPhone}}",
    companyName: formData.companyName || "{{companyName}}",
    recipientName: formData.recipientName || "{{recipientName}}",
    recipientDesignation:
      formData.recipientDesignation || "{{recipientDesignation}}",
    resignationDate: formData.resignationDate || "{{resignationDate}}",
    lastWorkingDay: formData.lastWorkingDay || "{{lastWorkingDay}}",
    resignationStatement:
      formData.resignationStatement || "{{resignationStatement}}",
    gratitudeNote: formData.gratitudeNote || "{{gratitudeNote}}",
    transitionOffer: formData.transitionOffer || "{{transitionOffer}}",
    closingStatement: formData.closingStatement || "{{closingStatement}}",
    signatureImage: formData.signatureImage || "", // Default to empty string
    resignationReason: formData.resignationReason || "", // Optional
  };

  const templates = {
    classic: classicTemplate(),
    modern: modernTemplate(),
    minimal: minimalTemplate(),
    traditional: traditionalTemplate(),
  };

  // This function can be used to inject real data into a template string
  const populateTemplate = (
    template: string,
    data: typeof safeData
  ): string => {
    let populated = template;
    for (const key in data) {
      // Important: Ensure the key is a valid key of the data object
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const typedKey = key as keyof typeof data;
        populated = populated.replace(
          new RegExp(`{{${typedKey}}}`, "g"),
          data[typedKey]
        );
      }
    }
    // Remove any optional placeholders that were not filled
    populated = populated.replace(
      /<p>{{resignationReason}}<\/p>/g,
      data.resignationReason ? `<p>${data.resignationReason}</p>` : ""
    );
    return populated;
  };

  // Return an object where each key is a theme and each value is the populated HTML
  return {
    classic: populateTemplate(templates.classic, safeData),
    modern: populateTemplate(templates.modern, safeData),
    minimal: populateTemplate(templates.minimal, safeData),
    traditional: populateTemplate(templates.traditional, safeData),
  };
}

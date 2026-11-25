# B. Santhosh Kumar — Bootstrap Portfolio with Contact Form

## Technology
- HTML5, CSS3, JavaScript
- Bootstrap 5.3.3 and Bootstrap Icons
- FormSubmit AJAX endpoint for email delivery
- WhatsApp Click-to-Chat (`wa.me`) for preparing a message

## Folder structure
```text
portfolio/
├── image/
│   └── photo.jpg
├── index.html
├── style.css
├── script.js
├── Santhosh_Kumar_Resume.pdf
└── README.md
```

## Run in VS Code
1. Extract the ZIP and open the folder in VS Code.
2. Add your portrait as `image/photo.jpg`.
3. Keep the CV in the root folder as `Santhosh_Kumar_Resume.pdf`.
4. Install Live Server and open `index.html` with Live Server.
5. Internet is required for Bootstrap, Google Fonts, and FormSubmit.

## Contact form setup (important)
The form posts to FormSubmit using `https://formsubmit.co/ajax/Santhoshsa092o@gmail.com`.
- On the first form submission, FormSubmit may send an activation email to `Santhoshsa092o@gmail.com`.
- Open that mailbox and click the activation link. Until activation is completed, FormSubmit will not deliver form submissions.
- After activation, test the form with a message you can identify.

## WhatsApp behavior
After the email request succeeds, WhatsApp opens with the submitted name, email, phone, subject and message pre-filled for `+91 99402 12094`.
The visitor must press **Send** in WhatsApp. Websites cannot send a WhatsApp message silently on a visitor's behalf.

## GitHub
Replace `YOUR_GITHUB_USERNAME` in `index.html` with your actual GitHub username.

## Before publishing
Verify contact details and all external links. Do not publish private credentials or API secrets in frontend code.

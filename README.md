# Sources Used:
- Ionic 1 SideMenu Framework - https://ionicframework.com/
- Ionic Cordova Barcode Scanner - http://ngcordova.com/docs/plugins/barcodeScanner/
- angular-qr - https://github.com/janantala/angular-qr

# Features Implemented:
- Authentication
- Home
- Schedule
- Projects
- Ideas
- FAQs
- Admin Home (for admin users only - not visible on Ionic View)
  - Events
  - Subevents
  - Articles
  - Vote Results
- QR Barcode Scanner

# Not completed:
- Events
  - create-event.html
  - edit-event.html
  - manage-events.html

- Subevents
  - create-subevent.html
  - edit-subevent.html
  - list-subevents.html

- Articles
  - list-articles.html

- Projects
  - popover in nav-bar for edit and delete options

# Bugs
- Data objects need to be updated/refreshed between views to keep latest changes. Data is not persistent between web application and mobile.
- User not showing on comments and faqs

# Notable Folders
- core: home, menu
- config: heroku site

# Instructions for Running Locally
- npm install -g cordova ionic
- clone repository
- npm install
- start app: ionic serve
- disable CORS with Google Chrome extension when running ionic serve: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en

# Web Application:
- Deployed Site - https://still-eyrie-27550.herokuapp.com/
- Github Page - https://github.com/CEN3031GroupA/US-Hackathon

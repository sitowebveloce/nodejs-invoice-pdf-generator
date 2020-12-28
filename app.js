// IMPORT PACKAGES
import express from 'express'
import easyinvoice from 'easyinvoice';
import fs from 'fs';
import path from 'path';
// APP
const app = express();
// IMAGE PATH
let imgPath = path.resolve('img', 'invoice.png');
// Function to encode file data to base64 encoded string
function base64_encode(img) {
    // read binary data
    let png = fs.readFileSync(img);
    // convert binary data to base64 encoded string
    return new Buffer.from(png).toString('base64');
};
// DATA OBJECT
let data = {
    //"documentTitle": "RECEIPT", //Defaults to INVOICE
    "currency": "EUR",
    "taxNotation": "vat", //or gst
    "marginTop": 25,
    "marginRight": 25,
    "marginLeft": 25,
    "marginBottom": 25,
    "logo": `${base64_encode(imgPath)}`, //or base64
    //"logoExtension": "png", //only when logo is base64
    "sender": {
        "company": "Buy Me A Gradient",
        "address": "Corso Italia 13",
        "zip": "1234 AB",
        "city": "Milan",
        "country": "IT"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "client": {
       	"company": "Client Corp",
       	"address": "Clientstreet 456",
       	"zip": "4567 CD",
       	"city": "Clientcity",
       	"country": "Clientcountry"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "invoiceNumber": "2020.0001",
    "invoiceDate": "05-01-2020",
    "products": [
        {
            "quantity": "2",
            "description": "Test1",
            "tax": 6,
            "price": 33.87
        },
        {
            "quantity": "4",
            "description": "Test2",
            "tax": 21,
            "price": 10.45
        }
    ],
    "bottomNotice": "Kindly pay your invoice within 15 days."
};
// INVOICE PDF FUNCTION
const invoicePdf = async ()=>{
//Create your invoice! Easy!
let result = await easyinvoice.createInvoice(data);
fs.writeFileSync(`./invoice/invoice${Date.now()}.pdf`, result.pdf, 'base64');
}
invoicePdf();

// SERVER LISTENER
let PORT = 3001;
app.listen(PORT, ()=>{
    console.log('Server beating...')
});

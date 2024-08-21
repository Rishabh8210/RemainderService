const pdf = require('pdfkit')
const fs = require('fs')


function generateTicketPdf(bookingDetails) {
    const doc = new pdf()

    doc.fontSize(40).text('BOARDING PASS', {align: 'center'})
    doc.moveTo(10, 120)
   .lineTo(600, 120)
   .stroke();
    doc.fontSize(18).text(`Ticket Number: ${bookingDetails.id}`, 50,150)
    doc.fontSize(25).text('FLIGHT INFORMATION', 50, 200)
    doc.fontSize(15).text(`From: ${bookingDetails.from}`, 80, 250);
    doc.fontSize(15).text(`To: ${bookingDetails.to}`, 350, 250);
    doc.fontSize(15).text(`Date: ${bookingDetails.date}`, 80, 330);
    doc.fontSize(15).text(`Time: ${bookingDetails.time}`, 350, 330);

    doc.fontSize(25).text('PASSENGER DETAILS', 50, 400)
    doc.fontSize(14).text(`Name: ${bookingDetails.name}`, 80, 450);
    doc.fontSize(14).text(`Age: ${bookingDetails.age}`, 300, 450);
    doc.fontSize(14).text(`Gender: ${bookingDetails.gender}`, 80, 520);
    doc.fontSize(14).text(`Phone number: ${bookingDetails.phone}`, 300, 520);

    doc.end()

    doc.pipe(fs.createWriteStream('src/utils/DigitalTicket/Ticket.pdf'));
}

// From to date time
// Name age phone gender

module.exports = generateTicketPdf
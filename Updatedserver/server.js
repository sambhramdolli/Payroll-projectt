const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const crypto = require('crypto');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());
// Common transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sharathnvmca@gmail.com',
        pass: 'pgkz nhat tswr gwnp' // Use environment variables in production
    }
});
// Resignation Requests Memory Store
let resignationRequests = {};
// Resignation Email Functionality
app.post('/send-resignation', (req, res) => {
    const { name, id, domain, reason, managerEmail } = req.body;
    const approvalToken = crypto.randomBytes(16).toString('hex');
    resignationRequests[approvalToken] = { name, id, domain, reason, status: 'pending', token: approvalToken };
    const mailOptions = {
        from: 'sharathnvmca@gmail.com',
        to: managerEmail,
        subject: 'Resignation Letter',
        html: `
        <p>Dear mannager,</p>
        <p>Please accept this letter as a formal notice of my resignation from my position as a Software Engineer.</p>
        <p>As per our discussion, I will be joining a new role at a different organization starting .</p>
        <p>Thank you for your support during my time here. I am confident this opportunity will enhance my skills and contribute positively to my future endeavors.</p>
        <p>Sincerely,</p>
        <p>${name}</p>
        <p>(Employee ID: ${id})</p>
        <p>Reason: ${reason}</p>
        <p>
          <a href="http://localhost:5000/approve-resignation?token=${approvalToken}" style="color:green; font-size:20px; margin-right:20px;">:heavy_check_mark: Approve</a>
          <a href="http://localhost:5000/cancel-resignation?token=${approvalToken}" style="color:red; font-size:20px;">✘ Cancel</a>
        </p>
      `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Failed to send email.');
        }
        res.status(200).send('Email sent successfully.');
    });
});
app.get('/approve-resignation', (req, res) => {
    const { token } = req.query;
    if (resignationRequests[token]) {
        resignationRequests[token].status = 'approved';
        res.send('Resignation Approved Successfully!');
    } else {
        res.send('Invalid or Expired Token.');
    }
});
app.get('/cancel-resignation', (req, res) => {
    const { token } = req.query;
    if (resignationRequests[token]) {
        resignationRequests[token].status = 'cancelled';
        res.send('Resignation Cancelled Successfully!');
    } else {
        res.send('Invalid or Expired Token.');
    }
});
// General Email Sending
app.post('/send-email', (req, res) => {
    const { recipients, subject, body } = req.body;
    const mailOptions = {
        from: 'sharathnvmca@gmail.com',
        to: recipients,
        subject: subject,
        html: body,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Failed to send email.');
        }
        res.status(200).send('Email sent successfully.');
    });
});
// Interview Scheduling Email
app.post('/send-interview-email', (req, res) => {
    const { to, subject, applicant, date, time, link } = req.body;
    const mailOptions = {
        from: 'sharathnvmca@gmail.com',
        to: to,
        subject: subject,
        html: `
            Dear ${applicant},
Your interview is scheduled for ${date} at ${time}.
Please join the meeting using the following link: ${link}
About Syliqon Software Pvt Ltd:
Sylicon Software Pvt Ltd is a leading provider of cutting-edge technology solutions that empower businesses to reach their full potential. We are committed to innovation, quality, and customer satisfaction.
Thank you, and we look forward to your interview.
Best regards,
HR, Syliqon Software Pvt Ltd
BTM Layout, Kuvepu Nagara,
Prabhavathi Bhaiva
        `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Failed to send email.');
        }
        res.status(200).send('Email sent successfully.');
    });
});
// Leave Request Emails
app.post('/send-leave-request', (req, res) => {
    const { email, leaveType, leaveFromDate, leaveToDate, reason, managerName } = req.body;
    const mailOptions = {
        from: 'sharathnvmca@gmail.com',
        to: email,
        subject: 'Leave Request Submitted',
        html: `
            Dear ${managerName},
            <p>I’m requesting leave from ${leaveFromDate} to ${leaveToDate} due to ${reason}.</p>
            <p>Best regards,<br>[Your Name]</p>
        `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Failed to send email.');
        }
        res.status(200).send('Email sent successfully.');
    });
});
app.post('/update-leave-status', (req, res) => {
    const { email, leaveType, leaveFromDate, leaveToDate, status, managerName } = req.body;
    const mailOptions = {
        from: 'sharathnvmca@gmail.com',
        to: email,
        subject: `Leave Request ${status}`,
        html: `
            Dear [Employee's Name],
            <p>Your leave request from ${leaveFromDate} to ${leaveToDate} has been ${status}.</p>
            <p>Best regards,<br>${managerName}</p>
        `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Failed to send email.');
        }
        res.status(200).send('Email sent successfully.');
    });
});
// 5. Raise Ticket Functionality
app.post('/raise-ticket', (req, res) => {
    const { name, email, issue, domain } = req.body;
    const mailOptions = {
        from: 'sharathnvmca@gmail.com',
        to: 'sharathachar55@gmail.com', // Replace with the actual support email
        subject: `New Support Ticket: ${issue}`,
        html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Issue: ${issue}</p>
            <p>Domain: ${domain}</p>
        `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Failed to raise ticket.');
        }
        res.status(200).send('Ticket raised successfully.');
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
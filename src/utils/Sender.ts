//This is going to use Mailgun and Twilio 

export const mailer = function(to: string,messageSubject: string, messageData: any){
    const api_key = 'key-7feebf9e516c407250a971d69230c72e';
    const domain = 'mg.edrivenapps.com';
    const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
    let data: any = {
    from: 'Parallell Support <levar.berry@edrivenent.com>',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomeness!'
    };
    data.to = to;
    data.subject = messageSubject;
    data.text = messageData;
    mailgun.messages().send(data, function (error: any, body: any) {
    console.log(error,body);
    });
    return "OK"
}


export const texter = function(to: string, messageData: string){
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
    .create({
        body: messageData,
        from: '+15133181360',
        to
    })
    .then( (messageData: any) => console.log(messageData.sid))
    .catch( (err: any) => console.log(err));
}
onload = () =>{


    const submit = document.getElementById('button_submit');

    submit.onclick = sendMessage;

    async function sendMessage() {
        const name = document.getElementById('contact_name');
        const mail = document.getElementById('contact_mail');
        const phone = document.getElementById('contact_phone');
        const message = document.getElementById('contact_message');
        const response = document.getElementById('contact_status');

        let postBody = {
            from: mail,
            html:`Navn: '${name.value}' <br> Email: '${mail.value} <br> Telefon: '${phone.value} <br> Besked: <br> '${message.value}`
        };

        let status = await fetch('/api/email/reservation', {method: 'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(postBody)
        });

        let statusJSON = await status.json();

        if(statusJSON.success){
            response.innerText = 'Besked Sendt!'
        }else {
            response.innerText = 'Der skete en fejl'
        }
    }
};
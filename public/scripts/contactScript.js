onload = async () =>{


    const name = document.getElementById('contact_name').value;
    const mail = document.getElementById('contact_mail').value;
    const phone = document.getElementById('contact_phone').value;
    const message = document.getElementById('contact_message').value;
    const submit = document.getElementById('button_submit');




    submit.onclick = async () =>{

        let postBody = {
          from: mail,
          html:`Navn: '${name}' <br> Email: '${mail} <br> Telefon: '${phone} <br> Besked: <br> '${message}`
        };

        let status = await fetch('/api/email/kontakt',
            {method: 'POST', headers:{"Content-Type":"application/json"}, body:JSON.stringify(postBody)});
        console.log(status.status);
        console.log(status);

    }


};
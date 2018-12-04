onload = async () => {
    navigation();
    footer();

    const katalogProducts = await fetch('/api/produkter');
    const katalogProductsJSON = await katalogProducts.json();

    const katalogTemplate = await fetch('/templates/produktUdstilling.hbs');
    const katalogTemplateText = await katalogTemplate.text();

    const compiledKatalogTemplate = Handlebars.compile(katalogTemplateText);
    document.getElementById("products").innerHTML = compiledKatalogTemplate({product: katalogProductsJSON});


    const reserverButtons = document.getElementsByClassName("reservation");
    const reservationWindow = document.getElementById("reservationWindow");
    document.getElementById("closeBtn").onclick = () => {reservationWindow.style.display = "none";}

    for (btn of reserverButtons) {
        const btnProduct = btn.dataset.product;
        btn.onclick = () => {
            reservationWindow.style.display = "block";
            document.getElementById("reserverProduct").innerHTML = `Produkt: ${btnProduct}`;
 
        }
    }


    const submitReservation = document.getElementById("submitReservation");

    submitReservation.onclick = sendReservationMail;
};

async function sendReservationMail() {
    const antal = document.getElementById("reserverAmount").value;
    const email = document.getElementById("reserverEmail").value;
    const telefonnr = document.getElementById("reserverPhone").value;
    const kommentare = document.getElementById("reserverComments").value;
    const produkt = document.getElementById("reserverProduct").innerHTML;

    const postBody = {
        from: email,
        html: ` ${produkt} <br> Antal : '${antal}' <br> Email : '${email}' <br> Telefonnr : '${telefonnr}' <br> Kommentare: '${kommentare}'`
    };

    let status = await fetch('/api/email/reservation', {method: 'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(postBody)
    });

    let statusJSON = await status.json();

    if(statusJSON.success){
        document.getElementById('error').innerText = 'Reservation forespørgsel sendt';
        setTimeout(function () {
            location.reload();
        }, 2000);
    }else{
        document.getElementById('error').innerText = 'Fejl: Reservation forespørgsel ikke sendt. Prøv igen';
    }
}

};

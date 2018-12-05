onload = async () => {
    navigation();
    footer();

    const katalogMenu = await fetch('/api/produktkategorier');
    let katalogMenuJSON = await katalogMenu.json();

    katalogMenuJSON.sort();

    const katalogMenuTemplate = await fetch('/templates/katalogmenu.hbs');
    const katalogMenuTemplateText = await katalogMenuTemplate.text();

    const compiledKatalogMenuTemplate = Handlebars.compile(katalogMenuTemplateText);
    document.getElementById("menu-content").innerHTML = compiledKatalogMenuTemplate({kategori: katalogMenuJSON});


    const productURL = window.location.href;
    const splitURL = productURL.split('?');
    const ID = splitURL[1];

    if(ID == null || ID == undefined) {
        const katalogProducts = await fetch('/api/produkter');
        const katalogProductsJSON = await katalogProducts.json();

        const katalogTemplate = await fetch('/templates/produktUdstilling.hbs');
        const katalogTemplateText = await katalogTemplate.text();

        const compiledKatalogTemplate = Handlebars.compile(katalogTemplateText);
        document.getElementById("products").innerHTML = compiledKatalogTemplate({product: katalogProductsJSON});
    }
    else{
        const katalogProducts = await fetch('/api/produktkategorier/' + ID);
        let katalogProductsJSON = await katalogProducts.json();

        katalogProductsJSON.sort(function(a, b){
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });

        const katalogTemplate = await fetch('/templates/produktUdstilling.hbs');
        const katalogTemplateText = await katalogTemplate.text();

        const compiledKatalogTemplate = Handlebars.compile(katalogTemplateText);
        document.getElementById("products").innerHTML = compiledKatalogTemplate({product: katalogProductsJSON});
    }




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
onload = async () => {
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
        btn.onclick = () => {
            //reservationWindow.style.display = "block";

            //document.getElementById("reserverProduct").innerHTML = `Produkt: ${button.dataset.product}`;

            console.log(`Produkt: ${btn.dataset.product}` );
        }
    }
    navigation();
    footer();
};
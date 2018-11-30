onload = async () => {

    const productURL = window.location.href;
    const splitURL = productURL.split('?');
    const ID = splitURL[1];

    const katalogProducts = await fetch('/api/produkter/' + ID);
    const katalogProductsJSON = await katalogProducts.json();

    const katalogTemplate = await fetch('/templates/productDescription.hbs');
    const katalogTemplateText = await katalogTemplate.text();

    const compiledKatalogTemplate = Handlebars.compile(katalogTemplateText);
    document.getElementById("product-container").innerHTML = compiledKatalogTemplate(katalogProductsJSON);
};
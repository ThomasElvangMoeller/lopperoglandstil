onload = async () => {

    const productURL = window.location.href;
    const splitURL = productURL.split('?');
    const ID = splitURL[1];

    const productID = await fetch('/api/produkter/' + ID);
    const productIdJSON = await productID.json();

    const productTemplate = await fetch('/templates/productDescription.hbs');
    const productTemplateText = await productTemplate.text();

    const compiledProductTemplate = Handlebars.compile(productTemplateText);
    document.getElementById("product-container").innerHTML = compiledProductTemplate(productIdJSON);

    // Imports script for footer
    navigation();
    footer();
};
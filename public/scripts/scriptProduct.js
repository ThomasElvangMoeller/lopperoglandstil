onload = async () => {
    // Get the URL of the current site and extract the product id 
    // page url will look like this http://baseurl/product.html?PRODUCTID
    const productURL = window.location.href;
    const splitURL = productURL.split('?');
    const ID = splitURL[1];

    // Get the information about the specific product from the server
    const productID = await fetch('/api/produkter/' + ID);
    const productIdJSON = await productID.json();

    // Get the product template, compile it and render it with the product information
    const productTemplate = await fetch('/templates/productDescription.hbs');
    const productTemplateText = await productTemplate.text();
    const compiledProductTemplate = Handlebars.compile(productTemplateText);
    document.getElementById("product-container").innerHTML = compiledProductTemplate(productIdJSON);

    // Imports script for footer
    navigation();
    footer();
};
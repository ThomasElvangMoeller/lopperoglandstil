onload = async () => {
    const katalogProducts = await fetch('/api/produkter');
    const katalogProductsJSON = await katalogProducts.json();

    const katalogTemplate = await fetch('/templates/produktUdstilling.hbs');
    const katalogTemplateText = await katalogTemplate.text();

    const compiledKatalogTemplate = Handlebars.compile(katalogTemplateText);
    document.getElementById("products").innerHTML = compiledKatalogTemplate({product: katalogProductsJSON});

    // Imports script for footer
    footer();
};
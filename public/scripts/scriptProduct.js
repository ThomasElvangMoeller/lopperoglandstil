onload = async () => {
    const katalogProducts = await fetch('/api/produkter');
    const katalogProductsJSON = await katalogProducts.json();

    Handlebars.registerHelper('ifCond', function(v1, v2, options) {

        // var name = v1 + '';

        if(v1 === v2) {
            return options.fn(this);
        }
        console.log('nope');
        return options.inverse(this);
    });

    const katalogTemplate = await fetch('/templates/productDescription.hbs');
    const katalogTemplateText = await katalogTemplate.text();

    const compiledKatalogTemplate = Handlebars.compile(katalogTemplateText);
    document.getElementById("product-container").innerHTML = compiledKatalogTemplate({product: katalogProductsJSON});
};
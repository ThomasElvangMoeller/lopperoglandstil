onload = async () => {
    setupPage();
};

async function setupPage() {
    // Get the URL of the current site and extract the category
    // page url will look like this http://baseurl/katalog.html?CATEGORY
    const pageURL = window.location.href;
    const splitURL = pageURL.split('?');
    const category = splitURL[1];

    /* Get all the products that is in the category and the catalogue template.
        Insert the products into the template*/
    const categoryFetch = await fetch('/api/produkter/' + category);
    const categoryJSON = await categoryFetch.json();

    const categoryMenuTemplate = await fetch('/templates/katelogmenu.hbs');
    const categoryMenuTemplateText = await categoryMenuTemplate.text();

    // Compile the template, and render it into html. At last insert it into the page
    const compiledCategoryMenuTemplate = Handlebars.compile(categoryMenuTemplateText );
    document.getElementById("menu-content").innerHTML = compiledCategoryMenuTemplate(categoryJSON);
    document.getElementById("mobile-menu-content").innerHTML = compiledCategoryMenuTemplate(categoryJSON);
}
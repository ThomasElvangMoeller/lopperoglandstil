onload = async () => {

    const categoryURL = window.location.href;
    const splitURL = categoryURL.split('?');
    const category = splitURL[1];

    const categoryFetch = await fetch('/api/produkter/' + category);
    const categoryJSON = await categoryFetch.json();

    const categoryMenuTemplate = await fetch('/templates/katelogmenu.hbs');
    const categoryMenuTemplateText = await categoryMenuTemplate.text();

    const compiledCategoryMenuTemplate = Handlebars.compile(categoryMenuTemplateText );
    document.getElementById("menu-content").innerHTML = compiledCategoryMenuTemplate(categoryJSON);
};
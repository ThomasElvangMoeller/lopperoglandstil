async function navigation() {
    // Insert Navigation Template
    const navigationTemplate = await fetch('/templates/navigation.hbs');
    const navigationTemplateText = await navigationTemplate.text();
    const compiledNavigationTemplate = Handlebars.compile(navigationTemplateText);
    document.getElementById("navigation").innerHTML = compiledNavigationTemplate({});
};
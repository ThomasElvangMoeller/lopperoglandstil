onload = async () =>  {
    // Insert Footer Template
    const facebookTemplate = await fetch('/templates/social-facebook.hbs');
    const facebookTemplateText = await facebookTemplate.text();
    const compiledFacebookTemplate = Handlebars.compile(facebookTemplateText);
    document.getElementById("facebook-box").innerHTML = compiledFacebookTemplate({});

    facebook(document, 'script', 'facebook-jssdk');
}

const facebook = (d, s, id) => {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/da_DK/sdk.js#xfbml=1&version=v3.2';
    fjs.parentNode.insertBefore(js, fjs);
};
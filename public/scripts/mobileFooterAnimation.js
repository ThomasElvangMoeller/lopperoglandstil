var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("fixedMenu").style.bottom = "30px";
    } else {
        document.getElementById("fixedMenu").style.bottom = "-100px";
    }
    prevScrollpos = currentScrollPos;
}
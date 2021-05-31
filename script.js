// Getting the Scroll Button
var scrollBtn = document.getElementById("top-scroll");

// Getting the root element of the HTML Document
var rootElement = document.documentElement;

// Getting the Navbar
var nav = document.getElementById("navbar");

// Function to detect scrolling

window.onscroll = function() {
    if(rootElement.scrollTop > 20)
    {
        // Showing the scroll button
        scrollBtn.style.display="block";

        //Changing Navbar style from dark to light
        nav.classList.remove("no-color");
        nav.classList.remove("navbar-dark");

        nav.classList.add("white");
        nav.classList.add("navbar-light");
    }

    else
    {
        // Hiding the scroll button
        scrollBtn.style.display="none";

        //Changing Navbar style from light to dark
        nav.classList.remove("white");
        nav.classList.remove("navbar-light");

        nav.classList.add("no-color");
        nav.classList.add("navbar-dark");
    }
}

// Function to scroll to the top of the page

function scrollToTop() {
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// scrollToTop() function is called when scroll button is pressed.

scrollBtn.addEventListener("click", scrollToTop);
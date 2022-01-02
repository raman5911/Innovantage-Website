$(document).ready(function() {

    // Getting the Scroll Button
    var scrollBtn = document.getElementById("top-scroll");

    // Getting the root element of the HTML Document
    var rootElement = document.documentElement;

    // Function to detect scrolling

    window.onscroll = function() {
        if(rootElement.scrollTop > 20)
        {
            // Showing the scroll button
            scrollBtn.style.display="block";
        }

        else
        {
            // Hiding the scroll button
            scrollBtn.style.display="none";
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

    // Changing Year in footer

    var year = document.getElementById("year");
    var currentYear = new Date().getFullYear();

    year.innerHTML = currentYear;

    //---------------- Animate on Scroll -------------------
    AOS.init();
});
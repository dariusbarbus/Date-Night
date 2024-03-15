// FILE: script.js
// PROJECT: Date Night
// PROGRAMMER: Dario Simpson
// FIRST VERSION: 15-3-2024


//
// FUNCTION    : showPopup
// DESCRIPTION : Displays the popup window.
// PARAMETERS  : None
// RETURNS     : None
//
function showPopup() {
    document.getElementById("popup").style.display = "block";
}



//
// FUNCTION    : hidePopup
// DESCRIPTION : Hides the popup window.
// PARAMETERS  : None
// RETURNS     : None
//
function hidePopup() {
    document.getElementById("popup").style.display = "none";
}

document.getElementById("namesButton").addEventListener("click", showPopup);

document.getElementById("namesForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var userA = document.getElementById("userA").value;
    var userB = document.getElementById("userB").value;
    updateTable(userA, userB);
    hidePopup();
});

function updateTable(userA, userB) {
    var rows = document.querySelectorAll(".movies-table tbody tr");
    rows.forEach(function(row) {
        row.cells[2].innerText = userA;
        row.cells[3].innerText = userB;
    });
}

//
// FUNCTION    : changeStatus
// DESCRIPTION : Sends a POST request to change the status of a movie.
// PARAMETERS  :
//      movieName : The name of the movie.
//      status    : The new status of the movie.
// RETURNS     : None
//
function changeStatus(movieName, status) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/status/" + encodeURIComponent(movieName) + "/" + status, true);
    xhr.send();
}



//
// FUNCTION    : toggleUser
// DESCRIPTION : Sends a POST request to toggle a user for a movie.
// PARAMETERS  :
//      movieName : The name of the movie.
//      user      : The user to toggle.
// RETURNS     : None
//
function toggleUser(movieName, user) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/toggle/" + encodeURIComponent(movieName) + "/" + user, true);
    xhr.send();
}



//
// FUNCTION    : removeMovie
// DESCRIPTION : Removes a movie from the list after confirmation.
// PARAMETERS  :
//      movieName : The name of the movie to remove.
// RETURNS     : None
//
function removeMovie(movieName) {
    if (confirm('Are you sure you want to remove the movie "' + movieName + '"?')) {
        window.location.href = '/remove/' + encodeURIComponent(movieName);
    }
}



//
// FUNCTION    : updateUser
// DESCRIPTION : Sends a POST request to update a user for a movie.
// PARAMETERS  :
//      movieName : The name of the movie.
//      user      : The user to update.
//      value     : The new value for the user.
// RETURNS     : None
//
function updateUser(movieName, user, value) {
    fetch('/update_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            movieName: movieName,
            user: user,
            value: value
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    }).then(data => {
        console.log(data);
    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}


fetch('/get_names')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.querySelectorAll('input[name="user_a"]').forEach(input => input.value = data.user_a);
        document.querySelectorAll('input[name="user_b"]').forEach(input => input.value = data.user_b);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });





/*!
* Start Bootstrap - Scrolling Nav v5.0.6 (https://startbootstrap.com/template/scrolling-nav)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-scrolling-nav/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
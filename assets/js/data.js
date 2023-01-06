$('document').ready(function() {
    fetch('./assets/js/data.json').then((response) => response.json()).then((json) => 
        console.log(json)
    );
});
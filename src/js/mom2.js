"use strict";

// Skapa tom array
let courses = [];

// Anropa funktionen när sidan laddas
window.onload = () => {
    loadCourses();

    //Händelsehanterare för sök
    document.querySelector("#search").addEventListener("input", searchData);

    //Händelsehanterare för filtrering
    // notering till mig själv: var tvungen att använda anonym funktion för att undvika att parameter skickas direkt. 

    document.getElementById("code").addEventListener("click", () => filterData("code"));
    document.getElementById("name").addEventListener("click", () => filterData("coursename"));
    document.getElementById("progression").addEventListener("click", () => filterData("progression"));
}

async function loadCourses() {
    try {
        const response = await fetch ("https://webbutveckling.miun.se/files/ramschema_ht24.json");
        if(!response.ok) {
            throw new Error("Detta fungerar inte, koda bättre!");
        }
        
        courses = await response.json(); //Lagrar datan i den tidigare tomma arrayen. Då behöver man inte hämta datan över nätet igen om man inte vill
        // console.table(courses); // Test att innehåll har hämtats.
        printCourses(courses); //Anropar funktionen och skickar med courses

    } catch(error) {
        console.error(error);
        document.querySelector("#error").innerHTML = "<p>Nu blev det fel!!!</p>";

    }
}

function printCourses(data) {
    const contentEl = document.querySelector("#content");

    // rensa innehåll innan utskrift 
    contentEl.innerHTML = "";

    //utskriften
    data.forEach(course => {
        contentEl.innerHTML += `<tr><td>${course.code}</td><td>${course.coursename}</td><td>${course.progression}</td></tr>`; 
    });
}

function searchData() {
    const searchPhrase = document.querySelector("#search").value;

    //Filtrera ut 
    //.toLowerCase gör att både sökfrasen och datan omvandlas till små bokstäver så
    //sökningen inte är case sensetive
    //courses här kommer från den globala variablen som sattes tidigare, det är därför ingen 
    //data behöver skickas in i denna funktion.
    const resultData = courses.filter(course =>
        course.coursename.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        course.code.toLowerCase().includes(searchPhrase.toLowerCase()) 
    );
        printCourses(resultData);  
}

function filterData(column) {
    // console.log("klick fungerar!"); Testar att eventlyssnaren fungerar


    // [...] skapar kopia av ursprungliga arrayen så att datan finns kvar oförändrad, kul att testa 
    let filteredData = [...courses].sort((a, b) => (a[column] > (b[column]) ? 1 : -1));
    printCourses(filteredData);

    // console.table(courses); //kollar att den ursprungliga courses är oförändrad
}


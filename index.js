//constants

const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2508";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

console.log(API);

//State
let events = [];
let selectedEvent;

async function getEvents(events) {
  try {
    const response = await fetch(API);
    const result = await response.json();
    events = result.data;
    console.table(events);
    render();
  } catch (error) {
    console.error(error);
  }
}

//test
getEvents(events);

async function getEvent(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    selectedEvent = result.data;
    console.table(selectedEvent);
    render();
  } catch (error) {
    console.error(error);
  }
}

//test
getEvent(4291);

function PartyListItem(event) {
  const $li = document.createElement("li");
  $li.innerHTML = `
    <a href="#selected">${event.name}</a>
  `;
  $li.addEventListener("click", () => getEvent(event.id));
  return $li;
}

function PartyList() {}

function PartyDetails() {}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <PartyList></PartyList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
  `;
  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("PartyDetails").replaceWith(PartyDetails());
}

async function init() {
  await getEvents();
  render();
}

init();

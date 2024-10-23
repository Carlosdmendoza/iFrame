const iframeUrlInput = document.getElementById("iframeUrl");
const loadIframeButton = document.getElementById("loadIframe");
const testIframe = document.getElementById("testIframe");
const eventLog = document.getElementById("eventLog");

// Function to log events in the textarea
function logEvent(message) {
  eventLog.value += `${message}\n`;
}

// Define the EventsApp and set up the event listeners
function initializeEventsApp() {
  const app = new EventsApp({
    orgId: "3itLbC6",
    path: "/g/ZZ8AC6qtdC?search=&sortBy=date&category=&date=TODAY&keywords=",
    listeners: [
      {
        event: "APP_READY",
        handler: function () {
          logEvent("APP READY");
        },
      },
      {
        event: "ROUTE_CHANGED",
        handler: function (params) {
          logEvent(`ROUTE_CHANGED: ${JSON.stringify(params)}`);
        },
      },
      {
        event: "CONTENT_SIZE_CHANGED",
        handler: function (params) {
          logEvent(`CONTENT_SIZE_CHANGED: ${JSON.stringify(params)}`);
          // Optionally resize the iframe
          testIframe.style.height = `${params.height}px`;
        },
      },
    ],
  });

  // Mount the app into the events container
  app.mount(".events-container");
}

// Load iframe content and initialize the EventsApp when the button is clicked
loadIframeButton.addEventListener("click", () => {
  const iframeUrl = iframeUrlInput.value;
  testIframe.src = iframeUrl;

  // Wait for the iframe to load
  testIframe.onload = () => {
    initializeEventsApp();
  };
});

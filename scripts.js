// Initialize event listener for the button
document.getElementById("loadIframe").addEventListener("click", function () {
  const domain = document.getElementById("domainInput").value.trim();
  const orgId = document.getElementById("orgIdInput").value.trim();
  const path = document.getElementById("pathInput").value.trim();

  // Construct the full URL
  const iframeSrc = `https://${domain}/embed.js`;
  const appSrc = `https://${domain}${path}`;

  // Load the iframe with the constructed src
  const testIframe = document.getElementById("testIframe");
  testIframe.src = appSrc;

  // Create a script element to load the EventsApp
  const script = document.createElement("script");
  script.src = iframeSrc;
  script.onload = function () {
    initializeEventsApp(orgId, path); // Initialize the app once the script is loaded
  };
  document.body.appendChild(script);
});

// Function to initialize the EventsApp
function initializeEventsApp(orgId, path) {
  var app = new EventsApp({
    orgId: orgId,
    path: path,
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
          logEvent("ROUTE_CHANGED: " + JSON.stringify(params));
        },
      },
      {
        event: "CONTENT_SIZE_CHANGED",
        handler: function (params) {
          logEvent("CONTENT_SIZE_CHANGED: " + JSON.stringify(params));
        },
      },
      {
        event: "FORM_SUBMITTED",
        handler: function (params) {
          logEvent("FORM_SUBMITTED: " + JSON.stringify(params));
        },
      },
    ],
  });
  app.mount(".events-container");
}

// Function to log events to the event log
function logEvent(message) {
  const eventLog = document.getElementById("eventLog");
  eventLog.innerText += message + "\n";
}

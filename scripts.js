document.getElementById("loadEvent").addEventListener("click", function () {
  const orgId = document.getElementById("orgId").value.trim();
  const path = document.getElementById("path").value.trim();
  const instanceUrl = "https://dev-ew-ev-6229.blackthorncloud.com";

  // Construct the dynamic script source
  const domain = "dev-ew-ev-6229.blackthorncloud.com";
  const scriptSrc = `https://${domain}/embed.js`;
  const appSrc = `https://${domain}${path.startsWith("/") ? path : "/" + path}`; // Ensure the path starts with '/'

  // Log the constructed URLs for debugging
  console.log("iFrame Source:", appSrc);
  console.log("Script Source:", scriptSrc);

  // Load the script dynamically
  const script = document.createElement("script");
  script.src = scriptSrc;
  script.onload = function () {
    // Initialize the Events App
    if (typeof initializeEventsApp === "function") {
      initializeEventsApp(orgId, path, instanceUrl);
    } else {
      console.error("initializeEventsApp is not defined.");
    }
  };
  document.body.appendChild(script);
});

// Function to initialize the EventsApp
function initializeEventsApp(orgId, path, instanceUrl) {
  const app = new EventsApp({
    orgId: orgId,
    path: path,
    instanceUrl: instanceUrl,
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

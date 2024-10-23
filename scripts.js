document.getElementById("loadEvent").addEventListener("click", function () {
  // Clear any existing event container and logs
  document.querySelector(".events-container").innerHTML = "";
  document.getElementById("eventLog").textContent = "";

  const orgId = document.getElementById("orgId").value.trim();
  const path = document.getElementById("path").value.trim();

  if (!orgId || !path) {
    alert("Please provide both Organization ID and Path.");
    return;
  }

  // Initialize the Blackthorn EventsApp with dynamic orgId and path
  initializeEventsApp(orgId, path);
});

function initializeEventsApp(orgId, path) {
  const eventLog = document.getElementById("eventLog");

  var app = new EventsApp({
    orgId: orgId,
    path: path,
    listeners: [
      {
        event: "APP_READY",
        handler: function () {
          logEvent("APP_READY");
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
          // Dynamically adjust iframe size based on content
          document.querySelector(".events-container").style.height =
            params.height + "px";
        },
      },
    ],
  });

  app.mount(".events-container");

  function logEvent(message) {
    eventLog.textContent += message + "\n";
    eventLog.scrollTop = eventLog.scrollHeight; // Auto-scroll to the bottom
  }
}

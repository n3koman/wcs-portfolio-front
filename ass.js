const baseUrl = "https://wcs-alisher-izmukhan.koyeb.app"; // Update this with your actual base URL

async function getExistingAssigns() {
  const response = await fetch(`${baseUrl}/assigns`);
  const assigns = await response.json();

  const existingAssignsList = document.getElementById("existingAssigns");
  existingAssignsList.innerHTML = "";

  assigns.forEach((assign) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "col";
      cardDiv.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <span class="card-text">${assign.id}</span>
                        <h5 class="card-title">${assign.title}</h5>
                        <div class="ql-editor">${assign.content}</div>
                        <p class="card-text"><small class="text-muted">Last updated: ${assign.time}</small></p>
                    </div>
                </div>`;


    existingAssignsList.appendChild(cardDiv);
  });
}

// Fetch and display existing assigns when the page loads
window.onload = getExistingAssigns;

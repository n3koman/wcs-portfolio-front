const baseUrl = "https://wcs-alisher-izmukhan.koyeb.app"; // Update this with your actual base URL

async function createAssign() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").innerHTML;
  const videoContent = document.getElementById("videoContent").value;

  const response = await fetch(`${baseUrl}/assigns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, videoContent }),
  });

  const data = await response.json();
  alert("Assignment created successfully!");

  // You can update the UI to display the new assignment if needed
  getExistingAssigns();
}

function updateFormValues(id, title, content, videoContent){
  const idField = document.getElementById("updateAssignId");
  const titleField = document.getElementById("updateTitle");
  const contentField = document.getElementById("updateContent");
  const videoContentField = document.getElementById("updateVideoContent");
  idField.value = id;
  titleField.value = title;
  contentField.value = content;
  videoContentField.value = videoContent;
}

async function updateAssign() {
  const assignId = document.getElementById("updateAssignId").value;
  const newTitle = document.getElementById("updateTitle").value;
  const newContent = document.getElementById("updateContent").value;
  const newVideoContent = document.getElementById("updateVideoContent").value;

  const response = await fetch(`${baseUrl}/assigns/${assignId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTitle,
      content: newContent,
      videoContent: newVideoContent,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    alert("Assignment updated successfully!");
    console.log(data);

    // You can update the UI to reflect the updated assignment if needed
    getExistingAssigns();
  } else {
    const errorData = await response.json();
    alert(`Failed to update assignment: ${errorData.detail}`);
  }
}

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
                        <button type="button" onclick="updateFormValues(${assign.id}, '${assign.title}', '${assign.content}', '${assign.videoContent}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateAssignModal">Update Assignment</button>
                        <button class="btn btn-danger" onclick="deleteAssign(${assign.id})">Delete Assignment</button>
                    </div>
                </div>`;


    existingAssignsList.appendChild(cardDiv);
  });
}
async function deleteAssign(assignId) {
  const confirmed = confirm("Are you sure you want to delete this assignment?");
  if (!confirmed) {
    return; // If the user cancels the deletion, do nothing
  }

  const response = await fetch(`${baseUrl}/assigns/${assignId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    alert("Assignment deleted successfully!");
    // You can update the UI to reflect the deletion if needed
    getExistingAssigns();
  } else {
    const errorData = await response.json();
    alert(`Failed to delete assignment: ${errorData.detail}`);
  }
}

// Fetch and display existing assigns when the page loads
window.onload = getExistingAssigns;

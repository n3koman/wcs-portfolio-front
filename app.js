const baseUrl = "https://wcs-alisher-izmukhan.koyeb.app"; // Update this with your actual base URL

async function createAssign() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const isvideo = document.getElementById("type").checked;

  const response = await fetch(`${baseUrl}/assigns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, isvideo }),
  });

  const data = await response.json();
  alert("Assignment created successfully!");
  console.log(data);

  // You can update the UI to display the new assignment if needed
  getExistingAssigns();
}

async function updateAssign() {
  const assignId = document.getElementById("updateAssignId").value;
  const newTitle = document.getElementById("updateTitle").value;
  const newContent = document.getElementById("updateContent").value;
  const newType = document.getElementById("updateType").checked;

  const response = await fetch(`${baseUrl}/assigns/${assignId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTitle,
      content: newContent,
      isvideo: newType,
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

    if (assign.isvideo == true) {
      const videoId = getYouTubeVideoId(assign.content);
      cardDiv.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <span class="card-text">${assign.id}</span>
                        <h5 class="card-title">${assign.title}</h5>
                        <h5 class="card-title">${videoId}</h5>  
                        <iframe width="560" height="400" src="https://youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                        <p class="card-text"><small class="text-muted">Last updated: ${assign.time}</small></p>
                        <button class="btn btn-danger" onclick="deleteAssign(${assign.id})">Delete Assignment</button>
                    </div>
                </div>`;
    } else {
      cardDiv.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <span class="card-text">${assign.id}</span>
                        <h5 class="card-title">${assign.title}</h5>
                        <p class="card-text">${assign.content}</p>
                        <p class="card-text"><small class="text-muted">Last updated: ${assign.time}</small></p>
                        <button class="btn btn-danger" onclick="deleteAssign(${assign.id})">Delete Assignment</button>
                    </div>
                </div>`;
    }

    function getYouTubeVideoId(url) {
      // Extract video ID from YouTube URL
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
      const match = url.match(regExp);

      if (match && match[2].length === 11) {
        return match[2];
      } else {
        // Handle invalid YouTube URL
        console.error("Invalid YouTube URL:", url);
        return "invalid";
      }
    }

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

const baseUrl = "https://wcs-alisher-izmukhan.koyeb.app"; // Update this with your actual base URL

async function getExistingAssigns() {
  const response = await fetch(`${baseUrl}/assigns`);
  const assigns = await response.json();

  const existingAssignsList = document.getElementById("existingAssigns");
  existingAssignsList.innerHTML = "";

  assigns.forEach((assign) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "col";
    if (assign.videoContent != '') {
      const videoId = getYouTubeVideoId(assign.videoContent);
      cardDiv.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <span class="card-text">${assign.id}</span>
                        <h5 class="card-title">${assign.title}</h5>
                        <p class="card-text">${assign.content}</p>
                        <iframe width="560" height="315" src="https://youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                        <p class="card-text"><small class="text-muted">Last updated: ${assign.time}</small></p>
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

// Fetch and display existing assigns when the page loads
window.onload = getExistingAssigns;

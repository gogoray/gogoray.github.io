// URL of your JSON file hosted on GitHub
const jsonURL = 'https://yoga-api-nzy4.onrender.com/v1/categories';

// HTML elements
const poseList = document.getElementById('pose-list');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');

// Fetch data from JSON
async function fetchData() {
    const response = await fetch(jsonURL);
    const data = await response.json();
    const poses = data.flatMap(category => category.poses); // Flatten categories into a single list of poses
    displayPoses(poses);
    addSearchFunctionality(poses);
    addSortFunctionality(poses);
}

// Display poses with all metadata
function displayPoses(poses) {
    poseList.innerHTML = ''; // Clear previous results
    poses.forEach(pose => {
        const poseElement = document.createElement('div');
        poseElement.classList.add('pose');

        // Create image element
        const poseImage = document.createElement('img');
        poseImage.src = pose.url_png; // Use PNG image
        poseImage.alt = `${pose.english_name} - ${pose.sanskrit_name}`;
        poseElement.appendChild(poseImage);

        // Create details container
        const poseDetails = document.createElement('div');
        poseDetails.classList.add('pose-details');

        // Populate with metadata
        poseDetails.innerHTML = `
            <h3>${pose.english_name} (${pose.sanskrit_name})</h3>
            <p><strong>Category:</strong> ${pose.category_name}</p>
            <p><strong>Translation:</strong> ${pose.translation_name}</p>
            <p><strong>Description:</strong> ${pose.pose_description}</p>
            <p><strong>Benefits:</strong> ${pose.pose_benefits}</p>
        `;
        poseElement.appendChild(poseDetails);

        poseList.appendChild(poseElement);
    });
}

// Search functionality
function addSearchFunctionality(poses) {
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPoses = poses.filter(pose =>
            pose.english_name.toLowerCase().includes(searchTerm) ||
            (pose.pose_description && pose.pose_description.toLowerCase().includes(searchTerm))
        );
        displayPoses(filteredPoses);
    });
}

// Sort functionality
function addSortFunctionality(poses) {
    sortSelect.addEventListener('change', () => {
        const sortBy = sortSelect.value;
        const sortedPoses = [...poses].sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -1;
            if (a[sortBy] > b[sortBy]) return 1;
            return 0;
        });
        displayPoses(sortedPoses);
    });
}

// Load data on page load
fetchData();

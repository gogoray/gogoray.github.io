// URL of your JSON file
const jsonURL = 'https://raw.githubusercontent.com/gogoray/gogoray.github.io/refs/heads/master/yoga_poses.json';

// HTML elements
const poseList = document.getElementById('pose-list');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');

// Fetch data from JSON
async function fetchData() {
    const response = await fetch(jsonURL);
    const poses = await response.json();
    displayPoses(poses); // Initial display
    addSearchFunctionality(poses);
    addSortFunctionality(poses);
}

// Display poses
function displayPoses(poses) {
    poseList.innerHTML = ''; // Clear previous results
    poses.forEach(pose => {
        const poseElement = document.createElement('div');
        poseElement.classList.add('pose');
        poseElement.innerHTML = `
            <h3>${pose.display_name}</h3>
            <p><strong>Category:</strong> ${pose.category}</p>
            <p><strong>Difficulty:</strong> ${pose.difficulty}</p>
            <p>${pose.description}</p>
        `;
        poseList.appendChild(poseElement);
    });
}

// Search functionality
function addSearchFunctionality(poses) {
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPoses = poses.filter(pose =>
            pose.display_name.toLowerCase().includes(searchTerm) ||
            (pose.description && pose.description.toLowerCase().includes(searchTerm))
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

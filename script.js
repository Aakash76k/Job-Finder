// ================= JOB DATA =================

const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Solutions",
        location: "Delhi",
        category: "frontend",
        type: "full-time",
        salary: 60000,
        experience: "1-2 Years"
    },

    {
        id: 2,
        title: "Backend Developer",
        company: "CodeCraft",
        location: "Gurugram",
        category: "backend",
        type: "full-time",
        salary: 75000,
        experience: "2-3 Years"
    },

    {
        id: 3,
        title: "Full Stack Developer",
        company: "WebWorks",
        location: "Noida",
        category: "fullstack",
        type: "full-time",
        salary: 90000,
        experience: "2-4 Years"
    },

    {
        id: 4,
        title: "JavaScript Developer",
        company: "Digital Hub",
        location: "Faridabad",
        category: "javascript",
        type: "full-time",
        salary: 55000,
        experience: "1-2 Years"
    },

    {
        id: 5,
        title: "Frontend Intern",
        company: "StartUp India",
        location: "Delhi",
        category: "frontend",
        type: "internship",
        salary: 20000,
        experience: "Fresher"
    },

    {
        id: 6,
        title: "Node.js Developer",
        company: "Innovate Tech",
        location: "Gurugram",
        category: "backend",
        type: "full-time",
        salary: 80000,
        experience: "2-3 Years"
    },

    {
        id: 7,
        title: "React Developer",
        company: "SoftLabs",
        location: "Noida",
        category: "frontend",
        type: "full-time",
        salary: 70000,
        experience: "1-3 Years"
    },

    {
        id: 8,
        title: "MERN Stack Developer",
        company: "DevWorld",
        location: "Delhi",
        category: "fullstack",
        type: "full-time",
        salary: 85000,
        experience: "2-4 Years"
    },

    {
        id: 9,
        title: "JavaScript Intern",
        company: "Code Academy",
        location: "Faridabad",
        category: "javascript",
        type: "internship",
        salary: 15000,
        experience: "Fresher"
    },

    {
        id: 10,
        title: "Backend Intern",
        company: "Future Tech",
        location: "Noida",
        category: "backend",
        type: "internship",
        salary: 18000,
        experience: "Fresher"
    },

    {
        id: 11,
        title: "Full Stack Developer",
        company: "NextGen Technologies",
        location: "Gurugram",
        category: "fullstack",
        type: "full-time",
        salary: 100000,
        experience: "3-5 Years"
    },

    {
        id: 12,
        title: "React Developer",
        company: "PixelSoft",
        location: "Delhi",
        category: "frontend",
        type: "part-time",
        salary: 40000,
        experience: "1-2 Years"
    }
];


// ================= DOM ELEMENTS =================

const jobContainer = document.getElementById("jobContainer");

const searchInput = document.getElementById("searchInput");
const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchBtn");

const categoryFilter = document.getElementById("categoryFilter");
const jobTypeFilter = document.getElementById("jobTypeFilter");
const sortFilter = document.getElementById("sortFilter");

const noJobs = document.getElementById("noJobs");

const savedJobsContainer = document.getElementById("savedJobs");


// ================= SAVED JOBS =================

// LocalStorage se saved jobs nikalna

let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];


// ================= DISPLAY JOBS =================

function displayJobs(jobList) {

    jobContainer.innerHTML = "";

    if (jobList.length === 0) {

        noJobs.style.display = "block";

        return;
    }

    noJobs.style.display = "none";


    jobList.forEach(function (job) {

        const isSaved = savedJobs.includes(job.id);

        const jobCard = document.createElement("div");

        jobCard.classList.add("job-card");


        jobCard.innerHTML = `
            <h3>${job.title}</h3>

            <p class="company">
                ${job.company}
            </p>

            <div class="job-info">

                <span>${job.location}</span>

                <span>${job.type}</span>

                <span>${job.experience}</span>

            </div>

            <p class="salary">
                ₹${job.salary.toLocaleString()} / month
            </p>

            <div class="job-buttons">

                <button
                    class="apply-btn"
                    onclick="applyJob(${job.id})"
                >
                    Apply Now
                </button>

                <button
                    class="save-btn"
                    onclick="toggleSave(${job.id})"
                >
                    ${isSaved ? "❤️ Saved" : "♡ Save"}
                </button>

            </div>
        `;


        jobContainer.appendChild(jobCard);

    });
}


// ================= INITIAL JOBS =================

displayJobs(jobs);


// ================= SEARCH =================

function searchJobs() {

    const searchValue =
        searchInput.value.trim().toLowerCase();

    const locationValue =
        locationInput.value.trim().toLowerCase();


    const filteredJobs = jobs.filter(function (job) {

        const matchesSearch =
            job.title.toLowerCase().includes(searchValue) ||
            job.company.toLowerCase().includes(searchValue);


        const matchesLocation =
            job.location.toLowerCase().includes(locationValue);


        return matchesSearch && matchesLocation;

    });


    displayJobs(filteredJobs);
}


// Search button

searchBtn.addEventListener("click", searchJobs);


// Enter key se search

searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        searchJobs();

    }

});


// ================= FILTER =================

function filterJobs() {

    const searchValue =
        searchInput.value.trim().toLowerCase();

    const locationValue =
        locationInput.value.trim().toLowerCase();

    const categoryValue =
        categoryFilter.value;

    const typeValue =
        jobTypeFilter.value;

    const sortValue =
        sortFilter.value;


    let filteredJobs = jobs.filter(function (job) {

        const matchesSearch =
            job.title.toLowerCase().includes(searchValue) ||
            job.company.toLowerCase().includes(searchValue);


        const matchesLocation =
            job.location.toLowerCase().includes(locationValue);


        const matchesCategory =
            categoryValue === "all" ||
            job.category === categoryValue;


        const matchesType =
            typeValue === "all" ||
            job.type === typeValue;


        return (
            matchesSearch &&
            matchesLocation &&
            matchesCategory &&
            matchesType
        );

    });


    // ================= SORT =================

    if (sortValue === "salary-high") {

        filteredJobs.sort(function (a, b) {

            return b.salary - a.salary;

        });

    }


    if (sortValue === "salary-low") {

        filteredJobs.sort(function (a, b) {

            return a.salary - b.salary;

        });

    }


    displayJobs(filteredJobs);
}


// Filter events

categoryFilter.addEventListener("change", filterJobs);

jobTypeFilter.addEventListener("change", filterJobs);

sortFilter.addEventListener("change", filterJobs);


// Search typing ke saath filtering

searchInput.addEventListener("input", filterJobs);

locationInput.addEventListener("input", filterJobs);


// ================= SAVE / UNSAVE JOB =================

function toggleSave(jobId) {

    if (savedJobs.includes(jobId)) {

        // Remove job

        savedJobs =
            savedJobs.filter(function (id) {

                return id !== jobId;

            });

    } else {

        // Add job

        savedJobs.push(jobId);

    }


    // LocalStorage update

    localStorage.setItem(
        "savedJobs",
        JSON.stringify(savedJobs)
    );


    // Current jobs refresh

    filterJobs();


    // Saved jobs refresh

    displaySavedJobs();
}


// ================= DISPLAY SAVED JOBS =================

function displaySavedJobs() {

    savedJobsContainer.innerHTML = "";


    const savedJobList = jobs.filter(function (job) {

        return savedJobs.includes(job.id);

    });


    if (savedJobList.length === 0) {

        savedJobsContainer.innerHTML = `
            <p style="text-align:center;">
                No saved jobs yet.
            </p>
        `;

        return;
    }


    savedJobList.forEach(function (job) {

        const jobCard = document.createElement("div");

        jobCard.classList.add("job-card");


        jobCard.innerHTML = `
            <h3>${job.title}</h3>

            <p class="company">
                ${job.company}
            </p>

            <div class="job-info">

                <span>${job.location}</span>

                <span>${job.type}</span>

                <span>${job.experience}</span>

            </div>

            <p class="salary">
                ₹${job.salary.toLocaleString()} / month
            </p>

            <div class="job-buttons">

                <button
                    class="apply-btn"
                    onclick="applyJob(${job.id})"
                >
                    Apply Now
                </button>

                <button
                    class="save-btn"
                    onclick="toggleSave(${job.id})"
                >
                    Remove
                </button>

            </div>
        `;


        savedJobsContainer.appendChild(jobCard);

    });
}


// Initial saved jobs

displaySavedJobs();


// ================= APPLY JOB =================

function applyJob(jobId) {

    const job = jobs.find(function (job) {

        return job.id === jobId;

    });


    if (!job) {

        return;

    }


    alert(
        `Application started for ${job.title} at ${job.company}`
    );
}
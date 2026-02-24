// all job data
const allJobData = [
    {
        id: 1,
        companyName: "Mobile First Corp",
        position: "React Native Developer",
        location: "Remote",
        type: "Full-time",
        salary: "$130,000 - $175,000",
        description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
        status: "all"
    },
    {
        id: 2,
        companyName: "WebFlow Agency",
        position: "Web Designer & Developer",
        location: "Los Angeles, CA",
        type: "Part-time",
        salary: "$80,000 - $120,000",
        description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
        status: "all"
    },
    {
        id: 3,
        companyName: "DataViz Solutions",
        position: "Data Visualization Specialist",
        location: "Boston, MA",
        type: "Full-time",
        salary: "$125,000 - $165,000",
        description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
        status: "all"
    },
    {
        id: 4,
        companyName: "CloudFirst Inc",
        position: "Backend Developer",
        location: "Seattle, WA",
        type: "Full-time",
        salary: "$140,000 - $190,000",
        description: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
        status: "all"
    },
    {
        id: 5,
        companyName: "Innovation Labs",
        position: "UI/UX Engineer",
        location: "Austin, TX",
        type: "Full-time",
        salary: "$110,000 - $150,000",
        description: "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
        status: "all"
    },
    {
        id: 6,
        companyName: "MegaCorp Solutions",
        position: "JavaScript Developer",
        location: "New York, NY",
        type: "Full-time",
        salary: "$130,000 - $170,000",
        description: "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.",
        status: "all"
    },
    {
        id: 7,
        companyName: "StartupXYZ",
        position: "Full Stack Engineer",
        location: "Remote",
        type: "Full-time",
        salary: "$120,000 - $160,000",
        description: "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.",
        status: "all"
    },
    {
        id: 8,
        companyName: "TechCorp Industries",
        position: "Senior Frontend Developer",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$130,000 - $175,000",
        description: "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.",
        status: "all"
    }
];

// id diye element niye asa
const getElement = (id) => {
    const element = document.getElementById(id);
    return element;
}


const jobCard = (job) => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg card-border w-full';
    card.setAttribute('job-id', job.id)

    const interviewBtnClass = 'status-interview'
    const rejectedBtnClass = 'status-rejected'

    const interviewClass = job.status === 'all' ? '' : job.status === 'interview' 
                        ? interviewBtnClass : ''
    const rejectedClass = job.status === 'all' ? '' : job.status === 'rejected' 
                        ? rejectedBtnClass : ''

    const statusText = job.status === 'all' ? 'Not Applied' 
                           : job.status === 'interview' ? 'Interview' : 'Rejected'

    card.innerHTML = `
         <div class="flex flex-col gap-5 p-6">
            <!-- job card top section -->
            <div class="flex gap-4 items-center w-full">
              <div class="flex-1 flex flex-col gap-1">
                <h3 class="font-semibold text-lg text-[#002c5c]">${job.companyName}</h3>
                <p class="font-normal text-base text-[#64748b]">${job.position}</p>
              </div>
              <button onclick="deleteJobCard(${job.id})" class="delete-btn w-8 h-8">
                <img src="assets/delete.png" alt="Delete" class="w-full h-full object-contain">
              </button>
            </div>

            <!-- job details -->  
            <p class="font-normal text-sm text-[#64748b]">
                ${job.location}  •  ${job.type}  •  ${job.salary}
            </p>
              
            <!-- status ar description -->
            <div class="flex flex-col gap-2">
              <div class="status-badge px-3 py-2 rounded w-fit">
                <p class="font-medium text-sm uppercase">${statusText}</p>
              </div>
              <p class="font-normal text-sm text-[#323b49]">${job.description}</p>
            </div>

            <!-- action buttons -->
            <div class="flex gap-2">
              <button onclick="changeStatus(${job.id}, 'interview')" class="btn-interview px-3 py-2 rounded font-semibold text-sm uppercase ${interviewClass}">Interview</button>
              <button onclick="changeStatus(${job.id}, 'rejected')" class="btn-rejected px-3 py-2 rounded font-semibold text-sm uppercase ${rejectedClass}">Rejected</button>
            </div>
         </div>
      `;

    return card;
};const jobCardContainer = getElement('jobs-container');

let currentSelectedTab = 'all';
let jobData = [...allJobData];
const tabButtons = document.querySelectorAll('.tab-button')
const totalJobsEl = getElement('total-count')
const totalInterviewEl = getElement('interview-count')
const totalRejectedEl = getElement('rejected-count')
const availableJobCount = getElement('jobs-count')


// all jobs render
const renderJobCards = () => {
    const jobDataFiltered = currentSelectedTab === 'all' ? jobData : jobData.filter((j) => j.status === currentSelectedTab);
    
    jobCardContainer.innerHTML = '';

    const totalInterview = jobData.filter(j => j.status === 'interview').length
    const totalRejected = jobData.filter(j => j.status === 'rejected').length
    const totalJobs = jobData.length;

    totalJobsEl.innerText = totalJobs
    totalInterviewEl.innerText = totalInterview
    totalRejectedEl.innerText = totalRejected

    availableJobCount.innerText = `${jobDataFiltered.length} jobs`

    // no job 
    if(jobDataFiltered.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'bg-white rounded-lg card-border w-full h-[400px] flex flex-col items-center justify-center p-10 gap-5';
        
        emptyDiv.innerHTML = `
            <img src="assets/jobs.png" alt="No jobs" class="w-[100px] h-[100px] object-contain">
            <div class="flex flex-col gap-1 text-center">
                <h3 class="font-semibold text-2xl text-[#002c5c]">No jobs available</h3>
                <p class="font-normal text-base text-[#64748b]">Check back soon for new job opportunities</p>
            </div>
        `;
        
        jobCardContainer.appendChild(emptyDiv);
    } else {
        jobDataFiltered.forEach((job) => {
            jobCardContainer.appendChild(jobCard(job));
        });
    }

    tabButtons.forEach(button => {
        button.classList.remove('tab-active');
        button.classList.add('tab-inactive');

        if(button.getAttribute('data-tab') === currentSelectedTab){
            button.classList.remove('tab-inactive');
            button.classList.add('tab-active')
        }
    })
};


tabButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        currentSelectedTab = button.getAttribute('data-tab')
        renderJobCards()
    })
})

const changeStatus=(id, newStatus) =>{
    if (!newStatus) return;
    const job = jobData.find((j) =>j.id === id);

    if (job){
        job.status = newStatus;
        renderJobCards();
    }
};

const deleteJobCard = (id) => {
    jobData = jobData.filter((job) => job.id !== id);
    renderJobCards();
};

renderJobCards();
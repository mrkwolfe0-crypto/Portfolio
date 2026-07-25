//This is where the magic of the dynamic engine resides
//Global parameters established
const GITHUB_USERNAME = 'mrkwolfe0-crypto';

//This next step is the actual connection to GitHub api and it updates the DOM elements live.
async function loadLiveGitHubProjects() {
    //This assigns it to the target hook in the index.html
    const grid = document.getElementById('dynamic-project-grid');

    //Sorts by push dates showing the most recent first.
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=published&per_page=30`);

        //Safeguard against servor connection errors
        if (!response.ok) {
            throw new Error('API communication error occured, Please try again');
        }

        //Converts raw data byte packet response into usable JSON arrays.
        const repos = await response.json();

        //Sorting out the forks and portfolio webpage itself
        const validProjects = repos.filter(repo => !repo.fork && repo.name !== `${GITHUB_USERNAME}.github.io`);

        if (validProjects.length === 0) {
            grid.innerHTML = '<p class="loading-text">Repositories not found.</p>';
            return;
        }

        //Erasing the hard coded loading text place holder
        grid.innerHTML = '';

        //This next segment is for looping through the valid projects array objects making them DOM cards.
        validProjects.forEach(repo => {
            //Semantic article array object node
            const card = document.createElement('article');
            card.className = 'project-card';

            //Programming format string values into layouts readable by the enduser.
            const humanReadableName = repo.name.replace(/[-_]/g, '');

            const primaryLanguage = repo.language || 'Config';

            //This builds the text markup templates and map the corresponding data values dynamically.
            card.innerHTML = `
                <div>
                    <h3>${humanReadableName}</h3>
                    <p>${repo.description || 'No direct system description documented in repository settings.'}</p>
                </div>
                <div class="tags">
                    <span class="tag">${primaryLanguage}</span>
                </div>
                <div class="card links">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">GitHub Source →</a>
                </div>
            `;

            grid.appendChild(card);
        });
    } catch (error) {
        grid.innerHTML = `<p class="loading-text">${error.message}</p>`;
    }
}
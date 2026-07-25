// This is where the magic of the dynamic engine resides.

// Global parameters established.
// This variable acts as a configuration value.
// Changing the username here changes whose repositories
// the portfolio retrieves.

const GITHUB_USERNAME = 'mrkwolfe0-crypto';


// This function connects to the GitHub API,
// retrieves repository data,
// processes the response,
// and updates the webpage DOM dynamically.

async function loadLiveGitHubProjects() {
// This assigns the target hook from index.html.
// JavaScript will inject the generated project cards
// // into this exact HTML container.
     const grid = document.getElementById('dynamic-project-grid');
    try {
        /*
            API Connection
            The original tutorial contained:
            https://github.com{GITHUB_USERNAME}/repos
            This is incorrect because github.com is the website.
            The GitHub REST API requires:
            https://api.github.com/users/{username}/repos
            This endpoint returns JSON repository data.
        */
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=30`
        );
        // Safeguard against server connection errors.
        // If GitHub responds with an error,
        // stop execution and send the error to catch.
        if (!response.ok) {
            throw new Error(
                'API communication error occurred. Please try again.'
            );

        }
        /*
            Converts raw response data into usable JavaScript objects.

            The API sends JSON data.
            response.json() converts that data into arrays
            and objects JavaScript can manipulate.
        */
        const repos = await response.json();
        /*
            Sorting out:
            1. Forked repositories
            2. The portfolio website repository itself
            This keeps the displayed projects focused
            on original work.
        */
        const validProjects = repos.filter(
            repo =>
                !repo.fork &&
                repo.name !== `${GITHUB_USERNAME}.github.io`
        );
        // Safety check if no repositories exist.
        if (validProjects.length === 0) {
            grid.innerHTML =
                '<p class="loading-text">No open source repositories found.</p>';
            return;
        }
        /*
            Removes the placeholder loading message.

            The hardcoded HTML text is replaced
            with live GitHub repository cards.
        */
        grid.innerHTML = '';
        /*
            Loop through each valid repository.
            Each repository object becomes
            a visual project card.
        */
        validProjects.forEach(repo => {
            // Creates a semantic article element.
            const card = document.createElement('article');
            // Applies CSS styling class.
            card.className = 'project-card';
            /*
                Formats repository names.
                Example:
                dont-drop-the-water
                becomes:
                dont drop the water
            */
            const humanReadableName =
                repo.name.replace(/[-_]/g, ' ');
            /*
                Some repositories may not specify
                a programming language.
                If missing, display Config instead.
            */
            const primaryLanguage =
                repo.language || 'Config';
            /*
                Builds the HTML template dynamically.
                Template literals allow JavaScript variables
                to be inserted directly into the markup.
            */
            card.innerHTML = `
                <div>
                    <h3>${humanReadableName}</h3>
                    <p>
                        ${repo.description || 'No direct system description documented in repository settings.'}</p>
                </div>
                <div>
                    <div class="tags">
                        <span class="tag">${primaryLanguage}</span>
                    </div>
                    <div class="card-links">

                        <a href="${repo.html_url}"target="_blank"rel="noopener noreferrer"> GitHub Source → </a>

                    </div>
                </div>
            `;
            /*
                Injects the completed card
                into the webpage DOM.
            */
            grid.appendChild(card);
        });
    }
    catch (error) {
        /*
            Error handling.
            If the API request fails,
            replace the loading message
            with the error explanation.
        */
        console.error('API Fail Trace:', error);
        grid.innerHTML = `<p class="loading-text"> ${error.message} </p>`;
    }
}
/*
    Initialize the process.
    DOMContentLoaded waits until the HTML structure
    has finished loading before JavaScript searches
    for the dynamic-project-grid element.
*/
document.addEventListener(
    'DOMContentLoaded',
    loadLiveGitHubProjects
);

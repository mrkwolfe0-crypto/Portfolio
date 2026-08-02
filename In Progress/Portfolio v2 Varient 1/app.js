/*Universal Header and layout*/
/*Universal Header and layout*/

/*Hero Section*/
/*Hero Section*/

/*CTA Button Resume*/
const resumeGlass = document.querySelector('#resume-glass');
const openResumeBtn = document.querySelector('#open-resume-btn');
const closeResumeBtn = document.querySelector('#close-resume-btn');
/*CTA Button Resume*/

/*Dynamic GitHub Project Section, live feed*/
const GITHUB_USERNAME = 'mrkwolfe0-crypto';

async function loadLiveGitHubProjects() {
    const grid = document.getElementById('dynamic-project-grid');

    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=30`
        );

        if (!response.ok) {
            throw new Error(
                'API communication error occurred. Please try again.'
            );
        }

        const repos = await response.json();

        const validProjects = repos.filter(
            repo =>
                !repo.fork &&
                repo.name !== `${GITHUB_USERNAME}.github.io`
        );

        if (validProjects.length === 0) {
            grid.innerHTML =
                '<p class="loading-text">No open source repositories found.</p>';
            return;
        }

        grid.innerHTML = '';

        validProjects.forEach(repo => {
            const card = document.createElement('article');
            card.className = 'project-card';

            const humanReadableName = repo.name.replace(/[-_]/g, ' ');
            const primaryLanguage = repo.language || 'Config';

            card.innerHTML = `
                <div>
                    <h3>${humanReadableName}</h3>
                    <p>
                        ${
                            repo.description ||
                            'No direct system description documented in repository settings.'
                        }
                    </p>
                </div>

                <div>
                    <div class="tags">
                        <span class="tag">
                            ${primaryLanguage}
                        </span>
                    </div>

                    <div class="card-links">
                        <a 
                            href="${repo.html_url}"
                            target="_blank"
                            rel="noopener noreferrer">
                            GitHub Source →
                        </a>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });

    } catch (error) {
        console.error('API Fail Trace:', error);
        grid.innerHTML =
            `<p class="loading-text">
                ${error.message}
            </p>`;
    }
}

document.addEventListener(
    'DOMContentLoaded',
    loadLiveGitHubProjects
);
/*Dynamic GitHub Project Section, live feed*/

/*State Manager Section Wrapper/Resume*/
openResumeBtn.onclick = () => {
    resumeGlass.classList.add('active');
    resumeGlass.setAttribute('aria-hidden', 'false');
}; /*Opens the resume*/

closeResumeBtn.onclick = () => {
    resumeGlass.classList.remove('active');
    resumeGlass.setAttribute('aria-hidden', 'true');
}; /*Closes the resume*/

/*iconopenResumeBtn.onclick = () => {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');
};*/
/*Why is it that open-resume-btn the - have to be removed and the R is capilaozed. 
In the tutorial code for the login and registration page the 
<span class="icon-close"> is linked in its JavaScript as 
iconClose.onclick = () => {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');
};*/
/*State Manager Section Wrapper/Resume*/
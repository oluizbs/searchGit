const input = document.getElementById('username-input');

const resultDiv = document.getElementById('result');

const form = document.querySelector("#form").addEventListener("submit", (event => {
    event.preventDefault();
    const user = input.value;
    if (user){
        buscaUser(user);
    }
}));

function buscaUser(user) {
    const buscaUser = `https://api.github.com/users/${user}`;
    const buscaRepos = `https://api.github.com/users/${user}/repos`;

    fetch(buscaUser)
        .then(response => response.json())
        .then(user => {
            fetch(buscaRepos)
                .then(response => response.json())
                .then(repos => {
                    displayUser(user, repos);
                })
                .catch(error => {
                    displayError();
                });
        })
        .catch(error => {
            displayError();
        });
}

function displayUser(user, repos) {
    const html = `
        <div class="userInfo">

            <img src="${user.avatar_url}" alt="Profile Picture">

            <h2>
                ${user.name}
            </h2>

            <p id="login_name">
                ${user.login}
            </p>

            <p>
                ${user.bio}
            </p>
            
            <p>
                ${user.followers} followers ${user.following} following<br>

                ${user.location}<br>

                <a href="${user.html_url}" target="_blank"
                   <p class="user_html"> ${user.html_url}</p>
                </a>
            </p>

        </div>
    `;
    
    let reposHtml = ''; 

    repos.forEach(repo => {
        reposHtml += 
        `<div class="divRepos">
            <a href="${repo.html_url}" target="_blank"
                <h3> 
                    ${repo.name}
                </h3>
            </a>

            <p>
                ${repo.description ? repo.description : 'Sem Descrição'}
            </p>

            <p>
                Tecnologia Dominante: ${repo.language ? repo.language : 'N/A'}
            </p>

        </div>`;
    });

    resultDiv.innerHTML = html + `<h3>Repositórios:</h3>${reposHtml}`;
}
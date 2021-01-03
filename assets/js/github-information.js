// to direct ourselves to the user's public profile = user.html_user
function userInformationHTML(user){
    return `
    <h2>${user.name}
        <span class="small-name">
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href = "${user.html_url} target="_blank">
                <img src=" ${user.avatar_url}" width="80" height="80" alt="${user.login}"/>
            </a>
        </div>
        <p> Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos} </p>
    </div>`;
    
}

// function to display data on screen - the object returned from the API 
// if length is 0, array is empty and there is no repositories
function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    // if there is a result - iteretate through the array result
    // using Map method - returns an array 
    // use join to join everything on that array and join on a new line 
    // stops from having to iterate through the new array once again
    var listItemsHTML = repos.map(function(repo) {
        return `<li>  
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p> 
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div> `
}

function fetchGithubInformation(event) {

    // These empty the search bar 
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

    var username = $("#gh-username").val();

    // if username field is empty
    // return a small html text saying " please enter github username "
    if (!username){
        $("#gh-user-data").html(`<h2> Please enter a GitHub Username </h2>`);
        return;
    }

    $("gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`);

    // function to display it in the gh-user-data div 
    // otherwise - error function 
    // when method always packs the info into an array
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function(firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var repoData = secondResponse[0];

            // set the html code to the results of this function
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        }, 
        function(errorResponse) {

            // if the error response takes the 404 result 
            // then the HTML will show an error message
            if (errorResponse.status === 404) {
                $("gh-user-data").html(
                    `<h2>
                        No info found for user ${username}
                    </h2>`);
            }

            // for API throttling - check for 'forbidden'
            // date we want is inside the error response - in headers
            // Header provided by GH lets us know when it will reset 
            // UNIX time stamp
            else if (errorResponse.status === 403) {
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset')*1000);
                $("#gh-user-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`)
            }
            
            // the error we receive might not be a 404 error
            // set the gh-user-data to the response we received 
            else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}

// this one line displays the profile when DOM is fully loaded
$(document).ready(fetchGithubInformation);
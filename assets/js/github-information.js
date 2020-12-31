function fetchGithubInformation(event) {
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

    // when we get a response from the Github API 
    // then function to display it in the gh-user-data div 
    // otherwise - error function 
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        function(response) {
            var userData = response;

            // set the html code to the results of this function
            $("#gh-user-data").html(userInformationHTML(userData));
        }, 
        function(errorResponse) {

            // if the error response takes the 404 result 
            // then the HTML will show an error message
            if (errorResponse.status === 404) {
                $("gh-user-data").html(
                    `<h2>
                        No info found for user ${username}
                    </h2>`)
            } 
            
            // the error we receive might not be a 404 error
            // therefore, show error via console.log 
            // set the gh-user-data to the response we received 
            // JSON response from our error response variable above
            else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
                )
            }
        });
}
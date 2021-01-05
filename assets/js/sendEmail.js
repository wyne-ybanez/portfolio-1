function sendMail(contactForm){
    emailjs.send("gmail","wyne", {
        // the name and the value in the contact form
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
    })
    // emailjs.send.then promise
    .then(
        function(response) {
            console.log("SUCCESS", response);
        }, 
        function(error){
            console.log("FAILED", error);
        })
    return false;
};
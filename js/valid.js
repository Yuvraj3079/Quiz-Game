/*technology: Use a logical AND operator
Use a logical OR operator
Use a logical NOT operator
Use an If statement
Use an If … Else statement
Use an If … Else If statement
Use the event Target property
Use a Focus event

*/
$(document).ready(function() {
	function matchPass(pass,pass2){
        if(pass != pass2){
            $("#password2").next().text("*Password doesn't match");
            return 0;
        }
    }
	$("#username").focus();
	$("#signup_form").submit(
		function(event) {
			var flag = 1;
			var emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
			//#name  #email #phone
			if($("#name").val()==""){
				$("#name").next().text("*This field is required");
				flag = 0;
			}
		
			if($("#email").val()==""){
				$("#email").next().text("*This field is required");
				flag = 0;
			} else if(!emailPattern.test($("#email").val())){
				$("#email").next().text("*Must be a valid email address");
				flag = 0;
			}else{
            }
            if($("#password").val()==""){
				$("#password").next().text("*This field is required");
				flag = 0;
            }
            if($("#password2").val()==""){
				$("#password2").next().text("*This field is required");
				flag = 0;
            }
            var pass = $("#password").val(),pass2 = $("#password2").val();
            flag = matchPass(pass, pass2);
			$("#name").val($("#name").val().trim());
			$("#email").val($("#email").val().trim());
			

			if (flag == 0) {
				event.preventDefault();				
			}
		} // end function
	);


}); // end ready
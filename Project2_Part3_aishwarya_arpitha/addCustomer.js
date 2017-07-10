

 $(document).ready(function() {
	 //connect to your local IP by typing your local IP
	var socket = io.connect("http://localhost:4444/");



	// Assign event handlers to button clicks
	$('#buttonCustomerAdd').click(handleAddCustomer);



	 //handle Add event to the user
	function handleAddCustomer() {
			var first_name = $('#first-name').val();
			var last_name = $('#last-name').val();
			var address = $('#address').val();
			if (first_name.trim() != "") {
				if (last_name.trim() != "") {
					if (address.trim() != "") {

							var customerObject = {'Initial_Name' : first_name, 'Last_Name': last_name, 'Address' :  address};
							socket.emit("onSaveCutsomer", customerObject);
					}
					else {
						displayErrorMsg('Please enter address');
					}
				}
				else {
                    displayErrorMsg('Please enter last name');
                }
			}
			else {
                displayErrorMsg('Please enter first name');
            }
	}



	/************************************************************************************************************************************************/

	// Assign event handlers to events from server
	 socket.on("onSaveCustomerSucess", handleSaveSuccessEvnt);

	 function handleSaveSuccessEvnt()
	 {
		 window.location = 'index.html';
	 }

	 function displayErrorMsg(errorMsg) {
		$('#divErrorMsg').html(errorMsg);
		$('#divErrorStatus').show();
	}
 });

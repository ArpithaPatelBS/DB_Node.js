

 $(document).ready(function() {
	 //connect to your local IP by typing your local IP
	var socket = io.connect("http://localhost:4444/");

	//Calls the server onRead event through socket
	socket.emit("onMagazine_PublicationRead");
	socket.emit("onFrequencyRead");

	// Assign event handlers to button clicks
	$('#buttonRateAdd').click(handleAddRate);



	 //handle Add event to the user
	function handleAddRate() {
			var rate = $('#rate').val();
			var no_issues = $('#no-issues').val();
			var magazine_publication = $( "#magazine-publication-name option:selected" ).val();
			var frequency = $( "#frequency option:selected" ).val();
			if (rate.trim() != "") {
				if (no_issues.trim() != "") {

							var customerObject = {'Rate' : rate, 'No_Of_Issue': no_issues, 'Magazine_ID' :  magazine_publication, 'Frequency_ID' : frequency };
							socket.emit("onSaveRate", customerObject);

				}
				else {
                    displayErrorMsg('Please enter number of issues');
                }
			}
			else {
                displayErrorMsg('Please enter rate');
            }
	}




	/************************************************************************************************************************************************/

	// Assign event handlers to events from server
	 socket.on("onSaveRateSucess", handleSaveRateSuccessEvnt);
	 socket.on("onReadMagazine_PublicationSucess", handleReadMagazine_PublicationSucessEvnt);
	 socket.on("onReadFrequencySucess", handleReadFrequencySucessEvnt);

	 function handleSaveRateSuccessEvnt()
	 {
		 window.location = 'index.html';
	 }

	 function handleReadMagazine_PublicationSucessEvnt(data)
	 {
		 var option = '';
		 for(i=0; i<data.length; i++)
		 {
			 option += '<option value="' +  data[i].Id + '">' + data[i].Name + '</option>';
		 }
		$('#magazine-publication-name').append(option);
	 }

	 function handleReadFrequencySucessEvnt(data)
	 {
		 var option = '';
		 for(i=0; i<data.length; i++)
		 {
			 option += '<option value="' +  data[i].Id + '">' + data[i].Name + '</option>';
		 }
		$('#frequency').append(option);
	 }

	 function displayErrorMsg(errorMsg) {
		$('#divErrorMsg').html(errorMsg);
		$('#divErrorStatus').show();
	}
 });

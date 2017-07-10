

 $(document).ready(function() {
	 //connect to your local IP by typing your local IP
	var socket = io.connect("http://localhost:4444/");

	//Calls the server onRead event through socket
	socket.emit("onMagazineRead");


	// Assign event handlers to button clicks
	$('#buttonMagazineAdd').click(handleAddMagazine);



	 //handle Add event to the user
	function handleAddMagazine() {
			var magazine_name = $('#magazine-name').val();
			var publication_id = $( "#publication-name option:selected" ).val();
			if (magazine_name.trim() != "") {

							var pub = {'Magazine_Name' : magazine_name, 'Publication_Id': publication_id};
							socket.emit("onSaveMagazine", pub);

			}
			else {
                displayErrorMsg('Please enter Magazine name');
            }
	}



	/************************************************************************************************************************************************/

	// Assign event handlers to events from server
	 socket.on("onSaveMagazineSucess", handleSaveMagazineSuccessEvnt);
	 socket.on("onReadMagazineSucess", handleReadMagazineSucessEvnt);

	 function handleSaveMagazineSuccessEvnt()
	 {
		 window.location = 'index.html';
	 }

	 function handleReadMagazineSucessEvnt(data)
	 {
		 var option = '';
		 for(i=0; i<data.length; i++)
		 {
			 option += '<option value="' +  data[i].Id + '">' + data[i].Name + '</option>';
		 }
		$('#publication-name').append(option);
	 }

	 function displayErrorMsg(errorMsg) {
		$('#divErrorMsg').html(errorMsg);
		$('#divErrorStatus').show();
	}
 });

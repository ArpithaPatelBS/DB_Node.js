

 $(document).ready(function() {
	 //connect to your local IP by typing your local IP
	var socket = io.connect("http://localhost:4444/");

	//Calls the server onRead event through socket
	socket.emit("onNewspaperRead");


	// Assign event handlers to button clicks
	$('#buttonNewspaperAdd').click(handleAddMagazine);



	 //handle Add event to the user
	function handleAddMagazine() {
			var newspaper_name = $('#newspaper-name').val();
			var publication_id = $( "#publication-name option:selected" ).val();
			if (newspaper_name.trim() != "") {

							var pub = {'Newspaper_Name' : newspaper_name, 'Publication_Id': publication_id};
							socket.emit("onSaveNewspaper", pub);

			}
			else {
                displayErrorMsg('Please enter Newspaper name');
            }
	}



	/************************************************************************************************************************************************/

	// Assign event handlers to events from server
	 socket.on("onSaveNewspaperSucess", handleSaveNewspaperSuccessEvnt);
	 socket.on("onReadNewspaperSucess", handleReadNewspaperSucessEvnt);

	 function handleSaveNewspaperSuccessEvnt()
	 {
		 window.location = 'index.html';
	 }

	 function handleReadNewspaperSucessEvnt(data)
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

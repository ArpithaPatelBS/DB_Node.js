

 $(document).ready(function() {
	 //connect to your local IP by typing your local IP
	var socket = io.connect("http://localhost:4444/");

	//Calls the server onRead event through socket
	socket.emit("onCustomerSubsRead");
	socket.emit("onPubSubRead");
	
	// Assign event handlers to button clicks
	$('#buttonSubscriptionAdd').click(handleAddSubscription);

	

	$('#type-name').change( function(){
		var type= $('#type-name option:selected').val();
		 //connect to your local IP by typing your local IP
		var socket = io.connect("http://localhost:4444/");

		//Calls the server onRead event through socket
		socket.emit("onMagazineNewspaperSubRead", type);
		
		 socket.on("onReadMagazineNewspaperSubsSucess", handleReadMagazineNewspaperSucessEvnt);
		
		 function handleReadMagazineNewspaperSucessEvnt(data)
		 {
			 var option = '';
			 option = option + '<option>Please Select</option>';
			 $('#rate-issue-name').html(option);
			 for(i=0; i<data.length; i++)
			 {
				 option += '<option value="' +  data[i].Id + '">' + data[i].Name + '</option>';
			 }
			$('#mag-news-name').html(option);
			$('#form-news-mag').show();
		 }
		
	});		
	
	
	
	$('#mag-news-name').change( function(){
		var type = $('#type-name option:selected').val();
		var name = $('#mag-news-name option:selected').val();
		 //connect to your local IP by typing your local IP
		var socket = io.connect("http://localhost:4444/");

		//Calls the server onRead event through socket
		socket.emit("onRateIssuesSubRead", type, name);
		
		 socket.on("onReadRateIssueSubsSucess", handleReadRateIssueSucessEvnt);
		
		 function handleReadRateIssueSucessEvnt(data)
		 {
			 var option = '';
			 option = option + '<option>Please Select</option>';
			 for(i=0; i<data.length; i++)
			 {
				 option += '<option value="' +  data[i].Id + '">' + data[i].Name + '</option>';
			 }
			$('#rate-issue-name').html(option);
			$('#form-rate-issue-mag').show();
		 }
		
	});		
	
	
	
	 //handle Add event to the user
	function handleAddSubscription() {
			var start_date = $('#start-date').val();
			var end_date = $('#end-date').val();
			var type = $('#type-name option:selected').val();
			var name = $('#mag-news-name option:selected').val();
			var rate_issue = $('#rate-issue-name option:selected').val();
			var publication_id = $( "#publication-name option:selected" ).val();
			var customer_id = $('#customer-name').val();
			if (start_date.trim() != "") {
				if(end_date.trim() != ""){
					if(type == 'Magazine')
					{
							var sub = {'Start_Date' : start_date, 'End_Date': end_date, Type: type, NewspaperSubscription_ID : '0', MagazineSusbscription_ID : rate_issue,  Cutomer_ID : customer_id };
							socket.emit("onSaveMagazineSubscription", sub);
					}
					else{
							var sub = {'Start_Date' : start_date, 'End_Date': end_date, Type: type, NewspaperSubscription_ID : rate_issue, MagazineSusbscription_ID : '0',  Cutomer_ID : customer_id };
							socket.emit("onSaveNewspaperSubscription", sub);
					}
				}
				else{
					displayErrorMsg('Please enter End Date');
				}
			}
			else {
                displayErrorMsg('Please enter Start Date');
            }
	}

	

	/************************************************************************************************************************************************/

	// Assign event handlers to events from server
	 
	socket.on("onReadCustomerSubsSucess", handleReadCustomerSubsSucessEvnt);
	socket.on("onPubSubsSucess", handleReadPubSucessEvnt);
	socket.on("onSaveMagSubs", handleSaveMagSubEvnt);
	socket.on("onSaveNewsSubs", handleSaveNewsSubEvnt)
	
	
	 function handleReadCustomerSubsSucessEvnt(data)
	 {
		 var option = '';
		 for(i=0; i<data.length; i++)
		 {
			 option += '<option value="' +  data[i].Id + '">' + data[i].Name + '</option>';
		 }
		$('#customer-name').append(option);
	 }
	 
	 
	 function handleSaveMagSubEvnt()
	 {
		 window.location = "index.html";
	 }
	 
	 function handleSaveNewsSubEvnt()
	 {
		 window.location = "index.html";
	 }
	 
	function handleReadPubSucessEvnt(data)
		 {
			 var option = '';
			 for(i=0; i<data.length; i++)
			 {
				 option += '<option value="' +  data[i].Id + '">' + data[i].Name + '</option>';
			 }
			$('#pub-name').html(option);
		 }
	

	function displayErrorMsg(errorMsg) {
		$('#divErrorMsg').html(errorMsg);
		$('#divErrorStatus').show();
	}
 });
 
 
 
 
 

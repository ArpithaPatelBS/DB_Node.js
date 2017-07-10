//Global array and xml to keep the data alive across different pages.
 var globalArray = [];
 var globalXML = '';

 $(document).ready(function() {
	 //connect to your local IP by typing your local IP
	var socket = io.connect("http://localhost:4444/");

	//Calls the server onRead event through socket
	socket.emit("onRead");
	 socket.on("onReadSuccess", handleReadSuccessEvnt);

	function handleReadSuccessEvnt(data)
	{

		var pathname = window.location.pathname;

    var html='';
    var Output = '<table class="table table-striped" id="tableID">';
    Output=Output+'<thead><tr><th>#</th><th>First Name</th><th>Last Name</th><th>Address</th></tr></thead><tbody>';
    for(var i =0; i<data.length;i++)
    {
      Output = Output +'<tr>';
      Output = Output +'<td>'+data[i]['Customer_ID']+'</td>';
      Output = Output +'<td>'+data[i]['Initial_Name']+'</td>';
      Output = Output +'<td>'+data[i]['Last_Name']+'</td>';
      Output = Output +'<td>'+data[i]['Address']+'</td>';
      Output = Output +'</tr>';
    }
    Output=Output+'</tbody></table>'
    // var readData = $('#tableID');
    // console.log(Output);
    //readData.append(Output);
    document.getElementById('tableData').innerHTML=Output;
	}

 });

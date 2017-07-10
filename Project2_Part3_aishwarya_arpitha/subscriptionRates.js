//Global array and xml to keep the data alive across different pages.
 var globalArray = [];
 var globalXML = '';

 $(document).ready(function() {
	 //connect to your local IP by typing your local IP
	var socket = io.connect("http://localhost:4444/");

	//Calls the server onRead event through socket
   socket.emit("onSubRates")
    socket.on("onSubRatesSuccess", handleOnSubRateSuccessEvnt);

  function handleOnSubRateSuccessEvnt(data)
  {

    var html='';
    var Output = '<table class="table table-striped" id="tableID">';
    //magazine_ID, magazine.magazine_name, magazine_subscription.No_of_issue, magazine_subscription.rate,frequency.frequency_name-->
    Output=Output+'<thead><tr><th>Customer ID</th><th>Intial Name </th><th>Rate</th><th>Sub_ID</th><th>Type</th><th>Name</th></tr></thead><tbody>';
    for(var i =0; i<data.length;i++)
    {
      Output = Output +'<tr>';
      Output = Output +'<td>'+data[i]['customer_ID']+'</td>';
      Output = Output +'<td>'+data[i]['initial_name']+'</td>';
      Output = Output +'<td>'+data[i]['Rate']+'</td>';
      Output = Output +'<td>'+data[i]['Sub_ID']+'</td>';
      Output = Output +'<td>'+data[i]['type']+'</td>';
      Output = Output +'<td>'+data[i]['name']+'</td>';
      Output = Output +'</tr>';
    }
    Output=Output+'</tbody></table>'
    // var readData = $('#tableID');
    // console.log(Output);
    //readData.append(Output);
    document.getElementById('subRatesData').innerHTML=Output;
  }

 });

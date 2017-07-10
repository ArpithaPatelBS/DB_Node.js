//Global array and xml to keep the data alive across different pages.
 var globalArray = [];
 var globalXML = '';

 $(document).ready(function() {
	 //connect to your local IP by typing your local IP
	var socket = io.connect("http://localhost:4444/");

	//Calls the server onRead event through socket
   socket.emit("onWeeklyMagazine")
    socket.on("onWeeklyMagazineSuccess", handleOnWeeklyMagazineSuccessEvnt);

  function handleOnWeeklyMagazineSuccessEvnt(data)
  {

    var html='';
    var Output = '<table class="table table-striped" id="tableID">';
    //magazine_ID, magazine.magazine_name, magazine_subscription.No_of_issue, magazine_subscription.rate,frequency.frequency_name-->
    Output=Output+'<thead><tr><th>Magazine ID</th><th>Magazine Name </th><th>No of Issues</th><th>Rate</th><th>Frequency name</th></tr></thead><tbody>';
    for(var i =0; i<data.length;i++)
    {
      Output = Output +'<tr>';
      Output = Output +'<td>'+data[i]['magazine_ID']+'</td>';
      Output = Output +'<td>'+data[i]['magazine_name']+'</td>';
      Output = Output +'<td>'+data[i]['No_of_issue']+'</td>';
      Output = Output +'<td>'+data[i]['rate']+'</td>';
      Output = Output +'<td>'+data[i]['frequency_name']+'</td>';
      Output = Output +'</tr>';
    }
    Output=Output+'</tbody></table>'
    // var readData = $('#tableID');
    // console.log(Output);
    //readData.append(Output);
    document.getElementById('weeklyMagazineData').innerHTML=Output;
  }

 });

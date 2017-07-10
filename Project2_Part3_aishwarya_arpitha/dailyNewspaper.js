//Global array and xml to keep the data alive across different pages.
 var globalArray = [];
 var globalXML = '';

 $(document).ready(function() {
	 //connect to your local IP by typing your local IP
	var socket = io.connect("http://localhost:4444/");

	//Calls the server onRead event through socket
   socket.emit("onDailyNewspaper");
    socket.on("onDailyNewspaperSuccess", handleOnDailyNewspaperSuccessEvnt);

  function handleOnDailyNewspaperSuccessEvnt(data)
  {

    var html='';
    var Output = '<table class="table table-striped" id="tableID">';
    //magazine_ID, magazine.magazine_name, magazine_subscription.No_of_issue, magazine_subscription.rate,frequency.frequency_name-->
    Output=Output+'<thead><tr><th>Newspaper ID</th><th>Newspaper Name </th><th>No of Months</th><th>Rate</th><th>Frequency name</th></tr></thead><tbody>';
    for(var i =0; i<data.length;i++)
    {
      Output = Output +'<tr>';
      Output = Output +'<td>'+data[i]['newspaper_ID']+'</td>';
      Output = Output +'<td>'+data[i]['newspaper_name']+'</td>';
      Output = Output +'<td>'+data[i]['no_of_months']+'</td>';
      Output = Output +'<td>'+data[i]['rate']+'</td>';
      Output = Output +'<td>'+data[i]['frequency_name']+'</td>';
      Output = Output +'</tr>';
    }
    Output=Output+'</tbody></table>'
    // var readData = $('#tableID');
    // console.log(Output);
    //readData.append(Output);
    document.getElementById('dailyNewspaperData').innerHTML=Output;
  }

 });

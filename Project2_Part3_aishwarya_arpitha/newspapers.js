//Global array and xml to keep the data alive across different pages.
 var globalArray = [];
 var globalXML = '';
 var newspaperID;

 $(document).ready(function() {
	 //connect to your local IP by typing your local IP
	var socket = io.connect("http://localhost:4444/");

	//Calls the server onRead event through socket
   socket.emit("onNewspaper")
    socket.on("onNewspaperSuccess", handleOnNewspaperSuccessEvnt);


  function handleOnNewspaperSuccessEvnt(data)
  {
    var html='';
    var Output = '<table class="table table-striped" id="tableID">';
    Output=Output+'<thead><tr><th>Newspaper ID</th><th>Newspaper Name </th><th>No of months </th><th>Publication ID</th><th>Rate</th></tr></thead><tbody>';
    for(var i =0; i<data.length;i++)
    {
      var noOfMonths;
      Output = Output +'<tr>';
      newspaperID = data[i]['newspaper_ID'];
      noOfMonths = data[i]['no_of_months']
      Output = Output +'<td>'+data[i]['newspaper_ID']+'</td>';
      Output = Output +'<td>'+data[i]['newspaper_name']+'</td>';
      Output = Output +'<td>'+data[i]['no_of_months']+'</td>';
      Output = Output +'<td>'+data[i]['publication_ID']+'</td>';
      var rate= data[i]['Rate'];
      Output = Output +'<td><input type="text" id="txt' + noOfMonths + '" value="' +rate+ '">'+  '</td>';
      Output = Output + '<td><button type="button" id="but2" onClick="saveFunction(' + newspaperID + ',' + noOfMonths + ')">Save!</button>'+'</td>';
      Output = Output +'</tr>';
    }
    Output=Output+'</tbody></table>'
    // var readData = $('#tableID');
    // console.log(Output);
    //readData.append(Output);
    document.getElementById('tableData').innerHTML=Output;
  }

 });


 function saveFunction(newspaperID,noOfMonths){
   var socket = io.connect("http://localhost:4444/");
   var rate;
   rate = document.getElementById("txt" + noOfMonths).value;
   socket.emit("textFieldNewsRateChanged",rate,newspaperID, noOfMonths);
 }

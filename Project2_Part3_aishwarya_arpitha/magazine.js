//Global array and xml to keep the data alive across different pages.
 var globalArray = [];
 var globalXML = '';
 var magazineID;

 $(document).ready(function() {
	 //connect to your local IP by typing your local IP
	var socket = io.connect("http://localhost:4444/");

	//Calls the server onRead event through socket
   socket.emit("onMagazine")
    socket.on("onMagazineSuccess", handleOnMagazineSuccessEvnt);
    socket.on("onRateChangedSuccess", onRateChangedSuccessEvnt)

  function handleOnMagazineSuccessEvnt(data)
  {

    var html='';
    var Output = '<table class="table table-striped" id="tableID">';
    Output=Output+'<thead><tr><th>Magazine ID</th><th>Magazine Name </th><th>Issue ID</th><th>Publication ID</th><th>Rate</th></tr></thead><tbody>';
    for(var i =0; i<data.length;i++)
    {
      var issueID;
      Output = Output +'<tr>';
      magazineID = data[i]['magazine_ID'];
      issueID = data[i]['issue_ID']
      Output = Output +'<td>'+data[i]['magazine_ID']+'</td>';
      Output = Output +'<td>'+data[i]['magazine_name']+'</td>';
      Output = Output +'<td>'+data[i]['issue_ID']+'</td>';
      Output = Output +'<td>'+data[i]['publication_ID']+'</td>';
      var rate= data[i]['Rate'];
      issueID = data[i]['issue_ID'];
      Output = Output +'<td><input type="text" id="txt' + issueID + '" value="'+rate+'">'+  '</td>';
      Output = Output + '<td><button type="button" id="but1" onClick="saveFunction(' + magazineID + ',' +issueID+ ')">Save!</button>'+'</td>';
      Output = Output +'</tr>';
    }
    Output=Output+'</tbody></table>'
    // var readData = $('#tableID');
    // console.log(Output);
    //readData.append(Output);
    document.getElementById('tableData').innerHTML=Output;
  }

  function onRateChangedSuccessEvnt(data){
    console.log("RateChanged");
  }

 });


 function saveFunction(magazineID,issueID){
   var socket = io.connect("http://localhost:4444/");
   var rate;
   rate = document.getElementById("txt" + issueID).value;
   socket.emit("textFieldChanged",rate ,magazineID, issueID);
 }

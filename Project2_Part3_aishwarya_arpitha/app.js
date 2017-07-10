
var app = require('express')();
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var fs = require('fs');
var io=require('socket.io');
var globalRows;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


// Create an instance of http server that listens on TCP port 4000
var server = http.createServer(createServerCallbackHandler).listen(4444, function() {
    console.log('listening on *:4444');
});

// Load all the resources (files) once the server is created
function createServerCallbackHandler(request, response) {
    var resFilePath = false;
    if (request.url == '/') {
        resFilePath = '/index.html';
    } else {
        resFilePath = request.url;
    }
    var absResPath = './' + resFilePath;
    response.writeHead(200, {
        "Content-Type": mime.lookup(path.basename(absResPath))
    });
    fs.readFile(absResPath, function(err, data) {
        if (err) {
            throw err;
        }
        response.write(data);
        response.end();
    });
}

// Create a socket and make it listen to the server created above
var socket = io.listen(server);

socket.on("connection", handleClient);

// Function to assign event handlers to each new client
function handleClient(client) {
    // Assign event handlers based on the corresponding messages
	client.on("onRead", evtHandlerOnRead);
  client.on("onMagazine",evtHandlerOnMagazine);
  client.on("onWeeklyMagazine",evtHandlerWeeklyMagazine);
  client.on("onDailyNewspaper",evtHandlerDailyNewspaper);
  client.on("onSubRates", evtHandlerSubRates);
  client.on("textFieldChanged", evtHandlerRateChanged);
  client.on("textFieldNewsRateChanged", evtHandlerNewsRateChanged);
  client.on("onNewspaper", evtHandlerAllNewspapers);


client.on("onSaveCutsomer", evtHandlerOnaddCustomer);
client.on("onMagazineRead", evtHandlerOnReadMagazine);
client.on("onSaveMagazine", evtHandlerOnaddMagazine);
client.on("onNewspaperRead", evtHandlerOnReadNewspaper);
client.on("onSaveNewspaper", evtHandlerOnaddNewspaper);
client.on("onMagazine_PublicationRead", evtHandlerOnReadMagazine_Publication);
client.on("onFrequencyRead", evtHandlerOnReadFrequency);
client.on("onSaveRate", evtHandlerOnaddRate);
client.on("onSubscriptionDataRead", evtHandlerOnReadSubscriptionData);
client.on("onCustomerSubsRead", evtHandlerOnReadCustomerSubs);
client.on("onMagazineNewspaperSubRead", evtHandlerOnReadMagazineNewspaperSubs );
client.on("onPubSubRead", evtHandlerOnPub);
client.on("onRateIssuesSubRead", evtHandlerOnRateIssues);
client.on("onSaveMagazineSubscription", evtHandlerOnMagazineSub);
client.on("onSaveNewspaperSubscription", evtHandlerOnNewspaperSub);

  function evtHandlerNewsRateChanged(dataRate,dataNewspaperID, noOfMonths)
  {
    console.log('onNewsRateChangedSuccess');
    // First you need to create a connection to the db
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
    });

      con.query('UPDATE subscription.newspaper_subscription SET ? WHERE ?', [{rate: dataRate}, {no_of_months: noOfMonths}],function(err,rows){

      if(err) throw err;

      client.emit('onNewsRateChangedSuccess');
      console.log('Data received from Db:\n');

    });

    con.end(function(err) {
      // The connection is terminated gracefully
      // Ensures all previously enqueued queries are still
      // before sending a COM_QUIT packet to the MySQL server.
    });

  }

  function evtHandlerRateChanged(dataRate,dataMagazineID, issueID)
  {
    console.log('onRateChangedSuccess');
    // First you need to create a connection to the db
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
    });

      con.query('UPDATE subscription.magazine_subscription SET ? WHERE ?', [{rate: dataRate}, {issue_id: issueID}],function(err,rows){

      if(err) throw err;

      client.emit('onRateChangedSuccess');
      console.log('Data received from Db:\n');

    });

    con.end(function(err) {
      // The connection is terminated gracefully
      // Ensures all previously enqueued queries are still
      // before sending a COM_QUIT packet to the MySQL server.
    });

  }

	function evtHandlerOnRead(globalRows)
	{
		console.log('onReadSuccess');
    // First you need to create a connection to the db
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
    });

    con.query('SELECT * FROM subscription.customer',function(err,rows){
      if(err) throw err;

      client.emit('onReadSuccess',rows);
      console.log('Data received from Db:\n');
    });

    con.end(function(err) {
      // The connection is terminated gracefully
      // Ensures all previously enqueued queries are still
      // before sending a COM_QUIT packet to the MySQL server.
    });

	}

  function evtHandlerAllNewspapers(globalRows)
	{
		console.log('onNewspaperSuccess');
    // First you need to create a connection to the db
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
    });

    con.query('select n.newspaper_ID,n.newspaper_name, ns.no_of_months, n.publication_ID, ns.Rate from subscription.newspaper n left outer join subscription.newspaper_subscription ns on n.newspaper_ID  = ns.newspaper_ID;',function(err,rows){
      if(err) throw err;

      client.emit('onNewspaperSuccess',rows);
      console.log('Data received from Db for all newspapers:\n');
    });

    con.end(function(err) {
      // The connection is terminated gracefully
      // Ensures all previously enqueued queries are still
      // before sending a COM_QUIT packet to the MySQL server.
    });

	}



  function evtHandlerOnMagazine(globalRows)
	{
		console.log('onMagazineSuccess');
    // First you need to create a connection to the db
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
    });

    con.query('select m.magazine_ID,m.magazine_name, ms.issue_ID, m.publication_ID, ms.Rate from subscription.magazine m left outer join subscription.magazine_subscription ms on m.magazine_ID  = ms.magazine_ID;',function(err,rows){
      if(err) throw err;

      client.emit('onMagazineSuccess',rows);
      console.log('Data received from Db for all magazines:\n');
    });

    con.end(function(err) {
      // The connection is terminated gracefully
      // Ensures all previously enqueued queries are still
      // before sending a COM_QUIT packet to the MySQL server.
    });

	}

  function evtHandlerWeeklyMagazine(globalRows)
	{
		console.log('onWeeklyMagazineSuccess');
    // First you need to create a connection to the db
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
    });

    con.query
    ('select magazine.magazine_ID, magazine.magazine_name, magazine_subscription.No_of_issue, magazine_subscription.rate,frequency.frequency_name from subscription.Magazine, subscription.magazine_subscription, subscription.frequency where magazine_subscription.frequency_ID = frequency.frequency_ID and magazine.magazine_ID = magazine_subscription.magazine_ID and frequency.frequency_ID =1;',function(err,rows){
      if(err) throw err;

      client.emit('onWeeklyMagazineSuccess',rows);
      console.log('Data received from Db for weekly magazines:\n');
    });

    con.end(function(err) {
      // The connection is terminated gracefully
      // Ensures all previously enqueued queries are still
      // before sending a COM_QUIT packet to the MySQL server.
    });

	}

  function evtHandlerDailyNewspaper(globalRows)
  {
    console.log('onDailyNewspaperSuccess');
    // First you need to create a connection to the db
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
    });

    con.query
    ('select newspaper.newspaper_ID, newspaper.newspaper_name, newspaper_subscription.no_of_months, newspaper_subscription.rate,frequency.frequency_name from subscription.newspaper, subscription.newspaper_subscription, subscription.frequency  where newspaper_subscription.frequency_ID = frequency.frequency_ID and newspaper.newspaper_ID = newspaper_subscription.newspaper_ID and frequency.frequency_ID =11;',function(err,rows){
      if(err) throw err;

      client.emit('onDailyNewspaperSuccess',rows);
      console.log('Data received from Db for weekly magazines:\n');
    });

    con.end(function(err) {
      // The connection is terminated gracefully
      // before sending a COM_QUIT packet to the MySQL server.
      // Ensures all previously enqueued queries are still
    });

  }

  function evtHandlerSubRates(globalRows)
  {
    console.log('onSubRatesSuccess');
    // First you need to create a connection to the db
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
    });

    con.query ('select c.customer_ID, c.initial_name , ms.rate as Rate, s.Sub_ID, s.type, m.Magazine_Name  as name from subscription.subscription s Inner join subscription.customer c on c.customer_id = s.cutomer_id inner join subscription.magazine_subscription ms on s.magazineSubscription_ID = ms.issue_ID inner join subscription.magazine m  on  m.magazine_ID  =ms.magazine_ID Union All select c.customer_ID, c.initial_name, ns.rate as Rate, s.Sub_ID, s.type, n.Newspaper_Name as name from subscription.subscription s Inner join subscription.customer c on c.customer_id = s.cutomer_id inner join subscription.newspaper_subscription ns on s.newspaperSubscription_ID = ns.Newspaper_Subscription_Id inner join subscription.newspaper n  on  n.newspaper_ID  = ns.newspaper_ID;',function(err,rows){
      if(err) throw err;

      client.emit('onSubRatesSuccess',rows);
      console.log('Data received from Db for subRates magazines:\n');
    });

    con.end(function(err) {
      // The connection is terminated gracefully
      // before sending a COM_QUIT packet to the MySQL server.
      // Ensures all previously enqueued queries are still
    });

  }

  function evtHandlerOnaddCustomer(data)
  {
    console.log('onCustomerAddSucess');
    console.log(data);
    //Create a connection to the db
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
      console.log('Error connecting to Db');
      return;
      }
      console.log('Connection established');
    });
    con.query('INSERT INTO subscription.customer SET ?', data, function(err,res){
        if(err) throw err;

        console.log('Last insert ID:', res.insertId);
    });
    client.emit('onSaveCustomerSucess');
  }
//arpitha
  function evtHandlerOnReadMagazine()
  {
    console.log('onReadMagazineSuccess');

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
      console.log('Error connecting to Db');
      return;
      }
      console.log('Connection established');
    });

    con.query("SELECT * FROM subscription.publication where Publication_Type = 'Magazine'",function(err,rows){
      if(err) throw err;
      console.log(rows);
      console.log('Data received from Db:\n');
      var publicationSubscription = [];

      for(i=0; i<rows.length; i++)
      {
        var pub = {Id: rows[i].Publication_ID, Name : rows[i].Publication_Name };
        publicationSubscription.push(pub);
      }
      console.log(publicationSubscription);
      client.emit('onReadMagazineSucess',publicationSubscription);
    });
  }

  function evtHandlerOnaddMagazine(data)
  {
    console.log('onMagazineAddSucess');
    console.log(data);
    //Create a connection to the db
    var con = mysql.createConnection({
      hhost: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
      console.log('Error connecting to Db');
      return;
      }
      console.log('Connection established');
    });
    con.query('INSERT INTO subscription.magazine SET ?', data, function(err,res){
        if(err) throw err;

        console.log('Last insert ID:', res.insertId);
    });
    client.emit('onSaveMagazineSucess');
  }


  function evtHandlerOnReadNewspaper()
  {
    console.log('onReadNewspaperSuccess');

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
      console.log('Error connecting to Db');
      return;
      }
      console.log('Connection established');
    });

    con.query("SELECT * FROM subscription.publication where Publication_Type = 'Newspaper'",function(err,rows){
      if(err) throw err;
      console.log(rows);
      console.log('Data received from Db:\n');
      var publicationSubscription = [];

      for(i=0; i<rows.length; i++)
      {
        var pub = {Id: rows[i].Publication_ID, Name : rows[i].Publication_Name };
        publicationSubscription.push(pub);
      }
      console.log(publicationSubscription);
      client.emit('onReadNewspaperSucess',publicationSubscription);
    });
  }


  function evtHandlerOnaddNewspaper(data)
  {
    console.log('onNewspaperAddSucess');
    console.log(data);
    //Create a connection to the db
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
      console.log('Error connecting to Db');
      return;
      }
      console.log('Connection established');
    });
    con.query('INSERT INTO subscription.newspaper SET ?', data, function(err,res){
        if(err) throw err;

        console.log('Last insert ID:', res.insertId);
    });
    client.emit('onSaveNewspaperSucess');
  }

  function evtHandlerOnReadMagazine_Publication()
  {
    console.log('onReadMagazine_PublicationSuccess');

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
      console.log('Error connecting to Db');
      return;
      }
      console.log('Connection established');
    });

    con.query("SELECT Magazine_ID, Magazine_Name, Publication_Name  FROM subscription.Magazine as M INNER JOIN subscription.publication as P where M.Publication_ID = P.Publication_ID",function(err,rows){
      if(err) throw err;
      console.log(rows);
      console.log('Data received from Db:\n');
      var mag_publicationSubscription = [];

      for(i=0; i<rows.length; i++)
      {
        var mag_pub = {Id: rows[i].Magazine_ID, Name : rows[i].Magazine_Name + '-' + rows[i].Publication_Name };
        mag_publicationSubscription.push(mag_pub);
      }
      console.log(mag_publicationSubscription);
      client.emit('onReadMagazine_PublicationSucess',mag_publicationSubscription);
    });

  }


  function evtHandlerOnReadFrequency()
  {
    console.log('evtHandlerOnReadFrequency');

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
      console.log('Error connecting to Db');
      return;
      }
      console.log('Connection established');
    });

    con.query("SELECT * FROM subscription.frequency",function(err,rows){
      if(err) throw err;
      console.log(rows);
      console.log('Data received from Db:\n');
      var frequency = [];

      for(i=0; i<rows.length; i++)
      {
        var fre = {Id: rows[i].Frequency_ID, Name : rows[i].Frequency_Name };
        frequency.push(fre);
      }
      console.log(frequency);
      client.emit('onReadFrequencySucess',frequency);
    });
  }

  function evtHandlerOnaddRate(data)
  {
    console.log('onRateAddSucess');
    console.log(data);
    //Create a connection to the db
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
      console.log('Error connecting to Db');
      return;
      }
      console.log('Connection established');
    });
    con.query('INSERT INTO subscription.magazine_subscription SET ?', data, function(err,res){
        if(err) throw err;

        console.log('Last insert ID:', res.insertId);
    });
    client.emit('onSaveRateSucess');
  }
  //arpitha update functions
  function evtHandlerOnReadSubscriptionData()
  {
    console.log('onSubscriptionDataReadSuccess');
    // First you need to create a connection to the db
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
    });

    con.query ('select c.customer_ID, c.initial_name , c.Last_Name, c.Address, ms.rate as Rate, s.Sub_ID, s.type, m.Magazine_Name  as name, p.Publication_Name, s.Start_Date, s.End_Date  from subscription.subscription s Inner join subscription.customer c on c.customer_id = s.cutomer_id  inner join subscription.magazine_subscription ms on s.magazineSubscription_ID = ms.issue_ID  inner join subscription.magazine m  on  m.magazine_ID  =ms.magazine_ID  inner join subscription.publication p on m.Publication_ID = p.Publication_ID  Union All  select c.customer_ID, c.initial_name, c.Last_Name, c.Address, ns.rate as Rate, s.Sub_ID, s.type, n.Newspaper_Name as name, p.Publication_Name, s.Start_Date, s.End_Date  from subscription.subscription s Inner join subscription.customer c on c.customer_id = s.cutomer_id  inner join subscription.newspaper_subscription ns on s.newspaperSubscription_ID = ns.Newspaper_Subscription_Id  inner join subscription.newspaper n  on  n.newspaper_ID  = ns.newspaper_ID  inner join subscription.publication p on n.Publication_ID = p.Publication_ID;',function(err,rows){
      if(err) throw err;

      client.emit('onSubscriptionDataSuccess',rows);
      console.log('Data received from Db for subRates magazines:\n');
    });

    con.end(function(err) {
      // The connection is terminated gracefully
      // before sending a COM_QUIT packet to the MySQL server.
      // Ensures all previously enqueued queries are still
    });

  }




  function evtHandlerOnReadCustomerSubs()
  {
    console.log('evtHandlerOnReadFrequency');

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
      console.log('Error connecting to Db');
      return;
      }
      console.log('Connection established');
    });

    con.query("SELECT * FROM subscription.customer",function(err,rows){
      if(err) throw err;
      console.log(rows);
      console.log('Data received from Db:\n');
      var customer = [];

      for(i=0; i<rows.length; i++)
      {
        var cust = {Id: rows[i].Customer_ID, Name : rows[i].Initial_Name + ' ' +  rows[i].Last_Name};
        customer.push(cust);
      }
      console.log(customer);
      client.emit('onReadCustomerSubsSucess',customer);
    });
  }



  function evtHandlerOnReadMagazineNewspaperSubs(type)
  {
    console.log('evtHandlerOnReadMagazineNewspaperSubs');

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
      console.log('Error connecting to Db');
      return;
      }
      console.log('Connection established');
    });

	if(type == 'Magazine')
	{
		con.query("SELECT distinct m.Magazine_Name, ms.Magazine_ID FROM subscription.magazine_subscription ms inner join subscription.magazine m on ms.Magazine_ID = m.Magazine_ID; ",function(err,rows){
		  if(err) throw err;
		  console.log(rows);
		  console.log('Data received from Db:\n');
		  var magazine = [];

		  for(i=0; i<rows.length; i++)
		  {
			var mag = {Id: rows[i].Magazine_ID, Name : rows[i].Magazine_Name };
			magazine.push(mag);
		  }
		  console.log(magazine);
		  client.emit('onReadMagazineNewspaperSubsSucess',magazine);
		});
	}
	else{
		  con.query("select distinct n.Newspaper_Name, ns.NewsPaper_ID from subscription.newspaper_subscription ns inner join subscription.newspaper n on ns.NewsPaper_ID = n.Newspaper_ID; ",function(err,rows){
		  if(err) throw err;
		  console.log(rows);
		  console.log('Data received from Db:\n');
		  var newspaper = [];

		  for(i=0; i<rows.length; i++)
		  {
			var news = {Id: rows[i].NewsPaper_ID, Name : rows[i].Newspaper_Name };
			newspaper.push(news);
		  }
		  console.log(newspaper);
		  client.emit('onReadMagazineNewspaperSubsSucess',newspaper);
		});

	}
  }



  function evtHandlerOnPub()
  {
    console.log('evtHandlerOnReadFrequency');

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
      console.log('Error connecting to Db');
      return;
      }
      console.log('Connection established');
    });

    con.query("SELECT * FROM subscription.publication",function(err,rows){
      if(err) throw err;
      console.log(rows);
      console.log('Data received from Db:\n');
      var publication = [];

      for(i=0; i<rows.length; i++)
      {
        var pub = {Id: rows[i].Publication_ID, Name : rows[i].Publication_Name };
        publication.push(pub);
      }
      console.log(publication);
      client.emit('onPubSubsSucess',publication);
    });
  }



  function evtHandlerOnRateIssues(type, name)
  {
    console.log('evtHandlerOnReadRateIssues');

    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
      console.log('Error connecting to Db');
      return;
      }
      console.log('Connection established');
    });

	if(type == 'Magazine')
	{
		con.query("SELECT * FROM subscription.magazine_subscription where Magazine_ID = ?" , name, function(err,rows){
		  if(err) throw err;
		  console.log(rows);
		  console.log('Data received from Db:\n');
		  var rate_Issues = [];

		  for(i=0; i<rows.length; i++)
		  {
			var rate = {Id: rows[i].Issue_ID, Name : rows[i].Rate + ' - ' + rows[i].No_of_Issue };
			rate_Issues.push(rate);
		  }
		  console.log(rate_Issues);
		  client.emit('onReadRateIssueSubsSucess',rate_Issues);
		});
	}
	else
	{
		  con.query("SELECT * FROM subscription.newspaper_subscription where NewsPaper_ID = ?" , name, function(err,rows){
		  if(err) throw err;
		  console.log(rows);
		  console.log('Data received from Db:\n');
		  var rate_Issues = [];

		  for(i=0; i<rows.length; i++)
		  {
			var rate = {Id: rows[i].Newspaper_Subscription_ID, Name : rows[i].Rate + ' - ' + rows[i].No_Of_Months };
			rate_Issues.push(rate);
		  }
		  console.log(rate_Issues);
		  client.emit('onReadRateIssueSubsSucess',rate_Issues);
		});

	}
  }



  function evtHandlerOnMagazineSub(data)
  {
    console.log('evtHandlerOnMagazineSub');
    console.log(data);
    //Create a connection to the db
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
      console.log('Error connecting to Db');
      return;
      }
      console.log('Connection established');
    });
    con.query('INSERT INTO subscription.subscription (Start_Date, End_Date, Type,  MagazineSubscription_ID, Cutomer_ID) VALUES (?,?,?,?,?) ', [data.Start_Date, data.End_Date, data.Type, data.MagazineSubscription_ID, data.Cutomer_ID], function(err,res){
        if(err) throw err;

        console.log('Last insert ID:', res.insertId);
    });
    client.emit('onSaveMagSubs');
  }

  function evtHandlerOnNewspaperSub(data)
  {
    console.log('evtHandlerOnNewspaperSub');
    console.log(data);
    //Create a connection to the db
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234"
    });

    con.connect(function(err){
      if(err){
      console.log('Error connecting to Db');
      return;
      }
      console.log('Connection established');
    });
    con.query('INSERT INTO subscription.subscription (Start_Date, End_Date, Type,  NewspaperSubscription_ID, Cutomer_ID) VALUES (?, ?, ?, ?, ?) ', [data.Start_Date, data.End_Date, data.Type, data.NewspaperSubscription_ID, data.Cutomer_ID], function(err,res){
        if(err) throw err;

        console.log('Last insert ID:', res.insertId);
    });
    client.emit('onSaveNewsSubs');
  }

}

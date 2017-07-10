declare variable $input-context external;

(:8th query:)

for $x in $input-context/site/open_auctions/open_auction
for $y in $x/bidder[personref/@person ='person3']
for $z in $x/bidder[personref/@person ='person6']
	let $dateperson3 := xs:dateTime(concat(concat(replace(string($y/date/text()),'(\d{2})/(\d{2})/(\d{4})','$3-$1-$2') , 'T'), concat(string($y/time/text()), '.0000000')))
	let $dateperson6 := xs:dateTime(concat(concat(replace(string($z/date/text()),'(\d{2})/(\d{2})/(\d{4})','$3-$1-$2') , 'T'), concat(string($z/time/text()), '.0000000')))
	where $dateperson3 < $dateperson6
	return 	
	('&#xA;',
	{$x/reserve},'&#xA;'
	 )
	
	
	
	
declare variable $input-context external;

(:3rd query:)
for $x in $input-context/site/people/person
	where $input-context/site/closed_auctions/closed_auction/buyer/@person = $x/@id
	return 
	('&#xA;',
	<person>{'&#xA;'}
	{$x/name}{'&#xA;'}
	<count>{count($input-context/site/closed_auctions/closed_auction[buyer/@person = $x/@id])}</count>{'&#xA;'}
	</person>,'&#xA;'
	 )
	

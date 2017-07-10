declare variable $input-context external;

(:6th query:)

for $x in $input-context/site/people/person
for $y in $input-context/site/regions/europe/item
for $z in $input-context/site/closed_auctions/closed_auction
	where $z/itemref/@item = $y/@id and
	$z/buyer/@person = $x/@id
	return
	('&#xA;',
	<personItem>{'&#xA;'}
	{$x/name}{'&#xA;'}
	{$y/name}{'&#xA;'}
	</personItem>,'&#xA;'
	 )
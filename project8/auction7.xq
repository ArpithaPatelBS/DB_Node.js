declare variable $input-context external;

(:7th query:)

for $x in $input-context/site/regions/*/item
	order by $x/name
	return 
	('&#xA;',
	<orderdList>{'&#xA;'}
	{$x/name}{'&#xA;'}
	{$x/location}{'&#xA;'}
	</orderdList>,'&#xA;'
	 )
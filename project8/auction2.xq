declare variable $input-context external;

(:2nd query:)

for $x in $input-context/site/regions/europe/item
	return 
	('&#xA;',
	<item>{'&#xA;'}
	{$x/name}{'&#xA;'}
	<description>{$x/description//text/text()}</description>{'&#xA;'}
	</item>,'&#xA;'
	)
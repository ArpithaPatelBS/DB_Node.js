declare variable $input-context external;

(:1st query for printing all the continent and count of their items:)

for $x in $input-context/site/regions/*
	let $y := count($x/item)
	return 
	('&#xA;',
	<continent>{'&#xA;'}
	<name>{$x/name()}</name>
	{'&#xA;'}<count>{$y}</count>{'&#xA;'}
	</continent>,'&#xA;'
	)
	

	

	
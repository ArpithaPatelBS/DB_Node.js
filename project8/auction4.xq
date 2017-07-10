declare variable $input-context external;

(:4th query:)

let $x := distinct-values($input-context/site/people/person/profile/interest/@category)

for $y in $x
	return 
	('&#xA;',
	<category>{'&#xA;'}
	<categoryName>{$y}</categoryName>{'&#xA;'}
	{$input-context/site/people/person/profile/interest[@category = $y]/../../name}{'&#xA;'}
	</category>,'&#xA;'
	 )
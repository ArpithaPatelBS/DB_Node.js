declare variable $input-context external;

(:5th query:)

let $x := distinct-values($input-context/site/people/person/profile/interest/@category)

for $y in $x
	return 
	('&#xA;',
	<category>{'&#xA;'}
	<categoryName>{$y}</categoryName>{'&#xA;'}
	<count>{count({$input-context/site/people/person/profile/interest[@category = $y]/../../name})}</count>{'&#xA;'}
	{$input-context/site/people/person/profile/interest[@category = $y]/../../name}{'&#xA;'}
	</category>,'&#xA;'
	 )
use subscription;

insert into customer values('1','aish','naik','419,summit avenue');
insert into customer values('2','arptiha ','patel','1006 greek row');
insert into customer values('3','nuthan','banad','1002,apt109 greek row');
insert into customer values('4','rekha','iyer','506,mat lock road');
select * from customer;

insert into publication values('1','ABC','Newspaper');
insert into publication values('2','BBC','Magazine');
insert into publication values('3','CCD','Magazine');

insert into magazine values('3333','Vogue', 2);
insert into magazine values('9999','Femina', 2);
insert into magazine values('1111','NY', 2);
insert into magazine values('8282','Victorias', 2);
insert into magazine values('10001','Blue','1');

insert into magazine values('3849','Business Affairs','1');

select * from magazine;

insert into newspaper values('1244','Times of India','1');

insert into newspaper values('9284','hindustan','1');
insert into newspaper values('4783','Star of Mysore','1');
insert into newspaper values('1575','Deccan','1');

insert into subscription.frequency values('1','weekly');
insert into subscription.frequency values('2','monthly');
insert into subscription.frequency values ('3','quarterly');
insert into subscription.frequency values('11','daily');
insert into subscription.frequency values('22','weekly');

/* issue id , rate , no of issue, magazine ID , frequency ID */
insert into subscription.magazine_subscription values('1','1','1','3333','1');
insert into subscription.magazine_subscription values('2','5','4','3333','2');
insert into subscription.magazine_subscription values('3','14','12','3333','3');
insert into subscription.magazine_subscription values('4','3','2','9999','1');
insert into subscription.magazine_subscription values('5','6','4','9999','2');
insert into subscription.magazine_subscription values('6','20','15','9999','3');
select * from subscription.magazine_subscription;

use subscription;
select magazine.magazine_ID, magazine.magazine_name, magazine_subscription.No_of_issue, magazine_subscription.rate,frequency.frequency_name
	from Magazine, magazine_subscription, frequency 
where magazine_subscription.frequency_ID = frequency.frequency_ID and magazine.magazine_ID = magazine_subscription.magazine_ID
and frequency.frequency_ID =1;

/*id, rate , no_of_months, newspaper ID , frequency ID*/
insert into subscription.newspaper_subscription values('1','5','6','1244','11');	
insert into subscription.newspaper_subscription values('2','10','12','1244','11');
insert into subscription.newspaper_subscription values('3','3','6','1244','22');
insert into subscription.newspaper_subscription values('4','9','12','1244','22');
insert into subscription.newspaper_subscription values('5','5','7','1575','11');	
insert into subscription.newspaper_subscription values('6','10','13','1575','11');
insert into subscription.newspaper_subscription values('7','3','7','1575','22');
insert into subscription.newspaper_subscription values('8','9','13','1575','22');
insert into subscription.newspaper_subscription values('9','25','24','4783','11');

	select * from subscription.newspaper_subscription;
use subscription;
select newspaper.newspaper_ID, newspaper.newspaper_name, newspaper_subscription.no_of_months, newspaper_subscription.rate,frequency.frequency_name
from newspaper, newspaper_subscription, frequency 
where newspaper_subscription.frequency_ID = frequency.frequency_ID and newspaper.newspaper_ID = newspaper_subscription.newspaper_ID
and frequency.frequency_ID =11;


/*id, start date , end date, type, newspaper_subscription_ID, Magazine_subscription_ID, Customer_ID*/
select * from subscription.subscription ;
insert into subscription.subscription values('1','2016-01-02','2016-07-02','Newspaper','3',null,'1');
insert into subscription.subscription values('2','2016-01-02','2016-07-02','Magazine',null,'2','1');
insert into subscription.subscription values('3','2016-01-03','2017-01-03','Magazine',null,'3','2');
insert into subscription.subscription values ('4','2016-01-03','2017-01-03','Newspaper','4',null,'1');
insert into subscription.subscription values ('5','2016-01-03','2017-01-03','Magazine',null,'3','1');
insert into subscription.subscription values ('6','2017-04-04','2018-04-04','Newspaper','4',null,'3');
insert into subscription.subscription value('7','2017-04-04','2018-04-04','Magazine',null,'6','4');

/*Customer name, mag name, mag rate, subscription id, sub type, newspaper name*/
select c.customer_ID, c.initial_name , ms.rate as Rate, s.Sub_ID, s.type, m.Magazine_Name  as 'Mag/News_name'
from subscription s Inner join customer c on c.customer_id = s.cutomer_id inner join 
 magazine_subscription ms on s.magazineSubscription_ID = ms.issue_ID inner join
 magazine m  on  m.magazine_ID  =ms.magazine_ID
 Union All
 select c.customer_ID, c.initial_name, ns.rate as Rate, s.Sub_ID, s.type, n.Newspaper_Name as 'Mag/News_name'
from subscription s Inner join customer c on c.customer_id = s.cutomer_id inner join 
 newspaper_subscription ns on s.newspaperSubscription_ID = ns.Newspaper_Subscription_Id inner join
 newspaper n  on  n.newspaper_ID  = ns.newspaper_ID;

	
select * from subscription.subscription;


select * from subscription.magazine_subscription;

select m.magazine_ID,m.magazine_name, m.publication_ID, ms.Rate
from subscription.magazine m left outer join subscription.magazine_subscription ms
on m.magazine_ID  = ms.magazine_ID;

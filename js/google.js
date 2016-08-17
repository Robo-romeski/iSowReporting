var clientID = '441218693967-9fbqgkh8lje9sc6vc2jjqv7k6kl98lh0.apps.googleusercontent.com';
var clientSecret = 'nZ9dTiUn-4GnhNZ0u2hF4KXY';
//var clientID = '713839929502-4sh9blknc5ke9i3u82k0ge5h74dgt39b.apps.googleusercontent.com';
var accountID = '62603619';
var webPropertyID = 'UA-62603619-1';
var profileID = 'ga:101815060';

$.ajax({
	url: 'https://www.googleapis.com/analytics/v3/data/ga',
	type: 'GET',
	dataType: 'json',
	data: {'ids': profileID,
		    'client_secret': clientSecret,
		    'client_id': clientID,
		   'start-date': '30daysAgo',
		   'end-date': 'yesterday',
		   'metrics': 'ga:sessions'},
})
.done(function() {
	console.log("success");
})
.fail(function() {
	console.log("error");
})
.always(function() {
	console.log("complete");
});

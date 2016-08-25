
  // Replace with your client ID from the developer console.
  var CLIENT_ID = '713839929502-4sh9blknc5ke9i3u82k0ge5h74dgt39b.apps.googleusercontent.com';

  // Set authorized scope.
  var SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];


  function authorize(event) {
    // Handles the authorization flow.
    // `immediate` should be false when invoked from the button click.
    var useImmdiate = event ? false : true;
    var authData = {
      client_id: CLIENT_ID,
      scope: SCOPES,
      immediate: useImmdiate
    };

    gapi.auth.authorize(authData, function(response) {
      var authButton = document.getElementById('auth-button');
      if (response.error) {
        authButton.hidden = false;
      }
      else {
        authButton.hidden = true;
        queryAccounts();
      }
    });
  }


function queryAccounts() {
  // Load the Google Analytics client library.
  gapi.client.load('analytics', 'v3').then(function() {

    // Get a list of all Google Analytics accounts for this user
    gapi.client.analytics.management.accounts.list().then(handleAccounts);
  });
}


function handleAccounts(response) {
  // Handles the response from the accounts list method.
  if (response.result.items && response.result.items.length) {
    // Get the first Google Analytics account.
    var firstAccountId = response.result.items[0].id;

    // Query for properties.
    queryProperties(firstAccountId);
  } else {
    console.log('No accounts found for this user.');
  }
}


function queryProperties(accountId) {
  // Get a list of all the properties for the account.
  gapi.client.analytics.management.webproperties.list(
      {'accountId': accountId})
    .then(handleProperties)
    .then(null, function(err) {
      // Log any errors.
      console.log(err);
  });
}


function handleProperties(response) {
  // Handles the response from the webproperties list method.
  if (response.result.items && response.result.items.length) {

    // Get the first Google Analytics account
    var firstAccountId = response.result.items[0].accountId;

    // Get the first property ID
    var firstPropertyId = response.result.items[0].id;

    // Query for Views (Profiles).
    queryProfiles(firstAccountId, firstPropertyId);
  } else {
    console.log('No properties found for this user.');
  }
}


function queryProfiles(accountId, propertyId) {
  // Get a list of all Views (Profiles) for the first property
  // of the first Account.
  gapi.client.analytics.management.profiles.list({
      'accountId': accountId,
      'webPropertyId': propertyId
  })
  .then(handleProfiles)
  .then(null, function(err) {
      // Log any errors.
      console.log(err);
  });
}


function handleProfiles(response) {
  // Handles the response from the profiles list method.
  if (response.result.items && response.result.items.length) {
    // Get the first View (Profile) ID.
    var firstProfileId = response.result.items[0].id;

    // Query the Core Reporting API.
    queryCoreReportingApi(firstProfileId);
  } else {
    console.log('No views (profiles) found for this user.');
  }
}


function queryCoreReportingApi(profileId) {
  // Query the Core Reporting API for the number sessions for
  // the past seven days.
  gapi.client.analytics.data.ga.get({
    'ids': 'ga:' + profileId,
    'start-date': '7daysAgo',
    'end-date': 'today',
    'metrics': 'ga:sessions,ga:bounceRate,ga:pageviews,ga:sessionDuration'
  })
  .then(function(response) {
    var formattedJson = JSON.stringify(response.result, null, 1);
    console.log(formattedJson);
    
    var returnHTML = '<ul class="bullets">';
    returnHTML+= '<li>'+response.result.itemsPerPage+'</li>';
    returnHTML+= ''
    document.getElementById('query-output').value = returnHTML;
    document.getElementById('query-output-graph').innerHTML = returnHTML;
    document.getElementById('query-output-json').value = formattedJson;
  })
  .then(null, function(err) {
      // Log any errors.
      console.log(err);
  });
}

  // Add an event listener to the 'auth-button'.
  document.getElementById('auth-button').addEventListener('click', authorize);

// var clientID = '441218693967-9fbqgkh8lje9sc6vc2jjqv7k6kl98lh0.apps.googleusercontent.com';
// var clientSecret = 'nZ9dTiUn-4GnhNZ0u2hF4KXY';
// //var clientID = '713839929502-4sh9blknc5ke9i3u82k0ge5h74dgt39b.apps.googleusercontent.com';
// var accountID = '62603619';
// var webPropertyID = 'UA-62603619-1';
// var profileID = 'ga:101815060';

// $.ajax({
// 	url: 'https://www.googleapis.com/analytics/v3/data/ga',
// 	type: 'GET',
// 	dataType: 'json',
// 	data: {'ids': profileID,
// 		    'client_secret': clientSecret,
// 		    'client_id': clientID,
// 		   'start-date': '30daysAgo',
// 		   'end-date': 'yesterday',
// 		   'metrics': 'ga:sessions'},
// })
// .done(function() {
// 	console.log("success");
// })
// .fail(function() {
// 	console.log("error");
// })
// .always(function() {
// 	console.log("complete");
// });

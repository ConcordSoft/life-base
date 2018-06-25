var SquareConnect = require('square-connect');
const uuidv1 = require('uuid/v1');

var defaultClient = SquareConnect.ApiClient.instance;
// Configure OAuth2 access token for authorization: oauth2
var oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = "sandbox-sq0atb-YCmntKY3_kDKINNmsKR62w";

var apiInstance = new SquareConnect.TransactionsApi();

var locationId = "CBASEBwWYd6HEeyabxfQdHQZ3S8gAQ"; // String | The ID of the location to associate the created transaction with.

exports.charge = function(req, res, next){
    var reqBody = req.body;
    var body = new SquareConnect.ChargeRequest(uuidv1(), reqBody.amount * 100); // ChargeRequest | An object containing the fields to POST for the request.  See the corresponding object definition for field details.
    body.card_nonce = reqBody.card_nonce;

    apiInstance.charge(locationId, body).then(function(data) {
        console.log('API called successfully. Returned data: ' + data);
    }, function(error) {
        console.error(error);
    });
}


var SquareConnect = require('square-connect');
const uuidv1 = require('uuid/v1');
var Q = require('q');

var defaultClient = SquareConnect.ApiClient.instance;
// Configure OAuth2 access token for authorization: oauth2
var oauth2 = defaultClient.authentications['oauth2'];
oauth2.accessToken = "sandbox-sq0atb-YCmntKY3_kDKINNmsKR62w";

var apiInstance = new SquareConnect.TransactionsApi();

var locationId = "CBASEBwWYd6HEeyabxfQdHQZ3S8gAQ"; // String | The ID of the location to associate the created transaction with.

/**
 * Charge for course
 * @param {*} card_nonce
 * @param {*} amount
 */
exports.charge = function(card_nonce, amount){
    var deferred = Q.defer();

    var body = new SquareConnect.ChargeRequest(uuidv1(), {amount: amount * 100, currency: "USD"}); // ChargeRequest | An object containing the fields to POST for the request.  See the corresponding object definition for field details.
    body.card_nonce = card_nonce;

    console.log('returned body is ', body);

    console.log(body.amount_money + ' is money');

    console.log('in charge payment manager before api charge');
    apiInstance.charge(locationId, body).then(function(data) {
        console.log('API called successfully. Returned data: ' + data);
        deferred.resolve(data);
    }, function(error) {
        deferred.reject(error('MONGO_ERROR'));
    });

    return deferred.promise;
}


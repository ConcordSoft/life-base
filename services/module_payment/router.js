var controller = require('./controller');
var express = require('express');
var auth = require('../../middleware/authMiddleware');
var router = express.Router();

/**
 * @api {post} /payment/user/{userId}/charge
 * Charge Course
 * @apiVersion 1.0.0
 * @apiName Charge Course
 * @apiGroup Payment
 * @apiDescription Charge user credit card for course amount
 *
 * @apiParam (path){String} userId Id of the logged user
 * 
 * @apiParam (body){String} card_nonce Payment card nonce
 * @apiParam (body){Number} amount Payment amount
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse badRequest
 * @apiUse notAllowed
 */
router.post('/user/:userId/charge', auth.checkUserToken, controller.charge);

logger.info('loaded PAYMENT routes');

module.exports = router;
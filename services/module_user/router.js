var controller = require('./controller');
var express = require('express');
var auth = require('../../middleware/authMiddleware');
var router = express.Router();

/**
 * @api {post} /user/register
 * Register
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup User
 * @apiDescription Register new user
 *
 * @apiParam (body){String} em User email
 * @apiParam (body){String} pw User password
 * @apiParam (body){String} fn User firstname
 * @apiParam (body){String} ln User last name
 *
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
        {
            fn: 'Jelena',
            ln: 'Ivezic',
            em: 'email@yahoo.com',
            _id: 5a609d2e0b945d3c86dad7aa,
        }
 *
 * @apiUse internalError
 * @apiUse alreadyRegistered
 * @apiUse badRequest
 */
router.post('/register', controller.register);

/**
 * @api {post} /user/login
 * Login
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup User
 * @apiDescription User login - if email and password are valid get user data and token
 *
 * @apiParam (body){String} em User email
 * @apiParam (body){String} pw User password
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
        {
            token: 'eyJ0eXZX......',
            client: {
                _id: '5a607c4ff99d12171236264e',
                fn: 'Jelena',
                ln: 'Ivezic',
                em: 'jj_ivezic@yahoo.com',
                pw: undefined
            }
        }
 *
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse invalidCredentials
 */
router.post('/login', controller.login);

/**
 * @api {post} /user/{userId}/checkCourse
 * Add Course To User
 * @apiVersion 1.0.0
 * @apiName Check If Payed
 * @apiGroup User
 * @apiDescription Check if user payed for the selected course
 *
 * @apiParam (body){String} courseName Name of the course
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse badRequest
 * @apiUse notAllowed
 */
router.post('/:userId/addCourse', auth.checkUserToken, controller.addCourse);

/**
 * @api {post} /user/{userId}/checkCourse
 * Check If Payed
 * @apiVersion 1.0.0
 * @apiName Check If Payed
 * @apiGroup User
 * @apiDescription Check if user payed for the selected course
 *
 * @apiParam (body){String} courseName Name of the course
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200
 *
 * @apiUse internalError
 * @apiUse notFound
 * @apiUse badRequest
 */
router.post('/:userId/checkCourse', auth.checkUserToken, controller.checkCourse);

logger.info('loaded USER routes');

module.exports = router;
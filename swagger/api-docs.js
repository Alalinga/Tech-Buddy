/**
 * @swagger
 *  components:
 *     schemas:
 *       user:
 *          type: object
 *          required:
 *             -username
 *             -email
 *             -password
 *          properties:
 *             _id:
 *                 type: string
 *                 description: autogenerated id of the user
 *             username:
 *                 type: string
 *                 description: user name
 *             email:
 *                 type: string
 *                 description: user email
 *             password:
 *                 type: string
 *                 description: user password must be at least 8 characters
 *             re-password:
 *                 type: string
 *                 description: repeat password, must be equal to user password input
 *       videos:
 *            type: object
 *            properties:
 *                _id:
 *                   type: string
 *                   description: autogenerated id
 *                name:
 *                   type: string
 *                   description: name  of the video from cloudinary
 *                cloundinary_key:
 *                   type: string
 *                   description: the path(including the name of the video) to the video from cloudinary
 *                path:
 *                   type: string
 *                   description: the path to the video(without the name) from cloudinary
 *                url:
 *                   type: string
 *                   description: A secure url of the video
 *                description:
 *                   type: string
 *                   description: description of the video
 *                date:
 *                   type: Date
 *                   description: autogenerate default date
 *
 *       images:
 *            type: object
 *            properties:
 *                _id:
 *                   type: string
 *                   description: autogenerated id
 *                name:
 *                   type: string
 *                   description: name  of the image from cloudinary
 *                cloundinary_key:
 *                   type: string
 *                   description: the path(including the name of the image) to the image from cloudinary
 *                path:
 *                   type: string
 *                   description: the path to the image (without the name) from cloudinary
 *                url:
 *                   type: string
 *                   description: A secure url of the image
 *                description:
 *                   type: string
 *                   description: description of the image
 *                date:
 *                   type: Date
 *                   description: autogenerated default date

 */



/**
* @swagger
* tags:
*   name: Users
*   description: Assets (videos and images ) upload managing  API
*/


/**
 * @swagger
 * /api/create-accounts/:
 *     post:
 *       summary: user accounts creation
 *       tags: [Users]
 *       requestBody:
 *             required: true
 *             content:
 *                application/json:
 *                      schema:
 *                         $ref: '#components/schemas/user'
 *
 *       responses:
 *          200:
 *             description:  accounts created succesfully
 *             content:
 *                application/json:
 *                     schema:
 *                       $ref: '#components/schemas/user'
 *          503:
 *            description: user could not be created
 *          500:
 *            description: There was a server error
 */

/**
 * @swagger
 * /api/login/:
 *     post:
 *       summary: user  authentication
 *       tags: [Users]
 *       requestBody:
 *             required: true
 *             content:
 *                application/json:
 *                      schema:
 *                         type: object
 *                         required:
 *                           - email
 *                           - password
 *                         name: email
 *                         description: user email used to register accounts
 *                         properties:
 *                            email:
 *                              type: string
 *                              description: user email
 *                            password:
 *                              type: string
 *                              description: user password
 *
 *       responses:
 *          200:
 *             description: Login succesfully
 *             content:
 *                application/json:
 *                     schema:
 *                       $ref: '#components/schemas/user'
 *          401:
 *            description: Unauthorized user
 *          503:
 *            description: user could not be created
 *          500:
 *            description: There was a server error
 */


/**
 * @swagger
 * /api/videos/:
 *     post:
 *       summary: upload video(s) to cloudinary
 *       tags: [Users]
 *       requestBody:
 *             required: true
 *             content:
 *                multipart/form-data:
 *                      schema:
 *                         type: object
 *                         required:
 *                           - video
 *                         name: video
 *                         properties:
 *                            video:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  format: binary
 *                              description: select video(s) to upload
 *                            description:
 *                                type: string
 *                                description: description of the videos
 *
 *       responses:
 *          200:
 *             description: video(s) uploaded succesfully
 *             content:
 *                application/json:
 *                     schema:
 *                       $ref: '#components/schemas/videos'
 *          401:
 *            description: Unauthorized user
 *
 *          503:
 *            description: video(s) could not be uploaded
 *          500:
 *            description: There was a server error
 */

/**
 * @swagger
 * /api/images/:
 *     post:
 *       summary: upload image(s) to cloudinary
 *       tags: [Users]
 *       requestBody:
 *             required: true
 *             content:
 *                multipart/form-data:
 *                      schema:
 *                         type: object
 *                         required:
 *                           - image
 *                         name: image
 *                         properties:
 *                            image:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  format: binary
 *                              description: select image(s) to upload
 *                            description:
 *                              type: string
 *                              description: description of the image

 *
 *       responses:
 *          201:
 *             description: images(s) uploaded succesfully
 *             content:
 *                application/json:
 *                     schema:
 *                       $ref: '#components/schemas/images'
 *          401:
 *            description: Unauthorized user
 *
 *          503:
 *            description: images(s) could not be uploaded
 *          500:
 *            description: There was a server error
 */


/**
 * @swagger
 * /api/videos/:
 *     get:
 *       summary: returns list of all videos uploaded to cloudinary
 *       tags: [Users]
 *
 *       responses:
 *          201:
 *             description: fetched all videos from server
 *             content:
 *                application/json:
 *                     schema:
 *                       $ref: '#components/schemas/videos'
 *
 *          401:
 *            description: Unauthorized user
 *
 *          503:
 *            description: could not fetch videos from server
 *          500:
 *            description: There was a server error
 */

/**
 * @swagger
 * /api/images/:
 *     get:
 *       summary: returns list of all images uploaded to cloudinary
 *       tags: [Users]
 *
 *       responses:
 *          200:
 *             description: fetched all images from server
 *             content:
 *                application/json:
 *                     schema:
 *                       $ref: '#components/schemas/images'
 *          401:
 *            description: Unauthorized user
 *
 *          503:
 *            description: could not fetch images from server
 *          500:
 *            description: There was a server error
 */


/**
 * @swagger
 * /api/videos/{name}:
 *     get:
 *       summary: get video by name from the server
 *       tags: [Users]
 *       parameters:
 *           - name: name
 *             in: path
 *             description: name of video
 *             required: true
 *             schema:
 *                type: string
 *
 *
 *       responses:
 *          200:
 *             description: successfully fetched video by name
*             content:
 *                application/json:
 *                     schema:
 *                       $ref: '#components/schemas/images'
 * 
 *          401:
 *            description: Unauthorized user
 *
 *          404:
 *            description: the video was not found
 * 
 *          500:
 *            description: There was a server error
 */


/**
 * @swagger
 * /api/images/{name}:
 *     get:
 *       summary: get image by name from the server
 *       tags: [Users]
 *       parameters:
 *           - name: name
 *             in: path
 *             description: name of image
 *             required: true
 *             schema:
 *                type: string
 *
 *       responses:
 *          200:
 *             description: successfully fetched image by name
 *             content:
 *                application/json:
 *                     schema:
 *                       $ref: '#components/schemas/images'
 *
 *          401:
 *            description: Unauthorized user
 *
 *          404:
 *            description: the image was not found
 *          500:
 *            description: There was a server error
 */



/**
 * @swagger
 * /api/videos/{name}:
 *     delete:
 *       summary: deletes video from server by name
 *       tags: [Users]
 *       parameters:
 *           - name: name
 *             in: path
 *             description: name of video
 *             required: true
 *             schema:
 *                type: string
 *
 *       responses:
 *          200:
 *             description: video deleted successfully
 *          401:
 *            description: Unauthorized user
 *
 *          404:
 *            description: video was not found
 *          500:
 *            description: There was a server error
 */


/**
 * @swagger
 * /api/images/{name}:
 *     delete:
 *       summary: deletes image from server by name
 *       tags: [Users]
 *       parameters:
 *           - name: name
 *             in: path
 *             description: name of image
 *             required: true
 *             schema:
 *                type: string
 *
 *       responses:
 *
 *          200:
 *             description: image deleted successfully
 *
 *          401:
 *            description: Unauthorized user
 *
 *          404:
 *            description: image was not found
 *          500:
 *            description: There was a server error
 */
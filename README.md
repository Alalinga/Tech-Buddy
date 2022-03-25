# Tech-Buddy

Is an application program interface (API) that  allow User to
upload and download assets (images and videos) to and from a content management platform (Cloudinary) respectively. It also includes authentication feature, hence users must register accounts and login before they can perform any operation.


## Features
* User registration
* User authentication
* Upload single or multiple video and image files to cloudinary
* Retrieve videos and Images from cloudinary
* Delete videos and images for cloudinary

## Technologies
*  nodejs/express
*  JavaScript

## install and run the app
 Simply clone the project from github and while in the project folder open a command line and 
run `npm install express` to install express. After you successfully install express, run `npm start` to start the app. The default port is 5000.

## Run test
The test code is located inside the test folder
Run `npm test` to execute the test

# The following are the API end points

NOTE: Postman api client is recommended

## Create accounts

### Request

`POST /api/create-accounts`

http://localhost:5000/api/create-accounts

`example data {'email': 'member23@gmail.com', 'password': 'member23','username': 'member23'}`

### Response

    Date: Fri, 25 Mar 2022 03:46:05 GMT
    Connection: keep-alive
    Content-Type: application/json
    Status: 201 created
    
    {
    "user": "member23"
    }


## Login

### Request

`POST /api/Login`

http://localhost:5000/api/Login

`example data {'email': 'member23@gmail.com', 'password': 'member23'}`

### Response

    Date: Fri, 25 Mar 2022 03:46:05 GMT
    Connection: keep-alive
    Content-Type: application/json
    Status: 200 ok
    
    {
    "isAuthenticated": true
    }

## Upload Videos

### Request
  `POST  api/videos`
  http://localhost:5000/api/videos

  
### Response

    Date: Fri, 25 Mar 2022 03:46:05 GMT
    Connection: keep-alive
    Content-Type: application/json
    Status: 201 created

    {
        "response": [
            {
                "name": "zpnyihkxp0mlkq8ko3ft",
                "url": "https://res.cloudinary.com/dg4rf5mvl/    video/upload/v1648178893/techBuddy/member23/    videos/zpnyihkxp0mlkq8ko3ft.mp4",
                "cloudinary_key": "techBuddy/member23/videos/    zpnyihkxp0mlkq8ko3ft",
                "path": "techBuddy/member23/videos",
                "_id": "623d36ce220046664888f4de",
                "date": "2022-03-25T03:28:14.741Z"
            },
            {
                "name": "urr2nt94cctcetgmpg9p",
                "url": "https://res.cloudinary.com/dg4rf5mvl/    video/upload/v1648178924/techBuddy/member23/    videos/urr2nt94cctcetgmpg9p.mkv",
                "cloudinary_key": "techBuddy/member23/videos/    urr2nt94cctcetgmpg9p",
                "path": "techBuddy/member23/videos",
                "_id": "623d36ee220046664888f4e1",
                "date": "2022-03-25T03:28:46.210Z"
            }
        ],
        "message": "Successfully uploaded 2 video(s)"
    }
    


## GET Videos

### Request
  `GET  api/videos`
  http://localhost:5000/api/videos

  
### Response

    Date: Fri, 25 Mar 2022 03:46:05 GMT
    Connection: keep-alive
    Content-Type: application/json
    Status: 200 ok

    {
        "response": [
            {
                "name": "zpnyihkxp0mlkq8ko3ft",
                "url": "https://res.cloudinary.com/dg4rf5mvl/    video/upload/v1648178893/techBuddy/member23/    videos/zpnyihkxp0mlkq8ko3ft.mp4",
                "cloudinary_key": "techBuddy/member23/videos/    zpnyihkxp0mlkq8ko3ft",
                "path": "techBuddy/member23/videos",
                "_id": "623d36ce220046664888f4de",
                "date": "2022-03-25T03:28:14.741Z"
            },
            {
                "name": "urr2nt94cctcetgmpg9p",
                "url": "https://res.cloudinary.com/dg4rf5mvl/    video/upload/v1648178924/techBuddy/member23/    videos/urr2nt94cctcetgmpg9p.mkv",
                "cloudinary_key": "techBuddy/member23/videos/    urr2nt94cctcetgmpg9p",
                "path": "techBuddy/member23/videos",
                "_id": "623d36ee220046664888f4e1",
                "date": "2022-03-25T03:28:46.210Z"
            }
        ]
    }


## Delete Video

### Request
  `DELETE  api/videos/:name`
  http://localhost:5000/api/videos/iurpdc3t1ojewelu9hgn

  
### Response

    Date: Fri, 25 Mar 2022 03:46:05 GMT
    Connection: keep-alive
    Content-Type: application/json
    Status: 200 ok

    {
        "success": "Successfully deleted video with name     iurpdc3t1ojewelu9hgn"
    }





## Upload Images

### Request
  `POST  api/images`
  http://localhost:5000/api/images

  
### Response

    Date: Fri, 25 Mar 2022 03:46:05 GMT
    Connection: keep-alive
    Content-Type: application/json
    Status: 201 created

    {
        "response": [
            {
                "name": "zpnyihkxp0mlkq8ko3ft",
                "url": "https://res.cloudinary.com/dg4rf5mvl/    video/upload/v1648178893/techBuddy/member23/    videos/zpnyihkxp0mlkq8ko3ft.png",
                "cloudinary_key": "techBuddy/member23/images/    zpnyihkxp0mlkq8ko3ft",
                "path": "techBuddy/member23/images",
                "_id": "623d36ce220046664888f4de",
                "date": "2022-03-25T03:28:14.741Z"
            },
            {
                "name": "urr2nt94cctcetgmpg9p",
                "url": "https://res.cloudinary.com/dg4rf5mvl/    video/upload/v1648178924/techBuddy/member23/    images/urr2nt94cctcetgmpg9p.mkv",
                "cloudinary_key": "techBuddy/member23/images/    urr2nt94cctcetgmpg9p",
                "path": "techBuddy/member23/images",
                "_id": "623d36ee220046664888f4e1",
                "date": "2022-03-25T03:28:46.210Z"
            }
        ],
        "message": "Successfully uploaded 2 images(s)"
    }



## GET Images

### Request
  `GET  api/images`
  http://localhost:5000/api/images

  
### Response

    Date: Fri, 25 Mar 2022 03:46:05 GMT
    Connection: keep-alive
    Content-Type: application/json
    Status: 200 ok

    {
        "response": [
            {
                "name": "zpnyihkxp0mlkq8ko3ft",
                "url": "https://res.cloudinary.com/dg4rf5mvl/    video/upload/v1648178893/techBuddy/member23/    images/zpnyihkxp0mlkq8ko3ft.png",
                "cloudinary_key": "techBuddy/member23/images/    zpnyihkxp0mlkq8ko3ft",
                "path": "techBuddy/member23/images",
                "_id": "623d36ce220046664888f4de",
                "date": "2022-03-25T03:28:14.741Z"
            },
            {
                "name": "urr2nt94cctcetgmpg9p",
                "url": "https://res.cloudinary.com/dg4rf5mvl/    images/upload/v1648178924/techBuddy/member23/    videos/urr2nt94cctcetgmpg9p.png",
                "cloudinary_key": "techBuddy/member23/images/    urr2nt94cctcetgmpg9p",
                "path": "techBuddy/member23/images",
                "_id": "623d36ee220046664888f4e1",
                "date": "2022-03-25T03:28:46.210Z"
            }
        ]
    }


## Delete Images

### Request
  `DELETE  api/images/:name`
  http://localhost:5000/api/images/iurpdc3t1ojewelu9hgn

  
### Response

    Date: Fri, 25 Mar 2022 03:46:05 GMT
    Connection: keep-alive
    Content-Type: application/json
    Status: 200 ok

    {
    "success": "Successfully deleted image with name iurpdc3t1ojewelu9hgn"
    }



# Elsevier Exercise 2016

## Overview
This application was created for a coding exercise by Elsevier, using the JSON graph provided in `app/data` and deployed on [Amazon AWS](https://aws.amazon.com/).

__Features:__

- A display of all the product titles.
- The ability to search for a product based on product title.
- Sort products alphabetically or by date of publication.


## Code Structure
This [Angular](https://angularjs.org/) app uses an [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) design pattern.

__File structure:__
- `bower.json`: contains the dependencies of the application.

- `package.json`: contains the commands that `npm` needs to do prior to running in development mode.

- `bower_components`: is the folder generated after the commands `npm install` or `npm start` are run. It contains all dependencies of the application.

- `app/index.html` :  is the View of the application. (For future expansion use [angular multiple views](https://docs.angularjs.org/tutorial/step_09) to allow the dynamic changing of the pages).

- `app/data` : is the folder representing the Model of the application, and contains the data which is used.

- `app/js` : is the folder containing all javascript files developed for this application.

- `app/js/services`: contains the services that receive data from: APIS, files, other URLS etc. We use the `services.js` to call [ELSIO-Graph-Example](https://github.com/ltatakis/ElsevierExercise/blob/master/app/data/ELSIO-Graph-Example.json).

- `app/js/controllers`: contains the application Controllers.

	
## Running


### Deployment on AWS using Tomcat 8.

Currently, this code is deployed using [Tomcat 8](https://tomcat.apache.org/download-80.cgi).
For the deployment of this application, we copy the app folder into the webapps section of the tomcat.
We start the tomcat server by running `./catalina.sh start` found in the `tomcat/bin` folder.
Given the setup of the server and the ports chosen the app will appear at: `http://example.com:port/app`

Notes: There might be issues with the application not finding the data file, defined in `app/data`, we show how to deal with this in section [deploy code](https://github.com/ltatakis/ElsevierExercise#deploy-code).

#### IP table
Allow incoming calls to AWS instance:
```
iptables -A INPUT -p tcp --dport 80 -m state --state NEW,ESTABLISHED -j ACCEPT
```
This also needs to be reflected in AWS : Security Groups -> Inbound Traffic.
Ports recommended to keep open are: 80 (HTTP), 8080 (Custom TPC) and 22 (SSH).

#### Download tomcat and github code

```
wget http://apache.forthnet.gr/tomcat/tomcat-8/v8.5.9/bin/apache-tomcat-8.5.9.tar.gz
tar -xvf apache-tomcat-8.5.9.tar.gz

git clone https://github.com/ltatakis/ElsevierExercise.git
````
We also add the dependencies of the application, by running `npm install` in the ElsevierExercise parent directory.

#### Move app code to webapps

```
mv ElsevierExercise/app apache-tomcat-8.5.9/webapps/.
mv ElsevierExercise/bower_components/ apache-tomcat-8.5.9/webapps/app/.
```

#### Deploy code

```
cd apache-tomcat-8.5.9/bin/
./catalina.sh start
```
We see that the code does not work correctly giving `Failed to load resource: the server responded with a status of 404 ()` exception. So we go to `/webapps/app/js` and change `services/services.js` to 

```javascript
var jsonService = angular.module('jsonService', ['ngResource'])
    .factory('jsonService', function ($resource) {
        // This url might need changing for deployment
                        return $resource('/app/data/ELSIO-Graph-Example.json', {}, {
                   query: {method:'GET'}
        });
    });
```
and then start tomcat server again.

The result can be found on: http://35.162.28.152/app/

### Development mode using Node.js.

To run and test the following application:

1) You run `npm install` to retrieve all dependencies in the parent directory (where package.json and bower.json live).

2) Then we need to copy the dependency file generated into the `app` folder (todo this should be done automatically).

3) To run development run `npm start` in parent directory, and it will appear at `http://localhost:8000/index.html`


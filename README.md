# Elsevier Exercise 2016

## Overview
This application was created for a code exercise by Elsevier, using the JSON graph provided in `app/data` and deployed on [Amazon AWS](https://aws.amazon.com/).

__Features:__

- A display of all the product titles.
- The ability to search for a product based on product title
- Sort products alphabetically or by date of publication.

## Running


### Deployment on AWS using Tomcat 8.

Currently, this code is deployed using [Tomcat 8](https://tomcat.apache.org/download-80.cgi).
For the deployment of this application, we copy the app folder into the webapps section of the tomcat.
We start the tomcat server by running `./catalina.sh start` found in the `tomcat/bin` folder.
Given the setup of the server and the ports chosen the app will appear at: `http://example.com:port/app`

Notes: There might be issues with the application not finding the data file, defined in `js/services/services.js` due to the nature of thi deployment. 

### TODO add the code needed to be added for the release to aws

#### IP table
Allow incoming calls to AWS instance:
```
iptables -A INPUT -p tcp --dport 80 -m state --state NEW,ESTABLISHED -j ACCEPT
```
This also needs to be reflected in AWS : Security Groups -> Inbound Traffic.
Ports recommended to keep are: 80 (HTTP), 8080 (Custom TPC) and 22 (SSH).

#### Download tomcat and github code

```
wget http://apache.forthnet.gr/tomcat/tomcat-8/v8.5.9/bin/apache-tomcat-8.5.9.tar.gz
tar -xvf apache-tomcat-8.5.9.tar.gz

git clone https://github.com/ltatakis/ElsevierExercise.git
````
We also need to add the dependencies file by running `npm install` in the ElsevierExercise directory.

#### Move app code to webapps

```
mv ElsevierExercise/app apache-tomcat-8.5.9/webapps/.
mv ElsevierExercise/bower_components/ apache-tomcat-8.5.9/webapps/app/.
```

#### Start code and check

```
cd apache-tomcat-8.5.9/bin/
./catalina.sh start
```
We see that the code does not work correctly giving `Failed to load resource: the server responded with a status of 404 ()` exception. So we go into `cd ../webapps/app/js` and change `/webapps/app/js/services/services.js` to 

```
var jsonService = angular.module('jsonService', ['ngResource'])
    .factory('jsonService', function ($resource) {
        // This url might need changing for deployment
                        return $resource('/app/data/ELSIO-Graph-Example.json', {}, {
                   query: {method:'GET'}
        });
    });
```
and start tomcat server again.

### Development mode using Node.js.

To run and test the following application:

1) You run npm to install all dependencies and run in development mode.

2) To retrieve all dependencies run `npm install` in the parent directory (where package.json and bower.json live).

3) Then you need to copy the dependency file generated into the app folder (todo this should be done automatically).

4) To run development run `npm start` in parent directory, and it will appear at `http://localhost:8000/index.html`

## Code Structure
This [Angular](https://angularjs.org/) app uses an [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) design pattern.

__File structure:__
- `bower.json`: Contains the dependencies of the application.

- `package.json`: Contains the commands that `npm` needs to do prior to running in development mode.

- `bower_components`: The folder generated after the commands `npm install` or `npm start` are run. It contains all dependencies of the application.

- `app/index.html` : Starting page of the application, the View of the application. For future expansion use [angular multiple views](https://docs.angularjs.org/tutorial/step_09) to allow the dynamic changing of the pages.

- `app/data` : This folder represents the Model of the application. It contains the data that are used in the application.

- `app/js` : The folder containing all javascript files we develop for this application.

- `app/js/services`: Contains the services that receive data from: APIS, files, other URLS etc. We use the `services.js` to call [ELSIO-Graph-Example](https://github.com/ltatakis/ElsevierExercise/blob/master/app/data/ELSIO-Graph-Example.json)

- `app/js/controllers`: This folder contains the Controllers of the application.

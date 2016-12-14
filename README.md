## What is this
This application was created for a code exercise by Elsevier, using the JSON graph provided in `app/data`.

__Features:__

- A display of all the product titles.
- The ability to search for a product based on product title
- Sort products alphabetically or by date of publication.

## Running


### Deployment

Currently, this code is deployed using tomcat 8.
For the deployment of this application, we simply copy the app folder into the webapps section of the tomcat.
We start the tomcat server by running `./catalina.sh start` found in the `tomcat/bin` folder.
Given the setup of the server and the ports chosen the app will appear at: `http://example.com:port/app`

Notes: There might be issues with the application not finding the data file, defined in `js/services/services.js` due to the nature of thi deployment. 

### TODO This might need so changing.



### Development 

To run and test the following application:

1) You run npm to install all dependencies and run in development mode.

2) To retrieve all dependencies run `npm install` in the parent directory (where package.json and bower.json live).

3) Then you need to copy the dependency file generated into the app folder (todo this should be done automatically).

4) To run development run `npm start` in parent directory, and it will appear at `http://localhost:8000/index.html`

## Code Structure
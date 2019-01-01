[![pipeline status](https://gitlab.com/gdoenlen/dx-gui/badges/master/pipeline.svg)](https://gitlab.com/gdoenlen/dx-gui/commits/master)
DX-GUI is a crossplatform gui for the SFDX cli built on the [react lightning design system](https://react.lightningdesignsystem.com) 
and [electron](https://github.com/electron/electron/).<br>

Features:
  - Manage your devhubs
    - Authenticate
    - Delete
  - Manage your scratch orgs
    - Open orgs in your browswer
    - Create new orgs
    - Delete orgs
    - Push and pull source from your orgs

To develop or use this application you need to make sure you have the SFDX cli installed.<br>
You can install the sfdx cli via npm:
  - `npm install -g sfdx-cli`

or from the sfdc binary:
  - [https://developer.salesforce.com/tools/sfdxcli](https://developer.salesforce.com/tools/sfdxcli)


## Electron project
The electron project is currently very minimal and only involves `main.js` to start the window with the react project.

## React project
The react project is located under the `src` directory. 

## Developing
To develop the app run: `npm start` and then `npm run electron`. The app will NOT work correctly from the browswer as it depends electron to execute the sfdx cli.

## Building from source
To build from source you simply need to clone this repo, then run `npm run build && npm run pkg`.
It will build electron for the running platform.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.<br>
Set CI=true if you want all tests to run when executed

### `npm run build`

Builds the react app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.<br>
It also copies over the necessary files `(main.js package.json)` for the electron project to run correctly.

The build is minified and the filenames include the hashes.<br>

### `npm run pkg`
Uses `electron-packager` to create the electron executable for the running platform.

### `npm run electron`
Runs electron for development. This should be ran only after running `npm start`

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

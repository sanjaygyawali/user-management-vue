# User Management Plugin
Built with Quasar

## Requirements
1. Vue
2. Quasar
3. NPM / Yarn

## Base App Dependencies and Plugins
1. Quasar Cookies Plugin
2. Quasar Notify Plugin
3. Axios
4. Vue Router
5. VueX

## Installation
1. Firstly, you require a quasar application. Skip this step if the plugin is going to be installed on a pre-existing application. Else, create a new quasar application by writing the following command:
```bash
quasar create application-name --branch v1
```

2. After creating the application. open ```quasar.conf.js``` file from the project folder and find the line with ```plugins: []``` and add Cookies and Notify to it. It should look similar to:
```bash
plugins: ['Cookies', 'Notify']
```

3. After that, the next step is to link the extension to the application. For linking, on the root of the extension folder and run the following command:
```bash
  yarn link
```
Then, go to base application root folder and run the following command:
```bash
  yarn link quasar-app-extension-rasello-user-management
```

4. Next step is to invoke or install the plugin. To invoke the application, run the following command:
```bash
quasar ext invoke rasello-user-management
```
After running this command, you need to answer several prompts.

# Uninstall
To unistall, you will need to uninvoke the extension by running the follwoing command:

```bash
quasar ext uninvoke rasello-user-management
```

> Note: You need to redo these install steps and issue the uninvoke command each time you make changes to the uninstall script and you want to test them.

## Prompts
1. appName

    Name of your app. It will be displayed on pages where you don't pass
pageTitle props to the ```AuthFormContainer component```.

2. basURL

    URL of the backend API Server. This baseURL will be attached before URL of every requests made to other routes asked in the prompts or to any requests made with the ```$axios``` global variable.

    Type: ```String```

    Eg: ```https://rasello.com/api```

    Default: ```http://localhost:3000```

3. loginRoute

    Route for the user login API.

    Type: ```String```

    Default: ```/auth/login```

    Eg: ```/user/login```

4. registerRoute

    Route for the user registration API.

    Type: ```String```

    Default: ```/auth/register```

    Eg: ```/register```

5. publicRegister

    If you want to make the register page available to every user, type ```Yes``` else, type ```No```.

    Type: ```Confirm```

    Accepted Values: Yes / No / y / n

6. logoutRoute

    Route for the user logout API.

    Type: ```String```

    Default: ```/auth/logout```

    Eg: ```/logout```

7. passwordChangeRoute

    Route for the user logout API.

    Type: ```String```

    Default: ```/auth/change-password```

    Eg: ```/password-change```

8. passwordForgotRoute

    Route for the forgotten password reset request.

    Type: ```String```

    Default: ```/auth/forgot-password```

    Eg: ```/password-forgot```

9. passwordResetRoute

    Route for resetting password after email or phone verification.

    Type: ```String```

    Default: ```/auth/reset-forgot-password```

    Eg: ```/user/reset/password```

10. fetchUserRoute

    Route for fetching the data of logged in user with the JWT token sent on the request header.

    Type: ```String```

    Default: ```/users/me```

    Eg: ```/users/getLoggedInUser```

11. userVerifyRoute

    Route for user verification.

    Type: ```String```

    Default: ```/users/verify```

    Eg: ```/verify-user```

12. logoURL

    Route for the logo to be displayed on the Auth Form headers.

    Type: ```URL```

    Default: ```https://www.rasello.com/images/rasellologo.png```

> Note: To make changes to the prompts, go to ```quasar.extension.json``` file from the root folder of your base application and find ```rasello-user-management``` property and make changes to individual prompts as required.

## Endpoints
1. Login
```bash
/login
```
2. Signup
```bash
/register
```
3. Change Password
```bash
/change-password
```
4. Forgot Password
```bash
/forgot-password
```
5. Reset Password
```bash
/reset-password
```

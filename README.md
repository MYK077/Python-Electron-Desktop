# Add two numbers Desktop Application for Windows

Its a desktop application which adds two numbers and display the output. **TechStack used**:The tech stack comprise of **Python3**(used to write the backend logic), **JavaScript**, **HTML**(for front-end) **Electron** to package the application into a desktop format and **Spectron** for automated testing.

# To Test locally

Clone the git repository, and in that folder location run **npm install** in terminal of your code editor. This will install all the right versions of dependencies for front-end functionality of the application. For the backend logic in Python create a virtual environment from the terminal in code editor using **python -m venv env**. After creating the the virtual environment activate it with using the following command **.\env\Scripts\activate** when activated write **pip install -r requirements.txt** this will install all the Python dependencies in your **env** folder which is your virtual environment.
For mac/linux follow: https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/
to create and start virtual env.

## Running Backend Locally

While your virtual env is active get inside **pycalc** using code editor terminal and write **python api.py**, upon running the following message will be printed in terminal **start running on tcp://127.0.0.1:4242**. If the following port does not work for you please change the port in parse port method line 22 in api.py file and run again. Keep the api.py running now.
**Note**: You can temporarily remove build folder, dist folder and api.spec from pycalc to run backend locally as
they are python executables created using pyInstaller.

## For front end

Open a different terminal window in code editor, if you still see your python virtual env active in that new terminal window, deactivate it using **deactivate**(to deactivate in mac/linux please follow link provided in To Test Locally). Now run **npm start** and your application will start running :)

## To package the application

I have already provided the packaged python executables file using py-installer. However to package, activate the virtual env and run **pyinstaller api.py**. To package the application use **electron-packager .** in terminal.
In case the electron-packager does not work please install it globally using **npm install electron-packager -g** and rerun **electron-packager .** , the windows executable folder of the application will be created. Go inside the folder and click on the executable desktop file.

## Automation Testing

To run the the testing file run the command **npm run test**. I have given a time out of 10000ms before app launches first time. If time exceeds please rerun the test file again or increase the time.

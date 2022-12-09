# CS403503 - Lisp Interpreter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.

## Getting Started
### Requrements
[NodeJS.](https://nodejs.org/en/) 
### Install the Angular CLI
To install the Angular CLI, open a terminal window and run the following command `npm install -g @angular/cli`

## Run (Default)
- Navigate to the project folder.
- Open a terminal and run the following command `npm run start-app`
- Open your browser and navigate to `http://localhost:4200/`

## Create windows executable
- Navigate to the project folder.
- Open a terminal and run the following command `npm run build`
- then run this command `npm run electron-win`
- The previous command will create a folder cs403-503-win32-x64 in the project directory.
- Navigate to *cs403-503-win32-x64* and open the executable file *cs403-503.exe*.
- In case you come across a blank window, go to view menu in the tab bar and click reload.
- If you wish to re-create the windows executable, navigate to the project directory and delete *cs403-503-win32-x64* and *dist* folders and re-run the creation command.

## Create macOS executable
- Navigate to the project folder.
- Open a terminal and run the following command `npm run build`
- then the following command `npm run electron-mac`
- The previous command will create a folder *cs403-503-win32-x64* in the project directory.
- Navigate to *cs403-503-win32-x64* and open the executable file cs403-503.exe.
- In case you come across a blank window, go to view menu in the tab bar and click reload
- If you wish to re-create the windows executable, navigate to the project directory, and delete *cs403-503-win32-x64* and *dist* folders and re-run the creation command.


## Interpreter file directories
- Lisp interpreter  `src\app\interpreter\interpreter-lisp`
- Test cases `src\assets\lisp-tests.ts`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Authors

- Abdelhadi Hussein
- Abdulaziz Almousa
- Andrés Ramírez Molina
- Hazem Tashkandi

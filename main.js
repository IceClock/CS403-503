const {app, BrowserWindow} = require('electron');  
const url = require('url');
const path = require('path');   
	
function createWindow () {     
	win = new BrowserWindow({width: 800, height: 800})    
	win.loadURL(url.format({      
		pathname: path.join(
			__dirname,
			'dist/cs403-503/index.html'),         
	}))   
} 

app.whenReady().then(() => {
    createWindow();
})
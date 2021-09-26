// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "lwcvalidator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('lwcvalidator.lwcvalidator', function () {
		// The code you place here will be executed every time your command is executed
		const active = vscode.window.activeTextEditor;
		let getCurrentText = JSON.stringify(active.document.getText());
		let indLines = getCurrentText.split("\\r\\n");
		let lintcount = indLines.length;
		let displayErrors="";
		if(!indLines[0].includes("/**")) displayErrors += "Error: Line No 1: Missing the author comments\n";
		if(!indLines[1].includes("@Author")) displayErrors += "Error: Line No 2: Missing the author name\n";
		if(!indLines[2].includes("@CreatedOn")) displayErrors += "Error: Line No 3: Missing the created date\n";
		if(!indLines[3].includes("@Purpose")) displayErrors += "Error: Line No 4: Missing the purpose of the document\n";
		for(let i=0;i<indLines.length;i++){
			let lCount = i+1;
			if(indLines[i].includes("console")){
				displayErrors += "Error: Line No "+ lCount +": Console.log found, please remove it\n";				
			}
			if(indLines[i].includes("__c")){
				displayErrors += "Error: Line No "+ lCount +": Avoid the __c in the LWC file. Please import the field and configure it\n";				
			}
		}
		
		// Display a message box to the user
		vscode.window.showInformationMessage(''+displayErrors);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

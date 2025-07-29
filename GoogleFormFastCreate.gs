// Create a Google Form with multiple questions and on submission it send an email to the account that autorised it.
// You will receive a public URL to give to users and a Editor URL to use for any modifications on the form settings.

function MyForm() {
 var form = FormApp.create('Test form');
 var ss = SpreadsheetApp.create('Raspunsuri');
 form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
 
 var item = form.addCheckboxItem();
 item.setTitle('What programing language gives you the most headaches?');
 item.setChoices([
         item.createChoice('Javascript'),
         item.createChoice('C++?'),
         item.createChoice('Javascript!!'),
     ]);
 form.addMultipleChoiceItem()
     .setTitle('Do you want pets?')
     .setChoiceValues(['Yes','Yes I want pets', 'I will have pets...'])
 form.addListItem()
   .setTitle('Your pets love you?')
   .setChoices([
       item.createChoice('Yes'),
       item.createChoice('Yes!'),
       item.createChoice('Yes, why is this even a question?'),
   ]);
 
 Logger.log('Published URL: ' + form.getPublishedUrl());
 Logger.log('Editor URL: ' + form.getEditUrl());
 
 ScriptApp.newTrigger('mySubmit').forSpreadsheet(ss).onFormSubmit().create();
}
 
function mySubmit(e) {
 GmailApp.sendEmail('alexandru.lipan88.com', 'Raspunsuri', 'test body', {attachments: [e.source]});
}

/*
var file = DriveApp.getFilesByName('AnswerS');
GmailApp.sendEmail('alexandru.lipan88@gmail.com', 'Attachment example', 'Please see the attached file.', {
    attachments: [file.getAs(MimeType.XLSX)],
    name: 'Automatic Emailer Script'
});


var file = DriveApp.getFilesByName('Raspunsuri');
  Logger.log("Name of file is " + file.getName());
  GmailApp.sendEmail('alexandru.lipan88@gmail.com', 'Demo Issue', 'Demo Issue', {attachments: [file.getAs(MimeType.XLSX)]});
*/

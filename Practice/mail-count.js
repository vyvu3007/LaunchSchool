/*
return string has two basic statistic about email
- The number of email messages found
- The date range of the email messages

input data:
- string contain multiple email messages separated by `##||##`
    -each email message has five part. string `#/#` seprate the part
      - Five parts are:
        - Sender
        - Subject
        - Date
        - Recipient
        - Body

Algorithm:

function createEmail(message)
  - initialize `emails` as an object
  - seperate messege into 5 parts that seperate by `#/#` assign it to `messegeParts`
  - Iterate through `messegeParts`, 
    - if current element start with "From:" assign the key value pair From: current element to `emails`
    - if current element start with "Subject:" assign key value pair Subject: current element to `emails`
    - ..same with "Date:"
    - ..same with "To:"
    - else assign  as Body : currentlement to `emails`


function 
    */
//  message = `From: foo@bar.com#/#\nSubject: Nunc in justo eros. 
// Aliquam.#/#\nDate: 07-27-2016#/#\nTo: foo@bar.com#/#\nEtiam convallis
//  commodo tortor, dapibus auctor dolor semper consequat. 
//  Sed lobortis eros nec ante porta, eu placerat sapien interdum. 
//  Class aptent taciti sociosqu ad litora torquent per conubia nostra, 
//  per inceptos himenaeos. Morbi consectetur et odio vitae volutpat. 
//  Curabitur imperdiet orci metus, et dignissim nisl lacinia non.
//   Aenean volutpat diam in lorem iaculis, sit amet volutpat nibh dictum. 
//   Quisque vel vulputate nisi. Nam a vestibulum turpis. Lorem ipsum dolor sit amet, 
//   consectetur adipiscing elit. Morbi interdum leo id velit aliquet, at
//    vestibulum ipsum molestie. Cras eu lobortis libero. In rutrum non leo id ultricies.
//     Aliquam in ex ut nibh placerat sollicitudin vitae id magna.`

function createEmail(text){
    let email = {}
    text = text.replace(/\n+/g,"").split("#/#")

    text.forEach(part => {
      let [key,rest] = part.trim().split(":")
      if(rest === undefined) {
        rest = key
        key = "Body"
      }
      email[key] = rest.trim()
     })
    return email
}

function mailCount(emailData) {
  let messages = {}
  emailData = emailData.replace(/\n+/g,"")
  .split("##\|\|").map(message => createEmail(message))
  console.log('Count of email: ' + emailData.length)
  console.log('Date Rang: ' + displayableDateRange(emailDates));
}

mailCount(emailData);

// console output

//Count of Email: 5
//Date Range: Sat Jun 25 2016 - Thu Aug 11 2016
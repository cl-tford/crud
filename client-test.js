var Client = require('./client');

var courseSearchClient = new Client();

courseSearchClient.search('making interactive pdfs', {
  fields : {
    slug : 1, 
    short_title : 1,
    detail_image : 1
  },
  limit : 5
}, function(err, data) {
  console.log("Got data:\n", JSON.stringify(data, null, 2));
});

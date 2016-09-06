var Airtable = require('airtable');
var fs          = require('fs');
var yaml        = require('js-yaml');

function loadConfig() {
  var ymlFile = fs.readFileSync('_config.yml', 'utf8');
  return yaml.load(ymlFile);
}

var config = loadConfig().airtable;
var jsonfile = require('jsonfile');






// Updates by date asc 

var fileupdates = '_data/updates.json';
var updates = new Airtable({ apiKey: config.apikey }).base(config.updates);
var updatesJson = [];
var updatesJsonTest = [];

updates('Prayer_Letters').select({
    maxRecords: 100,
  //sort
    sort: [{field: "date", direction: "desc"}],
    filterByFormula: "published",
  //Formula to how to get data
  // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

}).eachPage(function page(records, fetchNextPage) {

    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      updatesJson.push(record._rawJson.fields);
      
    });
    fetchNextPage();

}, function done(error) {
    if (error) {
        console.log(error);
    }
  jsonfile.writeFile(fileupdates, updatesJson, function (err) {
    console.error(err)
  });
  console.log('updates worked');
});


var fileupdateimage = '_data/updateimage.json';
var updateimage = new Airtable({ apiKey: config.apikey }).base(config.updates);
var updateimageJson = [];
var updateimageJsonTest = [];

updateimage('Defaults').select({
    maxRecords: 1,
  //Formula to how to get data
  // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

}).eachPage(function page(records, fetchNextPage) {

    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      updateimageJson.push(record._rawJson.fields);
      
    });
    fetchNextPage();

}, function done(error) {
    if (error) {
        console.log(error);
    }
  jsonfile.writeFile(fileupdateimage, updateimageJson, function (err) {
    console.error(err)
  });
  console.log('updateimage worked');
});



// Family Intro - 1

var fileintro = '_data/intro.json';
var intro = new Airtable({ apiKey: config.apikey }).base(config.family);
var introJson = [];
var introJsonTest = [];

intro('Intro').select({
    maxRecords: 1,
    view: "Main View"
  
  //Formula to how to get data
  // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

}).eachPage(function page(records, fetchNextPage) {

    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      introJson.push(record._rawJson.fields);
      
    });
    fetchNextPage();

}, function done(error) {
    if (error) {
        console.log(error);
    }
  jsonfile.writeFile(fileintro, introJson, function (err) {
    console.error(err)
  });
  console.log('intro worked');
});


// Family Testimonies by order asc 

var filetestimonies = '_data/testimonies.json';
var testimonies = new Airtable({ apiKey: config.apikey }).base(config.family);
var testimoniesJson = [];
var testimoniesJsonTest = [];

testimonies('Testimonies').select({
    maxRecords: 10,
    view: "Main View"
  
  //Formula to how to get data
  // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

}).eachPage(function page(records, fetchNextPage) {

    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      testimoniesJson.push(record._rawJson.fields);
      
    });
    fetchNextPage();

}, function done(error) {
    if (error) {
        console.log(error);
    }
  jsonfile.writeFile(filetestimonies, testimoniesJson, function (err) {
    console.error(err)
  });
  console.log('testimonies worked');
});

// Family Beliefs by order asc 

var filebeliefs = '_data/beliefs.json';
var beliefs = new Airtable({ apiKey: config.apikey }).base(config.family);
var beliefsJson = [];
var beliefsJsonTest = [];

beliefs('Beliefs').select({
    maxRecords: 50,
    view: "Main View"
  
  //Formula to how to get data
  // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

}).eachPage(function page(records, fetchNextPage) {

    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      beliefsJson.push(record._rawJson.fields);
      
    });
    fetchNextPage();

}, function done(error) {
    if (error) {
        console.log(error);
    }
  jsonfile.writeFile(filebeliefs, beliefsJson, function (err) {
    console.error(err)
  });
  console.log('beliefs worked');
});

// Family Education_Experience - 1


var fileexperience = '_data/experience.json';
var experience = new Airtable({ apiKey: config.apikey }).base(config.family);
var experienceJson = [];
var experienceJsonTest = [];

experience('Education_Experience').select({
    maxRecords: 1,
    view: "Main View"
  
  //Formula to how to get data
  // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

}).eachPage(function page(records, fetchNextPage) {

    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      experienceJson.push(record._rawJson.fields);
      
    });
    fetchNextPage();

}, function done(error) {
    if (error) {
        console.log(error);
    }
  jsonfile.writeFile(fileexperience, experienceJson, function (err) {
    console.error(err)
  });
  console.log('experience worked');
});

// Family Media by order asc 


var filemedia = '_data/media.json';
var media = new Airtable({ apiKey: config.apikey }).base(config.family);
var mediaJson = [];
var mediaJsonTest = [];

media('Media').select({
    maxRecords: 50,
    view: "Main View"
  
  //Formula to how to get data
  // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

}).eachPage(function page(records, fetchNextPage) {

    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      mediaJson.push(record._rawJson.fields);
      
    });
    fetchNextPage();

}, function done(error) {
    if (error) {
        console.log(error);
    }
  jsonfile.writeFile(filemedia, mediaJson, function (err) {
    console.error(err)
  });
  console.log('media worked');
});

// Contact Contact_Page 1

var filecontact = '_data/contact.json';
var contact = new Airtable({ apiKey: config.apikey }).base(config.contact);
var contactJson = [];
var contactJsonTest = [];

contact('Contact_Page').select({
    maxRecords: 1,
    view: "Main View"
  
  //Formula to how to get data
  // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

}).eachPage(function page(records, fetchNextPage) {

    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      contactJson.push(record._rawJson.fields);
      
    });
    fetchNextPage();

}, function done(error) {
    if (error) {
        console.log(error);
    }
  jsonfile.writeFile(filecontact, contactJson, function (err) {
    console.error(err)
  });
  console.log('contact worked');
});


// TODO Add Feild stuff. (Need to figure out data structure first)



// Main Info 


var fileinfo = '_data/info.json';
var info = new Airtable({ apiKey: config.apikey }).base(config.info);
var infoJson = [];
var infoJsonTest = [];


    info('Main_Stuff').select({
        maxRecords: 1,
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          infoJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(fileinfo, infoJson, function (err) {
        console.error(err)
      });
      console.log('info worked');
    });


    // Contact

var filecontact = '_data/contact.json';
var contact = new Airtable({ apiKey: config.apikey }).base(config.info);
var contactJson = [];
var contactJsonTest = [];



    contact('Contact_Info').select({
        maxRecords: 1,
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          contactJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filecontact, contactJson, function (err) {
        console.error(err)
      });
      console.log('contact worked');
    });

    //home page stuff

    var filehome = '_data/home.json';
var home = new Airtable({ apiKey: config.apikey }).base(config.info);
var homeJson = [];
var homeJsonTest = [];



    home('Home_Page').select({
        maxRecords: 1,
      //Formula to how to get data
      // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

    }).eachPage(function page(records, fetchNextPage) {

        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          homeJson.push(record._rawJson.fields);
          
        });
        fetchNextPage();

    }, function done(error) {
        if (error) {
            console.log(error);
        }
      jsonfile.writeFile(filehome, homeJson, function (err) {
        console.error(err)
      });
      console.log('home worked');
    });

// Field Information

var filefield = '_data/field.json';
var field = new Airtable({ apiKey: config.apikey }).base(config.field);
var fieldJson = [];
var fieldJsonTest = [];

field('Sections').select({
    maxRecords: 50,
    view: "Main View"
  
  //Formula to how to get data
  // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

}).eachPage(function page(records, fetchNextPage) {

    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      fieldJson.push(record._rawJson.fields);
      
    });
    fetchNextPage();

}, function done(error) {
    if (error) {
        console.log(error);
    }
  jsonfile.writeFile(filefield, fieldJson, function (err) {
    console.error(err)
  });
  console.log('field worked');
});

// Get Involved Sections

var fileinvolved = '_data/involved.json';
var involved = new Airtable({ apiKey: config.apikey }).base(config.involved);
var involvedJson = [];
var involvedJsonTest = [];



involved('Page').select({
    maxRecords: 1,
  //Formula to how to get data
  // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

}).eachPage(function page(records, fetchNextPage) {

    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      involvedJson.push(record._rawJson.fields);
      
    });
    fetchNextPage();

}, function done(error) {
    if (error) {
        console.log(error);
    }
  jsonfile.writeFile(fileinvolved, involvedJson, function (err) {
    console.error(err)
  });
  console.log('involved worked');
});


// Contact Page Details 

var filecontactPage = '_data/contactPage.json';
var contactPage = new Airtable({ apiKey: config.apikey }).base(config.contact);
var contactPageJson = [];
var contactPageJsonTest = [];



contactPage('Contact_Page').select({
    maxRecords: 1,
  //Formula to how to get data
  // help https://support.airtable.com/hc/en-us/articles/203255215-Formula-Field-Reference

}).eachPage(function page(records, fetchNextPage) {

    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
      contactPageJson.push(record._rawJson.fields);
      
    });
    fetchNextPage();

}, function done(error) {
    if (error) {
        console.log(error);
    }
  jsonfile.writeFile(filecontactPage, contactPageJson, function (err) {
    console.error(err)
  });
  console.log('contactPage worked');
});
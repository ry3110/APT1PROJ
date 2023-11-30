import LogOn from "./LogOn";
import Home from "./Home";

describe('Login', () =>{

    //Global isntance  of the data fixture
    //Added like this to get all the value from the JSON file after quick fix
    let userdata: {
        [x: string]: any;
    };

    before(function(){
        // const homepage = new Home();
        // const logonpage = new LogOn();
        // const homepage, logonpage;
        // cy.homepage = new Home();
        // cy.logonpage = new LogOn();
        cy.fixture('example').then(function(data){
            userdata = data;
            return userdata;
        });
    })

    it('Visit the home project page', () =>{
        const homepage = new Home();
        const logonpage = new LogOn();

        homepage.visit();    
        //Checkpoint 1 : [Checking the title of the Webpage that we just visited. Here, "HSBC Home page"]
        homepage.checkTitleOfTheHomePage();
        //Checkpoint 2 : [Checking the presence of the "Log On" button on the Webpage that we just visited. Here, "HSBC Home page"]
        homepage.checkLogOnButton();
    
        homepage.clickLogOnButton();
    
        //Login page checkpoint 1  [Checking that the "continue" button is disabled]
        logonpage.checkContinueButtonStatus();
        //Login page checkpoint 2  [Checking that the textbox where we have to enter the value for username is empty initially]
        logonpage.checkUsernameIsBlank();
        //Login page checkpoint 3  [Checking that the checkbox is not checked]
        logonpage.checkRememberCheckboxIsUnchecked();
        //Login page checkpoint 4  [Checking that the help button is available]
        logonpage.checkHelpBuuton();

        logonpage.clickToOpenHelp();
        cy.wait(1500);
        logonpage.clickToCloseHelp();

        //We were using hardcoded value
        // logonpage.enterUsername("john@example.com");
        //Now using data coming from fixture data. Accessing through global variable 'userdata'.'key_name_in_JSON'
        logonpage.enterUsername(userdata.email);

    })
  })
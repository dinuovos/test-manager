const puppeteer = require('puppeteer');
const fs = require('fs');
function testPuppeteer(url,filename,path){
    var testCaseHTML = path + "\\" + filename + "-testsuite.html";
    console.log("testCaseHTML",testCaseHTML);
    return new Promise(async(resolve,reject) =>{
        var browser;
        const wstream = fs.createWriteStream(testCaseHTML);
        wstream.on('error', function (err) {
            console.error(err);
            if(browser)
                (async()=> await browser.close() )();
            reject(e);
        });
        try {
            browser = await puppeteer.launch();
            const pid = browser.process().pid;
            console.log("puppeteer is testing on url ", url);
            console.log("with pid ", pid);
            const page = await browser.newPage();
            await page.goto(url,{
                waitUntil:'networkidle2',
                timeout:300000
            });
            page
                .waitForSelector('.testSuite-suite')
                .then(async() => {
                    var ua = await page.evaluate(() => window.navigator.userAgent);
                    var uaTestPhrase = "Puppeteer test on \n" + ua + "\n";
                    var tableResult = await page.evaluate(() => document.querySelector('.testSuite-suite').outerHTML);
                    var testResult = await page.evaluate(() => window.test.getTotalResult);
                    var tests = await page.evaluate(() => window.test.tests);
                    wstream.write(tableResult);
                    wstream.end();
                    if (testResult.passed) {
                        console.log(uaTestPhrase + "gave no false test. Check " + filename + "-puppeteer-testresult.html" + " for more info")
                    }
                    else
                        console.error(uaTestPhrase + "gave falses tests. Check " + filename + "-puppeteer-testresult.html" + " for more info");
                    resolve(tests);
                    await browser.close(()=>console.log("--- BROWSER EXIT ---"));
                });
        }
        catch(e){
            console.log("Puppeteer launcher error");
            console.log(e);
            if(browser)
                (async()=> await browser.close(()=>console.log("--- BROWSER EXIT ---")) )();
            reject(e);
        }
    });
}
module.exports = testPuppeteer;
# test-manager: CLI for [@dinuovos/test-suite](https://www.npmjs.com/package/@dinuovos/test-suite)
To work, it reads a configuration json called "test.manager.json"
```js
[  
  {  
    "label" : "An introduction test",  // will be printed in console during process
    "module" : "/tests/test.introduction.for.node.js"  // the module name. See below
  },  
  {  
    "label" : "Show html tests",  
    "module" : "/tests/browser-tests/test.showhtml.methods.html",  // this can be only html
    "headless" : true  // this property set to true will start a puppeteer headless test
  },
  ```
 Remember to export your test as a function:
 ```js
 function testIntroduction(test) {
     test.createSuite("TestJS test suite",function(){
         test.createTestCase("TestCase #1",function(){
             test.expect(1).toBe(1)
         });
         test.createTestCase("TestCase #2",function(){
             var t = !false;
             test.expect(t).toBe(true)
         });
     });
     test.createSuite("A suite 2",function(){
         test.createTestCase("TestCase #1",function(){
             test.expect(1).toBe(1)
         });
         test.createTestCase("TestCase #2 ( False expected! )",function(){
             var t = !false;
             test.expect(t).toBe(false)
         });
     });
 }
   ```
 Just install the package and try
 ```sh
 npx test-suite
   ```
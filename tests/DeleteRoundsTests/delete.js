import { Selector } from 'testcafe';

fixture `Test Task 4`
    .page `http://localhost:8081/`;

test('Task 4', async t => {t
        await t
         .click('#createAccountBtn')
         .typeText(Selector('#email'),'zicheng.gu@wsu.edu')
         .typeText(Selector('#password'),'Aa123456')
         .typeText(Selector('#repeatPassword'),'Aa123456')
         .typeText(Selector('#displayName'),'Aa123456')
         .typeText(Selector('#securityQuestion'),'Aa123456')
         .typeText(Selector('#securityAnswer'),'Aa123456')
         .click("#create")
         .typeText(Selector('#email'),'zicheng.gu@wsu.edu')
         .typeText(Selector('#password'),'Aa123456')
         .click('#loginBtn')
         .click('#roundsMode')
         //create a new course
         .click('#roundsModeActionBtn')
         .typeText(Selector('#roundCourse'),'course 1')
         .click('#submit')
         .expect(Selector('td').withText('course 1').visible).eql(true)
         .click('#delBtn0')
         //dialog appears, click cancel, nothing happen, click confirm, delete the chosen course.
         .expect(Selector('#popUpModalContent').visible).eql(true)
         .click('#Cancel')
         .expect(Selector('td').withText('course 1').visible).eql(true).wait(2000)
         .click('#delBtn0').expect(Selector('td').withText('course 1').visible).eql(true)
         .click('#Confirm')
         .expect(Selector('td').withText('course 1').visible).eql(false)
         
       
         
})
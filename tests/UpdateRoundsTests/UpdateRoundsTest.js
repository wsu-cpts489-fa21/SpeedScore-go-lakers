import { Selector } from 'testcafe';

fixture `UpdateRoundsTest.`
    .page `http://localhost:8081/`;

test('UpdateRoundsTest.', async t => {t
        await t
         .click('#createAccountBtn')
         .typeText(Selector('#email'),'zhiping.li@wsu.edu')
         .typeText(Selector('#password'),'Qq222222')
         .typeText(Selector('#repeatPassword'),'Qq222222')
         .typeText(Selector('#displayName'),'Zhiping Li')
         .typeText(Selector('#securityQuestion'),'Name?')
         .typeText(Selector('#securityAnswer'),'Zhiping Li')
         .click("#create")
         .typeText(Selector('#email'),'zhiping.li@wsu.edu')
         .typeText(Selector('#password'),'Qq222222')
         .click('#loginBtn')
         .click('#roundsMode')
         .click('#roundsModeActionBtn')
         .typeText(Selector('#roundCourse'),'AAA')
         .click('#submit')
         .expect(Selector('td').withText('AAA').visible).eql(true)
         .click('#editBtn0')
         .typeText(Selector('#roundCourse'),'BBB')
         .click('#submit')
         .expect(Selector('td').withText('AAABBB').visible).eql(true)
})
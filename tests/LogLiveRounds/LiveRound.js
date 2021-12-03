import { Selector } from 'testcafe';

fixture `Test LiveRound`
    .page `http://localhost:8081/`;

test('LiveRound', async t => {t
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
    //At first, there is no record.
    .expect(Selector('td').withText('No rounds logged').visible).eql(true)
    //Add a record by clicking Track live button
    .click('#roundsModeActionBtn')
    .expect(Selector('#popUpModalContent').visible).eql(true)
    .click('#Cancel')
    .expect(Selector('#popUpModalContent').visible).eql(false)
    .click('#roundsModeActionBtn')
    .click('#Track_Live')
    .expect(Selector('#Start').withText('No time recorded yet').visible).eql(true)
    .click('#Start')
    .expect(Selector('#Start').withText("Click again to update").visible).eql(true)
    //test name of each hole
    .click('#GotoScoring')
    .expect(Selector('#hole').withText("Hole 1").visible).eql(true)
    //test update of time
    .click('#Start').wait(2000)
    .click('#Start')
    .expect(Selector('#Start').withText("0:01").visible).eql(true)
    .click('#GotoScoring')
    // test add a record after adding 18 holes
    .click('#Start')
    .click('#GotoScoring')
    .click('#Start')
    .click('#GotoScoring')
    .click('#Start')
    .click('#GotoScoring')
    .click('#Start')
    .click('#GotoScoring')
    .click('#Start')
    .click('#GotoScoring')
    .click('#Start')
    .click('#GotoScoring')
    .click('#Start')
    .click('#GotoScoring')
    .click('#Start')
    .click('#GotoScoring')
    .click('#Start')
    .click('#GotoScoring')
    .click('#Start')
    .click('#GotoScoring')
    .click('#Start')
    .click('#GotoScoring')
    .click('#Start')
    .click('#GotoScoring')
    .click('#Start')
    .click('#GotoScoring')
    .click('#Start')
    .click('#GotoScoring')
    .click('#Start')
    .click('#GotoScoring')
    .click('#Start')
    .click('#GotoScoring')
    .click('#Start')
    .click('#GotoScoring')
    .expect(Selector('td').withText('LiveLogRounds').visible).eql(true)


         
})
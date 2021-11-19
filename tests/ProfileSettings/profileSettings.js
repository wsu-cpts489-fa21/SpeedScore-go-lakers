import { Selector } from 'testcafe';


fixture `Testing #5`
    .page `http://localhost:8081/`;

test('check calcenBtn at profile Setting', async t => {

    await t
        //create account and login
        .click('#createAccountBtn')
        .typeText(Selector('#email'),'zzz@gmail.com')
        .typeText(Selector('#password'),'Asd12345')
        .typeText(Selector('#repeatPassword'),'Asd12345')
        .typeText(Selector('#displayName'),'asd')
        .typeText(Selector('#securityQuestion'),'asdasd')
        .typeText(Selector('#securityAnswer'),'asdasd')
        .click("#create")
        .typeText(Selector('#email'),'zzz@gmail.com')
        .typeText(Selector('#password'),'Asd12345')
        .click('#loginBtn')

        //check cancel button
        .click("#profileBtn")
        .expect(Selector('#profileModal').visible).eql(true)
        .click('#CancelBtn')
        .expect(Selector('#profileModal').visible).eql(false)
});

test('check saveBtn at profile Setting', async t => {

    await t
        //create account and login
        .click('#createAccountBtn')
        .typeText(Selector('#email'),'zzz@gmail.com')
        .typeText(Selector('#password'),'Asd12345')
        .typeText(Selector('#repeatPassword'),'Asd12345')
        .typeText(Selector('#displayName'),'asd')
        .typeText(Selector('#securityQuestion'),'asdasd')
        .typeText(Selector('#securityAnswer'),'asdasd')
        .click("#create")
        .typeText(Selector('#email'),'zzz@gmail.com')
        .typeText(Selector('#password'),'Asd12345')
        .click('#loginBtn')
        .click("#profileBtn")
        //change profile setting and save
        .typeText(Selector('#displayName'),'displayName', {replace: true})
        .typeText(Selector('#securityQuestion'),'securityQuestion', {replace: true})
        .typeText(Selector('#securityAnswer'),'securityAnswer', {replace: true})
        .click('#SaveBtn')
        .expect(Selector('#profileModal').visible).eql(false)
        //check settings update
        .click("#profileBtn")
        .expect(Selector('#displayName').value).eql('displayName')
        .expect(Selector('#securityQuestion').value).eql('securityQuestion')
        .expect(Selector('#securityAnswer').value).eql('securityAnswer')
});


test('check keyboard interaction at profile Setting', async t => {

    await t
        //create account and login
        .click('#createAccountBtn')
        .typeText(Selector('#email'),'zzz@gmail.com')
        .typeText(Selector('#password'),'Asd12345')
        .typeText(Selector('#repeatPassword'),'Asd12345')
        .typeText(Selector('#displayName'),'asd')
        .typeText(Selector('#securityQuestion'),'asdasd')
        .typeText(Selector('#securityAnswer'),'asdasd')
        .click("#create")
        .typeText(Selector('#email'),'zzz@gmail.com')
        .typeText(Selector('#password'),'Asd12345')
        .click('#loginBtn')
        .click("#profileBtn")
        //check tab
        .pressKey('tab')
        .pressKey('tab')
        .expect(Selector('#password').focused).eql(true)
        .pressKey('tab')
        .expect(Selector('#securityQuestion').focused).eql(true)
        .pressKey('tab')
        .expect(Selector('#securityAnswer').focused).eql(true)
        .pressKey('tab')
        .expect(Selector('#displayName').focused).eql(true)
});
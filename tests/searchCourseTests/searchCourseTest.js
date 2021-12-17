import { Selector } from 'testcafe';

fixture `searchCourseTest`
    .page `http://localhost:8081/`;

test('searchCourseTest', async t => {t
        await t
        .click('#createAccountBtn')
        .typeText(Selector('#email'),'a@gmail.com')
        .typeText(Selector('#password'),'Ab123456')
        .typeText(Selector('#repeatPassword'),'Ab123456')
        .typeText(Selector('#displayName'),'Jianqiao')
        .typeText(Selector('#securityQuestion'),'123456')
        .typeText(Selector('#securityAnswer'),'123456')
        .click("#create")
        .typeText(Selector('#email'),'a@gmail.com')
        .typeText(Selector('#password'),'Ab123456')
        .click('#loginBtn')
        .click('#coursesMode')

        .click('#searchBtn')
        .typeText(Selector('#searchBox'),'Golf')
        .expect(Selector('td').withText('Golf Course Clubhouse').visible).eql(true)
        .debug()
        .expect(Selector('td').withText('Palouse Ridge Drive').visible).eql(true)
})
'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function () {

    describe('repeater scenario', function () {

        beforeEach(function () {
            browser().navigateTo('../../app/repeater.html');
        });


        it('should be possible to set the values in repeater generated inputs', function () {
            repeatingInput("char.value", 0).enter("a");
            repeatingInput("char.value", 1).enter("n");
            repeatingInput("char.value", 2).enter("g");
            repeatingInput("char.value", 3).enter("u");
            repeatingInput("char.value", 4).enter("l");
            repeatingInput("char.value", 5).enter("a");
            repeatingInput("char.value", 6).enter("r");
            element("#concat").click();
            expect(element("#message").text()).toBe("angular");
        });

    });


});

'use strict';

describe('tabs', function () {

    describe('using element', function () {

        beforeEach(function () {
            browser().navigateTo('/app/tabs.html');
            scopedSelector = '#element';
        });

        assertions();
        classAssertions();
    });

    describe('using attribute', function () {

        beforeEach(function () {
            browser().navigateTo('/app/tabs.html');
            scopedSelector = '#attribute';
        });

        assertions();
        classAssertions();
    });

    describe('using repeater', function () {

        beforeEach(function () {
            browser().navigateTo('/app/tabs.html');
            scopedSelector = '#repeater';
        });

        assertions();
    });

    var scopedSelector;

    function scoped() {
        return using(scopedSelector);
    }

    function assertions() {
        it('should have an unordered list for the headings', function () {
            assertUl();
        });

        it('should have an li list each tab', function () {
            assertLi();
        });

        it('should have an a in each li contnaining the heading text', function () {
            assertHeadingText();
        });

        it('should have 2 panes', function () {
            assertPanes();
        });

        it('first tab should default to active and only content for the first pane should be visible', function () {
            assertDefualtToFirstTab();
        });

        it('clicking on the second tab should switch behaviour', function () {
            assertSwicthTabs();
        });
    }

    function classAssertions() {
        it('static classes should be pushed onto the headings', function () {
            assertStaticClasses();
        });

        it('dynamic classes should be pushed onto the headings', function () {
            assertDynamicClasses();
        });
    }

    function assertUl() {
        expect(scoped().element('ul.headings').count()).toEqual(1);
    }

    function assertLi() {
        expect(scoped().element('ul.headings li').count()).toEqual(2);
    }

    function assertHeadingText() {
        expect(scoped().element('ul.headings li a:eq(0)').text()).toContain('heading 1');
        expect(scoped().element('ul.headings li a:eq(1)').text()).toContain('heading 2');
    }

    function assertPanes() {
        expect(scoped().element('div.tab-content:eq(0)').text()).toContain('content 1');
        expect(scoped().element('div.tab-content:eq(1)').text()).toContain('content 2');
    }

    function assertStaticClasses() {
        expect(scoped().element('.head1').text()).toContain('heading 1');
    }

    function assertDynamicClasses() {
        expect(scoped().element('.head2').text()).toContain('heading 2');
    }

    function assertDefualtToFirstTab() {
        expect(scoped().element('li.active').count()).toEqual(1);
        expect(scoped().element('li.active').text()).toContain('heading 1');
        expect(scoped().element('div.tab-content:visible').count()).toEqual(1);
        expect(scoped().element('div.tab-content:visible').text()).toContain('content 1');
    }

    function assertSwicthTabs() {
        scoped().element('.headings a:eq(1)').click();
        expect(scoped().element('li.active').count()).toEqual(1);
        expect(scoped().element('li.active').text()).toContain('heading 2');
        expect(scoped().element('div.tab-content:visible').count()).toEqual(1);
        expect(scoped().element('div.tab-content:visible').text()).toContain('content 2');
    }

});
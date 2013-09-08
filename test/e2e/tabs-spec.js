'use strict';

describe('tabs', function () {

    beforeEach(function () {
        browser().navigateTo('/app/tabs.html');
    });

    it('should have an unordered list for the headings', function () {
        expect(element('ul.headings').count()).toEqual(1);
    });

    it('should have an li list each tab', function () {
        expect(element('ul.headings li').count()).toEqual(2);
    });

    it('should have an a in each li contnaining the heading text', function () {
        expect(element('ul.headings li a:eq(0)').text()).toContain('heading 1');
        expect(element('ul.headings li a:eq(1)').text()).toContain('heading 2');
    });

    it('should have 2 panes', function () {
        expect(element('div.tab-content:eq(0)').text()).toContain('content 1');
        expect(element('div.tab-content:eq(1)').text()).toContain('content 2');
    });

    it('static classes should be pushed onto the headings', function () {
        expect(element('.head1').text()).toContain('heading 1');
    });

    it('dynamic classes should be pushed onto the headings', function () {
        expect(element('.head2').text()).toContain('heading 2');
    });

    it('first tab should default to active and only content for the first pane should be visible', function () {
        expect(element('li.active').count()).toEqual(1);
        expect(element('li.active').text()).toContain('heading 1');
        expect(element('div.tab-content:visible').count()).toEqual(1);
        expect(element('div.tab-content:visible').text()).toContain('content 1');
    });

    it('clicking on the second tab should switch behaviour', function () {
        element('.headings a:eq(1)').click();
        expect(element('li.active').count()).toEqual(1);
        expect(element('li.active').text()).toContain('heading 2');
        expect(element('div.tab-content:visible').count()).toEqual(1);
        expect(element('div.tab-content:visible').text()).toContain('content 2');
    });

});
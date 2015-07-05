/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
	/* This is our first test suite - a test suite just contains
	* a related set of tests. This suite is all about the RSS
	* feeds definitions, the allFeeds variable in our application.
	*/
	describe('RSS Feeds', function() {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. 
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
			expect(allFeeds instanceof Array).toBeTruthy();
		});

		/* a test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('URLs are defined and not empty', function() {
			for (i = 0; i<allFeeds.length; i++) {
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url).not.toBe('');
			}
		});

		/* a test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('names are defined and not empty', function() {
			for (i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name).not.toBe('');
				expect(typeof allFeeds[i].name).toBe('string');
			}
		});
	});


	/* a new test suite named "The menu" */
	describe('The menu', function() {
		/* a test that ensures the menu element is
		 * hidden by default. 
		 */
		it('menu element is hidden by default', function() {
			expect($('body').hasClass('menu-hidden')).toBeTruthy();
		});

		/* a test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * has two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
		it('clicking menu icon changes menu display', function() {
			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBeFalsy();
			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBeTruthy();
		});
	});

	/* a new test suite named "Initial Entries" */
	describe('Initial Entries', function() {
		/* a test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 */
		var numEntries = 0;
		beforeEach(function(done) {
			loadFeed(0, function() {
				numEntries = $(".feed").children().size();
				done();
			});
		});

		it("has at least one .entry element in .feed container", function() {
			expect(numEntries).toBeGreaterThan(0);
		});
	});

	/* a new test suite named "New Feed Selection"*/
	describe('New Feed Selection', function() {
		/* a test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 */
		var contentBefore, contentAfter;

		beforeEach(function(done) {
			loadFeed(0, function () {
				contentBefore = $('div.feed').html();
				done();
			});
		});

		it("content changes after load feed function runs", function(done) {
			loadFeed(1, function () {
				contentAfter = $('div.feed').html();
				expect(contentBefore).not.toBe(contentAfter);
				done();
			});
			
		});
	});
}());

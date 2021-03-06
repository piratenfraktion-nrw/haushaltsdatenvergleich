'use strict';

describe('defaultService', function() {
	it('should parse options in search query', function() {
		expect(hdv.defaultService._parseSearchQuery('')).toEqual({});
		expect(hdv.defaultService._parseSearchQuery('?product=123')).toEqual({
			product: '123'
		});
		expect(hdv.defaultService._parseSearchQuery('?product=123&account=456')).toEqual({
			product: '123',
			account: '456'
		});
	});
});
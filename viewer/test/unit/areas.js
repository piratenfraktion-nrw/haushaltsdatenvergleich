'use strict';

describe('area value utils', function() {
	it('should return inOut-value according to "compare" setting', function() {
		expect(hdv.areaValue.getValue([100, 10], 'in')).toEqual(100);
		expect(hdv.areaValue.getValue([100, 10], 'out')).toEqual(10);
		expect(hdv.areaValue.getValue([100, 10], 'sum')).toEqual(90);
	});

	it('should return inOut-sum of given account list', function() {
		var accountsInOut = {
			"611": [9269650, 4974823],
			"411": [null, 93863],
		};

		expect(hdv.areaValue.getInOutSum(accountsInOut, [611])).toEqual([9269650, 4974823]);
		expect(hdv.areaValue.getInOutSum(accountsInOut, [611, 411])).toEqual([9269650, 4974823 + 93863]);
		expect(hdv.areaValue.getInOutSum(accountsInOut, [620])).toEqual([0, 0]);
	});

	it('should return inOut in relation to a number', function() {
		expect(hdv.areaValue.getInOutInRelationTo([9269650, 4974823], 55.41)).toEqual([167292, 89782]);
		expect(hdv.areaValue.getInOutInRelationTo([9269650, 4974823], 8655)).toEqual([1071, 575]);
	});
});

describe('area layer utils', function() {
	it('should calculate a logarithmic opacity factor', function() {
		expect(hdv.areas.getOpacityFactor(10, [2, 1])).toEqual(0);
		expect(hdv.areas.getOpacityFactor(40, [2, 1])).toEqual(0.6);
		expect(hdv.areas.getOpacityFactor(70, [2, 1])).toEqual(0.85);
		expect(hdv.areas.getOpacityFactor(100, [2, 1])).toEqual(1);
		expect(hdv.areas.getOpacityFactor(-10, [2, 1])).toEqual(0);
	});

	it('should always find an useful opacity', function() {
		expect(hdv.areas.getOpacity(10, [2, 1])).toEqual(0.2);
		expect(hdv.areas.getOpacity(70, [2, 1])).toEqual(0.64);
		expect(hdv.areas.getOpacity(100, [2, 1])).toEqual(0.75);
	});

	it('should find a proper fillColor', function() {
		expect(hdv.areas.getFillColor(10, 'in')).toEqual('#00C957');
		expect(hdv.areas.getFillColor(10, 'out')).toEqual('#FF0000');
		expect(hdv.areas.getFillColor(10, 'sum')).toEqual('#00C957');
		expect(hdv.areas.getFillColor(-10, 'sum')).toEqual('#FF0000');
		expect(hdv.areas.getFillColor(0, 'in')).toEqual('#888');
	});

	it('should return a valid layerStyle', function() {
		expect(hdv.areas.getLayerStyle(10, [2, 1], 'sum')).toEqual({
			fillOpacity: 0.2,
			fillColor: '#00C957'
		});
	});
});

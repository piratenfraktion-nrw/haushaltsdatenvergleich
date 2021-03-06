'use strict';

describe('area value utils', function() {
	it('should return null-safe value of given product account values', function() {
		var values = {
			"100": '.',
			"200": 20
		};

		expect(hdv.areaValue.of(values, 200)).toEqual(20);
		expect(hdv.areaValue.of(values, 100)).toEqual(0);
		expect(hdv.areaValue.of(values, 10)).toEqual(0);
	});

	it('should return value in relation to a number', function() {
		expect(hdv.areaValue.getValueInRelationTo(9269650, 55.41)).toEqual(167292.01);
		expect(hdv.areaValue.getValueInRelationTo(4974823, 8655)).toEqual(574.79);
	});

	it('should generate a value label', function() {
		expect(hdv.areaValue.getLabel('Hundesteuer', 'Alle PG', 100, 'none', '2009', true)).toEqual('Alle PG<br />Ausgaben für Hundesteuer in 2009');
		expect(hdv.areaValue.getLabel('Hundesteuer', 'Alle PG', 6, 'population', '2010', false)).toEqual('Alle PG<br />Hundesteuer je Einwohner in 2010');
	});
});

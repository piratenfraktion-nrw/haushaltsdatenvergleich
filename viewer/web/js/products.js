'use strict';

(function(hdv, $, _) {
	var accounts = {
		selectedGroup: 'all',
		init: function() {
			$(hdv).on('map.loaded.data', _.bind(this.reset, this));
			$('.settings').on('change', _.bind(this.refresh, this));
		},
		reset: function() {
			this.resetAccountGroups();
			this.resetAccounts();
		},
		refresh: function() {
			if (this.selectedGroup !== $('select[name="pb"]').val()) {
				this.selectedGroup = $('select[name="pb"]').val();
				this.resetAccounts();
			}
		},
		resetAccountGroups: function() {
			var selectList = $('select[name="pb"]');
			selectList.empty();
			selectList.append($("<option />").val('all').text('Alle'));
			_.each(_.keys(hdv.map.data.tree), _.bind(function(groupKey) {
				this.addOption(selectList, groupKey);
			}, this));

			selectList.val(this.selectedGroup);
		},
		resetAccounts: function() {
			var selectList = $('select[name="pg"]');

			selectList.empty();
			if (this.selectedGroup === 'all') {
				this.addAllAccounts(selectList);
			} else {
				this.addAccountsOfGroup(selectList, this.selectedGroup);
			}

			selectList.val(this.selectedAccount);
		},
		addAllAccounts: function(selectList) {
			_.each(_.keys(hdv.map.data.tree), _.bind(function(groupKey) {
				var groupAccount = hdv.map.data.accounts[groupKey];
				var optGroup = $('<optgroup />').attr('label', groupAccount.label);
				this.addAccountsOfGroup(optGroup, groupKey);
				selectList.append(optGroup);
			}, this));
		},
		addAccountsOfGroup: function(parentElement, groupKey) {
			_.each(hdv.map.data.tree[groupKey], _.bind(function(accountKey) {
				this.addOption(parentElement, accountKey);
			}, this));
		},
		addOption: function(parentElement, accountKey) {
			var account = hdv.map.data.accounts[accountKey];
			parentElement.append($("<option />").val(account.key).text(account.label));
		},
		getSelectedAccount: function(selectedAccount) {
			return parseInt(selectedAccount, 10);
		}
	};

	/**
	 * Je Produktgruppe (Account) sind 6 Grenzwerte unter dem Attribut "data"
	 * vorhanden. Diese Grenzwerte unterteilen sich in 3 Gruppen, die das
	 * Attribut "relation" (Im Verhältnis zu?) abdecken: absolut / Einwohnerzahl /
	 * Fläche (in dieser Reihenfolge).<br />
	 * Jede Gruppe besteht aus 2 Werten: max und min<br />
	 * Max und Min steht immer für den maximalen bzw. minimalen Wert, den es für
	 * diese Produktgruppe über alle Areas (Gemeinden / Landkreise) hinweg gibt.
	 */
	var accountBoundaries = {
		findAccordingTo: function(settings) {
			var allBoundaries = hdv.map.data.accounts[settings.account].data;
			var relevantBoundaries = this.findRelevant(allBoundaries, settings.relation, settings.compare);
			return relevantBoundaries;
		},
		findRelevant: function(allBoundaries, relation, compare) {
			var startPos = 0;
			var length = 2;
			if (relation !== 'none') {
				startPos = relation === 'population' ? 8 : 16;
			}
			if (compare === 'in') {
				startPos += 4;
			} else if (compare === 'out') {
				startPos += 6;
			} else {
				length = 4;
			}

			var boundaries = [];
			for ( var i = startPos; i < startPos + length; i++) {
				boundaries.push(allBoundaries[i]);
			}
			return boundaries;
		},
		forValue: function(value, boundaries) {
			if (boundaries.length == 2) {
				return boundaries;
			}
			return value > 0 ? [boundaries[0], boundaries[1]] : [boundaries[2], boundaries[3]];
		},
		toLog10: function(boundaries) {
			var log10Boundaries = [];
			_.each(boundaries, _.bind(function(boundaryValue) {
				log10Boundaries.push(hdv.calc.safeLog10(boundaryValue));
			}, this));
			return log10Boundaries;
		}
	};

	hdv.accounts = accounts;
	hdv.accountBoundaries = accountBoundaries;
	accounts.init();
})(hdv, $, _);
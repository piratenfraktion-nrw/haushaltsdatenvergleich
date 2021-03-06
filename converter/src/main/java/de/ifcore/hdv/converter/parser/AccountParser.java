package de.ifcore.hdv.converter.parser;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import de.ifcore.hdv.converter.AccountLabels;
import de.ifcore.hdv.converter.data.Account;
import de.ifcore.hdv.converter.data.LongValue;
import de.ifcore.hdv.converter.utils.Utils;

public abstract class AccountParser extends AbstractColumnCsvParser<Account> {

	private static final int AREA_KEY = 1;
	private static final int AREA_LABEL = 2;
	private static final int ACCOUNT_KEY = 3;
	private static final int ACCOUNT_NAME = 4;
	private static final int VALUE_COLMN = 5;
	private AccountLabels labels = new AccountLabels();

	public AccountParser(Collection<String[]> lines) {
		super(lines, 7);
	}

	@Override
	protected List<Account> parseItem(String[] strings) {
		List<Account> result = new ArrayList<>();
		List<ColumnDefinition> columnDefinitions = getColumnDefinitions();
		if (strings.length == VALUE_COLMN + columnDefinitions.size()) {
			String areaKey = strings[AREA_KEY];
			if (isAreaKeyAcceptable(areaKey)) {
				String areaLabel = strings[AREA_LABEL];
				String accountKey = strings[ACCOUNT_KEY];
				String accountName = strings[ACCOUNT_NAME];
				if (isAreaKeyValid(areaKey) && Utils.hasText(accountKey)) {
					int parsedAccountKey = Integer.parseInt(accountKey);
					for (int x = 0; x < columnDefinitions.size(); x++) {
						ColumnDefinition cd = columnDefinitions.get(x);
						String value = strings[VALUE_COLMN + x];
						LongValue convertedValue = LongValue.valueOf(value);
						result.add(new Account(areaKey, areaLabel, cd.getKey(), cd.getLabel(), parsedAccountKey,
								accountName, convertedValue));
						addLabel(parsedAccountKey, accountName);
					}
				}
			}
		}
		return result;
	}

	protected void addLabel(int parsedAccountKey, String accountName) {
		labels.add(parsedAccountKey, accountName);
	}

	public AccountLabels getLabels() {
		return labels;
	}

	private boolean isAreaKeyValid(String areaKey) {
		return Utils.hasText(areaKey) && areaKey.length() == 8;
	}

	protected abstract boolean isAreaKeyAcceptable(String areaKey);
}

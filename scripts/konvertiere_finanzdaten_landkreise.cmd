@echo off
echo "Konvertiere Jahr 2009..."
java -Dpretty.json=true -cp ..\converter\target\converter-1.0-SNAPSHOT-jar-with-dependencies.jar de.ifcore.hdv.converter.CountyConverter "..\converter\data\finanzrechnungsstatistik-einnahmen-2009.csv" "..\converter\data\finanzrechnungsstatistik-ausgaben-2009.csv" "..\converter\data\Zensus Einwohnerzahlen.xls" "..\converter\data\Gemeinde Einwohnerzahlen Flaechen 31-03-2013.xls" "..\viewer\src\data\2009\landkreise"
echo "Konvertiere Jahr 2010..."
java -Dpretty.json=true -cp ..\converter\target\converter-1.0-SNAPSHOT-jar-with-dependencies.jar de.ifcore.hdv.converter.CountyConverter "..\converter\data\finanzrechnungsstatistik-einnahmen-2010.csv" "..\converter\data\finanzrechnungsstatistik-ausgaben-2010.csv" "..\converter\data\Zensus Einwohnerzahlen.xls" "..\converter\data\Gemeinde Einwohnerzahlen Flaechen 31-03-2013.xls" "..\viewer\src\data\2010\landkreise"
echo "Konvertiere Jahr 2011..."
java -Dpretty.json=true -cp ..\converter\target\converter-1.0-SNAPSHOT-jar-with-dependencies.jar de.ifcore.hdv.converter.CountyConverter "..\converter\data\finanzrechnungsstatistik-einnahmen-2011.csv" "..\converter\data\finanzrechnungsstatistik-ausgaben-2011.csv" "..\converter\data\Zensus Einwohnerzahlen.xls" "..\converter\data\Gemeinde Einwohnerzahlen Flaechen 31-03-2013.xls" "..\viewer\src\data\2011\landkreise"

## Pseudokód pro domácí úkol 5.

### Přehled
- Skript slouží k generování náhodných zaměstnanců a k vytváření statistik o zaměstnaneckých datech

### Funkce

#### 1. `getRandomInt(min, max)`
   - **Účel**: Vypočítá náhodné celé číslo v intervalu [min, max].
   - **Proces**:
     - Inicializace proměnné DELTA která nám umožní generovat číslo v celém intervalu
     - Inicializuj rozsah jako `max - min + DELTA`.
     - Generuj náhodné číslo v rozsahu
     - Vrať `náhodné číslo`.

#### 2. `getGender()`
   - **Účel**: Vybere náhodné pohlaví.
   - **Proces**:
     - Vytvoř pole pohlaví s hodnotami `["female", "male"]`.
     - Vyber index
     - Vrať `gender[index]`.

#### 3. `isLeapYear(year)`
   - **Účel**: Zjistit jestli rok je přestupný nebo ne.
   - **Proces**:
     - Vrať `True` pokud `(rok % 4 == 0 a rok % 100 != 0) nebo (rok % 400 == 0)`, jinak `False`.

#### 4. `februaryCheck(day, month, year)`
   - **Účel**: Kontroluje a opravuje 29. únor v nepřestupných letech.
   - **Proces**:
     - Pokud je 29. února `isLeapYear(rok)` vrátí `False`, pak vrať `28`.
     - V opačném případě vrať `den`.

#### 5. `birthdayIntervalEdges(minYear, maxYear, currentDate, birthday)`
   - **Účel**: Upravuje datum narození, pokud není v požadovaném intervalu.
   - **Proces**:
     - Definuj minAgeLimit a maxAgeLimit podle currentDate minus minYear a maxYear.
     - Pokud narození je později než minAgeLimit, zmenši rok narození.
     - Pokud narození je dříve než maxAgeLimit, zvětši rok narození.

#### 6. `getBirthday(minYear, maxYear)`
   - **Účel**: Generuje datum narození v daném věkovém rozmezí.
   - **Proces**:
     - Získej aktuální datum.
     - Nastav rok, měsíc a den pomocí getRandomInt.
     - Uprav den pro speciální případy (únor 29) pomocí `februaryCheck`.
     - Vytvoř datum narození jako `new Date(rok, měsíc, den)`.
     - Uprav datum narození pomocí `birthdayIntervalEdges`.
     - Vrať datum jako řetězec v ISO formátu.

#### 7. `getFemaleName()`
   - **Účel**: Vyber náhodné jméno ze seznamu.
   - **Proces**:
     - const femaleNames = [pole jmén]
     - Vyber náhodné jméno
     - Vrať jméno
     
#### 8. `getFemaleSurname()` 
   - **Účel**: Vybere náhodné příjmení ze seznamu.
   - **Proces**:
     - const femaleSurnames = [pole příjmení]
     - Vyber náhodné příjmení
     - Vrať příjmení

#### 9. `getMaleName()`
   - **Účel**: Vyber náhodné jméno ze seznamu.
   - **Proces**:
     - const maleNames = [pole jmén]
     - Vyber náhodné jméno
     - Vrať jméno
     
#### 10. `getMaleSurname()` 
   - **Účel**: Vybere náhodné příjmení ze seznamu.
   - **Proces**:
     - const maleSurnames = [pole příjmení]
     - Vyber náhodné příjmení
     - Vrať příjmení

#### 11. `getWorkload()`
   - **Účel**: Vybere náhodnou pracovní zátěž z pole.
   - **Proces**:
     - Definuj pole workload = `[10, 20, 30, 40]`.
     - Vyber náhodnou zátěž a vrať

#### 12. `generateEmployeeData(dtoIn)`
   - **Účel**: Generuje seznam zaměstnanců podle parametrů
   - **Proces**:
     - Inicializace proměnných:
          -  let count = dtoIn.count;
          -  let minAge = dtoIn.age.min;
          -  let maxAge = dtoIn.age.max;
          -  let employee = {};
          -  let employees = [];
     - Pokud `count < 0`, vyhoď chybu "Zadejte kladné číslo.".
     - Pokud `minAge < 18` nebo `minAge > maxAge`, vyhoď chybu "Neplatný věkový intervál.".
     - Pro každý index od 0 do count - 1:
        - Získej pohlaví let gender = getGender();
        - Inicializuj let name, surname;
        - Pokud pohlaví je žena 
            (gender === "female") {
            - potom použij funkce pro generování ženských jmen a příjmení
            - name = getFemaleName();
            - surname = getFemaleSurname();
        }
        - Jinak generuj mužská jména příjmení{
            - name = getMaleName();
            - surname = getMaleSurname();
        }

        -Vytvoř objekt employee a přidej ho do seznamu employees.
        - employee = {
            - gender: gender,
            - Získej datum narození birthdate: getBirthday(minAge, maxAge),
            - name: name,
            - surname: surname,
            - Získej zátěž práce  workload: getWorkload()
        };

     - Vrať employees

### 13. `incrementNameCount()`
   - **Účel**: Inkrementuje počet výskytu křestného jména v poli.
   - **Proces**:
     - Podívá se jestli jméno existuje pokud ano inkrementuje počet jestli ne inicializuje na 0 a přidá 1.

### 14. `categorizeAndCountEmployees()`
   - **Účel**: Rozdělí zaměstnance do kategorií a spočítá počet výskytu křestních jmén celkově i rozděleně v kategoriích.
   - **Proces**:
     - Inicializuj objekt categories s klíči: all, male, female, femalePartTime, maleFullTime
     - Pro všechny zaměstnance v poli:
        - Inkrementuj počet výskytů jména zaměstnance v kategorii all: použij incrementNameCount
        - Pokud je zaměstnanec muž:
            - Inkrementuj počet v kategorii male: použij incrementNameCount
            - Pokud je workload zaměstnance 40:
                -  inkrementuj také v maleFullTime: použij incrementNameCount
        - Pokud je zaměstnanec žena:    
            - Inkrementuj počet v kategorii female: použij incrementNameCount
            - Pokud workload zaměstnance není 40:
                -  inkrementuj také v femalePartTime: použij incrementNameCount
     - Vrať aktualizovaný objekt categories           
         

### 15. `transformToChartData()`
   - **Účel**: Převede seskupená data o jménech a jejich počtech na pole objektů podle požadovaného formátu.
   - **Proces**: Inicializuj prázdný objekt chartData.
     - Pro každou kategorii v poli counts:
        - Převeď mapu jmen a počtů na pole objektů {label, value}.
        - Seřaď toto pole podle počtu výskytu sestupně.
     - Vrať chartData.    

### 16. `getEmployeeChartContent()`
   - **Účel**: Zpracuje data zaměstnanců, vytvoří obsah pro chartData a transformuje jejich podobu.
   - **Proces**:
     - Generuj obsah pomocí categorizeAndCountEmployees().
     - Generovaný obsah transformuj pomocí transformToChartData().
     - Vrať výsledný obsah a transformavoná data.

#### 17. `main(dtoIn)`
   - **Účel**: Hlavní funkce pro spuštění generování zaměstnanců a dat pro grafy.
   - **Proces**:
     - Inicializace let dtoOut = [];
     - Generuj zaměstnance `generateEmployeeData`.
     - Pokud se nevygeneroval žádný zaměstnanec tak vrať prázdný dtoOut
     - Vytvoř obsah pro grafy pomocí `getEmployeeChartContent`.
     - Vrať dtoOut

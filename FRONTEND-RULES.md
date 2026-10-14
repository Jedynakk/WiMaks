# Zasady frontendu: bez wyglądu „zrobione przez AI”

Obowiązują przy każdej zmianie HTML, CSS, JS i tekstów na stronie. Każde odstępstwo wymaga uzasadnienia związanego z marką, zapisanego w komentarzu lub w odpowiedzi. „Tak wyszło” nie jest uzasadnieniem.

Źródło: artykuł „How to stop your frontend looking AI-generated” (jacob perks, Bootcamp, 2026), dostosowany do tego projektu.

## 1. Font

- Nie używaj domyślnych krojów: Inter, Roboto, Arial, Open Sans, Helvetica, system-ui jako głównego fontu.
- Wybierz krój świadomie (np. Manrope, Geist, Switzer). Zmiana fontu to pierwsza i najtańsza poprawka.
- Dwa fonty tylko wtedy, gdy wyraźnie się różnią: dekoracyjny do nagłówków plus spokojny do tekstu. Nigdy dwa podobne bezszeryfowe.
- Bez kursywy dla wyróżnień. Wyróżnienie to jeden stopień grubości wyżej (400 → 500).
- Nic grubszego niż bold. Bez cienkich i lekkich odmian (100–300) w tekście ciągłym.

## 2. Kolor i powierzchnie

- Zero gradientów: liniowych, radialnych, mesh, również w tekście.
- Płaskość rozwiązuj fakturą (ziarno SVG `feTurbulence`, opacity ok. 0.06 na jasnym tle), zdjęciami, warstwami i cieniami w odcieniu tła.
- Bez palety fioletowo-indygo-niebieskiej typowej dla startupów. Kolory bierz z czegoś realnego, związanego z marką (zdjęcie realizacji, logo, materiał).
- Jedna temperatura: albo ciepłe szarości i ciepła czerń, albo zimne. Nie mieszaj.
- Jeden kolor akcentu na całą stronę. Jeśli dwa kolory konkurują, jeden staje się neutralny.
- Bez czystej czerni `#000`. Bez świecących cieni (glow).
- Wszystkie cienie padają z jednego kierunku światła.

## 3. Układ

- Zakaz trzech równych kart w rzędzie jako domyślnego rozwiązania. Zamiast tego lista z liniami, bento, zygzak zdjęcie/tekst. Trzy karty najwyżej raz na stronę.
- Nie centruj wszystkiego. Nagłówki sekcji i tekst domyślnie do lewej, z asymetrią. Centrowanie tylko z konkretnego powodu.
- Nie każda grupa ma trzy elementy. Liczba wynika z treści.
- Nie wszystko jest kartą (ramka + cień + białe tło). Grupuj tłem albo odstępem. Kartę zostaw tam, gdzie coś faktycznie ma się wyróżniać.
- W siatkach kart nagłówki, opisy i przyciski zaczynają się na tej samej wysokości (stała wysokość nagłówka, `min-height` opisu, `margin-top: auto` na przycisku).
- Pełna wysokość ekranu: `min-height: 100dvh`, nigdy `height: 100vh`.
- Żadnego `z-index: 9999`. Duży z-index oznacza błędny kontekst nakładania.
- Bez stylów inline z układem (`style="display:grid; grid-template-columns:..."`). Układ w CSS, z wersją na telefon.
- Na telefonie (< 768px) jedna kolumna i brak poziomego przewijania. Sprawdzaj `document.documentElement.scrollWidth === innerWidth`.

## 4. Typografia

- Rozmiary tylko ze skali projektu. Bez przypadkowych wartości (`15px`, `1.4rem`, `text-[17px]`).
- Wielka litera tylko na początku zdania, także w nagłówkach, przyciskach i etykietach. Bez Title Case.
- Etykiety (eyebrow) to małe wersaliki z odstępem liter, nie kolejny nagłówek.
- Zawsze:

  ```css
  h1, h2, h3 { text-wrap: balance; }
  p { text-wrap: pretty; }
  ```

  zamiast ręcznych `<br>` w nagłówkach.
- W polskich tekstach twarda spacja po jednoliterowych spójnikach i przyimkach (`i&nbsp;`, `w&nbsp;`, `z&nbsp;`).
- Zaokrąglenia zagnieżdżone: promień wewnętrzny = promień zewnętrzny − odstęp (gdy odstęp < 32px).
- Pierwszy nagłówek nie krzyczy. Hierarchię buduj grubością i kolorem, nie samym rozmiarem.

## 5. Teksty

- Bez myślników jako pauzy retorycznej (—, –, „ - ”). Zamiast tego kropka albo przecinek.
- Bez trójek fraz i równoważników typu „Projekt, dokumentacja, wykonawstwo, odbiór.” Pisz pełnymi zdaniami.
- Zakazane słowa-wydmuszki: kompleksowy, innowacyjny, nowoczesne rozwiązania, najwyższa jakość, profesjonalizm, pasja, synergia, „w świecie...”, „odkryj”, „przenieś na wyższy poziom”. Po angielsku: elevate, seamless, unleash, supercharge, next-gen, game changer, delve.
- Hasło, które pasuje do każdej firmy z branży, jest złe. Pisz o konkretach: miejsce, obiekt, klient, rok.
- Przyciski i linki nazywają efekt: „Zobacz realizację szkoły na Moniuszki”, „Zadzwoń: 786 149 888”. Nie „Dowiedz się więcej”, „Wyślij”, „Kliknij tutaj”. Trzy linki „Zobacz więcej” obok siebie są niedopuszczalne.
- Bez okrągłych, wymyślonych liczb (100+, 99%, 50%). Tylko prawdziwe dane: „od 2007 roku”.
- Zero zmyślonej społecznej weryfikacji: opinii, ocen, liczby klientów, nagród, certyfikatów. Nie ma prawdziwych, to nie ma sekcji.
- Nie dopisuj obietnic, których firma nie złożyła. Nowe twierdzenie o firmie wymaga potwierdzenia od użytkownika.
- Komunikaty błędów mówią, co się stało i co zrobić. Bez „Ups!” i wykrzykników.
- Bez emoji w kodzie, treści i alt.

## 6. Ikony i zdjęcia

- Bez domyślnych zestawów ikon (Lucide, Feather, Material w stanie surowym) i clipartów z banków ikon jako głównej grafiki sekcji.
- Bez oczywistych metafor: rakieta = start, tarcza = bezpieczeństwo, żarówka = pomysł.
- Zdjęcia: najpierw prawdziwe zdjęcia realizacji. Pierwsze skojarzenie z branży (kask, uścisk dłoni, plan budowy) to zły wybór.
- Nie wygładzaj na siłę asymetrii w logo ani w grafikach. To ona odróżnia przedmiot od szablonu.
- Każdy `alt` opisuje, co widać, a nie „Ikona usługi”.

## 7. Dostępność i zachowanie

- Landmarki: `header`, `main`, `footer` jako rodzeństwo, nie zagnieżdżone.
- Wszystko, co rusza się samo dłużej niż 5 s (karuzela, marquee, wideo), ma przycisk pauzy z `aria-pressed` (WCAG 2.2.2). Stan przycisku bierz ze zdarzeń `play`/`pause` elementu.
- Każda animacja ma wersję dla `@media (prefers-reduced-motion: reduce)`.
- Pojawianie się elementów przy przewijaniu: `IntersectionObserver`, nigdy `addEventListener('scroll')`.
- Animuj tylko `transform` i `opacity`.
- Komplet stanów: hover, active, focus-visible, ładowanie, pusty, błąd. Nie tylko szczęśliwa ścieżka.
- Formularze: etykieta nad polem, błąd pod polem.

## 8. Metoda pracy

1. Najpierw zbuduj, potem przeglądaj.
2. Przegląd osobno dla każdej dziedziny: dostępność, układ, typografia, kolor, tekst, ogólne UI.
3. Każda uwaga ma dowód: dokładną wartość i miejsce (`plik:linia`).
4. Ten sam błąd w wielu miejscach to jedna uwaga z listą miejsc.
5. Waga: wysoka (wprowadza w błąd, zmyśla, wygląda jak AI), średnia (wyraźnie psuje jakość), niska (kosmetyka).
6. Kolejność poprawek: font → kolory i tła → stany interakcji → układ i odstępy → animacje → komponenty generyczne → stany puste i błędów → teksty → skala typografii.
7. „Brak uwag” to dopuszczalny wynik. Nie wymyślaj problemów, żeby wyglądać na pomocnego.
8. Po zmianie sprawdź w przeglądarce na komputerze i na szerokości 375px. Przy zmianie CSS podbij wersję w `styles.css?v=...` we wszystkich plikach HTML.

## 9. Kontrola przed oddaniem

- [ ] Brak Inter/Roboto/Arial jako głównego fontu?
- [ ] Brak gradientów i fioletowo-niebieskiej palety?
- [ ] Jeden akcent, jedna temperatura szarości?
- [ ] Brak rzędu trzech równych kart i wszechobecnego centrowania?
- [ ] Rozmiary fontów ze skali, sentence case, `text-wrap` ustawione?
- [ ] Brak myślników-pauz, słów-wydmuszek, okrągłych liczb, zmyślonych opinii?
- [ ] Przyciski nazywają efekt?
- [ ] Pauza dla ruchu, `prefers-reduced-motion`, poprawne landmarki, wszystkie stany?
- [ ] Brak poziomego przewijania na 375px?
- [ ] Każde odstępstwo od tych zasad ma zapisane uzasadnienie?

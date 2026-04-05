/**
 * Демо-дані мережі: 121 магазин у 12 містах (узгоджено з блоком статистики на головній).
 * Координати — наближені центри міст; кожен магазин злегка зміщений, щоб на мапі
 * при віддаленні точки зливались у кластер по місту, а при наближенні розходились.
 */

export const NETWORK_STATS = {
  storeCount: 121,
  cityCount: 12,
} as const;

type CitySeed = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  storeCount: number;
};

/** Розподіл магазинів по містах (сума = 121). */
const CITY_SEEDS: CitySeed[] = [
  { id: "kyiv", name: "Київ", lat: 50.4501, lng: 30.5234, storeCount: 22 },
  { id: "kharkiv", name: "Харків", lat: 49.9935, lng: 36.2304, storeCount: 15 },
  { id: "odesa", name: "Одеса", lat: 46.4825, lng: 30.7233, storeCount: 14 },
  { id: "dnipro", name: "Дніпро", lat: 48.4647, lng: 35.0462, storeCount: 12 },
  { id: "lviv", name: "Львів", lat: 49.8397, lng: 24.0297, storeCount: 11 },
  { id: "zaporizhzhia", name: "Запоріжжя", lat: 47.8388, lng: 35.1396, storeCount: 10 },
  { id: "kryvyirih", name: "Кривий Ріг", lat: 47.9105, lng: 33.3918, storeCount: 9 },
  { id: "mykolaiv", name: "Миколаїв", lat: 46.975, lng: 31.9946, storeCount: 8 },
  { id: "mariupol", name: "Маріуполь", lat: 47.0962, lng: 37.5464, storeCount: 7 },
  { id: "vinnytsia", name: "Вінниця", lat: 49.2328, lng: 28.4806, storeCount: 6 },
  { id: "chernihiv", name: "Чернігів", lat: 51.4982, lng: 31.2893, storeCount: 5 },
  { id: "poltava", name: "Полтава", lat: 49.5883, lng: 34.5514, storeCount: 2 },
];

const STREETS_BY_CITY: Record<string, string[]> = {
  kyiv: ["вул. Хрещатик", "вул. Ярославів Вал", "вул. Льва Толстого", "бул. Тараса Шевченка", "вул. Саксаганського"],
  kharkiv: ["вул. Сумська", "просп. Науки", "вул. Пушкінська", "вул. Алчевських", "вул. Гоголя"],
  odesa: ["вул. Дерибасівська", "вул. Катерининська", "вул. Грецька", "Французький бульвар", "вул. Рішельєвська"],
  dnipro: ["вул. Д. Яворницького", "просп. Поля", "вул. Короленка", "вул. Гагаріна", "вул. Нагірна"],
  lviv: ["пл. Ринок", "вул. Коперника", "вул. Січових Стрільців", "просп. Свободи", "вул. Городоцька"],
  zaporizhzhia: ["просп. Соборний", "вул. Олександрівська", "вул. Перемоги", "вул. Тургенєва", "вул. 12 Квітня"],
  kryvyirih: ["вул. Героїв АТО", "вул. Металургів", "вул. Вечірній", "вул. Поштова", "вул. Криворізька"],
  mykolaiv: ["вул. Соборна", "вул. Адміральська", "просп. Центральний", "вул. Чкалова", "вул. Спаська"],
  mariupol: ["вул. Миру", "просп. Металургів", "вул. Артема", "вул. Торгова", "вул. Грецька"],
  vinnytsia: ["вул. Соборна", "вул. Пирогова", "вул. Келецька", "вул. Зодчих", "вул. Хмельницького"],
  chernihiv: ["вул. Шевченка", "вул. Коцюбинського", "вул. П'ятницька", "вул. Мстиславська", "вул. Гонча"],
  poltava: ["вул. Соборності", "вул. Котляревського", "вул. Шевченка", "вул. Гоголя", "вул. Європейська"],
};

const FALLBACK_STREETS = ["вул. Шевченка", "вул. Франка", "вул. Незалежності", "просп. Миру"];

function hash01(n: number): number {
  const x = Math.sin(n * 127.1 + 19.7) * 43758.5453123;
  return x - Math.floor(x);
}

export type StoreLocation = {
  id: string;
  cityId: string;
  cityName: string;
  lat: number;
  lng: number;
  addressLine: string;
};

function buildStores(): StoreLocation[] {
  const out: StoreLocation[] = [];
  let globalIndex = 0;

  for (const city of CITY_SEEDS) {
    const streets = STREETS_BY_CITY[city.id] ?? FALLBACK_STREETS;
    for (let i = 0; i < city.storeCount; i++) {
      const seed = globalIndex * 31 + city.lat * 1e4;
      const dLat = (hash01(seed) - 0.5) * 0.045;
      const dLng = (hash01(seed + 1) - 0.5) * 0.058;
      const streetNum = Math.floor(hash01(seed + 2) * 78) + 1;
      const street = streets[Math.floor(hash01(seed + 3) * streets.length)]!;
      out.push({
        id: `${city.id}-${i + 1}`,
        cityId: city.id,
        cityName: city.name,
        lat: city.lat + dLat,
        lng: city.lng + dLng,
        addressLine: `${street}, ${streetNum}`,
      });
      globalIndex++;
    }
  }

  return out;
}

export const STORE_LOCATIONS: StoreLocation[] = buildStores();

export const STORE_CITY_SUMMARY = CITY_SEEDS.map((c) => ({
  id: c.id,
  name: c.name,
  storeCount: c.storeCount,
}));

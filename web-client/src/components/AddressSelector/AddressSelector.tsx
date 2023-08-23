export type Region = {
  id: number;
  psgc_code: string;
  region_name: string;
  region_code: string;
};

export type Province = {
  psgc_code: string;
  province_name: string;
  province_code: string;
  region_code: string;
};

export type City = {
  city_name: string;
  city_code: string;
  province_code: string;
  region_desc: string;
};

export type Barangay = {
  brgy_name: string;
  brgy_code: string;
  city_code: string;
  province_code: string;
  region_code: string;
};

const fetchData = async (territory: string) => {
  try {
    const res = await fetch(
      `https://isaacdarcilla.github.io/philippine-addresses/${territory}.json`
    );
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

const getRegions = async (): Promise<Region[]> => {
  const regionsData = await fetchData("region");
  return regionsData.map((region: Region) => ({
    id: region.id,
    psgc_code: region.psgc_code,
    region_name: region.region_name,
    region_code: region.region_code,
  }));
};

const getProvinces = async (code: string): Promise<Province[]> => {
  const provincesData = await fetchData("province");
  return provincesData
    .filter((province: Province) => province.region_code === code)
    .map((filtered: Province) => ({
      psgc_code: filtered.psgc_code,
      province_name: filtered.province_name,
      province_code: filtered.province_code,
      region_code: filtered.region_code,
    }));
};

const getCities = async (code: string): Promise<City[]> => {
  const citiesData = await fetchData("city");
  return citiesData
    .filter((city: City) => city.province_code === code)
    .map((filtered: City) => ({
      city_name: filtered.city_name,
      city_code: filtered.city_code,
      province_code: filtered.province_code,
      region_desc: filtered.region_desc,
    }));
};

const getBarangays = async (code: string): Promise<Barangay[]> => {
  const barangaysData = await fetchData("barangay");
  return barangaysData
    .filter((barangay: Barangay) => barangay.city_code === code)
    .map((filtered: Barangay) => ({
      brgy_name: filtered.brgy_name,
      brgy_code: filtered.brgy_code,
      province_code: filtered.province_code,
      region_code: filtered.region_code,
    }));
};

export { getRegions, getProvinces, getCities, getBarangays };

import React, { useState, useEffect, useCallback } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";

import { User } from "../../types/user";

import {
  getRegions,
  getProvinces,
  getCities,
  getBarangays,
  Region,
  Province,
  City,
  Barangay,
} from "./AddressSelector";

type TProps = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  userData?: null | User;
  setValue: UseFormSetValue<FieldValues> | undefined;
  inMalolos: boolean;
  style: string;
  getValues: UseFormGetValues<FieldValues> | undefined;
};

const AddressField: React.FC<TProps> = ({
  register,
  errors,
  userData,
  setValue,
  inMalolos,
  style,
  getValues,
}) => {
  const [regionsData, setRegionsData] = useState<Region[]>([]);
  const [provincesData, setProvincesData] = useState<Province[]>([]);
  const [citiesData, setCitiesData] = useState<City[]>([]);
  const [barangaysData, setBarangaysData] = useState<Barangay[]>([]);

  /* temporary, use ref instead of document.querySelector  */
  const selectedRegion = document.querySelector("#region") as HTMLSelectElement;
  const selectedProvince = document.querySelector(
    "#province"
  ) as HTMLSelectElement;
  const selectedCity = document.querySelector(
    "#municipality"
  ) as HTMLSelectElement;
  const selectedBarangay = document.querySelector(
    "#barangay"
  ) as HTMLSelectElement;
  const selectedStreet = document.querySelector("#street") as HTMLSelectElement;
  const getRegionsData = async () => {
    setRegionsData(await getRegions());
  };
  const formRegion = getValues?.("region") ?? "";
  const formProvince = getValues?.("province") ?? "";
  const formMunicipality = getValues?.("municipality") ?? "";
  const formBarangay = getValues?.("barangay") ?? "";

  useEffect(() => {
    if (inMalolos) {
      setValue?.("region", "Region III (Central Luzon)");
      setValue?.("province", "Bulacan");
      setValue?.("municipality", "City Of Malolos (Capital)");
      setValue?.("barangay", "");
      /* setValue?.("street", ""); */
    }
  }, [inMalolos, setValue]);

  const getProvincesData = useCallback(
    async (dataCode: string | null, action: string) => {
      if (
        action === "reset" &&
        selectedRegion &&
        selectedProvince &&
        selectedCity &&
        selectedBarangay &&
        selectedStreet
      ) {
        selectedProvince?.setAttribute("data-code", "000000");
        selectedCity?.setAttribute("data-code", "000000");
        selectedBarangay?.setAttribute("data-code", "000000");
        setProvincesData([]);
        setCitiesData([]);
        setBarangaysData([]);
        setValue?.("province", "");
        setValue?.("municipality", "");
        setValue?.("barangay", "");
      }
      dataCode && setProvincesData(await getProvinces(dataCode));
    },
    [
      setValue,
      selectedRegion,
      selectedProvince,
      selectedCity,
      selectedBarangay,
      selectedStreet,
    ]
  );

  const getCitiesData = useCallback(
    async (dataCode: string | null, action: string) => {
      if (
        action === "reset" &&
        selectedProvince &&
        selectedCity &&
        selectedBarangay &&
        selectedStreet
      ) {
        selectedCity?.setAttribute("data-code", "000000");
        selectedBarangay?.setAttribute("data-code", "000000");
        setCitiesData([]);
        setBarangaysData([]);
        /*    setValue?.("municipality", "");
        setValue?.("barangay", "");
        setValue?.("street", ""); */
      }
      dataCode && setCitiesData(await getCities(dataCode));
    },
    [selectedProvince, selectedCity, selectedBarangay, selectedStreet]
  );

  const getBarangaysData = useCallback(
    async (dataCode: string | null, action: string) => {
      if (
        action === "reset" &&
        selectedCity &&
        selectedBarangay &&
        selectedStreet
      ) {
        selectedBarangay.setAttribute("data-code", "000000");
        setBarangaysData([]);
        setValue?.("barangay", "");
        setValue?.("street", "");
      }
      dataCode && setBarangaysData(await getBarangays(dataCode));
    },
    [setValue, selectedCity, selectedBarangay, selectedStreet]
  );

  useEffect(() => {
    getRegionsData();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      /*  setValue?.("region", ""); */
      if (userData?.region || inMalolos || formRegion) {
        if (selectedRegion.getAttribute("data-code") !== "000000") {
          if (userData?.region) setValue?.("region", userData.region);
          else setValue?.("region", "");
          if (inMalolos) {
            setValue?.("region", "Region III (Central Luzon)");
          } else {
            if (formRegion) {
              setValue?.("region", formRegion);
            }
          }
        }
        const selectedRegionOption =
          selectedRegion.options[selectedRegion.selectedIndex];
        if (selectedRegionOption) {
          getProvincesData(selectedRegionOption.getAttribute("data-code"), "");
        }
      }
    }
  }, [
    regionsData,
    inMalolos,
    formRegion,
    getProvincesData,
    selectedRegion,
    setValue,
    userData?.region,
  ]);

  useEffect(() => {
    if (selectedProvince) {
      /* setValue?.("province", ""); */
      if (userData?.province || inMalolos || formProvince) {
        if (selectedProvince.getAttribute("data-code") !== "000000") {
          if (userData?.province) setValue?.("province", userData.province);
          else setValue?.("province", "");
          if (inMalolos) {
            setValue?.("province", "Bulacan");
          } else {
            if (formProvince) {
              setValue?.("province", formProvince);
            }
          }
        }
        const selectedProvinceOption =
          selectedProvince.options[selectedProvince.selectedIndex];
        if (selectedProvinceOption) {
          getCitiesData(selectedProvinceOption.getAttribute("data-code"), "");
        }
      }
    }
  }, [
    provincesData,
    inMalolos,
    formProvince,
    selectedProvince,
    setValue,
    getCitiesData,
    userData?.province,
  ]);

  useEffect(() => {
    if (selectedCity) {
      /*   setValue?.("municipality", ""); */
      if (userData?.municipality || inMalolos || formMunicipality) {
        if (selectedCity.getAttribute("data-code") !== "000000") {
          if (userData?.municipality)
            setValue?.("municipality", userData.municipality);
          else setValue?.("municipality", "");
          if (inMalolos) {
            setValue?.("municipality", "City Of Malolos (Capital)");
          } else {
            if (formMunicipality) {
              setValue?.("municipality", formMunicipality);
            }
          }
        }
        const selectedCityOption =
          selectedCity.options[selectedCity.selectedIndex];
        if (selectedCityOption) {
          getBarangaysData(selectedCityOption.getAttribute("data-code"), "");
        }
      }
    }
  }, [
    citiesData,
    inMalolos,
    formMunicipality,
    selectedCity,
    setValue,
    getBarangaysData,
    userData?.municipality,
  ]);

  useEffect(() => {
    if (selectedBarangay) {
      if (userData?.barangay || formBarangay)
        if (selectedBarangay.getAttribute("data-code") !== "000000") {
          if (userData?.barangay) setValue?.("barangay", userData.barangay);
          if (formBarangay) {
            setValue?.("barangay", formBarangay);
          }
        }
    }
  }, [
    barangaysData,
    formBarangay,
    selectedBarangay,
    setValue,
    userData?.barangay,
  ]);

  return (
    <>
      <>
        <div
          className={
            style === "auth"
              ? `my-3 ${inMalolos && "hidden"}`
              : `form-group w-full ${inMalolos && "hidden"}`
          }
        >
          <label
            htmlFor="region"
            className={
              style === "auth" ? "text-md  text-gray-500" : "form-label"
            }
          >
            Regions
          </label>

          <select
            className={`
            ${
              style === "auth"
                ? "w-full bg-gray-200 border border-gray-300 p-2 rounded-md"
                : "border p-2 w-full"
            } p-2 rounded
          `}
            id="region"
            {...register("region", { required: true })}
            onInput={(e) => {
              const selectElement = e.target as HTMLSelectElement;

              getProvincesData(
                selectElement.selectedOptions[0]?.getAttribute("data-code"),
                "reset"
              );
            }}
          >
            <option value="" hidden>
              Select Region
            </option>
            {regionsData.map((item, index) => (
              <option
                key={index}
                value={item.region_name}
                data-code={item.region_code}
              >
                {item.region_name}
              </option>
            ))}
          </select>
          {errors.region && (
            <span className="text-red-500">Region is required</span>
          )}
        </div>

        <div
          className={
            style === "auth"
              ? `my-3 ${inMalolos && "hidden"}`
              : `form-group w-full ${inMalolos && "hidden"}`
          }
        >
          <label
            htmlFor="province"
            className={
              style === "auth" ? "text-md  text-gray-500" : "form-label"
            }
          >
            Province
          </label>

          <select
            className={`
            ${
              style === "auth"
                ? "w-full bg-gray-200 border border-gray-300 p-2 rounded-md"
                : "border p-2 w-full"
            } p-2 rounded
          `}
            id="province"
            {...register("province", { required: true })}
            onInput={(e) => {
              const selectElement = e.target as HTMLSelectElement;

              getCitiesData(
                selectElement.selectedOptions[0]?.getAttribute("data-code"),
                "reset"
              );
            }}
          >
            {provincesData.length === 0 ? (
              <option value="" hidden>
                Select Region
              </option>
            ) : (
              <option value="" hidden>
                Select Province
              </option>
            )}
            {provincesData &&
              provincesData.length > 0 &&
              provincesData.map((item, index) => (
                <option
                  key={index}
                  value={item.province_name}
                  data-code={item.province_code}
                >
                  {item.province_name}
                </option>
              ))}
          </select>
          {errors.province && (
            <span className="text-red-500">Province is required</span>
          )}
        </div>

        <div
          className={
            style === "auth"
              ? `my-3 ${inMalolos && "hidden"}`
              : `form-group w-full ${inMalolos && "hidden"}`
          }
        >
          <label
            htmlFor="municipality"
            className={
              style === "auth" ? "text-md  text-gray-500" : "form-label"
            }
          >
            Municipality
          </label>

          <select
            className={`
            ${
              style === "auth"
                ? "w-full bg-gray-200 border border-gray-300 p-2 rounded-md"
                : "border p-2 w-full"
            } p-2 rounded
          `}
            id="municipality"
            {...register("municipality", { required: true })}
            onInput={(e) => {
              const selectElement = e.target as HTMLSelectElement;

              getBarangaysData(
                selectElement.selectedOptions[0]?.getAttribute("data-code"),
                "reset"
              );
            }}
          >
            {citiesData.length === 0 ? (
              <option value="" hidden>
                Select Province
              </option>
            ) : (
              <option value="" hidden>
                Select Municipality
              </option>
            )}

            {citiesData &&
              citiesData.length > 0 &&
              citiesData.map((item, index) => (
                <option
                  key={index}
                  value={item.city_name}
                  data-code={item.city_code}
                >
                  {item.city_name}
                </option>
              ))}
          </select>
          {errors.municipality && (
            <span className="text-red-500">Municipality is required</span>
          )}
        </div>
      </>

      <div className={style === "auth" ? `my-3` : "form-group w-full"}>
        <label
          htmlFor="barangay"
          className={style === "auth" ? "text-md  text-gray-500" : "form-label"}
        >
          Barangay
        </label>

        <select
          className={`
            ${
              style === "auth"
                ? "w-full bg-gray-200 border border-gray-300 p-2 rounded-md"
                : "border p-2 w-full"
            } p-2 rounded
          `}
          id="barangay"
          {...register("barangay", { required: true })}
          onInput={() => {
            if (selectedStreet) {
              selectedStreet.value = "";
            }
          }}
        >
          {barangaysData.length === 0 ? (
            <option value="" hidden>
              Select Municipality
            </option>
          ) : (
            <option value="" hidden>
              Select Barangay
            </option>
          )}
          {barangaysData &&
            barangaysData.length > 0 &&
            barangaysData.map((item, index) => (
              <option
                key={index}
                value={item.brgy_name}
                data-code={item.brgy_code}
              >
                {item.brgy_name}
              </option>
            ))}
        </select>
        {errors.barangay && (
          <span className="text-red-500">Barangay is required</span>
        )}
      </div>
      <div className={style === "auth" ? `my-3` : "form-group w-full"}>
        <label
          htmlFor="street"
          className={style === "auth" ? "text-md  text-gray-500" : "form-label"}
        >
          Street
        </label>
        <input
          type="text"
          id="street"
          className={
            style === "auth"
              ? "w-full bg-gray-200 border border-gray-300 p-2 rounded-md"
              : "border rounded p-2 w-full"
          }
          placeholder="Street"
          {...register("street", { required: true })}
        />
        {errors.street && (
          <span className="text-red-500">Street is required</span>
        )}
      </div>
    </>
  );
};

export default AddressField;

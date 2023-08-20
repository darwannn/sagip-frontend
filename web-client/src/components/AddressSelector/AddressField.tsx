import React, { useState, useEffect } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

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
  setValue: any;
  inMalolos: boolean;
  style: string;
};

const AddressField: React.FC<TProps> = ({
  register,
  errors,
  userData,
  setValue,
  inMalolos,
  style,
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

  /* useEffect(() => {
    const getMalolosBarangays = async () => {
      if (inMalolos) {
        setBarangaysData(await getBarangays("031410"));
      }
    };
    getMalolosBarangays();
  }, [inMalolos]); */
  /* when the selector value has been changed, the values of other selectors depending on it must be reset or set to an empty string */
  const getProvincesData = async (dataCode: string | null, action: string) => {
    if (
      action === "reset" &&
      selectedRegion &&
      selectedProvince &&
      selectedCity &&
      selectedBarangay &&
      selectedStreet
    ) {
      selectedProvince.value = "";
      selectedCity.value = "";
      selectedBarangay.value = "";
      selectedStreet.value = "";

      selectedProvince?.setAttribute("data-code", "000000");
      selectedCity?.setAttribute("data-code", "000000");
      selectedBarangay?.setAttribute("data-code", "000000");
      setProvincesData([]);
      setCitiesData([]);
      setBarangaysData([]);
      /* reset({
        province: "",
        municipality: "",
        barangay: "",
        street: "",
      }); */
    }
    dataCode && setProvincesData(await getProvinces(dataCode));
  };

  const getCitiesData = async (dataCode: string | null, action: string) => {
    if (
      action === "reset" &&
      selectedProvince &&
      selectedCity &&
      selectedBarangay &&
      selectedStreet
    ) {
      selectedCity.value = "";
      selectedBarangay.value = "";
      selectedStreet.value = "";
      selectedCity?.setAttribute("data-code", "000000");
      selectedBarangay?.setAttribute("data-code", "000000");
      setCitiesData([]);
      setBarangaysData([]);
      /*  reset({
        municipality: "",
        barangay: "",
        street: "",
      }); */
    }
    dataCode && setCitiesData(await getCities(dataCode));
  };

  const getBarangaysData = async (dataCode: string | null, action: string) => {
    if (
      action === "reset" &&
      selectedCity &&
      selectedBarangay &&
      selectedStreet
    ) {
      selectedBarangay.value = "";
      selectedStreet.value = "";
      console.log("selectedBarangay");

      selectedBarangay.setAttribute("data-code", "000000");
      setBarangaysData([]);
      /* reset({
        barangay: "",
        street: "",
      }); */
    }
    dataCode && setBarangaysData(await getBarangays(dataCode));
  };

  useEffect(() => {
    getRegionsData();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      selectedRegion.value = "";
      if (userData?.region || inMalolos) {
        if (selectedRegion.getAttribute("data-code") !== "000000") {
          if (userData?.region) selectedRegion.value = userData.region;
          if (inMalolos) {
            selectedRegion.value = "Region III (Central Luzon)";
            setValue("region", "Region III (Central Luzon)");
          }
        }
        const selectedRegionOption =
          selectedRegion.options[selectedRegion.selectedIndex];
        if (selectedRegionOption) {
          getProvincesData(selectedRegionOption.getAttribute("data-code"), "");
        }
      }
    }
  }, [regionsData, inMalolos]);

  useEffect(() => {
    if (selectedProvince) {
      selectedProvince.value = "";
      if (userData?.province || inMalolos) {
        if (selectedProvince.getAttribute("data-code") !== "000000") {
          if (userData?.region) selectedProvince.value = userData.province;
          if (inMalolos) {
            selectedProvince.value = "Bulacan";

            setValue("province", "Bulacan");
          }
        }
        const selectedProvinceOption =
          selectedProvince.options[selectedProvince.selectedIndex];
        if (selectedProvinceOption) {
          getCitiesData(selectedProvinceOption.getAttribute("data-code"), "");
        }
      }
    }
  }, [provincesData, inMalolos]);

  useEffect(() => {
    if (selectedCity) {
      selectedCity.value = "";
      if (userData?.municipality || inMalolos) {
        if (selectedCity.getAttribute("data-code") !== "000000") {
          if (userData?.municipality)
            selectedCity.value = userData.municipality;
          if (inMalolos) {
            selectedCity.value = "City Of Malolos (Capital)";
            setValue("municipality", "City Of Malolos (Capital)");
          }
        }
        const selectedCityOption =
          selectedCity.options[selectedCity.selectedIndex];
        if (selectedCityOption) {
          getBarangaysData(selectedCityOption.getAttribute("data-code"), "");
        }
      }
    }
  }, [citiesData, inMalolos]);

  useEffect(() => {
    if (userData?.barangay && selectedBarangay) {
      if (selectedBarangay.getAttribute("data-code") !== "000000") {
        selectedBarangay.value = userData.barangay;
      }
    }
  }, [barangaysData]);

  return (
    <>
      {/*  {inMalolos !== true && ( */}
      <>
        <div
          className={
            style === "auth"
              ? `my-3 ${inMalolos && "hidden"}`
              : `flex flex-col mt-5 p-2 w-full lg:w-1/2 xl:w-1/3 ${
                  inMalolos && "hidden"
                }`
          }
        >
          <label
            htmlFor="region"
            className={style === "auth" ? "text-md  text-gray-500" : ""}
          >
            Regions
          </label>

          <select
            className={
              style === "auth"
                ? "w-full bg-gray-200 border border-gray-300 p-1 rounded-md"
                : "border p-1 w-full"
            }
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
              : `flex flex-col mt-5 p-2 w-full lg:w-1/2 xl:w-1/3 ${
                  inMalolos && "hidden"
                }`
          }
        >
          <label
            htmlFor="province"
            className={style === "auth" ? "text-md  text-gray-500" : ""}
          >
            Province
          </label>

          <select
            className={
              style === "auth"
                ? "w-full bg-gray-200 border border-gray-300 p-1 rounded-md"
                : "border p-1 w-full"
            }
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
              : `flex flex-col mt-5 p-2 w-full lg:w-1/2 xl:w-1/3 ${
                  inMalolos && "hidden"
                }`
          }
        >
          <label
            htmlFor="municipality"
            className={style === "auth" ? "text-md  text-gray-500" : ""}
          >
            Municipality
          </label>

          <select
            className={
              style === "auth"
                ? "w-full bg-gray-200 border border-gray-300 p-1 rounded-md"
                : "border p-1 w-full"
            }
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
      {/* )} */}

      <div
        className={
          style === "auth"
            ? `my-3 ${inMalolos && "hidden"}`
            : "flex flex-col mt-5 p-2 w-full lg:w-1/2 xl:w-1/3"
        }
      >
        <label
          htmlFor="barangay"
          className={style === "auth" ? "text-md  text-gray-500" : ""}
        >
          Barangay
        </label>

        <select
          className={
            style === "auth"
              ? "w-full bg-gray-200 border border-gray-300 p-1 rounded-md"
              : "border p-1 w-full"
          }
          id="barangay"
          {...register("barangay", { required: true })}
          onInput={() => {
            if (selectedStreet) {
              selectedStreet.value = "";
              /* reset({
                street: "",
              }); */
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
      <div
        className={
          style === "auth"
            ? `my-3 ${inMalolos && "hidden"}`
            : "flex flex-col mt-5 p-2 w-full lg:w-1/2 xl:w-1/3"
        }
      >
        <label
          htmlFor="street"
          className={style === "auth" ? "text-md  text-gray-500" : ""}
        >
          Street
        </label>
        <input
          type="text"
          id="street"
          className={
            style === "auth"
              ? "w-full bg-gray-200 border border-gray-300 p-1 rounded-md"
              : "border p-1 w-full"
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

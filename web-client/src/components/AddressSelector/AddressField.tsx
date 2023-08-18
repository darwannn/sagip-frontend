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
  reset: any;
};

const AddressField: React.FC<TProps> = ({
  register,
  errors,
  userData,
  reset,
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
      reset({
        province: "",
        municipality: "",
        barangay: "",
        street: "",
      });
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
      reset({
        municipality: "",
        barangay: "",
        street: "",
      });
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
      reset({
        barangay: "",
        street: "",
      });
    }
    dataCode && setBarangaysData(await getBarangays(dataCode));
  };

  useEffect(() => {
    getRegionsData();
  }, []);

  useEffect(() => {
    if (userData?.region && selectedRegion) {
      if (selectedRegion.getAttribute("data-code") !== "000000") {
        selectedRegion.value = userData.region;
      }
      const selectedRegionOption =
        selectedRegion.options[selectedRegion.selectedIndex];
      if (selectedRegionOption) {
        getProvincesData(selectedRegionOption.getAttribute("data-code"), "");
      }
    }
  }, [regionsData]);

  useEffect(() => {
    if (userData?.province && selectedProvince) {
      if (selectedProvince.getAttribute("data-code") !== "000000") {
        selectedProvince.value = userData.province;
      }
      const selectedProvinceOption =
        selectedProvince.options[selectedProvince.selectedIndex];
      if (selectedProvinceOption) {
        getCitiesData(selectedProvinceOption.getAttribute("data-code"), "");
      }
    }
  }, [provincesData]);

  useEffect(() => {
    if (userData?.municipality && selectedCity) {
      if (selectedCity.getAttribute("data-code") !== "000000") {
        selectedCity.value = userData.municipality;
      }
      const selectedCityOption =
        selectedCity.options[selectedCity.selectedIndex];
      if (selectedCityOption) {
        getBarangaysData(selectedCityOption.getAttribute("data-code"), "");
      }
    }
  }, [citiesData]);

  useEffect(() => {
    if (userData?.barangay && selectedBarangay) {
      if (selectedBarangay.getAttribute("data-code") !== "000000") {
        selectedBarangay.value = userData.barangay;
      }
    }
  }, [barangaysData]);

  return (
    <>
      <div className="flex flex-col mt-5 p-2 w-full lg:w-1/2 xl:w-1/3">
        <label htmlFor="region">Regions</label>

        <select
          className="border p-1 w-full"
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

      <div className="flex flex-col mt-5 p-2 w-full lg:w-1/2 xl:w-1/3">
        <label htmlFor="province">Province</label>

        <select
          className="border p-1 w-full"
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

      <div className="flex flex-col mt-5 p-2 w-full lg:w-1/2 xl:w-1/3">
        <label htmlFor="municipality">Municipality</label>

        <select
          className="border p-1 w-full"
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

      <div className="flex flex-col mt-5 p-2 w-full lg:w-1/2 xl:w-1/3">
        <label htmlFor="barangay">Barangay</label>

        <select
          className="border p-1 w-full"
          id="barangay"
          {...register("barangay", { required: true })}
          onInput={() => {
            if (selectedStreet) {
              selectedStreet.value = "";
              reset({
                street: "",
              });
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
      <div className="flex flex-col mt-5 p-2 w-full lg:w-1/2 xl:w-1/3">
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          className="border p-1 w-full"
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

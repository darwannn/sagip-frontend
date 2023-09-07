/**
 * This component shall be deleted later.
 * This has the possible solution for the react-select and react-hook-form bug
 */
// import { useEffect, useState } from "react";
// import {
//   Control,
//   Controller,
//   FieldErrors,
//   FieldValues,
//   UseFormRegister,
//   UseFormSetValue,
//   UseFormWatch,
// } from "react-hook-form";

// import Select from "react-select";
// import {
//   Province,
//   Region,
//   getProvinces,
//   getRegions,
// } from "../../../../components/AddressSelector/AddressSelector";
// import { User } from "../../../../types/user";

// type AddressGroupProps = {
//   userData: User | undefined;
//   control: Control;
//   register: UseFormRegister<FieldValues>;
//   errors: FieldErrors;
//   watch: UseFormWatch<FieldValues>;
// };

// type OptionsType = {
//   value: string;
//   label: string;
// };

// const AddressGroup: React.FC<AddressGroupProps> = ({
//   userData,
//   control,
//   register,
//   errors,
//   watch,
// }) => {
//   const [regions, setRegions] = useState<OptionsType[]>([]);
//   const [provinces, setProvinces] = useState<OptionsType[]>([]);
//   const [cities, setCities] = useState([]);
//   const [barangays, setBarangays] = useState([]);

//   const region = watch("region");
//   const province = watch("province");
//   const city = watch("city");

//   useEffect(() => {
//     const fetchRegion = async () => {
//       getRegions().then((regionsData) => {
//         const regionsOpt = regionsData.map((region: Region) => ({
//           value: region.region_name,
//           label: region.region_name,
//         }));
//         setRegions(regionsOpt);
//       });
//     };

//     fetchRegion();
//   }, [setRegions]);

//   useEffect(() => {
//     const fetchProvinces = async () => {
//       getProvinces(region).then((provincesData) => {
//         const provinceFiltered = provincesData.map((province: Province) => ({
//           value: province.province_name,
//           label: province.province_name,
//         }));
//         console.log(region);
//         setProvinces(provinceFiltered);
//       });
//     };

//     fetchProvinces();
//   }, [region, setProvinces]);

//   // useEffect(() => {

//   return (
//     <>
//       <div className="form-group col-span-3">
//         <label htmlFor="street" className="form-label">
//           Street
//         </label>
//         <input
//           type="text"
//           id="street"
//           className="border p-2 rounded w-full"
//           placeholder="Street"
//           {...register("street", { required: true })}
//         />
//         {errors.street && (
//           <span className="text-red-500">Street is required</span>
//         )}
//       </div>
//       <div className="form-group">
//         <label htmlFor="region" className="form-label">
//           Region
//         </label>
//         <Controller
//           control={control}
//           name="region"
//           defaultValue={userData?.region}
//           render={({ field: { onChange, value } }) => {
//             return (
//               <Select
//                 options={regions}
//                 className="w-full p-1"
//                 placeholder="Select Region"
//                 value={regions.filter((region) => region.value === value)}
//                 onChange={(val) => onChange(val?.value)}
//               />
//             );
//           }}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="region" className="form-label">
//           Province
//         </label>
//         <Controller
//           control={control}
//           name="province"
//           render={({ field }) => (
//             <Select
//               options={provinces}
//               className="w-full p-1"
//               placeholder="Select Province"
//               {...field}
//             />
//           )}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="region" className="form-label">
//           Municipality
//         </label>
//         <Controller
//           control={control}
//           name="muninicipality"
//           render={({ field }) => (
//             <Select
//               options={[]}
//               className="w-full p-1"
//               placeholder="Select Municipality"
//               {...field}
//             />
//           )}
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="region" className="form-label">
//           Barangay
//         </label>
//         <Controller
//           control={control}
//           name="barangay"
//           render={({ field }) => (
//             <Select
//               options={[]}
//               className="w-full p-1"
//               placeholder="Select Barangay"
//               {...field}
//             />
//           )}
//         />
//       </div>
//     </>
//   );
// };

// export default AddressGroup;

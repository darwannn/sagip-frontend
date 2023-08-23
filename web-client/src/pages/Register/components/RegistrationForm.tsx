import { useState } from "react";
import { Link } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useAppSelector } from "../../../store/hooks";

import AuthForm from "../../../components/Form/AuthForm";
import RegisterEmail from "./RegisterEmail";
import RegisterPassword from "./RegisterPassword";
import RegisterPersonalInfo from "./RegisterPersonalInfo";
import RegisterAddress from "./RegisterAddress";
import RegisterContactNumber from "./RegisterContactNumber";

import Modal from "../../../components/Modal/Modal";

import moment from "moment";
import TermsOfUse from "./TermsOfUse";
import PrivacyPolicy from "./PrivacyPolicy";

const RegisterForm = () => {
  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
  const [showTermsOfUseModal, setShowTermsOfUseModal] = useState(false);

  const displayedRegisterPage = useAppSelector(
    (state) => state.auth.displayedRegisterPage
  );

  /* useEffect(() => {
    console.log(displayedRegisterPage);
  }, [displayedRegisterPage]); */

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firstname: "",
      middlename: "",
      lastname: "",

      birthdate: moment(Date.now()).format("YYYY-MM-DD"),
      gender: "",
      password: "",
      confirmPassword: "",
      email: "",
      contactNumber: "",

      region: "",
      province: "",
      municipality: "",
      barangay: "",
      street: "",
    },
  });

  return (
    <>
      {/*  <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-1 rounded w-full"
        onClick={() => {
          console.log("clicked");
          dispatch(
            setDisplayedRegisterPage(
              displayedRegisterPage === "password"
                ? "email"
                : displayedRegisterPage === "personal"
                ? "password"
                : displayedRegisterPage === "address"
                ? "personal"
                : displayedRegisterPage === "contact"
                ? "address"
                : ""
            )
          );
        }}
      >
        <BsArrowLeft className="text-2xl text-gray-500 mb-3" />
      </button>
 */}
      <AuthForm
        component={
          <>
            {/* <div
              className={`${
                displayedRegisterPage !== "email" ? "hidden" : "visible"
              }`}
            > */}
            {displayedRegisterPage === "email" && (
              <RegisterEmail
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
              />
            )}
            {/*  </div> */}
            {/*  <div
              className={`${
                displayedRegisterPage !== "password" ? "hidden" : "visible"
              }`}
            > */}
            {displayedRegisterPage === "password" && (
              <RegisterPassword
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
              />
            )}
            {/* </div> */}
            {displayedRegisterPage === "personal" && (
              <RegisterPersonalInfo
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
              />
            )}
            {displayedRegisterPage === "address" && (
              <>
                <RegisterAddress
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                  setValue={setValue}
                  getValues={getValues}
                />
              </>
            )}
            {displayedRegisterPage === "contact" && (
              <RegisterContactNumber
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
              />
            )}
            {displayedRegisterPage === "privacy-policy" && (
              <RegisterContactNumber
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
              />
            )}
            {displayedRegisterPage === "terms-of-use" && (
              <RegisterContactNumber
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
              />
            )}
            <Modal
              modalTitle={"Privacy Policy"}
              modalShow={showPrivacyPolicyModal}
              modalClose={() => setShowPrivacyPolicyModal(false)}
            >
              <PrivacyPolicy />
            </Modal>
            <Modal
              modalTitle={"Terms of Use"}
              modalShow={showTermsOfUseModal}
              modalClose={() => setShowTermsOfUseModal(false)}
            >
              <TermsOfUse />
            </Modal>

            <div className="text-center text-xs m-5">
              By signing up you agree to our{" "}
              <Link
                to="#"
                className="underline font-semibold"
                onClick={() => setShowTermsOfUseModal(true)}
              >
                Terms of Use
              </Link>
              {" and "}
              <Link
                to="#"
                className="underline font-semibold"
                onClick={() => setShowPrivacyPolicyModal(true)}
              >
                Privacy Policy
              </Link>
            </div>
          </>
        }
      />
    </>
  );
};

export default RegisterForm;

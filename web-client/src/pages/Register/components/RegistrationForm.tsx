import { useState } from "react";
import { Link } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useAppSelector } from "../../../store/hooks";

import moment from "moment";

import RegistrationEmail from "./RegistrationEmail";
import RegistrationPassword from "./RegistrationPassword";
import RegistrationPersonalInfo from "./RegistrationPersonalInfo";
import RegistrationAddress from "./RegistrationAddress";
import RegistrationContactNumber from "./RegistrationContactNumber";

import Modal from "../../../components/Modal/Modal";
import AuthForm from "../../../components/Form/AuthForm";
import TermsOfUse from "./TermsOfUse";
import PrivacyPolicy from "./PrivacyPolicy";

const RegisterForm = () => {
  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
  const [showTermsOfUseModal, setShowTermsOfUseModal] = useState(false);

  const displayedRegisterPage = useAppSelector(
    (state) => state.auth.displayedRegisterPage
  );

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
      <AuthForm
        component={
          /*      <div className="min-h-screen flex">
        <div className="w-full flex flex-col p-8 bg-gray-50"> */
          <>
            {displayedRegisterPage === "email" && (
              <RegistrationEmail
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
              />
            )}

            {displayedRegisterPage === "password" && (
              <RegistrationPassword
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
              />
            )}

            {displayedRegisterPage === "personal-info" && (
              <RegistrationPersonalInfo
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
              />
            )}
            {displayedRegisterPage === "address" && (
              <>
                <RegistrationAddress
                  register={register}
                  handleSubmit={handleSubmit}
                  errors={errors}
                  setValue={setValue}
                  getValues={getValues}
                />
              </>
            )}
            {displayedRegisterPage === "contact" && (
              <RegistrationContactNumber
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
          /*  </div>
          </div> */
        }
      />
    </>
  );
};

export default RegisterForm;

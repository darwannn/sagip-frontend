import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import { setAuthToken } from "../../../util/auth";
import { AuthResponse } from "../../../types/auth";
import {
  useRegisterMutation,
  useValidataInputMutation,
} from "../../../services/authQuery";
import { TUserResData, User } from "../../../types/user";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setDisplayedRegisterPage } from "../../../store/slices/authSlice";

import moment from "moment";

import Modal from "../../../components/Modal/Modal";
import AuthForm from "../../../components/Form/AuthForm";
import TermsAndCondition from "./TermsAndCondition";
import PrivacyPolicy from "./PrivacyPolicy";

import RegistrationEmail from "./RegistrationEmail";
import RegistrationPassword from "./RegistrationPassword";
import RegistrationPersonalInfo from "./RegistrationPersonalInfo";
import RegistrationAddress from "./RegistrationAddress";
import RegistrationContactNumber from "./RegistrationContactNumber";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [serverRes, setServerRes] = useState<TUserResData>();
  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
  const [showTermsAndConditionModal, setShowTermsAndConditionModal] =
    useState(false);

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

  const displayedRegisterPage = useAppSelector(
    (state) => state.auth.displayedRegisterPage
  );
  const [
    validate,
    {
      isError: validateIsError,
      isLoading: validateIsLoading,
      isSuccess: validateIsSuccess,
    },
  ] = useValidataInputMutation();

  const [
    registration,
    {
      isError: registerIsError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterMutation();

  const SubmitData = async (data: FieldValues) => {
    let nextPage = "";
    if (displayedRegisterPage === "email") nextPage = "password";
    else if (displayedRegisterPage === "password") nextPage = "personal-info";
    else if (displayedRegisterPage === "personal-info") nextPage = "address";
    else if (displayedRegisterPage === "address") nextPage = "contact";
    if (
      displayedRegisterPage === "email" ||
      displayedRegisterPage === "password" ||
      displayedRegisterPage === "contact"
    ) {
      let res;
      let body: Partial<User> = {};
      if (displayedRegisterPage === "contact") {
        body = {
          firstname: data.firstname,
          middlename: data.middlename,
          lastname: data.lastname,
          birthdate: moment(data.birthdate).format("YYYY-MM-DD"),
          gender: data.gender,

          password: data.password,
          confirmPassword: data.confirmPassword,

          email: data.email,
          contactNumber: data.contactNumber,

          region: data.region,
          province: data.province,
          municipality: data.municipality,
          barangay: data.barangay,
          street: data.street,
        };
        res = await registration(body);
      } else {
        if (displayedRegisterPage === "email")
          body = {
            email: data.email,
          };
        if (displayedRegisterPage === "password")
          body = {
            password: data.password,
            confirmPassword: data.confirmPassword,
          };
        /*  if (displayedRegisterPage === "personal-info")
        body = {
          firstname: data.firstname,
          middlename: data.middlename,
          lastname: data.lastname,
          birthdate: moment(data.birthdate).format("YYYY-MM-DD"),
          gender: data.gender,
        };
      if (displayedRegisterPage === "address")
        body = {
          region: data.region,
          province: data.province,
          municipality: data.municipality,
          barangay: data.barangay,
          street: data.street,
        }; */

        if (body && displayedRegisterPage) {
          res = await validate({
            body,
            action: displayedRegisterPage,
          });
        }
      }

      if (res && "data" in res) {
        const resData: AuthResponse = res.data;
        if (resData.success) {
          setServerRes(res.data);
          if (displayedRegisterPage === "contact") {
            setAuthToken({
              token: resData.token || "",
            });
            navigate("/register/contact-verification");
          } else {
            dispatch(setDisplayedRegisterPage(nextPage));
          }
        }
      } else {
        if (res && "error" in res && "data" in res.error) {
          const errData = res.error.data as TUserResData;
          setServerRes(errData);
        }
      }
    } else {
      dispatch(setDisplayedRegisterPage(nextPage));
    }
  };

  const onRegister: SubmitHandler<FieldValues> = async (data) => {
    SubmitData(data);
  };

  if (registerIsLoading || validateIsLoading) console.log("Registering...");
  if (registerIsError || validateIsError) console.log("Registration Error");
  if (registerIsSuccess || validateIsSuccess)
    console.log("Registered successfully");

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
                serverRes={serverRes}
                onSubmit={onRegister}
                onLoading={registerIsLoading || validateIsLoading}
              />
            )}

            {displayedRegisterPage === "password" && (
              <RegistrationPassword
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                serverRes={serverRes}
                onSubmit={onRegister}
                onLoading={registerIsLoading || validateIsLoading}
              />
            )}
            {displayedRegisterPage === "personal-info" && (
              <RegistrationPersonalInfo
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                /* serverRes={serverRes} */
                onSubmit={onRegister}
                onLoading={registerIsLoading || validateIsLoading}
              />
            )}
            {displayedRegisterPage === "address" && (
              <>
                <RegistrationAddress
                  register={register}
                  handleSubmit={handleSubmit}
                  setValue={setValue}
                  getValues={getValues}
                  errors={errors}
                  /* serverRes={serverRes} */
                  onSubmit={onRegister}
                  onLoading={registerIsLoading || validateIsLoading}
                />
              </>
            )}
            {displayedRegisterPage === "contact" && (
              <RegistrationContactNumber
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                serverRes={serverRes}
                onSubmit={onRegister}
                onLoading={registerIsLoading || validateIsLoading}
              />
            )}
            <Modal
              modalTitle={""}
              modalShow={showPrivacyPolicyModal}
              modalClose={() => setShowPrivacyPolicyModal(false)}
            >
              <PrivacyPolicy />
            </Modal>
            <Modal
              modalTitle={""}
              modalShow={showTermsAndConditionModal}
              modalClose={() => setShowTermsAndConditionModal(false)}
            >
              <TermsAndCondition />
            </Modal>

            <div className="text-center text-xs m-5">
              By signing up you agree to our{" "}
              <Link
                to="#"
                className="underline font-semibold"
                onClick={() => setShowTermsAndConditionModal(true)}
              >
                Terms And Condition
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

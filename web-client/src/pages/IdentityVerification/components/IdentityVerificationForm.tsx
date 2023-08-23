import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { setDisplayedVerificationPage } from "../../../store/slices/authSlice";

import { BsArrowLeft } from "react-icons/bs";

import AuthForm from "../../../components/Form/AuthForm";
import VerificationNotice from "./VerificationNotice";

import Modal from "../../../components/Modal/Modal";

import moment from "moment";
import VerificationRequirements from "./VerificationRequirements";

const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
  const [showTermsOfUseModal, setShowTermsOfUseModal] = useState(false);

  const displayedVerificationPage = useAppSelector(
    (state) => state.auth.displayedVerificationPage
  );

  /* useEffect(() => {
    console.log(displayedVerificationPage);
  }, [displayedVerificationPage]); */

  const {
    register,
    handleSubmit,
    setValue,
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
          <>
            {displayedVerificationPage === "notice" && <VerificationNotice />}

            {displayedVerificationPage === "requirements" && (
              <VerificationRequirements />
            )}
          </>
        }
      />
    </>
  );
};

export default RegisterForm;

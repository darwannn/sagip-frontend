import { useParams } from "react-router-dom";

const VerifyUserPage = () => {
  const id = useParams();
  console.log(id);
  return (
    <>
      <h1>Verify User Page</h1>
    </>
  );
};

export default VerifyUserPage;

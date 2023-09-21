import { BiLoaderAlt } from "react-icons/bi";

const LoaderSpin: React.FC<{ className?: string }> = ({ className }) => (
  <BiLoaderAlt className={`animate-spin ${className}`} />
);

export { LoaderSpin };

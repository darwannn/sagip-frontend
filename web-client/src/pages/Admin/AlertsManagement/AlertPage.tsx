import SMSForm from "./components/SMSForm";
import SMSTemplates from "./components/SMSTemplates";

const AlertPage = () => {
  return (
    <div className="p-10 h-screen flex flex-col">
      <div className="pb-5">
        <h1 className="text-2xl font-bold text-primary-500">Send SMS Alerts</h1>
        <p>Send SMS alerts to all or specific barangays.</p>
      </div>
      <hr />
      <div className="grow grid grid-flow-col grid-cols-5">
        <SMSForm />
        <SMSTemplates />
      </div>
    </div>
  );
};

export default AlertPage;

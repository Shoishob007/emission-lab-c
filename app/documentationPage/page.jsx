import ComingSoon from "../../components/coming-soon";

export default function DocumentationPage() {
  return (
    <>
    <ComingSoon text="Register First" subtext={
        <>
        We&apos;re working to bring you the best experience.<br />
          Unfortunately, only the <span className="font-bold">Business Users</span> get the access and implementation details of our API Documentation.<br />
          So you need to register first to get the APIs! <br />
          For more info, email us at <br />
          <span className="font-semibold">info@aiemissionlab.om</span>
        </>
      }  />
    </>
  );
}
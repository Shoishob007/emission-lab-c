import ComingSoon from "../../components/coming-soon";

export default function DocumentationPage() {
  return (
    <>
    <ComingSoon text="Coming Soon" subtext={
        <>
          We&apos;re working to bring you the best experience.<br />
          Please check back soon for updates! <br />
          For more info, email us at <br />
          <span className="font-semibold">info@aiemissionlab.om</span>
        </>
      }  />
    </>
  );
}
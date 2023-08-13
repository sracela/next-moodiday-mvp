"use client";
import React, { useEffect } from "react";

type HubspotContactFormProps = {
  region: string;
  portalId: string;
  formId: string;
};

const HubspotContactForm = (props: {}) => {
  //   const { region, portalId, formId } = props;
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/v2.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      // @ts-ignore
      if (window.hbspt) {
        // @ts-ignore
        window.hbspt.forms.create({
          region: "na1",
          portalId: "22398621",
          formId: "2d92060c-cd73-42e2-b932-942b5cfda52d",
          target: "#hubspotForm",
        });
      }
    });
  }, []);

  return (
    <div className="pt-5">
      <div id="hubspotForm"></div>
    </div>
  );
};

export default HubspotContactForm;

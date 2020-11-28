import React, { ChangeEvent, useContext, useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { InputTracking } from "../../../components/InputTracking";
import { NormalButton } from "../../../components/NormalButton";

export const TimeTrackingForm: React.FC<{afterSubmit:() => void; timeStart:Date;timeEnd:Date;}> = ({afterSubmit,timeStart,timeEnd}) => {
  const [values, setValues] = useState({
    description: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/tracking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"description":values.description}),
    });
    afterSubmit();
  };

  return (
    <>
      <form onSubmit={onSubmitForm}> 
        
        <InputTracking
          name="description"
          type="text"
          label="What did you do?"
          onChange={fieldDidChange}
          required
        />
       
        <NormalButton type="submit" css={`
              font-size: 16px;
              float:right;
            `}>Save Timer</NormalButton>
      </form>
    </>
  );
};

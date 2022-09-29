import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { EmailService } from "../../Services";
import { Email } from "../../Types";

export default function CampagneList() {
  const [Mail, setMail] = useState<Array<Email>>([]);
    useEffect(() => {
        retrieveEmail();
    }, []);
    const retrieveEmail = () => {
        EmailService.getEmails()
            .then((response: any) => {
                setMail(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                toast.error("error while charging caompagne :" + e);
            })           
        }
    }

  return (
    <div>
        {Mail && Mail.map()}
      <h1>P</h1>
    </div>
  );
}

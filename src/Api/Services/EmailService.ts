import http from "../http-common";
import { Email } from "../Models/Email";

  /**
   * retourne la liste des emails
   * @returns Retourne une promesse de type Email[]
   * @see Email
   * @see src/Types/Email.ts
   */
  const getEmails = () => {
    return http.get<Array<Email[]>>("/emails");
  };

  /**
   * retourne l'email par son id
   * @param id - Id de l'email
   * @returns Retourne une promesse de type Email
   * @see Email
   * @see src/Types/Email.ts
   */
  const getEmailById = (id: string) => {
    return http.get<Email>(`/emails/${id}`);
  };

  /**
   * update l'email
   * @param id - Id de l'email
   * @param email
   * @returns Retourne une promesse de type Email
   */
  const updateEmail = (id: string, email: Email) => {
    return http.post<Email>(`/emails/${id}`, "PUT", { data: email });
  };

  /**
   * create un email
   * @param email
   * @returns Retourne une promesse de type Email
   */
  const createEmail = (email: Email) => {
    return http.post<Email>(`/emails`, "POST", { data: email });
  };

  /**
   * delete un email
   * @param id - Id de l'email
   * @returns Retourne une promesse de type Email
   */
  const deleteEmail = (id: string) => {
    return http.delete<Email>(`/emails/${id}`);
  };


const EmailService = {
  getEmails,
  getEmailById,
  updateEmail,
  createEmail,
  deleteEmail,
};

export default EmailService;

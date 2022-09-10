import { callAPI } from "../Modules/api";
import { Email } from "../Types";

export const EmailService = {
  /**
   * retourne la liste des emails
   * @returns Retourne une promesse de type Email[]
   * @see Email
   * @see src/Types/Email.ts
   */
  getEmails() {
    return callAPI<Email[]>("/emails", "GET");
  },

  /**
   * retourne l'email par son id
   * @param id - Id de l'email
   * @returns Retourne une promesse de type Email
   * @see Email
   * @see src/Types/Email.ts
   */
  getEmailById(id: string) {
    return callAPI<Email>(`/emails/${id}`, "GET");
  },

  /**
   * update l'email
   * @param id - Id de l'email
   * @param email
   * @returns Retourne une promesse de type Email
   */
  updateEmail(id: string, email: Email) {
    return callAPI<Email>(`/emails/${id}`, "PUT", { data: email });
  },

  /**
   * create un email
   * @param email
   * @returns Retourne une promesse de type Email
   */
  createEmail(email: Email) {
    return callAPI<Email>(`/emails`, "POST", { data: email });
  },

  /**
   * delete un email
   * @param id - Id de l'email
   * @returns Retourne une promesse de type Email
   */
  deleteEmail(id: string) {
    return callAPI<Email>(`/emails/${id}`, "DELETE");
  },
};

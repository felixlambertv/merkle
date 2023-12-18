import {
  FormAdminResponse,
  FormUserResponse,
} from "./../response/Form.response";
import { UserPayload } from "./../types/types.d";
import { IFormRepository } from "./../repositories/Form.repository";
import { FormRequest } from "../request/Form.request";
import { Form } from "../model/Form.model";

export interface IFormService {
  createForm(request: FormRequest): Promise<Form>;
  getAllForm(
    user: UserPayload | null
  ): Promise<FormAdminResponse[] | FormUserResponse[]>;
}

export class FormService implements IFormService {
  constructor(private formRepo: IFormRepository) {}
  async getAllForm(
    user: UserPayload | null
  ): Promise<FormAdminResponse[] | FormUserResponse[]> {
    const data = await this.formRepo.getAllForm();
    if (user) {
      return data.map((data): FormAdminResponse => {
        return {
          id: data.id,
          name: data.name,
          address: data.address,
          phoneNumber: data.phoneNumber,
          notes: data.notes,
        };
      });
    }
    return data.map((data): FormUserResponse => {
      return {
        id: data.id,
        name: data.name,
        notes: data.notes,
      };
    });
  }

  async createForm(request: FormRequest): Promise<Form> {
    return await this.formRepo.createForm(request);
  }
}

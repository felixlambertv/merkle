import { Database } from "sqlite3";
import { FormRequest } from "./../request/Form.request";
import { Form } from "../model/Form.model";

export interface IFormRepository {
  getAllForm(): Promise<Form[]>;
  createForm(request: FormRequest): Promise<Form>;
}

export class FormRepository implements IFormRepository {
  constructor(private db: Database) {}

  async getAllForm(): Promise<Form[]> {
    const query = "SELECT * FROM form";
    const data: Form[] = await new Promise((resolve, reject) => {
      this.db.all(query, [], (err, rows: Form[]) => {
        if (err) {
          reject(new Error("Error getting data"));
        } else {
          resolve(rows);
        }
      });
    });

    return data;
  }

  async createForm(request: FormRequest): Promise<Form> {
    const { name, address, phoneNumber, notes } = request;
    const query =
      "INSERT INTO form (name, address, phoneNumber, notes) VALUES (?, ?, ?, ?)";
    const params = [name, address, phoneNumber, notes];

    const id = await new Promise<number>((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });

    const form: Form = {
      id,
      name,
      address,
      phoneNumber,
      notes,
    };

    return form;
  }
}

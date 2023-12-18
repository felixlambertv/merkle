import { UserPayload } from "./../types/types.d";
import { FormRequest } from "./../request/Form.request";
import { Form } from "../model/Form.model";
import { IFormRepository } from "./../repositories/Form.repository";
import { FormService, IFormService } from "./../service/Form.service";

describe("Form Service Test", () => {
  let formService: IFormService;
  let formRepoMock: jest.Mocked<IFormRepository>;

  beforeEach(() => {
    formRepoMock = {
      getAllForm: jest.fn(),
      createForm: jest.fn(),
    };
    formService = new FormService(formRepoMock);
  });

  const formMock: Form = {
    id: 1,
    name: "form 1",
    address: "address 1",
    phoneNumber: "123123213",
    notes: "notes 1",
  };

  const userPayloadMock: UserPayload = {
    userId: 1,
    username: "admin",
  };

  describe("get all form", () => {
    it("user should success get form and get user form response", async () => {
      formRepoMock.getAllForm.mockResolvedValueOnce([formMock]);
      const result = await formService.getAllForm(null);
      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("name");
      expect(result[0]).not.toHaveProperty("address");
      expect(result[0]).not.toHaveProperty("phoneNumber");
      expect(result[0]).toHaveProperty("notes");
    });

    it("admin should success get form and get admin form response", async () => {
      formRepoMock.getAllForm.mockResolvedValueOnce([formMock]);
      const result = await formService.getAllForm(userPayloadMock);
      expect(result[0]).toHaveProperty("id");
      expect(result[0]).toHaveProperty("name");
      expect(result[0]).toHaveProperty("address");
      expect(result[0]).toHaveProperty("phoneNumber");
      expect(result[0]).toHaveProperty("notes");
    });
  });

  describe("create form", () => {
    it("should success create form", async () => {
      const request: FormRequest = {
        name: formMock.name,
        address: formMock.address,
        phoneNumber: formMock.phoneNumber,
        notes: formMock.notes,
      };

      formRepoMock.createForm.mockResolvedValueOnce(formMock);
      const result = await formService.createForm(request);
      expect(result.id).toBe(formMock.id);
      expect(result.name).toBe(formMock.name);
      expect(result.address).toBe(formMock.address);
      expect(result.phoneNumber).toBe(formMock.phoneNumber);
      expect(result.notes).toBe(formMock.notes);
    });
  });
});
function FormUserResponse(FormUserResponse: any) {
  throw new Error("Function not implemented.");
}

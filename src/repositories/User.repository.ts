import { Database } from "sqlite3";
import { User } from "./../model/User.model";
export interface IUserRepository {
  findUserByUserName(username: string): Promise<User | null>;
}

export class UserRepository implements IUserRepository {
  constructor(private db: Database) {}

  async findUserByUserName(username: string): Promise<User | null> {
    const query = "SELECT * FROM user WHERE username = ?";
    return await new Promise<User | null>((resolve, reject) => {
      this.db.get(query, [username], (err, data: User) => {
        if (err) {
          reject(err);
          return;
        }
        if (data) {
          resolve(data);
        } else {
          resolve(null);
        }
      });
    });
  }
}

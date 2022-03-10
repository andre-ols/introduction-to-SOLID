import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute({ user_id }: IRequest): User[] {
    if (!user_id)
      throw new Error("User id is required.");

    const userIsAdmin = this.usersRepository.findById(user_id);

    if (!userIsAdmin) throw new Error("User not found.");
    if (!userIsAdmin.admin) throw new Error("User is not admin.");

    const users = this.usersRepository.list();
    return users;
  }

}

export { ListAllUsersUseCase };


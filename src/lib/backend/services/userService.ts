import { DAOFactory } from "../daoPackages/DAOFactory";
import { UserDAO } from "../daoPackages/DAOInterfaces";

export class UserService {
  private userDAO: UserDAO;

  constructor(daoFactory: DAOFactory) {
    this.userDAO = daoFactory.createUserDAO();
  }

  public async getUser(userId: string) {
    // TODO: check authentication?
    try {
      return await this.userDAO.getUser(userId);
    } catch (error) {
      console.error("Error in UserService.getUser:", error);
      throw error;
    }
  }

  public async createUser(firstName: string, lastName: string) {
    try {
      const user = new User(firstName, lastName);
      return await this.userDAO.createUser(user);
    } catch (error) {
      console.error("Error in UserService.createUser:", error);
      throw error;
    }
  }
}

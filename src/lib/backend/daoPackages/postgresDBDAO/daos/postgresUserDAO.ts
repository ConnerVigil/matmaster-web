import { Pool } from "pg";
import { UserDAO } from "../../DAOInterfaces";

export class PostgresUserDAO implements UserDAO {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      port: parseInt(process.env.PG_PORT || "5432"),
    });
  }

  public async getUser(alias: string): Promise<UserDTO | null> {
    try {
      const client = await this.pool.connect();
      const result = await client.query(
        "SELECT * FROM users WHERE alias = $1",
        [alias]
      );
      client.release();

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows[0] as UserDTO;
    } catch (error) {
      console.error("Error in PostgresUserDAO.getUser:", error);
      throw error;
    }
  }

  public async createUser(user: User): Promise<void> {
    try {
      const client = await this.pool.connect();
      await client.query(
        "INSERT INTO users (alias, name, email) VALUES ($1, $2, $3)",
        [user.name, user.email]
      );
      client.release();
    } catch (error) {
      console.error("Error in PostgresUserDAO.createUser:", error);
      throw error;
    }
  }
}

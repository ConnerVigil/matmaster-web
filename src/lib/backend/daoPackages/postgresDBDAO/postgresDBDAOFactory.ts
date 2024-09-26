import { DAOFactory } from "../DAOFactory";
import {
  // AuthTokenDAO,
  // FeedDAO,
  // FollowsDAO,
  // S3DAO,
  // StoryDAO,
  UserDAO,
} from "../DAOInterfaces";
// import { DynamoDBAuthTokenDAO } from "./daos/DynamoDBAuthTokenDAO";
// import { DynamoDBFeedDAO } from "./daos/DynamoDBFeedDAO";
// import { DynamoDBFollowsDAO } from "./daos/DynamoDBFollowsDAO";
// import { DynamoDBS3DAO } from "./daos/DynamoDBS3DAO";
// import { DynamoDBStoryDAO } from "./daos/DynamoDBStoryDAO";
import { PostgresUserDAO } from "./daos/postgresUserDAO";

export class PostgresDBDAOFactory implements DAOFactory {
  createUserDAO(): UserDAO {
    return new PostgresUserDAO();
  }

  // createFeedDAO(): FeedDAO {
  //   return new DynamoDBFeedDAO();
  // }

  // createS3DAO(): S3DAO {
  //   return new DynamoDBS3DAO();
  // }

  // createStoryDAO(): StoryDAO {
  //   return new DynamoDBStoryDAO();
  // }

  // createFollowsDAO(): FollowsDAO {
  //   return new DynamoDBFollowsDAO();
  // }

  // createAuthTokenDAO(): AuthTokenDAO {
  //   return new DynamoDBAuthTokenDAO();
  // }
}

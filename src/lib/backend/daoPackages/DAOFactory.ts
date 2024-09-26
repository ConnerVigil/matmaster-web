import {
  UserDAO,
  // FeedDAO,
  // S3DAO,
  // StoryDAO,
  // FollowsDAO,
  // AuthTokenDAO,
} from "./DAOInterfaces";

export interface DAOFactory {
  createUserDAO(): UserDAO;
  // createFeedDAO(): FeedDAO;
  // createS3DAO(): S3DAO;
  // createStoryDAO(): StoryDAO;
  // createFollowsDAO(): FollowsDAO;
  // createAuthTokenDAO(): AuthTokenDAO;
}

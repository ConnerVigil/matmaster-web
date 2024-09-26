export interface UserDAO {
  createUser(user: UserDTO): Promise<void>;
  getUser(alias: string): Promise<UserDTO | null>;
  // updateUserCounts(
  //   alias: string,
  //   followerCountChange: number,
  //   followingCountChange: number
  // ): Promise<void>;
  // deleteUser(alias: string): Promise<void>;
}

// export interface FeedDAO {
//   addStatusToFeed(status: Status, followerAlias: string): Promise<void>;
//   getPageOfStatuses(
//     followerAlias: string,
//     pageSize: number,
//     lastStatusTimeStamp: number | undefined
//   ): Promise<DataPage<StatusDTO>>;
//   addStatusToFeeds(status: Status, followerAliases: string[]): Promise<void>;
// }

// export interface S3DAO {
//   uploadImage(
//     fileName: string,
//     imageStringBase64Encoded: string
//   ): Promise<string>;
//   getFileUrl(fileKey: string): Promise<string | null>;
//   deleteFile(fileKey: string): Promise<void>;
// }

// export interface StoryDAO {
//   addStatusToStory(status: Status): Promise<void>;
//   getPageOfStatuses(
//     alias: string,
//     pageSize: number,
//     lastStatusTimeStamp: number | undefined
//   ): Promise<DataPage<StatusDTO>>;
// }

// export interface FollowsDAO {
//   getFollow(
//     followerAlias: string,
//     followeeAlias: string
//   ): Promise<FollowDTO | undefined>;
//   createFollow(follow: FollowDTO): Promise<void>;
//   deleteFollow(followerHandle: string, followeeHandle: string): Promise<void>;
//   getPageOfFollowees(
//     followerHandle: string,
//     pageSize: number,
//     lastFolloweeHandle: string | undefined
//   ): Promise<DataPage<FollowDTO>>;
//   getPageOfFollowers(
//     followeeHandle: string,
//     pageSize: number,
//     lastFollowerHandle: string | undefined
//   ): Promise<DataPage<FollowDTO>>;
//   getFollowersForAlias(alias: string): Promise<FollowDTO[]>;
// }

// export interface AuthTokenDAO {
//   createAuthToken(authToken: AuthToken, alias: string): Promise<void>;
//   getAuthToken(token: string): Promise<AuthTokenDTO | null>;
//   renewAuthToken(token: string): Promise<void>;
//   deleteAuthToken(token: string): Promise<void>;
//   deleteAllAuthTokens(alias: string): Promise<void>;
// }

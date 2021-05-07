import { gql } from "@apollo/client";

export const USER_ROOMS = gql`
  query GetRoom {
    usersRooms {
      rooms {
        id
        name
        roomPic
      }
    }
  }
`;

export const ROOM_MESSAGES = gql`
  query GetMessages($id: String!)  {
    room(id: $id) {
      messages {
        id
        body
        insertedAt
        user {
          firstName
          id
          profilePic
        }
      }
    }
  }
`;

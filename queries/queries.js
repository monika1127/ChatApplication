import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query GetCurrentUser {
    user {
      email
      firstName
      id
      lastName
      profilePic
      role
    }
  }
`;

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
  query GetMessages($id: ID!) {
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

export const SEND_MESSAGE = gql`
  mutation sendMessage($body: String!, $roomId: String!) {
    sendMessage(body: $body, roomId: $roomId) {
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
`;

export const MESSAGE_ADDED = gql`
  subscription MessageAdded($roomId: String!) {
    messageAdded(roomId: $roomId) {
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
`;

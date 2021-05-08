export const formatMessage = (message) => {
  const { id, body, insertedAt, user } = message;
  return {
    _id: id,
    text: body,
    createdAt: new Date(insertedAt.replace(" ", "T")),
    user: {
      _id: user.id,
      name: user.firstName,
      avatar: user.profilePic,
    },
  };
};

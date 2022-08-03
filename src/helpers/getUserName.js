
export const getUserName = (contacts, id) => {
  if (contacts) {
    const regEx1 = id?.replace("{", "");
    const regEx2 = regEx1?.replace("}", "");
    const some = contacts?.find((u) => u._id === regEx2);
    return `${some?.firstName} ${some?.lastName}`;
  }
};

export const getUserNameChat = (contacts, postedBy, user) => {
  if (contacts.length > 0) {
    const regEx1 = postedBy?.replace("{", "");
    const regEx2 = regEx1?.replace("}", "");
    const nam = contacts.find((u) => u._id === regEx2);
    return nam._id === user._id
      ? "Me"
      : `${nam.firstName + " " + nam.lastName}`;
  }
};
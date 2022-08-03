
export const findUserById = (user, userIds) => {

  const UId = userIds?.find((id) => {
    const regEx1 = id?.replace("{", "");
    const regEx2 = regEx1?.replace("}", "");
    return regEx2 !== user._id;
  });
  return UId;
};
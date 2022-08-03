export const getFilteredContacts = (contacts, typer) => {
  return contacts?.filter(
    ({ firstName, lastName }) =>
      firstName.toLowerCase().includes(typer.toLocaleLowerCase()) ||
      lastName.toLowerCase().includes(typer.toLocaleLowerCase())
  );
};

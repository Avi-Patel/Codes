export const updateHeaderDate = () => {
  let date = new Date();
  document.querySelector("#headerDate").textContent = `${date.toDateString()}`;
};
updateHeaderDate();

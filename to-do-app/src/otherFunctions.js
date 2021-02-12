export const updateHeaderDate = () => {
  let date = new Date();
  document.querySelector("#headerDate").textContent = `${date.toDateString()}`;
};

export const showSnackbar = (message) => {
  var snackbar = document.getElementById("snackbar");
  snackbar.className = "show";
  snackbar.textContent = message;
  setTimeout(function () {
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000);
};

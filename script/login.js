const singIn = () => {
  const userName = document.getElementById("input-username").value;
  const password = document.getElementById("input-password").value;

  console.log(userName, password);

  if (userName === "admin" && password === "admin123") {
    alert("Login successful");
    window.location.href = "index.html";
  } else {
    alert("Wrong Credential");
  }
};

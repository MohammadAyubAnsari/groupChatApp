async function login(event) {
  try {
    event.preventDefault();
    loginDetials = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    const response = await axios.post(
      "http://localhost:3000/user/login",
      loginDetials,
      { Credentials: "include" }
    );

    if (response.status === 201) {
      alert(response.data.message);
      console.log(response.data.message);
      localStorage.setItem("token", response.data.message);
    } else {
      throw new Error(" Failed to Login");
    }
  } catch (err) {
    document.body.innerHTML = `<div style="color:red">${err}</div>`;
  }
}

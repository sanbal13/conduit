export default function validate(errors, name, value) {
  switch (name) {
    case 'username':
      let usernameError =
        value.length < 6 ? 'Username must be atleast 6 characters long.' : '';
      errors.username = usernameError;
      break;
    case 'email':
      let emailError = value.indexOf('@') === -1 ? 'Email must contain @' : '';
      errors.email = emailError;
      break;
    case 'password':
        let passwordError;
        if(value.length < 6) {
            passwordError="Password must be atleast 6 characters long";
        }
        let re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;
        if(!re.test(value)) {
            passwordError='Password must contain a character and a number.';
        }
        errors.password = passwordError;
      break;
    default:
      return errors;
  }
}

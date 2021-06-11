import validator from 'validator';


const phoneFomat=/^[0-9]{9,10}$/

 let required=(value,name)=>{
	if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return `vui lòng nhập ${name}`;
  }

	return null;

}

 let address = (value) => {
 	if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return `vui lòng nhập address`;
  }
   return null;

};

 let firstName = (value) => {
 	if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return `vui lòng nhập first name`;
  }
   return null;

};


 let lastName = (value) => {
 	if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return `vui lòng nhập last name`;
  }
   return null;

};

 let confirmPassword = (value) => {
 	if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return `vui lòng nhập confirm password`;
  }
   return null;

};




 let email = (value) => {
 	if (!value.toString().trim().length)  return `vui lòng nhập email`;
    if (!validator.isEmail(value))  return `email chưa đúng định dạng`;

   return null;

};

let phone=(value)=>{
 	 if (!value.toString().trim().length)  return `vui lòng nhập số điện thoại`;
	 if(/[a-zA-Z]+/.test(value)) return "số điện thoại chỉ chứa ký tự số!";
	 if(!phoneFomat.test(value))  return "số điện thoại chỉ được có 9 hoặc 10 ký tự!";
	 return null;

}

let password=(password)=>{
 	 if(password.length==0)  return  "bạn chưa nhập password!";
     else if(password.length<6) return  "mật khẩu ít nhất phải có 6 ký tự!";
     else return  "";

}

export default {required: required,
				 email: email, 
				 phone: phone,
				 password: password,
				 firstName: firstName,
				 lastName: lastName,
				 address: address,
				 confirmPassword: confirmPassword
				}

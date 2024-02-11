import * as Yup from "yup";

export const SignInScheme = Yup.object().shape({
	email: Yup.string()
		.email("email is invalid")
		.required("email is required"),
	password: Yup.string().required("password is required"),
});
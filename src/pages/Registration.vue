<template>
	<div class="row justify-center items-center q-pa-sm" style="min-height: 100vh">
		<form-container pageTitle="Register" :register-form="true">
			<template v-slot:form-contents>
				<q-form @submit.prevent="submitForm" @reset="resetForm" ref="register-form">
					<div class="row q-mb-md q-col-gutter-x-md">
						<div class="col-xs-12 col-sm-6">
							<p class="input-label no-margin">First Name</p>
							<q-input
								outlined
								v-model="fname"
								:dense="true"
								placeholder="FirstName"
								hide-bottom-space
								:rules="[(val) => (val && val.length > 0) || 'Please enter your first name']"
							/>
						</div>
						<div class="col-xs-12 col-sm-6">
							<p class="input-label no-margin">Last Name</p>
							<q-input
								outlined
								v-model="lname"
								:dense="true"
								placeholder="Last Name"
								hide-bottom-space
								:rules="[(val) => (val && val.length > 0) || 'Please enter your last name']"
							/>
						</div>
					</div>
					<div class="row q-mb-md q-col-gutter-x-md">
						<div class="col-xs-12 col-sm-6">
							<p class="input-label no-margin">Date Of Birth</p>
							<q-input
								type="date"
								outlined
								v-model="dob"
								:dense="true"
								placeholder="Date of Birth"
								hide-bottom-space
								:rules="[(val) => (val && val.length > 0) || 'Please enter your DOB']"
							/>
						</div>
						<div class="col-xs-12 col-sm-6">
							<p class="input-label no-margin">Contact No.</p>
							<q-input
								type="tel"
								outlined
								v-model="contactNo"
								:dense="true"
								placeholder="Phone Number"
								hide-bottom-space
								:rules="[(val) => (val && val.length > 0) || 'Phone number is required']"
							/>
						</div>
					</div>
					<div class="q-mb-md">
						<p class="input-label no-margin">Email</p>
						<q-input
							type="email"
							outlined
							v-model="email"
							:dense="true"
							placeholder="johndoe@gmail.com"
							hide-bottom-space
							:rules="[(val) => (val && val.length > 0) || 'Please enter your email']"
						/>
					</div>
					<div class="row q-mb-xs q-col-gutter-x-md">
						<div class="col-xs-12 col-sm-6">
							<p class="input-label no-margin">Password</p>
							<q-input
								:type="showPassword ? 'text' : 'password'"
								outlined
								v-model="newPassword"
								:dense="true"
								placeholder="Password"
								hide-bottom-space
								:rules="[
									(val) => (val && val.length > 6) || 'Password should be atleast 6 letters'
								]"
							/>
						</div>
						<div class="col-xs-12 col-sm-6">
							<p class="input-label no-margin">Confirm Password</p>
							<q-input
								:type="showPassword ? 'text' : 'password'"
								outlined
								v-model="confirmPassword"
								:dense="true"
								placeholder="Confirm Password"
								hide-bottom-space
								:rules="[
									(val) => (val && val.length > 6) || 'Password should be atleast 6 letters'
								]"
							/>
						</div>
					</div>
					<div class="q-mb-md">
						<q-checkbox v-model="showPassword" label="Show Password" />
					</div>
					<div class="q-mb-sm">
						<q-btn
							type="submit"
							color="secondary"
							size="16px"
							class="full-width text-weight-light"
							label="Register"
						/>
					</div>
				</q-form>
				<div class="form-links text-caption row justify-center">
					<router-link class="form-link text-blue-5" to="/login">
						Already a member? Login
					</router-link>
				</div>
			</template>
		</form-container>
	</div>
</template>

<script>
import FormContainer from '../component/AuthFormContainer.vue';
import { REDIRECT_TO_AFTER_REGISTER } from '../store/constants';

export default {
	components: {
		FormContainer
	},
	data() {
		return {
			fname: '',
			lname: '',
			dob: '',
			contactNo: '',
			email: '',
			newPassword: '',
			confirmPassword: '',
			showPassword: false,
			errorMessage: null,
			REDIRECT_TO_AFTER_REGISTER
		};
	},
	methods: {
		async submitForm() {
			if (this.newPassword === this.confirmPassword) {
				try {
					this.errorMessage = null;
					const res = await this.authService.register({
						firstName: this.fname,
						lastName: this.lname,
						dob: this.dob,
						contactNo: this.contactNo,
						email: this.email,
						// newPassword: this.newPassword,
						password: this.newPassword,
						confirmPassword: this.confirmPassword,
						username: this.fname,
						role: 'admin'
					});
					if (res.success) {
						this.$refs['register-form'].reset();
						this.$q.notiy({
							message: 'Registration complete. Now you can login with the registered email.'
						});
						this.$router.push( this.REDIRECT_TO_AFTER_REGISTER || '/login');
					} else {
						this.errorMessage = res.message
					}
				} catch (err) {
					this.errorMessage = err.error.message;
				}
			} else {
				this.errorMessage = 'Passwords do not match';
			}
		},
		resetForm() {
			this.fname = '';
			this.lname = '';
			this.dob = '';
			this.contactNo = '';
			this.email = '';
			this.password = '';
			this.confirmPassword = '';
			this.showPassword = false;
		}
	}
};
</script>

<style>
.form-link {
	text-decoration: none;
}
</style>

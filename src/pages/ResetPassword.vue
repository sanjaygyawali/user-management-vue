<template>
	<div class="row justify-center items-center q-pa-sm" style="min-height: 100vh">
		<form-container app-title="Reset Password">
			<template v-slot:form-contents>
				<q-form
					v-if="!submitted"
					@submit.prevent="submitForm"
					@reset="resetForm"
					ref="passwordResetForm"
				>
					<div class="q-mb-md">
						<q-input
							type="password"
							outlined
							v-model="newPassword"
							:dense="true"
							placeholder="Password"
							hide-bottom-space
							:rules="[(val) => (val && val.length > 4) || 'Password should be atleast 4 letters']"
						/>
					</div>
					<div class="q-mb-md">
						<q-input
							type="password"
							outlined
							v-model="confirmPassword"
							:dense="true"
							placeholder="Re-enter Password"
							hide-bottom-space
							:rules="[(val) => (val && val.length > 4) || 'Password should be atleast 4 letters']"
						/>
					</div>
					<div v-if="errorMessage" class="q-mb-md text-red">{{ errorMessage }}</div>
					<div class="q-mb-md">
						<q-btn
							type="submit"
							color="secondary"
							size="16px"
							class="full-width text-weight-light"
							label="Reset"
						/>
					</div>
				</q-form>
				<div
					v-else
					class="bg-green-6 rounded-borders q-px-md q-py-lg text-center text-white q-mb-md"
				>
					Your password has been changed successfully. Now you can login with the new password.
				</div>
				<div class="form-links text-caption row justify-center">
					<router-link class="form-link text-blue-5" to="/login"> Login </router-link>
					<span v-if="PUBLIC_REGISTER">&nbsp; | &nbsp;</span>
					<router-link v-if="PUBLIC_REGISTER" class="form-link text-blue-5" to="/register">
						Register
					</router-link>
				</div>
			</template>
		</form-container>
	</div>
</template>

<script>
import FormContainer from '../component/AuthFormContainer.vue';
import { PUBLIC_REGISTER } from '../store/constants';

export default {
	components: {
		FormContainer
	},
	data() {
		return {
			PUBLIC_REGISTER,
			newPassword: '',
			confirmPassword: '',
			errorMessage: null,
			submitted: false
		};
	},
	methods: {
		async submitForm() {
			if (this.newPassword === this.confirmPassword) {
				this.errorMessage = null;
				try {
					const res = this.authService.passwordReset({
						newPassword: this.newPassword,
						confirmPassword: this.confirmPassword
					});
					if (res.success) {
						this.submitted = true;
						this.$q.notify(
							'Password has been successfully changed. Now you can login with the new password.'
						);
						this.$refs['passwordResetForm'].reset();
					} else {
						this.errorMessage = res.message;
					}
				} catch (err) {
					this.errorMessage = err.error.message;
				}
			} else {
				this.errorMessage = 'Passwords do not match';
			}
		},
		resetForm() {
			this.password = '';
			this.confirmPassword = '';
		}
	},
	created() {
		const token = this.$route.params.token;
		if (!token) {
			this.$router.push('notFound')
		}
	}
};
</script>

<style></style>

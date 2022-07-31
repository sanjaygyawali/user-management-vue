<template>
	<div class="row justify-center items-center q-pa-sm" style="min-height: 100vh">
		<form-container :app-title="APP_NAME">
			<template v-slot:form-contents>
				<q-form @submit.prevent="submitForm" @reset="resetForm" ref="passwordChangeForm">
					<div class="q-mb-md">
						<q-input
							type="password"
							outlined
							v-model="oldPassword"
							:dense="true"
							placeholder="Old Password"
							hide-bottom-space
							:rules="[(val) => (val && val.length > 0) || 'Password should be atleast 6 letters']"
						/>
					</div>
					<div class="q-mb-md">
						<q-input
							type="password"
							outlined
							v-model="newPassword"
							:dense="true"
							placeholder="New Password"
							hide-bottom-space
							:rules="[(val) => (val && val.length > 0) || 'Password should be atleast 6 letters']"
						/>
					</div>
					<div class="q-mb-md">
						<q-input
							type="password"
							outlined
							v-model="confirmPassword"
							:dense="true"
							placeholder="Confirm Password"
							hide-bottom-space
							:rules="[(val) => (val && val.length > 0) || 'Password should be atleast 6 letters']"
						/>
					</div>
					<div v-if="errorMessage" class="q-mb-md text-red">{{ errorMessage }}</div>
					<div class="q-mb-md">
						<q-btn
							type="submit"
							:loading="loading"
							color="secondary"
							size="16px"
							class="full-width text-weight-light"
							label="Reset"
						>
							<template v-slot:loading>
								<q-spinner-tail />
							</template>
						</q-btn>
					</div>
				</q-form>
			</template>
		</form-container>
	</div>
</template>

<script>
import FormContainer from '../component/AuthFormContainer.vue';
import { APP_NAME } from '../store/constants.js';

export default {
	components: {
		FormContainer
	},
	data() {
		return {
			loading: false,
			APP_NAME,
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
			errorMessage: null
		};
	},
	methods: {
		async submitForm() {
			if (this.oldPassword === this.newPassword) {
				this.errorMessage = 'New password cannot be the same as old password.';
			} else if (this.newPassword === this.confirmPassword) {
				this.errorMessage = null;
				this.loading = true;
				try {
					const res = await this.authService.passwordChange({
						oldPassword: this.oldPassword,
						newPassword: this.newPassword,
						confirmPassword: this.confirmPassword
					});
					if (res.success) {
						this.$q.notify('Password has been successfully changed.');
						this.$refs['passwordChangeForm'].reset();
						this.$router.push('/settings');
					} else {
						this.errorMessage = res.message;
					}
				} catch (err) {
					this.errorMessage = err.error.message || err.error;
				} finally {
					this.loading = false;
				}
			} else {
				this.errorMessage = 'Passwords do not match';
			}
		},
		resetForm() {
			this.oldPassword = '';
			this.newPassword = '';
			this.confirmPassword = '';
		}
	}
};
</script>

<style></style>

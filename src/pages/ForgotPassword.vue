<template>
	<div class="row justify-center items-center q-pa-sm" style="min-height: 100vh">
		<form-container app-title="Forgot Password">
			<template v-slot:form-contents>
				<q-form
					v-if="!submitted"
					@submit.prevent="submitForm"
					@reset="resetForm"
					ref="PasswordForgotForm"
				>
					<div class="q-mb-md">
						<q-input
							type="email"
							outlined
							v-model="email"
							:dense="true"
							placeholder="Enter your email"
							hide-bottom-space
							:rules="[(val) => (val && val.length > 0) || 'Please enter your email']"
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
				<div
					v-else
					class="bg-green-6 rounded-borders q-px-md q-py-lg text-center text-white q-mb-md"
				>
					A confirmation email has been sent to your email. Please check your email.
				</div>
				<div class="form-links text-caption row justify-center">
					<router-link class="form-link text-blue-5" to="/login"> Login </router-link>
					<span>&nbsp; | &nbsp;</span>
					<router-link class="form-link text-blue-5" to="/register"> Register </router-link>
				</div>
			</template>
		</form-container>
	</div>
</template>

<script>
import FormContainer from '../component/AuthFormContainer.vue';

export default {
	components: {
		FormContainer
	},
	data() {
		return {
			loading: false,
			email: '',
			errorMessage: null,
			submitted: false
		};
	},
	methods: {
		async submitForm() {
			try {
				this.loading = true;
				const res = await this.authService.passwordForgot({ email: this.email });
				this.$refs['PasswordForgotForm'].reset();
				this.submitted = true;
				this.errorMessage = res.message;
			} catch (err) {
				this.errorMessage = err.eror.message || err.error;
			} finally {
				this.loading = false;
			}
		},
		resetForm() {
			this.email = '';
		}
	}
};
</script>

<style></style>
